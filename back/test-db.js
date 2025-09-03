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

async function testDatabase() {
  console.log('Testing database connection and table structure...\n');
  
  try {
    // Test database connection
    console.log('1. Testing database connection...');
    const { data, error } = await supabase.from('phrases').select('count');
    if (error) throw error;
    console.log('✅ Database connection successful\n');
    
    // Check table structure
    console.log('2. Checking table structure...');
    // First try to get column information
    const { data: columns, error: columnsError } = await supabase
      .from('phrases')
      .select('*')
      .limit(1);
      
    if (columnsError) {
      console.error('❌ Error checking table structure:', columnsError);
      
      // Try with lowercase column names
      const { data: columns2, error: columnsError2 } = await supabase
        .from('phrases')
        .select('id, russian, german, category, masterylevel, lastreviewedat, nextreviewat, knowcount, knowstreak, ismastered')
        .limit(1);
        
      if (columnsError2) {
        console.error('❌ Error with lowercase columns:', columnsError2);
        return;
      } else {
        console.log('✅ Table exists with lowercase columns');
        console.log('Sample data:', columns2);
      }
    } else {
      console.log('✅ Table exists and is accessible');
      console.log('Sample data:', columns);
    }
    
    // Try to insert a test record
    console.log('\n3. Testing insert operation...');
    const testPhrase = {
      russian: "Тестовая фраза",
      german: "Testphrase",
      category: "general",
      masterylevel: 0,  // lowercase
      lastreviewedat: null,  // lowercase
      nextreviewat: Date.now() + 86400000,  // lowercase
      knowcount: 0,  // lowercase
      knowstreak: 0,  // lowercase
      ismastered: false  // lowercase
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('phrases')
      .insert(testPhrase)
      .select()
      .single();
      
    if (insertError) {
      console.error('❌ Error inserting record:', insertError);
      
      // Try with original case
      const testPhraseOriginal = {
        russian: "Тестовая фраза",
        german: "Testphrase",
        category: "general",
        masteryLevel: 0,
        lastReviewedAt: null,
        nextReviewAt: Date.now() + 86400000,
        knowCount: 0,
        knowStreak: 0,
        isMastered: false
      };
      
      console.log('\nTrying with original case...');
      const { data: insertData2, error: insertError2 } = await supabase
        .from('phrases')
        .insert(testPhraseOriginal)
        .select()
        .single();
        
      if (insertError2) {
        console.error('❌ Error inserting record with original case:', insertError2);
        return;
      } else {
        console.log('✅ Record inserted successfully with original case');
        console.log('Inserted record:', insertData2);
        
        // Clean up - delete the test record
        if (insertData2 && insertData2.id) {
          console.log('\n4. Cleaning up test record...');
          const { error: deleteError } = await supabase
            .from('phrases')
            .delete()
            .eq('id', insertData2.id);
            
          if (deleteError) {
            console.error('❌ Error deleting test record:', deleteError);
          } else {
            console.log('✅ Test record cleaned up successfully');
          }
        }
      }
    } else {
      console.log('✅ Record inserted successfully');
      console.log('Inserted record:', insertData);
      
      // Clean up - delete the test record
      if (insertData && insertData.id) {
        console.log('\n4. Cleaning up test record...');
        const { error: deleteError } = await supabase
          .from('phrases')
          .delete()
          .eq('id', insertData.id);
          
        if (deleteError) {
          console.error('❌ Error deleting test record:', deleteError);
        } else {
          console.log('✅ Test record cleaned up successfully');
        }
      }
    }
    
    console.log('\n🎉 All database tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

testDatabase();