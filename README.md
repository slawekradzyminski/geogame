# Geography Quiz Application

An interactive quiz application to test your knowledge of world geography, including capitals, flags, and languages.

## Project Structure

- `/src` - Source code
  - Unit tests are co-located with implementation in the same directory
- `/public` - Static assets and translations
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
- Unit tests with Jest
  - Co-located with implementation files in the same directory
  - Tests follow given/when/then pattern
  - Focus on business logic and utilities
  - Use real data from JSON files
- E2E tests with Playwright in `/tests`
  - Test full user flows and UI interactions
  - Follow given/when/then pattern
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
