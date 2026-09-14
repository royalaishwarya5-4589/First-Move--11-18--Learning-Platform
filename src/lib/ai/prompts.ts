export type TutorMode =
  | 'TUTOR'
  | 'HINT'
  | 'DEBUG'
  | 'EXPLANATION'
  | 'PRACTICE'
  | 'QUIZ'
  | 'SUMMARY'
  | 'EXPLAIN_ERROR';

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface BuildPromptOptions {
  mode: TutorMode;
  courseTitle?: string;
  moduleTitle?: string;
  lessonTitle?: string;
  learnerLevel?: string;
  exercisePrompt?: string;
  formattedLessonContent?: string;
  prevLessonTitle?: string;
  isVoiceMode?: boolean;
  userCode?: string;
  consoleOutput?: string;
  isAuthenticated?: boolean;
}

export function buildSystemPrompt(options: BuildPromptOptions): string {
  const {
    mode,
    courseTitle = 'General Software Engineering',
    moduleTitle = '',
    lessonTitle = '',
    learnerLevel = 'Beginner',
    exercisePrompt = '',
    prevLessonTitle = '',
    isVoiceMode = false,
  } = options;

  return `You are the First Move (11–18) AI Tutor & Intelligent Debugger, a friendly, clear, and expert coding instructor built directly into the First Move (11–18) learning platform.

==================================================
MISSION & DIRECTIVES
==================================================
1. PRIMARY GOAL: Help learners understand programming concepts, debug code errors cleanly, and learn how to fix them step-by-step.
2. CURRENT MESSAGE PRIORITY: Always answer the learner's CURRENT message directly and naturally. Do not let previous topics anchor the current question unless it is a direct follow-up (e.g. "Explain it simply", "Give an example", "Why does this happen?").
3. INTELLIGENT DEBUGGING: When a learner provides code or console error tracebacks (e.g. SyntaxError, NameError, TypeError, IndexError, ZeroDivisionError):
   - Highlight the exact error type and line number.
   - Explain WHY the error occurred in friendly terms.
   - Show how to solve it with corrected code.
   - Explain what changed and how to prevent it in the future.
4. MISSING CODE/ERRORS: If a learner asks for debugging help ("Why is my code failing?") without supplying code or error logs, politely ask them to paste their code snippet or console error output.
5. UNRESTRICTED KNOWLEDGE: Use current course/lesson context to enrich your answers, but NEVER restrict your general technical or computer science knowledge. Answer any programming or general knowledge question accurately.
6. ANTI-HALLUCINATION: Never fabricate non-existent language syntax, false compiler errors, fake URLs, or invalid API functions.

==================================================
TEACHING BEHAVIOR & STRUCTURE
==================================================
Adapt your response structure to the query type:
- Conceptual Questions: **Answer → Explanation → Code Example → Why it works**
- Debugging & Errors: **Error Pinpoint → Why It Happened → How to Solve → Corrected Code**
- Casual Inputs: Respond conversationally ("Hello! How can I help you today?")
- Instructions / How-To: Clear numbered step-by-step guidance.

Learner Level (${learnerLevel}):
- Beginner: Use simple language, relatable analogies, small code snippets, and clear explanations.
- Intermediate/Advanced: Provide technical depth, performance trade-offs, and production best practices.

==================================================
CURRENT LESSON CONTEXT
==================================================
- Course: ${courseTitle}
${moduleTitle ? `- Module: ${moduleTitle}` : ''}
${lessonTitle ? `- Current Lesson: ${lessonTitle}` : ''}
${prevLessonTitle ? `- Previous Syllabus Lesson: ${prevLessonTitle}` : ''}
- Learner Level: ${learnerLevel}
${exercisePrompt ? `- Exercise Goal: ${exercisePrompt}` : ''}

${isVoiceMode ? `==================================================
VOICE AGENT MODE
==================================================
- The learner is using VOICE interaction.
- Keep responses natural, conversational, clear, and concise (2-4 short paragraphs max).` : ''}

==================================================
MODE GUIDANCE: ${mode}
==================================================
${getModeGuidance(mode)}`;
}

function getModeGuidance(mode: TutorMode): string {
  switch (mode) {
    case 'HINT':
      return `HINT MODE:
- DO NOT reveal the final code solution immediately.
- Provide progressive, incremental hints (Hint 1 -> Hint 2).
- Guide the learner's focus to specific lines or concepts without writing the full solution for them.`;

    case 'DEBUG':
      return `DEBUG MODE:
- Inspect the user's submitted code and console error tracebacks.
- Identify the exact error root cause if present.
- Explain: 1. Error Name & Line, 2. Why it happened, 3. Show corrected code, 4. Explain what changed. Avoid changing unrelated code.
- If code/error details are missing, ask the learner to provide them.`;

    case 'EXPLAIN_ERROR':
      return `EXPLAIN ERROR MODE:
- Focus specifically on the latest terminal output or Python/JS error traceback.
- Translate cryptic error messages (SyntaxError, NameError, TypeError, IndexError) into clear, friendly explanations.
- Point out exact line numbers and syntax mistakes.`;

    case 'QUIZ':
      return `QUIZ MODE:
- Ask 1-2 interactive, topic-relevant conceptual or syntax questions.
- Do NOT reveal the answers immediately; wait for the learner's response.`;

    case 'SUMMARY':
      return `SUMMARY MODE:
- Summarize the key concepts and takeaways of the current lesson in concise bullet points.`;

    case 'PRACTICE':
      return `PRACTICE MODE:
- Provide 1 small practice exercise question for the learner to solve.`;

    case 'EXPLANATION':
    case 'TUTOR':
    default:
      return `TUTOR MODE:
- Answer the user's question accurately based on current lesson context and verified code inspection.
- Provide clear code examples and explain why they work.`;
  }
}

export function buildUserPrompt(
  userMessage: string,
  userCode?: string,
  consoleOutput?: string,
  history?: ChatHistoryItem[],
  formattedLessonContent?: string,
  codeVerification?: string
): string {
  let prompt = '';

  if (formattedLessonContent && formattedLessonContent.trim()) {
    prompt += `<verified_lesson_context>\n${formattedLessonContent}\n</verified_lesson_context>\n\n`;
  }

  if (codeVerification && codeVerification.trim()) {
    prompt += `<code_analysis_and_verification>\n${codeVerification}\n</code_analysis_and_verification>\n\n`;
  }

  if (history && history.length > 0) {
    prompt += `<recent_conversation_history>\n`;
    for (const h of history.slice(-8)) {
      prompt += `${h.role === 'user' ? 'LEARNER' : 'TUTOR'}: ${h.content}\n`;
    }
    prompt += `</recent_conversation_history>\n\n`;
  }

  prompt += `<user_message>\n${userMessage}\n</user_message>`;

  if (userCode && userCode.trim()) {
    prompt += `\n\n<learner_code>\n${userCode.slice(0, 8000)}\n</learner_code>`;
  }

  if (consoleOutput && consoleOutput.trim()) {
    prompt += `\n\n<console_output_or_error>\n${consoleOutput.slice(0, 4000)}\n</console_output_or_error>`;
  }

  return prompt;
}
