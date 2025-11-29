import OpenAI from 'openai';

// Use a dummy key during build to prevent crashes.
// At runtime, the real key from environment variables will be used.
const apiKey = process.env.OPENAI_API_KEY || 'dummy-key-for-build';

if (!process.env.OPENAI_API_KEY) {
  // Only warn in development or production runtime, not during build if possible
  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ Missing OPENAI_API_KEY. API calls will fail.');
  }
}

export const openai = new OpenAI({
  apiKey: apiKey,
});