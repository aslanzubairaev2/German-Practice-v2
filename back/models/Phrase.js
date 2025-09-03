/**
 * @typedef {Object} Phrase
 * @property {string} id - Unique identifier for the phrase
 * @property {string} russian - Russian translation of the phrase
 * @property {string} german - German phrase
 * @property {string | null} transcription - German phrase transcription in Russian
 * @property {string | null} context - Context or situation where the phrase is used
 * @property {'general' | 'w-fragen' | 'pronouns' | 'numbers' | 'time' | 'money' | 'calendar' | 'holidays'} category - Category of the phrase
 * @property {number} masteryLevel - 0: new, higher is better
 * @property {number | null} lastReviewedAt - Timestamp of last review
 * @property {number} nextReviewAt - Timestamp of next review
 * @property {number} knowCount - Total times 'know' was clicked
 * @property {number} knowStreak - Consecutive times 'know' was clicked
 * @property {boolean} isMastered - True if knowCount >= 3 or knowStreak >= 2
 */

export default class Phrase {
  /**
   * Create a new Phrase instance
   * @param {Phrase} phraseData - The phrase data
   */
  constructor(phraseData) {
    this.id = phraseData.id;
    this.russian = phraseData.russian;
    this.german = phraseData.german;
    this.transcription = phraseData.transcription || null;
    this.context = phraseData.context || null;
    this.category = phraseData.category;
    this.masteryLevel = phraseData.masteryLevel;
    this.lastReviewedAt = phraseData.lastReviewedAt;
    this.nextReviewAt = phraseData.nextReviewAt;
    this.knowCount = phraseData.knowCount;
    this.knowStreak = phraseData.knowStreak;
    this.isMastered = phraseData.isMastered;
  }
}