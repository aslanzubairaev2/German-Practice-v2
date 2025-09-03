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

async function addTranscriptionColumn() {
  console.log('Adding transcription column to phrases table...\n');
  
  try {
    // Note: In Supabase, we cannot directly alter tables using the JS client
    // This would typically be done through the Supabase dashboard or SQL editor
    console.log('To add the transcription column to your Supabase table, please run the following SQL command in your Supabase SQL editor:');
    console.log('\nALTER TABLE phrases ADD COLUMN transcription TEXT;');
    
    console.log('\nAfter running this command, please run the refresh-schema.js script to update the local cache.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

addTranscriptionColumn();