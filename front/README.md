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

The application is configured to proxy API requests to `http://localhost:3000`. Update the proxy target in `vite.config.ts` if your backend runs on a different port.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- Fetch and display German phrases from the backend
- State management with Zustand
- Data fetching with React Query
- TypeScript for type safety