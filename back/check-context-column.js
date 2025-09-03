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

async function checkContextColumn() {
  console.log('Checking if context column exists in phrases table...\n');
  
  try {
    // Try to select the context column specifically
    const { data, error } = await supabase
      .from('phrases')
      .select('context')
      .limit(1);
      
    if (error) {
      console.log('❌ context column does not exist or is not accessible');
      console.log('Error:', error.message);
    } else {
      console.log('✅ context column exists and is accessible');
    }
    
    // Try to get all columns by selecting a single row
    console.log('\nGetting a sample row to see all columns...');
    const { data: sampleData, error: sampleError } = await supabase
      .from('phrases')
      .select('*')
      .limit(1);
      
    if (sampleError) {
      console.error('❌ Error getting sample row:', sampleError);
    } else {
      console.log('Sample row columns:');
      if (sampleData && sampleData.length > 0) {
        Object.keys(sampleData[0]).forEach(key => {
          console.log(`  - ${key}`);
        });
      } else {
        console.log('  No data found');
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking context column:', error);
  }
}

checkContextColumn();