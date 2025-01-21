# Geography Quiz Application - Implementation Plan

## ✅ Completed Tasks

### Project Setup & Dependencies
- ✅ Create Vite React TypeScript project
- ✅ Install required dependencies:

### Data Preparation
- ✅ Create and run data scraper
- ✅ Clean and validate data
- ✅ Create separate files for EN and PL data
- ✅ Store as static JSON

### Layout & UI Foundation
- ✅ Set up Material UI
- ✅ Implement responsive layout using MUI Grid and Box
- ✅ Add consistent width constraints using MUI Container
- ✅ Create responsive home page with MUI components

### Internationalization
- ✅ Configure i18n
  - ✅ Basic setup
  - ✅ Translation files structure
  - ✅ Dynamic language loading
  - ✅ Language switcher component
- ✅ Add translations for:
  - ✅ Basic UI elements
  - ✅ Quiz modes and descriptions
  - ❌ Quiz questions (dynamic content)
  - ❌ Quiz feedback
  - ❌ Error messages

### Theme Implementation
- ✅ Configure theme provider
- ✅ Implement dark/light mode toggle
- ✅ Add theme switcher component
- ✅ Create consistent color palette
- ✅ Remove Chakra UI in favor of Material UI

### Testing
- ✅ E2E tests for homepage:
  - Layout and responsiveness
  - Navigation flows
  - Interactive elements
  - Basic i18n features
  - Theme switching

## 🚧 In Progress

### Capital Quiz Implementation
- Data preparation:
  - Create city database with translations
  - Ensure data includes capitals and other major cities
  - Store in JSON format similar to countries data

- Quiz Flow Implementation:
  - Create QuizContext for game state management:
    - Current question number (1-10)
    - Score tracking
    - Answer history for summary
  - Implement quiz logic:
    - Random country selection (no repeats)
    - Generate 4 random city options (including correct capital)
    - Track selected answers for summary

- Quiz UI Components:
  - Question display:
    - Country name
    - Flag display (moved from assets to public)
    - 4 answer options as buttons
  - Progress indicators:
    - Question counter (e.g., "7/10")
    - Current score
    - Circular timer (5 seconds)
    - "Next" button for manual advance
  - Answer feedback:
    - Green highlight for correct answer
    - Red highlight for wrong answer
    - Toast notification in top-right corner
  - Summary screen:
    - Final score presentation
    - Question-by-question breakdown:
      - Country name and flag
      - Selected answer
      - Correct answer
      - Visual correct/incorrect indicator

### Testing
- E2E tests for capital quiz:
  - Quiz flow (10 questions)
  - Answer selection
  - Timer functionality
  - Manual question advance
  - Score tracking
  - Summary screen accuracy

## 📋 Upcoming Tasks (Prioritized)

### Flag Quiz Implementation
[moved to future implementation]

### Language Quiz Implementation
[moved to future implementation]

## Project Structure Update
```
src/
├── data/
│   ├── countries.json
│   └── cities.json
├── types/
│   ├── quiz.ts
│   └── geography.ts
├── context/
│   └── QuizContext.tsx
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── Quiz/
│   │   ├── CapitalQuiz/
│   │   │   ├── QuestionDisplay.tsx
│   │   │   ├── AnswerOptions.tsx
│   │   │   ├── ProgressIndicator.tsx
│   │   │   └── Summary.tsx
│   │   └── common/
│   │       ├── Flag.tsx
│   │       ├── Timer.tsx
│   │       └── Toast.tsx
│   └── common/
│       ├── CustomButton.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorAlert.tsx
```

## Development Timeline

### Phase 1: Foundation (Days 1-3)
- ✅ Project setup
- ✅ Data preparation
- ✅ Basic UI components
- ✅ i18n setup
- ✅ Theme implementation

### Phase 2: Capital Quiz (Days 4-5)
- 🚧 City data preparation
- Quiz implementation
- Testing
- Polish & bug fixes

### Phase 3: Additional Quiz Types (Days 6-7)
[postponed for later iterations]

## 🎯 Future Enhancements
- Add difficulty levels
- Implement multiplayer mode
- Add leaderboard
- Create achievement system
- Add sound effects
- Implement PWA support

## Development Timeline

### Phase 1: Foundation (Days 1-3)
- ✅ Project setup
- ✅ Data preparation
- ✅ Basic UI components
- ✅ i18n setup

### Phase 2: Core Features (Days 4-5)
- Core types implementation
- Quiz implementation
- Complete i18n features
- Theme implementation

### Phase 3: Polish (Days 6-7)
- Testing
- Performance optimization
- Deployment

## Data Sources

### Countries
- Using data from REST Countries API
- Stored in `src/data/countries.en.json` and `src/data/countries.pl.json`
- Contains country information including:
  - Name (in English and Polish)
  - Capital city
  - Flag URL
  - Languages

### Cities
- Using data from GeoNames API
- Stored in `src/data/cities.json`
- Contains 1000 largest cities worldwide
- Data includes:
  - City name (in English and Polish)
  - Country code
  - Population
  - Capital status
- Polish translations for:
  - European cities
  - Major North American cities
  - Major world cities with traditional Polish names
- Configuration:
  - Requires GeoNames API username (stored in `src/config.ts`)
  - Script: `src/scripts/fetchCities.ts`
  - Translations: `src/data/cityTranslations.ts`

## Features (TODO)
1. Quiz modes:
   - Capitals
   - Major cities
   - Flags
   - Languages
2. Difficulty levels
3. Score tracking
4. Language switching (EN/PL)

## Technical Stack (TODO)
- Frontend framework
- State management
- Styling solution
- Testing framework 