import { useState, useEffect } from 'react';
import { getCurrentTheme } from '../shared/types/theme';

type SnooState = 'greeting' | 'thinking' | 'celebrating' | 'idle';

export const App = () => {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [word3, setWord3] = useState('');
  const [story, setStory] = useState('');
  const [snooState, setSnooState] = useState<SnooState>('greeting');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(getCurrentTheme());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Update theme on mount
    setTheme(getCurrentTheme());
  }, []);

  const generateStory = async () => {
    if (!word1.trim() || !word2.trim() || !word3.trim()) {
      alert('Please enter all 3 words!');
      return;
    }

    setLoading(true);
    setSnooState('thinking');
    setStory('');

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          words: [word1.trim(), word2.trim(), word3.trim()],
          themeContext: theme.promptContext,
        }),
      });

      const data = await response.json();

      if (data.story) {
        setStory(data.story);
        setSnooState('celebrating');
      } else {
        // Enhanced error messages
        let errorMsg = data.message || 'Something went wrong!';
        if (errorMsg.includes('GEMINI_API_KEY')) {
          errorMsg = '🔑 API key not configured. Please contact the app developer.';
        } else if (errorMsg.includes('rate limit') || errorMsg.includes('429')) {
          errorMsg = '⏰ Too many requests! Please wait a moment and try again.';
        } else if (errorMsg.includes('timeout') || errorMsg.includes('30')) {
          errorMsg = '⏱️ Request timed out. Please try again.';
        }
        setStory(errorMsg);
        setSnooState('idle');
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message.includes('fetch')
            ? '🌐 Network error. Please check your connection and try again.'
            : error.message
          : '❌ Something unexpected happened. Please try again.';
      setStory(errorMsg);
      setSnooState('idle');
    }

    setLoading(false);
  };

  const reset = () => {
    setWord1('');
    setWord2('');
    setWord3('');
    setStory('');
    setSnooState('greeting');
    setCopied(false);
  };

  const copyStory = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy story. Please try again.');
    }
  };

  const getSnooDisplay = () => {
    switch (snooState) {
      case 'greeting':
        return { emoji: '👋', text: "Hi! Give me 3 words and I'll create a story!" };
      case 'thinking':
        return { emoji: '🤔', text: 'Hmm... let me think...' };
      case 'celebrating':
        return { emoji: '✨', text: 'I made you a story!' };
      default:
        return { emoji: theme.emoji, text: theme.snooDescription };
    }
  };

  const snooDisplay = getSnooDisplay();

  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-6 p-4 bg-gradient-to-b from-orange-50 to-white">
      {/* Theme Badge */}
      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm text-sm">
        {theme.emoji} {theme.name}
      </div>

      {/* Snoo Character */}
      <div className="flex flex-col items-center gap-3">
        <div className="text-8xl animate-bounce">{snooDisplay.emoji}</div>
        <img className="object-contain w-32 h-32" src="/snoo.png" alt="Snoo" />
      </div>

      {/* Snoo Speech */}
      <div className="bg-white px-6 py-3 rounded-2xl shadow-md max-w-md text-center">
        <p className="text-lg font-medium text-gray-800">{snooDisplay.text}</p>
      </div>

      {/* Input Section */}
      {!story && (
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Word 1"
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-center font-medium"
              disabled={loading}
              maxLength={20}
              aria-label="First word for story"
              aria-required="true"
            />
            <input
              type="text"
              placeholder="Word 2"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-center font-medium"
              disabled={loading}
              maxLength={20}
              aria-label="Second word for story"
              aria-required="true"
            />
            <input
              type="text"
              placeholder="Word 3"
              value={word3}
              onChange={(e) => setWord3(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-center font-medium"
              disabled={loading}
              maxLength={20}
              aria-label="Third word for story"
              aria-required="true"
            />
          </div>

          <button
            onClick={generateStory}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            aria-label={loading ? 'Generating story, please wait' : 'Generate story from your three words'}
          >
            {loading ? '✨ Creating Magic...' : '✨ Let Snoo Create!'}
          </button>
        </div>
      )}

      {/* Story Display */}
      {story && (
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <div
            className="bg-gradient-to-r from-orange-100 to-yellow-100 px-6 py-6 rounded-2xl shadow-lg w-full"
            role="article"
            aria-label="Generated story"
          >
            <p className="text-xl font-bold text-gray-900 text-center leading-relaxed">
              "{story}"
            </p>
          </div>

          <div className="flex gap-2 w-full">
            <button
              onClick={copyStory}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
              aria-label={copied ? 'Story copied to clipboard' : 'Copy story to clipboard'}
            >
              {copied ? '✓ Copied!' : '📋 Copy Story'}
            </button>
            <button
              onClick={reset}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
              aria-label="Create another story with new words"
            >
              🎲 Create Another!
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-gray-500">
        Powered by Snoo & Gemini AI ✨
      </div>
    </div>
  );
};
