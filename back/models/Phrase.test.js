/**
 * Test file for Phrase model
 */

import Phrase from './Phrase.js';

// Example usage of the Phrase model
const samplePhrase = {
  id: "a8x2b9c3",
  russian: "Как дела?",
  german: "Wie geht's?",
  transcription: "[ви гетс]",
  context: "Когда спрашиваешь о самочувствии",
  category: "w-fragen",
  masteryLevel: 2,
  lastReviewedAt: 1678886400000,
  nextReviewAt: 1678915200000,
  knowCount: 2,
  knowStreak: 2,
  isMastered: false
};

// Create a new Phrase instance
const phrase = new Phrase(samplePhrase);

console.log('Phrase instance:', phrase);

// Export for testing purposes
export { phrase, samplePhrase };