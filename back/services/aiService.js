import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Service for interacting with AI providers
 */
class AIService {
  constructor() {
    // API keys will be loaded dynamically when needed
  }
  
  /**
   * Generate content using Gemini
   * @param {string} prompt - The prompt to send to Gemini
   * @returns {Promise<string>} - The generated content
   */
  async generateWithGemini(prompt) {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }
    
    try {
      const gemini = new GoogleGenerativeAI(geminiApiKey);
      const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Gemini generation failed: ${error.message}`);
    }
  }
  
  /**
   * Generate content using DeepSeek (placeholder implementation)
   * @param {string} prompt - The prompt to send to DeepSeek
   * @returns {Promise<string>} - The generated content
   */
  async generateWithDeepSeek(prompt) {
    const deepSeekApiKey = process.env.DEEPSEEK_API_KEY;
    if (!deepSeekApiKey) {
      throw new Error('DeepSeek API key not configured');
    }
    
    // This is a placeholder implementation
    // You would need to implement the actual DeepSeek API integration
    throw new Error('DeepSeek integration not implemented yet');
  }
  
  /**
   * Generate content using the preferred AI provider
   * @param {string} prompt - The prompt to send to the AI
   * @param {'gemini' | 'deepseek'} provider - The AI provider to use
   * @returns {Promise<string>} - The generated content
   */
  async generateContent(prompt, provider = 'gemini') {
    switch (provider) {
      case 'gemini':
        return this.generateWithGemini(prompt);
      case 'deepseek':
        return this.generateWithDeepSeek(prompt);
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }
}

export default new AIService();