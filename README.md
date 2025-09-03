# German Practice Application

A full-stack application for practicing German phrases with spaced repetition, featuring a React frontend and Express.js backend with Supabase integration.

## Project Structure

```
.
├── back/           # Backend (Express.js + Supabase)
└── front/          # Frontend (React + Vite)
```

## Features

- Practice German phrases with spaced repetition algorithm
- AI-powered phrase generation
- Pronunciation feedback with speech recognition
- Progress tracking and mastery levels
- Responsive design for all devices
- Dark mode support

## Technologies Used

### Frontend
- React with TypeScript
- Vite for build tooling
- Zustand for state management
- React Query for data fetching
- CSS Modules for styling

### Backend
- Express.js for REST API
- Supabase for database
- Google Gemini and DeepSeek for AI services
- Environment-based configuration

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google Gemini API key (optional)
- DeepSeek API key (optional)

### Environment Variables

Create `.env` files in both `front/` and `back/` directories with the required environment variables.

#### Backend (.env in back/ directory)
```
SUPABASE_PROJECT_API=your_supabase_project_url
SUPABASE_API_KEY=your_supabase_api_key
GEMINI_API_KEY=your_gemini_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
PORT=5000
```

#### Frontend (.env in front/ directory)
```
VITE_API_URL=/api
```

### Installation

1. Install backend dependencies:
   ```bash
   cd back
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd ../front
   npm install
   ```

### Development

1. Start the backend server:
   ```bash
   cd back
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd ../front
   npm run dev
   ```

### Initial Data Setup

To import the initial set of German phrases:

```bash
cd back
node import-initial-phrases.js
```

## Deployment

### Deploying to Vercel

This application can be deployed to Vercel with the following steps:

1. Push your code to a GitHub repository
2. Create a new project on Vercel
3. Connect your GitHub repository to Vercel
4. Configure the project settings:
   - For frontend: 
     - Framework Preset: Vite
     - Root Directory: front/
     - Build Command: npm run build
     - Output Directory: dist/
   - For backend:
     - Framework Preset: Other
     - Root Directory: back/
     - Build Command: npm install
     - Output Directory: .
5. Add environment variables in Vercel project settings:
   - SUPABASE_PROJECT_API
   - SUPABASE_API_KEY
   - GEMINI_API_KEY
   - DEEPSEEK_API_KEY
6. Deploy the project

### Alternative Deployment Options

You can also deploy the frontend and backend separately:

1. Deploy frontend to Vercel, Netlify, or any static hosting service
2. Deploy backend to Render, Railway, Heroku, or any Node.js hosting service

## API Documentation

The backend provides a REST API for managing German phrases:

- `GET /api/health` - Health check
- `GET /api/phrases` - Get all phrases
- `GET /api/phrases/:id` - Get a phrase by ID
- `POST /api/phrases` - Create a new phrase
- `PUT /api/phrases/:id` - Update a phrase
- `DELETE /api/phrases/:id` - Delete a phrase

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.