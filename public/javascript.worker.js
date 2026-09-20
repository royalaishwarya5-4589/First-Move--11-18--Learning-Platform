/* JavaScript ES6+ Isolated Web Worker for First Move (11~18) Platform */

self.onmessage = async (event) => {
  const { type, id, code, validationType, testCases, functionName } = event.data;

  if (type === 'init') {
    self.postMessage({ type: 'ready' });
    return;
  }

  // Format any value cleanly for console output
  function formatArg(arg) {
    if (typeof arg === 'object' && arg !== null) {
      try {
        return JSON.stringify(arg, null, 2);
      } catch {
        return String(arg);
      }
    }
    return String(arg);
  }

  function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a === 'object' && a !== null && b !== null) {
      if (Array.isArray(a) !== Array.isArray(b)) return false;
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (const k of keysA) {
        if (!deepEqual(a[k], b[k])) return false;
      }
      return true;
    }
    return String(a).trim() === String(b).trim();
  }

  if (type === 'run') {
    const startTime = performance.now();
    let stdoutBuffer = '';

    // Intercept console functions
    const originalConsoleLog = console.log;
    const originalConsoleInfo = console.info;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    console.log = (...args) => {
      const line = args.map(formatArg).join(' ');
      stdoutBuffer += line + '\n';
      self.postMessage({ type: 'stdout', text: line });
    };

    console.info = (...args) => {
      const line = args.map(formatArg).join(' ');
      stdoutBuffer += line + '\n';
      self.postMessage({ type: 'stdout', text: line });
    };

    console.warn = (...args) => {
      const line = args.map(formatArg).join(' ');
      stdoutBuffer += line + '\n';
      self.postMessage({ type: 'stderr', text: line });
    };

    console.error = (...args) => {
      const line = args.map(formatArg).join(' ');
      self.postMessage({ type: 'stderr', text: line });
    };

    try {
      // Execute inside an async wrapper to support top-level await if needed
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const fn = new AsyncFunction(code);
      const returnValue = await fn();

      if (returnValue !== undefined && stdoutBuffer.trim() === '') {
        const retStr = formatArg(returnValue);
        stdoutBuffer = retStr;
        self.postMessage({ type: 'stdout', text: retStr });
      }

      const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
      self.postMessage({
        type: 'result',
        id,
        success: true,
        output: stdoutBuffer.trim(),
        executionTimeMs,
      });
    } catch (err) {
      const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
      const errorMessage = err?.stack || err?.message || String(err);
      self.postMessage({
        type: 'result',
        id,
        success: false,
        output: stdoutBuffer.trim(),
        error: errorMessage,
        executionTimeMs,
      });
    } finally {
      console.log = originalConsoleLog;
      console.info = originalConsoleInfo;
      console.warn = originalConsoleWarn;
      console.error = originalConsoleError;
    }
    return;
  }

  if (type === 'validate') {
    const startTime = performance.now();
    let stdoutBuffer = '';

    const originalConsoleLog = console.log;
    const originalConsoleInfo = console.info;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    console.log = (...args) => {
      const line = args.map(formatArg).join(' ');
      stdoutBuffer += line + '\n';
      self.postMessage({ type: 'stdout', text: line });
    };

    console.info = (...args) => {
      const line = args.map(formatArg).join(' ');
      stdoutBuffer += line + '\n';
      self.postMessage({ type: 'stdout', text: line });
    };

    console.warn = (...args) => {
      const line = args.map(formatArg).join(' ');
      stdoutBuffer += line + '\n';
      self.postMessage({ type: 'stderr', text: line });
    };

    console.error = (...args) => {
      const line = args.map(formatArg).join(' ');
      self.postMessage({ type: 'stderr', text: line });
    };

    let executionError = null;
    let evalScope = {};

    try {
      // Execute the user code and capture any declared functions/variables
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const fn = new AsyncFunction('scope', `with(scope) {\n${code}\n}`);
      await fn(evalScope);
    } catch (err) {
      executionError = err?.stack || err?.message || String(err);
    } finally {
      console.log = originalConsoleLog;
      console.info = originalConsoleInfo;
      console.warn = originalConsoleWarn;
      console.error = originalConsoleError;
    }

    if (executionError) {
      const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
      self.postMessage({
        type: 'validation_result',
        id,
        success: false,
        totalPassed: 0,
        totalCases: testCases?.length || 0,
        results: [],
        executionTimeMs,
        error: `JavaScript Runtime Error:\n${executionError}`,
      });
      return;
    }

    const results = [];
    let totalPassed = 0;

    if (validationType === 'stdout') {
      const actualStdout = stdoutBuffer.trim();
      for (const tc of testCases || []) {
        const expectedStr = String(tc.expectedOutput).trim();
        // Support normalized line-break and trimmed comparison
        const passed = actualStdout === expectedStr || actualStdout.includes(expectedStr);
        if (passed) totalPassed++;
        results.push({
          id: tc.id,
          description: tc.description,
          passed,
          actualOutput: actualStdout,
          expectedOutput: expectedStr,
          isHidden: tc.isHidden,
        });
      }
    } else if (validationType === 'function') {
      const targetName = functionName || 'solution';
      const targetFn = evalScope[targetName] || self[targetName];

      if (typeof targetFn !== 'function') {
        const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
        self.postMessage({
          type: 'validation_result',
          id,
          success: false,
          totalPassed: 0,
          totalCases: testCases?.length || 0,
          results: (testCases || []).map((tc) => ({
            id: tc.id,
            description: tc.description,
            passed: false,
            expectedOutput: String(tc.expectedOutput),
            error: `Function '${targetName}' is not defined.`,
          })),
          executionTimeMs,
          error: `Function '${targetName}' was not found in the submitted code.`,
        });
        return;
      }

      for (const tc of testCases || []) {
        try {
          const inputArgs = Array.isArray(tc.input) ? tc.input : tc.input !== undefined ? [tc.input] : [];
          const actualResult = await targetFn(...inputArgs);
          const passed = deepEqual(actualResult, tc.expectedOutput);

          if (passed) totalPassed++;

          results.push({
            id: tc.id,
            description: tc.description,
            passed,
            actualOutput: formatArg(actualResult),
            expectedOutput: formatArg(tc.expectedOutput),
            isHidden: tc.isHidden,
          });
        } catch (callErr) {
          results.push({
            id: tc.id,
            description: tc.description,
            passed: false,
            expectedOutput: formatArg(tc.expectedOutput),
            error: callErr?.message || String(callErr),
            isHidden: tc.isHidden,
          });
        }
      }
    } else if (validationType === 'text_match') {
      const normalizedUserCode = code.replace(/\s+/g, ' ').trim();
      for (const tc of testCases || []) {
        const normalizedExpected = String(tc.expectedOutput).replace(/\s+/g, ' ').trim();
        const passed = normalizedUserCode.includes(normalizedExpected);
        if (passed) totalPassed++;
        results.push({
          id: tc.id,
          description: tc.description,
          passed,
          actualOutput: code.trim(),
          expectedOutput: String(tc.expectedOutput).trim(),
          isHidden: tc.isHidden,
        });
      }
    } else {
      // Default: match stdout or non-empty execution
      const actualStdout = stdoutBuffer.trim();
      for (const tc of testCases || []) {
        const expectedStr = String(tc.expectedOutput).trim();
        const passed = actualStdout === expectedStr || actualStdout.length > 0;
        if (passed) totalPassed++;
        results.push({
          id: tc.id,
          description: tc.description,
          passed,
          actualOutput: actualStdout,
          expectedOutput: expectedStr,
          isHidden: tc.isHidden,
        });
      }
    }

    const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
    const overallSuccess = totalPassed === (testCases?.length || 0);

    self.postMessage({
      type: 'validation_result',
      id,
      success: overallSuccess,
      totalPassed,
      totalCases: testCases?.length || 0,
      results,
      executionTimeMs,
    });
  }
};

// Notify that worker script is ready immediately
self.postMessage({ type: 'ready' });
