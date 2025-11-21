# Runtime Revolution Technical Interview Agent

An intelligent multi-technology interview platform designed to facilitate structured technical interviews across Ruby on Rails, Node.js, React, and Python. Features AI-powered insights, comprehensive feedback, and automatic candidate assessment.

## 🌟 Features

### 📚 Multi-Technology Support
- **Ruby on Rails**: 20 questions (6 Junior, 9 Mid, 5 Senior)
- **Node.js**: 20 questions (3 Junior, 11 Mid, 6 Senior)
- **React**: 12 questions (2 Junior, 6 Mid, 4 Senior)
- **Python**: 20 questions (4 Junior, 10 Mid, 6 Senior)
- Questions automatically sorted by difficulty level
- Technology selection on home page

### 🎯 Advanced Question System
- **Sub-Questions Support**: Break down complex topics into multiple scorable parts
  - Individual scoring for each sub-question
  - Automatic average calculation for parent question
  - Visual indicators (tree icon 🌳) for questions with sub-questions
- **Code Examples**: Each question includes relevant code snippets
- **Level Badges**: Visual indicators for Junior, Mid, and Senior questions
- **Dynamic Question Addition**: Add new questions during interviews

### 💬 Interactive Interview Process
- **Clean Sidebar Navigation**: Question list with status indicators
  - ✓ Green checkmark for answered questions
  - ⚠️ Orange checkmark for "without knowledge" (0%)
  - 🌳 Tree icon for questions with sub-questions
  - Selected question highlighted with green background
- **Dual Panel Layout**:
  - Left: Question, expected answer, and code examples
  - Right: Scoring, comments, and evaluation tools
- **Scoring Options**:
  - 0-100% slider for regular questions
  - Individual scoring for sub-questions
  - "Without Knowledge" button (automatically sets 0% with feedback)
- **Code Editor Integration**:
  - Generate unique shareable links for candidates
  - 20-character hash format: `XXXXX-XXXXX-XXXXX-XXXXX`
  - Auto-save every 10 seconds
  - Visual auto-save indicators
  - Image support in code editor
- **Comments & Feedback**: Add detailed notes for each response

### 📝 Comprehensive General Feedback
- **Open-Text Feedback Form** covering:
  - Communication skills and soft skills
  - Technical level and experience
  - Autonomy and work style
  - Project experience
  - Learning and growth mindset
  - Leadership skills
  - Client management
  - Strengths and areas for improvement
  - Runtime Revolution fit
  - Hiring decision and recommended level
  - General interview summary
- **Required Field Validation**: Must provide feedback to finish interview
- **AI-Powered Transformation**: Converts notes into professional Q&A format
- **Regeneration Options**:
  - Retry button on failure
  - Regenerate button for new AI interpretations
  - Remove individual Q&A items

### 🤖 AI-Powered Insights (OpenAI GPT-4)
- **General Feedback Analysis**: Transforms free-form notes into structured Q&A
- **Technical Assessment**:
  - Areas for improvement identification
  - Strengths analysis
  - Specific learning resources
- **Professional Assessment**:
  - Soft skills evaluation
  - Runtime Revolution culture fit
  - Career development path suggestions
  - Overall hiring recommendation
- **Configurable**: API key stored in environment variables

### 📊 Intelligent Reporting
- **8-Level Assessment System**:
  - Perfect Senior (100%)
  - Solid Senior (≥90%)
  - Beginning Senior (≥75%)
  - Mid Going to Senior (≥60%)
  - Solid Mid-Level (≥80% mid)
  - Beginner Mid-Level (≥60% mid)
  - Junior Going to Mid-Level (≥70% junior)
  - Junior Developer (entry level)
- **Flexible Assessment**: Based only on answered questions (works with any number)
- **Visual Statistics**:
  - Average score across all responses
  - Questions answered count
  - Level breakdown (Junior/Mid/Senior performance)
- **General Feedback Display**:
  - AI-transformed Q&A format
  - Removable items
  - Regeneration capability
- **Export Options**: Download complete report as text file
- **Sub-Questions Breakdown**: Detailed view of all sub-question scores

### 🎨 Modern UI/UX
- **Clean OpenAI-Inspired Design**:
  - Lots of whitespace
  - Subtle borders
  - Minimal color palette
- **Responsive Layout**: Works on desktop and tablet
- **Material-UI Components**: Professional and polished
- **Real-Time Updates**: Instant feedback on all actions
- **Visual Progress Tracking**: Progress bar and status indicators

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.18.0 or higher)
- Yarn (v1.22.0 or higher)

### Installation

1. **Navigate to project directory**:
```bash
cd interviews-agent
```

2. **Install dependencies**:
```bash
yarn install
```

3. **Configure OpenAI API (Required for AI features)**:
```bash
# Create .env file
echo "VITE_OPENAI_API_KEY=your_openai_api_key_here" > .env
```

> **Important**: AI features (general feedback transformation and AI insights) require an OpenAI API key. Get one at https://platform.openai.com/api-keys

4. **Start development server**:
```bash
yarn dev
```

5. **Open browser** at `http://localhost:5173`

## 📖 Usage Guide

### 1. Select Technology
- Choose from Ruby on Rails, Node.js, React, or Python
- Each technology has its own curated question set
- Technology-specific assessment criteria

### 2. Conduct Interview
- Navigate questions using the sidebar
- View question details, expected answers, and code examples
- Score responses with the slider (0-100%)
- For questions with sub-questions:
  - Score each sub-question individually
  - Parent score calculated automatically
- Use "Without Knowledge" for topics candidate doesn't know
- Add comments and feedback for each question
- Generate code editor links for practical exercises:
  - Click "Generate Code Editor Link"
  - Share 20-character hash link with candidate
  - Code auto-saves every 10 seconds
  - Submitted code appears in final report

