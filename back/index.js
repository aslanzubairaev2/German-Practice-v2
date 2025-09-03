import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { startServer } from './utils/server.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import phraseRoutes from './routes/phraseRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

// Routes
app.use('/api/phrases', phraseRoutes);
app.use('/api/health', healthRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server function
const start = async () => {
  try {
    await startServer(app);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();