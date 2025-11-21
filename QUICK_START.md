# Quick Start Guide

Get up and running with the Runtime Revolution Technical Interview Agent in 5 minutes!

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
cd interviews-agent
yarn install
```

### 2. Configure OpenAI API (Required)
```bash
# Create .env file
echo "VITE_OPENAI_API_KEY=your_api_key_here" > .env
```

> Get your API key at https://platform.openai.com/api-keys

### 3. Start Development Server
```bash
yarn dev
```

### 4. Open Browser
Navigate to `http://localhost:5173`

## 🎯 Quick Interview Flow

### Step 1: Select Technology
Click on one of the four technology cards:
- 💎 Ruby on Rails
- 🟢 Node.js
- ⚛️ React
- 🐍 Python

### Step 2: Conduct Interview

**Sidebar (Left)**:
- View all questions with titles and levels
- Track progress with visual indicators
- See which questions have sub-questions (🌳 icon)
- Selected question shows green background

**Main Area (Right)**:
- Read question and expected answer
- View code examples
- Score response (0-100% slider)
- For sub-questions: Score each individually
- Add comments
- Use "Without Knowledge" for 0% + auto-comment
- Generate code editor links for practical exercises

**Key Actions**:
- **Navigate**: Click questions in sidebar
- **Score**: Drag slider or click markers
- **Comment**: Type in feedback field
- **Code Exercise**: Click "Generate Code Editor Link" → Copy → Share
- **Add Question**: Use "+ Add Question" button for follow-ups

### Step 3: General Feedback (Required)

Click "General Feedback" button in sidebar:
- Fill in at least ONE field about the candidate
- Cover soft skills, technical abilities, strengths, areas for improvement
- Add hiring decision and recommended level
- Save to unlock "Finish Interview" button

### Step 4: Review Report

Report includes:
- **Left Panel**: Level assessment, score, statistics
- **Right Panel**:
  - Assessment description
  - General feedback (AI-transformed Q&A)
    - Click "Regenerate" for different interpretation
    - Click "×" to remove unwanted items
  - AI Insights (technical + professional)
  - All question responses with scores

**Actions**:
- **Export**: Download .txt report
- **Start New**: Begin another interview

## 🎨 Quick Tips

### For Best Results

1. **Prepare Questions**:
   - Review questions before interview
   - Know which are Junior/Mid/Senior
   - Note which have sub-questions (🌳)

2. **During Interview**:
   - Score immediately while fresh
   - Add detailed comments
   - Use "Without Knowledge" liberally
   - Generate code editor links for practical tasks

3. **General Feedback**:
   - Fill immediately after interview
   - Be specific and detailed
   - Include concrete examples
   - AI will transform into professional Q&A

4. **Review Report**:
   - Check AI-generated feedback
   - Remove irrelevant Q&A items
   - Regenerate if needed
   - Export for records

### Keyboard Shortcuts

- **Tab**: Navigate between fields
- **Enter**: In comment field = new line
- **Cmd/Ctrl + C**: Copy code editor link (after clicking copy button)

## 🔧 Configuration

### Optional Settings

**Environment Variables** (`.env`):
```env
# Required for AI features
VITE_OPENAI_API_KEY=sk-proj-...

# Optional custom settings
VITE_APP_TITLE=Interview Agent
```

## 📱 Using Code Editor

### Interviewer (You):
1. Click "Generate Code Editor Link" on any question
2. Copy the link (20-character hash)
3. Share with candidate via chat/email
4. Link format: `http://localhost:5173/abcde-fghij-klmno-pqrst`

### Candidate (Them):
1. Open shared link
2. See question and optional image
3. Write code in editor
4. Code auto-saves every 10 seconds
5. Click "Save Code" when done
6. Code appears in your report

## 🐛 Troubleshooting

### AI Features Not Working
```bash
# Check .env file exists
cat .env

# Should show: VITE_OPENAI_API_KEY=sk-...

# Restart server after adding .env
# Press Ctrl+C then:
yarn dev
```

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
yarn dev --port 3000
```

### Clear Cache
```bash
# Remove node_modules and reinstall
rm -rf node_modules yarn.lock
yarn install
```

## 📚 Learn More

- **Full Documentation**: [README.md](README.md)
- **Feature Details**: [FEATURES.md](FEATURES.md)
- **AI Setup Guide**: [AI_SETUP.md](AI_SETUP.md)
- **App Flow**: [APP_FLOW.md](APP_FLOW.md)

## 🎯 Interview Checklist

Before starting an interview:

- [ ] Server running (`yarn dev`)
- [ ] OpenAI API key configured
- [ ] Technology selected
- [ ] Questions reviewed
- [ ] Code editor links ready (if needed)
- [ ] Notepad for quick notes during interview

During interview:

- [ ] Score each question
- [ ] Add comments
- [ ] Use sub-questions when available
- [ ] Share code editor links for exercises
- [ ] Take notes for general feedback

After interview:

- [ ] Fill general feedback form
- [ ] Review AI-transformed feedback
- [ ] Remove/regenerate as needed
- [ ] Check AI insights
- [ ] Export report
- [ ] Save for records

## 🚀 Production Build

When ready to deploy:

```bash
# Build for production
yarn build

# Preview production build
yarn preview

# Deploy dist/ folder to hosting service
# (Vercel, Netlify, AWS S3, etc.)
```

## 💡 Pro Tips

1. **Multi-Monitor Setup**:
   - Code editor link on candidate's screen
   - Your interview interface on your screen

2. **Time Management**:
   - 3-5 minutes per question
   - 5-10 minutes for code exercises
   - 5 minutes for general feedback

3. **Scoring Guide**:
   - 90-100%: Perfect answer
   - 70-89%: Good understanding
   - 50-69%: Partial understanding
   - 30-49%: Weak understanding
   - 0-29%: Little to no understanding
   - 0%: Without knowledge

4. **Comment Templates**:
   - "Good explanation of..."
   - "Missed key point about..."
   - "Could improve on..."
   - "Excellent understanding of..."

---

**Ready to conduct your first interview? Run `yarn dev` and select a technology!** 🎉
