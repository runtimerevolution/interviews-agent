# AI Features Setup Guide

## Overview

The Interview Agent includes two AI-powered features using OpenAI's GPT-4:

1. **General Feedback Transformation**: Converts your interview notes into professional Q&A format
2. **Technical Insights**: Analyzes interview results and provides personalized recommendations

## Setup Instructions

### 1. Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the generated key (starts with `sk-proj-` or `sk-`)

> **Important**: Keep this key secure. Never share it or commit it to version control.

### 2. Configure Environment Variable

Create a `.env` file in the project root:

```bash
# From project root (interviews-agent/)
echo "VITE_OPENAI_API_KEY=your_actual_key_here" > .env
```

Or manually create `.env`:

```bash
# Create file
touch .env

# Edit with your preferred editor
nano .env
# OR
code .env
```

Add your API key:

```env
# OpenAI API Key for AI Features
VITE_OPENAI_API_KEY=sk-proj-abc123xyz789...
```

**Example `.env` file:**
```env
# OpenAI API Configuration
VITE_OPENAI_API_KEY=sk-proj-oXugNnXvCKdqF7Xym43D0xW2Leh-xBFxPaRdQCoabN...

# Optional: Add other configuration
# VITE_APP_TITLE=Interview Agent
```

### 3. Verify .env is Git-Ignored

Check `.gitignore` includes:

```gitignore
# Environment variables
.env
.env.local
.env.*.local
```

This is already configured in the project.

### 4. Restart the Development Server

```bash
# Stop current server (press Ctrl+C in terminal)

# Start again
yarn dev
```

> **Note**: Environment variables are only loaded when the dev server starts. You must restart after adding/changing `.env`.

### 5. Verify Configuration

#### Test General Feedback Transformation:
1. Start an interview (any technology)
2. Score at least one question
3. Click "General Feedback" button
4. Fill in any feedback field (e.g., "Good communication skills")
5. Save and finish interview
6. On Report page, you should see:
   - "General Interview Feedback" section
   - Loading spinner → then Q&A format
   - [🔄 Regenerate] button

#### Test AI Insights:
1. On Report page, scroll to "AI-Powered Insights"
2. Click "Generate AI Insights" button
3. Should show loading spinner → then detailed analysis
4. If error appears, check API key configuration

## AI Feature #1: General Feedback Transformation

### What It Does

Transforms your free-form interview notes into professional questions and answers.

**Your Input (Raw Notes):**
```
good english but struggles with technical terms
5 years experience mostly backend
strong team player mentioned pairing sessions
needs improvement on system design
recommended for senior position
```

**AI Output (Professional Q&A):**
```
Q: How would you describe the candidate's English communication skills?
A: The candidate demonstrates good English proficiency overall, though they occasionally struggle with technical terminology. This is common and can be improved with exposure and practice.

Q: What is the candidate's level of experience?
A: The candidate has 5 years of experience, primarily focused on backend development, showing solid practical knowledge in their area of expertise.

Q: How does the candidate work within a team?
A: Excellent team player who actively engages in pair programming sessions and collaboration, indicating strong interpersonal skills and willingness to share knowledge.

Q: What areas need improvement?
A: System design and architecture concepts would benefit from further development, which is a common growth area for developers transitioning to senior roles.

Q: What is your hiring recommendation?
A: Recommended for senior position based on technical skills, experience, and team collaboration abilities.
```

### Features
- **Automatic**: Transforms on page load
- **Grammar Correction**: Fixes typos and grammar
- **Professional Tone**: Maintains formal but friendly style
- **Regeneration**: Click [🔄 Regenerate] for different interpretation
- **Manual Curation**: Remove individual Q&A items with [×] button
- **Error Recovery**: Retry button if transformation fails

### Configuration

Located in `src/components/ReportPage.jsx` around line 100:

```javascript
// AI Feedback Transformation Settings
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'gpt-4',               // Model to use
    messages: [...],
    temperature: 0.7,             // Creativity (0.0-2.0)
    max_tokens: 1500             // Response length limit
  })
});
```

## AI Feature #2: Technical Insights

### What It Analyzes

The AI receives:
- All answered questions with scores and comments
- Question levels (Junior/Mid/Senior)
- Question categories
- General interview feedback (if provided)
- Selected technology

The AI provides:
- **Technical Strengths**: Well-performed areas with specific examples
- **Areas for Improvement**: Topics needing more work
- **Soft Skills & Professional Assessment**: Communication, teamwork, personality
- **Runtime Revolution Fit**: Culture alignment and values match
- **Career Development Path**: Growth trajectory suggestions
- **Recommendations**: Specific learning resources and action items
- **Overall Hiring Recommendation**: Clear decision with justification

### Features
- **Manual Trigger**: Click "Generate AI Insights" button
- **Comprehensive Analysis**: Technical + soft skills + hiring decision
- **Markdown Formatted**: Professional, readable output
- **Technology-Specific**: Tailored to Rails, Node, React, or Python
- **Contextual**: Includes general feedback in analysis

