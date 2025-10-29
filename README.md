# Snoo Stories 🎭✨

A themed AI story generator where Reddit's mascot Snoo takes your 3 words and creates a funny 10-word story. The theme automatically changes based on current events/holidays!

## Features

- 🎭 **Auto-themed stories** - Changes based on holidays (Halloween, Christmas, Valentine's, etc.)
- 🤖 **AI-powered** - Uses Google Gemini API to generate unique stories
- ⚡ **Instant generation** - Stories appear in 1-3 seconds
- 📋 **Copy to clipboard** - Share your stories easily
- 🎨 **Snoo animations** - Expressive character states guide the experience
- 📱 **Mobile-friendly** - Responsive design for all devices
- ♿ **Accessible** - ARIA labels and keyboard navigation

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Gemini API Key

Create a `.env` file in the project root:

```bash
GEMINI_API_KEY=your_api_key_here
```

Get your free API key at: https://aistudio.google.com/app/apikey

### 3. Run Development Server

```bash
npm run dev
```

This will:
- Build the client and server
- Start Devvit playtest mode
- Provide a Reddit URL to test your app

### 4. Open the Playtest URL

Look for output like:
```
Playtest URL: https://www.reddit.com/r/your-app_dev?playtest=your-app
```

Open that URL in your browser to test!

## How to Test

### Basic Functionality Test

1. **Open the app** - You should see Snoo waving 👋 with "Hi! Give me 3 words and I'll create a story!"

2. **Enter 3 words** - Try these examples:
   - "pizza, vampire, bicycle"
   - "cat, mirror, midnight"
   - "zombie, dance, disco"

3. **Click "Let Snoo Create!"** - Snoo should:
   - Change to thinking state 🤔
   - Show "Hmm... let me think..."
   - Generate a 10-word story (takes 1-3 seconds)
   - Change to celebrating state ✨
   - Display your story in a gradient card

4. **Copy the story** - Click "📋 Copy Story"
   - Button should change to "✓ Copied!"
   - Story should be in your clipboard
   - Paste it somewhere to verify

5. **Create another story** - Click "🎲 Create Another!"
   - All fields should clear
   - Snoo should return to greeting state
   - You can enter new words

### Theme Test

Check the top-right corner for the current theme:
- October: 🎃 Halloween
- December: 🎄 Christmas
- Feb 11-17: 💘 Valentine's Day
- Mar 14-20: 🍀 St. Patrick's Day
- April: 🐰 Easter
- June-Aug: ☀️ Summer
- Other: ⭐ Classic

### Error Handling Test

1. **Empty fields** - Click "Let Snoo Create!" without entering words
   - Should show alert: "Please enter all 3 words!"

2. **Network error** - Turn off internet and try to generate
   - Should show: "🌐 Network error. Please check your connection and try again."

3. **Invalid API key** - Change your `.env` to use wrong key
   - Should show: "🔑 API key not configured. Please contact the app developer."

### Accessibility Test

1. **Keyboard navigation** - Use Tab key to navigate
   - Should be able to reach all inputs and buttons
   - Focus should be visible

2. **Screen reader** - Enable screen reader (if available)
   - Input fields should announce their purpose
   - Button states should be announced
   - Story should be announced when generated

### Mobile Test

1. **Open on mobile device** - Use the playtest URL on your phone
2. **Test touch interactions** - All buttons should be easy to tap
3. **Test input fields** - Mobile keyboard should work smoothly
4. **Check layout** - Everything should fit on screen without scrolling horizontally

## Expected Behavior

### ✅ Success Indicators

- Snoo changes states smoothly (greeting → thinking → celebrating)
- Stories are exactly 10 words long
- Stories incorporate all 3 input words
- Stories match the current theme
- Copy button works and shows confirmation
- Reset button clears everything properly
- Theme badge shows correct holiday

### ❌ Common Issues

**"GEMINI_API_KEY not configured"**
- Solution: Check your `.env` file exists and has the correct key

**"Network error"**
- Solution: Check your internet connection
- Solution: Restart the dev server (`npm run dev`)

**Stories don't match theme**
- This is normal - AI is creative! Stories should be loosely themed.

**TypeScript errors**
- Solution: Run `npm run type-check` to see specific errors
- Solution: Restart your IDE/editor

## Project Structure

```
src/
├── client/          # React frontend
│   ├── App.tsx      # Main app component
│   └── main.tsx     # Entry point
├── server/          # Express backend
│   ├── index.ts     # API routes
│   └── core/
│       ├── gemini.ts    # Gemini API client
│       └── post.ts      # Post creation
└── shared/          # Shared types
    └── types/
        ├── theme.ts     # Theme definitions
        └── api.ts       # API types
```

## Available Scripts

```bash
npm run dev          # Development mode (recommended)
npm run build        # Build for production
npm run deploy       # Build and upload to Reddit
npm run launch       # Build, upload, and publish
npm run check        # Type check and lint
```

## Technologies

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Express 5, Node.js
- **AI**: Google Gemini 1.5 Flash
- **Platform**: Reddit Devvit 0.12.0
- **Build**: Vite 6.2.4

## API Limits (Free Tier)

- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

Perfect for testing and moderate traffic!

## Troubleshooting

### Dev server won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clean build and rebuild
rm -rf dist
npm run build
```

### Playtest URL not working
```bash
# Login again
npm run login
# Restart dev server
npm run dev
```

## Contributing

This project uses the Kiro spec workflow. See `.kiro/specs/snoo-stories/` for:
- `requirements.md` - Feature requirements
- `design.md` - Technical design
- `tasks.md` - Implementation tasks

## License

BSD-3-Clause

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the Devvit docs: https://developers.reddit.com/docs
- Visit r/Devvit on Reddit

---

Built with ❤️ using Kiro AI and Reddit Devvit
