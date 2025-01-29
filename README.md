# Geography Quiz Application

An interactive quiz application to test your knowledge of world geography, including capitals, flags, and languages.

## Features
- ✅ Capital Quiz: Test your knowledge of world capitals
- ✅ Flag Quiz: Identify country flags from around the world
- 🚧 Language Quiz: Coming soon
- Internationalization support (English and Polish)
- Beautiful Material UI design
- Comprehensive test coverage

## Project Structure

- `/src` - Source code
  - `/assets` - Internal assets and resources
  - `/components` - React components
  - `/context` - React context providers
  - `/data` - Data files and constants
  - `/hooks` - Custom React hooks
  - `/i18n` - Internationalization setup
  - `/pages` - Page components
  - `/scripts` - Utility scripts
  - `/theme` - Theme configuration
  - `/types` - TypeScript type definitions
  - `/utils` - Utility functions
  - Unit tests are co-located with implementation in the same directory
- `/public` - Static assets
  - `/flags` - Country flag images
  - `/locales` - Translation files
- `/tests` - E2E tests (Playwright)
- `PLAN.md` - Current project status and implementation plan

## Development

### Prerequisites

- Node.js (v18+)
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
# or for specific test types:
npm run test:unit     # Jest unit tests
npm run test:e2e      # Playwright E2E tests
```

## For AI Agents

### Project Planning
The project plan is maintained in `PLAN.md`. This file contains:
- ✅ Completed tasks
- 🚧 In-progress features
- 📋 Upcoming tasks
- Development timeline
- Project structure

### Testing
- See `tests.md` for detailed testing documentation and guidelines
- Run tests:
  ```bash
  npm run test:unit     # Jest unit tests
  npm run test:e2e      # Playwright E2E tests
  npm test             # Run all tests
  ```

### Internationalization
- Translation files are in `/public/locales/{lang}/`
- Separate files for different namespaces (common.json, quiz.json)
- Use `useTranslation` hook from react-i18next for translations

### Code Style
- TypeScript with strict mode
- Modern React patterns (hooks, functional components)
- Material UI for components
- Tests provided as comments with given/when/then structure
- CSS is kept in separate files next to components (e.g., `Component.tsx` and `Component.css`)
- Arrow functions are preferred over function declarations

### AI Tips
- The main branch is kept stable with frequent commits
- Test failures related to git commands (like `git --no-pager diff`) are often due to line ending issues or formatting differences
- Always read the test output carefully to identify the root cause of failures
- Keep component styles in separate CSS files to improve maintainability
- Use arrow function syntax for component definitions and hooks

### TypeScript Patterns
- Types should be placed in `/types` directory
- Use interfaces for component props (e.g., `interface QuizProps`)
- Use type for complex state objects (e.g., `type QuizState`)
- Prefer union types over enums
- Export types from `index.ts` files

### State Management
- Each quiz type has its own context provider
- Context structure:
  ```typescript
  {
    state: QuizState;        // Current quiz state
    question: QuizQuestion;  // Current question data
    submitAnswer: (answer: string) => void;
    resetQuiz: () => void;
  }
  ```
- Use reducers for complex state management
- State includes: score, current question, answers history

### Component Structure
- Props interface should be defined above component
- Use functional components with hooks
- Co-locate tests and styles
- Follow naming convention:
  ```typescript
  interface ComponentProps {}
  export const Component: React.FC<ComponentProps> = () => {};
  ```

### Testing Patterns
- Use given/when/then comments in tests
- Mock providers in test setup
- Test data should be in separate fixtures
- Test file naming: `Component.test.tsx`
- Order tests by HTTP status code (200, 400, 403, etc.)

### Error Handling
- Use try/catch for async operations
- Display error states in UI
- Log errors appropriately
- Provide user-friendly error messages

### Accessibility
- Use semantic HTML
- Include ARIA labels
- Support keyboard navigation
- Test with screen readers
- Follow WCAG 2.1 guidelines

### Performance
- Lazy load components when possible
- Memoize expensive computations
- Optimize re-renders with useMemo/useCallback
- Use proper key props in lists

### Quiz Implementation Guide
1. Create context provider with state management
2. Implement main quiz component
3. Create question component with answer handling
4. Add summary component for results
5. Include comprehensive tests
6. Add translations
7. Style components consistently

### Common Patterns
- Use Material UI components
- Follow existing styling patterns
- Implement responsive design
- Handle loading states
- Include proper test coverage
