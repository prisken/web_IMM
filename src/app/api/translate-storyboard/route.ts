import { NextRequest, NextResponse } from 'next/server';

// Baidu Wenxin API configuration
const WENXIN_API_KEY = process.env.WENXIN_API_KEY;
const WENXIN_SECRET_KEY = process.env.WENXIN_SECRET_KEY;
const WENXIN_MODEL = process.env.WENXIN_MODEL || 'ernie-bot-4';

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

async function callWenxinAPI(prompt: string) {
  const accessToken = await getWenxinAccessToken();

  const response = await fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${WENXIN_MODEL}?access_token=${accessToken}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [{
        role: 'user',
        content: prompt
      }],
      temperature: 0.3,
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

    const translatedContent = await callWenxinAPI(translationPrompt);
    
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