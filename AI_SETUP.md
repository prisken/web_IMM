# AI Storyboard Generation Setup

This project uses LLaVA (Large Language and Vision Assistant) for both text generation and image generation to create AI-powered storyboards.

## Prerequisites

1. **Ollama** - Local LLM runtime for LLaVA
2. **LLaVA Model** - Multimodal model for text and image generation

## Setup Instructions

### 1. Install Ollama

Visit [ollama.ai](https://ollama.ai) and install Ollama for your platform.

### 2. Pull LLaVA Model

```bash
# Pull LLaVA model for multimodal capabilities
ollama pull llava:latest

# Or use a specific version
ollama pull llava:7b
```

### 3. Start Ollama Service

```bash
# Start Ollama (it runs on http://localhost:11434 by default)
ollama serve
```

### 4. Environment Configuration

Create a `.env.local` file in your project root:

```env
# AI Services Configuration

# LLaVA Configuration
OLLAMA_BASE_URL=http://localhost:11434
LLAVA_MODEL=llava:latest

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 5. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the AI Generator page
3. Fill out the form and test storyboard generation

## Features

### Text Generation (LLaVA)
- Generates storyboard scenes with detailed descriptions
- Provides camera directions and audio notes
- Creates professional TVC and KOL video storyboards
- Supports multiple project types and industries
- Enhanced visual descriptions optimized for image generation

### Image Generation (LLaVA)
- Generates visual representations of each storyboard frame
- Uses LLaVA's multimodal capabilities for image generation
- Creates cinematic, professional-quality visuals
- Falls back to placeholder images if generation fails
- Alternative: Enhanced image descriptions for external image generation services

### Budget Estimation
- Calculates realistic production budgets
- Based on duration, project type, and budget tier
- Provides HK$ pricing for Hong Kong market

### Lead Capture
- Saves contact information and project details
- Logs generated storyboards for follow-up
- Integrates with the media production workflow

## Advantages of LLaVA

### Unified Model Approach
- **Single Model**: One model handles both text and image generation
- **Better Context**: Understands visual concepts when generating descriptions
- **Cost Effective**: No external API costs for image generation
- **Faster Processing**: Local processing without network delays
- **Privacy**: All processing happens locally

### Enhanced Capabilities
- **Visual Understanding**: Better comprehension of visual concepts
- **Consistent Style**: Unified approach to visual and textual content
- **Multimodal Prompts**: Can handle complex visual-text interactions
- **Professional Quality**: Optimized for commercial and creative content

## Troubleshooting

### LLaVA Issues
- Ensure Ollama is running: `ollama serve`
- Check model availability: `ollama list`
- Test with: `ollama run llava:latest "Describe this image: [image_url]"`
- Verify model size and memory requirements

### Performance Tips
- LLaVA requires more memory than text-only models
- Consider using smaller LLaVA variants for faster generation
- Implement caching for generated content
- Use fallback templates for reliability

## Customization

### Adding New Project Types
1. Update prompts in `src/lib/ai.ts`
2. Add new project types to the form
3. Update translation files

### Modifying Image Generation
1. Adjust LLaVA image generation prompts
2. Use enhanced image descriptions for external services
3. Customize visual style parameters

### Budget Calculation
1. Modify rates in `calculateBudgetEstimate()`
2. Add new budget tiers
3. Adjust for different markets

## Production Deployment

For production deployment:

1. **LLaVA**: Deploy to a dedicated server with sufficient GPU memory
2. **Caching**: Implement Redis or similar for caching
3. **Monitoring**: Add logging and error tracking
4. **Security**: Secure API endpoints and validate inputs
5. **Scaling**: Consider multiple LLaVA instances for high traffic 