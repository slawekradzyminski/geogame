# Language Quiz Implementation Plan

## Overview
Implementation of a new quiz mode that tests users' knowledge of languages spoken in different countries. The quiz will follow the same patterns as existing Capital and Flag quizzes, maintaining consistency in UI/UX and code structure.

## 1. Types and Interfaces
Location: `/src/types/quiz.ts`

```typescript
interface LanguageQuizQuestion {
  id: string;
  nameEN: string;
  namePL: string;
  optionsEN: string[];
  optionsPL: string[];
  correctAnswersEN: string[];  // Multiple languages possible
  correctAnswersPL: string[];
  flag: string;
  coordinates: [number, number];
}

interface LanguageQuizState {
  currentQuestionNumber: number;
  score: number;
  isFinished: boolean;
  answers: LanguageQuizAnswer[];
}

interface LanguageQuizAnswer {
  questionId: string;
  countryName: string;
  selectedAnswers: string[];
  correctAnswers: string[];
  isCorrect: boolean;
}

interface LanguageQuizContextType {
  state: LanguageQuizState;
  question: LanguageQuizQuestion | null;
  submitAnswer: (answers: string[]) => void;
  resetQuiz: () => void;
}
```

## 2. Context Implementation
Location: `/src/context/language/`

Files to create:
1. `LanguageQuizContext.tsx` - Context definition
2. `LanguageQuizProvider.tsx` - State management and question generation
3. `useLanguageQuiz.ts` - Custom hook for accessing context
4. `languageQuizReducer.ts` - State reducer

Key features:
- Random question generation from countries data
- Multiple correct answers support
- Score calculation considering partial correctness
- State management following existing patterns

## 3. Components
Location: `/src/components/Quiz/language/`

### 3.1 Main Component
File: `LanguageQuiz.tsx`
- Container component
- Language switcher
- Conditional rendering of question/summary

### 3.2 Question Component
File: `LanguageQuizQuestion.tsx`
- Multiple choice selection (checkbox-based)
- Country information display
- Flag display
- Map integration
- Answer submission handling
- Visual feedback for selections

### 3.3 Summary Component
File: `LanguageQuizSummary.tsx`
- Final score display
- Answer review
- Accuracy percentage
- Play again functionality

### 3.4 Styling
Files:
- `LanguageQuiz.css`
- `LanguageQuizQuestion.css`
- `LanguageQuizSummary.css`

Following Material UI and existing quiz styling patterns.

## 4. Tests
Location: Co-located with components

### 4.1 Unit Tests
Files:
- `LanguageQuiz.test.tsx`
- `LanguageQuizQuestion.test.tsx`
- `LanguageQuizSummary.test.tsx`
- `useLanguageQuiz.test.ts`
- `languageQuizReducer.test.ts`

Test scenarios:
1. Component rendering
2. Multiple answer selection
3. Correct/incorrect answer handling
4. Score calculation
5. State management
6. Internationalization
7. Error states
8. Loading states

### 4.2 E2E Tests
File: `/tests/LanguageQuiz.spec.ts`

Test flows:
1. Complete quiz journey
2. Language switching
3. Multiple answer selection
4. Score calculation
5. Play again functionality

## 5. Translations
Location: `/public/locales/`

### 5.1 English (`en/quiz.json`)
```json
{
  "modes": {
    "language": "Guess the Language"
  },
  "questions": {
    "language": "Which languages are spoken in {{country}}?"
  },
  "feedback": {
    "partiallyCorrect": "Partially correct! You found {{found}} out of {{total}} languages."
  }
}
```

### 5.2 Polish (`pl/quiz.json`)
```json
{
  "modes": {
    "language": "Zgadnij język"
  },
  "questions": {
    "language": "Jakie języki są używane w kraju {{country}}?"
  },
  "feedback": {
    "partiallyCorrect": "Częściowo poprawnie! Znalazłeś {{found}} z {{total}} języków."
  }
}
```

## 6. Integration
1. Add route in `App.tsx`
2. Update home page with new quiz option
3. Add quiz mode to navigation
4. Update quiz selection component

## 7. Accessibility
- ARIA labels for multiple selection
- Keyboard navigation support
- Screen reader friendly feedback
- Focus management
- High contrast visual feedback

## 8. Performance Considerations
- Memoize question generation
- Optimize re-renders in multiple selection
- Lazy load components
- Efficient score calculation

## Implementation Order
1. Types and interfaces
2. Context and state management
3. Basic component structure
4. Core functionality
5. Styling and UI polish
6. Tests
7. Translations
8. Integration
9. Accessibility
10. Performance optimization

## Dependencies
- Existing country data with language information
- Material UI components
- React context API
- Testing libraries
- i18next for translations

## Notes
- Support for multiple correct answers is the main difference from other quizzes
- Score calculation needs to handle partial correctness
- UI should clearly indicate multiple selection capability
- Consider adding difficulty levels based on number of languages 