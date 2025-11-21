# Application Flow

## Complete User Journey

This document outlines the complete flow through the Runtime Revolution Technical Interview Agent.

## 🏁 Entry Point

```
┌─────────────────────────────────────┐
│         Browser Opens App           │
│      http://localhost:5173          │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│          HomePage.jsx               │
│                                     │
│  🎯 Runtime Revolution Technical    │
│     Interviews                      │
│                                     │
│  ┌───────────┐  ┌───────────┐     │
│  │💎  Rails  │  │🟢 Node.js │     │
│  └───────────┘  └───────────┘     │
│  ┌───────────┐  ┌───────────┐     │
│  │⚛️  React  │  │🐍 Python  │     │
│  └───────────┘  └───────────┘     │
│                                     │
│      [Start Interview]              │
└─────────────────────────────────────┘
```

## 🎯 Technology Selection

### User Action
1. Click on technology card (Rails, Node, React, or Python)
2. Card highlights with checkmark
3. "Start Interview" button becomes enabled

### System Response
```javascript
// In HomePage.jsx
const handleStartInterview = () => {
  if (selectedTech) {
    onStart(selectedTech); // Pass to App.jsx
  }
};

// In App.jsx
const startInterview = (technology) => {
  const questions = questionsByTech[technology];
  setSelectedTechnology(technology);
  setInterviewData(questions.map(q => ({
    ...q,
    score: null,
    comment: '',
    subQuestions: q.subQuestions ?
      q.subQuestions.map(sq => ({ ...sq, score: null })) : undefined
  })));
  setCurrentPage('interview');
};
```

### Navigation
```
HomePage → InterviewPage
```

## 📝 Interview Phase

```
┌──────────────────────────────────────────────────────────────┐
│                    InterviewPage.jsx                          │
│                                                               │
│  ┌─────────────┐  ┌──────────────────────────────────────┐  │
│  │  SIDEBAR    │  │          MAIN CONTENT                 │  │
│  │             │  │                                       │  │
│  │ Questions:  │  │  ┌──────────────────────────────┐   │  │
│  │ ✓ Q1: Sym..│  │  │    QUESTION DISPLAY          │   │  │
│  │ ○ Q2: == ..│  │  │    (Left 60%)                │   │  │
│  │ 🌳 Q3: Find│  │  │  - Question text             │   │  │
│  │            │  │  │  - Expected answer           │   │  │
│  │ Progress:  │  │  │  - Code example              │   │  │
│  │ ████░░ 60% │  │  │  - Sub-questions (if any)    │   │  │
│  │            │  │  └──────────────────────────────┘   │  │
│  │            │  │                                       │  │
│  │ + Add Q    │  │  ┌──────────────────────────────┐   │  │
│  │ 📋 Gen Feed│  │  │    EVALUATION PANEL          │   │  │
│  │ ✓ Finish   │  │  │    (Right 40%)               │   │  │
│  └─────────────┘  │  │  - Score slider(s)           │   │  │
│                    │  │  - Comments field            │   │  │
│                    │  │  - Without Knowledge btn     │   │  │
│                    │  │  - Code Editor Link btn      │   │  │
│                    │  └──────────────────────────────┘   │  │
└──────────────────────────────────────────────────────────────┘
```

### Question Display Flow

#### Standard Question
```
1. Click question in sidebar
   ↓
2. Load question data
   ↓
3. Display:
   - Category chip (e.g., "Basic Ruby")
   - Level chip (e.g., "Junior" in green)
   - Question text
   - Expected answer
   - Code example (syntax highlighted)
   ↓
4. Evaluation panel shows:
   - Single score slider (0-100%)
   - Comments text field
   - "Without Knowledge" button
   - "Generate Code Editor Link" button
```

#### Question with Sub-Questions
```
1. Click question in sidebar (shows 🌳 icon)
   ↓
2. Load question + sub-questions
   ↓
3. Display:
   - Category, level, AND sub-question count chip
   - Main question text
   - Main expected answer
   - Main code example
   - Purple-highlighted sub-questions section:
     * Sub-question 1: Text + Answer + Code
     * Sub-question 2: Text + Answer + Code
     * Sub-question N: Text + Answer + Code
   ↓
4. Evaluation panel shows:
   - Green info box: "Average Score: X%"
   - Purple section for each sub-question:
     * Sub-question text snippet
     * Individual score slider (0-100%)
   - Main comments field
```

### Scoring Actions

