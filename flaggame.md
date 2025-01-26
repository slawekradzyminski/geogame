# Flag Quiz Implementation Plan

## Code Reuse Analysis

### Reusable Components & Logic
1. **Quiz Flow & State Management**
   - Abstract `CapitalQuizProvider` into generic `QuizProvider<T>`
   - Move common state (score, current question, progress) to base implementation
   - Create specific providers for each quiz type extending the base

2. **Common Components**
   - Already have: `Timer`, `Toast`, `ProgressIndicator`
   - Can reuse: `AnswerOptions`, `Summary` with minor adjustments
   - Only need new: `FlagDisplay` component

3. **Utilities**
   - Abstract `capitalQuestionGenerator` into `questionGenerator<T>`
   - Reuse random selection and answer shuffling logic
   - Keep the same test patterns and structure

## Implementation Steps

### 1. Create Base Abstractions
```typescript
// types/quiz.ts
interface BaseQuestion {
  id: string;
  correctAnswer: string;
  options: string[];
}

interface QuizState<T extends BaseQuestion> {
  currentQuestion: T | null;
  score: number;
  questionsAnswered: number;
  totalQuestions: number;
  isComplete: boolean;
}

// New type for flag quiz
interface FlagQuestion extends BaseQuestion {
  flagPath: string;  // Path to flag image in public/flags
  country: string;   // Country name for accessibility
}
```

### 2. Refactor Existing Code
1. Create base quiz context and provider
2. Move capital quiz to new structure
3. Extract common components
4. Update tests to use new abstractions

### 3. Flag Quiz Implementation
1. Create flag-specific components:
   - `FlagDisplay.tsx` - Handles flag image loading and display
   - `FlagQuiz.tsx` - Main quiz component using common components
   
2. Add flag quiz provider:
   ```typescript
   const FlagQuizProvider: React.FC = ({ children }) => {
     return (
       <QuizProvider<FlagQuestion>
         generateQuestions={generateFlagQuestions}
         quizType="flag"
       >
         {children}
       </QuizProvider>
     );
   };
   ```

3. Implement flag-specific logic:
   - Flag question generation
   - Flag loading and error handling
   - Accessibility considerations

### 4. Testing Strategy
1. Reuse test patterns from capital quiz
2. Add flag-specific test cases:
   - Flag loading states
   - Image error handling
   - Accessibility tests

### 5. Internationalization
1. Add flag-specific translations
2. Reuse existing translation structure
3. Add country name translations

## File Structure Changes
```
src/
├── components/
│   └── Quiz/
│       ├── common/           # Shared components
│       │   ├── QuizBase.tsx
│       │   ├── AnswerOptions.tsx
│       │   └── Summary.tsx
│       ├── flags/           # Flag-specific components
│       │   ├── FlagDisplay.tsx
│       │   └── FlagQuiz.tsx
│       └── capitals/        # Move existing capital components here
├── context/
│   ├── QuizContext.tsx     # Base context
│   ├── FlagQuizContext.tsx
│   └── CapitalQuizContext.tsx
└── types/
    └── quiz.ts            # Shared types
```

## Testing Plan
1. Unit Tests:
   - Question generator
   - Flag loading utilities
   - Component rendering
   - State management

2. Integration Tests:
   - Full quiz flow
   - Error handling
   - State transitions

3. E2E Tests:
   - Complete flag quiz gameplay
   - Different screen sizes
   - Accessibility testing

## Accessibility Considerations
1. Alt text for flag images
2. Keyboard navigation
3. Screen reader support
4. High contrast mode support

## Implementation Timeline
1. Base Abstraction (1 day)
2. Component Refactoring (1 day)
3. Flag Quiz Implementation (2 days)
4. Testing (1 day)
5. Polish & Bug Fixes (1 day) 