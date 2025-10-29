# Requirements Document

## Introduction

Snoo Stories is a themed AI story generator for Reddit where Snoo (Reddit's mascot) takes 3 user-provided words and creates a funny, themed 10-word story. The theme automatically changes based on current events and holidays (Halloween, Christmas, Valentine's Day, etc.), providing a unique and engaging experience. Snoo guides users through the experience with expressive reactions and animations.

The app is built as a Devvit interactive post that runs natively on Reddit, powered by Google Gemini AI (free tier). It provides instant entertainment, encourages creativity, and is perfect for sharing stories in Reddit comments.

## Requirements

### Requirement 1: Three-Word Story Input

**User Story:** As a Reddit user, I want to enter exactly 3 words so that Snoo can create a unique story from my input.

#### Acceptance Criteria

1. WHEN the user opens the app THEN the system SHALL display 3 input fields labeled "Word 1", "Word 2", and "Word 3"
2. WHEN the user types in an input field THEN the system SHALL limit each word to a maximum of 20 characters
3. WHEN the user clicks "Let Snoo Create!" without filling all 3 fields THEN the system SHALL display an alert message "Please enter all 3 words!"
4. WHEN the user enters whitespace-only text THEN the system SHALL treat it as empty and validate accordingly
5. WHEN the user has entered valid text in all 3 fields THEN the system SHALL enable the "Let Snoo Create!" button

### Requirement 2: AI Story Generation

**User Story:** As a Reddit user, I want Snoo to generate a creative 10-word story using my 3 words so that I can be entertained and share the result.

#### Acceptance Criteria

1. WHEN the user clicks "Let Snoo Create!" with 3 valid words THEN the system SHALL send a request to the Gemini API with the words and current theme context
2. WHEN the Gemini API is processing THEN the system SHALL display Snoo in "thinking" state with emoji 🤔 and text "Hmm... let me think..."
3. WHEN the story is successfully generated THEN the system SHALL display exactly 10 words incorporating all 3 user-provided words
4. WHEN the story is displayed THEN the system SHALL show Snoo in "celebrating" state with emoji ✨ and text "I made you a story!"
5. WHEN the API request fails THEN the system SHALL display an error message to the user
6. WHEN generating a story THEN the system SHALL use temperature 0.9 for creative variation
7. WHEN generating a story THEN the system SHALL ensure the story fits the current theme context

### Requirement 3: Automatic Theme Detection

**User Story:** As a Reddit user, I want the story theme to automatically match current holidays and seasons so that the experience feels timely and relevant.

#### Acceptance Criteria

1. WHEN the current date is in October THEN the system SHALL use the Halloween theme (🎃 emoji, spooky context)
2. WHEN the current date is in December THEN the system SHALL use the Christmas theme (🎄 emoji, festive context)
3. WHEN the current date is February 11-17 THEN the system SHALL use the Valentine's Day theme (💘 emoji, romantic context)
4. WHEN the current date is March 14-20 THEN the system SHALL use the St. Patrick's Day theme (🍀 emoji, Irish context)
5. WHEN the current date is in April THEN the system SHALL use the Easter theme (🐰 emoji, spring context)
6. WHEN the current date is June-August THEN the system SHALL use the Summer theme (☀️ emoji, beach context)
7. WHEN the current date doesn't match any holiday THEN the system SHALL use the default Classic theme (⭐ emoji, general fun context)
8. WHEN the app loads THEN the system SHALL display the current theme name and emoji in the top-right corner

### Requirement 4: Snoo Character States

**User Story:** As a Reddit user, I want Snoo to react expressively to different stages of the story creation process so that the experience feels interactive and engaging.

#### Acceptance Criteria

