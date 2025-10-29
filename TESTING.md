# Testing Instructions for Snoo Stories

## Prerequisites

✅ `.env` file created with valid `GEMINI_API_KEY`
✅ Dependencies installed (`npm install`)
✅ Logged into Devvit (`npm run login`)

## Start Testing

### 1. Start the Development Server

```bash
npm run dev
```

Wait for the output showing the playtest URL:
```
Playtest URL: https://www.reddit.com/r/your-app_dev?playtest=your-app
```

### 2. Open the Playtest URL

Copy the URL and open it in your browser. You should see a Reddit post with a "Launch App" button.

## Test Checklist

### ✅ Basic Functionality

- [ ] **App loads** - Snoo appears with 👋 emoji and greeting message
- [ ] **Theme badge** - Top-right shows current theme (e.g., "⭐ Classic")
- [ ] **Three input fields** - All visible and labeled "Word 1", "Word 2", "Word 3"
- [ ] **Button enabled** - "✨ Let Snoo Create!" button is clickable

### ✅ Story Generation

Test with these word combinations:

**Test 1: "pizza, vampire, bicycle"**
- [ ] Enter the three words
- [ ] Click "Let Snoo Create!"
- [ ] Snoo changes to 🤔 thinking state
- [ ] Message shows "Hmm... let me think..."
- [ ] Story appears in 1-3 seconds
- [ ] Snoo changes to ✨ celebrating state
- [ ] Message shows "I made you a story!"
- [ ] Story is displayed in gradient card with quotes
- [ ] Story contains all 3 words (or variations)
- [ ] Story is approximately 10 words long

**Test 2: "cat, mirror, midnight"**
- [ ] Repeat the process above
- [ ] Story should be different from Test 1
- [ ] All 3 words should appear in the story

**Test 3: "zombie, dance, disco"**
- [ ] Repeat the process
- [ ] Verify unique story generation

### ✅ Copy Feature

- [ ] Click "📋 Copy Story" button
- [ ] Button changes to "✓ Copied!"
- [ ] Button reverts back after 2 seconds
- [ ] Paste the story somewhere (notepad, comment box)
- [ ] Verify the story text was copied correctly

### ✅ Reset Feature

- [ ] Click "🎲 Create Another!" button
- [ ] All input fields clear
- [ ] Story disappears
- [ ] Snoo returns to 👋 greeting state
- [ ] Message returns to "Hi! Give me 3 words and I'll create a story!"
- [ ] Can enter new words and generate again

### ✅ Input Validation

**Empty Fields Test:**
- [ ] Leave all fields empty
- [ ] Click "Let Snoo Create!"
- [ ] Alert appears: "Please enter all 3 words!"

**Partial Input Test:**
- [ ] Enter only 1 or 2 words
- [ ] Click "Let Snoo Create!"
- [ ] Alert appears: "Please enter all 3 words!"

**Whitespace Test:**
- [ ] Enter spaces only in fields
- [ ] Click "Let Snoo Create!"
- [ ] Should show validation error

**Max Length Test:**
- [ ] Try typing more than 20 characters in a field
- [ ] Should stop at 20 characters

### ✅ Error Handling

**Invalid API Key Test:**
1. Stop the dev server
2. Change `.env` to have wrong API key
3. Restart dev server
4. Try to generate a story
- [ ] Error message appears: "🔑 API key not configured..."
- [ ] Snoo changes to idle state

**Network Error Test:**
1. Disconnect from internet
2. Try to generate a story
- [ ] Error message appears: "🌐 Network error..."
- [ ] Snoo changes to idle state

### ✅ Accessibility

**Keyboard Navigation:**
- [ ] Press Tab to move between inputs
- [ ] All inputs and buttons are reachable
- [ ] Focus indicators are visible
- [ ] Can press Enter in last input to submit (if implemented)

**ARIA Labels:**
- [ ] Inspect input fields - should have `aria-label` attributes
- [ ] Inspect buttons - should have descriptive `aria-label`
- [ ] Story card should have `role="article"`

