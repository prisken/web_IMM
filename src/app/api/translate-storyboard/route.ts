import { NextRequest, NextResponse } from 'next/server';

// DeepSeek Chat Configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

async function callDeepSeekAPI(prompt: string) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key not configured');
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: 0.3,
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

export async function POST(request: NextRequest) {
  try {
    const { storyboard, targetLanguage } = await request.json();

    if (!storyboard || !targetLanguage) {
      return NextResponse.json(
        { error: 'Storyboard and target language are required' },
        { status: 400 }
      );
    }

    const translationPrompt = `Translate the following storyboard to ${targetLanguage === 'zh' ? 'Traditional Chinese (繁體中文)' : 'English'}. Keep brand names, product names, and company names exactly as provided. Only translate the content, not the JSON structure. Maintain the exact same JSON format:

${JSON.stringify(storyboard, null, 2)}

Return only the translated JSON with the same structure.`;

    const translatedContent = await callDeepSeekAPI(translationPrompt);
    
    // Try to parse the translated content as JSON
    let translatedStoryboard;
    try {
      // Extract JSON from the response if it's wrapped in markdown
      let jsonContent = translatedContent;
      const jsonMatch = translatedContent.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        jsonContent = jsonMatch[1];
      }
      
      translatedStoryboard = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('Failed to parse translated JSON:', parseError);
      console.error('Raw translated content:', translatedContent);
      return NextResponse.json(
        { error: 'Failed to parse translated content' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      translatedStoryboard,
      language: targetLanguage 
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
} 