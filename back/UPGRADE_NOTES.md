# Upgrade Notes - Context Field Addition

## Overview
This upgrade adds a new `context` field to the Phrase model to provide contextual information about when and where phrases are typically used. This will help users understand the appropriate situations for using each phrase.

## Changes Made

### 1. Model Update
- **File**: `models/Phrase.js`
- Added `context` field (string | null) to the Phrase typedef and constructor
- Updated category enum to include 'calendar' and 'holidays'

### 2. Controller Update
- **File**: `controllers/phraseController.js`
- Modified `createPhrase` function to handle context field
- Modified `updatePhrase` function to handle context field updates

### 3. Generator Update
- **File**: `generators/phraseGenerator.js`
- Updated AI prompt to request context descriptions for generated phrases
- Modified data structures to include context field
- Updated function documentation to reflect new field

### 4. Documentation Update
- **File**: `README.md`
- Updated Phrase Model documentation to include context field
- Added example with context field
- Added information about initial data import scripts

### 5. Test Script Update
- **File**: `models/Phrase.test.js`
- Added context field to test data

### 6. Schema Refresh
- **File**: `refresh-schema.js`
- Updated to include context field in schema refresh queries

### 7. Initial Data Import
- **Files**: `initial-phrases.json`, `import-initial-phrases.js`, `check-imported-phrases.js`
- Added initial set of 20 common German phrases with context
- Created scripts for importing and checking initial data

## Database Information

The context column should already exist in your Supabase database. If it doesn't, you can add it using the Supabase SQL editor:

```sql
ALTER TABLE phrases ADD COLUMN context TEXT;
```

After adding the column (if needed), refresh the schema cache:
```bash
node refresh-schema.js
```

## API Changes

The API now supports an additional field in phrase objects:

```json
{
  "id": "a8x2b9c3",
  "russian": "Спасибо",
  "german": "Danke",
  "transcription": "[данке]",
  "context": "Выражение благодарности",
  "category": "general",
  "masteryLevel": 2,
  "lastReviewedAt": 1678886400000,
  "nextReviewAt": 1678915200000,
  "knowCount": 2,
  "knowStreak": 2,
  "isMastered": false
}
```

The context field is optional and may be null for existing phrases.

## Example Usage

When creating a new phrase with context:
```javascript
const newPhrase = {
  russian: "Пожалуйста",
  german: "Bitte",
  transcription: "[битte]",
  context: "Вежливый ответ на благодарность или просьба передать что-то",
  category: "general",
  masteryLevel: 0,
  lastReviewedAt: null,
  nextReviewAt: Date.now() + 86400000,
  knowCount: 0,
  knowStreak: 0,
  isMastered: false
};
```

## Initial Data Import

To import the initial set of phrases:

1. Make sure your environment variables are set in `.env`
2. Run the import script:
   ```bash
   node import-initial-phrases.js
   ```
3. Check the imported data:
   ```bash
   node check-imported-phrases.js
   ```

## Testing

Run the test script to verify the changes work correctly:
```bash
node test-phrases.js
```