#### Standard Scoring
```
User drags slider → Sets score (0-100%) → Updates state
                                        → Icon changes to ✓
                                        → Progress bar updates
```

#### Sub-Question Scoring
```
User drags sub-question slider → Sets sub-question score
                                ↓
System calculates average → Updates parent score
                          → Shows in green info box
                          → Updates sidebar icon
                          → Progress bar updates
```

#### "Without Knowledge" Button
```
User clicks button → score = 0%
                  → comment = "without knowledge"
                  → Icon changes to ⚠️ (orange)
                  → Auto-navigate to next question
```

### Code Editor Link Generation

```
User clicks "Generate Code Editor Link"
         ↓
System generates hash:
  - timestamp = Date.now().toString(36)
  - random = Math.random().toString(36)
  - combined = timestamp + random
  - hash = last 20 chars formatted as XXXXX-XXXXX-XXXXX-XXXXX
         ↓
Store in localStorage:
  - code_session_{hash}
  - { questionInfo, code: '', timestamp }
         ↓
Copy URL to clipboard:
  - http://localhost:5173/{hash}
         ↓
User shares with candidate
```

### Code Editor (Candidate View)

```
Candidate opens link
         ↓
┌──────────────────────────────────────┐
│    Code Editor - Rails Interview     │
├──────────────────────────────────────┤
│ Question: Find Methods               │
│ What is the difference between...    │
│                                       │
│ [Optional Image Displayed Here]      │
│                                       │
│ Write your code here     [Save Code] │
│ ┌──────────────────────────────────┐│
│ │ def find_method                  ││
│ │   # candidate types here         ││
│ │ end                              ││
│ │                                  ││
│ └──────────────────────────────────┘│
│                                       │
│ 💡 Auto-save enabled (every 10s)     │
│ Last auto-saved at 2:45:30 PM        │
└──────────────────────────────────────┘
```

#### Auto-Save Process
```
Every 10 seconds:
  - Check if code is not empty
  - Save to localStorage
  - Show green "✓ Auto-saving..." (2 seconds)
  - Update timestamp
  - Save to parent via callback (if provided)
```

### General Feedback Collection

```
User clicks "General Feedback" button
         ↓
┌──────────────────────────────────────────────┐
│     General Interview Feedback Dialog         │
├──────────────────────────────────────────────┤
│                                               │
│ Soft Skills & Communication:                 │
│ ┌─────────────────────────────────────────┐ │
│ │ Communication Skills:                   │ │
│ │ [Multi-line text field]                 │ │
│ └─────────────────────────────────────────┘ │
│                                               │
│ ┌─────────────────────────────────────────┐ │
│ │ Personality & Team Fit:                 │ │
│ │ [Multi-line text field]                 │ │
│ └─────────────────────────────────────────┘ │
│                                               │
│ Technical Skills & Experience:                │
│ [Multiple text fields...]                     │
│                                               │
│ Leadership & Management:                      │
│ [Multiple text fields...]                     │
│                                               │
│ Overall Assessment:                           │
│ [Multiple text fields including hiring       │
│  decision and recommended level]              │
│                                               │
│          [Cancel]  [Save Feedback]            │
└──────────────────────────────────────────────┘
```

#### Validation Flow
```
User clicks "Save Feedback"
         ↓
Check if at least one field filled
         ↓
    YES: Save and close
         → Button shows "✓"
         → "Finish Interview" enabled
         ↓
    NO: Keep dialog open
        → User continues editing
```

### Finishing Interview

```
All required steps complete:
  ✓ At least one question scored
  ✓ General feedback provided
         ↓
"Finish Interview" button enabled
         ↓
User clicks button
         ↓
System:
  1. Load all code from localStorage
  2. Attach to respective questions
  3. Navigate to ReportPage
```

## 📊 Report Phase

