# Baidu Wenxin (文心一言) API Setup Guide

## Step-by-Step Setup Instructions

### 1. Create Baidu Account
1. Go to [Baidu AI Studio](https://aistudio.baidu.com/)
2. Click "Sign Up" or "注册"
3. Create a Baidu account using your email or phone number
4. Verify your account

### 2. Apply for Wenxin API Access
1. Log in to Baidu AI Studio
2. Navigate to "API Access" or "API接入"
3. Click "Apply for Access" or "申请接入"
4. Fill out the application form:
   - Select "Wenxin API" or "文心一言API"
   - Choose your use case (commercial/professional)
   - Provide project description
   - Accept terms and conditions

### 3. Get API Credentials
1. Once approved, go to "Console" or "控制台"
2. Navigate to "API Management" or "API管理"
3. Find "Wenxin API" or "文心一言API"
4. Copy your **API Key** and **Secret Key**

### 4. Configure Environment Variables
Add these to your `.env.local` file:

```env
# Baidu Wenxin Configuration
WENXIN_API_KEY=your_api_key_here
WENXIN_SECRET_KEY=your_secret_key_here
WENXIN_MODEL=ernie-bot-4
```

### 5. For Vercel Deployment
Add these environment variables in your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable:
   - `WENXIN_API_KEY`
   - `WENXIN_SECRET_KEY`
   - `WENXIN_MODEL`

## Available Models

### Recommended Models
- **ernie-bot-4**: Latest and most capable model
- **ernie-bot**: Good balance of performance and cost
- **ernie-bot-turbo**: Fastest response time

### Model Comparison
| Model | Speed | Quality | Cost | Use Case |
|-------|-------|---------|------|----------|
| ernie-bot-4 | Medium | Highest | High | Production, complex tasks |
| ernie-bot | Medium | High | Medium | General use, good balance |
| ernie-bot-turbo | Fast | Good | Low | Quick responses, simple tasks |

## Pricing Information

### Free Tier
- Limited API calls per month
- Good for testing and development

### Paid Plans
- Pay-per-use model
- Competitive pricing for Hong Kong region
- Volume discounts available

## Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Check that environment variables are set correctly
   - Verify API key and secret key are copied exactly
   - Restart your development server after adding variables

2. **"Access denied" error**
   - Verify your API access has been approved
   - Check if you've exceeded your quota
   - Ensure you're using the correct model name

3. **"Token error"**
   - API key or secret key might be incorrect
   - Check your Baidu AI Studio console
   - Verify account status

### Support Resources
- [Baidu AI Studio Documentation](https://ai.baidu.com/ai-doc/)
- [Wenxin API Documentation](https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html)
- [API Status Page](https://status.bce.baidu.com/)

## Benefits for Hong Kong Users

### Local Advantages
- **Low Latency**: Servers located in Asia-Pacific region
- **Chinese Language**: Native support for Traditional Chinese
- **Cultural Understanding**: Better comprehension of Hong Kong context
- **Compliance**: Meets local data protection requirements
- **Cost Effective**: Competitive pricing for the region

### Language Support
- **Traditional Chinese**: Full support for 繁體中文
- **Simplified Chinese**: Support for 简体中文
- **English**: Excellent English language capabilities
- **Code-Switching**: Handles mixed language content naturally

## Security Best Practices

### API Key Management
- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate keys regularly
- Monitor API usage for unusual activity

### Data Privacy
- Baidu Wenxin processes data according to privacy policies
- No personal data is stored permanently
- API calls are logged for billing and support purposes 