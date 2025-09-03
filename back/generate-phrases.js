import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { generateAndSavePhrases } from './generators/phraseGenerator.js';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_PROJECT_API;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and key are required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Main function to generate and save phrases
 */
async function main() {
  try {
    console.log('Starting phrase generation process...');
    
    // Generate and save 10 beginner phrases
    const savedPhrases = await generateAndSavePhrases(supabase, 10);
    
    console.log('Phrase generation completed successfully!');
    console.log(`Generated and saved ${savedPhrases.length} phrases:`);
    
    // Display the generated phrases
    savedPhrases.forEach((phrase, index) => {
      console.log(`${index + 1}. ${phrase.german} - ${phrase.russian} (${phrase.category})`);
    });
  } catch (error) {
    console.error('Failed to generate phrases:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();