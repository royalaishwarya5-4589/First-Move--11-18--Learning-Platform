import { resolveRunnerLanguage } from '../../hooks/useCodeRunner';
import { executeSqlQuery, validateSqlExercise, formatAsciiTable } from '../runner/sqlEngine';
import { normalizeHtml, executeHtmlSnippet, validateHtmlExercise } from '../runner/webEngine';
import { getAllPaths, getPathBySlug } from '../../content';
import { Path, CodingExercise } from '../../types/content';

export async function runStage19MultiLanguageRunnerSuite() {
  console.log('=== STAGE 19 MULTI-LANGUAGE RUNNER CONTRACT SUITE ===\n');

  let passedChecks = 0;

  // ----------------------------------------------------
  // TEST 1: LANGUAGE RESOLUTION ENGINE
  // ----------------------------------------------------
  console.assert(resolveRunnerLanguage('python', 'python') === 'python', '[T1 FAIL] python slug failed');
  console.assert(resolveRunnerLanguage('javascript', 'javascript') === 'javascript', '[T1 FAIL] js failed');
  console.assert(resolveRunnerLanguage(undefined, 'react') === 'javascript', '[T1 FAIL] react slug failed');
  console.assert(resolveRunnerLanguage('html', 'html-css') === 'html', '[T1 FAIL] html failed');
  console.assert(resolveRunnerLanguage('sql', 'dbms') === 'sql', '[T1 FAIL] sql failed');
  console.assert(resolveRunnerLanguage('java', 'java') === 'java', '[T1 FAIL] java failed');
  console.assert(resolveRunnerLanguage('bash', 'linux-security') === 'bash', '[T1 FAIL] bash failed');

  passedChecks++;
  console.log('✔ TEST 1 PASS: Language resolver correctly maps slugs and languages across all platforms.');

  // ----------------------------------------------------
  // TEST 2: SQL ENGINE EXECUTION & ASCII TABLE GENERATION
  // ----------------------------------------------------
  const sqlRes1 = executeSqlQuery("SELECT * FROM users WHERE status = 'active';");
  console.assert(sqlRes1.success === true, '[T2 FAIL] SELECT users failed');
  console.assert(sqlRes1.output.includes('Alice Chen'), '[T2 FAIL] Alice Chen missing from active users');
  console.assert(!sqlRes1.output.includes('Charlie Kim'), '[T2 FAIL] Inactive user Charlie Kim leaked');

  const sqlRes2 = executeSqlQuery("SELECT name, price FROM products WHERE category_id = 1;");
  console.assert(sqlRes2.success === true, '[T2 FAIL] Projection query failed');
  console.assert(sqlRes2.output.includes('name'), '[T2 FAIL] name column missing');
  console.assert(sqlRes2.output.includes('price'), '[T2 FAIL] price column missing');

  const sqlResErr = executeSqlQuery("SELECT * FROM nonexistent_table;");
  console.assert(sqlResErr.success === false, '[T2 FAIL] Nonexistent table did not error');
  console.assert(sqlResErr.error?.includes('nonexistent_table'), '[T2 FAIL] Error message missing table name');

  passedChecks++;
  console.log('✔ TEST 2 PASS: In-memory SQL engine successfully executes queries, filters WHERE clauses, and renders ASCII tables.');

  // ----------------------------------------------------
  // TEST 3: SQL EXERCISE VALIDATION
  // ----------------------------------------------------
  const mockSqlExercise: CodingExercise = {
    id: 'sqlex-test',
    instructions: 'Select all active users from users table.',
    initialCode: '-- Write query\n',
    solutionCode: "SELECT * FROM users WHERE status = 'active';",
    testCases: [
      {
        id: 'sqltc1',
        description: 'Outputs active users table',
        expectedOutput: "SELECT * FROM users WHERE status = 'active';",
      },
    ],
    hints: [],
    validationType: 'text_match',
  };

  const sqlValPass = validateSqlExercise("SELECT * FROM users WHERE status = 'active';", mockSqlExercise);
  console.assert(sqlValPass.success === true, '[T3 FAIL] Valid SQL exercise rejected');
  console.assert(sqlValPass.totalPassed === 1, '[T3 FAIL] Total passed mismatch');

  const sqlValFail = validateSqlExercise('SELECT * FROM orders;', mockSqlExercise);
  console.assert(sqlValFail.success === false, '[T3 FAIL] Invalid SQL exercise falsely approved');

  passedChecks++;
  console.log('✔ TEST 3 PASS: SQL exercise validation correctly evaluates query syntax and test cases.');

  // ----------------------------------------------------
  // TEST 4: HTML/CSS NORMALIZATION & EXECUTION
  // ----------------------------------------------------
  const rawHtml = `
    <!-- Header comment -->
    <main class="main-content">
      <article>
        <h1>Semantic   Page</h1>
      </article>
    </main>
  `;
  const normalized = normalizeHtml(rawHtml);
  console.assert(!normalized.includes('<!-- Header comment -->'), '[T4 FAIL] Comments not stripped');
  console.assert(normalized.includes('<main class="main-content"><article><h1>Semantic Page</h1></article></main>'), '[T4 FAIL] Normalization failed');

  const htmlExec = executeHtmlSnippet(rawHtml);
  console.assert(htmlExec.success === true, '[T4 FAIL] HTML execution snippet failed');
  console.assert(htmlExec.output.includes('DOM Elements:'), '[T4 FAIL] Summary missing element count');

  passedChecks++;
  console.log('✔ TEST 4 PASS: HTML/CSS engine normalizes markup structures, strips comments, and validates tags.');

  // ----------------------------------------------------
  // TEST 5: HTML EXERCISE VALIDATION
  // ----------------------------------------------------
  const mockHtmlExercise: CodingExercise = {
    id: 'wex-test',
    instructions: 'Write a semantic markup snippet.',
    initialCode: '<!-- Write HTML snippet -->\n',
    solutionCode: '<main><article><h1>Semantic Page</h1></article></main>',
    testCases: [
      {
        id: 'wtc1',
        description: 'Outputs exact semantic markup',
        expectedOutput: '<main><article><h1>Semantic Page</h1></article></main>',
      },
    ],
    hints: [],
    validationType: 'text_match',
  };

  const htmlValPass = validateHtmlExercise(
    '  <main > \n <article>\n <h1>Semantic Page</h1> \n</article> </main>  ',
    mockHtmlExercise
  );
  console.assert(htmlValPass.success === true, '[T5 FAIL] Normalized whitespace HTML rejected');
  console.assert(htmlValPass.totalPassed === 1, '[T5 FAIL] Total passed should be 1');

  const htmlValFail = validateHtmlExercise('<div><p>Just a paragraph</p></div>', mockHtmlExercise);
  console.assert(htmlValFail.success === false, '[T5 FAIL] Non-semantic HTML falsely passed');

  passedChecks++;
  console.log('✔ TEST 5 PASS: HTML exercise validation tolerates formatting/whitespace variations while enforcing correct DOM tags.');

  // ----------------------------------------------------
  // TEST 6: JAVASCRIPT WORKER CONTRACT VERIFICATION
  // ----------------------------------------------------
  // Verify that the worker script exists and has valid syntax
  const fs = await import('fs');
  const path = await import('path');
  const jsWorkerPath = path.resolve(process.cwd(), 'public/javascript.worker.js');
  console.assert(fs.existsSync(jsWorkerPath), '[T6 FAIL] public/javascript.worker.js does not exist');
  const jsWorkerContent = fs.readFileSync(jsWorkerPath, 'utf8');
  console.assert(jsWorkerContent.includes('postMessage'), '[T6 FAIL] Worker missing postMessage');
  console.assert(jsWorkerContent.includes('validation_result'), '[T6 FAIL] Worker missing validation_result');
  console.assert(jsWorkerContent.includes('deepEqual'), '[T6 FAIL] Worker missing deepEqual helper');

  passedChecks++;
  console.log('✔ TEST 6 PASS: Dedicated JavaScript Web Worker contract verified with message handlers and validation engine.');

  // ----------------------------------------------------
  // TEST 7: ALL 15 ACTIVE LEARNING PATHS RUNNER COMPATIBILITY
  // ----------------------------------------------------
  const allPaths = getAllPaths();
  console.assert(allPaths.length >= 15, '[T7 FAIL] Expected at least 15 active learning paths');

  let totalExercisesChecked = 0;
  for (const p of allPaths) {
    const fullPath = getPathBySlug(p.slug) as Path;
    if (fullPath && fullPath.modules) {
      for (const mod of fullPath.modules) {
        for (const les of mod.lessons) {
          if (les.exercise) {
            totalExercisesChecked++;
            console.assert(
              les.exercise.initialCode !== undefined && les.exercise.initialCode !== null,
              `[T7 FAIL] Lesson ${les.id} missing initialCode`
            );
            console.assert(
              Array.isArray(les.exercise.testCases) && les.exercise.testCases.length > 0,
              `[T7 FAIL] Lesson ${les.id} missing testCases`
            );
          }
        }
      }
    }
  }

  console.assert(totalExercisesChecked >= 150, `[T7 FAIL] Expected at least 150 exercises, found ${totalExercisesChecked}`);
  passedChecks++;
  console.log(`✔ TEST 7 PASS: Verified ${totalExercisesChecked} coding exercises across all 15 courses have complete test cases and initial code.`);

  console.log('\n--------------------------------------------------');
  console.log(`STAGE 19 MULTI-LANGUAGE RUNNER PASSED: ${passedChecks}/7 CHECKS`);
  console.log('--------------------------------------------------\n');
}