### Configuration

Located in `src/components/AIInsights.jsx` around line 80:

```javascript
// AI Insights Settings
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'gpt-4',               // Model to use
    messages: [...],
    temperature: 0.7,             // Creativity
    max_tokens: 2000             // Response length limit
  })
});
```

## Cost Estimation

OpenAI API usage is pay-per-use:

### Per Interview:
- **General Feedback Transformation**: ~$0.01-0.02 (GPT-4)
- **Technical Insights**: ~$0.02-0.04 (GPT-4)
- **Total per interview**: ~$0.03-0.06

### Cost Breakdown:
| Model | Input (1K tokens) | Output (1K tokens) | Per Interview |
|-------|-------------------|-------------------|---------------|
| GPT-4 | $0.03 | $0.06 | $0.03-0.06 |
| GPT-3.5-turbo | $0.0015 | $0.002 | $0.002-0.004 |

### Monthly Estimate:
- 50 interviews/month × $0.05 = **$2.50/month**
- 100 interviews/month × $0.05 = **$5.00/month**

> **Tip**: For high volume, consider GPT-3.5-turbo for ~10x cost savings with slightly lower quality.

## Security Best Practices

### ✅ DO:
- Store API key in `.env` file (git-ignored)
- Use environment variables for sensitive data
- Verify `.gitignore` excludes `.env`
- Rotate API keys periodically
- Set spending limits in OpenAI dashboard
- Review API usage monthly

### ❌ DON'T:
- Commit `.env` to git
- Share API keys in chat/email
- Hard-code keys in source files
- Use same key across multiple projects (optional)
- Exceed your OpenAI spending limit

### Security Checklist:
```bash
# Verify .env is ignored
git status | grep .env  # Should show nothing

# Check .gitignore
grep -r "\.env" .gitignore  # Should show .env*

# Verify key is not in code
grep -r "sk-proj" src/  # Should show nothing
grep -r "sk-" src/  # Should only show comments
```

## Troubleshooting

### Issue: "OpenAI API key not configured"

**Symptoms**: AI features show error message

**Solutions**:
1. Verify `.env` file exists in project root:
   ```bash
   ls -la | grep .env
   ```

2. Check variable name is exactly `VITE_OPENAI_API_KEY`:
   ```bash
   cat .env
   ```

3. Verify key format (starts with `sk-` or `sk-proj-`):
   ```bash
   cat .env | grep VITE_OPENAI_API_KEY
   ```

4. Restart dev server:
   ```bash
   # Press Ctrl+C
   yarn dev
   ```

### Issue: "Failed to generate insights" / "Failed to transform feedback"

**Possible Causes**:
1. Invalid or expired API key
2. Insufficient OpenAI credits/billing
3. Network connection issues
4. Rate limit exceeded
5. API service outage

**Solutions**:

1. **Verify API Key**:
   - Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Check if key is active
   - Regenerate if needed

