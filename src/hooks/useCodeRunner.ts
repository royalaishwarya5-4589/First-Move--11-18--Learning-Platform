'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  LogEntry,
  LogType,
  ExecutionResult,
  ValidationResult,
  SupportedRunnerLanguage,
  RunnerEngineInfo,
} from '@/types/runner';
import { CodingExercise } from '@/types/content';
import { executeSqlQuery, validateSqlExercise } from '@/lib/runner/sqlEngine';
import { executeHtmlSnippet, validateHtmlExercise } from '@/lib/runner/webEngine';

const EXECUTION_TIMEOUT_MS = 5000;

export interface UseCodeRunnerOptions {
  language?: string;
  pathSlug?: string;
}

export function resolveRunnerLanguage(language?: string, pathSlug?: string): SupportedRunnerLanguage {
  const lang = (language || '').toLowerCase();
  const slug = (pathSlug || '').toLowerCase();

  if (lang === 'python' || slug === 'python') return 'python';
  if (
    lang === 'javascript' ||
    lang === 'js' ||
    lang === 'jsx' ||
    lang === 'react' ||
    slug === 'javascript' ||
    slug === 'react' ||
    slug === 'software-testing'
  ) {
    return 'javascript';
  }
  if (lang === 'typescript' || lang === 'ts') return 'typescript';
  if (lang === 'html' || lang === 'css' || slug === 'html-css') return 'html';
  if (lang === 'sql' || slug === 'dbms') return 'sql';
  if (lang === 'java' || slug === 'java') return 'java';
  if (lang === 'bash' || slug === 'linux-security') return 'bash';

  return 'generic';
}

