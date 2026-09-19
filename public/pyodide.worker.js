/* Pyodide Classic Web Worker for First Move (11~18) Platform */

let pyodide = null;
let isReady = false;

async function initPyodide() {
  if (pyodide) return pyodide;
  try {
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js');
    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
    });

    // Helper Python function for evaluating exercise test cases
    await pyodide.runPythonAsync(`
import json
import traceback

def _exec_test_case(func_name, input_json):
    if func_name not in globals():
        return json.dumps({"success": False, "error": f"Function '{func_name}' is not defined."})
    fn = globals()[func_name]
    try:
        args = json.loads(input_json) if input_json else []
        if isinstance(args, list):
            res = fn(*args)
        elif isinstance(args, dict):
            res = fn(**args)
        else:
            res = fn(args)
        
        return json.dumps({"success": True, "result": res})
    except Exception as e:
        tb = traceback.format_exc()
        lines = tb.splitlines()
        clean_lines = [l for l in lines if '_exec_test_case' not in l]
        return json.dumps({"success": False, "error": "\\n".join(clean_lines)})
`);

    isReady = true;
    self.postMessage({ type: 'ready' });
    return pyodide;
  } catch (err) {
    self.postMessage({ type: 'error', error: err?.message || 'Failed to initialize Pyodide worker' });
    throw err;
  }
}

// Start Pyodide initialization
initPyodide().catch(() => {});

self.onmessage = async (event) => {
  const { type, id, code, validationType, testCases, functionName } = event.data;

  if (type === 'init') {
    if (isReady) {
      self.postMessage({ type: 'ready' });
    } else {
      await initPyodide();
    }
    return;
  }

  if (!pyodide) {
    try {
      await initPyodide();
    } catch {
      self.postMessage({
        type: 'result',
        id,
        success: false,
        error: 'Pyodide engine is not initialized yet.',
        executionTimeMs: 0,
      });
      return;
    }
  }

  if (type === 'run') {
    const startTime = performance.now();
    let stdoutBuffer = '';

    pyodide.setStdout({
      batched: (text) => {
        stdoutBuffer += text + '\n';
        self.postMessage({ type: 'stdout', text });
      },
    });

    pyodide.setStderr({
      batched: (text) => {
        self.postMessage({ type: 'stderr', text });
      },
    });

    try {
      await pyodide.runPythonAsync(code);
      const executionTimeMs = Math.round(performance.now() - startTime);
      self.postMessage({
        type: 'result',
        id,
        success: true,
        output: stdoutBuffer.trim(),
        executionTimeMs,
      });
    } catch (err) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      const errorMessage = err?.message || String(err);
      self.postMessage({
        type: 'result',
        id,
        success: false,
        output: stdoutBuffer.trim(),
        error: errorMessage,
        executionTimeMs,
      });
    }
    return;
  }

  if (type === 'validate') {
    const startTime = performance.now();
    let stdoutBuffer = '';

    pyodide.setStdout({
      batched: (text) => {
        stdoutBuffer += text + '\n';
        self.postMessage({ type: 'stdout', text });
      },
    });

    pyodide.setStderr({
      batched: (text) => {
        self.postMessage({ type: 'stderr', text });
      },
    });

    try {
      await pyodide.runPythonAsync(code);
    } catch (err) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      const errorMessage = err?.message || String(err);
      self.postMessage({
        type: 'validation_result',
        id,
        success: false,
        totalPassed: 0,
        totalCases: testCases?.length || 0,
        results: [],
        executionTimeMs,
        error: `Code Execution Error:\n${errorMessage}`,
      });
      return;
    }

    const results = [];
    let totalPassed = 0;

    if (validationType === 'stdout') {
      const actualStdout = stdoutBuffer.trim();
      for (const tc of testCases || []) {
        const expectedStr = String(tc.expectedOutput).trim();
        const passed = actualStdout === expectedStr;
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
      const targetFunc = functionName || 'solution';
      for (const tc of testCases || []) {
        try {
          const inputJson = JSON.stringify(tc.input !== undefined ? tc.input : null);
          const pyResRaw = pyodide.runPython(`_exec_test_case(${JSON.stringify(targetFunc)}, ${JSON.stringify(inputJson)})`);
          const pyRes = JSON.parse(pyResRaw);

          if (!pyRes.success) {
            results.push({
              id: tc.id,
              description: tc.description,
              passed: false,
              actualOutput: undefined,
              expectedOutput: String(tc.expectedOutput),
              error: pyRes.error,
              isHidden: tc.isHidden,
            });
          } else {
            const actualVal = pyRes.result;
            const expectedVal = tc.expectedOutput;

            let passed = false;
            if (typeof expectedVal === 'object' && expectedVal !== null) {
              passed = JSON.stringify(actualVal) === JSON.stringify(expectedVal);
            } else {
              passed = String(actualVal) === String(expectedVal);
            }

            if (passed) totalPassed++;

            results.push({
              id: tc.id,
              description: tc.description,
              passed,
              actualOutput: typeof actualVal === 'object' ? JSON.stringify(actualVal) : String(actualVal),
              expectedOutput: typeof expectedVal === 'object' ? JSON.stringify(expectedVal) : String(expectedVal),
              isHidden: tc.isHidden,
            });
          }
        } catch (err) {
          results.push({
            id: tc.id,
            description: tc.description,
            passed: false,
            expectedOutput: String(tc.expectedOutput),
            error: err?.message || String(err),
            isHidden: tc.isHidden,
          });
        }
      }
    }

    const executionTimeMs = Math.round(performance.now() - startTime);
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
