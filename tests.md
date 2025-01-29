# Testing Guide

## Overview
The project uses Jest for unit tests and Playwright for E2E tests.

## Unit Tests
- Located in `src/**/*.test.tsx`
- Test individual components, hooks, and utilities
- Follow given/when/then pattern in comments

### Running Unit Tests
```bash
# Run all unit tests
npm run test:unit

# Run single test file
npx jest path/to/test.test.tsx

# Run tests in watch mode
npm run test:unit -- --watch
```

## E2E Tests
- Located in `tests/*.spec.ts`
- Test full user flows and integration
- Use Playwright for browser automation
- Support chromium
- Follow given/when/then pattern in comments

### Running E2E Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run single test file
npx playwright test tests/specific-test.spec.ts

# Run with UI
npx playwright test --ui
```

## Test Utilities
- `src/test-utils/test-utils.tsx`: Custom render function with providers
- `src/test-utils/TestProviders.tsx`: Wrapper with theme, i18n, and other providers

## For AI Agents
- Use `codebase_search` to find test files
- Check test patterns in similar components
- Ensure new tests follow the given/when/then pattern
- Remember to wrap async state updates in `act()`
- Add data-testid for testable elements 