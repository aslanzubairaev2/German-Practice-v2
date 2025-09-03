import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

async function checkGeneratedPhrases() {
  console.log('Checking generated phrases in the database...\n');
  
  try {
    // Get all phrases
    const response = await fetch(`${BASE_URL}/phrases`);
    const phrases = await response.json();
    
    if (response.status !== 200) {
      console.error('Error fetching phrases:', phrases);
      return;
    }
    
    console.log(`Found ${phrases.length} total phrases in the database.`);
    
    // Filter for recently generated phrases (without specific test phrase markers)
    const recentPhrases = phrases.filter(phrase => 
      !phrase.russian.includes('Тестовая фраза') && 
      !phrase.german.includes('Testphrase')
    );
    
    console.log(`Found ${recentPhrases.length} recently generated phrases:`);
    
    // Display the most recent phrases
    recentPhrases.slice(-10).forEach((phrase, index) => {
      console.log(`${index + 1}. ${phrase.german} - ${phrase.russian} (${phrase.category})`);
    });
    
  } catch (error) {
    console.error('Error checking phrases:', error);
  }
}

// Run the check
checkGeneratedPhrases();