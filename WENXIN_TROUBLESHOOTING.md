# Wenxin API Troubleshooting Guide

## Current Issue: "unknown client id" Error

The error `{"error_description":"unknown client id","error":"invalid_client"}` indicates that your API credentials are not properly configured or activated.

## Step-by-Step Resolution

### 1. Verify Baidu AI Studio Account
1. Go to [Baidu AI Studio](https://aistudio.baidu.com/)
2. Log in with your Baidu account
3. Check if your account is fully verified
4. Ensure you have completed the identity verification process

### 2. Check API Access Status
1. In Baidu AI Studio, navigate to "API Access" or "API接入"
2. Look for "Wenxin API" or "文心一言API"
3. Check if your application status shows as "Approved" or "已通过"
4. If status is "Pending" or "审核中", wait for approval

### 3. Get Fresh API Credentials
1. Go to "Console" or "控制台"
2. Navigate to "API Management" or "API管理"
3. Find "Wenxin API" or "文心一言API"
4. Click "View Details" or "查看详情"
5. Copy the **API Key** (not the Secret Key)
6. Copy the **Secret Key**

### 4. Update Environment Variables
Replace your current credentials in `.env.local`:

```env
# Baidu Wenxin Configuration
WENXIN_API_KEY=your_new_api_key_here
WENXIN_SECRET_KEY=your_new_secret_key_here
WENXIN_MODEL=ernie-bot-4
```

### 5. Alternative: Use Different Model
If ernie-bot-4 is not available, try:
```env
WENXIN_MODEL=ernie-bot
```

### 6. Test with Simple Model First
Try testing with the basic model:
```env
WENXIN_MODEL=ernie-bot-turbo
```

## Common Issues and Solutions

### Issue 1: Account Not Verified
- **Solution**: Complete phone/email verification in Baidu account
- **Time**: Usually takes 24-48 hours

### Issue 2: API Access Not Approved
- **Solution**: Wait for approval or contact Baidu support
- **Alternative**: Use free tier with limited calls

### Issue 3: Wrong API Key Format
- **Check**: API Key should be ~32 characters
- **Check**: Secret Key should be ~32 characters
- **Solution**: Regenerate keys in console

### Issue 4: Model Not Available
- **Solution**: Try different models (ernie-bot, ernie-bot-turbo)
- **Check**: Model availability in your region

## Quick Test Commands

After updating credentials, test with:

```bash
# Test basic connectivity
node test-wenxin.js

# Test with different model
WENXIN_MODEL=ernie-bot node test-wenxin.js
```

## Support Resources

- [Baidu AI Studio Help](https://ai.baidu.com/ai-doc/)
- [Wenxin API Documentation](https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html)
- [API Status Page](https://status.bce.baidu.com/)

## Next Steps

1. Verify your Baidu AI Studio account
2. Check API access approval status
3. Get fresh API credentials
4. Update environment variables
5. Run the test script again
6. If still failing, try alternative models 