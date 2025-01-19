# Geography Quiz Application - Implementation Plan

## 1. Project Setup & Dependencies
- Create Vite React TypeScript project
- Install required dependencies:
  ```json
  {
    "dependencies": {
      "react-i18next": "^14.0.0",
      "i18next": "^23.7.0",
      "@chakra-ui/react": "^2.8.0",
      "@emotion/react": "^11.11.0",
      "@emotion/styled": "^11.11.0",
      "framer-motion": "^10.16.0"
    }
  }
  ```

## 2. Data Preparation (Pre-development)
- Create data scraper script to fetch from REST Countries API
- Clean and transform the data:
  ```typescript
  // Example structure
  interface CountryData {
    id: string;
    nameEn: string;
    namePl: string;
    capital: string;
    flagUrl: string;
    languages: string[];
  }
  ```
- Store as static JSON in `src/data/countries.json`
- Create data validation script to ensure data quality
- Add data versioning for future updates

## 3. Core Types & Services (✓ Implemented)
- ✓ Country interface
- ✓ QuizType enum
- ✓ QuizQuestion interface
- Update country service to use local JSON instead of API
- ✓ Quiz context for state management

## 4. Internationalization
- Create translation files (en.json, pl.json)
- Setup i18n configuration
- Implement language switcher component
- Add translations for country names and languages

## 5. Components Structure
```
src/
├── data/
│   └── countries.json
├── scripts/
│   ├── scrapeData.ts
│   └── validateData.ts
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── Quiz/
│   │   ├── QuizCard.tsx
│   │   ├── QuestionDisplay.tsx
│   │   ├── AnswerOptions.tsx
│   │   └── QuizTypeSelector.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Loading.tsx
│       └── ErrorMessage.tsx
```

## 6. Quiz Logic Implementation
- Complete `generateQuizQuestion` cases:
  - COUNTRY_TO_LANGUAGE
  - COUNTRY_TO_CAPITAL
  - COUNTRY_TO_FLAG
  - FLAG_TO_COUNTRY
- Add score tracking
- Implement answer validation
- Add feedback for correct/incorrect answers

## 7. UI/UX Features
- Responsive design using Chakra UI
- Loading states
- Error handling
- Animations for transitions
- Score display
- Progress tracking
- Option to select number of choices (3-6)

## 8. Game Flow
```
Start
└── Select Quiz Type
    └── Generate Question
        └── Display Options
            └── User Selects Answer
                └── Show Result
                    └── Next Question or Change Type
```

## 9. Testing
- Unit tests for quiz generation logic
- Component tests for UI elements
- Integration tests for game flow
- Data validation tests

## 10. Optimization & Polish
- Preload and cache flag images during initial load
- Implement error boundaries
- Add loading skeletons
- Progressive image loading for flags
- Optimize JSON structure for minimal bundle size

## 11. Deployment
- Build optimization
- Environment configuration
- Deploy to hosting platform (e.g., Vercel, Netlify)
- Setup automated data update pipeline (if needed)

## Development Phases

### Phase 0: Data Preparation (Day 1)
- Create and run data scraper
- Clean and validate data
- Prepare static JSON file

### Phase 1: Foundation (Days 2-3)
- Project setup
- Core types and services implementation
- Basic UI components

### Phase 2: Core Features (Days 4-5)
- Quiz logic implementation
- UI/UX implementation
- Internationalization

### Phase 3: Polish (Days 6-7)
- Testing
- Optimization
- Deployment 