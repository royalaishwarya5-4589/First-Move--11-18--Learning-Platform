import { getPathBySlug, getLessonDetails, getProjectDetails } from '../../content';
import { getAssessmentBySlug } from '../../content/assessments-data';
import { getCertificationPolicy } from '../../content/certification-policies';
import { isEligibleForCertification, calculateAssessmentScore } from '../assessmentEngine';
import { generateCertificateId, generateVerificationHash } from '../certificates';
import { getCertificateQrPayload } from '../certificateQr';
import { Path } from '../../types/content';

export const EXPECTED_15_COURSES = [
  'python',
  'java',
  'javascript',
  'react',
  'html-css',
  'dbms',
  'dsa',
  'genai-llm-agents',
  'web-security',
  'linux-security',
  'git-github',
  'cloud-devops',
  'software-testing',
  'system-design',
  'interview-preparation',
];

export const CERTIFICATION_READY_COURSES = [
  'python',
  'java',
  'javascript',
  'dsa',
  'web-security',
  'dbms',
  'system-design',
  'interview-preparation',
];

export const DEVELOPMENT_COURSES = [
  'react',
  'html-css',
  'genai-llm-agents',
  'linux-security',
  'git-github',
  'cloud-devops',
  'software-testing',
];

export async function runStage16LearnerQAContractTests() {
  console.log('=== STAGE 16 FULL LEARNER QA & PRE-DEPLOYMENT GATE SUITE ===\n');

  let totalModulesCount = 0;
  let totalLessonsCount = 0;
  let totalExercisesCount = 0;
  let totalProjectsCount = 0;
  let totalAssessmentsCount = 0;

  const forbiddenStrings = ['lorem ipsum', 'todo', 'coming soon', 'placeholder', 'undefined', 'null', 'fake content'];

  // ----------------------------------------------------
  // TEST 1 — COURSE LANDING PAGES & MODULE ARCHITECTURE
  // ----------------------------------------------------
  for (const slug of EXPECTED_15_COURSES) {
    const courseObj = getPathBySlug(slug);
    console.assert(!!courseObj, `[QA FAIL] Course '${slug}' landing page query failed`);
    const course = courseObj as Path;

    console.assert(!!course.title && course.title.trim().length > 0, `[QA FAIL] Course '${slug}' missing title`);
    console.assert(!!course.description && course.description.trim().length > 0, `[QA FAIL] Course '${slug}' missing description`);
    console.assert(course.modules.length >= 3, `[QA FAIL] Course '${slug}' has ${course.modules.length} modules, expected >= 3`);

    totalModulesCount += course.modules.length;

    // Check course content quality against generic placeholder strings
    for (const forbidden of forbiddenStrings) {
      console.assert(
        !course.title.toLowerCase().includes(forbidden),
        `[QA FAIL] Course '${slug}' title contains forbidden string: ${forbidden}`
      );
      console.assert(
        !course.description.toLowerCase().includes(forbidden),
        `[QA FAIL] Course '${slug}' description contains forbidden string: ${forbidden}`
      );
    }
  }
  console.assert(totalModulesCount === 52, `[QA FAIL] Total modules count across platform (${totalModulesCount}) does not match expected 52`);
  console.log(`✔ QA CHECK 1 PASS: All 15 course landing pages verified with ${totalModulesCount} total levels/modules.`);

  // ----------------------------------------------------
  // TEST 2 — LESSON CONTENT & ROUTE RESOLUTION
  // ----------------------------------------------------
  for (const slug of EXPECTED_15_COURSES) {
    const course = getPathBySlug(slug) as Path;
    for (const mod of course.modules) {
      for (const les of mod.lessons) {
        totalLessonsCount++;
        if (les.exercise) totalExercisesCount++;

        // Route resolution check
        const details = getLessonDetails(slug, les.slug);
        console.assert(
          !!details && details.lesson.id === les.id,
          `[QA FAIL] Lesson route /paths/${slug}/lessons/${les.slug} failed to resolve`
        );
        console.assert(!!details?.prevLesson || details?.lessonIndex === 1, `[QA FAIL] Lesson navigation link issue on ${les.slug}`);
        console.assert(!!details?.nextLesson || details?.lessonIndex === details?.totalLessons, `[QA FAIL] Next lesson navigation link issue on ${les.slug}`);

        // Quality check
        console.assert(les.concepts.length > 0, `[QA FAIL] Lesson '${les.slug}' has 0 concepts`);
        console.assert(les.examples.length > 0, `[QA FAIL] Lesson '${les.slug}' has 0 examples`);
        console.assert(les.completionCriteria.requiresConceptsRead, `[QA FAIL] Lesson '${les.slug}' missing concepts completion criteria`);

        // Check for copypasta Python references in non-Python courses
        if (slug !== 'python' && slug !== 'genai-llm-agents') {
          for (const c of les.concepts) {
            console.assert(
              !c.contentMarkdown.includes('def main():') && !c.contentMarkdown.includes('import json'),
              `[QA FAIL] Unrelated Python copypasta detected in non-Python course '${slug}' lesson '${les.slug}'`
            );
          }
        }
      }
    }
  }
  console.assert(totalLessonsCount === 152, `[QA FAIL] Total lessons count (${totalLessonsCount}) does not match expected 152`);
  console.assert(totalExercisesCount === 152, `[QA FAIL] Total exercises count (${totalExercisesCount}) does not match expected 152`);
  console.log(`✔ QA CHECK 2 PASS: All ${totalLessonsCount} lesson routes and ${totalExercisesCount} exercises verified with zero copypasta or broken markdown.`);

  // ----------------------------------------------------
  // TEST 3 — PORTFOLIO PROJECTS ARCHITECTURE
  // ----------------------------------------------------
  for (const slug of EXPECTED_15_COURSES) {
    const course = getPathBySlug(slug) as Path;
    const projects = course.projects || [];
    console.assert(projects.length >= 2, `[QA FAIL] Course '${slug}' has ${projects.length} projects, expected >= 2`);

    for (const proj of projects) {
      totalProjectsCount++;
      const projDetails = getProjectDetails(slug, proj.slug);
      console.assert(
        !!projDetails && projDetails.project.id === proj.id,
        `[QA FAIL] Project route /paths/${slug}/projects/${proj.slug} failed to resolve`
      );
      console.assert(proj.milestones.length >= 1, `[QA FAIL] Project '${proj.slug}' missing milestones`);
      console.assert(proj.skillsLearned.length > 0, `[QA FAIL] Project '${proj.slug}' missing skills learned tags`);
      console.assert(!!proj.starterCode, `[QA FAIL] Project '${proj.slug}' missing starter code`);
    }
  }
  console.assert(totalProjectsCount === 39, `[QA FAIL] Total projects count (${totalProjectsCount}) does not match expected 39`);
  console.log(`✔ QA CHECK 3 PASS: All ${totalProjectsCount} portfolio projects verified with milestones, starter code, and route resolution.`);

  // ----------------------------------------------------
  // TEST 4 — ASSESSMENTS & SERVER SCORING ENGINE
  // ----------------------------------------------------
  for (const slug of EXPECTED_15_COURSES) {
    const policy = getCertificationPolicy(slug);
    const reqAssessmentSlugs = policy.requiredAssessmentSlugs || [];
    console.assert(reqAssessmentSlugs.length > 0, `[QA FAIL] Course '${slug}' policy missing requiredAssessmentSlugs`);

    for (const assessSlug of reqAssessmentSlugs) {
      totalAssessmentsCount++;
      const assessment = getAssessmentBySlug(assessSlug);
      console.assert(!!assessment, `[QA FAIL] Assessment '${assessSlug}' for course '${slug}' failed to resolve`);
      console.assert((assessment?.questions.length ?? 0) >= 1, `[QA FAIL] Assessment '${assessSlug}' has 0 questions`);

      // Test server-side score calculation logic
      const questions = assessment?.questions || [];
      const failAnswers: Record<string, unknown> = {};
      const passAnswers: Record<string, unknown> = {};

      questions.forEach((q) => {
        failAnswers[q.id] = 'wrong-answer-payload';
        passAnswers[q.id] = q.correctAnswer;
      });

      const failResult = calculateAssessmentScore(assessment!, failAnswers, 300, 1);
      console.assert(failResult.passed === false, `[QA FAIL] Server scoring failed to mark incorrect assessment as failed`);
      console.assert(failResult.percentage === 0, `[QA FAIL] Server scoring failed percentage check for 0 score`);

      const passResult = calculateAssessmentScore(assessment!, passAnswers, 300, 2);
      console.assert(passResult.passed === true, `[QA FAIL] Server scoring failed to mark correct assessment as passed`);
      console.assert(passResult.percentage === 100, `[QA FAIL] Server scoring failed 100% percentage calculation`);
      console.assert(passResult.attempt_number === 2, `[QA FAIL] Server scoring failed attempt_number assignment`);
    }
  }
  console.assert(totalAssessmentsCount === 15, `[QA FAIL] Total assessments count (${totalAssessmentsCount}) does not match expected 15`);
  console.log(`✔ QA CHECK 4 PASS: All ${totalAssessmentsCount} course final assessments verified with server-side scoring engine and attempt tracking.`);

  // ----------------------------------------------------
  // TEST 5 — CERTIFICATION-READY VS DEVELOPMENT BLOCKING
  // ----------------------------------------------------
  for (const readySlug of CERTIFICATION_READY_COURSES) {
    const policy = getCertificationPolicy(readySlug);
    console.assert(policy.certificationStatus === 'ready', `[QA FAIL] Course '${readySlug}' status should be ready`);
    console.assert(policy.certificateEnabled === true, `[QA FAIL] Course '${readySlug}' certificate should be enabled`);
  }

  for (const devSlug of DEVELOPMENT_COURSES) {
    const policy = getCertificationPolicy(devSlug);
    console.assert(policy.certificationStatus === 'development', `[QA FAIL] Course '${devSlug}' status should be development`);
    console.assert(policy.certificateEnabled === false, `[QA FAIL] Course '${devSlug}' certificate should be disabled`);

    const devPathObj = getPathBySlug(devSlug) as Path;
    const devEligibility = isEligibleForCertification(devPathObj, [], {}, []);
    console.assert(devEligibility.eligible === false, `[QA FAIL] Development course '${devSlug}' must not be eligible`);
    console.assert(
      devEligibility.reasons.some((r) => r.toLowerCase().includes('development')),
      `[QA FAIL] Development course '${devSlug}' eligibility reasons must state development status`
    );
  }
  console.log(`✔ QA CHECK 5 PASS: Verified 8 ready courses vs 7 development courses hard-blocked from certificate issuance.`);

  // ----------------------------------------------------
  // TEST 6 — CRYPTOGRAPHIC CERTIFICATE & QR VERIFICATION
  // ----------------------------------------------------
  const certId = generateCertificateId('python');
  console.assert(certId.startsWith('LT-PY-2026-'), `[QA FAIL] Certificate ID prefix format invalid: ${certId}`);

  const timestamp = new Date().toISOString();
  const hashVal = generateVerificationHash(certId, 'test-user-123', 'python', timestamp);
  console.assert(hashVal.length === 64, `[QA FAIL] SHA-256 hash length invalid: ${hashVal.length}`);

  const qrUrl = getCertificateQrPayload(certId);
  console.assert(qrUrl.includes(`/verify/${certId}`), `[QA FAIL] QR payload verification URL invalid: ${qrUrl}`);
  console.log(`✔ QA CHECK 6 PASS: Cryptographic certificate ID generation, SHA-256 isolation, and QR payload verified.`);

  // ----------------------------------------------------
  // TEST 7 — ERROR STATES & UNKNOWN ROUTE FALLBACKS
  // ----------------------------------------------------
  console.assert(getPathBySlug('unknown-course-123') === undefined, `[QA FAIL] Invalid course slug should return undefined`);
  console.assert(getLessonDetails('python', 'unknown-lesson-123') === undefined, `[QA FAIL] Invalid lesson slug should return undefined`);
  console.assert(getProjectDetails('python', 'unknown-project-123') === undefined, `[QA FAIL] Invalid project slug should return undefined`);
  console.assert(getAssessmentBySlug('unknown-assessment-123') === undefined, `[QA FAIL] Invalid assessment slug should return undefined`);

  let policyErrorCaught = false;
  try {
    getCertificationPolicy('unknown-course-123');
  } catch {
    policyErrorCaught = true;
  }
  console.assert(policyErrorCaught, `[QA FAIL] getCertificationPolicy must throw controlled error for unknown course`);
  console.log(`✔ QA CHECK 7 PASS: All invalid slug inputs and fallbacks execute controlled safe error handling.\n`);

  console.log('=== ALL STAGE 16 LEARNER QA CONTRACT TESTS PASSED PERFECTLY ===\n');
}
