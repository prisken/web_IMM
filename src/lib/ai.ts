// import OpenAI from 'openai';
// import { StoryboardGenerationRequest, GeneratedStoryboard, StoryboardScene } from './types';

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Storyboard generation prompts
// const BUSINESS_TVC_PROMPT = `You are a creative director at a media production house. Create a compelling TV commercial storyboard based on the following information:

// Industry: {industry}
// Target Audience: {targetAudience}
// Budget: {budget}
// Objectives: {objectives}
// Tone: {tone}
// Key Message: {keyMessage}
// Duration: {duration}

// Create a detailed storyboard with 5-8 scenes that:
// 1. Captures attention in the first 3 seconds
// 2. Clearly communicates the key message
// 3. Includes specific visual descriptions
// 4. Provides camera direction and timing
// 5. Suggests emotional beats and transitions

// Format each scene as:
// Scene [Number]: [Brief description]
// Visual: [Detailed visual description]
// Duration: [X seconds]
// Camera: [Camera direction and movement]
// Audio: [Voiceover, music, or sound effects notes]`;

// const KOL_VIDEO_PROMPT = `You are a content strategist specializing in influencer marketing. Create an engaging video storyboard for a KOL (Key Opinion Leader) based on the following information:

// Platform: {platform}
// Content Type: {contentType}
// Target Audience: {targetAudience}
// Brand Collaboration: {brandCollaboration}
// Style: {style}
// Duration: {duration}
// Topics: {topics}

// Create a detailed storyboard with 4-6 scenes that:
// 1. Opens with a hook to capture attention
// 2. Maintains platform-specific best practices
// 3. Includes authentic storytelling elements
// 4. Provides clear visual and audio direction
// 5. Optimizes for engagement and sharing

// Format each scene as:
// Scene [Number]: [Brief description]
// Visual: [Detailed visual description]
// Duration: [X seconds]
// Camera: [Camera direction and movement]
// Audio: [Voiceover, music, or sound effects notes]`;

// interface ParsedScene {
//   sceneNumber: number;
//   description: string;
//   visual: string;
//   duration: number;
//   audioNotes: string;
//   cameraNotes: string;
// }

// export async function generateStoryboard(request: StoryboardGenerationRequest): Promise<GeneratedStoryboard> { ... }

// function parseStoryboardContent(content: string): ParsedScene[] { ... }

// async function generateVisualPrompt(scene: ParsedScene, formType: string): Promise<string> { ... }

// export async function generateImage(prompt: string): Promise<string> { ... }

// All OpenAI-related code has been commented out for project cleanup.
// Add your own AI integration or mock functions here as needed.

export {}; 