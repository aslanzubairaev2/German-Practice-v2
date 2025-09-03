import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import initialPhrases from './initial-phrases.json' with { type: 'json' };

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

async function detailedDebug() {
  console.log('Detailed debugging import process...\n');
  
  try {
    // Get all existing phrases from the database
    const { data: existingPhrases, error: fetchError } = await supabase
      .from('phrases')
      .select('german, russian');
    
    if (fetchError) {
      console.error('❌ Error fetching existing phrases:', fetchError);
      return;
    }
    
    console.log(`✅ Found ${existingPhrases.length} phrases already in the database`);
    
    // Create a set of existing phrase combinations for quick lookup
    const existingPhraseSet = new Set(
      existingPhrases.map(p => `${p.german}|${p.russian}`)
    );
    
    // Show total initial phrases
    console.log(`\n📋 Total phrases in initial-phrases.json: ${initialPhrases.length}`);
    
    // Filter initial phrases to only include new ones
    const newPhrases = initialPhrases.filter(phrase => {
      const key = `${phrase.german}|${phrase.russian}`;
      return !existingPhraseSet.has(key);
    });
    
    console.log(`\n🔍 Found ${newPhrases.length} new phrases:`);
    newPhrases.forEach((phrase, index) => {
      console.log(`  ${index + 1}. ${phrase.german} | ${phrase.russian}`);
    });
    
    // Check specifically for our last test phrase
    const lastTestPhrase = initialPhrases.find(p => p.german === "Letzte Testphrase");
    console.log(`\n🔍 Looking for last test phrase:`, lastTestPhrase);
    
    if (lastTestPhrase) {
      const key = `${lastTestPhrase.german}|${lastTestPhrase.russian}`;
      const exists = existingPhraseSet.has(key);
      console.log(`🤔 Does it exist in database? ${exists}`);
      
      if (!exists) {
        console.log(`✅ This phrase should be imported!`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error during detailed debug:', error);
  }
}

detailedDebug();