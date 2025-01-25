# Capital Quiz Translation Issue Analysis

## Production Code Issue
After reviewing the codebase, the issue is in the `CapitalQuizProvider` component's language change handling:

1. Core Issue:
   - The `setLanguage` function only updates the language in the state
   - It doesn't trigger a reset of the current question or options
   - The current question and options remain in the old language until the next question

2. Data Flow:
   ```typescript
   const setLanguage = (language: Language) => {
     setState((prev) => ({ ...prev, language }));
   };
   ```
   - This updates the language
   - `useCountries` and `useCities` hooks will load new data
   - BUT the current question isn't regenerated with the new data

## Impact
1. When Language Changes:
   - State language updates
   - New data loads (countries and cities)
   - But current question remains with old language data
   - User sees a mix of old and new language content

2. Test Failure:
   - Test expects all options to be in Polish
   - Options remain in English because question wasn't regenerated
   - Test correctly identifies this as a bug

## Required Fix
1. Update `setLanguage` in `CapitalQuizProvider`:
   ```typescript
   const setLanguage = (language: Language) => {
     setState((prev) => ({ 
       ...prev, 
       language,
       // Reset question-related state
       currentQuestionNumber: prev.currentQuestionNumber,
       score: prev.score,
       answers: prev.answers
     }));
     // Force question regeneration
     setQuestion(null);
   };
   ```

2. Benefits:
   - Clears current question
   - Triggers question regeneration via useEffect
   - Maintains quiz progress
   - Ensures all content is in new language

## Implementation Details
1. Question Generation:
   - `generateNewQuestion` correctly uses translated data
   - Issue is not with generation but with triggering regeneration

2. Data Loading:
   - `useCountries` and `useCities` hooks work correctly
   - They properly load language-specific data
   - The loaded data just needs to be used for regeneration

## Testing
After implementing the fix:
1. Current question will be regenerated when language changes
2. All options will be in the new language
3. Quiz progress (score, question number) will be preserved
4. Test will pass as all content will be in Polish 