```
┌──────────────────────────────────────────────────────────────┐
│                       ReportPage.jsx                          │
│                                                               │
│  ┌────────────────┐  ┌────────────────────────────────────┐ │
│  │  SUMMARY       │  │        DETAILS                      │ │
│  │                │  │                                     │ │
│  │ 💎 Rails       │  │  ┌─────────────────────────────┐  │ │
│  │                │  │  │  CANDIDATE LEVEL            │  │ │
│  │ Solid Senior   │  │  │  Solid Senior               │  │ │
│  │                │  │  │  Description...             │  │ │
│  │ Average: 85%   │  │  └─────────────────────────────┘  │ │
│  │ Questions: 15  │  │                                     │ │
│  │                │  │  ┌─────────────────────────────┐  │ │
│  │ Level Scores:  │  │  │  🧠 GENERAL FEEDBACK  [🔄]  │  │ │
│  │ Junior: 90%    │  │  │                             │  │ │
│  │ Mid: 85%       │  │  │  Q: Is candidate good?  [×] │  │ │
│  │ Senior: 88%    │  │  │  A: Yes, excellent comm...  │  │ │
│  │                │  │  │                             │  │ │
│  │ [Export]       │  │  │  Q: Technical level?    [×] │  │ │
│  │ [Restart]      │  │  │  A: Senior with 5+ years... │  │ │
│  └────────────────┘  │  └─────────────────────────────┘  │ │
│                      │                                     │ │
│                      │  ┌─────────────────────────────┐  │ │
│                      │  │  AI INSIGHTS    [Generate]  │  │ │
│                      │  │  [AI analysis appears here] │  │ │
│                      │  └─────────────────────────────┘  │ │
│                      │                                     │ │
│                      │  ┌─────────────────────────────┐  │ │
│                      │  │  QUESTION RESPONSES         │  │ │
│                      │  │  [List of all Q&A with      │  │ │
│                      │  │   scores, comments, code]   │  │ │
│                      │  └─────────────────────────────┘  │ │
└──────────────────────────────────────────────────────────────┘
```

### General Feedback Transformation

```
Page loads with general feedback
         ↓
Automatic AI transformation starts:
  1. Check if feedback exists
  2. Check if API key configured
  3. Show loading spinner
         ↓
Call OpenAI GPT-4:
  - Model: gpt-4
  - Prompt: Transform notes to Q&A
  - Temperature: 0.7
  - Max tokens: 1500
         ↓
Parse response:
  - Remove markdown code blocks
  - Parse JSON array
  - Validate structure
         ↓
Display results:
  [{question: "...", answer: "..."}]
         ↓
User actions available:
  - Click [×] to remove item
  - Click [🔄 Regenerate] to retry
  - If error: Click [Retry]
```

### Level Assessment Calculation

```javascript
// Pseudo-code for assessment logic
function getCandidateLevel(answeredQuestions) {
  // Filter by level
  juniorQs = filter(level === 'junior')
  midQs = filter(level === 'mid')
  seniorQs = filter(level === 'senior')

  // Calculate averages
  juniorScore = average(juniorQs.scores)
  midScore = average(midQs.scores)
  seniorScore = average(seniorQs.scores)

  // Determine level (8-tier system)
  if (allScores === 100%) return 'Perfect Senior'
  if (seniorScore >= 90% && others >= 85%) return 'Solid Senior'
  if (seniorScore >= 75% && others >= 75%) return 'Beginning Senior'
  if (seniorScore >= 60% && others >= 70%) return 'Mid → Senior'
  if (midScore >= 80% && junior >= 75%) return 'Solid Mid'
  if (midScore >= 60% && junior >= 70%) return 'Beginner Mid'
  if (juniorScore >= 70% && mid >= 50%) return 'Junior → Mid'
  return 'Junior Developer'
}
```

### AI Insights Generation

```
User clicks "Generate AI Insights"
         ↓
Show loading indicator
         ↓
Prepare data:
  - All answered questions with scores
  - General feedback (if available)
         ↓
Call OpenAI GPT-4:
  - System: "Expert interviewer and educator"
  - Prompt: Analyze technical + general feedback
  - Request: Structured sections
         ↓
Parse markdown response:
  - Technical Strengths
  - Areas for Improvement
  - Soft Skills Assessment
  - Runtime Revolution Fit
  - Career Development Path
  - Recommendations
  - Overall Hiring Recommendation
         ↓
Display formatted insights
```

### Export Report

```
User clicks "Export Report"
         ↓
Compile report text:
  1. Header (technology, date)
  2. Candidate level and average score
  3. Assessment description
  4. General feedback (Q&A format if transformed)
  5. Detailed responses:
     - Question text
     - Level and category
     - Score percentage
     - Comments
     - Candidate code (if any)
     - Sub-question breakdown (if applicable)
         ↓
Generate filename:
  {technology}-interview-report-{YYYY-MM-DD}.txt
         ↓
Create blob and download
```

## 🔄 State Management Flow

### Global State (App.jsx)
```javascript
const [currentPage, setCurrentPage] = useState('home')
const [selectedTechnology, setSelectedTechnology] = useState(null)
const [interviewData, setInterviewData] = useState([])
const [generalFeedback, setGeneralFeedback] = useState({})
const [codeSessionId, setCodeSessionId] = useState(null)
```

