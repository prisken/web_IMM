// Test script for DeepSeek Chat API
require('dotenv').config({ path: '.env.local' });

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

async function testDeepSeekAPI() {
  try {
    console.log('🚀 Testing DeepSeek Chat API...');
    
    if (!DEEPSEEK_API_KEY) {
      console.log('❌ DeepSeek API key not found in environment variables');
      console.log('📝 Please add your DeepSeek API key to .env.local:');
      console.log('DEEPSEEK_API_KEY=your_api_key_here');
      return false;
    }
    
    console.log('💬 Testing simple conversation...');
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: 'Hello! Please respond with "DeepSeek Chat is working correctly" in both English and Chinese (繁體中文).'
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
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

    console.log('✅ DeepSeek API test successful!');
    console.log('📝 Response:');
    console.log(data.choices[0].message.content);
    
    return true;
    
  } catch (error) {
    console.error('❌ DeepSeek API test failed:');
    console.error(error.message);
    return false;
  }
}

async function testStoryboardGeneration() {
  try {
    console.log('\n🎬 Testing storyboard generation...');
    
    if (!DEEPSEEK_API_KEY) {
      console.log('❌ DeepSeek API key not configured');
      return false;
    }
    
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
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: storyboardPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('No response from DeepSeek API for storyboard');
    }

    console.log('✅ Storyboard generation test successful!');
    console.log('📝 Storyboard Response:');
    console.log(data.choices[0].message.content);
    
    // Try to parse as JSON to verify format
    try {
      const storyboard = JSON.parse(data.choices[0].message.content);
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
  console.log('🧪 Starting DeepSeek Chat Tests...\n');
  
  const basicTest = await testDeepSeekAPI();
  const storyboardTest = await testStoryboardGeneration();
  
  console.log('\n📊 Test Results:');
  console.log(`Basic API Test: ${basicTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Storyboard Test: ${storyboardTest ? '✅ PASS' : '❌ FAIL'}`);
  
  if (basicTest && storyboardTest) {
    console.log('\n🎉 All tests passed! DeepSeek Chat is working correctly.');
    console.log('🚀 Your AI storyboard generator is ready to use!');
  } else {
    console.log('\n⚠️ Some tests failed. Please check your configuration.');
  }
}

// Run the tests
runTests().catch(console.error); 