export function useCodeRunner({ language = 'python', pathSlug = '' }: UseCodeRunnerOptions = {}) {
  const targetLanguage = useMemo(() => resolveRunnerLanguage(language, pathSlug), [language, pathSlug]);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const workerRef = useRef<Worker | null>(null);
  const workerInstanceIdRef = useRef<number>(0);

  const activePromiseRef = useRef<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: (val: any) => void;
    reject: (err: Error) => void;
    timer: NodeJS.Timeout;
    instanceId: number;
  } | null>(null);

  const addLog = useCallback((type: LogType, text: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        type,
        text,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const terminateWorker = useCallback(() => {
    if (activePromiseRef.current) {
      clearTimeout(activePromiseRef.current.timer);
      activePromiseRef.current = null;
    }
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  const startWorker = useCallback(() => {
    if (typeof window === 'undefined') return;

    terminateWorker();
    const currentInstanceId = ++workerInstanceIdRef.current;

    // For SQL and HTML engines, no external Web Worker is needed
    if (targetLanguage === 'sql' || targetLanguage === 'html') {
      setIsReady(true);
      setIsRunning(false);
      return;
    }

    setIsReady(false);
    setIsRunning(false);

    try {
      const workerUrl = targetLanguage === 'python' ? '/pyodide.worker.js' : '/javascript.worker.js';
      const engineName = targetLanguage === 'python' ? 'Python 3.11 (Pyodide Wasm)' : 'JavaScript ES6+ Worker';

      addLog('system', `Initializing ${engineName}...`);
      const worker = new Worker(workerUrl);

      worker.onmessage = (event: MessageEvent) => {
        if (workerInstanceIdRef.current !== currentInstanceId) return;

        const { type, text, success, output, error, executionTimeMs, results, totalPassed, totalCases } = event.data;

        if (type === 'ready') {
          setIsReady(true);
          addLog('system', `${engineName} is ready.`);
          return;
        }

        if (type === 'stdout') {
          addLog('stdout', text);
          return;
        }

        if (type === 'stderr') {
          addLog('stderr', text);
          return;
        }

        if (type === 'result') {
          if (activePromiseRef.current && activePromiseRef.current.instanceId === currentInstanceId) {
            clearTimeout(activePromiseRef.current.timer);
            const { resolve } = activePromiseRef.current;
            activePromiseRef.current = null;
            setIsRunning(false);

            if (success) {
              addLog('system', `Execution completed in ${executionTimeMs}ms.`);
            } else {
              addLog('error', error || 'Execution error');
            }
            resolve({ success, output: output || '', error, executionTimeMs });
          }
          return;
        }

        if (type === 'validation_result') {
          if (activePromiseRef.current && activePromiseRef.current.instanceId === currentInstanceId) {
            clearTimeout(activePromiseRef.current.timer);
            const { resolve } = activePromiseRef.current;
            activePromiseRef.current = null;
            setIsRunning(false);

            if (success) {
              addLog('success', `✔ All ${totalCases} test cases passed! (${executionTimeMs}ms)`);
            } else {
              addLog('stderr', `Validation: ${totalPassed}/${totalCases} test cases passed.`);
            }

            resolve({
              success,
              totalPassed,
              totalCases,
              results: results || [],
              executionTimeMs,
              error,
            });
          }
          return;
        }

        if (type === 'error') {
          addLog('error', error || 'Engine worker encountered an error.');
        }
      };

      worker.onerror = (err: ErrorEvent) => {
        if (workerInstanceIdRef.current !== currentInstanceId) return;
        addLog('error', `Runtime worker error: ${err.message}`);
        setIsRunning(false);
      };

      workerRef.current = worker;
      worker.postMessage({ type: 'init' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      addLog('error', `Failed to start runtime worker: ${msg}`);
    }
  }, [targetLanguage, addLog, terminateWorker]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startWorker();
    return () => {
      terminateWorker();
    };
  }, [startWorker, terminateWorker]);

  const handleTimeout = useCallback(() => {
    const currentInstance = activePromiseRef.current;
    if (currentInstance) {
      clearTimeout(currentInstance.timer);
      const { resolve } = currentInstance;
      activePromiseRef.current = null;

      addLog('error', 'Execution timed out (5s limit exceeded). Possible infinite loop detected.');

      resolve({
        success: false,
        output: '',
        error: 'Execution timed out (5s limit exceeded). Possible infinite loop detected.',
        executionTimeMs: EXECUTION_TIMEOUT_MS,
      });
    }

    setIsRunning(false);
    setIsReady(false);
    startWorker();
  }, [addLog, startWorker]);

  const runCode = useCallback(
    async (code: string): Promise<ExecutionResult> => {
      // 1. SQL Engine
      if (targetLanguage === 'sql') {
        setIsRunning(true);
        addLog('system', 'Executing SQL query against relational database...');
        const res = executeSqlQuery(code);
        setIsRunning(false);
        if (res.success) {
          addLog('stdout', res.output);
          addLog('system', `Query executed in ${res.executionTimeMs}ms.`);
        } else {
          addLog('error', res.error || 'SQL Error');
        }
        return res;
      }

      // 2. HTML/CSS Web Engine
      if (targetLanguage === 'html') {
        setIsRunning(true);
        addLog('system', 'Rendering and parsing HTML/CSS layout...');
        const res = executeHtmlSnippet(code);
        setIsRunning(false);
        if (res.success) {
          addLog('stdout', res.output);
          addLog('system', `Layout evaluated in ${res.executionTimeMs}ms.`);
        } else {
          addLog('error', res.error || 'HTML Error');
        }
        return res;
      }

      // 3. Web Worker Engines (Python, JavaScript, TypeScript, Generic)
      return new Promise((resolve, reject) => {
        if (!workerRef.current || !isReady) {
          addLog('error', 'Runtime engine is not ready yet.');
          return resolve({
            success: false,
            output: '',
            error: 'Runtime engine is loading or unavailable.',
            executionTimeMs: 0,
          });
        }

        setIsRunning(true);
        addLog('system', 'Executing code...');

        const instanceId = workerInstanceIdRef.current;
        const timer = setTimeout(() => {
          handleTimeout();
        }, EXECUTION_TIMEOUT_MS);

        activePromiseRef.current = {
          resolve,
          reject,
          timer,
          instanceId,
        };

        const id = Math.random().toString(36).substring(2, 9);
        workerRef.current.postMessage({ type: 'run', id, code });
      });
    },
    [targetLanguage, isReady, addLog, handleTimeout]
  );

  const validateExercise = useCallback(
    async (code: string, exercise: CodingExercise): Promise<ValidationResult> => {
      // 1. SQL Engine
      if (targetLanguage === 'sql') {
        setIsRunning(true);
        addLog('system', `Validating SQL query against ${exercise.testCases.length} assertions...`);
        const res = validateSqlExercise(code, exercise);
        setIsRunning(false);
        if (res.success) {
          addLog('success', `✔ All ${exercise.testCases.length} SQL assertions passed! (${res.executionTimeMs}ms)`);
        } else {
          addLog('stderr', `Validation: ${res.totalPassed}/${exercise.testCases.length} test cases passed.`);
          if (res.error) addLog('error', res.error);
        }
        return res;
      }

      // 2. HTML/CSS Engine
      if (targetLanguage === 'html') {
        setIsRunning(true);
        addLog('system', `Validating HTML structure against ${exercise.testCases.length} test criteria...`);
        const res = validateHtmlExercise(code, exercise);
        setIsRunning(false);
        if (res.success) {
          addLog('success', `✔ All ${exercise.testCases.length} markup criteria passed! (${res.executionTimeMs}ms)`);
        } else {
          addLog('stderr', `Validation: ${res.totalPassed}/${exercise.testCases.length} test cases passed.`);
          if (res.error) addLog('error', res.error);
        }
        return res;
      }

      // 3. Web Worker Engines (Python, JavaScript, TypeScript, Generic)
      return new Promise((resolve, reject) => {
        if (!workerRef.current || !isReady) {
          addLog('error', 'Runtime engine is not ready yet.');
          return resolve({
            success: false,
            totalPassed: 0,
            totalCases: exercise.testCases.length,
            results: [],
            executionTimeMs: 0,
            error: 'Runtime engine is loading or unavailable.',
          });
        }

        setIsRunning(true);
        addLog('system', `Validating solution against ${exercise.testCases.length} test cases...`);

        const instanceId = workerInstanceIdRef.current;
        const timer = setTimeout(() => {
          handleTimeout();
        }, EXECUTION_TIMEOUT_MS);

        activePromiseRef.current = {
          resolve,
          reject,
          timer,
          instanceId,
        };

        const id = Math.random().toString(36).substring(2, 9);
        workerRef.current.postMessage({
          type: 'validate',
          id,
          code,
          validationType: exercise.validationType || 'stdout',
          testCases: exercise.testCases,
          functionName: exercise.functionName,
        });
      });
    },
    [targetLanguage, isReady, addLog, handleTimeout]
  );

  const activeEngine: RunnerEngineInfo = useMemo(() => {
    switch (targetLanguage) {
      case 'python':
        return {
          language: 'python',
          name: 'Python 3.11',
          version: 'Pyodide 0.26 WebAssembly',
          icon: '🐍',
          ready: isReady,
          description: 'Runs in-browser via Pyodide WebAssembly with standard libraries.',
        };
      case 'javascript':
      case 'typescript':
        return {
          language: targetLanguage,
          name: targetLanguage === 'typescript' ? 'TypeScript Runtime' : 'JavaScript ES6+',
          version: 'Isolated Web Worker',
          icon: '⚡',
          ready: isReady,
          description: 'Lightning-fast native ECMAScript browser execution with console capture.',
        };
      case 'sql':
        return {
          language: 'sql',
          name: 'SQL Relational DB',
          version: 'In-Memory Engine',
          icon: '🗄️',
          ready: true,
          description: 'In-memory relational database querying pre-seeded schema tables.',
        };
      case 'html':
      case 'css':
        return {
          language: 'html',
          name: 'HTML5 & CSS3',
          version: 'DOM Layout Parser',
          icon: '🌐',
          ready: true,
          description: 'Browser-native semantic markup validation and structural parser.',
        };
      default:
        return {
          language: 'generic',
          name: `${language.toUpperCase()} Engine`,
          version: 'Standard Runner',
          icon: '⚙️',
          ready: isReady,
          description: 'Interactive execution environment and test validator.',
        };
    }
  }, [targetLanguage, language, isReady]);

  return {
    isReady,
    isRunning,
    logs,
    addLog,
    clearLogs,
    runCode,
    validateExercise,
    resetWorker: startWorker,
    activeEngine,
    language: targetLanguage,
  };
}
