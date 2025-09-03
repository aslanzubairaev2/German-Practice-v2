import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import initialPhrases from '../initial-phrases.json' with { type: 'json' };

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
 * Smart import function that checks for existing phrases and only imports new ones
 */
export const smartImportPhrases = async () => {
  console.log('Starting smart import of initial phrases...\n');
  
  try {
    const supabase = initSupabase();
    
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
    
    // Filter initial phrases to only include new ones
    const newPhrases = initialPhrases.filter(phrase => {
      const key = `${phrase.german}|${phrase.russian}`;
      return !existingPhraseSet.has(key);
    });
    
    console.log(`📋 Found ${newPhrases.length} new phrases to import`);
    
    if (newPhrases.length === 0) {
      console.log('✅ No new phrases to import');
      return;
    }
    
    // Transform the new phrases to match the database schema
    const phrasesToInsert = newPhrases.map(phrase => ({
      // Let Supabase auto-generate UUIDs instead of using uuidv4()
      russian: phrase.russian,
      german: phrase.german,
      transcription: phrase.transcription,
      context: phrase.context,
      category: phrase.category,
      masterylevel: phrase.masteryLevel,
      lastreviewedat: phrase.lastReviewedAt ? new Date(phrase.lastReviewedAt).toISOString() : null,
      nextreviewat: new Date(phrase.nextReviewAt).toISOString(),
      knowcount: phrase.knowCount,
      knowstreak: phrase.knowStreak,
      ismastered: phrase.isMastered
    }));
    
    // Insert new phrases into the database
    const { data, error } = await supabase
      .from('phrases')
      .insert(phrasesToInsert)
      .select();
    
    if (error) {
      console.error('❌ Error inserting new phrases:', error);
      return;
    }
    
    console.log(`✅ Successfully imported ${data.length} new phrases`);
    console.log('Imported phrases:');
    data.forEach(phrase => {
      console.log(`  - ${phrase.german} (${phrase.russian})`);
    });
    
  } catch (error) {
    console.error('❌ Error during smart import:', error);
  }
};