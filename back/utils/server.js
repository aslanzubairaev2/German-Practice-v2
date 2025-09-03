import { createClient } from '@supabase/supabase-js';
import { smartImportPhrases } from './smartImport.js';

/**
 * Initialize Supabase client
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export const initSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_PROJECT_API;
  const supabaseKey = process.env.SUPABASE_API_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

/**
 * Start the Express server and initialize database connection
 * @param {import('express').Application} app - Express application instance
 */
export const startServer = async (app) => {
  // Initialize Supabase
  const supabase = initSupabase();
  
  // Test database connection
  try {
    const { data, error } = await supabase.from('phrases').select('count');
    if (error) throw error;
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
  
  // Store supabase client in app locals for use in routes
  app.locals.supabase = supabase;
  
  // Smart import of initial phrases only in development
  if (process.env.NODE_ENV !== 'production') {
    await smartImportPhrases();
  }
  
  // Define port
  const PORT = process.env.PORT || 5000;
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};