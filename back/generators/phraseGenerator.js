import AIService from '../services/aiService.js';

/**
 * Generate German phrases with Russian translations using AI
 * @param {number} count - Number of phrases to generate
 * @param {string} level - Language level (beginner, intermediate, advanced)
 * @returns {Promise<Array<{german: string, russian: string, transcription: string, context: string, category: string}>>} - Generated phrases
 */
export async function generatePhrases(count = 10, level = 'beginner') {
  try {
    // Create a prompt for Gemini to generate phrases
    const prompt = `Generate ${count} German phrases suitable for ${level} level learners along with their Russian translations, Russian transcriptions, and context descriptions.
    
    Requirements:
    1. Each phrase should be a complete sentence or common expression
    2. Include the Russian translation for each German phrase
    3. Include a Russian transcription (phonetic representation) of how to pronounce the German phrase
    4. Include a context description in Russian explaining when or where this phrase is typically used
    5. Assign each phrase to an appropriate category from this list: general, w-fragen, pronouns, numbers, time, money, calendar, holidays
    6. Format the response as a JSON array with objects containing: german, russian, transcription, context, category
    7. Do not include any additional text, just the JSON array
    
    Example format:
    [
      {"german": "Guten Morgen", "russian": "Доброе утро", "transcription": "[гутен морген]", "context": "Используется утром при встрече с кем-либо", "category": "general"},
      {"german": "Wie geht es dir?", "russian": "Как дела?", "transcription": "[ви гет эс дир]", "context": "Спрашивают о самочувствии человека", "category": "w-fragen"}
    ]`;
    
    // Generate content using Gemini
    const response = await AIService.generateContent(prompt, 'gemini');
    
    // Parse the JSON response
    try {
      // Handle markdown code blocks
      let cleanResponse = response.trim();
      if (cleanResponse.startsWith('```')) {
        // Extract JSON from markdown code block
        const jsonStart = cleanResponse.indexOf('[');
        const jsonEnd = cleanResponse.lastIndexOf(']') + 1;
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd);
      }
      
      const phrases = JSON.parse(cleanResponse);
      return phrases;
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('AI response was:', response);
      throw new Error('Failed to parse AI response as JSON');
    }
  } catch (error) {
    console.error('Error generating phrases:', error);
    throw error;
  }
}

/**
 * Save generated phrases to the database
 * @param {Array<{german: string, russian: string, transcription: string, context: string, category: string}>} phrases - Phrases to save
 * @param {Object} supabase - Supabase client instance
 * @returns {Promise<Array>} - Saved phrases
 */
export async function savePhrasesToDatabase(phrases, supabase) {
  try {
    // Prepare phrases for database insertion
    const phrasesToInsert = phrases.map(phrase => ({
      german: phrase.german,
      russian: phrase.russian,
      transcription: phrase.transcription,
      context: phrase.context,
      category: phrase.category,
      masterylevel: 0,
      knowcount: 0,
      knowstreak: 0,
      ismastered: false,
      nextreviewat: new Date().toISOString()
    }));
    
    // Insert phrases into the database
    const { data, error } = await supabase
      .from('phrases')
      .insert(phrasesToInsert)
      .select();
    
    if (error) throw error;
    
    console.log(`Successfully saved ${data.length} phrases to database`);
    return data;
  } catch (error) {
    console.error('Error saving phrases to database:', error);
    throw error;
  }
}

/**
 * Generate and save beginner phrases to the database
 * @param {Object} supabase - Supabase client instance
 * @param {number} count - Number of phrases to generate
 * @returns {Promise<Array>} - Saved phrases
 */
export async function generateAndSavePhrases(supabase, count = 10) {
  try {
    console.log(`Generating ${count} beginner phrases...`);
    const phrases = await generatePhrases(count, 'beginner');
    console.log(`Generated ${phrases.length} phrases`);
    
    console.log('Saving phrases to database...');
    const savedPhrases = await savePhrasesToDatabase(phrases, supabase);
    console.log(`Successfully saved ${savedPhrases.length} phrases`);
    
    return savedPhrases;
  } catch (error) {
    console.error('Error in generateAndSavePhrases:', error);
    throw error;
  }
}