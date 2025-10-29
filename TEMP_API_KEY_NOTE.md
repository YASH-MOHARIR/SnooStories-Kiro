# ⚠️ TEMPORARY API KEY - FOR TESTING ONLY

## What Was Done

The Gemini API key has been **temporarily hardcoded** in `src/server/index.ts` to enable testing.

**File:** `src/server/index.ts`
**Line:** ~165
```typescript
const apiKey = 'AIzaSyBEvEfgNibbtItv5Cehr6Ci-VYLRneqrNc';
```

## Why This Was Necessary

Devvit playtest mode doesn't support:
- `.env` files
- `dotenv-cli` 
- `process.env` variables in the standard way

This is a known limitation of Devvit's development environment.

## ⚠️ IMPORTANT: Before Committing

This hardcoded key is **ONLY for testing**. Before committing to git:

1. **Option A: Remove the key** (recommended for public repos)
   - Replace with: `const apiKey = process.env.GEMINI_API_KEY || '';`
   - Document that users need to configure via Devvit settings

2. **Option B: Keep for private repo** (if this is private)
   - Add a TODO comment
   - Document in README that key needs to be changed for production

## For Production Deployment

When deploying with `devvit upload`:
1. The app will use Devvit's settings system
2. Configure the API key at: https://developers.reddit.com/apps
3. The `settings` in `devvit.json` will handle this

## Current Status

✅ API key is hardcoded for testing
✅ App should now work in playtest mode
⚠️ Need to decide on commit strategy before pushing

---

**Next Step:** Test the app now with `npm run dev` - it should work!
