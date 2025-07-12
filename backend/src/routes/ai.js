const express = require('express');
const router = express.Router();

// AI API Configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const STABLE_DIFFUSION_API_URL = process.env.STABLE_DIFFUSION_API_URL || 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
const STABLE_DIFFUSION_API_KEY = process.env.STABLE_DIFFUSION_API_KEY;

// Helper function to call DeepSeek Chat API
async function callDeepSeekAPI(prompt, systemPrompt = null) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key not configured');
  }

  try {
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

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('No response from DeepSeek API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API error:', error);
    throw new Error(`DeepSeek API error: ${error}`);
  }
}

// Helper function to translate prompt to English using DeepSeek
async function translateToEnglish(text) {
  // If text is already English, skip translation (simple heuristic)
  if (/^[\x00-\x7F]*$/.test(text)) return text;
  const prompt = `Translate the following prompt to English. Only return the translated text, no explanations.\n\n${text}`;
  const translated = await callDeepSeekAPI(prompt);
  return translated.trim();
}

// Helper function to call Stable Diffusion API
async function callStableDiffusion(prompt, aspectRatio = '1024x1024') {
  if (!STABLE_DIFFUSION_API_KEY) throw new Error('Stable Diffusion API key not configured');
  
  // Map user-selected aspect ratios to supported Stable Diffusion dimensions
  const dimensionMap = {
    '1024x1024': { width: 1024, height: 1024 }, // Square
    '1024x1792': { width: 768, height: 1344 },  // Portrait (closest to 9:16)
    '1792x1024': { width: 1344, height: 768 }   // Landscape (closest to 16:9)
  };
  
  // Get the mapped dimensions or default to square
  const dimensions = dimensionMap[aspectRatio] || dimensionMap['1024x1024'];
  
  const response = await fetch(STABLE_DIFFUSION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STABLE_DIFFUSION_API_KEY}`,
    },
    body: JSON.stringify({
      text_prompts: [{ text: prompt }],
      cfg_scale: 7,
      height: dimensions.height,
      width: dimensions.width,
      samples: 1,
      steps: 30
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Stable Diffusion API error: ${response.status} - ${errorText}`);
  }
  const data = await response.json();
  // Assume the API returns an array of images as base64 or URLs
  // Adjust this if your API returns differently
  if (data.artifacts && data.artifacts[0] && data.artifacts[0].base64) {
    // Return as data URL
    return `data:image/png;base64,${data.artifacts[0].base64}`;
  } else if (data.images && data.images[0]) {
    return data.images[0];
  } else {
    throw new Error('No image returned from Stable Diffusion');
  }
}

// Storyboard generation prompts
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

