import OpenAI from 'openai';

// Types for storyboard generation
export interface StoryboardFrame {
  id: number;
  description: string;
  visual: string;
  duration: number;
  camera: string;
  audio: string;
  imageUrl?: string;
}

export interface GeneratedStoryboard {
  frames: StoryboardFrame[];
  summary: string;
  totalDuration: number;
  estimatedBudget: string;
}

export interface StoryboardRequest {
  projectType: string;
  industry: string;
  targetAudience: string;
  brandName: string;
  productDescription: string;
  keyMessage: string;
  tone: string;
  duration: string;
  budget: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

// Baidu Wenxin API configuration
const WENXIN_API_KEY = process.env.WENXIN_API_KEY;
const WENXIN_SECRET_KEY = process.env.WENXIN_SECRET_KEY;
const WENXIN_MODEL = process.env.WENXIN_MODEL || 'ernie-bot-4';

// Stable Diffusion API configuration
const STABLE_DIFFUSION_API_URL = process.env.STABLE_DIFFUSION_API_URL || 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
const STABLE_DIFFUSION_API_KEY = process.env.STABLE_DIFFUSION_API_KEY;

// Helper function to get Baidu Wenxin access token
async function getWenxinAccessToken(): Promise<string> {
  if (!WENXIN_API_KEY || !WENXIN_SECRET_KEY) {
    throw new Error('Baidu Wenxin API key or secret key not configured');
  }

  const response = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${WENXIN_API_KEY}&client_secret=${WENXIN_SECRET_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Baidu Wenxin token error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Helper function to call Baidu Wenxin API
async function callWenxinAPI(prompt: string, systemPrompt?: string) {
  const accessToken = await getWenxinAccessToken();
  
  const messages = [];
  
  if (systemPrompt) {
    messages.push({
      role: 'system',
      content: systemPrompt
    });
  }
  
  messages.push({
    role: 'user',
    content: prompt
  });

  const response = await fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${WENXIN_MODEL}?access_token=${accessToken}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: messages,
      temperature: 0.7,
      top_p: 0.95,
      max_output_tokens: 4000,
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Baidu Wenxin API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.result) {
    throw new Error('No response from Baidu Wenxin API');
  }

  return data.result;
}

// Storyboard generation prompts optimized for LLaVA
const BUSINESS_TVC_PROMPT = `You are a creative director at a media production house. Create a compelling TV commercial storyboard based on the following information:

Industry: {industry}
Target Audience: {targetAudience}
Budget: {budget}
Brand: {brandName}
Product: {productDescription}
Key Message: {keyMessage}
Tone: {tone}
Duration: {duration}

CRITICAL LANGUAGE REQUIREMENT: {languageRequirement}

Create a detailed storyboard with 4-6 scenes that:
1. Captures attention in the first 3 seconds
2. Clearly communicates the key message
3. Includes specific visual descriptions suitable for image generation
4. Provides camera direction and timing
5. Suggests emotional beats and transitions

For each scene, provide a detailed visual description that can be used to generate an image. Focus on:
- Composition and framing
- Lighting and mood
- Colors and visual style
- Key visual elements and props
- Character positioning and expressions

IMPORTANT: Keep brand names, product names, and company names exactly as provided. Translate all other content to the specified language.

Format each scene as JSON:
{
  "id": 1,
  "description": "Brief scene description",
  "visual": "Detailed visual description for image generation with specific visual details",
  "duration": 5,
  "camera": "Camera direction and movement",
  "audio": "Voiceover, music, or sound effects notes"
}

Return only valid JSON array of scenes.`;

const KOL_VIDEO_PROMPT = `You are a content strategist specializing in influencer marketing. Create an engaging video storyboard for a KOL (Key Opinion Leader) based on the following information:

Platform: {projectType}
Content Type: {projectType}
Target Audience: {targetAudience}
Brand Collaboration: {brandName}
Product: {productDescription}
Style: {tone}
Duration: {duration}
Key Message: {keyMessage}

CRITICAL LANGUAGE REQUIREMENT: {languageRequirement}

Create a detailed storyboard with 4-6 scenes that:
1. Opens with a hook to capture attention
2. Maintains platform-specific best practices
3. Includes authentic storytelling elements
4. Provides clear visual and audio direction
5. Optimizes for engagement and sharing

For each scene, provide a detailed visual description that can be used to generate an image. Focus on:
- Social media-friendly composition
- Authentic, relatable visuals
- Platform-specific visual style
- Product integration
- Emotional connection

IMPORTANT: Keep brand names, product names, and company names exactly as provided. Translate all other content to the specified language.

Format each scene as JSON:
{
  "id": 1,
  "description": "Brief scene description",
  "visual": "Detailed visual description for image generation with specific visual details",
  "duration": 5,
  "camera": "Camera direction and movement",
  "audio": "Voiceover, music, or sound effects notes"
}

Return only valid JSON array of scenes.`;

// Simple translation fallback for when LLaVA doesn't generate Chinese content
async function translateToChinese(text: string): Promise<string> {
  try {
    const translationPrompt = `Translate the following English text to Traditional Chinese (繁體中文). Keep brand names, product names, and company names exactly as provided. Only translate the content, not the JSON structure:

${text}

Return only the translated text with the same JSON structure.`;

    const data = await callWenxinAPI(translationPrompt);
    return data.trim();
  } catch (error) {
    console.error('Error translating to Chinese:', error);
    return text; // Return original if translation fails
  }
}

// Check if content is in English (simple heuristic)
function isEnglishContent(text: string): boolean {
  const englishWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'down', 'out', 'off', 'over', 'under'];
  const words = text.toLowerCase().split(/\s+/);
  const englishWordCount = words.filter(word => englishWords.includes(word)).length;
  return englishWordCount > words.length * 0.1; // If more than 10% are English words
}

// Generate storyboard using LLaVA
async function generateStoryboardText(request: StoryboardRequest, locale: string = 'en'): Promise<StoryboardFrame[]> {
  try {
    const prompt = request.projectType === 'kol' ? KOL_VIDEO_PROMPT : BUSINESS_TVC_PROMPT;
    
    // Add explicit language instruction based on locale
    const languageRequirement = locale === 'zh' 
      ? 'You MUST generate the ENTIRE storyboard in Traditional Chinese (繁體中文). This includes all descriptions, camera directions, and audio notes. Keep brand names, product names, and company names exactly as provided by the user. Translate ALL other content to Chinese. Do not use any English words except for brand/product names.'
      : 'Generate the storyboard in English.';
    
    const filledPrompt = prompt
      .replace('{languageRequirement}', languageRequirement)
      .replace('{industry}', request.industry)
      .replace('{targetAudience}', request.targetAudience)
      .replace('{budget}', request.budget)
      .replace('{brandName}', request.brandName)
      .replace('{productDescription}', request.productDescription)
      .replace('{keyMessage}', request.keyMessage)
      .replace('{tone}', request.tone)
      .replace('{duration}', request.duration);

    const content = await callWenxinAPI(filledPrompt);

    // Extract JSON from the response - try multiple patterns
    let jsonContent = '';
    let jsonMatch = content.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      // Try to find JSON object instead of array
      jsonMatch = content.match(/\{[\s\S]*\}/);
    }
    
    if (!jsonMatch) {
      // Try to extract content between markdown code blocks
      jsonMatch = content.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
      if (jsonMatch) {
        jsonContent = jsonMatch[1];
      }
    } else {
      jsonContent = jsonMatch[0];
    }
    
    if (!jsonContent) {
      console.error('Raw AI response:', content);
      throw new Error('No valid JSON found in response');
    }
    
    // If locale is Chinese but content appears to be in English, try to translate it
    if (locale === 'zh' && isEnglishContent(jsonContent)) {
          try {
      const translatedContent = await translateToChinese(jsonContent);
      const translatedJsonMatch = translatedContent.match(/\[[\s\S]*\]/);
      if (translatedJsonMatch) {
        jsonContent = translatedJsonMatch[0];
      }
    } catch (translationError) {
      console.error('Translation failed, using original content:', translationError);
    }
    }

    let frames;
    try {
      frames = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('JSON content:', jsonContent);
      throw new Error('Invalid JSON format in AI response');
    }
    
    // Ensure frames is an array
    if (!Array.isArray(frames)) {
      if (typeof frames === 'object' && frames.frames) {
        frames = frames.frames;
      } else {
        throw new Error('AI response does not contain a valid frames array');
      }
    }
    
    return frames.map((frame: any, index: number) => ({
      id: frame.id || index + 1,
      description: frame.description || '',
      visual: frame.visual || '',
      duration: frame.duration || 5,
      camera: frame.camera || '',
      audio: frame.audio || '',
    }));
  } catch (error) {
    console.error('Error generating storyboard text:', error);
    // Fallback to template-based generation
    return generateFallbackStoryboard(request);
  }
}

