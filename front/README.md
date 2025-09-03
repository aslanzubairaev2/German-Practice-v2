# German Practice App - Frontend

This is a React application for practicing German phrases with spaced repetition.

## Technologies Used

- React with TypeScript
- Vite for build tooling
- Zustand for state management
- React Query for data fetching
- CSS Modules for styling

## Project Structure

```
src/
├── api.ts          # API service functions
├── App.tsx         # Main application component
├── hooks.ts        # Custom hooks for data fetching
├── main.tsx        # Application entry point
├── queryClient.ts  # React Query client configuration
├── store.ts        # Zustand store for global state
├── types.ts        # TypeScript type definitions
└── vite-env.d.ts   # Vite environment types
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## API Configuration

The application is configured to proxy API requests to `http://localhost:5000`. Update the proxy target in `vite.config.ts` if your backend runs on a different port.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment to Vercel

This application can be deployed to Vercel with the following steps:

1. Push your code to a GitHub repository
2. Create a new project on Vercel
3. Connect your GitHub repository to Vercel
4. Configure the project settings:
   - Framework Preset: Vite
   - Root Directory: front/
   - Build Command: npm run build
   - Output Directory: dist/
5. Add environment variables in Vercel project settings:
   - VITE_API_URL: Your backend API URL (if deployed separately)
6. Deploy the project

For backend deployment, you can either:
1. Deploy the backend separately to a Node.js hosting platform
2. Use Vercel Serverless Functions (configured in vercel.json)

## Features

- Fetch and display German phrases from the backend
- State management with Zustand
- Data fetching with React Query
- TypeScript for type safety