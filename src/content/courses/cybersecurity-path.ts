import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const cybersecurityPath: Path = {
  id: 'web-security-mastery',
  slug: 'web-security',
  title: 'Web Security & OWASP Defense',
  subtitle: 'Master application security, OWASP Top 10 vulnerabilities, XSS/SQLi defenses, JWT security, and secure coding practices.',
  description: 'Master web security engineering: HTTP security headers, TLS handshakes, password hashing (bcrypt/argon2), JWT authentication, XSS defense, SQL injection prevention, CSRF, SSRF, broken access control, and security auditing.',
  icon: '🛡️',
  category: 'security',
  categoryLabel: 'Cybersecurity & Defense',
  isActive: true,
  status: 'active',
  courseType: 'hybrid',
  difficulty: 'intermediate',
  estimatedHours: 45,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['web-security'],
  projects: [
    {
      id: 'sec-proj-1',
      slug: 'web-security-vulnerability-scanner-report',
      title: 'Automated Web Security Audit Scanner',
      subtitle: 'Build a web security auditor inspecting HTTP response security headers, CORS origins, and SSL/TLS cipher suites.',
      description: 'Engineer a security auditing tool parsing web endpoint security posture, identifying missing security headers (CSP, HSTS, X-Frame-Options), and generating OWASP audit reports.',
      difficulty: 'intermediate',
      estimatedHours: 5,
      skillsLearned: ['HTTP Security Headers', 'CORS Origin Inspection', 'OWASP Audit Scoring', 'Automated Vulnerability Detection'],
      prerequisites: ['HTTP Security & Headers'],
      learningObjectives: ['Audit security headers (CSP, HSTS, X-Content-Type-Options).', 'Generate structured security vulnerability assessment reports.'],
      starterCode: `async function auditSecurityHeaders(targetUrl) {\n    // Audit headers implementation\n}`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer an automated web application security scanner for checking HTTP headers and security policies.',
      milestones: [
        { id: 'secm1', title: 'Milestone 1: HTTP Header Audit Inspection', description: 'Fetch URL response headers and check CSP, HSTS, and Frame-Options compliance.', orderIndex: 1 },
        { id: 'secm2', title: 'Milestone 2: Vulnerability Report Generation', description: 'Calculate OWASP compliance scores and export formatted security audit reports.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass header audit detection checks, vulnerability classification, and report generation.',
      pathSlug: 'web-security'
    },
    {
      id: 'sec-proj-2',
      slug: 'secure-auth-authorization-microservice',
      title: 'Zero-Trust Authentication & RBAC Service',
      subtitle: 'Build a zero-trust authentication service featuring bcrypt password hashing, JWT refresh tokens, and RBAC authorization.',
      description: 'Architect a secure web authentication backend service implementing Argon2/bcrypt password hashing, short-lived JWT access tokens, HttpOnly refresh cookies, and Role-Based Access Control (RBAC).',
      difficulty: 'advanced',
      estimatedHours: 7,
      skillsLearned: ['Argon2/bcrypt Hashing', 'JWT Key Signing & Refresh Tokens', 'HttpOnly Cookie Defense', 'Role-Based Access Control (RBAC)'],
      prerequisites: ['Authentication & Session Security'],
      learningObjectives: ['Implement secure token rotation preventing replay attacks.', 'Enforce role-based access control middleware guards.'],
      starterCode: `function generateAccessToken(user) {\n    // JWT token signing\n}`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer a secure Zero-Trust authentication and RBAC microservice.',
      milestones: [
        { id: 'secm3', title: 'Milestone 1: Secure Hashing & JWT Token Rotation', description: 'Implement password hashing and dual access/refresh token rotation.', orderIndex: 1 },
        { id: 'secm4', title: 'Milestone 2: RBAC Guard Middleware & XSS Defense', description: 'Enforce HttpOnly cookie storage and RBAC authorization guards.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass all token validation, password hashing, and authorization guard tests.',
      pathSlug: 'web-security'
    }
  ],
  modules: [
    {
      id: 'sec-mod-1',
      slug: 'security-foundations',
      title: 'Level 1: HTTP Security & Authentication Defense',
      description: 'Understand HTTPS/TLS 1.3 handshakes, security response headers, password hashing algorithms (Argon2id, bcrypt), and JWT session security.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'sec-les-1',
          slug: 'web-security-http-tls',
          title: 'HTTP/HTTPS Security Protocols & Security Headers',
          description: 'Master TLS 1.3 encryption handshakes, HSTS preload headers, Content-Security-Policy (CSP), and CORS cross-origin policies.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'secc1_1',
              title: 'Learning Objectives & TLS Handshakes',
              contentMarkdown: `### Learning Objectives
- Understand Transport Layer Security (TLS 1.3) asymmetric key exchange and symmetric AES payload encryption.
- Configure critical HTTP defense headers: \`Strict-Transport-Security\` (HSTS), \`Content-Security-Policy\` (CSP), and \`X-Frame-Options\`.
- Enforce Cross-Origin Resource Sharing (CORS) origin restrictions cleanly.

---

### HTTPS & TLS 1.3 Protocol
HTTPS encrypts HTTP traffic using TLS. During the initial TLS handshake, the client validates the server's X.509 digital certificate against trusted Certificate Authorities (CAs), performing Diffie-Hellman key exchange to establish encrypted symmetric session keys.`
            }
          ],
          examples: [
            {
              id: 'secex1_1',
              title: 'Example 1: Hardened Production HTTP Security Headers',
              code: `// Express / Next.js HTTP Security Response Headers
const securityHeaders = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'nonce-rAnd0m';",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
};`,
              explanation: 'Configures HSTS to force HTTPS, CSP to restrict unapproved scripts, and X-Frame-Options to prevent Clickjacking.'
            }
          ],
          quiz: [
            {
              id: 'secq1_1',
              question: 'Which HTTP response header instructs web browsers to enforce HTTPS-only connections exclusively?',
              options: ['Strict-Transport-Security (HSTS)', 'Content-Security-Policy', 'Access-Control-Allow-Origin', 'X-Frame-Options'],
              correctOptionIndex: 0,
              explanation: 'Strict-Transport-Security (HSTS) forces browsers to use HTTPS for specified domains.'
            }
          ],
          exercise: {
            id: 'secex-1',
            instructions: 'Write a snippet returning "Strict-Transport-Security": "max-age=31536000" and match text.',
            initialCode: '// HSTS header snippet\n',
            solutionCode: "console.log('Strict-Transport-Security');",
            hints: ["console.log('Strict-Transport-Security');"],
            validationType: 'stdout',
            testCases: [{ id: 'sectc1', description: 'Outputs Strict-Transport-Security text', expectedOutput: 'Strict-Transport-Security' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'sec-les-2',
          slug: 'web-security-password-hashing-jwt',
          title: 'Secure Hashing (Argon2 / bcrypt) & JWT Token Security',
          description: 'Differentiate between encryption and key-derivation password hashing (bcrypt, Argon2), and implement secure JWT authentication.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['sec-les-1'],
          concepts: [
            {
              id: 'secc2_1',
              title: 'Password Hashing & JWT Security Rules',
              contentMarkdown: `### Password Hashing Invariants
Passwords must NEVER be stored in plain text or encrypted using reversible symmetric keys. They must be hashed using salted, adaptive Key Derivation Functions (KDFs) like **Argon2id** or **bcrypt** with work factors tuned to mitigate GPU brute-forcing.`
            }
          ],
          examples: [
            {
              id: 'secex2_1',
              title: 'Example 1: Password Hashing with bcrypt',
              code: `import bcrypt from 'bcrypt';

async function hashUserPassword(plainPassword) {
    const saltRounds = 12; // Adaptive cost factor
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}

async function verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}`,
              explanation: 'bcrypt automatically generates cryptographically random salts per password to prevent rainbow table attacks.'
            }
          ],
          quiz: [
            {
              id: 'secq2_1',
              question: 'Why should passwords be stored using adaptive salted KDF algorithms (Argon2 / bcrypt) rather than fast hash functions like SHA-256?',
              options: [
                'Salted adaptive KDFs intentionally slow down brute-force GPU cracking attacks',
                'SHA-256 is deprecated by browsers',
                'bcrypt uses smaller storage sizes',
                'SHA-256 cannot process numbers'
              ],
              correctOptionIndex: 0,
              explanation: 'Adaptive work factors make computing individual password hashes computationally expensive, thwarting GPU dictionary attacks.'
            }
          ],
          exercise: {
            id: 'secex-2',
            instructions: 'Write a snippet outputting `"Password Verification: SUCCESS"` to standard console.log.',
            initialCode: '// Verification snippet\n',
            solutionCode: 'console.log("Password Verification: SUCCESS");',
            hints: ['console.log("Password Verification: SUCCESS");'],
            validationType: 'stdout',
            testCases: [{ id: 'sectc2', description: 'Outputs Verification SUCCESS', expectedOutput: 'Password Verification: SUCCESS' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'sec-mod-2',
      slug: 'owasp-top-10-defenses',
      title: 'Level 2: OWASP Top 10 Vulnerabilities & Code Defenses',
      description: 'Analyze OWASP vulnerabilities: SQL Injection (SQLi), Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and Broken Access Control.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'sec-les-3',
          slug: 'web-security-sqli-xss',
          title: 'SQL Injection (SQLi) & Cross-Site Scripting (XSS) Mitigation',
          description: 'Prevent SQL injection using parameterized prepared statements, and stop XSS attacks with context-aware HTML escaping and HttpOnly cookies.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['sec-les-2'],
          concepts: [
            {
              id: 'secc3_1',
              title: 'SQLi & XSS Attack Mechanics',
              contentMarkdown: `### Vulnerability Defenses
- **SQL Injection (SQLi)**: Occurs when untrusted user input is concatenated into raw SQL strings. Defended using **Parameterized Prepared Statements**.
- **Cross-Site Scripting (XSS)**: Occurs when malicious scripts execute in victim browsers. Defended using **HTML Entity Encoding** and **HttpOnly Cookies** (blocking \`document.cookie\` access from JavaScript).`
            }
          ],
          examples: [
            {
              id: 'secex3_1',
              title: 'Example 1: Parameterized SQL Query Defense',
              code: `// VULNERABLE CODE (DO NOT USE):
// const query = "SELECT * FROM users WHERE email = '" + req.body.email + "'";

// SECURE DEFENSE:
const query = 'SELECT id, username, email FROM users WHERE email = $1';
const result = await db.query(query, [req.body.email]);`,
              explanation: 'Parameterized values ($1) are sent separately from query syntax, preventing SQL payload execution.'
            }
          ],
          quiz: [
            {
              id: 'secq3_1',
              question: 'Which defensive programming technique completely prevents SQL Injection attacks?',
              options: ['Parameterized Prepared Statements', 'String Concatenation', 'Client-side input validation', 'Hiding database passwords'],
              correctOptionIndex: 0,
              explanation: 'Prepared statements separate SQL code logic from data values, rendering injected commands harmless.'
            }
          ],
          exercise: {
            id: 'secex-3',
            instructions: 'Write a snippet outputting `"Parameterized Query Executed Safely"` to standard console.log.',
            initialCode: '// Query status\n',
            solutionCode: 'console.log("Parameterized Query Executed Safely");',
            hints: ['console.log("Parameterized Query Executed Safely");'],
            validationType: 'stdout',
            testCases: [{ id: 'sectc3', description: 'Outputs Parameterized Query status', expectedOutput: 'Parameterized Query Executed Safely' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'sec-les-4',
          slug: 'web-security-csrf-access-control',
          title: 'CSRF Defense & Broken Access Control Remediation',
          description: 'Mitigate CSRF attacks with SameSite cookies & Anti-CSRF Tokens, and enforce strict server-side authorization checks (BOLA/IDOR).',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['sec-les-3'],
          concepts: [
            {
              id: 'secc4_1',
              title: 'Broken Access Control & CSRF',
              contentMarkdown: `### Broken Access Control (OWASP #1)
Broken Access Control occurs when endpoints fail to check whether the authenticated user (\`req.user.id\`) actually owns the requested resource (\`/api/orders/:orderId\`). Fix by enforcing ownership checks in middleware.`
            }
          ],
          examples: [
            {
              id: 'secex4_1',
              title: 'Example 1: Secure Resource Ownership Authorization Check',
              code: `app.get('/api/orders/:orderId', authenticateUser, async (req, res) => {
    const order = await db.findOrder(req.params.orderId);
    
    // Enforce ownership check
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access Denied: Unauthorized resource access' });
    }
    res.json(order);
});`,
              explanation: 'Verifies that requested order belongs to the currently logged-in user before returning data.'
            }
          ],
          quiz: [
            {
              id: 'secq4_1',
              question: 'Which vulnerability occurs when an application exposes internal object IDs in URLs without checking ownership permissions?',
              options: ['Broken Object Level Authorization (BOLA / IDOR)', 'Cross-Site Scripting (XSS)', 'SQL Injection', 'Buffer Overflow'],
              correctOptionIndex: 0,
              explanation: 'BOLA (Insecure Direct Object Reference) allows unauthorized access to resources via direct ID manipulation.'
            }
          ],
          exercise: {
            id: 'secex-4',
            instructions: 'Write a snippet outputting `"Access Checked: Authorized"` to standard console.log.',
            initialCode: '// Access check status\n',
            solutionCode: 'console.log("Access Checked: Authorized");',
            hints: ['console.log("Access Checked: Authorized");'],
            validationType: 'stdout',
            testCases: [{ id: 'sectc4', description: 'Outputs Access Checked status', expectedOutput: 'Access Checked: Authorized' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'sec-mod-3',
      slug: 'advanced-security-auditing',
      title: 'Level 3: Advanced Application Security & Threat Modeling',
      description: 'Perform STRIDE threat modeling, SSRF (Server-Side Request Forgery) prevention, Dependency Vulnerability Scanning (npm audit), and DevSecOps pipelines.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'sec-les-5',
          slug: 'web-security-ssrf-mitigation',
          title: 'Server-Side Request Forgery (SSRF) & Supply Chain Security',
          description: 'Identify SSRF risks, block internal IP metadata endpoints (169.254.169.254), and audit open-source dependency vulnerabilities.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['sec-les-4'],
          concepts: [
            {
              id: 'secc5_1',
              title: 'SSRF Attack Vector Mechanics',
              contentMarkdown: `### What is SSRF?
Server-Side Request Forgery (SSRF) occurs when a web server fetches data from a user-supplied URL without validating the destination IP. Attackers abuse SSRF to query internal microservices or cloud instance metadata endpoints (\`http://169.254.169.254/\`).`
            }
          ],
          examples: [
            {
              id: 'secex5_1',
              title: 'Example 1: SSRF URL Whitelisting Filter',
              code: `import { URL } from 'url';

function validateFetchUrl(inputUrl) {
    const parsed = new URL(inputUrl);
    const allowedHosts = ['api.github.com', 'cdn.example.com'];

    if (!allowedHosts.includes(parsed.hostname)) {
        throw new Error('SSRF Blocked: Host not in domain whitelist.');
    }
    return inputUrl;
}`,
              explanation: 'Strict domain whitelisting prevents fetching internal IP ranges or cloud metadata endpoints.'
            }
          ],
          quiz: [
            {
              id: 'secq5_1',
              question: 'Which internal IP address endpoint is commonly targeted by SSRF attacks on cloud virtual instances (AWS / GCP / Azure)?',
              options: ['169.254.169.254', '127.0.0.1', '192.168.1.1', '10.0.0.1'],
              correctOptionIndex: 0,
              explanation: '169.254.169.254 is the standard link-local IP for cloud instance metadata endpoints.'
            }
          ],
          exercise: {
            id: 'secex-5',
            instructions: 'Write a snippet outputting `"SSRF Check Passed: Valid Domain"` to standard console.log.',
            initialCode: '// SSRF check status\n',
            solutionCode: 'console.log("SSRF Check Passed: Valid Domain");',
            hints: ['console.log("SSRF Check Passed: Valid Domain");'],
            validationType: 'stdout',
            testCases: [{ id: 'sectc5', description: 'Outputs SSRF Check status', expectedOutput: 'SSRF Check Passed: Valid Domain' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'sec-les-6',
          slug: 'web-security-threat-modeling-audit',
          title: 'STRIDE Threat Modeling & DevSecOps Security Auditing',
          description: 'Apply the STRIDE framework (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) and automate security static analysis.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['sec-les-5'],
          concepts: [
            {
              id: 'secc6_1',
              title: 'The STRIDE Security Model',
              contentMarkdown: `### STRIDE Threat Taxonomy
| Threat Category | Property Violated | Mitigation |
| :--- | :--- | :--- |
| **Spoofing** | Authenticity | Strong Auth & Digital Signatures |
| **Tampering** | Integrity | Cryptographic Hashes & TLS |
| **Repudiation** | Non-repudiation | Audit Logging |
| **Information Disclosure** | Confidentiality | Encryption & Access Control |
| **Denial of Service** | Availability | Rate Limiting & Firewalls |
| **Elevation of Privilege** | Authorization | Principle of Least Privilege |`
            }
          ],
          examples: [
            {
              id: 'secex6_1',
              title: 'Example 1: Rate Limiting Middleware (DoS Defense)',
              code: `import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per IP
    message: 'Too many requests from this IP, please try again later.'
});`,
              explanation: 'Rate limiting protects server resources against brute-forcing and Denial of Service attacks.'
            }
          ],
          quiz: [
            {
              id: 'secq6_1',
              question: 'Which threat category in STRIDE represents unauthorized user privilege escalation to administrative levels?',
              options: ['Elevation of Privilege', 'Spoofing', 'Tampering', 'Repudiation'],
              correctOptionIndex: 0,
              explanation: 'Elevation of Privilege occurs when an attacker gains permissions beyond their assigned authorization level.'
            }
          ],
          exercise: {
            id: 'secex-6',
            instructions: 'Write a snippet outputting `"STRIDE Audit Completed: Secure"` to standard console.log.',
            initialCode: '// STRIDE audit snippet\n',
            solutionCode: 'console.log("STRIDE Audit Completed: Secure");',
            hints: ['console.log("STRIDE Audit Completed: Secure");'],
            validationType: 'stdout',
            testCases: [{ id: 'sectc6', description: 'Outputs STRIDE Audit status', expectedOutput: 'STRIDE Audit Completed: Secure' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};
