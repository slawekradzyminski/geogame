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

## Test Patterns and Examples

### Component Test Structure
```typescript
describe('ComponentName', () => {
  // Mock setup
  const mockProps = {
    prop1: 'value1',
    prop2: 'value2'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    // given
    const props = { ...mockProps };

    // when
    render(<Component {...props} />);

    // then
    expect(screen.getByTestId('component')).toBeInTheDocument();
  });
});
```

### Quiz Component Test Pattern
```typescript
describe('QuizComponent', () => {
  const mockQuestion = {
    id: '1',
    nameEN: 'Country',
    namePL: 'Kraj',
    optionsEN: ['Option1', 'Option2', 'Option3', 'Option4'],
    optionsPL: ['Opcja1', 'Opcja2', 'Opcja3', 'Opcja4'],
    correctAnswerEN: 'Option1',
    correctAnswerPL: 'Opcja1'
  };

  beforeEach(() => {
    // given
    jest.useFakeTimers();
    (useQuizContext as jest.Mock).mockReturnValue({
      state: {
        currentQuestionNumber: 1,
        isFinished: false
      },
      question: mockQuestion,
      submitAnswer: jest.fn()
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Success cases (200)
  it('should render question with all options', () => {
    // when
    render(<QuizComponent />);

    // then
    expect(screen.getByTestId('quiz-question')).toBeInTheDocument();
    expect(screen.getByTestId('question-number')).toHaveTextContent('1/10');
    mockQuestion.optionsEN.forEach((_, index) => {
      expect(screen.getByTestId(`answer-option-${index}`)).toBeInTheDocument();
    });
  });

  it('should handle correct answer selection', () => {
    // when
    render(<QuizComponent />);
    fireEvent.click(screen.getByTestId('answer-option-0'));

    // then
    expect(screen.getByTestId('answer-option-0')).toHaveClass('correct');
  });

  // Error cases (400, 404, etc.)
  it('should show loading state when question is not available', () => {
    // given
    (useQuizContext as jest.Mock).mockReturnValue({
      state: { currentQuestionNumber: 1 },
      question: null
    });

    // when
    render(<QuizComponent />);

    // then
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });
});
```

### Context Provider Test Pattern
```typescript
describe('QuizProvider', () => {
  it('should initialize with default state', () => {
    // when
    const { result } = renderHook(() => useQuizContext(), {
      wrapper: QuizProvider
    });

    // then
    expect(result.current.state).toEqual({
      currentQuestionNumber: 1,
      score: 0,
      isFinished: false,
      answers: []
    });
  });

  it('should update state on answer submission', () => {
    // given
    const { result } = renderHook(() => useQuizContext(), {
      wrapper: QuizProvider
    });

    // when
    act(() => {
      result.current.submitAnswer('test-answer');
    });

    // then
    expect(result.current.state.answers).toHaveLength(1);
  });
});
```

### Hook Test Pattern
```typescript
describe('useQuizHook', () => {
  it('should return initial state', () => {
    // when
    const { result } = renderHook(() => useQuizHook());

    // then
    expect(result.current.state).toBeDefined();
  });

  it('should handle state updates', async () => {
    // given
    const { result } = renderHook(() => useQuizHook());

    // when
    await act(async () => {
      await result.current.updateState();
    });

    // then
    expect(result.current.state).toBeUpdated();
  });
});
```

### Common Test Scenarios
1. Component Rendering
2. User Interactions
3. State Updates
4. Error States
5. Loading States
6. Internationalization
7. Accessibility
8. Edge Cases

### Best Practices
1. Use meaningful test descriptions
2. Follow given/when/then pattern
3. Test both success and error cases
4. Mock external dependencies
5. Clean up after each test
6. Use proper assertions
7. Keep tests focused and isolated
8. Test user interactions thoroughly
9. Include edge cases
10. Maintain test data fixtures 