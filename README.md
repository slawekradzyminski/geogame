# Geography Quiz Application

An interactive quiz application to test your knowledge of world geography, including capitals, flags, and languages.

## Project Structure

- `/src` - Source code
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
# or for more detailed output
npx playwright test --reporter=list
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
- E2E tests are written using Playwright
- Tests follow the given/when/then pattern
- Run tests with detailed output:
  ```bash
  npx playwright test --reporter=list
  ```
- Test files are located in `/tests` directory
- Each test file follows the pattern: `*.spec.ts`

### Internationalization
- Translation files are in `/public/locales/{lang}/`
- Separate files for different namespaces (common.json, quiz.json)
- Use `useTranslation` hook from react-i18next for translations

### Code Style
- TypeScript with strict mode
- Modern React patterns (hooks, functional components)
- Material UI for components
- Tests provided as comments with given/when/then structure

### AI Tips
- The main branch is kept stable with frequent commits
- Test failures related to git commands (like `git --no-pager diff`) are often due to line ending issues or formatting differences
- Always read the test output carefully to identify the root cause of failures
