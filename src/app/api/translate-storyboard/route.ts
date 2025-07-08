import { NextRequest, NextResponse } from 'next/server';

interface StoryboardFrame {
  id: number;
  description: string;
  visual: string;
  duration: number;
  camera: string;
  audio: string;
  imageUrl?: string;
}

interface GeneratedStoryboard {
  frames: StoryboardFrame[];
  summary: string;
  totalDuration: number;
  estimatedBudget: string;
}

interface TranslationRequest {
  storyboard: GeneratedStoryboard;
  targetLanguage: string;
}

// LLaVA API configuration
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const LLAVA_MODEL = process.env.LLAVA_MODEL || 'llava:latest';

export async function POST(request: NextRequest) {
  try {
    const body: TranslationRequest = await request.json();
    const { storyboard, targetLanguage } = body;

    if (targetLanguage !== 'zh') {
      return NextResponse.json(
        { error: 'Only Chinese translation is supported' },
        { status: 400 }
      );
    }

    // Translate each frame
    const translatedFrames = await Promise.all(
      storyboard.frames.map(async (frame) => {
        const translationPrompt = `Translate the following English storyboard frame to Traditional Chinese (繁體中文). Keep brand names, product names, and company names exactly as provided. Only translate the text content, not the JSON structure:

Frame ${frame.id}:
- Description: ${frame.description}
- Visual: ${frame.visual}
- Camera: ${frame.camera}
- Audio: ${frame.audio}

Return the translated content in the same format, with only the text translated to Chinese.`;

        const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: LLAVA_MODEL,
            prompt: translationPrompt,
            stream: false,
            options: {
              temperature: 0.3,
              top_p: 0.9,
              max_tokens: 500,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Translation API error: ${response.statusText}`);
        }

        const data = await response.json();
        const translatedText = data.response.trim();

        // Extract translated content (simple parsing)
        const lines = translatedText.split('\n');
        let translatedDescription = frame.description;
        let translatedVisual = frame.visual;
        let translatedCamera = frame.camera;
        let translatedAudio = frame.audio;

        for (const line of lines) {
          if (line.includes('Description:') || line.includes('描述:')) {
            translatedDescription = line.split(':').slice(1).join(':').trim();
          } else if (line.includes('Visual:') || line.includes('視覺:')) {
            translatedVisual = line.split(':').slice(1).join(':').trim();
          } else if (line.includes('Camera:') || line.includes('攝影:')) {
            translatedCamera = line.split(':').slice(1).join(':').trim();
          } else if (line.includes('Audio:') || line.includes('音頻:')) {
            translatedAudio = line.split(':').slice(1).join(':').trim();
          }
        }

        return {
          ...frame,
          description: translatedDescription,
          visual: translatedVisual,
          camera: translatedCamera,
          audio: translatedAudio,
        };
      })
    );

    // Translate summary
    const summaryTranslationPrompt = `Translate the following English summary to Traditional Chinese (繁體中文). Keep brand names, product names, and company names exactly as provided:

Summary: ${storyboard.summary}

Return only the translated summary.`;

    const summaryResponse = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: LLAVA_MODEL,
        prompt: summaryTranslationPrompt,
        stream: false,
        options: {
          temperature: 0.3,
          top_p: 0.9,
          max_tokens: 200,
        },
      }),
    });

    let translatedSummary = storyboard.summary;
    if (summaryResponse.ok) {
      const summaryData = await summaryResponse.json();
      translatedSummary = summaryData.response.trim();
    }

    const translatedStoryboard: GeneratedStoryboard = {
      frames: translatedFrames,
      summary: translatedSummary,
      totalDuration: storyboard.totalDuration,
      estimatedBudget: storyboard.estimatedBudget,
    };

    return NextResponse.json({
      success: true,
      storyboard: translatedStoryboard,
    });

  } catch (error) {
    console.error('Error in storyboard translation API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to translate storyboard',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 