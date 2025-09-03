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

async function checkImportedPhrases() {
  console.log('Checking imported phrases in Supabase...\n');
  
  try {
    // Check specifically for our test phrases
    const { data: testData, error: testError } = await supabase
      .from('phrases')
      .select('*')
      .ilike('german', '%neue Phrase%');
    
    if (testError) {
      console.error('❌ Error fetching test phrases:', testError);
      process.exit(1);
    }
    
    console.log(`✅ Found ${testData.length} 'neue Phrase' phrases in the database`);
    testData.forEach(phrase => {
      console.log(`  - ${phrase.german} (${phrase.russian})`);
    });
    
    // Get total count
    const { count, error: countError } = await supabase
      .from('phrases')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('❌ Error counting phrases:', countError);
      process.exit(1);
    }
    
    console.log(`\n📊 Total phrases in database: ${count}`);
    
  } catch (error) {
    console.error('❌ Error checking phrases:', error);
    process.exit(1);
  }
}

checkImportedPhrases();