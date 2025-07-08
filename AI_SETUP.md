# AI Storyboard Generation Setup

This project uses Baidu Wenxin (文心一言) for text generation and Stable Diffusion for image generation to create AI-powered storyboards.

## Prerequisites

1. **Baidu Wenxin API** - Chinese AI service with excellent multilingual support
2. **Stable Diffusion API** - For high-quality image generation
3. **Environment Variables** - API keys and configuration

## Setup Instructions

### 1. Get Baidu Wenxin API Access

1. Visit [Baidu AI Studio](https://aistudio.baidu.com/)
2. Create an account and apply for Wenxin API access
3. Get your API Key and Secret Key from the console

### 2. Get Stable Diffusion API Access

1. Visit [Stability AI](https://platform.stability.ai/)
2. Create an account and get your API key
3. The API is available in Hong Kong

### 3. Environment Configuration

Create a `.env.local` file in your project root:

```env
# AI Services Configuration

# Baidu Wenxin Configuration
WENXIN_API_KEY=your_wenxin_api_key_here
WENXIN_SECRET_KEY=your_wenxin_secret_key_here
WENXIN_MODEL=ernie-bot-4

# Stable Diffusion Configuration
STABLE_DIFFUSION_API_KEY=your_stability_api_key_here
STABLE_DIFFUSION_API_URL=https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the AI Generator page
3. Fill out the form and test storyboard generation

## Features

### Text Generation (Baidu Wenxin)
- Generates storyboard scenes with detailed descriptions
- Provides camera directions and audio notes
- Creates professional TVC and KOL video storyboards
- Supports multiple project types and industries
- Enhanced visual descriptions optimized for image generation
- Excellent Chinese language support for Hong Kong market

### Image Generation (Stable Diffusion)
- Generates visual representations of each storyboard frame
- Uses Stable Diffusion XL for high-quality images
- Creates cinematic, professional-quality visuals
- Falls back to placeholder images if generation fails
- Automatic Chinese to English translation for image prompts

### Budget Estimation
- Calculates realistic production budgets
- Based on duration, project type, and budget tier
- Provides HK$ pricing for Hong Kong market

## API Models Used

### Baidu Wenxin Models
- **ernie-bot-4**: Latest model with best performance
- **ernie-bot**: Good balance of performance and cost
- **ernie-bot-turbo**: Fastest response time

### Stable Diffusion Models
- **stable-diffusion-xl-1024-v1-0**: High-quality image generation
- **stable-diffusion-v1-6**: Alternative option

## Hong Kong Region Benefits

### Baidu Wenxin Advantages
- **Local Availability**: Works perfectly in Hong Kong
- **Chinese Language**: Native support for Traditional Chinese
- **Cultural Understanding**: Better understanding of Hong Kong market
- **Fast Response**: Lower latency for Hong Kong users
- **Cost Effective**: Competitive pricing for the region

### Stable Diffusion Advantages
- **Global Availability**: Works worldwide including Hong Kong
- **High Quality**: Professional-grade image generation
- **Flexible**: Supports various styles and formats
- **Reliable**: Stable and consistent performance

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Verify your Baidu Wenxin API key and secret key
   - Check that your account has API access enabled
   - Ensure you're using the correct model name

2. **Translation Issues**
   - Baidu Wenxin handles Chinese translation natively
   - If issues occur, check the prompt format
   - Verify JSON structure is maintained

3. **Image Generation Failures**
   - Check Stable Diffusion API key
   - Verify prompt content is appropriate
   - Check API rate limits

### Error Handling

The system includes comprehensive error handling:
- Graceful fallbacks for API failures
- Placeholder images when generation fails
- Detailed error logging for debugging
- User-friendly error messages

## Performance Optimization

### Caching
- Access tokens are cached to reduce API calls
- Generated content can be cached for reuse

### Rate Limiting
- Respects API rate limits
- Implements exponential backoff for retries
- Queues requests when necessary

### Cost Optimization
- Efficient prompt engineering
- Smart caching strategies
- Batch processing where possible 