# Geography Quiz App - Project Plan

## Data Preparation ✅
- Scrape country data from REST Countries API
- Process and validate data
- Save data in JSON format for both English and Polish
- Add flag images to public directory

## Internationalization Setup ✅
- Configure i18next
- Add translations for English and Polish
- Implement language switcher
- Add translations for quiz content

## Layout & UI Foundation ✅
- Set up Chakra UI with theme support
- Create responsive layout
- Implement dark/light mode toggle
- Add consistent width constraints

## Game Implementation 🚧
### Capital Quiz Mode ✅
- Basic quiz functionality works
- TODO: Add interactive world map to show country location
- TODO: Add animations for correct/incorrect answers

### Flag Quiz Mode ❌
- Currently broken
- Issues with flag image loading
- Needs complete reimplementation

### Language Quiz Mode ❌
- Currently broken
- Issues with language data
- Needs complete reimplementation

## Testing 🚧
### Unit Tests (Vitest)
- Set up Vitest configuration
- Add tests for utils/quiz.ts
- Add tests for QuizContext
- Add tests for game components

### E2E Tests (Playwright)
- Test basic navigation
- Test quiz gameplay
- Test internationalization
- Test responsive design

## Future Enhancements 📈
- Add difficulty levels
- Implement scoring system
- Add leaderboard
- Add sound effects
- Add achievements
- Add statistics tracking

## Known Issues 🐛
1. Flag quiz mode doesn't display images correctly
2. Language quiz mode has data inconsistencies
3. Need to add proper error handling
4. Need to add loading states
5. Need to add proper TypeScript types for country data

## Next Steps 🎯
1. Implement world map in Capital quiz
2. Set up Vitest and add unit tests
3. Fix Flag quiz mode
4. Fix Language quiz mode
5. Add proper error handling 