# Phrase Generation System

This directory contains the functionality for generating German phrases with Russian translations using AI.

## Files

- [phraseGenerator.js](phraseGenerator.js) - Contains functions for generating phrases using AI and saving them to the database
- [generate-phrases.js](../generate-phrases.js) - Script to generate and save phrases (runnable via npm)
- [check-generated-phrases.js](../check-generated-phrases.js) - Script to verify generated phrases in the database

## Usage

To generate and save 10 beginner-level German phrases with Russian translations:

```bash
npm run generate-phrases
```

To check the generated phrases in the database:

```bash
npm run check-generated-phrases
```

## How It Works

1. The system uses the Gemini 2.0 Flash model via the Google Generative AI API
2. It generates 10 beginner-level German phrases with Russian translations
3. Each phrase is assigned to an appropriate category (general, w-fragen, pronouns, numbers, time, money)
4. The generated phrases are saved to the Supabase database

## Functions

### generatePhrases(count, level)
Generates German phrases with Russian translations using AI.

Parameters:
- `count` (number): Number of phrases to generate (default: 10)
- `level` (string): Language level (beginner, intermediate, advanced) (default: 'beginner')

Returns: Promise that resolves to an array of phrase objects

### savePhrasesToDatabase(phrases, supabase)
Saves generated phrases to the database.

Parameters:
- `phrases` (array): Array of phrase objects to save
- `supabase` (object): Supabase client instance

Returns: Promise that resolves to the saved phrases

### generateAndSavePhrases(supabase, count)
Generates phrases and saves them to the database.

Parameters:
- `supabase` (object): Supabase client instance
- `count` (number): Number of phrases to generate (default: 10)

Returns: Promise that resolves to the saved phrases