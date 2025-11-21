# AI Insights Setup Guide

## Overview

The Interview Agent includes AI-powered insights using OpenAI's GPT-4 to analyze interview results and provide personalized recommendations.

## Setup Instructions

### 1. Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the generated key (starts with `sk-`)

### 2. Configure Environment Variable

Create a `.env` file in the project root:

```bash
# From project root
touch .env
```

Add your API key to `.env`:

```bash
VITE_OPENAI_API_KEY=sk-your-actual-key-here
```

**Example `.env` file:**
```
# OpenAI API Key for AI Insights
VITE_OPENAI_API_KEY=sk-proj-abc123xyz789...
```

### 3. Restart the Development Server

```bash
# Stop current server (Ctrl+C)
# Start again
yarn dev
```

### 4. Verify Configuration

1. Complete an interview
2. Go to the Report page
3. Look for the "AI-Powered Insights" section
4. The "Generate AI Insights" button should be enabled
5. Click to generate insights

## What the AI Analyzes

The AI receives:
- All answered questions with scores
- Question levels (Junior/Mid/Senior)
- Question categories
- Interviewer feedback/comments

The AI provides:
- **Areas to Explore More**: Topics needing improvement
- **Strengths**: Well-performed areas
- **Feedback Summary**: Synthesized key points
- **Recommendations**: Specific learning resources
- **Overall Assessment**: Comprehensive evaluation

## Cost

OpenAI API usage is pay-per-use:
- **GPT-4 cost**: ~$0.01-0.03 per interview analysis
- **GPT-3.5-turbo cost**: ~$0.001-0.003 per analysis

You can switch to GPT-3.5-turbo by editing `src/components/AIInsights.jsx` and changing `model: 'gpt-4'` to `model: 'gpt-3.5-turbo'`.

## Security

✅ **Safe**: API key is stored in `.env` (git-ignored)
✅ **Private**: Key never sent to any server except OpenAI
✅ **Local**: No data stored on external servers

⚠️ **Never commit `.env` to git**
⚠️ **Don't share your API key**

## Troubleshooting

### "OpenAI API key not configured" Error

**Solution**: Check that:
1. `.env` file exists in project root
2. Variable name is exactly `VITE_OPENAI_API_KEY`
3. Key starts with `sk-`
4. Dev server was restarted after adding the key

### "Failed to generate insights" Error

**Possible causes**:
1. Invalid or expired API key
2. Insufficient OpenAI credits
3. Network connection issues
4. Rate limit exceeded

**Solutions**:
- Verify key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Check billing at [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
- Wait a few minutes and try again

### Environment Variable Not Loading

**Vite requirement**: Environment variables must:
- Start with `VITE_` prefix
- Be defined before starting dev server
- Not be added to `.env.local` (use `.env`)

**Fix**:
```bash
# Verify .env content
cat .env

# Should show:
# VITE_OPENAI_API_KEY=sk-...

# Restart server
yarn dev
```

## Optional: Using Different Models

Edit `src/components/AIInsights.jsx` around line 60:

```javascript
// Current (GPT-4)
model: 'gpt-4',

// Alternative (GPT-3.5-turbo - faster, cheaper)
model: 'gpt-3.5-turbo',

// Alternative (GPT-4-turbo)
model: 'gpt-4-turbo-preview',
```

## Working Without AI

The app works fully without an OpenAI API key:
- ✅ All interview features work
- ✅ Scoring and comments work
- ✅ Report generation works
- ✅ Assessment levels work
- ❌ AI-powered insights not available

Simply leave the `.env` file empty or don't create it.

## Example Output

With a configured API key, after completing an interview, the AI might provide:

```
## Areas to Explore More

Based on the interview scores, focus on:
- Active Record optimization techniques (N+1 queries scored 55%)
- Security best practices (SQL injection concepts need reinforcement)
- Advanced Rails patterns (Service objects scored 60%)

## Strengths

- Excellent grasp of Ruby fundamentals (90% average)
- Strong understanding of MVC pattern
- Good knowledge of Rails conventions

## Recommendations

1. Study the Rails Guides section on Active Record Query Interface
2. Complete the Rails Security Guide
3. Practice implementing service objects in sample projects
...
```

## Support

- OpenAI Documentation: https://platform.openai.com/docs
- OpenAI Community: https://community.openai.com
- API Status: https://status.openai.com

---

**Ready to use AI insights? Set up your API key and start getting personalized recommendations!**

