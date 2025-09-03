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

async function debugImport() {
  console.log('Debugging import process...\n');
  
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
    
    // Show a few existing phrases
    console.log('\nSample of existing phrases:');
    existingPhrases.slice(0, 5).forEach(p => {
      console.log(`  - ${p.german} | ${p.russian}`);
    });
    
    // Show total initial phrases
    console.log(`\n📋 Total phrases in initial-phrases.json: ${initialPhrases.length}`);
    
    // Show a few initial phrases
    console.log('\nSample of initial phrases:');
    initialPhrases.slice(0, 5).forEach(p => {
      console.log(`  - ${p.german} | ${p.russian}`);
    });
    
    // Check specifically for our new test phrase
    const newTestPhrase = initialPhrases.find(p => p.german === "Völlig neue Phrase");
    console.log(`\n🔍 Looking for new test phrase:`, newTestPhrase);
    
    // Check if it exists in the database
    const exists = existingPhrases.some(p => 
      p.german === newTestPhrase.german && p.russian === newTestPhrase.russian
    );
    console.log(`🤔 Does it exist in database? ${exists}`);
    
    // Show all test phrases in initial file
    const testPhrases = initialPhrases.filter(p => p.german.includes("Testphrase") || p.german.includes("neue Phrase"));
    console.log(`\n📝 All test phrases in initial file:`);
    testPhrases.forEach(p => {
      const exists = existingPhrases.some(ep => 
        ep.german === p.german && ep.russian === p.russian
      );
      console.log(`  - ${p.german} | ${p.russian} | Exists: ${exists}`);
    });
    
  } catch (error) {
    console.error('❌ Error during debug:', error);
  }
}

debugImport();