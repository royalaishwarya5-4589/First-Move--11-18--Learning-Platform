import { CodingExercise } from '@/types/content';
import { ExecutionResult, ValidationResult, TestCaseResult } from '@/types/runner';

export interface SqlRow {
  [key: string]: string | number | boolean | null;
}

export const MOCK_DATABASE: Record<string, SqlRow[]> = {
  users: [
    { id: 1, name: 'Alice Chen', email: 'alice@firstmove.dev', status: 'active', role: 'Staff Engineer' },
    { id: 2, name: 'Bob Martinez', email: 'bob@firstmove.dev', status: 'active', role: 'Frontend Architect' },
    { id: 3, name: 'Charlie Kim', email: 'charlie@firstmove.dev', status: 'inactive', role: 'Security Analyst' },
    { id: 4, name: 'Diana Prince', email: 'diana@firstmove.dev', status: 'active', role: 'DevOps Lead' },
    { id: 5, name: 'Evan Wright', email: 'evan@firstmove.dev', status: 'pending', role: 'Junior Engineer' },
  ],
  products: [
    { id: 101, name: 'High-Memory Cloud VM', category_id: 1, price: 49.99, stock: 85 },
    { id: 102, name: 'Managed PostgreSQL Instance', category_id: 2, price: 89.00, stock: 40 },
    { id: 103, name: 'Distributed Redis Cache', category_id: 2, price: 34.50, stock: 110 },
    { id: 104, name: 'Web Application Firewall', category_id: 3, price: 120.00, stock: 25 },
    { id: 105, name: 'Global Edge CDN Tier', category_id: 1, price: 19.99, stock: 300 },
  ],
  categories: [
    { id: 1, name: 'Compute & Cloud Infrastructure' },
    { id: 2, name: 'Database & Storage Systems' },
    { id: 3, name: 'Network & Application Security' },
  ],
  orders: [
    { id: 1001, user_id: 1, total_amount: 138.99, status: 'completed' },
    { id: 1002, user_id: 2, total_amount: 49.99, status: 'completed' },
    { id: 1003, user_id: 3, total_amount: 240.00, status: 'cancelled' },
    { id: 1004, user_id: 4, total_amount: 173.50, status: 'completed' },
  ],
};

export function formatAsciiTable(rows: SqlRow[]): string {
  if (!rows || rows.length === 0) {
    return '(0 rows returned)';
  }

  const columns = Object.keys(rows[0]);
  const colWidths: Record<string, number> = {};

  for (const col of columns) {
    colWidths[col] = col.length;
    for (const row of rows) {
      const valStr = String(row[col] ?? 'NULL');
      if (valStr.length > colWidths[col]) {
        colWidths[col] = valStr.length;
      }
    }
  }

  const separator = '+' + columns.map((col) => '-'.repeat(colWidths[col] + 2)).join('+') + '+';
  const header = '|' + columns.map((col) => ` ${col.padEnd(colWidths[col])} `).join('|') + '|';
  const dataRows = rows.map((row) => {
    return '|' + columns.map((col) => {
      const val = row[col];
      const valStr = String(val ?? 'NULL');
      return ` ${valStr.padEnd(colWidths[col])} `;
    }).join('|') + '|';
  });

  return [
    separator,
    header,
    separator,
    ...dataRows,
    separator,
    `(${rows.length} row${rows.length === 1 ? '' : 's'} returned)`,
  ].join('\n');
}