// Generate enhanced image description using LLaVA
async function generateEnhancedImageDescription(prompt: string, locale: string = 'en'): Promise<string> {
  try {
    const language = locale === 'zh' ? 'Traditional Chinese' : 'English';
    
    const enhancedPrompt = `You are a professional visual artist and cinematographer. Based on this storyboard scene description: "${prompt}", create a detailed, high-quality image generation prompt that will produce a stunning visual for a commercial or creative project. 

Focus on:
- Professional commercial photography/cinematography style
- High-quality lighting and composition
- Clear visual storytelling
- Modern, clean aesthetic
- Professional color grading
- Appropriate and professional content suitable for commercial use

Generate the prompt in ${language}. Keep it concise but detailed (around 50-80 words). Focus on the visual elements that will create the most impactful image. Ensure the content is professional and suitable for commercial advertising.`;

    const content = await callWenxinAPI(enhancedPrompt);
    const enhancedDescription = content?.trim() || prompt;
    
    return enhancedDescription;
  } catch (error) {
    console.error('Error generating enhanced image description:', error);
    return prompt; // Fallback to original prompt
  }
}

// Translate Chinese prompt to English for Stable Diffusion
async function translatePromptToEnglish(prompt: string): Promise<string> {
  try {
    // Check if the prompt contains Chinese characters
    const hasChinese = /[\u4e00-\u9fff]/.test(prompt);
    if (!hasChinese) {
      return prompt;
    }
    
    const content = await callWenxinAPI(`You are a professional translator. Translate the following Chinese text to English for image generation purposes. Keep the translation professional, accurate, and suitable for AI image generation. Only return the English translation, nothing else:

Chinese text: ${prompt}

English translation:`);
    const translatedPrompt = content?.trim();
    
    if (translatedPrompt && translatedPrompt.length > 10 && !/[\u4e00-\u9fff]/.test(translatedPrompt)) {
      return translatedPrompt;
    } else {
      return prompt;
    }
  } catch (error) {
    console.warn('Translation error, using original prompt:', error);
    return prompt;
  }
}

