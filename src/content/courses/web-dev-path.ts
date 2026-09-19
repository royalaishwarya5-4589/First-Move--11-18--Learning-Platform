import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const webDevPath: Path = {
  id: 'html-css-mastery',
  slug: 'html-css',
  title: 'HTML5 & Modern CSS Layout Systems',
  subtitle: 'Master semantic HTML markup, web accessibility (a11y), modern Flexbox & Grid layouts, and responsive UI design.',
  description: 'Learn modern web structural design with semantic HTML5 tags, form validation, accessible DOM structure, CSS Box Model, Flexbox, Grid, CSS Variables, and responsive animations.',
  icon: '🎨',
  category: 'web',
  categoryLabel: 'Web Development',
  isActive: true,
  status: 'active',
  courseType: 'conceptual',
  difficulty: 'beginner',
  estimatedHours: 35,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['html-css'],
  projects: [
    {
      id: 'web-proj-1',
      slug: 'responsive-portfolio-website',
      title: 'Responsive Developer Portfolio Website',
      subtitle: 'Build a responsive personal developer portfolio using semantic HTML5, CSS Flexbox, and CSS Grid.',
      description: 'Design and code a mobile-first developer portfolio page featuring hero banner section, project showcases grid, accessible contact form, and smooth dark theme toggle.',
      difficulty: 'beginner',
      estimatedHours: 5,
      skillsLearned: ['Semantic HTML5 Markup', 'CSS Flexbox Layout', 'CSS Grid System', 'Responsive Media Queries'],
      prerequisites: ['HTML5 & CSS Basics'],
      learningObjectives: ['Structure accessible DOM document outline.', 'Apply mobile-first responsive breakpoints.'],
      starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head><title>Portfolio</title></head>\n<body><h1>My Portfolio</h1></body>\n</html>`,
      projectInstructionsMarkdown: '### Project Overview\nBuild a responsive portfolio website using semantic HTML5 and modern CSS.',
      milestones: [
        { id: 'wm1', title: 'Milestone 1: Semantic Structure & Navigation', description: 'Create semantic header, main, section, and footer containers.', orderIndex: 1 },
        { id: 'wm2', title: 'Milestone 2: Flexbox & Grid CSS Styling', description: 'Style project cards using CSS Grid and navigation bar using Flexbox.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify mobile responsive layout rendering, semantic HTML validation, and form accessibility.',
      pathSlug: 'html-css'
    },
    {
      id: 'web-proj-2',
      slug: 'modern-css-dashboard-ui',
      title: 'Modern CSS Glassmorphism Dashboard UI',
      subtitle: 'Build a complex admin dashboard layout using modern CSS variables, Grid areas, dynamic themes, and micro-animations.',
      description: 'Engineer a modern web dashboard interface featuring CSS grid-template-areas, custom properties, glassmorphism visual effects, and CSS transition animations.',
      difficulty: 'intermediate',
      estimatedHours: 6,
      skillsLearned: ['CSS Grid Template Areas', 'CSS Custom Properties (Variables)', 'Keyframe Animations', 'CSS Glassmorphism UI'],
      prerequisites: ['CSS Grid & Flexbox'],
      learningObjectives: ['Design complex multi-pane layouts using grid-template-areas.', 'Implement CSS custom properties for dynamic theme switching.'],
      starterCode: `:root {\n  --primary-color: #3b82f6;\n}\n.dashboard {\n  display: grid;\n}`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer a modern CSS dashboard layout with CSS Grid areas and CSS Variables.',
      milestones: [
        { id: 'wm3', title: 'Milestone 1: Dashboard Grid Architecture', description: 'Define sidebar, header, stats cards, and main content grid template areas.', orderIndex: 1 },
        { id: 'wm4', title: 'Milestone 2: Theme Variables & Animations', description: 'Implement dark/light mode CSS custom properties and hover transitions.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass all CSS Grid layout tests, theme variable switches, and responsive design checks.',
      pathSlug: 'html-css'
    }
  ],
  modules: [
    {
      id: 'web-mod-1',
      slug: 'html5-foundations',
      title: 'Level 1: HTML5 Semantics, Accessibility & Forms',
      description: 'Master structural HTML5 tags, document tree hierarchy, web accessibility (a11y) ARIA attributes, and form validation.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'web-les-1',
          slug: 'html5-semantic-elements',
          title: 'Semantic HTML5 Elements & Accessible Document Architecture',
          description: 'Structure web documents cleanly using <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> tags.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'wc1_1',
              title: 'Learning Objectives & Semantic Web Markup',
              contentMarkdown: `### Learning Objectives
- Differentiate between generic container tags (\`<div>\`, \`<span>\`) and semantic HTML5 structural elements.
- Construct accessible HTML document outlines for screen readers and web search engines (SEO).
- Implement ARIA attributes (\`aria-label\`, \`role\`) to enhance web accessibility (a11y).
- Create accessible form controls with explicit \`<label for="...">\` binding.

---

### Why Semantic HTML Matters
Prior to HTML5, developers relied almost exclusively on unsemantic \`<div id="header">\` and \`<div class="nav">\` elements. Semantic HTML tags clearly describe their meaning to both the browser and developer, providing critical structural context for screen readers and search crawler indexing.`
            },
            {
              id: 'wc1_2',
              title: 'HTML5 Structural Tag Reference Matrix',
              contentMarkdown: `### HTML5 Landmark Elements
| Element | Purpose | Accessibility Role |
| :--- | :--- | :--- |
| \`<header>\` | Page banner or section intro containing branding/nav | \`banner\` |
| \`<nav>\` | Major navigational link group | \`navigation\` |
| \`<main>\` | Central unique document content (only ONE per page) | \`main\` |
| \`<article>\` | Self-contained, independently distributable content unit | \`article\` |
| \`<section>\` | Standalone thematic grouping of content with heading | \`region\` |
| \`<aside>\` | Content indirectly related to surrounding content | \`complementary\` |
| \`<footer>\` | Copyright, author info, or footer links | \`contentinfo\` |`
            }
          ],
          examples: [
            {
              id: 'wex1_1',
              title: 'Example 1: Semantic Document Outline',
              code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>First Move (11~18) Article</title>
</head>
<body>
    <header>
        <nav aria-label="Main Navigation">
            <a href="/">Home</a>
            <a href="/courses">Courses</a>
        </nav>
    </header>
    <main>
        <article>
            <h1>Understanding Semantic HTML5</h1>
            <p>Semantic tags improve accessibility and SEO.</p>
        </article>
    </main>
    <footer>
        <p>&copy; 2026 First Move (11~18) Inc.</p>
    </footer>
</body>
</html>`,
              explanation: 'Uses semantic header, nav, main, article, and footer tags with accessible ARIA labels.'
            }
          ],
          quiz: [
            {
              id: 'wq1_1',
              question: 'Which semantic element represents the central unique content of a document (must appear only once per page)?',
              options: ['<main>', '<div>', '<article>', '<section>'],
              correctOptionIndex: 0,
              explanation: 'The <main> tag encloses the dominant, unique content of an HTML document.'
            }
          ],
          exercise: {
            id: 'wex-1',
            instructions: 'Write a semantic HTML snippet containing `<main><article><h1>Semantic Page</h1></article></main>` and output it.',
            initialCode: '<!-- Write HTML snippet -->\n',
            solutionCode: '<main><article><h1>Semantic Page</h1></article></main>',
            hints: ['Enclose article inside main tag.'],
            validationType: 'text_match',
            testCases: [{ id: 'wtc1', description: 'Outputs exact semantic markup', expectedOutput: '<main><article><h1>Semantic Page</h1></article></main>' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'web-les-2',
          slug: 'html5-forms-validation',
          title: 'Accessible HTML5 Forms, Inputs & Native Validation',
          description: 'Construct accessible web forms using <input>, <select>, <textarea>, native constraints (required, pattern, min/max), and ARIA helper text.',
          estimatedMinutes: 30,
          orderIndex: 2,
          prerequisites: ['web-les-1'],
          concepts: [
            {
              id: 'wc2_1',
              title: 'Native Form Validation Invariants',
              contentMarkdown: `### HTML5 Input Types & Native Constraints
HTML5 provides native browser-level input validation using input type attributes (\`type="email"\`, \`type="number"\`, \`type="url"\`) alongside validation attributes:
- \`required\`: Prevents form submission if empty.
- \`pattern\`: Enforces regular expression matching.
- \`min\` / \`max\`: Enforces numerical boundary ranges.`
            }
          ],
          examples: [
            {
              id: 'wex2_1',
              title: 'Example 1: Accessible Form Control',
              code: `<form action="/submit" method="POST">
    <div class="form-group">
        <label for="user-email">Email Address:</label>
        <input 
            type="email" 
            id="user-email" 
            name="email" 
            required 
            aria-describedby="email-help"
            placeholder="user@example.com"
        >
        <small id="email-help">We will never share your email.</small>
    </div>
    <button type="submit">Subscribe</button>
</form>`,
              explanation: 'Binding <label for="user-email"> to <input id="user-email"> ensures screen reader accessibility.'
            }
          ],
          quiz: [
            {
              id: 'wq2_1',
              question: 'Which HTML attribute binds a <label> element directly to its target <input> element id?',
              options: ['for', 'name', 'id', 'bind'],
              correctOptionIndex: 0,
              explanation: 'The for attribute on a label links directly to the target input element id.'
            }
          ],
          exercise: {
            id: 'wex-2',
            instructions: 'Write an input element snippet `<input type="email" required>` and match text.',
            initialCode: '<!-- Input element snippet -->\n',
            solutionCode: '<input type="email" required>',
            hints: ['Use <input type="email" required>.'],
            validationType: 'text_match',
            testCases: [{ id: 'wtc2', description: 'Matches input markup', expectedOutput: '<input type="email" required>' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'web-mod-2',
      slug: 'css-layouts-core',
      title: 'Level 2: CSS Box Model, Flexbox & Grid Systems',
      description: 'Master the CSS Box Model (content, padding, border, margin), box-sizing: border-box, Flexbox alignment, and 2D CSS Grid layouts.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'web-les-3',
          slug: 'css-box-model-flexbox',
          title: 'CSS Box Model & 1D Layouts with Flexbox',
          description: 'Understand border-box dimensions, margin collapse, flex-direction, justify-content, align-items, and flex-grow/shrink/basis rules.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['web-les-2'],
          concepts: [
            {
              id: 'wc3_1',
              title: 'The CSS Box Model & Flexbox Mechanics',
              contentMarkdown: `### The CSS Box Model
Every element in CSS is rendered as a rectangular box comprising:
1. **Content**: Text or media.
2. **Padding**: Internal space inside the border.
3. **Border**: Outer line boundary.
4. **Margin**: External space separating adjacent elements.

Using \`box-sizing: border-box\` ensures padding and border widths are included INSIDE total element width.`
            }
          ],
          examples: [
            {
              id: 'wex3_1',
              title: 'Example 1: Flexbox Navigation Bar',
              code: `.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #1e293b;
}

.nav-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
}`,
              explanation: 'justify-content: space-between pushes logo to left and nav links to right edge.'
            }
          ],
          quiz: [
            {
              id: 'wq3_1',
              question: 'Which CSS box-sizing property includes padding and border widths inside total element width?',
              options: ['content-box', 'border-box', 'padding-box', 'margin-box'],
              correctOptionIndex: 1,
              explanation: 'border-box includes padding and border dimensions in the element width.'
            }
          ],
          exercise: {
            id: 'wex-3',
            instructions: 'Write CSS snippet `.box { display: flex; justify-content: space-between; }` and match text.',
            initialCode: '/* CSS snippet */\n',
            solutionCode: '.box { display: flex; justify-content: space-between; }',
            hints: ['Use display: flex and justify-content: space-between.'],
            validationType: 'text_match',
            testCases: [{ id: 'wtc3', description: 'Matches flexbox CSS snippet', expectedOutput: '.box { display: flex; justify-content: space-between; }' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'web-les-4',
          slug: 'css-grid-responsive',
          title: '2D CSS Grid Layouts & Mobile-First Media Queries',
          description: 'Architect complex multi-column layouts using grid-template-columns (repeat, fr, minmax), grid-gap, and responsive CSS media queries.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['web-les-3'],
          concepts: [
            {
              id: 'wc4_1',
              title: '2D Layouts with CSS Grid',
              contentMarkdown: `### CSS Grid vs Flexbox
- **Flexbox**: 1-Dimensional layout system (either rows OR columns).
- **CSS Grid**: 2-Dimensional layout system controlling rows AND columns simultaneously.`
            }
          ],
          examples: [
            {
              id: 'wex4_1',
              title: 'Example 1: Auto-Fit Responsive Card Grid',
              code: `.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}`,
              explanation: 'repeat(auto-fit, minmax(280px, 1fr)) creates responsive cards without writing media queries.'
            }
          ],
          quiz: [
            {
              id: 'wq4_1',
              question: 'Which CSS Grid function creates responsive multi-column layouts without manual media queries?',
              options: ['repeat(auto-fit, minmax(...))', 'flex-wrap: wrap', 'float: left', 'column-count'],
              correctOptionIndex: 0,
              explanation: 'repeat(auto-fit, minmax(min, max)) automatically computes column counts based on available width.'
            }
          ],
          exercise: {
            id: 'wex-4',
            instructions: 'Write CSS grid rule `.grid { display: grid; gap: 1rem; }` and match text.',
            initialCode: '/* CSS Grid Rule */\n',
            solutionCode: '.grid { display: grid; gap: 1rem; }',
            hints: ['Use display: grid and gap: 1rem.'],
            validationType: 'text_match',
            testCases: [{ id: 'wtc4', description: 'Matches grid CSS rule', expectedOutput: '.grid { display: grid; gap: 1rem; }' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'web-mod-3',
      slug: 'css-advanced-design',
      title: 'Level 3: CSS Custom Properties, Animations & Glassmorphism',
      description: 'Implement dynamic dark/light theme switching with CSS Custom Properties (--variables), CSS @keyframes transitions, and modern UI design trends.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'web-les-5',
          slug: 'css-variables-themes',
          title: 'CSS Custom Properties (Variables) & Theme Switching',
          description: 'Declare scoped CSS variables (--primary-bg), implement dark/light theme cascades, and manage design system tokens.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['web-les-4'],
          concepts: [
            {
              id: 'wc5_1',
              title: 'CSS Custom Properties Architecture',
              contentMarkdown: `### CSS Variables Syntax
CSS variables are defined starting with double dashes (\`--color-primary: #3b82f6;\`) inside selector blocks (\`:root\` for global scope) and consumed via \`var(--color-primary)\`.`
            }
          ],
          examples: [
            {
              id: 'wex5_1',
              title: 'Example 1: Global Design Tokens & Dark Theme',
              code: `:root {
    --bg-primary: #ffffff;
    --text-primary: #0f172a;
}

[data-theme="dark"] {
    --bg-primary: #0f172a;
    --text-primary: #f8fafc;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease;
}`,
              explanation: 'Toggling data-theme="dark" attribute instantly updates all var(--bg-primary) values across the document.'
            }
          ],
          quiz: [
            {
              id: 'wq5_1',
              question: 'Which pseudo-class selector is commonly used to declare globally scoped CSS custom properties?',
              options: [':root', ':global', 'body', 'html'],
              correctOptionIndex: 0,
              explanation: 'The :root pseudo-class targets the top-level document node (HTML), scoping global variables.'
            }
          ],
          exercise: {
            id: 'wex-5',
            instructions: 'Write CSS variable rule `:root { --primary: #3b82f6; }` and match text.',
            initialCode: '/* CSS variable */\n',
            solutionCode: ':root { --primary: #3b82f6; }',
            hints: ['Use :root { --primary: #3b82f6; }'],
            validationType: 'text_match',
            testCases: [{ id: 'wtc5', description: 'Matches CSS variable declaration', expectedOutput: ':root { --primary: #3b82f6; }' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'web-les-6',
          slug: 'css-animations-glassmorphism',
          title: 'CSS Transitions, Keyframe Animations & Glassmorphism UI',
          description: 'Construct smooth CSS transform transitions, multi-stage @keyframes animations, and frosted glass visual UI using backdrop-filter.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['web-les-5'],
          concepts: [
            {
              id: 'wc6_1',
              title: 'CSS Micro-Animations & Backdrop Filter',
              contentMarkdown: `### Backdrop Filter & Transitions
Modern UI design uses \`backdrop-filter: blur(12px)\` and semi-transparent RGBA background colors to create high-end frosted glass UI cards.`
            }
          ],
          examples: [
            {
              id: 'wex6_1',
              title: 'Example 1: Glassmorphism Card CSS',
              code: `.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`,
              explanation: 'backdrop-filter applies Gaussian blur effects to element background layers.'
            }
          ],
          quiz: [
            {
              id: 'wq6_1',
              question: 'Which CSS property creates frosted glass blur effects on background content beneath an element?',
              options: ['backdrop-filter', 'filter', 'box-shadow', 'opacity'],
              correctOptionIndex: 0,
              explanation: 'backdrop-filter applies visual filters (such as blur) to the area behind an element.'
            }
          ],
          exercise: {
            id: 'wex-6',
            instructions: 'Write CSS rule `.glass { backdrop-filter: blur(10px); }` and match text.',
            initialCode: '/* Glass rule */\n',
            solutionCode: '.glass { backdrop-filter: blur(10px); }',
            hints: ['Use .glass { backdrop-filter: blur(10px); }'],
            validationType: 'text_match',
            testCases: [{ id: 'wtc6', description: 'Matches glass rule', expectedOutput: '.glass { backdrop-filter: blur(10px); }' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};