### Interview State (InterviewPage.jsx)
```javascript
const [currentIndex, setCurrentIndex] = useState(0)
const [dialogOpen, setDialogOpen] = useState(false)
const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
const [copiedSessionId, setCopiedSessionId] = useState(null)
```

### Report State (ReportPage.jsx)
```javascript
const [transformedFeedback, setTransformedFeedback] = useState(null)
const [loadingFeedback, setLoadingFeedback] = useState(false)
const [feedbackError, setFeedbackError] = useState(null)
```

### Code Editor State (CodeEditor.jsx)
```javascript
const [code, setCode] = useState(() => loadFromLocalStorage())
const [questionInfo, setQuestionInfo] = useState(() => loadFromLocalStorage())
const [saved, setSaved] = useState(false)
const [autoSaving, setAutoSaving] = useState(false)
const [lastAutoSave, setLastAutoSave] = useState(null)
```

## 🔄 Complete User Journey Example

```
1. User opens app
   → Sees homepage with 4 technology options

2. User clicks "Ruby on Rails"
   → Card highlights, button enables

3. User clicks "Start Interview"
   → Navigates to InterviewPage
   → Loads 20 Rails questions (sorted: Junior → Mid → Senior)

4. User clicks first question in sidebar
   → Shows: "Symbols vs Strings" (Junior)
   → Displays question, answer, code example

5. User drags slider to 80%
   → Score set
   → Icon changes to ✓ green
   → Progress bar updates

6. User types comment: "Good explanation of memory efficiency"
   → Comment saved

7. User clicks "Generate Code Editor Link"
   → Creates hash: "lz4k9-x2m7p-3a8bq-5rf9c"
   → Copies to clipboard
   → User shares with candidate

8. Candidate opens link in browser
   → Sees question and code editor
   → Types solution
   → Code auto-saves every 10 seconds

9. User clicks question with 🌳 icon (Q8: Find Methods)
   → Shows main question + 3 sub-questions
   → Evaluation panel shows 3 sliders

10. User scores each sub-question: 85%, 90%, 80%
    → Parent score calculates: 85% average
    → Shows in green info box

11. User clicks "Without Knowledge" on advanced question
    → Sets 0%, adds "without knowledge" comment
    → Icon shows ⚠️ orange
    → Moves to next question

12. User completes 15 questions
    → Progress bar shows 75%

13. User clicks "General Feedback"
    → Opens dialog
    → Fills in: "Excellent communication, solid senior skills..."
    → Clicks "Save Feedback"
    → Button shows "✓"

14. User clicks "Finish Interview"
    → System loads all code from localStorage
    → Navigates to ReportPage

15. Report auto-generates:
    → Level assessment: "Beginning Senior"
    → Average score: 82%
    → AI transforms feedback to Q&A
    → Shows 5 Q&A items

16. User clicks "Regenerate" on feedback
    → AI generates new interpretation
    → New Q&A displayed

17. User removes irrelevant Q&A item
    → Clicks [×] on one item
    → Item disappears immediately

18. User clicks "Generate AI Insights"
    → Loading spinner appears
    → AI analyzes data
    → Displays comprehensive insights

19. User clicks "Export Report"
    → Downloads .txt file
    → Filename: "rails-interview-report-2024-11-21.txt"

20. User clicks "Start New Interview"
    → Returns to homepage
    → Ready for next interview
```

## 🎯 Key Navigation Paths

### Primary Flow
```
Home → Interview → Report → Home
```

### Alternative Flows
```
Interview → Add Question → Interview
Interview → General Feedback Dialog → Interview
Interview → Code Editor (candidate) → Interview
Report → Generate Insights → Report
Report → Regenerate Feedback → Report
Report → Export → Report
```

## 🔐 Data Persistence

### LocalStorage
```javascript
// Code editor sessions
localStorage.setItem(`code_session_${hash}`, JSON.stringify({
  questionInfo: {...},
  code: "...",
  timestamp: "2024-11-21T14:30:00Z"
}))

// General feedback (auto-saved)
localStorage.setItem('generalFeedback', JSON.stringify({
  communicationSkills: "...",
  technicalLevel: "...",
  // ...
}))
```

### Session State
- All interview data in React state
- Lost on page refresh (by design)
- Code editor data persists in localStorage
- General feedback persists in localStorage

---

**This flow represents the complete application journey from start to finish.**

For implementation details, see the source files in `src/components/`.
