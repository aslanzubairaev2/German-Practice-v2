import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initSupabase } from '../utils/server.js';
import { errorHandler, notFoundHandler } from '../middlewares/errorHandler.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
import phraseRoutes from '../routes/phraseRoutes.js';
import healthRoutes from '../routes/healthRoutes.js';

// Routes
app.use('/api/phrases', phraseRoutes);
app.use('/api/health', healthRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Initialize Supabase client
const supabase = initSupabase();

// Store supabase client in app locals for use in routes
app.locals.supabase = supabase;

// Export the app for Vercel
export default app;

// For traditional server usage
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    
    // Test database connection
    try {
      const { data, error } = await supabase.from('phrases').select('count');
      if (error) throw error;
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection failed:', error.message);
    }
  });
}