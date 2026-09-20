'use client';

import { useCodeRunner } from './useCodeRunner';

/**
 * usePythonRunner is a backwards-compatible alias for useCodeRunner
 * configured for Python (Pyodide Wasm) execution.
 */
export function usePythonRunner() {
  return useCodeRunner({ language: 'python', pathSlug: 'python' });
}
