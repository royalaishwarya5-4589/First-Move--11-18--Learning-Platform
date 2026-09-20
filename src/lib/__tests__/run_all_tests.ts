import { runStage11_5ContractTests } from './stage11_5_contracts';
import { runStage12ContractTests } from './stage12_analytics_contracts';
import { runStage13ProductionHardeningTests } from './stage13_production_contracts';
import { runStage15CourseContentContractTests } from './stage15_course_content_contracts';
import { runStage16LearnerQAContractTests } from './stage16_learner_qa_contracts';
import { runStage16_5RealWorldHttpQATests } from './stage16_5_realworld_http_qa';
import { runStage19MultiLanguageRunnerSuite } from './stage19_multi_language_runner';

async function main() {
  console.log('--------------------------------------------------');
  console.log('RUNNING ALL PLATFORM CONTRACT & REGRESSION SUITES');
  console.log('--------------------------------------------------\n');

  await runStage11_5ContractTests();
  runStage12ContractTests();
  await runStage13ProductionHardeningTests();
  await runStage15CourseContentContractTests();
  await runStage16LearnerQAContractTests();
  await runStage16_5RealWorldHttpQATests();
  await runStage19MultiLanguageRunnerSuite();

  console.log('--------------------------------------------------');
  console.log('ALL CONTRACT SUITES PASSED SUCCESSFULLY!');
  console.log('--------------------------------------------------');
}

main().catch((err) => {
  console.error('TEST SUITE FAILED:', err);
  process.exit(1);
});
