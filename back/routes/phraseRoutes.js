import express from 'express';
import {
  getAllPhrases,
  getPhraseById,
  createPhrase,
  updatePhrase,
  deletePhrase
} from '../controllers/phraseController.js';

const router = express.Router();

// GET /phrases - Get all phrases
router.get('/', getAllPhrases);

// GET /phrases/:id - Get a phrase by ID
router.get('/:id', getPhraseById);

// POST /phrases - Create a new phrase
router.post('/', createPhrase);

// PUT /phrases/:id - Update a phrase
router.put('/:id', updatePhrase);

// DELETE /phrases/:id - Delete a phrase
router.delete('/:id', deletePhrase);

export default router;