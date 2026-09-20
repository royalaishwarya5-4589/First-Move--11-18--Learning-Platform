import { CodingExercise } from '@/types/content';
import { ExecutionResult, ValidationResult, TestCaseResult } from '@/types/runner';

export function normalizeHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .replace(/\s*>\s*/g, '>') // Remove spaces around >
    .replace(/\s*<\s*/g, '<') // Remove spaces around <
    .replace(/\s*=\s*/g, '=') // Normalize attribute equals
    .replace(/["']/g, '"') // Normalize quotes
    .trim();
}

export function executeHtmlSnippet(code: string): ExecutionResult {
  const startTime = performance.now();
  const trimmed = code.trim();

  if (!trimmed) {
    return {
      success: false,
      output: '',
      error: 'Empty HTML/CSS snippet.',
      executionTimeMs: 0,
    };
  }

  // Count tags
  const openTags = (trimmed.match(/<[a-zA-Z0-9_-]+(\s+[^>]*)?>/g) || []).length;
  const closeTags = (trimmed.match(/<\/[a-zA-Z0-9_-]+>/g) || []).length;
  const selfClosing = (trimmed.match(/<(input|img|br|hr|meta|link)[^>]*>/gi) || []).length;

  const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));

  const outputSummary = [
    `✨ HTML / Web Layout Parsed Successfully (${executionTimeMs} ms)`,
    `• DOM Elements: ${openTags} tags detected (${selfClosing} self-closing, ${closeTags} closing)`,
    `• Markup Structure:`,
    trimmed
      .split('\n')
      .map((l) => `  ${l}`)
      .join('\n'),
  ].join('\n');

  return {
    success: true,
    output: outputSummary,
    executionTimeMs,
  };
}

export function validateHtmlExercise(code: string, exercise: CodingExercise): ValidationResult {
  const startTime = performance.now();
  const normalizedUserCode = normalizeHtml(code);
  const results: TestCaseResult[] = [];
  let totalPassed = 0;

  for (const tc of exercise.testCases) {
    const expectedRaw = String(tc.expectedOutput);
    const normalizedExpected = normalizeHtml(expectedRaw);

    // Check normalized substring or exact match
    const passed =
      normalizedUserCode.includes(normalizedExpected) ||
      code.includes(expectedRaw) ||
      code.replace(/\s+/g, ' ').includes(expectedRaw.replace(/\s+/g, ' '));

    if (passed) totalPassed++;

    results.push({
      id: tc.id,
      description: tc.description,
      passed,
      actualOutput: code.trim(),
      expectedOutput: expectedRaw.trim(),
      error: passed ? undefined : `Expected markup did not match: "${expectedRaw.trim()}"`,
      isHidden: tc.isHidden,
    });
  }

  const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
  const overallSuccess = totalPassed === exercise.testCases.length;

  return {
    success: overallSuccess,
    totalPassed,
    totalCases: exercise.testCases.length,
    results,
    executionTimeMs,
    error: overallSuccess ? undefined : 'Submitted HTML/CSS markup did not satisfy all test criteria.',
  };
}
