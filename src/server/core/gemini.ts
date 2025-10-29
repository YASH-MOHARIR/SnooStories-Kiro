/**
 * Google Gemini API integration
 * Free tier: 15 RPM, 1M TPM, 1500 RPD
 * Docs: https://ai.google.dev/gemini-api/docs
 */

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

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

export class GeminiClient {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gemini-1.5-flash-latest') {
    this.apiKey = apiKey;
    this.model = model;
  }

  /**
   * Generate a 10-word story based on 3 words and theme
   */
  async generateStory(words: string[], themeContext: string): Promise<string> {
    const prompt = `You are a creative storyteller. Create a ${themeContext} story using these 3 words: ${words.join(', ')}.

RULES:
- The story must be EXACTLY 10 words long
- Must be funny, clever, or surprising
- Must incorporate all 3 words naturally
- Must fit the ${themeContext} theme
- No extra punctuation or formatting
- Just the 10-word story, nothing else

Example format: "Vampire ordered pizza delivery but bicycle courier arrived at sunrise."

Now create your 10-word story:`;

    return this.generateContent(prompt, { temperature: 0.9, maxTokens: 100 });
  }

  /**
   * Generate content using Gemini API
   */
  async generateContent(
    prompt: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1/models/${this.model}:generateContent?key=${this.apiKey}`;

    const requestBody: GeminiRequest = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 1000,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${error}`);
    }

    const data: GeminiResponse = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  }

  /**
   * Chat with conversation history
   */
  async chat(messages: { role: 'user' | 'model'; text: string }[]): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1/models/${this.model}:generateContent?key=${this.apiKey}`;

    const requestBody: GeminiRequest = {
      contents: messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${error}`);
    }

    const data: GeminiResponse = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  }
}
