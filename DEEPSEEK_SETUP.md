# DeepSeek Chat Setup Guide

## ✅ What's Been Done

Your project has been updated to use **DeepSeek Chat** as the primary AI service for storyboard generation, with Wenxin as a fallback.

### Changes Made:
1. ✅ Installed DeepSeek SDK
2. ✅ Added DeepSeek configuration to AI service
3. ✅ Updated storyboard generation to use DeepSeek first
4. ✅ Added fallback to Wenxin if DeepSeek fails
5. ✅ Created test script for verification
6. ✅ Added TypeScript type declarations

## 🚀 Next Steps

### Step 1: Get Your DeepSeek API Key

1. **Go to DeepSeek Platform**: [https://platform.deepseek.com/](https://platform.deepseek.com/)
2. **Sign Up/Login**: Create an account or log in
3. **Get API Key**: 
   - Go to your dashboard
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key

### Step 2: Add API Key to Environment

Update your `.env.local` file:

```env
# Replace the placeholder with your actual API key
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here
```

### Step 3: Test the Integration

Run the test script to verify everything works:

```bash
node test-deepseek.js
```

### Step 4: Test Your Website

1. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Go to your AI Generator page**: http://localhost:3000/en/ai-generator

3. **Test the storyboard generation** with a sample project

## 🎯 How It Works Now

### Primary Flow (DeepSeek):
1. User submits storyboard request
2. System tries DeepSeek Chat first
3. DeepSeek generates storyboard content
4. Content is processed and displayed

### Fallback Flow (Wenxin):
1. If DeepSeek fails, system tries Wenxin
2. Wenxin generates storyboard content
3. Content is processed and displayed

### Error Handling:
- If both AI services fail, system uses template-based fallback
- Console logs show which service is being used
- Graceful degradation ensures the app always works

## 🔧 Configuration Options

### Environment Variables:
```env
# Primary AI Service
DEEPSEEK_API_KEY=your_deepseek_key

# Fallback AI Service
WENXIN_API_KEY=your_wenxin_key
WENXIN_SECRET_KEY=your_wenxin_secret
WENXIN_MODEL=ernie-bot-4

# Image Generation
STABLE_DIFFUSION_API_KEY=your_stability_key
```

### DeepSeek Model Options:
- `deepseek-chat` (default) - Best for creative tasks
- `deepseek-coder` - Good for technical content
- `deepseek-v2.5` - General purpose

## 💰 Cost Information

### DeepSeek Pricing (Approximate):
- **Input tokens**: ~$0.0001 per 1K tokens
- **Output tokens**: ~$0.0002 per 1K tokens
- **Typical storyboard**: ~$0.01-0.05 per generation

### Comparison:
| Service | Cost per Storyboard | Quality | Speed |
|---------|-------------------|---------|-------|
| **DeepSeek** | ~$0.02 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| OpenAI GPT-4 | ~$0.10 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Wenxin | ~$0.01 | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🧪 Testing Commands

### Test DeepSeek Only:
```bash
node test-deepseek.js
```

### Test Your Website:
```bash
npm run dev
# Then visit http://localhost:3000/en/ai-generator
```

### Test Production:
```bash
git add .
git commit -m "Add DeepSeek Chat integration"
git push origin main
# Check https://web-imm.vercel.app/en/ai-generator
```

## 🎉 Benefits of DeepSeek Chat

### ✅ Advantages:
- **Excellent Chinese Support**: Perfect for HK market
- **Cost-Effective**: Much cheaper than OpenAI
- **Fast Performance**: Good latency for Asia
- **Creative Excellence**: Great for storyboard generation
- **Reliable**: Stable API service

### 🎯 Perfect for Your Use Case:
- **Storyboard Generation**: DeepSeek excels at creative tasks
- **Multilingual**: Excellent English & Chinese support
- **Professional Content**: Great for commercial projects
- **Cost Optimization**: Affordable for high-volume usage

## 🚨 Troubleshooting

### Common Issues:

1. **"API key not configured"**
   - Check your `.env.local` file
   - Verify the API key is correct
   - Restart your development server

2. **"No response from DeepSeek API"**
   - Check your internet connection
   - Verify API key is valid
   - Check DeepSeek service status

3. **"JSON parsing failed"**
   - This is normal, the AI might not return perfect JSON
   - The system has fallback handling
   - Check console logs for details

### Support:
- [DeepSeek Documentation](https://platform.deepseek.com/docs)
- [DeepSeek Status](https://status.deepseek.com/)

## 🎬 Ready to Use!

Your AI storyboard generator is now powered by DeepSeek Chat and ready to create amazing storyboards for your media production clients!

**Next**: Get your API key and test it out! 🚀 