export function executeSqlQuery(sql: string): { success: boolean; output: string; error?: string; executionTimeMs: number } {
  const startTime = performance.now();
  const trimmed = sql.trim().replace(/;+$/, '').trim();

  if (!trimmed) {
    return {
      success: false,
      output: '',
      error: 'Empty SQL query.',
      executionTimeMs: 0,
    };
  }

  // Basic SQL parser / simulator
  const lower = trimmed.toLowerCase();

  try {
    if (lower.startsWith('select')) {
      // Check from clause
      const fromMatch = lower.match(/\bfrom\s+([a-zA-Z0-9_]+)/);
      if (!fromMatch) {
        // Scalar SELECT like SELECT 1; or SELECT CURRENT_TIMESTAMP;
        const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
        const res = [{ result: 'Query executed successfully' }];
        return {
          success: true,
          output: formatAsciiTable(res),
          executionTimeMs,
        };
      }

      const tableName = fromMatch[1];
      const table = MOCK_DATABASE[tableName];

      if (!table) {
        return {
          success: false,
          output: '',
          error: `Table '${tableName}' does not exist in schema. Available tables: ${Object.keys(MOCK_DATABASE).join(', ')}`,
          executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
        };
      }

      let filteredRows = [...table];

      // Parse WHERE clause if present
      const whereMatch = lower.match(/\bwhere\s+(.+?)(?:\s+order\s+by|\s+group\s+by|\s+limit|$)/);
      if (whereMatch) {
        const whereClause = whereMatch[1].trim();

        // status = 'active'
        const eqMatch = whereClause.match(/([a-zA-Z0-9_]+)\s*=\s*['"]?([a-zA-Z0-9_-]+)['"]?/);
        if (eqMatch) {
          const [, colName, expectedVal] = eqMatch;
          filteredRows = filteredRows.filter((r) => {
            const val = r[colName];
            return String(val).toLowerCase() === expectedVal.toLowerCase();
          });
        }
      }

      // Parse SELECT column projection
      const selectMatch = lower.match(/^select\s+(.+?)\s+from/);
      if (selectMatch) {
        const colList = selectMatch[1].trim();
        if (colList !== '*') {
          const selectedCols = colList.split(',').map((c) => c.trim().split(/\s+as\s+/i)[0].trim());
          filteredRows = filteredRows.map((r) => {
            const projected: SqlRow = {};
            for (const col of selectedCols) {
              if (col in r) {
                projected[col] = r[col];
              }
            }
            return Object.keys(projected).length > 0 ? projected : r;
          });
        }
      }

      const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
      return {
        success: true,
        output: formatAsciiTable(filteredRows),
        executionTimeMs,
      };
    }

    if (lower.startsWith('insert') || lower.startsWith('update') || lower.startsWith('delete')) {
      const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
      return {
        success: true,
        output: `Query OK, 1 row affected (${executionTimeMs} ms)\nStatement: ${trimmed}`,
        executionTimeMs,
      };
    }

    if (lower.startsWith('create') || lower.startsWith('alter') || lower.startsWith('drop')) {
      const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
      return {
        success: true,
        output: `DDL Statement executed successfully (${executionTimeMs} ms)\nSchema modified: ${trimmed}`,
        executionTimeMs,
      };
    }

    // Generic SQL statement fallback
    const executionTimeMs = Math.max(1, Math.round(performance.now() - startTime));
    return {
      success: true,
      output: `SQL statement executed successfully (${executionTimeMs} ms)\nResult: OK`,
      executionTimeMs,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      output: '',
      error: `SQL Syntax Error: ${errorMsg}`,
      executionTimeMs: Math.max(1, Math.round(performance.now() - startTime)),
    };
  }
}

export function validateSqlExercise(sql: string, exercise: CodingExercise): ValidationResult {
  const startTime = performance.now();
  const execResult = executeSqlQuery(sql);

  const cleanSql = sql.replace(/\s+/g, ' ').trim().toLowerCase();
  const results: TestCaseResult[] = [];
  let totalPassed = 0;

  for (const tc of exercise.testCases) {
    const expectedStr = String(tc.expectedOutput).trim();
    const cleanExpected = expectedStr.replace(/\s+/g, ' ').trim().toLowerCase();

    // Check if expected output is in the formatted ASCII output or if user query matches expected query
    let passed = false;
    if (exercise.validationType === 'text_match' || !exercise.validationType) {
      passed = cleanSql.includes(cleanExpected) || cleanExpected.includes(cleanSql);
      // Also pass if the query executed successfully and output contains the expected table markers
      if (!passed && execResult.success && execResult.output.toLowerCase().includes(cleanExpected)) {
        passed = true;
      }
    } else {
      passed = execResult.output.includes(expectedStr) || execResult.output.toLowerCase().includes(cleanExpected);
    }

    if (passed) totalPassed++;

    results.push({
      id: tc.id,
      description: tc.description,
      passed,
      actualOutput: execResult.success ? execResult.output : execResult.error,
      expectedOutput: expectedStr,
      error: passed ? undefined : execResult.error,
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
    error: overallSuccess ? undefined : execResult.error || 'SQL query does not satisfy the exercise test requirements.',
  };
}
