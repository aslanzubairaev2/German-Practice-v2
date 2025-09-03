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

async function checkTableStructure() {
  console.log('Checking actual table structure in Supabase...\n');
  
  try {
    // Try different combinations of column names to see which ones work
    const columnVariations = [
      'id',
      'russian',
      'german',
      'category',
      'masteryLevel', 'masterylevel', 'mastery_level',
      'lastReviewedAt', 'lastreviewedat', 'last_reviewed_at',
      'nextReviewAt', 'nextreviewat', 'next_review_at',
      'knowCount', 'knowcount', 'know_count',
      'knowStreak', 'knowstreak', 'know_streak',
      'isMastered', 'ismastered', 'is_mastered'
    ];
    
    console.log('Testing column names...');
    
    for (const column of columnVariations) {
      try {
        const { data, error } = await supabase
          .from('phrases')
          .select(column)
          .limit(1);
          
        if (error) {
          console.log(`❌ ${column}: ${error.message}`);
        } else {
          console.log(`✅ ${column}: Valid column`);
        }
      } catch (err) {
        console.log(`❌ ${column}: ${err.message}`);
      }
    }
    
    console.log('\nTrying to get table info from information schema...');
    
    // Get actual column names from information schema
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'phrases')
      .eq('table_schema', 'public');
      
    if (columnsError) {
      console.error('❌ Error getting column info:', columnsError);
    } else {
      console.log('\nActual table columns:');
      columns.forEach(col => {
        console.log(`  - ${col.column_name} (${col.data_type})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking table structure:', error);
  }
}

checkTableStructure();