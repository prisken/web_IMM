// Test script for Baidu Wenxin API
require('dotenv').config({ path: '.env.local' });

const WENXIN_API_KEY = process.env.WENXIN_API_KEY;
const WENXIN_SECRET_KEY = process.env.WENXIN_SECRET_KEY;
const WENXIN_MODEL = process.env.WENXIN_MODEL || 'ernie-bot-4';

async function getWenxinAccessToken() {
  console.log('🔑 Getting Wenxin access token...');
  
  const response = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${WENXIN_API_KEY}&client_secret=${WENXIN_SECRET_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Token error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('✅ Access token obtained successfully');
  return data.access_token;
}

async function testWenxinAPI() {
  try {
    console.log('🚀 Testing Baidu Wenxin API...');
    console.log(`📋 Using model: ${WENXIN_MODEL}`);
    
    const accessToken = await getWenxinAccessToken();
    
    console.log('💬 Testing simple conversation...');
    
    const response = await fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${WENXIN_MODEL}?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: 'Hello! Please respond with "Wenxin AI is working correctly" in both English and Chinese (繁體中文).'
          }
        ],
        temperature: 0.7,
        top_p: 0.95,
        max_output_tokens: 1000,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.result) {
      throw new Error('No response from Wenxin API');
    }

    console.log('✅ Wenxin API test successful!');
    console.log('📝 Response:');
    console.log(data.result);
    
    return true;
    
  } catch (error) {
    console.error('❌ Wenxin API test failed:');
    console.error(error.message);
    return false;
  }
}

async function testStoryboardGeneration() {
  try {
    console.log('\n🎬 Testing storyboard generation...');
    
    const accessToken = await getWenxinAccessToken();
    
    const storyboardPrompt = `You are a creative director. Create a simple 2-scene storyboard for a coffee shop TV commercial. 
    
    Brand: Test Coffee
    Product: Premium coffee
    Key Message: Quality coffee for busy professionals
    Duration: 30 seconds
    
    Return only valid JSON array with 2 scenes:
    [
      {
        "id": 1,
        "description": "Scene description",
        "visual": "Visual description",
        "duration": 15,
        "camera": "Camera direction",
        "audio": "Audio notes"
      }
    ]`;
    
    const response = await fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${WENXIN_MODEL}?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: storyboardPrompt
          }
        ],
        temperature: 0.7,
        top_p: 0.95,
        max_output_tokens: 2000,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Storyboard API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.result) {
      throw new Error('No response from Wenxin API for storyboard');
    }

    console.log('✅ Storyboard generation test successful!');
    console.log('📝 Storyboard Response:');
    console.log(data.result);
    
    // Try to parse as JSON to verify format
    try {
      const storyboard = JSON.parse(data.result);
      console.log('✅ JSON parsing successful!');
      console.log(`📊 Generated ${storyboard.length} scenes`);
    } catch (parseError) {
      console.log('⚠️ Response is not valid JSON, but API is working');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Storyboard generation test failed:');
    console.error(error.message);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Starting Wenxin AI Tests...\n');
  
  const basicTest = await testWenxinAPI();
  const storyboardTest = await testStoryboardGeneration();
  
  console.log('\n📊 Test Results:');
  console.log(`Basic API Test: ${basicTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Storyboard Test: ${storyboardTest ? '✅ PASS' : '❌ FAIL'}`);
  
  if (basicTest && storyboardTest) {
    console.log('\n🎉 All tests passed! Wenxin AI is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check your configuration.');
  }
}

// Run the tests
runTests().catch(console.error); 