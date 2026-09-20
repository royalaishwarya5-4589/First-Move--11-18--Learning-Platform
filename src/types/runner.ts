export type LogType = 'stdout' | 'stderr' | 'system' | 'error' | 'success';

export interface LogEntry {
  id: string;
  type: LogType;
  text: string;
  timestamp: number;
}

export interface TestCaseResult {
  id: string;
  description: string;
  passed: boolean;
  actualOutput?: string;
  expectedOutput: string;
  error?: string;
  isHidden?: boolean;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs: number;
}

export interface ValidationResult {
  success: boolean;
  totalPassed: number;
  totalCases: number;
  results: TestCaseResult[];
  executionTimeMs: number;
  error?: string;
}

export type SupportedRunnerLanguage =
  | 'python'
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'sql'
  | 'java'
  | 'bash'
  | 'generic';

export interface RunnerEngineInfo {
  language: SupportedRunnerLanguage;
  name: string;
  version: string;
  icon: string;
  ready: boolean;
  description: string;
}

