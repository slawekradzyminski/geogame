# Geography Quiz App

A React-based interactive quiz application to test and improve your knowledge of world geography. Built with TypeScript, Vite, and Chakra UI.

## Features

- 🌍 Test your knowledge of world capitals, flags, and languages
- 🌐 Full internationalization support (English and Polish)
- 🎨 Modern UI with dark/light mode
- 📱 Fully responsive design
- ⚡ Fast and lightweight

## Current Status

- ✅ Capital Quiz: Functional (map feature coming soon)
- ❌ Flag Quiz: Under development
- ❌ Language Quiz: Under development

## Tech Stack

### Frontend
- React 18.3
- TypeScript 5.6
- Vite 6.0
- Chakra UI 2.8
- React Router 7.1
- i18next for internationalization

### Testing
- Playwright for E2E testing
- Vitest for unit testing (coming soon)

### Development Tools
- ESLint 9 with TypeScript support
- React Hooks plugin
- React Refresh for HMR

### Data
- REST Countries API for initial data
- JSON storage for optimized data access
- SVG flag images

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run prepare-data` - Update country data
- `npm run scrape-data` - Fetch fresh data from API
- `npm run validate-data` - Validate data structure
