# German Practice Backend

This is the backend server for the German Practice application, built with Express.js and Supabase.

## Features

- Express.js server with CORS support
- Supabase integration for database operations
- Environment-based configuration
- Modular architecture with controllers, routes, models, services, and middleware
- AI services integration (Gemini and DeepSeek)
- Health check endpoint

## Project Structure

```
back/
├── api/            # Vercel Serverless Functions
├── controllers/     # Request handlers
├── generators/      # AI phrase generation functionality
├── middlewares/     # Custom middleware functions
├── models/          # Data models
├── routes/          # API route definitions
├── services/        # Business logic and external services
├── utils/           # Utility functions
├── .env             # Environment variables
├── index.js         # Entry point
└── package.json     # Project dependencies
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```
   SUPABASE_PROJECT_API=your_supabase_project_url
   SUPABASE_API_KEY=your_supabase_api_key
   GEMINI_API_KEY=your_gemini_api_key
   DEEPSEEK_API_KEY=your_deepseek_api_key
   PORT=5000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For production:
   ```bash
   npm start
   ```

## Initial Data Import

To import the initial set of German phrases with Russian translations:

```bash
node import-initial-phrases.js
```

To check the imported phrases in the database:

```bash
node check-imported-phrases.js
```

## Phrase Generation

To generate and save 10 beginner-level German phrases with Russian translations:

```bash
npm run generate-phrases
```

To check the generated phrases in the database:

```bash
npm run check-generated-phrases
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/phrases` - Get all phrases
- `GET /api/phrases/:id` - Get a phrase by ID
- `POST /api/phrases` - Create a new phrase
- `PUT /api/phrases/:id` - Update a phrase
- `DELETE /api/phrases/:id` - Delete a phrase

## Deployment to Vercel

This backend can be deployed to Vercel as Serverless Functions:

1. The application is configured to work with Vercel Serverless Functions
2. The main API entry point is at `back/api/vercel.js`
3. Routes are automatically handled by the Express application
4. Environment variables need to be configured in Vercel project settings:
   - SUPABASE_PROJECT_API
   - SUPABASE_API_KEY
   - GEMINI_API_KEY
   - DEEPSEEK_API_KEY

## Phrase Model

```javascript
{
  id: string,
  russian: string,
  german: string,
  transcription: string | null, // Russian transcription of German pronunciation
  context: string | null, // Context or situation where the phrase is used
  category: 'general' | 'w-fragen' | 'pronouns' | 'numbers' | 'time' | 'money' | 'calendar' | 'holidays',
  masteryLevel: number, // 0: new, higher is better
  lastReviewedAt: number | null, // timestamp
  nextReviewAt: number, // timestamp
  knowCount: number, // Total times 'know' was clicked
  knowStreak: number, // Consecutive times 'know' was clicked
  isMastered: boolean // True if knowCount >= 3 or knowStreak >= 2
}
```

Example:
```json
{
  "id": "a8x2b9c3",
  "russian": "Спасибо",
  "german": "Danke",
  "transcription": "[данке]",
  "context": "Выражение благодарности",
  "category": "general",
  "masteryLevel": 2,
  "lastReviewedAt": 1678886400000,
  "nextReviewAt": 1678915200000,
  "knowCount": 2,
  "knowStreak": 2,
  "isMastered": false
}
```