import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_PROJECT_API;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function refreshSchema() {
  console.log('Refreshing Supabase schema cache...\n');
  
  try {
    // Force refresh the schema by querying the table
    console.log('1. Querying table to force schema refresh...');
    const { data, error } = await supabase.from('phrases').select('*').limit(1);
    
    if (error) {
      console.error('Error querying table:', error);
    } else {
      console.log('✅ Table query successful');
    }
    
    // Try to get table info with all columns
    console.log('\n2. Getting table information with all columns...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('phrases')
      .select('id, russian, german, transcription, context, category, masteryLevel, lastReviewedAt, nextReviewAt, knowCount, knowStreak, isMastered')
      .limit(1);
      
    if (tableError) {
      console.error('❌ Error getting table information:', tableError);
    } else {
      console.log('✅ Table information retrieved successfully');
    }
    
    console.log('\nSchema refresh attempt completed.');
    console.log('Please restart your server to ensure the cache is refreshed.');
    
  } catch (error) {
    console.error('❌ Schema refresh failed:', error);
  }
}

refreshSchema();