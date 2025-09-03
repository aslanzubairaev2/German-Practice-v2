/**
 * Controller for handling phrase-related operations
 */

/**
 * Get all phrases
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const getAllPhrases = async (req, res) => {
  try {
    const { data, error } = await req.app.locals.supabase
      .from('phrases')
      .select('*');
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching phrases:', error);
    res.status(500).json({ error: 'Failed to fetch phrases' });
  }
};

/**
 * Get a phrase by ID
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const getPhraseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await req.app.locals.supabase
      .from('phrases')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Phrase not found' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching phrase:', error);
    res.status(500).json({ error: 'Failed to fetch phrase' });
  }
};

/**
 * Create a new phrase
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const createPhrase = async (req, res) => {
  try {
    // Convert timestamps to PostgreSQL format
    const convertTimestamp = (timestamp) => {
      if (timestamp === null || timestamp === undefined) return null;
      return new Date(timestamp).toISOString();
    };
    
    // Map camelCase properties to lowercase column names
    const phraseData = {
      russian: req.body.russian,
      german: req.body.german,
      transcription: req.body.transcription,
      context: req.body.context,
      category: req.body.category,
      masterylevel: req.body.masteryLevel,
      lastreviewedat: convertTimestamp(req.body.lastReviewedAt),
      nextreviewat: convertTimestamp(req.body.nextReviewAt),
      knowcount: req.body.knowCount,
      knowstreak: req.body.knowStreak,
      ismastered: req.body.isMastered
    };
    
    const { data, error } = await req.app.locals.supabase
      .from('phrases')
      .insert(phraseData)
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating phrase:', error);
    res.status(500).json({ error: 'Failed to create phrase' });
  }
};

/**
 * Update a phrase
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const updatePhrase = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Convert timestamps to PostgreSQL format
    const convertTimestamp = (timestamp) => {
      if (timestamp === null || timestamp === undefined) return null;
      return new Date(timestamp).toISOString();
    };
    
    // Map camelCase properties to lowercase column names
    const updates = {};
    if (req.body.russian !== undefined) updates.russian = req.body.russian;
    if (req.body.german !== undefined) updates.german = req.body.german;
    if (req.body.transcription !== undefined) updates.transcription = req.body.transcription;
    if (req.body.context !== undefined) updates.context = req.body.context;
    if (req.body.category !== undefined) updates.category = req.body.category;
    if (req.body.masteryLevel !== undefined) updates.masterylevel = req.body.masteryLevel;
    if (req.body.lastReviewedAt !== undefined) updates.lastreviewedat = convertTimestamp(req.body.lastReviewedAt);
    if (req.body.nextReviewAt !== undefined) updates.nextreviewat = convertTimestamp(req.body.nextReviewAt);
    if (req.body.knowCount !== undefined) updates.knowcount = req.body.knowCount;
    if (req.body.knowStreak !== undefined) updates.knowstreak = req.body.knowStreak;
    if (req.body.isMastered !== undefined) updates.ismastered = req.body.isMastered;
    
    const { data, error } = await req.app.locals.supabase
      .from('phrases')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Phrase not found' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error updating phrase:', error);
    res.status(500).json({ error: 'Failed to update phrase' });
  }
};

/**
 * Delete a phrase
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const deletePhrase = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await req.app.locals.supabase
      .from('phrases')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting phrase:', error);
    res.status(500).json({ error: 'Failed to delete phrase' });
  }
};