// Truncate prompt to fit Stable Diffusion API limits
function truncatePrompt(prompt: string, maxLength: number = 1900): string {
  if (prompt.length <= maxLength) {
    return prompt;
  }
  
  // Try to truncate at a sentence boundary
  const truncated = prompt.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastComma = truncated.lastIndexOf(',');
  const lastSpace = truncated.lastIndexOf(' ');
  
  const cutPoint = Math.max(lastPeriod, lastComma, lastSpace);
  
  if (cutPoint > maxLength * 0.8) { // Only use if we're not cutting too early
    return truncated.substring(0, cutPoint + 1);
  }
  
  return truncated;
}

// Generate image using Stable Diffusion API
async function generateImageWithStableDiffusion(prompt: string): Promise<string> {
  if (!STABLE_DIFFUSION_API_KEY) {
    throw new Error('Stable Diffusion API key not configured');
  }

  try {
    // Translate Chinese prompt to English for Stable Diffusion
    const englishPrompt = await translatePromptToEnglish(prompt);
    
    // Truncate the prompt to fit API limits
    const truncatedPrompt = truncatePrompt(englishPrompt);
    
    const response = await fetch(STABLE_DIFFUSION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STABLE_DIFFUSION_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: truncatedPrompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
        style_preset: 'photographic'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorData = JSON.parse(errorText);
      
      // Handle content moderation errors gracefully
      if (response.status === 403 && errorData.message?.includes('content moderation')) {
        console.warn('Content moderation triggered, using fallback image');
        return `/api/placeholder/512/512?text=Professional+Commercial+Image&desc=${encodeURIComponent('Professional commercial photography suitable for advertising')}`;
      }
      
      // Handle language errors gracefully
      if (response.status === 403 && errorData.message?.includes('English is the only language supported')) {
        console.warn('Language error, attempting to translate and retry');
        const englishPrompt = await translatePromptToEnglish(prompt);
        if (englishPrompt !== prompt) {
          // Retry with English prompt
          return generateImageWithStableDiffusion(englishPrompt);
        }
      }
      
      throw new Error(`Stable Diffusion API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.artifacts || data.artifacts.length === 0) {
      throw new Error('No image generated by Stable Diffusion');
    }

    // Convert base64 to data URL
    const imageData = data.artifacts[0].base64;
    const dataUrl = `data:image/png;base64,${imageData}`;
    
    return dataUrl;
  } catch (error) {
    console.error('Error generating image with Stable Diffusion:', error);
    throw error;
  }
}

// Generate images using Stable Diffusion directly from LLaVA prompts
async function generateImage(prompt: string, locale: string = 'en'): Promise<string> {
  try {
    // Generate an enhanced image description using LLaVA
    const enhancedDescription = await generateEnhancedImageDescription(prompt, locale);
    
    // Generate the actual image using Stable Diffusion
    const imageDataUrl = await generateImageWithStableDiffusion(enhancedDescription);
    
    return imageDataUrl;
  } catch (error) {
    console.error('Error in generateImage:', error);
    // Return a placeholder image URL as fallback
    const placeholderUrl = `/api/placeholder/512/512?text=Image+Generation+Failed&desc=${encodeURIComponent(prompt)}`;
    return placeholderUrl;
  }
}

// Fallback storyboard generation
function generateFallbackStoryboard(request: StoryboardRequest): StoryboardFrame[] {
  const baseFrames = [
    {
      id: 1,
      description: "Opening shot establishing the brand and product",
      visual: `${request.tone} commercial opening shot featuring ${request.brandName} product in ${request.industry} setting`,
      duration: 3,
      camera: "Wide establishing shot",
      audio: "Upbeat background music, brand jingle"
    },
    {
      id: 2,
      description: "Product demonstration and key features",
      visual: `${request.tone} product demonstration showing ${request.productDescription} with ${request.targetAudience}`,
      duration: 5,
      camera: "Medium close-up, smooth tracking",
      audio: "Professional voiceover explaining benefits"
    },
    {
      id: 3,
      description: "Target audience using the product",
      visual: `${request.tone} lifestyle shot of ${request.targetAudience} using ${request.brandName} product`,
      duration: 4,
      camera: "Medium shot, natural lighting",
      audio: "Authentic sound effects, subtle music"
    },
    {
      id: 4,
      description: "Call to action with brand reinforcement",
      visual: `${request.tone} closing shot with ${request.brandName} logo and ${request.keyMessage}`,
      duration: 3,
      camera: "Close-up on logo, pull back to wide",
      audio: "Strong call-to-action voiceover, brand music"
    }
  ];

  return baseFrames;
}

// Main storyboard generation function
export async function generateStoryboard(request: StoryboardRequest, locale: string = 'en'): Promise<GeneratedStoryboard> {
  try {
    // Generate storyboard text using LLaVA with locale
    const frames = await generateStoryboardText(request, locale);
    
    // Generate images for each frame using LLaVA's image generation capabilities
    const framesWithImages = await Promise.all(
      frames.map(async (frame, index) => {
        try {
          const imageUrl = await generateImage(frame.visual, locale);
          return { ...frame, imageUrl };
        } catch (error) {
          console.error(`Error generating image for frame ${index + 1}:`, error);
          // Return frame with placeholder image
          const placeholderUrl = `/api/placeholder/512/512?text=Image+Failed&desc=${encodeURIComponent(frame.visual)}`;
          return { ...frame, imageUrl: placeholderUrl };
        }
      })
    );

    // Calculate total duration
    const totalDuration = framesWithImages.reduce((sum, frame) => sum + frame.duration, 0);

    // Generate budget estimate
    const budgetEstimate = calculateBudgetEstimate(request.budget, totalDuration, request.projectType);

    // Generate summary
    const summary = `A ${request.tone} ${request.projectType} for ${request.brandName} targeting ${request.targetAudience} in the ${request.industry} industry. The ${totalDuration}-second video communicates "${request.keyMessage}" through ${framesWithImages.length} compelling scenes.`;

    return {
      frames: framesWithImages,
      summary,
      totalDuration,
      estimatedBudget: budgetEstimate,
    };
  } catch (error) {
    console.error('Error in storyboard generation:', error);
    throw new Error('Failed to generate storyboard. Please try again.');
  }
}

// Budget estimation function
function calculateBudgetEstimate(budget: string, duration: number, projectType: string): string {
  const baseRates = {
    low: { perSecond: 1000, base: 5000 },
    medium: { perSecond: 2000, base: 10000 },
    high: { perSecond: 3500, base: 20000 },
    premium: { perSecond: 5000, base: 35000 },
  };

  const rate = baseRates[budget as keyof typeof baseRates] || baseRates.medium;
  const total = rate.base + (duration * rate.perSecond);
  
  return `HK$${total.toLocaleString()}`;
}

// Save lead information
export async function saveLead(request: StoryboardRequest, storyboard: GeneratedStoryboard): Promise<void> {
  try {
    // Here you would typically save to a database
    // For now, we'll just log the information
    console.log('New lead generated:', {
      contact: request.contactInfo,
      project: {
        type: request.projectType,
        industry: request.industry,
        budget: request.budget,
        duration: request.duration,
      },
      storyboard: {
        frames: storyboard.frames.length,
        totalDuration: storyboard.totalDuration,
        estimatedBudget: storyboard.estimatedBudget,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving lead:', error);
  }
} 