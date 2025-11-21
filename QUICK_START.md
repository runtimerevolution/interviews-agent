# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
yarn install
```

### 2. Configure AI Insights (Optional)
```bash
# Create .env file from example
cp .env.example .env

# Edit .env and add your OpenAI API key
# VITE_OPENAI_API_KEY=sk-your-key-here
```

> **Note**: AI insights are optional. The app works fully without an API key.

### 3. Start Development Server
```bash
yarn dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📋 Interview Workflow

### Step 1: Home Page
- Review the features and capabilities
- Click **"Start Interview"** when ready

### Step 2: Conduct Interview
For each question:
1. **Read the question** to the candidate
2. **Record their answer** in the text field
3. **Show the correct answer** (click button) for your reference
4. **Score the response** using the slider (0-100%)
5. **Add comments** about their answer
6. **Navigate** to the next question or **skip** if not applicable

### Step 3: Generate Report
- Click **"Finish Interview"** on the last question
- Review the comprehensive report with:
  - Automatic level assessment (Junior/Mid/Senior)
  - Average score
  - Detailed breakdown of all answers
- **Export** the report as a text file
- **Restart** to begin a new interview

## 🎯 Question Categories

The interview covers 20 questions across:
- **Basic Ruby** (3 questions)
- **Rails Framework** (3 questions)
- **Active Record** (3 questions)
- **Associations** (3 questions)
- **Modular Applications** (2 questions)
- **Engines** (2 questions)
- **Security** (3 questions)
- **Advanced Topics** (1 question)

## 💡 Tips for Interviewers

1. **Show Answer Strategically**: Wait for the candidate to answer before revealing the correct answer
2. **Score Fairly**: Use the full 0-100% range based on:
   - Accuracy of the answer
   - Depth of understanding
   - Practical knowledge
3. **Add Meaningful Comments**: Note strengths, weaknesses, and areas for improvement
4. **Skip When Appropriate**: If a question isn't relevant to the role, skip it
5. **Review Report**: Use the final assessment as a starting point for your decision

## 🔧 Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically try the next available port.

### Slow Performance
Clear browser cache or try a different browser.

### Questions Not Showing
Ensure you've run `yarn install` to install all dependencies.

## 📦 Build for Production

```bash
yarn build
```

Then preview the production build:
```bash
yarn preview
```

## 🎨 Customization

See the main README.md for details on:
- Adding custom questions
- Modifying assessment criteria
- Customizing the theme and styling

---

**Ready to start interviewing? Run `yarn dev` and open your browser!**

