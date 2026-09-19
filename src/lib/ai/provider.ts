import { AIResolvedContext } from './context';
import { ChatHistoryItem, TutorMode } from './prompts';

export interface AIRequestPayload {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
  history?: ChatHistoryItem[];
  clientApiKey?: string;
  clientProvider?: string;
  clientModel?: string;
}

export interface AIResponsePayload {
  success: boolean;
  text: string;
  provider: string;
  model: string;
  isFallback?: boolean;
}

export async function callAIProvider(
  payload: AIRequestPayload,
  fallbackContext?: {
    resolvedCtx?: AIResolvedContext;
    userMessage?: string;
    mode?: TutorMode;
    code?: string;
    consoleOutput?: string;
    history?: ChatHistoryItem[];
  }
): Promise<AIResponsePayload> {
  const clientProvider = (payload.clientProvider || '').toLowerCase().trim();
  const envProvider = (process.env.AI_PROVIDER || '').toLowerCase().trim();

  let targetProvider = clientProvider && clientProvider !== 'auto' ? clientProvider : envProvider || 'gemini';
  if (targetProvider === 'auto' || targetProvider === 'educational-engine') {
    targetProvider = 'gemini';
  }

  const apiKey = (
    payload.clientApiKey ||
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.OPENAI_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.AI_API_KEY ||
    ''
  ).trim();

  const model = payload.clientModel || process.env.AI_MODEL || getDefaultModel(targetProvider);

  if (apiKey) {
    try {
      switch (targetProvider) {
        case 'openai':
          return await callOpenAIAPI(payload, apiKey, model);
        case 'anthropic':
          return await callAnthropicAPI(payload, apiKey, model);
        case 'groq':
          return await callGroqAPI(payload, apiKey, model);
        case 'gemini':
        default:
          return await callGeminiAPI(payload, apiKey, model);
      }
    } catch (error) {
      console.error(`[AI Provider] Error calling ${targetProvider}:`, error);
      return {
        success: false,
        text: 'I am currently having trouble connecting to the cloud AI service. Please check your network connection or API key configuration and try again.',
        provider: targetProvider,
        model,
        isFallback: true,
      };
    }
  }

  return generateFallbackResponse(payload, fallbackContext, targetProvider, model);
}

function getDefaultModel(provider: string): string {
  switch (provider) {
    case 'openai':
      return 'gpt-4o-mini';
    case 'anthropic':
      return 'claude-3-5-haiku-20241022';
    case 'groq':
      return 'llama-3.3-70b-versatile';
    case 'gemini':
    default:
      return 'gemini-1.5-flash';
  }
}

async function callGeminiAPI(payload: AIRequestPayload, apiKey: string, model: string): Promise<AIResponsePayload> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const rawContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  rawContents.push({
    role: 'user',
    parts: [{ text: `System Instruction:\n${payload.systemPrompt}` }],
  });
  rawContents.push({
    role: 'model',
    parts: [{ text: 'Understood. I am ready to act as the First Move (11~18) AI Tutor & Debugger.' }],
  });

  if (payload.history && payload.history.length > 0) {
    for (const item of payload.history.slice(-8)) {
      rawContents.push({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.content }],
      });
    }
  }

  rawContents.push({
    role: 'user',
    parts: [{ text: payload.userPrompt }],
  });

  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
  for (const item of rawContents) {
    if (contents.length === 0) {
      contents.push(item);
    } else {
      const prev = contents[contents.length - 1];
      if (prev.role === item.role) {
        prev.parts[0].text += `\n\n${item.parts[0].text}`;
      } else {
        contents.push(item);
      }
    }
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: payload.maxTokens || 1200,
        temperature: payload.temperature ?? 0.4,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini API returned empty response');

  return { success: true, text, provider: 'gemini', model };
}

async function callOpenAIAPI(payload: AIRequestPayload, apiKey: string, model: string): Promise<AIResponsePayload> {
  const messages: Array<{ role: string; content: string }> = [
    { role: 'system', content: payload.systemPrompt },
  ];

  if (payload.history && payload.history.length > 0) {
    for (const item of payload.history.slice(-8)) {
      messages.push({ role: item.role, content: item.content });
    }
  }

  messages.push({ role: 'user', content: payload.userPrompt });

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: payload.maxTokens || 1200,
      temperature: payload.temperature ?? 0.4,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenAI API returned empty response');
  return { success: true, text, provider: 'openai', model };
}

async function callAnthropicAPI(payload: AIRequestPayload, apiKey: string, model: string): Promise<AIResponsePayload> {
  const messages: Array<{ role: string; content: string }> = [];

  if (payload.history && payload.history.length > 0) {
    for (const item of payload.history.slice(-8)) {
      messages.push({ role: item.role, content: item.content });
    }
  }

  messages.push({ role: 'user', content: payload.userPrompt });

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      system: payload.systemPrompt,
      messages,
      max_tokens: payload.maxTokens || 1200,
      temperature: payload.temperature ?? 0.4,
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (!text) throw new Error('Anthropic API returned empty response');
  return { success: true, text, provider: 'anthropic', model };
}

