# Design Document

## Overview

Snoo Stories is a Devvit Web application that combines React frontend, Express backend, and Google Gemini AI to create an interactive story generation experience. The application follows a client-server architecture where the React client handles user interactions and UI state, while the Express server manages API requests, Gemini AI integration, and business logic.

The design emphasizes simplicity, responsiveness, and delightful user experience through Snoo's expressive character states and automatic theme detection based on holidays and seasons.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Reddit Platform                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Devvit Interactive Post                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         React Client (src/client/)              │  │  │
│  │  │  - User input (3 words)                         │  │  │
│  │  │  - Snoo character states                        │  │  │
│  │  │  - Theme detection & display                    │  │  │
│  │  │  - Story display                                │  │  │
│  │  └──────────────┬──────────────────────────────────┘  │  │
│  │                 │ HTTP /api/* endpoints                │  │
│  │                 ▼                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │      Express Server (src/server/)               │  │  │
│  │  │  - API routing                                  │  │  │
│  │  │  - Input validation                             │  │  │
│  │  │  - Gemini API integration                       │  │  │
│  │  │  - Error handling                               │  │  │
│  │  └──────────────┬──────────────────────────────────┘  │  │
│  │                 │ HTTPS                                │  │
│  │                 ▼                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │    Shared Types (src/shared/)                   │  │  │
│  │  │  - Theme definitions                            │  │  │
│  │  │  - API types                                    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS API Call
                              ▼
                ┌──────────────────────────────┐
                │   Google Gemini API          │
                │   (generativelanguage.       │
                │    googleapis.com)           │
                └──────────────────────────────┘
```

### Technology Stack

- **Frontend**: React 19.1.0, TypeScript, Tailwind CSS
- **Backend**: Express 5.1.0, Node.js
- **AI**: Google Gemini 1.5 Flash API
- **Platform**: Reddit Devvit 0.12.0
- **Build**: Vite 6.2.4
- **State Management**: React useState hooks

## Components and Interfaces

### Client Components

#### App Component (`src/client/App.tsx`)

The main React component that orchestrates the entire user experience.

**State Management:**
```typescript
type SnooState = 'greeting' | 'thinking' | 'celebrating' | 'idle';

interface AppState {
  word1: string;           // First user input word
  word2: string;           // Second user input word
  word3: string;           // Third user input word
  story: string;           // Generated story or error message
  snooState: SnooState;    // Current Snoo character state
  loading: boolean;        // API request in progress
  theme: Theme;            // Current theme based on date
}
```

**Key Functions:**
- `generateStory()`: Validates input, calls API, handles response
- `reset()`: Clears all state and returns to greeting
- `getSnooDisplay()`: Maps SnooState to emoji and text

**UI Sections:**
1. Theme Badge (top-right corner)
2. Snoo Character (emoji + image)
3. Snoo Speech Bubble
4. Input Fields (3 words) OR Story Display
5. Action Button ("Let Snoo Create!" OR "Create Another Story!")
6. Footer

#### Theme System (`src/shared/types/theme.ts`)

**Theme Interface:**
```typescript
interface Theme {
  name: string;           // Display name (e.g., "Halloween")
  emoji: string;          // Theme emoji (e.g., "🎃")
  snooDescription: string; // Snoo's themed appearance
  promptContext: string;  // Context for AI prompt
}
```

**Theme Detection Logic:**
```typescript
function getCurrentTheme(): Theme {
  // Check current date against holiday ranges
  // Return matching theme or default
}
```

**Supported Themes:**
- Halloween (October): 🎃 Spooky theme
- Christmas (December): 🎄 Festive theme
- Valentine's Day (Feb 11-17): 💘 Romantic theme
- St. Patrick's Day (Mar 14-20): 🍀 Irish theme
- Easter (April): 🐰 Spring theme
- Summer (June-August): ☀️ Beach theme
- Default (all other times): ⭐ Classic theme

### Server Components

#### Express Server (`src/server/index.ts`)

**API Endpoints:**

1. **POST /api/generate-story**
   - Request Body: `{ words: string[], themeContext: string }`
   - Response: `{ story: string, theme: string }` or error
   - Validates input (3 words, non-empty)
   - Calls Gemini API
   - Returns 10-word story

2. **POST /internal/on-app-install**
   - Creates initial post when app is installed
   - Devvit internal endpoint

3. **POST /internal/menu/post-create**
   - Creates new post from moderator menu
   - Devvit internal endpoint

**Middleware:**
- `express.json()`: Parse JSON request bodies
- `express.urlencoded()`: Parse URL-encoded bodies
- `express.text()`: Parse plain text bodies

#### Gemini Client (`src/server/core/gemini.ts`)

**Class: GeminiClient**

```typescript
class GeminiClient {
  private apiKey: string;
  private model: string; // Default: 'gemini-1.5-flash'
  
  constructor(apiKey: string, model?: string);
  
  async generateStory(words: string[], themeContext: string): Promise<string>;
  async generateContent(prompt: string, options?: GenerationOptions): Promise<string>;
  async chat(messages: ChatMessage[]): Promise<string>;
}
```

**Story Generation Prompt Engineering:**
```
You are a creative storyteller. Create a {themeContext} story using these 3 words: {word1}, {word2}, {word3}.

RULES:
- The story must be EXACTLY 10 words long
- Must be funny, clever, or surprising
- Must incorporate all 3 words naturally
- Must fit the {themeContext} theme
- No extra punctuation or formatting
- Just the 10-word story, nothing else

Example format: "Vampire ordered pizza delivery but bicycle courier arrived at sunrise."

Now create your 10-word story:
```

**API Configuration:**
- Model: `gemini-1.5-flash` (fast, free tier)
- Temperature: 0.9 (high creativity)
- Max Tokens: 100 (concise responses)
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`

## Data Models

### Theme Model

```typescript
interface Theme {
  name: string;           // "Halloween", "Christmas", etc.
  emoji: string;          // "🎃", "🎄", etc.
  snooDescription: string; // "Witch Snoo with a spooky cauldron"
  promptContext: string;  // "spooky, Halloween-themed with ghosts..."
}
```

### API Request/Response Models

**Generate Story Request:**
```typescript
interface GenerateStoryRequest {
  words: string[];        // Array of exactly 3 words
  themeContext: string;   // Theme prompt context
}
```

**Generate Story Response (Success):**
```typescript
interface GenerateStoryResponse {
  story: string;          // The 10-word story
  theme: string;          // Theme context used
}
```

**Error Response:**
```typescript
interface ErrorResponse {
  status: 'error';
  message: string;        // Human-readable error message
}
```

### Gemini API Models

**Request:**
```typescript
interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
```

**Response:**
```typescript
interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
      role: string;
    };
    finishReason: string;
  }[];
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}
```

## Error Handling

### Client-Side Error Handling

**Input Validation:**
- Empty fields: Alert "Please enter all 3 words!"
- Whitespace-only: Trimmed and validated server-side

**API Error Handling:**
```typescript
try {
  const response = await fetch('/api/generate-story', {...});
  const data = await response.json();
  
  if (data.story) {
    // Success path
    setStory(data.story);
    setSnooState('celebrating');
  } else {
    // Error response from server
    setStory(data.message || 'Something went wrong!');
    setSnooState('idle');
  }
} catch (error) {
  // Network or parsing error
  setStory('Error: ' + error.message);
  setSnooState('idle');
}
```

### Server-Side Error Handling

**Validation Errors (400):**
- Missing words: "Exactly 3 words are required"
- Empty words: "All 3 words must be non-empty"

**Configuration Errors (500):**
- Missing API key: "GEMINI_API_KEY not configured"

**API Errors (500):**
- Gemini API failure: Logged to console, returned to client
- Network timeout: Handled by Devvit (30s limit)

**Error Response Format:**
```typescript
res.status(statusCode).json({
  status: 'error',
  message: 'Human-readable error message'
});
```

### Gemini API Error Handling

**HTTP Errors:**
```typescript
if (!response.ok) {
  const error = await response.text();
  throw new Error(`Gemini API error: ${response.status} - ${error}`);
}
```

**Empty Response:**
```typescript
if (!data.candidates || data.candidates.length === 0) {
  throw new Error('No response from Gemini API');
}
```

**Common Error Scenarios:**
- 400: Invalid request (malformed prompt)
- 403: Invalid API key
- 429: Rate limit exceeded (15 RPM, 1500 RPD)
- 500: Gemini service error

## Testing Strategy

### Unit Testing

**Client Components:**
- Test `getSnooDisplay()` returns correct emoji/text for each state
- Test `getCurrentTheme()` returns correct theme for various dates
- Test input validation (empty, whitespace, max length)
- Test state transitions (greeting → thinking → celebrating)

**Server Endpoints:**
- Test `/api/generate-story` with valid input
- Test validation errors (missing words, empty words)
- Test API key validation
- Test error response format

**Gemini Client:**
- Test `generateStory()` with mock API responses
- Test error handling (network errors, empty responses)
- Test prompt construction with different themes

### Integration Testing

**End-to-End Flow:**
1. User enters 3 words
2. Clicks "Let Snoo Create!"
3. API request sent with theme context
4. Gemini generates story
5. Story displayed with celebration state
6. User clicks "Create Another Story!"
7. State resets to greeting

**Theme Integration:**
- Test theme detection for each holiday
- Test theme context passed to Gemini
- Test theme badge display

**Error Scenarios:**
- Test with invalid API key
- Test with network failure
- Test with Gemini API errors
- Test with rate limit exceeded

### Manual Testing

**Visual Testing:**
- Verify Snoo animations (bounce effect)
- Verify gradient backgrounds
- Verify responsive design on mobile
- Verify button states (hover, disabled)

**User Experience:**
- Test story quality (funny, relevant, 10 words)
- Test theme appropriateness
- Test loading states
- Test error messages

**Performance Testing:**
- Measure story generation time (target: 1-3 seconds)
- Test with rapid successive requests
- Monitor Gemini API rate limits

### Test Data

**Sample Word Combinations:**
- "pizza, vampire, bicycle"
- "cat, mirror, midnight"
- "zombie, dance, disco"
- "dragon, coffee, laptop"
- "unicorn, pizza, spaceship"

**Edge Cases:**
- Single character words: "a, b, c"
- Maximum length words (20 chars each)
- Special characters: "hello!, world?, test#"
- Numbers: "123, 456, 789"
- Mixed case: "CaT, DoG, BiRd"

## Performance Considerations

### Client Performance

**Optimization Strategies:**
- Minimal re-renders using React state
- Conditional rendering (input OR story display)
- CSS animations (bounce) use GPU acceleration
- Tailwind CSS for minimal bundle size

**Bundle Size:**
- React + React DOM: ~140KB gzipped
- Tailwind CSS: ~10KB (purged)
- App code: ~5KB
- Total: ~155KB (acceptable for web app)

### Server Performance

**API Response Time:**
- Input validation: <1ms
- Gemini API call: 1-3 seconds (typical)
- Total response time: 1-3 seconds

**Rate Limiting:**
- Gemini free tier: 15 requests/minute, 1500/day
- No server-side rate limiting (rely on Gemini limits)
- Consider adding Redis-based rate limiting for production

**Caching:**
- No caching (stories should be unique)
- Theme detection cached per request (computed once)

### Gemini API Optimization

**Token Usage:**
- Prompt: ~100 tokens
- Response: ~20 tokens (10 words)
- Total: ~120 tokens per request
- Daily limit: 1M tokens (supports ~8,300 stories/day)

**Model Selection:**
- `gemini-1.5-flash`: Fast, efficient, free tier
- Alternative: `gemini-1.5-pro` (more capable, slower)

## Security Considerations

### API Key Management

**Environment Variables:**
- Store `GEMINI_API_KEY` in `.env` file
- Never commit `.env` to version control
- Use `.env.example` for documentation

**Server-Side Only:**
- API key only accessible on server
- Client never sees API key
- All Gemini calls from server

### Input Validation

**Client-Side:**
- Max length: 20 characters per word
- Trim whitespace
- Alert on empty fields

**Server-Side:**
- Validate exactly 3 words
- Validate non-empty after trim
- Sanitize input (no injection attacks)

### Rate Limiting

**Gemini API:**
- 15 requests/minute (enforced by Google)
- 1,500 requests/day (enforced by Google)
- Consider adding user-based rate limiting

**Devvit Platform:**
- 30-second timeout per request
- No explicit rate limits documented

### Content Safety

**Gemini Safety Settings:**
- Default safety settings (block harmful content)
- No explicit content filtering needed
- Gemini handles inappropriate content

**User Input:**
- No profanity filter (rely on Gemini)
- No content moderation (stories are ephemeral)
- Consider adding word blacklist for production

## Deployment

### Build Process

```bash
# Install dependencies
npm install

# Build client (Vite)
npm run build:client
# Output: dist/client/

# Build server (Vite SSR)
npm run build:server
# Output: dist/server/index.cjs

# Full build
npm run build
```

### Devvit Configuration

**devvit.json:**
```json
{
  "name": "snoo-stories",
  "http": {
    "domains": ["generativelanguage.googleapis.com"]
  },
  "post": {
    "dir": "dist/client",
    "entrypoints": {
      "default": { "entry": "index.html" }
    }
  },
  "server": {
    "dir": "dist/server",
    "entry": "index.cjs"
  }
}
```

### Deployment Steps

1. **Build:** `npm run build`
2. **Upload:** `devvit upload` (or `npm run deploy`)
3. **Publish:** `devvit publish` (or `npm run launch`)
4. **Install:** Moderators install on subreddit
5. **Configure:** Set `GEMINI_API_KEY` in app settings

### Environment Variables

**Required:**
- `GEMINI_API_KEY`: Google Gemini API key

**Optional:**
- None (all configuration in code)

## Future Enhancements

### Potential Features

1. **Story History:**
   - Save stories to Redis
   - Display user's past stories
   - Share stories via permalink

2. **Voting System:**
   - Upvote/downvote stories
   - Leaderboard of best stories
   - Community favorites

3. **Custom Themes:**
   - User-selectable themes
   - Community-created themes
   - Theme voting

4. **Advanced AI:**
   - Longer stories (20 words, 50 words)
   - Story continuation
   - Multiple story styles (scary, funny, romantic)

5. **Social Features:**
   - Share to Reddit comments
   - Challenge friends
   - Story battles

6. **Analytics:**
   - Track popular word combinations
   - Monitor theme usage
   - Story quality metrics

### Technical Improvements

1. **Performance:**
   - Server-side caching for common words
   - Optimistic UI updates
   - Preload next theme

2. **Reliability:**
   - Retry logic for API failures
   - Fallback stories
   - Health checks

3. **Monitoring:**
   - Error tracking (Sentry)
   - Performance monitoring
   - Usage analytics

4. **Testing:**
   - Automated E2E tests
   - Visual regression tests
   - Load testing

## Design Decisions and Rationale

### Why React?

- Native Devvit Web support
- Component-based architecture
- Rich ecosystem
- Excellent TypeScript support

### Why Gemini 1.5 Flash?

- Free tier (1,500 requests/day)
- Fast response time (1-3 seconds)
- High quality output
- Approved by Reddit for Devvit

### Why 10 Words?

- Short enough to read quickly
- Long enough to tell a story
- Fits mobile screens
- Memorable constraint

### Why Automatic Themes?

- No user configuration needed
- Always relevant
- Encourages repeat visits
- Seasonal engagement

### Why No Story History?

- Simplicity (no database needed)
- Ephemeral content (like Snapchat)
- Encourages sharing in comments
- Reduces server load

### Why No Profanity Filter?

- Gemini has built-in safety
- Stories are user-generated
- Reddit has community moderation
- Adds complexity without clear benefit