### 3. Provide General Feedback
- Click "General Feedback" button in sidebar
- Fill in qualitative observations about:
  - Communication and soft skills
  - Technical abilities and experience
  - Autonomy and work style
  - Leadership and client management
  - Overall fit and hiring recommendation
- At least one field required to finish interview
- Free-form text for maximum flexibility

### 4. Review Report
The comprehensive report includes:
- **Candidate Level Assessment**: Automatic 8-level evaluation
- **Performance Statistics**: Average score, questions answered, level breakdown
- **General Interview Feedback**:
  - AI-transformed Q&A format
  - Remove unwanted items
  - Regenerate for different interpretations
- **AI-Powered Insights**: Technical + professional analysis
- **Detailed Question Responses**: All answers with scores and comments
- **Sub-Questions Breakdown**: Individual sub-question performance
- **Code Submissions**: Candidate's code for each exercise
- **Export Option**: Download complete report

### 5. Start New Interview
- Click "Start New Interview" to return to home page
- Select same or different technology
- All previous data cleared

## 🎓 Assessment Criteria

The system evaluates candidates based on:

- **Questions Answered**: Only answered questions count (flexible system)
- **Level Performance**:
  - Junior questions (fundamentals)
  - Mid questions (practical application)
  - Senior questions (advanced concepts, architecture)
- **Weighted Scoring**: Higher weight on matching level questions
- **Holistic View**: Technical scores + general feedback

### 8-Level System:
1. **Perfect Senior** - 100% on all questions
2. **Solid Senior** - ≥90% senior, ≥85% mid/junior
3. **Beginning Senior** - ≥75% senior, ≥75% mid/junior
4. **Mid Going to Senior** - ≥60% senior, ≥70% mid/junior
5. **Solid Mid-Level** - ≥80% mid, ≥75% junior
6. **Beginner Mid-Level** - ≥60% mid, ≥70% junior
7. **Junior Going to Mid** - ≥70% junior, ≥50% mid
8. **Junior Developer** - Entry level understanding

## 🛠️ Technology Stack

- **Frontend**: React 18+ with Vite 7
- **UI Framework**: Material-UI (MUI) v6
- **Styling**: Emotion CSS-in-JS
- **Icons**: Material-UI Icons
- **AI**: OpenAI GPT-4
- **Package Manager**: Yarn
- **Build Tool**: Vite

## 📁 Project Structure

```
interviews-agent/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx              # Technology selection
│   │   ├── InterviewPage.jsx         # Main interview UI
│   │   ├── ReportPage.jsx            # Results and assessment
│   │   ├── AddQuestionDialog.jsx     # Dynamic question addition
│   │   ├── GeneralFeedbackDialog.jsx # Feedback collection form
│   │   ├── CodeEditor.jsx            # Shareable code editor
│   │   └── AIInsights.jsx            # OpenAI integration
│   ├── data/
│   │   ├── questions_rails.js        # Ruby on Rails questions
│   │   ├── questions_node.js         # Node.js questions
│   │   ├── questions_react.js        # React questions
│   │   └── questions_python.js       # Python questions
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
├── .env                              # Environment variables (gitignored)
├── .env.example                      # Environment template
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Customization

### Adding Questions

Edit the appropriate question file in `src/data/`:

```javascript
{
  id: 21,
  category: "Advanced Topic",
  level: "senior",
  title: "Short Title",
  question: "Your question here?",
  correctAnswer: "Expected answer...",
  codeExample: `// Code example here
const example = 'code';`,
  image: "https://example.com/image.png", // Optional
  hasSubQuestions: true, // Optional
  subQuestions: [ // Optional
    {
      id: 2101,
      question: "Sub-question 1?",
      correctAnswer: "Answer...",
      codeExample: `// Sub-question code`
    }
  ]
}
```

### Modifying Assessment

Edit `getCandidateLevel()` in `src/components/ReportPage.jsx` to adjust:
- Level thresholds
- Descriptions
- Required question counts
- Weighted scoring logic

### Styling

Modify theme in `src/App.jsx`:

```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#10a37f' },
    secondary: { main: '#8661c5' },
    },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
});
```

## 📦 Build & Deploy

### Production Build
```bash
yarn build
```

### Preview Build
```bash
yarn preview
```

### Deploy
Deploy the `dist/` folder to your hosting service (Vercel, Netlify, etc.)

## 🔐 Environment Variables

```env
# Required for AI features
VITE_OPENAI_API_KEY=sk-proj-...

# Optional: Add custom configuration
VITE_APP_TITLE=Interview Agent
```

## 📝 License

MIT License - Feel free to use for your interview processes

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💡 Tips for Interviewers

1. **Prepare**: Review questions before the interview
2. **Adapt**: Use "Add Question" to ask follow-ups
3. **Document**: Use comments field extensively
4. **General Feedback**: Fill immediately after interview while fresh
5. **Code Exercises**: Share editor links for practical assessment
6. **Review AI Insights**: Use as additional perspective, not sole decision
7. **Export Reports**: Save for future reference and comparison

## 🐛 Troubleshooting

### AI Features Not Working
- Check `.env` file exists with valid `VITE_OPENAI_API_KEY`
- Restart dev server after adding `.env`
- Verify API key at https://platform.openai.com/api-keys

### Code Editor Links Not Working
- Ensure localStorage is enabled in browser
- Check that hash format is 20 characters (XXXXX-XXXXX-XXXXX-XXXXX)
- Clear browser cache if issues persist

### Auto-Save Not Working
- Check browser console for errors
- Verify localStorage has space available
- Ensure code field is not empty (only saves with content)

---

**Built for Runtime Revolution Technical Interviews 🚀**

For support or questions, contact your development team.