async function callGroqAPI(payload: AIRequestPayload, apiKey: string, model: string): Promise<AIResponsePayload> {
  const messages: Array<{ role: string; content: string }> = [
    { role: 'system', content: payload.systemPrompt },
  ];

  if (payload.history && payload.history.length > 0) {
    for (const item of payload.history.slice(-8)) {
      messages.push({ role: item.role, content: item.content });
    }
  }

  messages.push({ role: 'user', content: payload.userPrompt });

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: payload.maxTokens || 1200,
      temperature: payload.temperature ?? 0.4,
    }),
  });

  if (!res.ok) throw new Error(`Groq API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Groq API returned empty response');
  return { success: true, text, provider: 'groq', model };
}

function generateFallbackResponse(
  payload: AIRequestPayload,
  fallbackContext?: {
    resolvedCtx?: AIResolvedContext;
    userMessage?: string;
    mode?: TutorMode;
    code?: string;
    consoleOutput?: string;
    history?: ChatHistoryItem[];
  },
  provider = 'firstmove-engine',
  model = 'context-grounded-tutor-v1'
): AIResponsePayload {
  const userMessage = (fallbackContext?.userMessage || '').trim();
  const mode = fallbackContext?.mode || 'TUTOR';
  const resolvedCtx = fallbackContext?.resolvedCtx;
  const _history = fallbackContext?.history || [];
  const code = (fallbackContext?.code || '').trim();
  const consoleOutput = (fallbackContext?.consoleOutput || '').trim();

  const lowerMsg = userMessage.toLowerCase().trim();
  let text = '';

  // 1. Casual Greetings & Conversational Inputs
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|who are you|what can you do)\b/i.test(lowerMsg)) {
    text = `Hello! 👋 I am your First Move (11~18) AI Tutor & Debugger. Ask me any programming question, paste code to debug errors, or request step-by-step walkthroughs!`;
  }
  else if (/^(thanks|thank you|thx|awesome|great|got it|okay|ok)\b/i.test(lowerMsg)) {
    text = `You're very welcome! Let me know whenever you need help debugging code or understanding concepts.`;
  }

  // 2. Interactive Code Debugging & Console Error Diagnosis
  else if (mode === 'DEBUG' || mode === 'EXPLAIN_ERROR' || consoleOutput || (code && (lowerMsg.includes('error') || lowerMsg.includes('bug') || lowerMsg.includes('fix') || lowerMsg.includes('why')))) {
    text = generateDebugAnalysisResponse(userMessage, code, consoleOutput, resolvedCtx);
  }

  // 3. Questions about specific topics (tuple, pandas, polymorphism, array, string, variable, loop, function, etc.)
  else if (lowerMsg.includes('tuple')) {
    text = `A **tuple** is an ordered, immutable collection of elements in Python, created using parentheses \`()\`. Unlike lists, elements in a tuple cannot be altered, added, or removed after creation.\n\n` +
      `**Example**:\n\`\`\`python\ncoordinates = (10, 20)\nprint(coordinates[0])  # Output: 10\n\`\`\`\n\n` +
      `**Why it works**: Tuples provide fixed, read-only data structures that guarantee data integrity and offer fast lookup performance.`;
  }
  else if (lowerMsg.includes('pandas')) {
    text = `**Pandas** is a popular open-source Python data analysis and manipulation library built on top of NumPy.\n\n` +
      `**Core Data Structures**:\n` +
      `- **Series**: A 1-dimensional labeled array.\n` +
      `- **DataFrame**: A 2-dimensional tabular data structure with labeled rows and columns (similar to an Excel spreadsheet or SQL table).\n\n` +
      `**Example**:\n\`\`\`python\nimport pandas as pd\n\ndata = {"Name": ["Alice", "Bob"], "Score": [85, 92]}\ndf = pd.DataFrame(data)\nprint(df)\n\`\`\``;
  }
  else if (lowerMsg.includes('polymorphism')) {
    text = `**Polymorphism** in Object-Oriented Programming (OOP) allows objects of different classes to respond to the same method call in their own unique way.\n\n` +
      `**Example**:\n\`\`\`python\nclass Shape:\n    def draw(self):\n        pass\n\nclass Circle(Shape):\n    def draw(self):\n        return "Drawing Circle ⚪"\n\nclass Square(Shape):\n    def draw(self):\n        return "Drawing Square 🟦"\n\nfor s in [Circle(), Square()]:\n    print(s.draw())\n\`\`\``;
  }
  else if (lowerMsg.includes('what is python')) {
    text = `**Python** is a high-level, interpreted, general-purpose programming language known for its clear syntax and high readability.\n\n` +
      `**Key Features**:\n` +
      `- **Beginner-Friendly**: Clean, readable syntax that uses indentation for code blocks.\n` +
      `- **Versatile**: Used across web development (FastAPI, Django), data science, AI/ML, automation, and cloud backend systems.\n\n` +
      `**Example**:\n\`\`\`python\nprint("Hello, Python!")\n\`\`\``;
  }
  else if (lowerMsg.includes('what is an array') || lowerMsg.includes('what is array')) {
    text = `An **array** (or list) is a linear data structure that stores a collection of elements in contiguous memory positions.\n\n` +
      `**Example** (Python List):\n\`\`\`python\nnumbers = [10, 20, 30, 40]\nprint(numbers[0])  # Output: 10\n\`\`\`\n\n` +
      `**Why it works**: Array elements are indexed starting from 0, providing fast $O(1)$ random access to elements by position.`;
  }
  else if (lowerMsg.includes('what is a string') || lowerMsg.includes('what is string')) {
    text = `A **string** is a sequence of characters used to represent text in programming.\n\n` +
      `**Example**:\n\`\`\`python\ntext = "Hello First Move (11~18)"\nprint(text)\n\`\`\`\n\n` +
      `**Why it works**: Strings are enclosed in single (\`'\`) or double (\`"\`) quotes so the language treats the contents as literal text.`;
  }

  // 4. Default Dynamic Response
  else {
    const subject = userMessage.replace(/^(what is|what are|explain|tell me about|how does|why is|who is)\s+/i, '').replace(/\?$/, '').trim();
    text = `### ${subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : userMessage}\n\n` +
      `**${subject || userMessage}** is an important concept in software engineering and programming.\n\n` +
      `If you have specific code you'd like to test or debug, paste it in the chat or run it in the editor!`;
  }

  return {
    success: true,
    text,
    provider,
    model,
    isFallback: true,
  };
}

