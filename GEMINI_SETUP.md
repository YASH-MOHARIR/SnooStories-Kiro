# Google Gemini Setup Guide

## 1. Get Your Free API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

## 2. Configure Your Environment

Create a `.env` file in your project root:

```bash
GEMINI_API_KEY=your_actual_api_key_here
```

**Important:** Add `.env` to your `.gitignore` to keep your API key private!

## 3. Test the Integration

### From Client (React)

```typescript
const response = await fetch('/api/gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    prompt: 'Generate a fun game character description' 
  })
});

const data = await response.json();
console.log(data.response);
```

### Example Use Cases for Your Game

- **Dynamic NPC dialogue**: Generate unique responses based on player actions
- **Procedural content**: Create random quests, items, or story elements
- **Player assistance**: Provide hints or tips contextually
- **Content moderation**: Analyze user-generated content
- **Game master**: Create dynamic challenges or puzzles

## 4. API Limits (Free Tier)

- 15 requests per minute
- 1 million tokens per minute
- 1,500 requests per day

Good enough for testing and moderate traffic!

## 5. Available Models

- `gemini-1.5-flash` (default) - Fast and efficient
- `gemini-1.5-pro` - More capable, slightly slower

## 6. Example: Generate Game Content

```typescript
import { GeminiClient } from './core/gemini';

const gemini = new GeminiClient(process.env.GEMINI_API_KEY!);

// Generate a random enemy
const enemy = await gemini.generateContent(
  'Create a fantasy game enemy with name, description, and stats. Format as JSON.'
);

// Generate dialogue
const dialogue = await gemini.generateContent(
  'Generate a mysterious NPC greeting for a fantasy RPG game. Keep it under 50 words.'
);
```

## Troubleshooting

- **"GEMINI_API_KEY not configured"**: Make sure your `.env` file exists and is loaded
- **403 error**: Check your API key is valid
- **429 error**: You've hit rate limits, wait a minute
- **500 error**: Check the console logs for detailed error messages
