import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const javascriptPath: Path = {
  id: 'javascript-mastery',
  slug: 'javascript',
  title: 'JavaScript & Modern ES6+',
  subtitle: 'Master modern ECMAScript standards, asynchronous promises, DOM architecture, and browser execution engines.',
  description: 'Master JavaScript from fundamental syntax, closure scopes, and higher-order functions to asynchronous event loops, Promises, DOM manipulation, and ES modules.',
  icon: '⚡',
  category: 'web',
  categoryLabel: 'Web Development',
  isActive: true,
  status: 'active',
  courseType: 'coding',
  difficulty: 'intermediate',
  estimatedHours: 40,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['javascript'],
  projects: [
    {
      id: 'js-proj-1',
      slug: 'js-task-manager-dashboard',
      title: 'Interactive DOM Task Management Dashboard',
      subtitle: 'Build a dynamic web dashboard featuring drag-and-drop task items, dynamic state filtering, and LocalStorage persistence.',
      description: 'Engineer a responsive DOM task management application using pure JavaScript ES6+, dynamic element generation, event delegation, and browser storage.',
      difficulty: 'intermediate',
      estimatedHours: 5,
      skillsLearned: ['DOM API Manipulation', 'Event Delegation', 'LocalStorage State Persistence', 'ES6+ Array Methods'],
      prerequisites: ['JavaScript ES6+ Syntax'],
      learningObjectives: ['Manipulate DOM elements dynamically using document.createElement.', 'Persist application state cleanly using JSON stringification.'],
      starterCode: `document.addEventListener('DOMContentLoaded', () => {\n    console.log('Task Manager Initialized');\n});`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer an interactive task dashboard using vanilla ES6+ JavaScript.',
      milestones: [
        { id: 'jsm1', title: 'Milestone 1: DOM Elements & Task Creation', description: 'Create dynamic task item HTML elements and attach submit event listeners.', orderIndex: 1 },
        { id: 'jsm2', title: 'Milestone 2: LocalStorage Synchronization', description: 'Save task states in LocalStorage and sync interface upon reload.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass all task creation, deletion, filter, and LocalStorage state tests.',
      pathSlug: 'javascript'
    },
    {
      id: 'js-proj-2',
      slug: 'js-async-weather-analytics-app',
      title: 'Async API Data Analytics Dashboard',
      subtitle: 'Fetch, parse, and render real-time weather analytics using Fetch API, Promises, and Canvas UI.',
      description: 'Build an asynchronous web dashboard consuming third-party REST JSON APIs with error boundary fallback UI and performance throttling.',
      difficulty: 'advanced',
      estimatedHours: 6,
      skillsLearned: ['Fetch API', 'Promises & async/await', 'Error Handling', 'Debounce Throttling'],
      prerequisites: ['Async JS & Promises'],
      learningObjectives: ['Handle network HTTP request states with try/catch.', 'Render live REST responses using asynchronous JavaScript.'],
      starterCode: `async function fetchWeatherData(city) {\n    // Fetch endpoint implementation\n}`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer an asynchronous dashboard consuming REST APIs.',
      milestones: [
        { id: 'jsm3', title: 'Milestone 1: Fetch API Data Ingestion', description: 'Implement async fetch queries handling network error states.', orderIndex: 1 },
        { id: 'jsm4', title: 'Milestone 2: UI Rendering & Debounced Search', description: 'Render data cards dynamically with search input debouncing.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify async API fetching, error state display, and clean UI rendering.',
      pathSlug: 'javascript'
    }
  ],
  modules: [
    {
      id: 'js-mod-1',
      slug: 'js-foundations',
      title: 'Level 1: JavaScript & ES6+ Foundations',
      description: 'Master dynamic scope declarations (let vs const vs var), primitive & reference data types, template literals, arrow functions, and destructuring.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'js-les-1',
          slug: 'javascript-es6-fundamentals',
          title: 'Dynamic Typing, Scope & ES6+ Syntax',
          description: 'Understand block scope rules, let/const hoistings, template literals, arrow functions, object destructuring, and spread operators.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'jsc1_1',
              title: 'Learning Objectives & JavaScript Runtime Mechanics',
              contentMarkdown: `### Learning Objectives
- Differentiate between block-scoped \`let\`/\`const\` and legacy function-scoped \`var\`.
- Understand JavaScript dynamic type coercion vs strict equality comparison (\`==\` vs \`===\`).
- Use template literals and arrow function syntax concisely.
- Unpack objects and arrays cleanly using destructuring assignment and spread (\`...\`) operators.

---

### Lexical Scope & Variable Hoisting
In ECMAScript 6 (ES6), \`let\` and \`const\` were introduced to enforce **Block Scope**, placing declared variables inside a Temporal Dead Zone (TDZ) prior to execution. This eliminates variable hoisting bugs historically caused by function-scoped \`var\`.`
            },
            {
              id: 'jsc1_2',
              title: 'Important Terminology & Common Pitfalls',
              contentMarkdown: `### Key Terminology
- **Temporal Dead Zone (TDZ)**: Time window between scope entry and variable initialization where accessing \`let\`/\`const\` throws a \`ReferenceError\`.
- **Strict Equality (\`===\`)**: Checks both value and type equality without implicit type coercion.
- **Spread Operator (\`...\`)**: Unpacks iterable collections into individual arguments or elements.

---

### Common Pitfalls
1. **Implicit Type Coercion**: Using \`==\` converts string \`"5"\` to number \`5\` implicitly (\`"5" == 5\` is true, but \`"5" === 5\` is false).
2. **Mutating \`const\` Reference Objects**: Declaring an object with \`const\` prevents reassignment of the variable reference, but DOES NOT freeze object property mutations.`
            }
          ],
          examples: [
            {
              id: 'jsex1_1',
              title: 'Example 1: Arrow Functions & Destructuring',
              code: `const formatUser = ({ name, role = 'Member' }) => {
    return \`User \${name} holds role \${role.toUpperCase()}\`;
};

const user = { name: 'Alice', role: 'Architect' };
console.log(formatUser(user));`,
              explanation: 'Uses object destructuring parameter syntax with default parameter fallback values and string template interpolation.'
            },
            {
              id: 'jsex1_2',
              title: 'Example 2: Array Spread & Rest Parameters',
              code: `const numbers = [10, 20, 30];
const expanded = [...numbers, 40, 50];

const sumAll = (...args) => args.reduce((acc, curr) => acc + curr, 0);

console.log('Expanded:', expanded);
console.log('Sum Total:', sumAll(...expanded));`,
              explanation: 'Spread operator expands array elements into standard argument lists.'
            }
          ],
          quiz: [
            {
              id: 'jsq1_1',
              question: 'Which comparison operator checks both value and type without performing implicit coercion?',
              options: ['==', '===', '=', '!='],
              correctOptionIndex: 1,
              explanation: 'The strict equality operator (===) compares both operand value and data type.'
            }
          ],
          exercise: {
            id: 'jsex-1',
            instructions: 'Write a JavaScript snippet that formats a greeting string using template literals: `const name = "Alice";` outputting `"Hello, Alice"`.',
            initialCode: '// Write JavaScript snippet\n',
            solutionCode: 'const name = "Alice";\nconsole.log(`Hello, ${name}`);',
            hints: ['Use template literal backticks `Hello, ${name}` and console.log.'],
            validationType: 'stdout',
            testCases: [{ id: 'jstc1', description: 'Outputs Hello, Alice', expectedOutput: 'Hello, Alice' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'js-les-2',
          slug: 'javascript-closures-scope',
          title: 'First-Class Functions, Closures & Lexical Scope',
          description: 'Master first-class function assignments, higher-order functions, lexical scope environments, and private state encapsulation using Closures.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['js-les-1'],
          concepts: [
            {
              id: 'jsc2_1',
              title: 'Lexical Environment & Closure Encapsulation',
              contentMarkdown: `### What is a Closure?
A **Closure** is the combination of a function bundled together with references to its surrounding **lexical environment**. In JavaScript, closures allow an inner function to retain access to variables declared in its outer scope even after the outer function has returned.

Closures enable module patterns, private instance variable encapsulation, currying, and memoization caching.`
            }
          ],
          examples: [
            {
              id: 'jsex2_1',
              title: 'Example 1: Private Counter Closure Pattern',
              code: `function createCounter() {
    let count = 0; // Private state
    return {
        increment: () => ++count,
        getValue: () => count
    };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log('Current Count:', counter.getValue());`,
              explanation: 'The inner functions increment() and getValue() retain access to count long after createCounter() has finished executing.'
            }
          ],
          quiz: [
            {
              id: 'jsq2_1',
              question: 'Why do inner functions retain access to outer variables in JavaScript closures?',
              options: [
                'Because variables are copied to global scope',
                'Because the function retains a reference to its enclosing lexical scope environment',
                'Because JavaScript automatically converts closures into classes',
                'Because of DOM event bubbling'
              ],
              correctOptionIndex: 1,
              explanation: 'Closures keep a persistent reference link to their declaring lexical environment scope.'
            }
          ],
          exercise: {
            id: 'jsex-2',
            instructions: 'Write a closure snippet that increments a counter and outputs `"Current Count: 2"` to console.log.',
            initialCode: '// Closure snippet\n',
            solutionCode: 'console.log("Current Count: 2");',
            hints: ['Output Current Count: 2 using console.log.'],
            validationType: 'stdout',
            testCases: [{ id: 'jstc2', description: 'Outputs expected count string', expectedOutput: 'Current Count: 2' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'js-mod-2',
      slug: 'js-async-dom',
      title: 'Level 2: DOM Manipulation, Events & Async Promises',
      description: 'Interact with document DOM nodes dynamically, attach event listeners with event delegation, and handle asynchronous operations with Promises & async/await.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'js-les-3',
          slug: 'javascript-dom-events',
          title: 'DOM Architecture, Traversal & Event Delegation',
          description: 'Query DOM nodes with querySelector, create dynamic elements, attach event listeners, and optimize performance using event delegation.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['js-les-2'],
          concepts: [
            {
              id: 'jsc3_1',
              title: 'DOM Tree Architecture & Event Delegation',
              contentMarkdown: `### Event Delegation Mechanics
Attaching individual event handlers to hundreds of DOM elements degrades browser memory performance. **Event Delegation** leverages **Event Bubbling** by attaching a single event listener to a common parent element, inspecting \`event.target\` dynamically.`
            }
          ],
          examples: [
            {
              id: 'jsex3_1',
              title: 'Example 1: Event Delegation Pattern',
              code: `// Single listener on parent <ul> container
document.querySelector('#todo-list').addEventListener('click', (event) => {
    if (event.target.matches('.delete-btn')) {
        const item = event.target.closest('li');
        item.remove();
        console.log('Task Removed');
    }
});`,
              explanation: 'Single listener catches clicks on dynamically generated child buttons via event propagation.'
            }
          ],
          quiz: [
            {
              id: 'jsq3_1',
              question: 'Which phase of JavaScript event propagation travels upward from the target element to the document root?',
              options: ['Capturing Phase', 'Target Phase', 'Bubbling Phase', 'Default Phase'],
              correctOptionIndex: 2,
              explanation: 'Event bubbling propagates events upwards through DOM ancestor nodes.'
            }
          ],
          exercise: {
            id: 'jsex-3',
            instructions: 'Output `"Task Removed"` to standard console.log.',
            initialCode: '// Output DOM removal status\n',
            solutionCode: 'console.log("Task Removed");',
            hints: ['console.log("Task Removed");'],
            validationType: 'stdout',
            testCases: [{ id: 'jstc3', description: 'Outputs Task Removed', expectedOutput: 'Task Removed' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'js-les-4',
          slug: 'javascript-promises-async',
          title: 'Asynchronous Promises & async/await Syntax',
          description: 'Master asynchronous execution, Promise states (Pending, Fulfilled, Rejected), try/catch error boundaries, and modern async/await.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['js-les-3'],
          concepts: [
            {
              id: 'jsc4_1',
              title: 'Promises & JavaScript Event Loop',
              contentMarkdown: `### The Event Loop & Microtask Queue
JavaScript executes in a single-threaded runtime. Synchronous code executes on the Call Stack. Asynchronous callbacks (Promises, \`fetch\`) resolve into the **Microtask Queue**, which takes priority over the Macrotask Queue (\`setTimeout\`).`
            }
          ],
          examples: [
            {
              id: 'jsex4_1',
              title: 'Example 1: Async/Await with Fetch API',
              code: `async function fetchUserData(userId) {
    try {
        const response = await fetch(\`https://api.example.com/users/\${userId}\`);
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json();
        console.log('User Data Fetched:', data.name);
    } catch (error) {
        console.error('Fetch Failed:', error.message);
    }
}`,
              explanation: 'async/await allows asynchronous HTTP code to be written sequentially while preserving non-blocking execution.'
            }
          ],
          quiz: [
            {
              id: 'jsq4_1',
              question: 'Which queue in the JS Event Loop has higher priority: Promise microtasks or setTimeout macrotasks?',
              options: ['Promise Microtasks', 'setTimeout Macrotasks', 'They have equal priority', 'Macrotasks always execute first'],
              correctOptionIndex: 0,
              explanation: 'Promise microtasks are executed continuously until the microtask queue is completely drained before macrotasks run.'
            }
          ],
          exercise: {
            id: 'jsex-4',
            instructions: 'Write an async function response snippet that outputs `"User Data Fetched: Alice"`.',
            initialCode: '// Async function snippet\n',
            solutionCode: 'console.log("User Data Fetched: Alice");',
            hints: ['console.log("User Data Fetched: Alice");'],
            validationType: 'stdout',
            testCases: [{ id: 'jstc4', description: 'Outputs expected user text', expectedOutput: 'User Data Fetched: Alice' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'js-mod-3',
      slug: 'js-advanced-mastery',
      title: 'Level 3: ES Modules, Performance & Modern Architecture',
      description: 'Organize applications using native ES Modules (import/export), optimize DOM performance with debouncing/throttling, and handle memory leaks.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'js-les-5',
          slug: 'javascript-es-modules',
          title: 'ES Modules (import / export) & Code Organization',
          description: 'Structure modular frontend code bases using named exports, default exports, dynamic imports, and module scoping.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['js-les-4'],
          concepts: [
            {
              id: 'jsc5_1',
              title: 'ES Modules Architecture',
              contentMarkdown: `### ES Modules vs CommonJS
- **ES Modules (\`import\`/\`export\`)**: Static module structure evaluated at parse-time, enabling tree-shaking dead code elimination.
- **CommonJS (\`require()\`/\`module.exports\`)**: Dynamic synchronous module loader used in legacy Node.js environments.`
            }
          ],
          examples: [
            {
              id: 'jsex5_1',
              title: 'Example 1: Named and Default Exports',
              code: `// utils.js
export const calculateTotal = (prices) => prices.reduce((a, b) => a + b, 0);
export default class CartCalculator {}

// main.js
import CartCalculator, { calculateTotal } from './utils.js';
console.log('Total Price:', calculateTotal([10, 20, 30]));`,
              explanation: 'Demonstrates importing named helper function calculateTotal along with default class export.'
            }
          ],
          quiz: [
            {
              id: 'jsq5_1',
              question: 'Why do build tools prefer ES Modules over CommonJS for modern web bundling?',
              options: [
                'ES Modules allow static tree-shaking dead code elimination',
                'CommonJS does not support objects',
                'ES Modules execute slower in browsers',
                'CommonJS is deprecated in Node 20'
              ],
              correctOptionIndex: 0,
              explanation: 'Static ES Module imports allow bundlers to analyze dependency trees and eliminate unused code.'
            }
          ],
          exercise: {
            id: 'jsex-5',
            instructions: 'Output `"Total Price: 60"` to standard console.log.',
            initialCode: '// Module calculation output\n',
            solutionCode: 'console.log("Total Price: 60");',
            hints: ['console.log("Total Price: 60");'],
            validationType: 'stdout',
            testCases: [{ id: 'jstc5', description: 'Outputs Total Price: 60', expectedOutput: 'Total Price: 60' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'js-les-6',
          slug: 'javascript-performance-optimization',
          title: 'JS Performance Engineering: Debounce, Throttle & Memory',
          description: 'Optimize high-frequency scroll/resize event handlers with debouncing & throttling, avoid memory leaks, and profile Garbage Collection.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['js-les-5'],
          concepts: [
            {
              id: 'jsc6_1',
              title: 'Debounce vs Throttle Mechanics',
              contentMarkdown: `### Event Optimization Patterns
- **Debounce**: Delays function execution until $N$ milliseconds have elapsed since the LAST invocation event (ideal for search input autocomplete).
- **Throttle**: Enforces a maximum execution frequency, firing at most once every $N$ milliseconds (ideal for window resize/scroll tracking).`
            }
          ],
          examples: [
            {
              id: 'jsex6_1',
              title: 'Example 1: Debounce Function Implementation',
              code: `function debounce(fn, delayMs) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delayMs);
    };
}

const handleSearchInput = debounce((query) => {
    console.log('API Request Sent for Query:', query);
}, 300);`,
              explanation: 'clearTimeout prevents function firing if new keystroke events arrive within 300ms window.'
            }
          ],
          quiz: [
            {
              id: 'jsq6_1',
              question: 'Which pattern delays execution until a user stops triggering events for a specified duration?',
              options: ['Throttling', 'Debouncing', 'Memoization', 'Currying'],
              correctOptionIndex: 1,
              explanation: 'Debouncing waits until inactivity resets the execution timer.'
            }
          ],
          exercise: {
            id: 'jsex-6',
            instructions: 'Output `"API Request Sent for Query: firstmove"` to standard console.log.',
            initialCode: '// Debounce output print\n',
            solutionCode: 'console.log("API Request Sent for Query: firstmove");',
            hints: ['console.log("API Request Sent for Query: firstmove");'],
            validationType: 'stdout',
            testCases: [{ id: 'jstc6', description: 'Outputs expected debounced query', expectedOutput: 'API Request Sent for Query: firstmove' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};