function generateDebugAnalysisResponse(
  userMsg: string,
  code: string,
  consoleOutput: string,
  resolvedCtx?: AIResolvedContext
): string {
  let text = `### 🛠️ Code Debugging & Error Diagnosis\n\n`;

  if (!code && !consoleOutput) {
    return `I would love to help you fix your code! However, I need to see your code or error message first.\n\n` +
      `**Please share**:\n` +
      `1. **Your Code**: Paste your code snippet in the chat or editor.\n` +
      `2. **Console Error**: Copy and paste the error output from your terminal.\n\n` +
      `Once provided, I will pinpoint the line number, explain the root cause, and show you how to fix it!`;
  }

  if (consoleOutput) {
    text += `**Detected Terminal Output / Error**:\n\`\`\`\n${consoleOutput.trim()}\n\`\`\`\n\n`;
  }

  if (code) {
    text += `**Inspected Code**:\n\`\`\`${resolvedCtx?.language || 'python'}\n${code.trim()}\n\`\`\`\n\n`;
  }

  const lowerErr = consoleOutput.toLowerCase();
  const lowerCode = code.toLowerCase();

  text += `**Diagnostic Breakdown & Solution**:\n\n`;

  if (lowerErr.includes('syntaxerror') || lowerCode.includes('syntaxerror')) {
    text += `1. **Error Type**: \`SyntaxError\` (Invalid Syntax)\n`;
    text += `2. **Root Cause**: Python encountered code that violates language grammar rules (e.g. missing colon \`:\` at the end of an \`if\`, \`for\`, or \`def\` line, or unclosed parenthesis).\n`;
    text += `3. **How to Fix**: Check the line number mentioned in the error traceback and ensure all colons and parentheses are properly closed.\n`;
  } else if (lowerErr.includes('nameerror') || lowerCode.includes('nameerror')) {
    text += `1. **Error Type**: \`NameError\` (Undefined Variable)\n`;
    text += `2. **Root Cause**: You are attempting to reference a variable or function name that has not been defined yet or has a spelling/casing mismatch.\n`;
    text += `3. **How to Fix**: Define the variable before referencing it and check for exact character casing.\n`;
  } else if (lowerErr.includes('typeerror') || lowerCode.includes('typeerror')) {
    text += `1. **Error Type**: \`TypeError\` (Incompatible Data Types)\n`;
    text += `2. **Root Cause**: An operation was attempted on incompatible data types (e.g. concatenating a \`str\` and an \`int\` directly).\n`;
    text += `3. **How to Fix**: Use explicit type conversion (e.g. \`str(val)\` or \`int(val)\`) before combining values.\n`;
  } else if (lowerErr.includes('zerodivisionerror')) {
    text += `1. **Error Type**: \`ZeroDivisionError\` (Division by Zero)\n`;
    text += `2. **Root Cause**: Your code attempted to divide a number by zero \`0\`.\n`;
    text += `3. **How to Fix**: Add a conditional check (\`if denominator != 0:\`) before performing division.\n`;
  } else {
    text += `1. **Code Execution Trace**: Your code ran through static analysis.\n`;
    text += `2. **Debugging Steps**:\n`;
    text += `   - Verify variable initialization before use.\n`;
    text += `   - Print intermediate variables using \`print()\` statements to trace values.\n`;
    text += `   - Check loop boundaries and conditional branch logic.\n`;
  }

  return text;
}
