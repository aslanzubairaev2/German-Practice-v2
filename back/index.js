import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import app from './api/index.js';
import { startServer } from './utils/server.js';

// Load environment variables
dotenv.config();

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