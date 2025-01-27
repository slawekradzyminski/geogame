# Testing Strategy

## Current Approach

### Unit Tests (Jest + React Testing Library)
Currently implemented tests:
- `src/context/capital/CapitalQuizProvider.test.tsx`
  - Tests quiz state management
  - Verifies score updates
  - Checks question progression
  - Tests quiz completion
  - Validates reset functionality

- `src/context/flag/FlagQuizProvider.test.tsx`
  - Similar coverage as CapitalQuizProvider
  - Tests flag-specific quiz logic

- `src/context/capital/capitalQuestionGenerator.test.ts`
  - Tests question generation logic
  - Validates translations
  - Checks distractor generation
  - Tests edge cases with limited data

- `src/context/flag/flagQuestionGenerator.test.ts`
  - Tests flag question generation
  - Validates flag URL handling
  - Checks answer options generation

### E2E Tests (Playwright)
Located in `/tests` directory:
- `CapitalQuiz.spec.ts`
  - Full quiz flow testing
  - Language switching during quiz
  - Answer feedback verification
  - Quiz completion and summary
  - Map interaction verification

- `FlagQuiz.spec.ts`
  - Complete quiz flow
  - Flag display verification
  - Answer selection
  - Quiz reset functionality

## Improvement Plan

### High Priority Tests to Add

1. Custom Hooks Tests
```typescript
// src/hooks/useCountries.test.ts
- Test data loading
- Test error handling
- Test caching behavior
- Test language switching

// src/hooks/useCities.test.ts
- Test city data loading
- Test error states
- Test data format validation
```

2. Quiz Component Tests
```typescript
// src/components/Quiz/capital/CapitalQuizQuestion.test.tsx
- Test answer selection
- Test feedback display
- Test timer functionality
- Test accessibility
- Test map interaction

// src/components/Quiz/flag/FlagQuizQuestion.test.tsx
- Test flag loading
- Test answer selection
- Test feedback states
- Test accessibility
```

3. Shared Components
```typescript
// src/components/LanguageSwitcher.test.tsx
- Test language selection
- Test persistence
- Test UI states
- Test keyboard navigation

// src/components/Quiz/CountryMap.test.tsx
- Test map rendering
- Test country highlighting
- Test marker placement
- Test view switching
- Test continent labels
```

### Medium Priority Tests

1. Summary Components
```typescript
// src/components/Quiz/capital/CapitalQuizSummary.test.tsx
// src/components/Quiz/flag/FlagQuizSummary.test.tsx
- Test score calculation
- Test answer review
- Test restart functionality
- Test translation display
```

2. Page Components
```typescript
// src/pages/Home.test.tsx
- Test navigation
- Test quiz type selection
- Test responsive layout
- Test accessibility
```

### Testing Guidelines

1. File Organization
```
src/
└── components/
    └── ComponentName/
        ├── ComponentName.tsx
        ├── ComponentName.test.tsx
        └── ComponentName.css
```

2. Test Structure
```typescript
describe('ComponentName', () => {
  // given
  beforeEach(() => {
    // setup
  });

  it('should handle primary functionality', () => {
    // given
    const setup = ...

    // when
    userEvent.action...

    // then
    expect...
  });
});
```

3. Testing Principles
- Test behavior, not implementation
- Use meaningful test descriptions
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test edge cases and error states
- Ensure accessibility compliance
- Use real data from JSON files when possible

4. Coverage Goals
- Line coverage: >80%
- Branch coverage: >75%
- Function coverage: >90%
- Statement coverage: >80%

### Tools and Setup

1. Jest Configuration
```json
{
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["@testing-library/jest-dom"],
  "moduleNameMapper": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
}
```

2. Testing Library Setup
```typescript
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

3. Common Test Utilities
```typescript
// src/test-utils/test-utils.tsx
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Implementation Timeline

1. Week 1: High Priority Tests
- Custom hooks tests
- Core quiz component tests
- Shared component tests

2. Week 2: Medium Priority Tests
- Summary component tests
- Page component tests
- Test utilities and helpers

3. Week 3: Coverage and Refinement
- Add missing test cases
- Improve error testing
- Enhance accessibility testing
- Documentation updates 