### ✅ Visual Design

**Layout:**
- [ ] Gradient background (orange to white)
- [ ] Snoo emoji bounces
- [ ] Snoo image displays below emoji
- [ ] Speech bubble is white with rounded corners
- [ ] Input fields have orange focus border
- [ ] Buttons have proper colors (orange, green, blue)
- [ ] Story card has gradient (orange to yellow)

**Responsive Design:**
- [ ] Resize browser window
- [ ] All elements remain centered
- [ ] No horizontal scrolling
- [ ] Text remains readable at all sizes

**Button States:**
- [ ] Hover over buttons - color darkens
- [ ] Disabled button (during loading) - opacity 50%
- [ ] Loading button shows "✨ Creating Magic..."

### ✅ Mobile Testing (if available)

- [ ] Open playtest URL on mobile device
- [ ] All elements fit on screen
- [ ] Input fields work with mobile keyboard
- [ ] Buttons are easy to tap (not too small)
- [ ] Story is readable without zooming
- [ ] Copy button works on mobile

### ✅ Theme Testing

**Current Theme Display:**
- [ ] Check top-right corner for theme badge
- [ ] Verify it matches current date:
  - October → 🎃 Halloween
  - December → 🎄 Christmas
  - Feb 11-17 → 💘 Valentine's Day
  - Mar 14-20 → 🍀 St. Patrick's Day
  - April → 🐰 Easter
  - June-Aug → ☀️ Summer
  - Other → ⭐ Classic

**Theme Context in Stories:**
- [ ] Stories should loosely match the theme
- [ ] Halloween: spooky elements
- [ ] Christmas: festive elements
- [ ] Valentine's: romantic elements
- [ ] etc.

### ✅ Performance

- [ ] Story generation completes in 1-3 seconds
- [ ] No lag when typing in input fields
- [ ] Smooth state transitions
- [ ] No console errors (check browser DevTools)

## Success Criteria

### All tests should pass with these results:

✅ **Functionality**: All features work as expected
✅ **User Experience**: Smooth, intuitive, delightful
✅ **Error Handling**: Clear, helpful error messages
✅ **Accessibility**: Keyboard navigation and ARIA labels work
✅ **Performance**: Fast response times, no lag
✅ **Visual Design**: Attractive, responsive, on-brand

## Common Issues & Solutions

### Issue: "GEMINI_API_KEY not configured"
**Solution**: 
1. Check `.env` file exists in project root
2. Verify API key is correct
3. Restart dev server

### Issue: Stories don't appear
**Solution**:
1. Check browser console for errors (F12)
2. Verify internet connection
3. Check Gemini API status
4. Verify API key has quota remaining

### Issue: TypeScript errors
**Solution**:
```bash
npm run type-check
```
Fix any reported errors

### Issue: Build fails
**Solution**:
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Playtest URL doesn't work
**Solution**:
```bash
npm run login
npm run dev
```

## Reporting Issues

If you find any issues during testing:

1. **Note the exact steps** to reproduce
2. **Check browser console** for errors (F12 → Console tab)
3. **Check terminal** for server errors
4. **Take screenshots** if visual issues
5. **Document expected vs actual behavior**

## After Testing

Once all tests pass, you're ready to:

1. **Commit changes** with proper message
2. **Deploy to Reddit** with `npm run deploy`
3. **Publish** with `npm run launch` (for review)

---

## Quick Test Script

For rapid testing, try this sequence:

1. ✅ Load app → See greeting
2. ✅ Enter "cat, moon, dance" → Generate story
3. ✅ Copy story → Verify clipboard
4. ✅ Create another → Reset works
5. ✅ Enter "pizza, robot, beach" → Generate again
6. ✅ Leave fields empty → See validation
7. ✅ Check theme badge → Correct theme
8. ✅ Test keyboard navigation → Tab through fields

**Total time: ~3 minutes**

If all 8 steps pass, the app is working correctly! 🎉