// Generate storyboard using DeepSeek Chat
async function generateStoryboardText(request, locale = 'en') {
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

    console.log('🎯 Using DeepSeek Chat for storyboard generation...');
    const content = await callDeepSeekAPI(filledPrompt);

    // Extract JSON from the response
    let jsonContent = '';
    let jsonMatch = content.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      jsonMatch = content.match(/\{[\s\S]*\}/);
    }
    
    if (!jsonMatch) {
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
    
    return frames.map((frame, index) => ({
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

// Fallback storyboard generation
function generateFallbackStoryboard(request) {
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

// Calculate budget estimate
function calculateBudgetEstimate(budget, totalDuration, projectType) {
  const baseRate = projectType === 'kol' ? 5000 : 8000; // HKD per minute
  const durationMultiplier = totalDuration / 60; // Convert to minutes
  const estimatedCost = baseRate * durationMultiplier;
  
  return {
    min: Math.round(estimatedCost * 0.8),
    max: Math.round(estimatedCost * 1.2),
    currency: 'HKD'
  };
}

// Stream storyboard generation endpoint
router.post('/generate-storyboard-stream', async (req, res) => {
  try {
    const { projectType, industry, targetAudience, brandName, productDescription, keyMessage, tone, duration, budget, imageAspectRatio, contactInfo, outputLanguage } = req.body;
    const locale = req.headers['x-locale'] || 'en';

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send initial progress
    res.write(`data: ${JSON.stringify({
      type: 'progress',
      step: 1,
      totalSteps: 4,
      message: 'Analyzing project requirements...',
      progress: 10
    })}\n\n`);

    // Generate storyboard text
    const request = {
      projectType,
      industry,
      targetAudience,
      brandName,
      productDescription,
      keyMessage,
      tone,
      duration,
      budget,
      contactInfo
    };

    res.write(`data: ${JSON.stringify({
      type: 'progress',
      step: 2,
      totalSteps: 4,
      message: 'Generating storyboard content...',
      progress: 30
    })}\n\n`);

    const frames = await generateStoryboardText(request, locale);

    res.write(`data: ${JSON.stringify({
      type: 'progress',
      step: 3,
      totalSteps: 4,
      message: 'Creating visual concepts...',
      progress: 60
    })}\n\n`);

    // Generate images for each frame
    for (let i = 0; i < frames.length; i++) {
      let prompt = frames[i].visual;
      // Translate to English if not already
      if (locale !== 'en') {
        prompt = await translateToEnglish(prompt);
      }
      try {
        const imageUrl = await callStableDiffusion(prompt, imageAspectRatio || '1024x1024');
        frames[i].image = imageUrl;
        console.log(`Frame ${i + 1} image:`, imageUrl ? imageUrl.substring(0, 100) + '...' : imageUrl);
      } catch (err) {
        frames[i].image = null;
        console.error('Stable Diffusion error for frame', i + 1, err);
      }
    }

    // Calculate total duration and budget
    const totalDuration = frames.reduce((sum, frame) => sum + frame.duration, 0);
    const budgetEstimate = calculateBudgetEstimate(budget, totalDuration, projectType);

    // Generate summary
    const summary = `A ${tone} ${projectType} for ${brandName} targeting ${targetAudience} in the ${industry} industry. The ${totalDuration}-second video communicates "${keyMessage}" through ${frames.length} compelling scenes.`;

    const storyboard = {
      frames,
      summary,
      totalDuration,
      estimatedBudget: budgetEstimate,
    };

    res.write(`data: ${JSON.stringify({
      type: 'progress',
      step: 4,
      totalSteps: 4,
      message: 'Finalizing your storyboard...',
      progress: 90
    })}\n\n`);

    // Send completion
    res.write(`data: ${JSON.stringify({
      type: 'complete',
      storyboard,
      message: 'Storyboard generation complete!'
    })}\n\n`);

    res.end();

  } catch (error) {
    console.error('Error in storyboard generation:', error);
    res.write(`data: ${JSON.stringify({
      type: 'error',
      message: 'Failed to generate storyboard. Please try again.'
    })}\n\n`);
    res.end();
  }
});

// Translate storyboard endpoint
router.post('/translate-storyboard', async (req, res) => {
  try {
    const { storyboard, targetLanguage } = req.body;

    if (!storyboard || !storyboard.frames) {
      return res.status(400).json({ error: 'Invalid storyboard data' });
    }

    const translationPrompt = `Translate the following storyboard to ${targetLanguage === 'zh' ? 'Traditional Chinese' : 'English'}. Keep brand names, product names, and company names exactly as provided. Translate all other content:

${JSON.stringify(storyboard, null, 2)}

Return only the translated JSON object.`;

    const translatedContent = await callDeepSeekAPI(translationPrompt);
    
    // Extract JSON from response
    let jsonMatch = translatedContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      jsonMatch = translatedContent.match(/\{[\s\S]*\}/);
    }
    
    if (!jsonMatch) {
      jsonMatch = translatedContent.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        jsonMatch = [jsonMatch[1]];
      }
    }

    if (!jsonMatch) {
      throw new Error('No valid JSON found in translation response');
    }

    const translatedStoryboard = JSON.parse(jsonMatch[0]);
    res.json(translatedStoryboard);

  } catch (error) {
    console.error('Error translating storyboard:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

module.exports = router; 