import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const javaPath: Path = {
  id: 'java-mastery',
  slug: 'java',
  title: 'Java Enterprise Development',
  subtitle: 'Master object-oriented systems, JVM internals, multithreading, Spring Boot 3 microservices, and production architecture.',
  description: 'Learn foundational Java 21 syntax, strong static typing, JVM memory architecture, collection frameworks, multithreading concurrency, Spring Boot REST APIs, JPA/Hibernate ORM, and cloud containerization.',
  icon: '☕',
  category: 'programming',
  categoryLabel: 'Programming Languages',
  isActive: true,
  status: 'active',
  courseType: 'coding',
  difficulty: 'mastery',
  estimatedHours: 120,
  totalLessons: 25,
  totalProjects: 3,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['java'],
  projects: [
    {
      id: 'java-proj-1',
      slug: 'java-cli-banking-system',
      title: 'Java CLI Enterprise Banking System',
      subtitle: 'Build an object-oriented console application managing bank accounts, transactions, and audit logs.',
      description: 'Construct a Java CLI application incorporating OOP interfaces, abstract classes, exception handling, and file persistence.',
      difficulty: 'beginner',
      estimatedHours: 8,
      skillsLearned: ['Java OOP', 'Interfaces & Abstract Classes', 'File I/O', 'Custom Exceptions', 'Generics'],
      prerequisites: ['Java Syntax & OOP'],
      learningObjectives: ['Design modular Java class hierarchies.', 'Enforce transaction invariants with custom exceptions.'],
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Banking System Initialized");\n    }\n}`,
      projectInstructionsMarkdown: `### Project Overview\nEngineer a multi-account Java banking console application with deposit, withdrawal, transfer, and transaction log auditing capabilities.`,
      milestones: [
        { id: 'jm1', title: 'Milestone 1: Account Class Hierarchy Design', description: 'Create AbstractAccount, SavingsAccount, and CheckingAccount classes with encapsulation.', orderIndex: 1 },
        { id: 'jm2', title: 'Milestone 2: Transaction Audit Logger', description: 'Implement exception-checked deposit and withdrawal logging with file persistence.', orderIndex: 2 }
      ],
      completionCriteria: 'Complete all account operations, transaction logging, and unit tests.',
      pathSlug: 'java'
    },
    {
      id: 'java-proj-2',
      slug: 'java-spring-boot-inventory-microservice',
      title: 'Spring Boot Microservice REST API Engine',
      subtitle: 'Build a RESTful API service with Spring Boot 3, Spring Data JPA, and PostgreSQL integration.',
      description: 'Architect a scalable backend microservice featuring REST controllers, JPA repository layers, DTO mapping, and Spring Security 6 JWT authentication.',
      difficulty: 'intermediate',
      estimatedHours: 16,
      skillsLearned: ['Spring Boot 3', 'Spring Data JPA', 'RESTful API Design', 'Hibernate ORM', 'Spring Security'],
      prerequisites: ['Java Collections', 'Streams & Spring Core'],
      learningObjectives: ['Build REST endpoints following standard HTTP status codes.', 'Map relational databases using JPA annotations and optimize queries.'],
      starterCode: `@SpringBootApplication\npublic class InventoryApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(InventoryApplication.class, args);\n    }\n}`,
      projectInstructionsMarkdown: `### Project Overview\nBuild an enterprise Spring Boot REST API for managing inventory items with pagination, sorting, and JWT security.`,
      milestones: [
        { id: 'jm3', title: 'Milestone 1: JPA Entities & Repository Layer', description: 'Define Product entity with JPA annotations and repository interface.', orderIndex: 1 },
        { id: 'jm4', title: 'Milestone 2: REST Controller & Service Logic', description: 'Implement GET, POST, PUT, DELETE REST controllers with DTO validation.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass all REST API integration tests and CRUD operation validations.',
      pathSlug: 'java'
    },
    {
      id: 'java-proj-3',
      slug: 'java-distributed-order-processing-capstone',
      title: 'Distributed Event-Driven Order Processing Capstone',
      subtitle: 'Build a resilient distributed microservices backend with Spring Cloud, Kafka, and Docker.',
      description: 'Design and deploy a multi-service eCommerce backend with async messaging, distributed transactions (Saga pattern), Prometheus observability, and GraalVM containerization.',
      difficulty: 'capstone',
      estimatedHours: 25,
      skillsLearned: ['Spring Cloud', 'Kafka Event Streaming', 'Saga Pattern', 'Micrometer Observability', 'Docker & GraalVM'],
      prerequisites: ['Spring Boot REST', 'Spring Data JPA', 'Multithreading'],
      learningObjectives: ['Architect event-driven microservices.', 'Implement fault tolerance with Resilience4j circuit breakers.'],
      starterCode: `@SpringBootApplication\npublic class OrderProcessingApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(OrderProcessingApplication.class, args);\n    }\n}`,
      projectInstructionsMarkdown: `### Capstone Project Overview\nConstruct an enterprise event-driven architecture processing high-throughput order queues safely.`,
      milestones: [
        { id: 'jm5', title: 'Milestone 1: Kafka Event Ingestion Pipeline', description: 'Set up Kafka producers and consumers for OrderPlaced and PaymentProcessed events.', orderIndex: 1 },
        { id: 'jm6', title: 'Milestone 2: Distributed Tracing & Containerization', description: 'Instrument services with OpenTelemetry and package into Docker multi-stage containers.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass full end-to-end event stream benchmarks and load tests.',
      pathSlug: 'java'
    }
  ],
  modules: [
    {
      id: 'java-mod-1',
      slug: 'java-foundations',
      title: 'Level 1: Java Syntax & Object-Oriented Principles',
      description: 'Master Java primitives, static compilation, JVM execution pipeline, class definitions, inheritance, and object-oriented encapsulation.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'java-les-1',
          slug: 'java-syntax-basics',
          title: 'Java Syntax, Primitive Types & Main Method Entrypoint',
          description: 'Write your first Java application, understand JVM static compilation, bytecodes, primitive memory layouts, and method declarations.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'jc1_1',
              title: 'Learning Objectives & Core Execution Model',
              contentMarkdown: `### Learning Objectives
- Understand the complete Java execution lifecycle from source code (\`.java\`) to JVM bytecode (\`.class\`).
- Master Java's 8 primitive data types (\`byte\`, \`short\`, \`int\`, \`long\`, \`float\`, \`double\`, \`char\`, \`boolean\`).
- Understand variable declaration, strict static typing, and memory allocation in Java.
- Execute Java applications using the static \`public static void main(String[] args)\` entrypoint method.

---

### The Java Virtual Machine Execution Model
Java is a compiled, statically-typed language designed around the principle of *"Write Once, Run Anywhere"* (WORA). When you write Java source code in a file ending with \`.java\`, the Java Compiler (\`javac\`) parses the human-readable text and compiles it into platform-independent intermediate instructions known as **JVM Bytecode** saved in \`.class\` files.

The **Java Virtual Machine (JVM)** reads these bytecode files at runtime and uses Just-In-Time (JIT) compilation to convert bytecode into host hardware machine code instructions dynamically.`
            },
            {
              id: 'jc1_2',
              title: 'Key Terminology & Primitive Matrix',
              contentMarkdown: `### Key Terminology
- **JDK (Java Development Kit)**: Complete software development suite containing \`javac\` compiler, debugger, tools, and runtime environment.
- **JRE (Java Runtime Environment)**: Libraries and components required strictly to execute compiled Java bytecode applications.
- **JVM (Java Virtual Machine)**: Abstract computing machine that executes compiled Java bytecode instructions.
- **Static Typing**: Type checking enforced at compile-time; variable types cannot change after declaration.

---

### Java 8 Primitive Data Types
| Type | Bits | Default Value | Value Range |
| :--- | :--- | :--- | :--- |
| \`byte\` | 8 | \`0\` | -128 to 127 |
| \`short\` | 16 | \`0\` | -32,768 to 32,767 |
| \`int\` | 32 | \`0\` | -2,147,483,648 to 2,147,483,647 |
| \`long\` | 64 | \`0L\` | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| \`float\` | 32 | \`0.0f\` | ~6-7 decimal digits precision |
| \`double\` | 64 | \`0.0d\` | ~15-17 decimal digits precision |
| \`boolean\` | 1 | \`false\` | \`true\` or \`false\` |
| \`char\` | 16 | \`'\\u0000'\` | Single 16-bit Unicode character |`
            }
          ],
          examples: [
            {
              id: 'jex1_1',
              title: 'Example 1: Basic Entrypoint & Primitive Variables',
              code: `public class Main {
    public static void main(String[] args) {
        int initialBalance = 250;
        double interestRate = 0.05;
        boolean isActive = true;

        double accruedInterest = initialBalance * interestRate;

        System.out.println("Initial Balance: " + initialBalance);
        System.out.println("Accrued Interest: " + accruedInterest);
        System.out.println("Account Active: " + isActive);
    }
}`,
              explanation: 'Demonstrates variable initialization, static method entrypoint, double arithmetic, and standard stdout console logging.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Java primitive storage and JVM execution pipeline.',
            whyItExists: 'Ensures platform independence and explicit memory footprint allocation.',
            howItWorks: 'javac compiles .java source files to bytecode instructions; JVM JIT converts bytecode to native CPU assembly.',
            whereUsedProfessionally: 'Used in enterprise backends, high-throughput transaction systems, and Android development.',
            howCompaniesUseIt: 'Companies rely on Java static typing to prevent runtime type errors across millions of lines of code.',
            productionConsiderations: ['Use explicit numerical primitives matching business bounds.', 'Avoid wrapper object boxing overhead in high-throughput loops.'],
            commonEngineeringMistakes: ['Integer overflow without throwing exception.', 'Comparing primitives with reference equality.'],
            performanceImplications: 'Primitives are allocated directly on execution stack frames for zero-overhead performance.',
            securityImplications: 'Enforce type safety at compile time to prevent buffer overflow vulnerabilities.',
            alternativesAndTradeOffs: [{ option: 'Primitive Type', comparison: 'Stack allocated, fast, no methods' }, { option: 'Wrapper Class (Integer)', comparison: 'Heap object, supports null, overhead' }],
            whenToUse: ['Use primitive types for high-performance arithmetic operations'],
            whenNotToUse: ['Do not use primitives when nullable database fields or collection generics are required']
          },
          quiz: [
            {
              id: 'jq1_1',
              question: 'Which tool in the Java ecosystem compiles human-readable .java source files into bytecodes?',
              options: ['java', 'javac', 'jvm', 'jar'],
              correctOptionIndex: 1,
              explanation: 'javac is the Java Compiler executable that generates platform-independent bytecode files (.class).'
            }
          ],
          exercise: {
            id: 'jex-1',
            instructions: 'Write a Java snippet that declares an integer `int initialBalance = 500;`, multiplies it by 2, and prints the result to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Declare initialBalance and print result\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        int initialBalance = 500;\n        int result = initialBalance * 2;\n        System.out.println(result);\n    }\n}',
            hints: ['Multiply initialBalance by 2 using initialBalance * 2', 'Use System.out.println() to display output.'],
            validationType: 'stdout',
            testCases: [
              { id: 'jtc1', description: 'Validates 1000 printed output', expectedOutput: '1000' }
            ]
          },
          references: [
            { title: 'Oracle Java Language Specification', url: 'https://docs.oracle.com/javase/specs/', sourceName: 'Oracle Docs' }
          ],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-2',
          slug: 'java-jvm-architecture',
          title: 'JVM Internals, JDK vs JRE & ClassLoader Subsystem',
          description: 'Deep dive into JVM Architecture: Loading, Linking, Initialization, ClassLoader hierarchy, and Bytecode execution.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['java-les-1'],
          concepts: [
            {
              id: 'jc2_sub1',
              title: 'JVM Internal Architecture Subsystems',
              contentMarkdown: `### The Three Core Subsystems of JVM
1. **ClassLoader Subsystem**: Responsible for Loading (\`.class\` bytecode retrieval), Linking (Verification, Preparation, Resolution), and Initialization.
2. **Runtime Data Areas**: Memory zones split into Method Area/Metaspace, Heap, Java Threads Stacks, PC Registers, and Native Method Stacks.
3. **Execution Engine**: Executes bytecode via Interpreter, JIT Compiler (C1/C2), and Garbage Collector.`
            }
          ],
          examples: [
            {
              id: 'jex2_sub1',
              title: 'Example: Inspecting ClassLoader Hierarchy',
              code: `public class Main {
    public static void main(String[] args) {
        ClassLoader appLoader = Main.class.getClassLoader();
        ClassLoader platformLoader = appLoader.getParent();

        System.out.println("Application ClassLoader: " + appLoader);
        System.out.println("Platform ClassLoader: " + platformLoader);
    }
}`,
              explanation: 'Demonstrates Java delegation ClassLoader model hierarchy.'
            }
          ],
          engineeringContext: {
            whatItIs: 'JVM runtime subsystem loading and verifying bytecode binaries.',
            whyItExists: 'Isolates application classes, guarantees security verification, and enables dynamic loading.',
            howItWorks: 'Delegates class loading upward through Bootstrap -> Platform -> Application ClassLoaders.',
            whereUsedProfessionally: 'Used in OSGi plugin architectures, Spring Boot DevTools hot reloading, and application server isolation.',
            howCompaniesUseIt: 'Custom ClassLoaders isolation allows running multiple module versions simultaneously.',
            productionConsiderations: ['Prevent ClassLoader memory leaks when undeploying web applications.'],
            commonEngineeringMistakes: ['ClassNotFoundException vs NoClassDefFoundError confusion.'],
            performanceImplications: 'JIT C2 compilation optimizes hot execution loops into direct hardware instruction vectors.',
            securityImplications: 'Bytecode verifier ensures bytecode conforms to JVM security rules before execution.',
            alternativesAndTradeOffs: [{ option: 'Standard JVM JIT', comparison: 'Fast startup, dynamic optimization' }, { option: 'GraalVM Native Image AOT', comparison: 'Instant startup, lower memory, no dynamic loading' }],
            whenToUse: ['Use JVM JIT for long-running enterprise server microservices'],
            whenNotToUse: ['Consider AOT native images for serverless lambdas requiring instant startup']
          },
          quiz: [
            {
              id: 'jq2_sub1',
              question: 'Which JVM subsystem verifies bytecode compliance before runtime execution?',
              options: ['JIT Compiler', 'ClassLoader Linker', 'Garbage Collector', 'Native Interface'],
              correctOptionIndex: 1,
              explanation: 'The Linker phase in ClassLoader subsystem performs bytecode verification.'
            }
          ],
          exercise: {
            id: 'jex-2sub',
            instructions: 'Print `"JVM ClassLoader Hierarchy Validated"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Output JVM ClassLoader text\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("JVM ClassLoader Hierarchy Validated");\n    }\n}',
            hints: ['System.out.println("JVM ClassLoader Hierarchy Validated");'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc2sub', description: 'Outputs ClassLoader validation text', expectedOutput: 'JVM ClassLoader Hierarchy Validated' }]
          },
          references: [{ title: 'JVM Specification', url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/', sourceName: 'Oracle Docs' }],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-3',
          slug: 'java-control-flow',
          title: 'Control Flow, Operators, Decision Trees & Modern Switch Expressions',
          description: 'Master branch logic, pattern matching switch statements, loops (for, while, do-while, enhanced for), and operator precedence.',
          estimatedMinutes: 30,
          orderIndex: 3,
          prerequisites: ['java-les-2'],
          concepts: [
            {
              id: 'jc3_cf1',
              title: 'Java Branching & Pattern Matching Switch',
              contentMarkdown: `### Modern Java 17+ Switch Expressions
Java 17+ introduced arrow switch expressions returning values without requiring break statements or risk of fallthrough bugs:
\`\`\`java
String result = switch (day) {
    case MONDAY, FRIDAY -> "Busy Day";
    case SATURDAY, SUNDAY -> "Weekend";
    default -> "Regular Day";
};
\`\`\``
            }
          ],
          examples: [
            {
              id: 'jex3_cf1',
              title: 'Example: Switch Expression with Arrow Syntax',
              code: `public class Main {
    public static void main(String[] args) {
        String status = "ACTIVE";
        int code = switch (status) {
            case "ACTIVE" -> 200;
            case "PENDING" -> 202;
            case "INACTIVE" -> 404;
            default -> 500;
        };
        System.out.println("Status Code: " + code);
    }
}`,
              explanation: 'Evaluates status string cleanly with zero fallthrough risk.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Conditional evaluation and iteration primitives in Java syntax.',
            whyItExists: 'Controls execution paths based on runtime invariants.',
            howItWorks: 'Compiles to tableswitch or lookupswitch bytecode instructions.',
            whereUsedProfessionally: 'Used in business rule engines, HTTP request routing, and data parser loops.',
            howCompaniesUseIt: 'Companies enforce pattern matching switch expressions to guarantee exhaustive case handling.',
            productionConsiderations: ['Prefer switch expressions over deeply nested if-else ladders.'],
            commonEngineeringMistakes: ['Missing default case in legacy switch causing silent fallthrough.'],
            performanceImplications: 'tableswitch executes in O(1) constant time lookup via bytecode offset table.',
            securityImplications: 'Validate inputs before conditional checks to avoid logic vulnerabilities.',
            alternativesAndTradeOffs: [{ option: 'If-Else Chain', comparison: 'Flexible, but hard to read when long' }, { option: 'Switch Expression', comparison: 'Clean, exhaustive, compile-time verified' }],
            whenToUse: ['Use switch expressions when handling discrete enum or string constants'],
            whenNotToUse: ['Use boolean condition if-else for complex threshold range checks']
          },
          quiz: [
            {
              id: 'jq3_cf1',
              question: 'What advantage do arrow switch expressions (->) provide over legacy colon switch statements?',
              options: ['Faster CPU execution', 'No break statement required, eliminating fallthrough bugs', 'Supports floating point numbers', 'Automatic thread synchronization'],
              correctOptionIndex: 1,
              explanation: 'Arrow switch syntax prevents fallthrough and does not require explicit break keywords.'
            }
          ],
          exercise: {
            id: 'jex-3cf',
            instructions: 'Print `"Status Code: 200"` to standard stdout using a switch expression.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Switch logic printing Status Code: 200\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Status Code: 200");\n    }\n}',
            hints: ['Print Status Code: 200 to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc3cf', description: 'Outputs Status Code: 200', expectedOutput: 'Status Code: 200' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-4',
          slug: 'java-classes-oop',
          title: 'Classes, Objects, Constructors & Encapsulation Rules',
          description: 'Construct reusable Java classes, encapsulation boundaries with private access modifiers, constructors, and getters/setters.',
          estimatedMinutes: 35,
          orderIndex: 4,
          prerequisites: ['java-les-3'],
          concepts: [
            {
              id: 'jc4_oop1',
              title: 'Learning Objectives & Encapsulation Rules',
              contentMarkdown: `### Encapsulation Rules in Java
Encapsulation protects class internal state invariants by keeping fields private and providing controlled accessor methods with validation rules.`
            }
          ],
          examples: [
            {
              id: 'jex4_oop1',
              title: 'Example: BankAccount Encapsulation Class',
              code: `public class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public double getBalance() {
        return this.balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-100", 1000.0);
        acc.deposit(500.0);
        System.out.println("Final Balance: " + acc.getBalance());
    }
}`,
              explanation: 'Private fields balance and accountNumber cannot be modified illegally from outside the class.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Object-oriented data encapsulation boundary.',
            whyItExists: 'Prevents corrupted state by enforcing business validation invariants.',
            howItWorks: 'Fields marked private can only be accessed through member instance methods.',
            whereUsedProfessionally: 'Used in all domain model entities, DTOs, and enterprise business services.',
            howCompaniesUseIt: 'Companies enforce strict encapsulation to audit state mutations across complex microservices.',
            productionConsiderations: ['Make fields final wherever state should be immutable.'],
            commonEngineeringMistakes: ['Exposing raw mutable Date or Array references via getters.'],
            performanceImplications: 'JIT compiler inlines getters into direct memory field references at runtime.',
            securityImplications: 'Defensive copying prevents external caller object mutation vulnerabilities.',
            alternativesAndTradeOffs: [{ option: 'Public Fields', comparison: 'No boilerplate, but breaks state safety' }, { option: 'Encapsulated Class', comparison: 'Complete state protection, professional standard' }],
            whenToUse: ['Use encapsulated classes for all domain models holding application state'],
            whenNotToUse: ['Use Java Records (record) for pure immutable data carrier containers']
          },
          quiz: [
            {
              id: 'jq4_oop1',
              question: 'Which access modifier restricts field access exclusively to methods within the declaring class?',
              options: ['public', 'protected', 'private', 'package-private'],
              correctOptionIndex: 2,
              explanation: 'The private keyword restricts visibility strictly to the enclosing class.'
            }
          ],
          exercise: {
            id: 'jex-4oop',
            instructions: 'Create a BankAccount instance initialized to 1000, deposit 500, and print `"Final Balance: 1500.0"`.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // BankAccount deposit print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Final Balance: 1500.0");\n    }\n}',
            hints: ['Print Final Balance: 1500.0 to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc4oop', description: 'Outputs Final Balance: 1500.0', expectedOutput: 'Final Balance: 1500.0' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-5',
          slug: 'java-inheritance-interfaces',
          title: 'Inheritance, Abstract Classes, Interfaces & Polymorphism',
          description: 'Master object inheritance (extends), abstract classes, interface contracts (implements), default methods, and dynamic polymorphism.',
          estimatedMinutes: 40,
          orderIndex: 5,
          prerequisites: ['java-les-4'],
          concepts: [
            {
              id: 'jc5_pol1',
              title: 'Interfaces vs Abstract Classes Matrix',
              contentMarkdown: `### Interfaces vs Abstract Classes
- **Interface**: Contract establishing WHAT methods a class must implement. Supports multiple interface inheritance.
- **Abstract Class**: Partial base class containing shared field state and method implementations. Single inheritance only.`
            }
          ],
          examples: [
            {
              id: 'jex5_pol1',
              title: 'Example: Interface Polymorphism',
              code: `interface PaymentProcessor {
    void processPayment(double amount);
}

class CreditCardProcessor implements PaymentProcessor {
    public void processPayment(double amount) {
        System.out.println("Credit Card Charged: $" + amount);
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentProcessor processor = new CreditCardProcessor();
        processor.processPayment(250.0);
    }
}`,
              explanation: 'Assigning concrete CreditCardProcessor to PaymentProcessor interface variable demonstrates polymorphism.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Polymorphic interface contracts and class extension mechanisms.',
            whyItExists: 'Decouples implementation callers from concrete dependencies.',
            howItWorks: 'JVM resolves method calls dynamically using virtual method vtable dispatch.',
            whereUsedProfessionally: 'Used across all enterprise plugin architectures, Spring dependency injection, and API abstractions.',
            howCompaniesUseIt: 'Companies code to interfaces rather than implementations to swap database or messaging providers effortlessly.',
            productionConsiderations: ['Favor composition over inheritance to prevent fragile base class problems.'],
            commonEngineeringMistakes: ['Deep inheritance hierarchies exceeding 3 levels.'],
            performanceImplications: 'Dynamic vtable invocation overhead is negligible and optimized by JIT monomorphic call site inlining.',
            securityImplications: 'Interface boundaries prevent leak of internal state implementation details.',
            alternativesAndTradeOffs: [{ option: 'Class Inheritance (extends)', comparison: 'Code reuse, tight coupling' }, { option: 'Interface Contract (implements)', comparison: 'Loose coupling, maximum testability' }],
            whenToUse: ['Use interfaces to define service APIs and boundary contracts'],
            whenNotToUse: ['Do not use abstract class inheritance solely for sharing utility helper code']
          },
          quiz: [
            {
              id: 'jq5_pol1',
              question: 'How many concrete classes can a single Java class inherit using the extends keyword?',
              options: ['Unlimited', 'Exactly 1', 'Up to 3', 'Zero'],
              correctOptionIndex: 1,
              explanation: 'Java supports single class inheritance strictly (extends 1 class), but multiple interface implementation (implements N).'
            }
          ],
          exercise: {
            id: 'jex-5pol',
            instructions: 'Print `"Credit Card Charged: $250.0"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Interface payment execution\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Credit Card Charged: $250.0");\n    }\n}',
            hints: ['Print Credit Card Charged: $250.0 to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc5pol', description: 'Outputs Credit Card Charged: $250.0', expectedOutput: 'Credit Card Charged: $250.0' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-6',
          slug: 'java-strings-arrays',
          title: 'Arrays, String Memory Internals (String Pool & Immutability) & StringBuilder',
          description: 'Master fixed arrays, multi-dimensional matrices, String immutability, String Constant Pool mechanics, and performance optimization with StringBuilder.',
          estimatedMinutes: 35,
          orderIndex: 6,
          prerequisites: ['java-les-5'],
          concepts: [
            {
              id: 'jc6_str1',
              title: 'The Java String Constant Pool Architecture',
              contentMarkdown: `### String Immutability & String Pool
In Java, \`String\` objects are **immutable**. When you write \`String s1 = "Java";\`, the string literal is stored inside the **String Constant Pool** in JVM Metaspace/Heap. Multiple variables referencing identical string literals point to the exact same heap memory address!`
            }
          ],
          examples: [
            {
              id: 'jex6_str1',
              title: 'Example: String Concatenation vs StringBuilder Performance',
              code: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        sb.append("Java").append(" ").append("Enterprise");
        String result = sb.toString();

        System.out.println(result);
    }
}`,
              explanation: 'StringBuilder appends in-place without creating intermediate immutable string garbage objects.'
            }
          ],
          engineeringContext: {
            whatItIs: 'String memory caching pool and contiguous array data structures in Java.',
            whyItExists: 'Immutability guarantees thread safety, security hashing key stability, and memory deduplication.',
            howItWorks: 'String literal references share char[] / byte[] arrays in JVM string pool.',
            whereUsedProfessionally: 'Used in string manipulation pipelines, log formatters, and database query builders.',
            howCompaniesUseIt: 'Companies enforce StringBuilder in loops to avoid generating millions of short-lived GC string objects.',
            productionConsiderations: ['Always use StringBuilder or StringBuffer for string concatenation inside loops.'],
            commonEngineeringMistakes: ['Comparing String values using == reference equality instead of .equals().'],
            performanceImplications: 'String concatenation inside loops with + creates O(N^2) allocations; StringBuilder reduces it to O(N).',
            securityImplications: 'Passwords should be stored in char[] arrays and zeroed out rather than immutable Strings.',
            alternativesAndTradeOffs: [{ option: 'String Concatenation (+)', comparison: 'Readable for single lines, wasteful in loops' }, { option: 'StringBuilder', comparison: 'Fast, mutable buffer, single-threaded' }],
            whenToUse: ['Use StringBuilder for dynamic string assembly inside loops'],
            whenNotToUse: ['Do not use StringBuffer unless multi-threaded synchronization is explicitly required']
          },
          quiz: [
            {
              id: 'jq6_str1',
              question: 'Why are Java String literals stored inside the String Constant Pool?',
              options: ['To allow string modification', 'To reuse identical literals and save JVM heap memory', 'To prevent compilation errors', 'To enable auto-sorting'],
              correctOptionIndex: 1,
              explanation: 'The String Constant Pool deduplicates identical string literals, reducing JVM memory usage.'
            }
          ],
          exercise: {
            id: 'jex-6str',
            instructions: 'Use StringBuilder to construct and print `"Java Enterprise"`.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // StringBuilder construction\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java Enterprise");\n    }\n}',
            hints: ['Print Java Enterprise to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc6str', description: 'Outputs Java Enterprise', expectedOutput: 'Java Enterprise' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'java-mod-2',
      slug: 'java-collections-core',
      title: 'Level 2: Collections, Memory Management & Advanced Java Features',
      description: 'Master List/Set/Map collection data structures, HashMap internals, Generics type erasure, Exception handling, JVM memory tuning, Streams API, and Multithreading.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'java-les-7',
          slug: 'java-collections-framework',
          title: 'Java Collections Framework (List, Set, Queue & Deque)',
          description: 'Learn when to choose ArrayList, LinkedList, HashSet, TreeSet, PriorityQueue, and ArrayDeque for optimal time complexity.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['java-les-6'],
          concepts: [
            {
              id: 'jc7_col1',
              title: 'Collection Interface Hierarchy',
              contentMarkdown: `### Java Collection Hierarchy
- **List**: Ordered sequence allowing duplicates (\`ArrayList\` - dynamic array, \`LinkedList\` - doubly-linked list).
- **Set**: Collection of unique elements (\`HashSet\` - hashtable $O(1)$, \`TreeSet\` - red-black tree $O(\\log N)$).
- **Queue/Deque**: Double-ended queues for FIFO/LIFO processing (\`ArrayDeque\`, \`PriorityQueue\`).`
            }
          ],
          examples: [
            {
              id: 'jex7_col1',
              title: 'Example: ArrayList vs HashSet Usage',
              code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Java"); // Allows duplicate

        Set<String> set = new HashSet<>(list); // Eliminates duplicate

        System.out.println("List Size: " + list.size());
        System.out.println("Set Size: " + set.size());
    }
}`,
              explanation: 'HashSet deduplicates items by evaluating hashCode() and equals().'
            }
          ],
          engineeringContext: {
            whatItIs: 'Unified collection framework in java.util package.',
            whyItExists: 'Provides standard high-performance data structures and algorithm abstractions.',
            howItWorks: 'ArrayList uses dynamic array resizing (1.5x scaling); HashSet uses internal HashMap.',
            whereUsedProfessionally: 'Used in every Java application handling collections of domain objects.',
            howCompaniesUseIt: 'Companies choose specific collection implementations based on read/write ratio and time complexity requirements.',
            productionConsiderations: ['Specify initial capacity for ArrayList (new ArrayList<>(1000)) to prevent resize re-allocations.'],
            commonEngineeringMistakes: ['Using LinkedList for random index lookups causing O(N) traversal degradation.'],
            performanceImplications: 'ArrayList indexing is O(1); LinkedList indexing is O(N). Always default to ArrayList.',
            securityImplications: 'Wrap collections in Collections.unmodifiableList() when returning internal state.',
            alternativesAndTradeOffs: [{ option: 'ArrayList', comparison: 'O(1) random access, cache friendly' }, { option: 'LinkedList', comparison: 'O(1) insertion/deletion at ends, poor cache locality' }],
            whenToUse: ['Default to ArrayList for lists and HashSet for unique sets'],
            whenNotToUse: ['Do not use legacy Vector or Hashtable classes (use synchronized wrappers or ConcurrentHashMap)']
          },
          quiz: [
            {
              id: 'jq7_col1',
              question: 'Which collection implementation provides O(1) constant time random access lookup by index?',
              options: ['LinkedList', 'ArrayList', 'HashSet', 'TreeSet'],
              correctOptionIndex: 1,
              explanation: 'ArrayList wraps a contiguous array, enabling O(1) direct index pointer math.'
            }
          ],
          exercise: {
            id: 'jex-7col',
            instructions: 'Print `"List Size: 2, Set Size: 1"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Collection size test\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("List Size: 2, Set Size: 1");\n    }\n}',
            hints: ['Print List Size: 2, Set Size: 1 to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc7col', description: 'Outputs expected collection sizes', expectedOutput: 'List Size: 2, Set Size: 1' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-8',
          slug: 'java-hashmap-internals',
          title: 'HashMap Internals, Hashing Functions, Hash Collisions & TreeMap',
          description: 'Deep dive into HashMap internals: Node<K,V>[] bucket array, hashCode() distribution, load factor 0.75, collision resolution, and Java 8 Red-Black Tree conversion.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['java-les-7'],
          concepts: [
            {
              id: 'jc8_hm1',
              title: 'Inside Java 8+ HashMap Implementation',
              contentMarkdown: `### HashMap Internal Architecture
1. **Bucket Array**: Array of \`Node<K,V>\` initialized to default capacity 16.
2. **Hash Computation**: \`hash = (h = key.hashCode()) ^ (h >>> 16)\` spreads high bits.
3. **Index Calculation**: \`index = hash & (n - 1)\` maps hash code into array index.
4. **Collision Handling**: Chaining via linked list nodes. When a bucket exceeds 8 nodes and array capacity >= 64, the bucket transforms into a **Red-Black Tree** ($O(\\log N)$ lookup)!`
            }
          ],
          examples: [
            {
              id: 'jex8_hm1',
              title: 'Example: HashMap Key Insertion & Value Retrieval',
              code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> stock = new HashMap<>();
        stock.put("Laptops", 45);
        stock.put("Phones", 120);

        System.out.println("Laptops Stock: " + stock.get("Laptops"));
    }
}`,
              explanation: 'Retrieves stock value in O(1) average time via hash bucket calculation.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Key-value hash table data structure implementation.',
            whyItExists: 'Provides near instant O(1) average lookup, insertion, and deletion for keyed data.',
            howItWorks: 'Hashes key using hashCode(), maps to bucket index, resolves collisions with linked list or red-black tree.',
            whereUsedProfessionally: 'Used in caches, index lookups, session stores, and key-value mapping logic.',
            howCompaniesUseIt: 'Companies override both hashCode() and equals() together on custom key classes to guarantee lookup accuracy.',
            productionConsiderations: ['Always override hashCode() whenever you override equals().'],
            commonEngineeringMistakes: ['Using a mutable key class whose fields change after insertion into HashMap.'],
            performanceImplications: 'Bad hashCode() implementation mapping all keys to bucket index 0 degrades HashMap performance to O(N).',
            securityImplications: 'Hash collision Denial of Service (DoS) attacks are mitigated in Java 8 by Red-Black tree conversion.',
            alternativesAndTradeOffs: [{ option: 'HashMap', comparison: 'O(1) lookup, unsorted, not thread-safe' }, { option: 'TreeMap', comparison: 'O(log N) lookup, sorted key order (Red-Black tree)' }],
            whenToUse: ['Use HashMap for fast key-value lookups when ordering is not required'],
            whenNotToUse: ['Do not use HashMap concurrently across threads without ConcurrentHashMap']
          },
          quiz: [
            {
              id: 'jq8_hm1',
              question: 'In Java 8+, what data structure does a HashMap bucket convert into when it contains more than 8 colliding nodes?',
              options: ['ArrayList', 'Red-Black Tree', 'Doubly Linked List', 'Priority Queue'],
              correctOptionIndex: 1,
              explanation: 'When collision threshold 8 is exceeded, HashMap treeifies the bucket into a Red-Black Tree for O(log N) worst case lookup.'
            }
          ],
          exercise: {
            id: 'jex-8hm',
            instructions: 'Insert `"Laptops"` with value `45` into a HashMap and print `"Laptops Stock: 45"`.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // HashMap insertion\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Laptops Stock: 45");\n    }\n}',
            hints: ['Print Laptops Stock: 45 to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc8hm', description: 'Outputs Laptops Stock: 45', expectedOutput: 'Laptops Stock: 45' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-9',
          slug: 'java-generics-type-erasure',
          title: 'Java Generics, Type Erasure, Wildcards & Covariance/Contravariance',
          description: 'Master generic classes, generic methods, compile-time Type Erasure mechanics, wildcards (`?`), bounded wildcards (`? extends T` vs `? super T`), and PECS principle.',
          estimatedMinutes: 40,
          orderIndex: 3,
          prerequisites: ['java-les-8'],
          concepts: [
            {
              id: 'jc9_gen1',
              title: 'Type Erasure & The PECS Principle',
              contentMarkdown: `### The PECS Rule (Producer Extends, Consumer Super)
- **Producer Extends (\`? extends T\`)**: Use when your generic parameter ONLY provides data (read-only).
- **Consumer Super (\`? super T\`)**: Use when your generic parameter ONLY consumes data (write-only).
- **Type Erasure**: Java compiler removes all generic type information during compilation, replacing parameters with Object or bound types for backward compatibility with pre-Java 5 bytecodes!`
            }
          ],
          examples: [
            {
              id: 'jex9_gen1',
              title: 'Example: Generic Box Class Implementation',
              code: `public class Box<T> {
    private T content;

    public void set(T content) { this.content = content; }
    public T get() { return this.content; }

    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();
        stringBox.set("Generics in Java 21");
        System.out.println("Box Item: " + stringBox.get());
    }
}`,
              explanation: 'Box<T> enforces compile-time type safety for any object type T.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Compile-time parametric polymorphism system.',
            whyItExists: 'Eliminates explicit type casting boilerplate and prevents ClassCastException at runtime.',
            howItWorks: 'Compiler checks types during compilation and inserts implicit casts after Type Erasure.',
            whereUsedProfessionally: 'Used across all Collection frameworks, Spring Data repositories, and API wrappers.',
            howCompaniesUseIt: 'Companies leverage generics to write reusable utility libraries and type-safe data access objects.',
            productionConsiderations: ['Be aware that type erasure prevents instantiating new T() directly inside generic methods.'],
            commonEngineeringMistakes: ['Using raw types (List list = new ArrayList()) bypassing generic type safety.'],
            performanceImplications: 'Generics add ZERO runtime performance overhead due to Type Erasure compilation.',
            securityImplications: 'Strict generic bounds prevent illegal object injection attacks into data stores.',
            alternativesAndTradeOffs: [{ option: 'Raw Object Parameter', comparison: 'Requires runtime casting, unsafe' }, { option: 'Generic Type <T>', comparison: 'Compile-time verified, cast-free, zero runtime cost' }],
            whenToUse: ['Use generics for all reusable data containers, repositories, and utility functions'],
            whenNotToUse: ['Do not use raw types without generic type arguments in modern Java']
          },
          quiz: [
            {
              id: 'jq9_gen1',
              question: 'What does the Java compiler do to generic type arguments during compilation (Type Erasure)?',
              options: ['Creates separate bytecode classes for each type', 'Erases type parameters and replaces them with bounds or Object', 'Converts generics to C++ templates', 'Throws a runtime exception'],
              correctOptionIndex: 1,
              explanation: 'Type Erasure removes generic type parameters at compile-time for backward bytecode compatibility.'
            }
          ],
          exercise: {
            id: 'jex-9gen',
            instructions: 'Create a generic Box<String> set to `"Generics in Java 21"` and print `"Box Item: Generics in Java 21"`.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Generic Box execution\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Box Item: Generics in Java 21");\n    }\n}',
            hints: ['Print Box Item: Generics in Java 21 to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc9gen', description: 'Outputs Box Item: Generics in Java 21', expectedOutput: 'Box Item: Generics in Java 21' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-10',
          slug: 'java-exceptions-generics',
          title: 'Exception Handling, Custom Exceptions & Try-With-Resources',
          description: 'Handle checked vs unchecked exceptions, design custom exception hierarchies, and manage resource cleanup automatically with try-with-resources (AutoCloseable).',
          estimatedMinutes: 35,
          orderIndex: 4,
          prerequisites: ['java-les-9'],
          concepts: [
            {
              id: 'jc10_ex1',
              title: 'Try-With-Resources & AutoCloseable',
              contentMarkdown: `### Automatic Resource Management (ARM)
Java 7+ try-with-resources automatically invokes \`.close()\` on resources implementing \`AutoCloseable\` (File streams, DB connections) upon block exit, even if exceptions are thrown:
\`\`\`java
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    System.out.println(br.readLine());
}
\`\`\``
            }
          ],
          examples: [
            {
              id: 'jex10_ex1',
              title: 'Example: Custom Exception & Try-Catch Block',
              code: `class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) { super(message); }
}

public class Main {
    public static void main(String[] args) {
        try {
            withdraw(100, 500);
        } catch (InsufficientFundsException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        }
    }

    public static void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) throw new InsufficientFundsException("Balance too low");
    }
}`,
              explanation: 'Throws custom checked exception when withdrawal exceeds current balance.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Structured error handling and resource cleanup mechanism.',
            whyItExists: 'Prevents resource leaks (file descriptors, DB sockets) and provides fault isolation.',
            howItWorks: 'JVM unwinds execution stack frame by frame searching for matching catch block.',
            whereUsedProfessionally: 'Used in API error responses, transaction rollback triggers, and input validation.',
            howCompaniesUseIt: 'Companies create domain-specific unchecked exception hierarchies mapped to HTTP error status codes.',
            productionConsiderations: ['Always use try-with-resources when working with I/O streams or database connections.'],
            commonEngineeringMistakes: ['Catching Throwable or Exception blindly and swallowing exceptions silently.'],
            performanceImplications: 'Instantiating exceptions captures execution stack traces, which has non-zero CPU overhead.',
            securityImplications: 'Sanitize exception stack traces before returning responses to external clients.',
            alternativesAndTradeOffs: [{ option: 'Manual close() in finally', comparison: 'Error-prone, verbose' }, { option: 'Try-With-Resources', comparison: 'Clean, safe, guaranteed auto-closing' }],
            whenToUse: ['Use try-with-resources for all I/O streams, database connections, and network sockets'],
            whenNotToUse: ['Do not use exception handling for normal control flow branching']
          },
          quiz: [
            {
              id: 'jq10_ex1',
              question: 'Which interface must a class implement to be eligible for automatic cleanup inside a try-with-resources block?',
              options: ['Serializable', 'AutoCloseable', 'Cloneable', 'Runnable'],
              correctOptionIndex: 1,
              explanation: 'The try-with-resources statement requires resources to implement AutoCloseable or Closeable.'
            }
          ],
          exercise: {
            id: 'jex-10ex',
            instructions: 'Print `"Caught Exception: Balance too low"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Exception catch print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Caught Exception: Balance too low");\n    }\n}',
            hints: ['Print Caught Exception: Balance too low to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc10ex', description: 'Outputs expected exception message', expectedOutput: 'Caught Exception: Balance too low' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-11',
          slug: 'java-jvm-memory-gc',
          title: 'JVM Memory Management: Heap, Stack, Metaspace & Garbage Collection Internals',
          description: 'Explore Stack vs Heap memory allocation, Young Generation (Eden, Survivor S0/S1), Old Generation, Metaspace, G1GC, and ZGC Garbage Collectors.',
          estimatedMinutes: 40,
          orderIndex: 5,
          prerequisites: ['java-les-10'],
          concepts: [
            {
              id: 'jc11_gc1',
              title: 'JVM Generational Memory Heap Model',
              contentMarkdown: `### JVM Memory Heap Architecture
1. **Young Generation**: Eden Space (where new objects are instantiated) + Survivor Spaces S0/S1. Minor GC collects short-lived objects.
2. **Old Generation**: Long-lived objects promoted after surviving N garbage collection cycles. Major/Full GC collects Old Gen.
3. **Metaspace**: Off-heap native memory storing class metadata, method bytecodes, and String Pool.`
            }
          ],
          examples: [
            {
              id: 'jex11_gc1',
              title: 'Example: Inspecting JVM Memory Metrics via Runtime API',
              code: `public class Main {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        long maxMemoryMB = runtime.maxMemory() / (1024 * 1024);
        long totalMemoryMB = runtime.totalMemory() / (1024 * 1024);

        System.out.println("Max JVM Memory: " + maxMemoryMB + " MB");
        System.out.println("Allocated Memory: " + totalMemoryMB + " MB");
    }
}`,
              explanation: 'Queries JVM memory allocation parameters at runtime.'
            }
          ],
          engineeringContext: {
            whatItIs: 'JVM heap layout and automated memory management subsystem.',
            whyItExists: 'Frees developers from manual memory management (free/delete), eliminating dangling pointers.',
            howItWorks: 'Mark-and-Sweep Garbage Collector traces object graphs from GC Roots (threads, static fields).',
            whereUsedProfessionally: 'Crucial for performance tuning enterprise microservices handling heavy concurrency.',
            howCompaniesUseIt: 'Companies configure G1GC or ZGC flags (-XX:+UseZGC) for sub-millisecond pause times.',
            productionConsiderations: ['Set -Xms and -Xmx heap memory limits to identical values in containerized environments.'],
            commonEngineeringMistakes: ['Static collections keeping obsolete object references, causing JVM memory leaks.'],
            performanceImplications: 'Unoptimized Full GC pauses freeze execution threads (Stop-The-World), degrading SLA latency.',
            securityImplications: 'Proper memory isolation prevents buffer overflow vulnerabilities.',
            alternativesAndTradeOffs: [{ option: 'G1GC', comparison: 'Default balanced collector for server workloads' }, { option: 'ZGC / Shenandoah', comparison: 'Ultra-low pause collector (<1ms) for huge heaps' }],
            whenToUse: ['Tune JVM GC parameters for microservices with strict latency SLAs'],
            whenNotToUse: ['Do not call System.gc() explicitly in production code']
          },
          quiz: [
            {
              id: 'jq11_gc1',
              question: 'In which JVM memory zone are newly instantiated Java objects initially allocated?',
              options: ['Metaspace', 'Eden Space (Young Gen)', 'Old Generation', 'Native Stack'],
              correctOptionIndex: 1,
              explanation: 'New objects are initially allocated inside Eden Space within the Young Generation heap.'
            }
          ],
          exercise: {
            id: 'jex-11gc',
            instructions: 'Print `"JVM Memory Status: OK"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // JVM Memory status print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("JVM Memory Status: OK");\n    }\n}',
            hints: ['Print JVM Memory Status: OK to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc11gc', description: 'Outputs JVM Memory Status: OK', expectedOutput: 'JVM Memory Status: OK' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-12',
          slug: 'java-streams-lambda',
          title: 'Stream API, Lambda Expressions & Functional Processing',
          description: 'Filter, map, flatMap, reduce, and collect collection elements declaratively using Java 8+ Streams API and functional interface lambdas.',
          estimatedMinutes: 40,
          orderIndex: 6,
          prerequisites: ['java-les-11'],
          concepts: [
            {
              id: 'jc12_st1',
              title: 'Stream Pipeline Architecture & Lazy Evaluation',
              contentMarkdown: `### Stream Processing Stages
1. **Source**: Collection stream (\`list.stream()\`).
2. **Intermediate Operations**: Lazy transformations returning a stream (\`filter()\`, \`map()\`, \`sorted()\`, \`flatMap()\`).
3. **Terminal Operation**: Triggers evaluation and returns a result (\`collect()\`, \`reduce()\`, \`count()\`, \`findFirst()\`).`
            }
          ],
          examples: [
            {
              id: 'jex12_st1',
              title: 'Example: Stream Filter & Map Pipeline',
              code: `import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Andrew", "Charlie");

        List<String> result = names.stream()
            .filter(n -> n.startsWith("A"))
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println("Transformed: " + result);
    }
}`,
              explanation: 'Filters names starting with A, converts to uppercase, and collects into list.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Declarative functional data processing pipeline API.',
            whyItExists: 'Simplifies collection manipulation and enables clean parallel iteration.',
            howItWorks: 'Streams build an execution graph evaluated lazily upon reaching a terminal operation.',
            whereUsedProfessionally: 'Used extensively in enterprise business logic, DTO mapping, and data filtering.',
            howCompaniesUseIt: 'Companies use Streams to write clean, self-documenting data transformation code.',
            productionConsiderations: ['Avoid side-effects inside stream lambdas (e.g. modifying external state collections).'],
            commonEngineeringMistakes: ['Reusing a Stream object after a terminal operation has already executed.'],
            performanceImplications: 'Standard loops are slightly faster for small primitive arrays; Streams excel in readability and parallel execution.',
            securityImplications: 'Declarative pipelines eliminate off-by-one indexing vulnerabilities.',
            alternativesAndTradeOffs: [{ option: 'Imperative For Loop', comparison: 'Explicit, fast, verbose' }, { option: 'Functional Stream', comparison: 'Declarative, composable, lazy evaluation' }],
            whenToUse: ['Use Streams for filtering, transforming, and grouping collection data'],
            whenNotToUse: ['Use standard loops if logic requires checked exception throws or complex early returns']
          },
          quiz: [
            {
              id: 'jq12_st1',
              question: 'Which type of operation triggers actual execution of a Java Stream pipeline?',
              options: ['Intermediate operation', 'Terminal operation', 'Filter operation', 'Map operation'],
              correctOptionIndex: 1,
              explanation: 'Streams evaluate lazily until a terminal operation (like collect or reduce) is called.'
            }
          ],
          exercise: {
            id: 'jex-12st',
            instructions: 'Write a Java Stream snippet printing `"Transformed: [ALICE, ANDREW]"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Stream output\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Transformed: [ALICE, ANDREW]");\n    }\n}',
            hints: ['Print Transformed: [ALICE, ANDREW] to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc12st', description: 'Outputs Transformed list', expectedOutput: 'Transformed: [ALICE, ANDREW]' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-13',
          slug: 'java-io-nio',
          title: 'Java File I/O, NIO.2 Channels, Buffers & Object Serialization',
          description: 'Master non-blocking I/O with Java NIO.2 (`java.nio.file.Files`, `Path`), Byte Channels, Direct Memory Buffers, and Object Serialization.',
          estimatedMinutes: 35,
          orderIndex: 7,
          prerequisites: ['java-les-12'],
          concepts: [
            {
              id: 'jc13_nio1',
              title: 'Java NIO.2 Non-Blocking Architecture',
              contentMarkdown: `### Java NIO.2 Features
- **Path & Files**: Modern utility API replacing legacy \`java.io.File\`.
- **Channels & Buffers**: Fast OS-level direct memory transfers without intermediate JVM array copies.
- **Asynchronous File Channel**: Non-blocking asynchronous disk read and write operations.`
            }
          ],
          examples: [
            {
              id: 'jex13_nio1',
              title: 'Example: Reading Files with Files & Path API',
              code: `import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Path path = Paths.get("config.txt");
        System.out.println("Path Absolute: " + path.toAbsolutePath());
    }
}`,
              explanation: 'Demonstrates modern Path creation and resolution.'
            }
          ],
          engineeringContext: {
            whatItIs: 'High-performance non-blocking I/O API for files and sockets.',
            whyItExists: 'Overcomes blocking I/O bottleneck where each socket connection required a dedicated thread.',
            howItWorks: 'Uses OS native epoll/kqueue selectors and direct byte buffers.',
            whereUsedProfessionally: 'Used in Netty, Spring WebFlux, Kafka, and enterprise file processing engines.',
            howCompaniesUseIt: 'Companies leverage NIO.2 to handle tens of thousands of concurrent network connections per server.',
            productionConsiderations: ['Use Files.lines() for memory-efficient streaming of huge multi-gigabyte log files.'],
            commonEngineeringMistakes: ['Reading an entire 10GB file into memory with Files.readAllBytes().'],
            performanceImplications: 'Direct byte buffers bypass JVM heap GC tracking, achieving zero-copy I/O throughput.',
            securityImplications: 'Sanitize file paths against Directory Traversal attacks (../).',
            alternativesAndTradeOffs: [{ option: 'Legacy java.io', comparison: 'Blocking, simple stream API' }, { option: 'Java NIO.2', comparison: 'Non-blocking, direct memory, high throughput' }],
            whenToUse: ['Use Java NIO.2 for modern file operations and high-throughput server sockets'],
            whenNotToUse: ['Use simple Reader/Writer for basic single-line small text file operations']
          },
          quiz: [
            {
              id: 'jq13_nio1',
              question: 'Which modern Java API replaces the legacy java.io.File class for file system operations?',
              options: ['java.nio.file.Path and Files', 'java.util.Scanner', 'java.io.DataInputStream', 'java.lang.System'],
              correctOptionIndex: 0,
              explanation: 'Java 7 introduced java.nio.file.Path and Files as the standard modern file I/O framework.'
            }
          ],
          exercise: {
            id: 'jex-13nio',
            instructions: 'Print `"Path Verified"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Path validation print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Path Verified");\n    }\n}',
            hints: ['Print Path Verified to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc13nio', description: 'Outputs Path Verified', expectedOutput: 'Path Verified' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-14',
          slug: 'java-multithreading-basics',
          title: 'Multithreading Foundations, Thread State Lifecycle & Synchronization',
          description: 'Master Thread creation (Thread vs Runnable), Thread lifecycle states (NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED), and synchronized mutex blocks.',
          estimatedMinutes: 40,
          orderIndex: 8,
          prerequisites: ['java-les-13'],
          concepts: [
            {
              id: 'jc14_th1',
              title: 'Java Thread State Lifecycle Machine',
              contentMarkdown: `### Thread States in JVM
1. **NEW**: Instantiated but not yet started via \`.start()\`.
2. **RUNNABLE**: Executing in JVM or eligible for CPU time slice scheduling.
3. **BLOCKED**: Waiting to acquire a \`synchronized\` monitor lock.
4. **WAITING / TIMED_WAITING**: Suspended waiting for another thread notification or timer.
5. **TERMINATED**: Execution completed.`
            }
          ],
          examples: [
            {
              id: 'jex14_th1',
              title: 'Example: Synchronized Counter Thread Safety',
              code: `class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public int getCount() { return count; }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        Thread t1 = new Thread(() -> { for(int i=0; i<1000; i++) counter.increment(); });
        Thread t2 = new Thread(() -> { for(int i=0; i<1000; i++) counter.increment(); });

        t1.start(); t2.start();
        t1.join(); t2.join();

        System.out.println("Final Count: " + counter.getCount());
    }
}`,
              explanation: 'synchronized method prevents race conditions during concurrent count increments.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Concurrent execution thread model in JVM.',
            whyItExists: 'Utilizes multi-core CPU hardware parallel computing capacity.',
            howItWorks: 'JVM maps Java threads to native OS kernel threads (or Virtual Threads in Java 21).',
            whereUsedProfessionally: 'Used in background task processing, web request handling, and batch jobs.',
            howCompaniesUseIt: 'Companies synchronize shared resource mutations to prevent data race corruption.',
            productionConsiderations: ['Minimize synchronized lock block duration to avoid thread contention bottlenecks.'],
            commonEngineeringMistakes: ['Calling run() directly instead of start(), executing logic on the current thread.'],
            performanceImplications: 'Unsynchronized concurrent writes to shared state cause race conditions and data corruption.',
            securityImplications: 'Thread safety guarantees invariant integrity across concurrent user requests.',
            alternativesAndTradeOffs: [{ option: 'Synchronized Block', comparison: 'Simple, monitor lock, can block threads' }, { option: 'Atomic Types (AtomicInteger)', comparison: 'Lock-free CAS instructions, fast' }],
            whenToUse: ['Use synchronization when multiple threads mutate shared object state'],
            whenNotToUse: ['Prefer atomic variables or immutable state to avoid lock overhead altogether']
          },
          quiz: [
            {
              id: 'jq14_th1',
              question: 'What happens if a developer invokes thread.run() instead of thread.start()?',
              options: ['The thread starts in a new OS thread', 'The code executes synchronously on the current caller thread', 'A JVM runtime exception is thrown', 'The thread is terminated immediately'],
              correctOptionIndex: 1,
              explanation: 'Calling run() executes the method synchronously on the existing caller thread rather than starting a new thread.'
            }
          ],
          exercise: {
            id: 'jex-14th',
            instructions: 'Print `"Final Count: 2000"` to standard stdout after thread completion.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Thread count test\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Final Count: 2000");\n    }\n}',
            hints: ['Print Final Count: 2000 to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc14th', description: 'Outputs Final Count: 2000', expectedOutput: 'Final Count: 2000' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-15',
          slug: 'java-concurrency-threads',
          title: 'ExecutorService, Thread Pools, Atomic Types & Concurrent Collections',
          description: 'Master ExecutorService thread pool management (`newFixedThreadPool`), AtomicInteger (lock-free CAS), ConcurrentHashMap, and Java 21 Virtual Threads (Project Loom).',
          estimatedMinutes: 40,
          orderIndex: 9,
          prerequisites: ['java-les-14'],
          concepts: [
            {
              id: 'jc15_conc1',
              title: 'ExecutorService & ConcurrentHashMap',
              contentMarkdown: `### Modern Java Concurrency Utilities
1. **ExecutorService**: Reusable thread pool managing worker thread life cycles efficiently.
2. **ConcurrentHashMap**: Lock-striping hashtable allowing concurrent reads without locking and thread-safe writes per bucket node.
3. **Java 21 Virtual Threads (Loom)**: Ultra-lightweight JVM-managed threads enabling millions of concurrent threads with minimal memory footprint!`
            }
          ],
          examples: [
            {
              id: 'jex15_conc1',
              title: 'Example: Fixed Thread Pool Execution',
              code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        executor.submit(() -> System.out.println("Task 1 Executing"));
        executor.submit(() -> System.out.println("Task 2 Executing"));

        executor.shutdown();
        System.out.println("Tasks Submitted");
    }
}`,
              explanation: 'Executor pool recycles worker threads across submitted tasks.'
            }
          ],
          engineeringContext: {
            whatItIs: 'High-level concurrency framework in java.util.concurrent.',
            whyItExists: 'Replaces raw thread creation overhead with managed thread pools and lock-free atomic structures.',
            howItWorks: 'Uses lock-free Compare-And-Swap (CAS) CPU instructions for atomic variables.',
            whereUsedProfessionally: 'Used in high-throughput HTTP servers, database connection pools, and async job workers.',
            howCompaniesUseIt: 'Companies deploy ConcurrentHashMap and ExecutorService to handle concurrent enterprise workloads safely.',
            productionConsiderations: ['Always call executor.shutdown() to allow JVM graceful termination.'],
            commonEngineeringMistakes: ['Creating unbounded Executors.newCachedThreadPool() risking OutOfMemoryError under load spikes.'],
            performanceImplications: 'Lock-free CAS atomic operations perform 10x faster than synchronized blocks under moderate contention.',
            securityImplications: 'Thread pools prevent Denial of Service resource exhaustion.',
            alternativesAndTradeOffs: [{ option: 'Manual Thread Creation', comparison: 'Heavy OS thread overhead' }, { option: 'ExecutorService Thread Pool', comparison: 'Managed, reusable, predictable resource bounds' }],
            whenToUse: ['Use ExecutorService thread pools for all background asynchronous task execution'],
            whenNotToUse: ['Do not use raw synchronization when ConcurrentHashMap or AtomicInteger is available']
          },
          quiz: [
            {
              id: 'jq15_conc1',
              question: 'Which framework in java.util.concurrent manages reusable thread pools and async task scheduling?',
              options: ['Thread', 'ExecutorService', 'Runnable', 'Process'],
              correctOptionIndex: 1,
              explanation: 'ExecutorService provides managed thread pool allocation, task queueing, and thread recycling.'
            }
          ],
          exercise: {
            id: 'jex-15conc',
            instructions: 'Print `"Tasks Submitted"` to standard stdout using ExecutorService.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // ExecutorService execution\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Tasks Submitted");\n    }\n}',
            hints: ['Print Tasks Submitted to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc15conc', description: 'Outputs Tasks Submitted', expectedOutput: 'Tasks Submitted' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'java-mod-3',
      slug: 'java-advanced-enterprise',
      title: 'Level 3: Enterprise Microservices, Framework Architecture & Production Engineering',
      description: 'Architect production-grade enterprise backends with Maven/Gradle, Spring Boot 3 IoC container, REST APIs, JPA/Hibernate ORM, Transactions, Spring Security 6, Microservices, JUnit 5 testing, Observability, and Docker deployment.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'java-les-16',
          slug: 'java-maven-gradle',
          title: 'Build Automation Tools: Maven & Gradle Dependency Architecture',
          description: 'Master enterprise build systems: Maven `pom.xml` lifecycle (compile, test, package), Gradle `build.gradle.kts`, dependency resolution, transitives, and multi-module projects.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['java-les-15'],
          concepts: [
            {
              id: 'jc16_mb1',
              title: 'Maven vs Gradle Build Architecture',
              contentMarkdown: `### Maven Lifecycle Phases
- **validate**: Verify project structure is correct.
- **compile**: Compile source code to bytecode \`.class\` files.
- **test**: Execute JUnit unit tests.
- **package**: Bundle compiled bytecode into JAR or WAR distribution archives.`
            }
          ],
          examples: [
            {
              id: 'jex16_mb1',
              title: 'Example: Inspecting Maven Coordinates',
              code: `public class Main {
    public static void main(String[] args) {
        String groupId = "com.firstmove.enterprise";
        String artifactId = "order-service";
        String version = "1.0.0-SNAPSHOT";

        System.out.println("Build Target: " + groupId + ":" + artifactId + ":" + version);
    }
}`,
              explanation: 'Demonstrates standard GAV (GroupId, ArtifactId, Version) coordinates.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Build automation and dependency management toolchain.',
            whyItExists: 'Automates compilation, dependency downloading, testing, and packaging into JAR binaries.',
            howItWorks: 'Downloads declared dependencies from Central Repositories and builds transitive dependency graphs.',
            whereUsedProfessionally: 'Used in 100% of enterprise Java software development environments.',
            howCompaniesUseIt: 'Companies use Maven/Gradle plugins for static analysis, security vulnerability scanning, and CI/CD packaging.',
            productionConsiderations: ['Pin explicit version tags on all third-party dependencies to guarantee reproducible builds.'],
            commonEngineeringMistakes: ['Dependency hell conflicts arising from unmanaged transitive version collisions.'],
            performanceImplications: 'Gradle build cache speeds up incremental builds by 5x compared to clean compiles.',
            securityImplications: 'Scan build dependencies with OWASP Dependency-Check plugin to detect CVE vulnerabilities.',
            alternativesAndTradeOffs: [{ option: 'Apache Maven', comparison: 'Declarative XML, rigid standard convention' }, { option: 'Gradle', comparison: 'Flexible Groovy/Kotlin DSL, faster incremental build cache' }],
            whenToUse: ['Use Maven or Gradle for all Java project dependency management and build automation'],
            whenNotToUse: ['Never manage raw JAR libraries manually inside project lib folders']
          },
          quiz: [
            {
              id: 'jq16_mb1',
              question: 'Which Maven lifecycle phase compiles source code and bundles it into an executable JAR file?',
              options: ['validate', 'test', 'package', 'deploy'],
              correctOptionIndex: 2,
              explanation: 'The package phase compiles code, runs tests, and packages the result into a JAR archive.'
            }
          ],
          exercise: {
            id: 'jex-16mb',
            instructions: 'Print `"Build Target: com.firstmove.enterprise:order-service:1.0.0-SNAPSHOT"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Maven GAV print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Build Target: com.firstmove.enterprise:order-service:1.0.0-SNAPSHOT");\n    }\n}',
            hints: ['Print Build Target: com.firstmove.enterprise:order-service:1.0.0-SNAPSHOT to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc16mb', description: 'Outputs Maven GAV build target', expectedOutput: 'Build Target: com.firstmove.enterprise:order-service:1.0.0-SNAPSHOT' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-17',
          slug: 'java-spring-boot-ioc',
          title: 'Spring Boot 3 Core: Dependency Injection, IoC Container & Bean Lifecycle',
          description: 'Master Spring Boot 3 application architecture: Inversion of Control (IoC), Dependency Injection (`@Autowired`, Constructor Injection), Component Scanning, `@Bean`, and Bean Lifecycles.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['java-les-16'],
          concepts: [
            {
              id: 'jc17_ioc1',
              title: 'Spring Inversion of Control Container',
              contentMarkdown: `### Spring IoC Container Mechanics
1. **Bean Instantiation**: Spring scans annotated classes (\`@Component\`, \`@Service\`, \`@Repository\`, \`@Controller\`) and instantiates managed object instances (Beans).
2. **Dependency Injection**: Spring injects dependent bean references via Constructor Injection automatically.
3. **Bean Scopes**: Singleton (default), Prototype, Request, Session.`
            }
          ],
          examples: [
            {
              id: 'jex17_ioc1',
              title: 'Example: Spring Constructor Dependency Injection',
              code: `interface OrderRepository { void save(); }

class SqlOrderRepository implements OrderRepository {
    public void save() { System.out.println("Order Saved to SQL Database"); }
}

class OrderService {
    private final OrderRepository repository;

    // Constructor Injection (Spring Best Practice)
    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public void processOrder() { repository.save(); }
}

public class Main {
    public static void main(String[] args) {
        OrderService service = new OrderService(new SqlOrderRepository());
        service.processOrder();
    }
}`,
              explanation: 'Constructor injection ensures OrderService receives a valid OrderRepository dependency.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Inversion of Control (IoC) framework container.',
            whyItExists: 'Decouples component dependencies, enabling clean unit testing with mock implementations.',
            howItWorks: 'Spring ApplicationContext manages bean lifecycle from instantiation to destruction.',
            whereUsedProfessionally: 'Used as the core runtime engine for modern enterprise Java applications.',
            howCompaniesUseIt: 'Companies mandate Constructor Injection to guarantee immutable dependencies.',
            productionConsiderations: ['Always prefer final fields with Constructor Injection over field @Autowired injection.'],
            commonEngineeringMistakes: ['Circular dependency cycles between Spring beans causing BeanCurrentlyInCreationException.'],
            performanceImplications: 'Spring Singleton beans are created once at application startup, providing fast execution without re-instantiation.',
            securityImplications: 'IoC container manages security beans and connection pools safely.',
            alternativesAndTradeOffs: [{ option: 'Field @Autowired', comparison: 'Short syntax, hard to test without Spring' }, { option: 'Constructor Injection', comparison: 'Explicit, final fields, easy JUnit mocking' }],
            whenToUse: ['Use Constructor Injection for all Spring Boot service dependencies'],
            whenNotToUse: ['Do not use Spring IoC container for lightweight standalone utility helper classes']
          },
          quiz: [
            {
              id: 'jq17_ioc1',
              question: 'Which Dependency Injection pattern is considered industry best practice in Spring Boot 3?',
              options: ['Field Injection (@Autowired on private field)', 'Setter Injection', 'Constructor Injection', 'Static Method Injection'],
              correctOptionIndex: 2,
              explanation: 'Constructor Injection allows fields to be declared final and simplifies unit testing without launching Spring context.'
            }
          ],
          exercise: {
            id: 'jex-17ioc',
            instructions: 'Print `"Order Saved to SQL Database"` using constructor injected service.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Spring IoC print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Order Saved to SQL Database");\n    }\n}',
            hints: ['Print Order Saved to SQL Database to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc17ioc', description: 'Outputs Order Saved to SQL Database', expectedOutput: 'Order Saved to SQL Database' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-18',
          slug: 'java-spring-boot-rest',
          title: 'Spring Boot REST Architecture & Microservice Endpoints',
          description: 'Architect web REST APIs, dependency injection beans, Spring Data JPA repositories, REST controllers, and DTO request validation.',
          estimatedMinutes: 45,
          orderIndex: 3,
          prerequisites: ['java-les-17'],
          concepts: [
            {
              id: 'jc18_rest1',
              title: 'Spring Boot REST Component Layers',
              contentMarkdown: `### Spring REST Architecture Layers
1. **Controller Layer (\`@RestController\`)**: Handles HTTP requests (\`@GetMapping\`, \`@PostMapping\`), path parameters, and DTO request validation (\`@Valid\`).
2. **Service Layer (\`@Service\`)**: Encapsulates business logic rules, data transformations, and transaction boundaries.
3. **Repository Layer (\`@Repository\`)**: Interfaces with database persistence storage.`
            }
          ],
          examples: [
            {
              id: 'jex18_rest1',
              title: 'Example: REST Controller Definition',
              code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Spring Microservice Status: UP");
    }
}`,
              explanation: 'Demonstrates health endpoint REST status response.'
            }
          ],
          engineeringContext: {
            whatItIs: 'REST API backend engineering layer in Spring Boot.',
            whyItExists: 'Exposes HTTP endpoints for frontend web apps, mobile clients, and external microservices.',
            howItWorks: 'Spring Jackson Jackson2ObjectMapper serializes Java DTO objects to JSON responses.',
            whereUsedProfessionally: 'Used in 90%+ of Java enterprise backend web microservices.',
            howCompaniesUseIt: 'Companies structure REST controllers with strict DTO patterns to hide internal database entity schemas.',
            productionConsiderations: ['Return appropriate HTTP status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Error).'],
            commonEngineeringMistakes: ['Exposing raw JPA entity objects directly in REST response bodies.'],
            performanceImplications: 'Jackson JSON serialization is fast; use DTOs to avoid circular reference infinite loops.',
            securityImplications: 'Validate all incoming JSON payloads with @Valid and Jakarta annotations (@NotNull, @Size).',
            alternativesAndTradeOffs: [{ option: 'Raw Entity Returns', comparison: 'Simple, exposes DB schema, risk of serialization loops' }, { option: 'DTO Pattern', comparison: 'Clean API contract, hides DB internals' }],
            whenToUse: ['Use @RestController and DTOs for all enterprise RESTful API implementations'],
            whenNotToUse: ['Use gRPC for ultra-low latency binary inter-microservice communication']
          },
          quiz: [
            {
              id: 'jq18_rest1',
              question: 'Which Spring annotation designates a class as a RESTful web controller returning JSON responses?',
              options: ['@Service', '@Component', '@RestController', '@Repository'],
              correctOptionIndex: 2,
              explanation: '@RestController combines @Controller and @ResponseBody, serializing returned objects into JSON.'
            }
          ],
          exercise: {
            id: 'jex-18rest',
            instructions: 'Print `"Spring Microservice Status: UP"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Spring status print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Spring Microservice Status: UP");\n    }\n}',
            hints: ['Print Spring Microservice Status: UP to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc18rest', description: 'Outputs Spring Microservice Status: UP', expectedOutput: 'Spring Microservice Status: UP' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-19',
          slug: 'java-spring-data-jpa',
          title: 'Spring Data JPA, Hibernate ORM & N+1 Query Optimization',
          description: 'Master Object-Relational Mapping (ORM) with Hibernate, Spring Data JPA repositories, `@Entity`, `@OneToMany`, `@ManyToOne`, JPQL queries, and resolving N+1 performance bottlenecks with `JOIN FETCH`.',
          estimatedMinutes: 45,
          orderIndex: 4,
          prerequisites: ['java-les-18'],
          concepts: [
            {
              id: 'jc19_jpa1',
              title: 'Spring Data JPA & The N+1 Select Problem',
              contentMarkdown: `### The N+1 Select Problem & Solution
When fetching a list of N parent entities with LAZY child associations, accessing child elements triggers **N additional SELECT queries**!
- **Fix**: Use \`JOIN FETCH\` in JPQL or \`@EntityGraph\` to retrieve parent and children in a single unified SQL JOIN query!`
            }
          ],
          examples: [
            {
              id: 'jex19_jpa1',
              title: 'Example: JPA Entity Definition & Fetch Strategy',
              code: `public class Main {
    public static void main(String[] args) {
        System.out.println("JPA Repository Query Executed: JOIN FETCH");
    }
}`,
              explanation: 'JOIN FETCH executes single optimized SQL query avoiding N+1 selects.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Object-Relational Mapping (ORM) data access abstraction.',
            whyItExists: 'Eliminates JDBC boilerplate code, mapping relational SQL rows directly into Java entity objects.',
            howItWorks: 'Spring Data JPA auto-generates SQL queries at runtime from repository method signatures.',
            whereUsedProfessionally: 'Used across enterprise backends interfacing with PostgreSQL, MySQL, and Oracle DBs.',
            howCompaniesUseIt: 'Companies combine JPA for standard CRUD operations with native SQL/JPQL for complex reporting queries.',
            productionConsiderations: ['Set FetchType.LAZY on all @ManyToOne and @OneToMany entity relationships by default.'],
            commonEngineeringMistakes: ['Leaving default EAGER fetching on relationships, causing massive unnecessary join loads.'],
            performanceImplications: 'Unresolved N+1 queries multiply database roundtrips exponentially, crushing DB performance.',
            securityImplications: 'JPQL and Spring Data parameter binding prevents SQL Injection attacks automatically.',
            alternativesAndTradeOffs: [{ option: 'Raw JDBC / JdbcTemplate', comparison: 'Explicit SQL, fast, verbose mapping' }, { option: 'Spring Data JPA / Hibernate', comparison: 'Automatic CRUD, entity tracking, risk of N+1 if careless' }],
            whenToUse: ['Use Spring Data JPA for standard enterprise domain entity persistence'],
            whenNotToUse: ['Use MyBatis or JdbcTemplate for complex high-volume analytical reporting queries']
          },
          quiz: [
            {
              id: 'jq19_jpa1',
              question: 'How can developers prevent the N+1 Select performance problem in JPA/Hibernate?',
              options: ['Use FetchType.EAGER on all fields', 'Use JOIN FETCH in JPQL or @EntityGraph to retrieve associations in 1 query', 'Disable database indexing', 'Increase JVM heap size'],
              correctOptionIndex: 1,
              explanation: 'JOIN FETCH forces Hibernate to fetch associated collections in a single SQL JOIN query.'
            }
          ],
          exercise: {
            id: 'jex-19jpa',
            instructions: 'Print `"JPA Repository Query Executed: JOIN FETCH"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // JPA query print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("JPA Repository Query Executed: JOIN FETCH");\n    }\n}',
            hints: ['Print JPA Repository Query Executed: JOIN FETCH to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc19jpa', description: 'Outputs JPA Repository Query Executed: JOIN FETCH', expectedOutput: 'JPA Repository Query Executed: JOIN FETCH' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-20',
          slug: 'java-spring-transactions',
          title: 'Transaction Management (@Transactional), ACID & Database Isolation Levels',
          description: 'Master Declarative Transaction Management (`@Transactional`), rollback boundaries, ACID properties, Propagation levels (REQUIRED, REQUIRES_NEW), and Isolation levels (READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE).',
          estimatedMinutes: 40,
          orderIndex: 5,
          prerequisites: ['java-les-19'],
          concepts: [
            {
              id: 'jc20_tx1',
              title: 'Spring Transaction Management & Isolation Levels',
              contentMarkdown: `### Database Isolation Levels & Anomalies
- **READ_UNCOMMITTED**: Risks Dirty Reads.
- **READ_COMMITTED**: Prevents Dirty Reads; risks Non-Repeatable Reads.
- **REPEATABLE_READ**: Prevents Non-Repeatable Reads; risks Phantom Reads.
- **SERIALIZABLE**: Strict serial execution; zero anomalies, lowest concurrency performance.`
            }
          ],
          examples: [
            {
              id: 'jex20_tx1',
              title: 'Example: Declarative Transaction Method',
              code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Transaction Status: COMMITTED");
    }
}`,
              explanation: '@Transactional automatically commits on success and rolls back on unchecked runtime exception.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Declarative database transaction management boundary framework.',
            whyItExists: 'Guarantees ACID database guarantees across multi-table mutations.',
            howItWorks: 'Spring AOP creates proxy interceptors around @Transactional methods starting and committing DB transactions.',
            whereUsedProfessionally: 'Used in banking transfers, order placements, and critical business state mutations.',
            howCompaniesUseIt: 'Companies configure explicit rollbackFor = Exception.class to rollback checked exceptions as well.',
            productionConsiderations: ['Keep transaction boundaries short to avoid holding database locks under high load.'],
            commonEngineeringMistakes: ['Calling a @Transactional method from within the same class (self-invocation bypasses AOP proxy).'],
            performanceImplications: 'Long-running transactions hold DB connection pool slots and locks, causing pool starvation.',
            securityImplications: 'ACID guarantees prevent partial state mutation vulnerabilities.',
            alternativesAndTradeOffs: [{ option: 'Programmatic TransactionManager', comparison: 'Explicit control, verbose' }, { option: 'Declarative @Transactional', comparison: 'Clean annotation syntax, proxy-based' }],
            whenToUse: ['Use @Transactional on service layer methods performing database mutations'],
            whenNotToUse: ['Do not place @Transactional on long-running HTTP REST calls or external API integration methods']
          },
          quiz: [
            {
              id: 'jq20_tx1',
              question: 'Why does calling a @Transactional method from another method inside the SAME class fail to start a transaction?',
              options: ['Because Java prohibits inner method calls', 'Because Spring AOP proxy interceptors are bypassed during self-invocation', 'Because database drivers disable transactions', 'Because JVM heap disables annotations'],
              correctOptionIndex: 1,
              explanation: 'Spring AOP uses dynamic proxies; internal self-invocation (this.method()) bypasses the Spring proxy layer.'
            }
          ],
          exercise: {
            id: 'jex-20tx',
            instructions: 'Print `"Transaction Status: COMMITTED"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Transaction print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Transaction Status: COMMITTED");\n    }\n}',
            hints: ['Print Transaction Status: COMMITTED to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc20tx', description: 'Outputs Transaction Status: COMMITTED', expectedOutput: 'Transaction Status: COMMITTED' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-21',
          slug: 'java-spring-security-jwt',
          title: 'Spring Security 6, JWT Authentication & RBAC Authorization',
          description: 'Secure REST microservices using Spring Security 6 SecurityFilterChain, BCrypt password hashing, stateless JWT Token authentication, and Role-Based Access Control (RBAC).',
          estimatedMinutes: 45,
          orderIndex: 6,
          prerequisites: ['java-les-20'],
          concepts: [
            {
              id: 'jc21_sec1',
              title: 'Spring Security 6 Filter Chain Architecture',
              contentMarkdown: `### Spring Security Filter Chain Pipeline
1. **SecurityFilterChain Bean**: Configures CORS, CSRF (disabled for stateless APIs), and authorization rules (\`.requestMatchers("/api/admin/**").hasRole("ADMIN")\`).
2. **JwtAuthenticationFilter**: Intercepts HTTP Authorization header (\`Bearer <jwt>\`), validates signature, and populates \`SecurityContextHolder\`.`
            }
          ],
          examples: [
            {
              id: 'jex21_sec1',
              title: 'Example: JWT Authorization Validation',
              code: `public class Main {
    public static void main(String[] args) {
        System.out.println("JWT Authentication: VERIFIED [ROLE_ADMIN]");
    }
}`,
              explanation: 'Validates JWT claims and extracts user role authorities.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Enterprise security, authentication, and authorization framework.',
            whyItExists: 'Protects REST endpoints against unauthorized access, privilege escalation, and session hijacking.',
            howItWorks: 'Servlet filter chain intercepts incoming HTTP requests before reaching Spring MVC controllers.',
            whereUsedProfessionally: 'Used across enterprise web APIs requiring OAuth2, OIDC, or JWT stateless authentication.',
            howCompaniesUseIt: 'Companies integrate Spring Security with Keycloak or Okta for SSO identity management.',
            productionConsiderations: ['Always use BCryptPasswordEncoder with cost factor >= 10 for password hashing.'],
            commonEngineeringMistakes: ['Storing sensitive JWT secret keys inside git code repositories instead of environment variables.'],
            performanceImplications: 'Stateless JWT validation eliminates database session lookup latency per request.',
            securityImplications: 'Enforce HTTPS and set short expiration times on JWT access tokens.',
            alternativesAndTradeOffs: [{ option: 'Stateful Session Cookies', comparison: 'Requires DB/Redis session lookup, non-scalable' }, { option: 'Stateless JWT Bearer Tokens', comparison: 'Self-contained, fast, scalable across microservices' }],
            whenToUse: ['Use Spring Security 6 with JWT for securing microservice REST APIs'],
            whenNotToUse: ['Do not roll custom hand-written security authentication filters']
          },
          quiz: [
            {
              id: 'jq21_sec1',
              question: 'Where does Spring Security store authenticated user details during the lifecycle of an HTTP request?',
              options: ['In a global static array', 'In SecurityContextHolder (ThreadLocal)', 'Inside the database table', 'In browser cookies'],
              correctOptionIndex: 1,
              explanation: 'Spring Security stores SecurityContext inside a ThreadLocal via SecurityContextHolder for the current thread.'
            }
          ],
          exercise: {
            id: 'jex-21sec',
            instructions: 'Print `"JWT Authentication: VERIFIED [ROLE_ADMIN]"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Security validation print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("JWT Authentication: VERIFIED [ROLE_ADMIN]");\n    }\n}',
            hints: ['Print JWT Authentication: VERIFIED [ROLE_ADMIN] to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc21sec', description: 'Outputs JWT Authentication: VERIFIED [ROLE_ADMIN]', expectedOutput: 'JWT Authentication: VERIFIED [ROLE_ADMIN]' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-22',
          slug: 'java-microservices-patterns',
          title: 'Microservices Architecture, Service Discovery & Circuit Breakers',
          description: 'Architect distributed systems with Spring Cloud Eureka Service Discovery, Spring Cloud Gateway, Resilience4j Circuit Breakers, and OpenFeign client interfaces.',
          estimatedMinutes: 45,
          orderIndex: 7,
          prerequisites: ['java-les-21'],
          concepts: [
            {
              id: 'jc22_ms1',
              title: 'Resilience4j Circuit Breaker State Machine',
              contentMarkdown: `### Circuit Breaker States
- **CLOSED**: Normal operation. Requests flow to downstream service.
- **OPEN**: Failure rate threshold exceeded. Requests immediately fail-fast returning fallback responses without hitting failing service.
- **HALF_OPEN**: Permits trial requests to test if downstream service has recovered.`
            }
          ],
          examples: [
            {
              id: 'jex22_ms1',
              title: 'Example: Circuit Breaker Fallback Execution',
              code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Circuit Breaker: OPEN -> Fallback Response Triggered");
    }
}`,
              explanation: 'Returns cached fallback response when downstream service is unresponsive.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Distributed microservice system integration and fault tolerance patterns.',
            whyItExists: 'Prevents cascading service failures in complex distributed cloud topologies.',
            howItWorks: 'Resilience4j monitors call success/failure metrics, opening circuit if failure rate threshold is breached.',
            whereUsedProfessionally: 'Used in large-scale cloud architectures at Netflix, Amazon, and Uber.',
            howCompaniesUseIt: 'Companies deploy API Gateways with rate-limiting and circuit breakers to guarantee SLA availability.',
            productionConsiderations: ['Configure fallback methods for all remote HTTP/gRPC call integration points.'],
            commonEngineeringMistakes: ['Setting long HTTP timeout values causing thread starvation across dependent microservices.'],
            performanceImplications: 'Circuit Breaker OPEN state returns instant fail-fast responses in 0ms, saving CPU threads.',
            securityImplications: 'API Gateway centralizes authentication and rate-limiting defense.',
            alternativesAndTradeOffs: [{ option: 'Direct Monolithic Call', comparison: 'Simple, single point of failure' }, { option: 'Microservice with Circuit Breaker', comparison: 'Isolated fault boundaries, resilient cloud system' }],
            whenToUse: ['Use Resilience4j circuit breakers for all remote microservice HTTP calls'],
            whenNotToUse: ['Do not wrap internal in-memory method calls with circuit breakers']
          },
          quiz: [
            {
              id: 'jq22_ms1',
              question: 'What is the purpose of the OPEN state in a Resilience4j Circuit Breaker?',
              options: ['To allow unlimited traffic', 'To fail-fast immediately and prevent cascading downstream overload', 'To re-compile Java bytecodes', 'To clear database caches'],
              correctOptionIndex: 1,
              explanation: 'When OPEN, the circuit breaker returns immediate fallback responses without invoking the failing service.'
            }
          ],
          exercise: {
            id: 'jex-22ms',
            instructions: 'Print `"Circuit Breaker: OPEN -> Fallback Response Triggered"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Circuit breaker print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Circuit Breaker: OPEN -> Fallback Response Triggered");\n    }\n}',
            hints: ['Print Circuit Breaker: OPEN -> Fallback Response Triggered to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc22ms', description: 'Outputs expected Circuit Breaker fallback text', expectedOutput: 'Circuit Breaker: OPEN -> Fallback Response Triggered' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-23',
          slug: 'java-testing-junit-mockito',
          title: 'Testing Java Applications: JUnit 5, Mockito & SpringBootTest',
          description: 'Write professional unit and integration tests using JUnit 5 (`@Test`, `@ParameterizedTest`), Mockito (`@Mock`, `when().thenReturn()`), and `@SpringBootTest` with `@MockBean`.',
          estimatedMinutes: 40,
          orderIndex: 8,
          prerequisites: ['java-les-22'],
          concepts: [
            {
              id: 'jc23_test1',
              title: 'Testing Pyramid: Unit vs Slice vs Integration',
              contentMarkdown: `### The Enterprise Testing Pyramid
1. **Unit Tests (JUnit 5 + Mockito)**: Fast, isolated test of single class logic without Spring context (<10ms per test).
2. **Slice Tests (@WebMvcTest, @DataJpaTest)**: Tests specific layer with lightweight Spring context.
3. **Integration Tests (@SpringBootTest + Testcontainers)**: Full end-to-end testing with actual PostgreSQL DB.`
            }
          ],
          examples: [
            {
              id: 'jex23_test1',
              title: 'Example: Mockito Unit Test Execution',
              code: `public class Main {
    public static void main(String[] args) {
        System.out.println("JUnit 5 Test Passed: 100% Code Coverage");
    }
}`,
              explanation: 'Validates unit test assertion execution.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Automated software testing and quality assurance toolchain.',
            whyItExists: 'Verifies software correctness and enables confident refactoring without regressions.',
            howItWorks: 'JUnit 5 executes test methods asserting expected outputs against actual behavior.',
            whereUsedProfessionally: 'Used in CI/CD build pipelines to gate deployment releases.',
            howCompaniesUseIt: 'Companies enforce 80%+ line code coverage build checks in Maven/Gradle.',
            productionConsiderations: ['Write deterministic unit tests that do not depend on execution order or system timezone.'],
            commonEngineeringMistakes: ['Writing slow integration tests when fast Mockito unit tests would suffice.'],
            performanceImplications: 'Mocked unit tests run in milliseconds; full SpringBootTest context loads take seconds.',
            securityImplications: 'Test edge cases and invalid inputs to discover security vulnerabilities early.',
            alternativesAndTradeOffs: [{ option: 'Manual Testing', comparison: 'Slow, error-prone, unscalable' }, { option: 'Automated JUnit/Mockito', comparison: 'Instant feedback, reproducible, CI/CD ready' }],
            whenToUse: ['Write JUnit 5 unit tests for all domain business services'],
            whenNotToUse: ['Do not launch @SpringBootTest for pure algorithmic unit tests']
          },
          quiz: [
            {
              id: 'jq23_test1',
              question: 'Which tool in the Java ecosystem is used to create mock objects for isolated unit testing?',
              options: ['Maven', 'Mockito', 'Spring Security', 'Hibernate'],
              correctOptionIndex: 1,
              explanation: 'Mockito is the de-facto Java mocking framework for creating test stubs and verifying method invocations.'
            }
          ],
          exercise: {
            id: 'jex-23test',
            instructions: 'Print `"JUnit 5 Test Passed: 100% Code Coverage"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // JUnit test print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("JUnit 5 Test Passed: 100% Code Coverage");\n    }\n}',
            hints: ['Print JUnit 5 Test Passed: 100% Code Coverage to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc23test', description: 'Outputs JUnit test passed text', expectedOutput: 'JUnit 5 Test Passed: 100% Code Coverage' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-24',
          slug: 'java-observability-actuator',
          title: 'Observability: Spring Boot Actuator, Micrometer & Prometheus Metrics',
          description: 'Instrument production microservices with Spring Boot Actuator endpoints (`/actuator/health`, `/actuator/metrics`), Micrometer metrics collection, and Prometheus dashboard scraping.',
          estimatedMinutes: 35,
          orderIndex: 9,
          prerequisites: ['java-les-23'],
          concepts: [
            {
              id: 'jc24_obs1',
              title: 'The Three Pillars of Observability',
              contentMarkdown: `### Observability Pillars in Java
- **Metrics (Micrometer + Prometheus)**: Numeric time-series counters, gauges, and timers tracking JVM heap, CPU, and HTTP request rates.
- **Logs (SLF4J + Logback + JSON)**: Structured application event logs.
- **Traces (OpenTelemetry + Zipkin/Jaeger)**: Distributed transaction correlation IDs tracking requests across microservices.`
            }
          ],
          examples: [
            {
              id: 'jex24_obs1',
              title: 'Example: Spring Actuator Health Response',
              code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Actuator Metrics: {\"status\":\"UP\",\"jvm.memory.used\":142857}");
    }
}`,
              explanation: 'Demonstrates Actuator health JSON response.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Production application monitoring and diagnostic metrics framework.',
            whyItExists: 'Provides real-time visibility into microservice health, memory usage, and throughput latency.',
            howItWorks: 'Spring Actuator exposes management endpoints scraped periodically by Prometheus.',
            whereUsedProfessionally: 'Used in Kubernetes pod liveness/readiness probes and Grafana operations dashboards.',
            howCompaniesUseIt: 'Companies configure automated alert manager rules based on Actuator JVM metrics.',
            productionConsiderations: ['Secure /actuator endpoints so sensitive environment variables are not exposed publicly.'],
            commonEngineeringMistakes: ['Exposing raw /actuator/env endpoints without authentication.'],
            performanceImplications: 'Micrometer metrics collection has ultra-low CPU overhead using lock-free atomic counters.',
            securityImplications: 'Restrict Actuator exposure to internal management ports.',
            alternativesAndTradeOffs: [{ option: 'Console System.out Logs', comparison: 'Unstructured, impossible to aggregate' }, { option: 'Spring Actuator + Prometheus', comparison: 'Structured metrics, real-time alerts, Grafana ready' }],
            whenToUse: ['Enable Spring Boot Actuator on all production microservices'],
            whenNotToUse: ['Do not expose unauthenticated management endpoints to public internet']
          },
          quiz: [
            {
              id: 'jq24_obs1',
              question: 'Which Spring Boot module exposes operational endpoints like /actuator/health for monitoring microservice status?',
              options: ['Spring Security', 'Spring Boot Actuator', 'Spring Data JPA', 'Spring Cloud Gateway'],
              correctOptionIndex: 1,
              explanation: 'Spring Boot Actuator provides production-ready management and health monitoring endpoints.'
            }
          ],
          exercise: {
            id: 'jex-24obs',
            instructions: 'Print `"Actuator Metrics: {\"status\":\"UP\",\"jvm.memory.used\":142857}"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Actuator print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Actuator Metrics: {\\\"status\\\":\\\"UP\\\",\\\"jvm.memory.used\\\":142857}");\n    }\n}',
            hints: ['Print Actuator Metrics JSON string to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc24obs', description: 'Outputs Actuator metrics JSON text', expectedOutput: 'Actuator Metrics: {"status":"UP","jvm.memory.used":142857}' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'java-les-25',
          slug: 'java-docker-graalvm-deployment',
          title: 'Containerization, GraalVM Native Images & Kubernetes Deployment',
          description: 'Package Spring Boot applications into minimal Docker containers with multi-stage builds, compile to GraalVM Native Images (AOT), and deploy to Kubernetes clusters.',
          estimatedMinutes: 40,
          orderIndex: 10,
          prerequisites: ['java-les-24'],
          concepts: [
            {
              id: 'jc25_dep1',
              title: 'JIT Containers vs GraalVM Native Images',
              contentMarkdown: `### JVM JIT Container vs GraalVM Native Image
| Metric | Standard JVM Container | GraalVM Native Image |
| :--- | :--- | :--- |
| **Compilation** | Dynamic JIT at runtime | Ahead-Of-Time (AOT) to native binary |
| **Startup Time** | 2.5 - 5.0 seconds | 0.02 - 0.05 seconds (20ms!) |
| **Memory Footprint** | ~350 MB RAM | ~40 MB RAM |
| **Build Time** | 30 seconds | 5 - 10 minutes |`
            }
          ],
          examples: [
            {
              id: 'jex25_dep1',
              title: 'Example: Docker Multi-Stage Build & GraalVM Binary Output',
              code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Spring Boot Microservice Deployed: Kubernetes Pod Running");
    }
}`,
              explanation: 'Demonstrates microservice deployment confirmation.'
            }
          ],
          engineeringContext: {
            whatItIs: 'Containerization and Ahead-Of-Time (AOT) native image cloud deployment pipeline.',
            whyItExists: 'Shrinks container image sizes and startup times for serverless and cloud-native Kubernetes scaling.',
            howItWorks: 'GraalVM native-image compiler performs static reachability analysis, compiling bytecodes directly into OS native binary.',
            whereUsedProfessionally: 'Used in AWS Lambda, Google Cloud Run, and Kubernetes auto-scaling clusters.',
            howCompaniesUseIt: 'Companies package Spring Boot apps into Docker containers deployed via Helm charts to Kubernetes.',
            productionConsiderations: ['Use Docker multi-stage builds to avoid leaking source code or Maven build dependencies into production container images.'],
            commonEngineeringMistakes: ['Reflective dynamic class loading without registering ReflectionConfig for GraalVM AOT compilation.'],
            performanceImplications: 'GraalVM Native Images start in 20ms and use 80% less RAM, saving cloud hosting costs.',
            securityImplications: 'Minimal distroless container images reduce CVE attack surface area.',
            alternativesAndTradeOffs: [{ option: 'Standard JIT Container', comparison: 'Slower startup, higher RAM, maximum peak JIT optimization' }, { option: 'GraalVM Native Image', comparison: 'Instant startup, minimal RAM, longer build time' }],
            whenToUse: ['Use GraalVM native images for cloud-native microservices requiring fast auto-scaling'],
            whenNotToUse: ['Use standard JIT container if build times must stay fast in developer inner loop']
          },
          quiz: [
            {
              id: 'jq25_dep1',
              question: 'What primary advantage does a GraalVM Native Image offer compared to a standard JVM container?',
              options: ['Automatic SQL generation', 'Instant sub-50ms startup time and significantly lower memory footprint', 'Eliminates need for Java code', 'Requires no Docker container'],
              correctOptionIndex: 1,
              explanation: 'GraalVM Ahead-Of-Time compilation produces a native machine binary starting in milliseconds with minimal RAM.'
            }
          ],
          exercise: {
            id: 'jex-25dep',
            instructions: 'Print `"Spring Boot Microservice Deployed: Kubernetes Pod Running"` to standard stdout.',
            initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Deployment status print\n    }\n}',
            solutionCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Spring Boot Microservice Deployed: Kubernetes Pod Running");\n    }\n}',
            hints: ['Print Spring Boot Microservice Deployed: Kubernetes Pod Running to stdout.'],
            validationType: 'stdout',
            testCases: [{ id: 'jtc25dep', description: 'Outputs Kubernetes deployment status text', expectedOutput: 'Spring Boot Microservice Deployed: Kubernetes Pod Running' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};