2. **Check Billing**:
   - Go to [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
   - Verify payment method
   - Check usage limits
   - Add credits if needed

3. **Test API Key**:
   ```bash
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer YOUR_API_KEY"
   ```

4. **Check Rate Limits**:
   - Wait a few minutes
   - Try again
   - Consider upgrading plan if frequent

5. **Check API Status**:
   - Visit [status.openai.com](https://status.openai.com)
   - Check for ongoing incidents

### Issue: Environment Variable Not Loading

**Vite Requirements**:
- Must start with `VITE_` prefix
- Must be in `.env` file (not `.env.local` for this project)
- Server must be restarted after changes

**Fix**:
```bash
# 1. Verify .env content
cat .env

# Should show exactly:
# VITE_OPENAI_API_KEY=sk-...

# 2. Check file location (must be in project root)
pwd  # Should end with /interviews-agent
ls .env  # Should exist

# 3. Restart server
yarn dev

# 4. Verify in browser console
# Open DevTools → Console → Type:
# import.meta.env.VITE_OPENAI_API_KEY
# Should show your key
```

### Issue: Transformation/Insights Taking Too Long

**Normal Behavior**:
- General Feedback: 3-10 seconds
- Technical Insights: 5-15 seconds

**If Longer Than 30 Seconds**:
1. Check internet connection
2. Check OpenAI status page
3. Try regenerating
4. Consider switching to GPT-3.5-turbo (faster)

## Customizing AI Behavior

### Change Model (Speed vs Quality)

**For General Feedback (`ReportPage.jsx`):**
```javascript
// High quality, slower, more expensive
model: 'gpt-4'

// Fast, cheaper, slightly lower quality
model: 'gpt-3.5-turbo'

// Balanced (GPT-4 Turbo)
model: 'gpt-4-turbo-preview'
```

**For Technical Insights (`AIInsights.jsx`):**
```javascript
// Same options as above
model: 'gpt-4'  // or 'gpt-3.5-turbo'
```

### Adjust Creativity (Temperature)

```javascript
// More creative, varied output (0.7-1.0)
temperature: 0.8

// More consistent, focused output (0.3-0.6)
temperature: 0.5

// Very deterministic (0.0-0.2)
temperature: 0.2
```

### Modify Response Length

```javascript
// Shorter responses
max_tokens: 1000

// Longer, more detailed responses
max_tokens: 3000

// Default
max_tokens: 1500  // feedback
max_tokens: 2000  // insights
```

## Working Without AI

The app works fully without an OpenAI API key:

### ✅ Available Features:
- All interview features
- Question display and navigation
- Scoring and comments
- Sub-questions
- Code editor with auto-save
- General feedback collection (raw form)
- Report generation
- Assessment level calculation
- Export reports

### ❌ Unavailable Features:
- General feedback Q&A transformation (shows raw text instead)
- Technical insights generation
- AI-powered recommendations

To use without AI, simply:
1. Don't create `.env` file, OR
2. Leave `VITE_OPENAI_API_KEY` empty

## Example AI Outputs

### Example 1: General Feedback Transformation

**Input:**
```
very good communication
senior level technical skills
5 years rails experience
good at explaining complex topics
needs work on system design
recommended for hire
```

**Output:**
```
Q: How would you rate the candidate's communication skills?
A: The candidate demonstrates very good communication abilities, particularly when explaining complex technical topics, showing clarity and professionalism.

Q: What is the candidate's technical level?
A: Senior level technical skills with 5 years of Ruby on Rails experience, showing deep practical knowledge and expertise.

Q: Are there any areas that need improvement?
A: System design and architecture would benefit from further development, though this is common for developers transitioning or solidifying senior-level roles.

Q: What is your hiring recommendation?
A: Recommended for hire based on strong communication skills, senior technical abilities, and proven Rails experience.
```

### Example 2: Technical Insights

**Scenario**: 15 Rails questions answered, average 78%

**Output:**
```markdown
## Technical Strengths

- **Ruby Fundamentals**: Excellent grasp of symbols, strings, and core Ruby concepts (92% average)
- **Active Record**: Strong understanding of find methods, scopes, and associations (85% average)
- **Best Practices**: Good knowledge of Rails conventions and MVC pattern

## Areas for Improvement

- **Performance Optimization**: N+1 queries scored 60% - recommend studying Bullet gem and includes/joins
- **Security**: SQL injection prevention needs reinforcement (50%) - review Rails Security Guide
- **Advanced Patterns**: Service objects and concerns could be stronger (65% average)

## Soft Skills & Professional Assessment

- Excellent communicator with clear explanations of technical concepts
- Strong team player, mentions regular pairing sessions
- Shows growth mindset and enthusiasm for learning
- Good cultural fit for collaborative environments

## Runtime Revolution Fit

- Values align well with collaborative, quality-focused culture
- Experience with distributed teams and remote work
- Demonstrated mentorship potential through pairing experience
- Would integrate well with existing Rails team

## Career Development Path

Candidate is on solid trajectory from mid-level to senior:
1. Focus on performance optimization and scaling
2. Deepen security knowledge
3. Practice system design and architecture
4. Continue mentoring junior developers

## Recommendations

1. **Immediate**: Study Rails Performance Best Practices guide
2. **Short-term**: Complete OWASP Rails Security Guide
3. **Medium-term**: Implement service objects pattern in side project
4. **Long-term**: Work on system design skills for senior role readiness

## Overall Hiring Recommendation

**Strong YES** - Recommend hire for Senior Rails Developer position

Reasoning: Solid technical foundation (78% average), excellent communication skills, demonstrated growth potential, and strong cultural fit. Areas for improvement are normal for senior level and can be developed with continued experience and focused learning.
```

## Support Resources

- **OpenAI Documentation**: https://platform.openai.com/docs
- **OpenAI API Reference**: https://platform.openai.com/docs/api-reference
- **OpenAI Community Forum**: https://community.openai.com
- **API Status Page**: https://status.openai.com
- **Pricing**: https://openai.com/pricing

## FAQ

**Q: Do I need to pay for OpenAI?**
A: Yes, you need an OpenAI account with billing setup. Costs are ~$0.05 per interview.

**Q: Can I use Azure OpenAI instead?**
A: Yes, but requires code changes to API endpoint. Contact development team.

**Q: Is my data sent to OpenAI?**
A: Yes, interview questions, scores, and feedback are sent to generate insights. No personal candidate information is included.

**Q: Can I use this offline?**
A: Technical features yes, AI features no (requires internet for API calls).

**Q: What if I exceed my OpenAI budget?**
A: Set spending limits in OpenAI dashboard. API calls will fail gracefully with error messages.

**Q: Can multiple users share one API key?**
A: Yes, but track usage carefully. Consider separate keys for different teams/projects.

---

**Ready to use AI features? Set up your API key and unlock intelligent insights!** 🚀

For additional help, see [README.md](README.md) or [QUICK_START.md](QUICK_START.md).
