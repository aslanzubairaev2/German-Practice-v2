import dotenv from 'dotenv';
import { smartImportPhrases } from './utils/smartImport.js';

// Load environment variables
dotenv.config();

// Run the smart import
smartImportPhrases();