1. WHEN the app first loads THEN the system SHALL display Snoo in "greeting" state with emoji 👋 and text "Hi! Give me 3 words and I'll create a story!"
2. WHEN the user clicks "Let Snoo Create!" THEN the system SHALL transition Snoo to "thinking" state with emoji 🤔
3. WHEN the story generation completes successfully THEN the system SHALL transition Snoo to "celebrating" state with emoji ✨
4. WHEN an error occurs THEN the system SHALL transition Snoo to "idle" state with the current theme emoji
5. WHEN Snoo changes state THEN the system SHALL display the corresponding emoji with bounce animation
6. WHEN Snoo is displayed THEN the system SHALL show the Snoo mascot image below the emoji

### Requirement 5: Story Display and Reset

**User Story:** As a Reddit user, I want to see my generated story in an attractive format and easily create another story so that I can generate multiple stories in one session.

#### Acceptance Criteria

1. WHEN a story is generated THEN the system SHALL display it in a gradient card (orange to yellow) with large, bold text
2. WHEN a story is displayed THEN the system SHALL hide the input fields and "Let Snoo Create!" button
3. WHEN a story is displayed THEN the system SHALL show a "🎲 Create Another Story!" button
4. WHEN the user clicks "Create Another Story!" THEN the system SHALL clear all input fields
5. WHEN the user clicks "Create Another Story!" THEN the system SHALL reset Snoo to "greeting" state
6. WHEN the user clicks "Create Another Story!" THEN the system SHALL show the input fields again
7. WHEN a story is displayed THEN the system SHALL format it with quotation marks around the text

### Requirement 6: Visual Design and User Experience

**User Story:** As a Reddit user, I want the app to have an attractive, mobile-friendly design that feels native to Reddit so that I enjoy using it.

#### Acceptance Criteria

1. WHEN the app loads THEN the system SHALL display a gradient background from orange-50 to white
2. WHEN displaying input fields THEN the system SHALL use orange-500 focus borders matching Reddit's brand
3. WHEN displaying buttons THEN the system SHALL use orange-600 for primary actions and blue-600 for secondary actions
4. WHEN the user hovers over buttons THEN the system SHALL darken the button color
5. WHEN buttons are disabled THEN the system SHALL reduce opacity to 50% and show not-allowed cursor
6. WHEN displaying content THEN the system SHALL center all elements vertically and horizontally
7. WHEN on mobile devices THEN the system SHALL ensure all elements are responsive and touch-friendly
8. WHEN the app is displayed THEN the system SHALL show "Powered by Snoo & Gemini AI ✨" in the footer

### Requirement 7: API Configuration and Error Handling

**User Story:** As a developer, I want proper API configuration and error handling so that the app works reliably and provides helpful feedback when issues occur.

#### Acceptance Criteria

1. WHEN the server starts THEN the system SHALL load the GEMINI_API_KEY from environment variables
2. WHEN the API key is missing THEN the system SHALL return a 500 error with message "GEMINI_API_KEY not configured"
3. WHEN the user submits fewer or more than 3 words THEN the system SHALL return a 400 error with message "Exactly 3 words are required"
4. WHEN any word is empty or whitespace-only THEN the system SHALL return a 400 error with message "All 3 words must be non-empty"
5. WHEN the Gemini API request fails THEN the system SHALL log the error to console and return a 500 error with the error message
6. WHEN an error occurs THEN the system SHALL display the error message to the user in the story display area
7. WHEN making API requests THEN the system SHALL use the generativelanguage.googleapis.com domain configured in devvit.json

### Requirement 8: Performance and Rate Limits

**User Story:** As a developer, I want the app to work within Gemini's free tier limits so that it remains free to operate.

#### Acceptance Criteria

1. WHEN generating stories THEN the system SHALL stay within Gemini's free tier limit of 15 requests per minute
2. WHEN generating stories THEN the system SHALL stay within Gemini's free tier limit of 1,500 requests per day
3. WHEN generating a story THEN the system SHALL complete within 1-3 seconds under normal conditions
4. WHEN the API request takes longer than 30 seconds THEN the system SHALL timeout per Devvit's HTTP fetch limit
5. WHEN generating stories THEN the system SHALL use the gemini-1.5-flash model for optimal speed and cost
6. WHEN generating stories THEN the system SHALL limit max output tokens to 100 to keep responses concise
