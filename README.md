# Interview AI Agent

An intelligent agent designed to facilitate Ruby on interviews by presenting questions, showing correct answers, enabling scoring and comments, skipping unanswered questions, and generating a comprehensive report to determine candidate level.

![Logo](https://rubyonrails.org/assets/images/logo.svg)

## Features

### 🎯 Core Functionality

- **Comprehensive Question Bank**: 20 pre-loaded questions covering:
  - Basic Ruby concepts
  - Framework fundamentals
  - Active Record and database operations
  - Associations and relationships
  - Modular Applications and Concerns
  - Engines
  - Security best practices
  - Advanced topics

- **Interactive Interview Process**:
  - Present questions one at a time with category labels
  - Show/hide correct answers for interviewer reference
  - Input candidate's answers
  - Score responses with a 0-100% slider
  - Add detailed comments for each response
  - Skip questions that aren't relevant

- **Intelligent Reporting**:
  - Automatic candidate level assessment (Junior, Mid, Senior)
  - Average score calculation
  - Detailed breakdown of all answered questions
  - Export report as text file
  - Visual progress tracking
  - **AI-Powered Insights**: OpenAI integration for personalized recommendations

- **Beautiful UI**:
  - Material-UI components
  - Responsive design
  - Modern gradient backgrounds
  - Smooth transitions and animations
  - Clean, professional interface

## Getting Started

### Prerequisites

- Node.js (v20.18.0 or higher)
- Yarn (v1.22.0 or higher)

### Installation

1. Clone the repository:
```bash
cd rails-interview-agent
```

2. Install dependencies:
```bash
yarn install
```

3. Configure environment variables (optional - for AI insights):
```bash
# Create .env file
cp .env.example .env

# Edit .env and add your OpenAI API key
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
yarn dev
```

5. Open your browser and navigate to the local server URL (typically `http://localhost:5173`)

> **Note**: AI insights require an OpenAI API key. The app works fully without it, but AI-powered recommendations won't be available.

## Usage Guide

### 1. Starting an Interview

- Click the "Start Interview" button on the home page
- You'll be taken to the first question

### 2. During the Interview

- **View Question**: Each question is displayed with its category
- **Record Answer**: Enter the candidate's response in the text field
- **Show Correct Answer**: Click the "Show Answer" button to reveal the expected answer
- **Score Response**: Use the slider to assign a percentage score (0-100%)
- **Add Comments**: Provide feedback or notes about the response
- **Navigation**:
  - Use "Previous" and "Next" buttons to navigate between questions
  - Use "Skip Question" to exclude a question from the final report
- **Progress**: Track progress with the progress bar at the top

### 3. Finishing the Interview

- On the last question, click "Finish Interview"
- You'll be redirected to the comprehensive report page

### 4. Reviewing the Report

The report includes:
- **Candidate Level Assessment**: Automatic evaluation (Junior, Mid, Senior)
- **Statistics**:
  - Average score across all answered questions
  - Total questions answered
  - Total questions skipped
- **AI-Powered Insights**: (if API key configured)
  - Areas to explore more
  - Strengths analysis
  - Feedback summary
  - Personalized recommendations
- **Detailed Responses**: Each answered question with scores and comments
- **Export Option**: Download the report as a text file
- **Restart Option**: Begin a new interview

## Candidate Level Assessment Criteria

The system automatically evaluates candidate level based on:

- **Junior Developer** (< 40% average):
  - Understanding of basic Ruby and concepts
  - Needs guidance and mentorship

- **Junior → Mid Transition** (40-55% average):
  - Fundamental knowledge
  - Shows promise with proper mentorship

- **Mid-Level Developer** (55-70% average):
  - Good understanding of MVC, Active Record, and associations
  - Can work independently on standard features

- **Mid → Senior Transition** (70-80% average):
  - Solid grasp of fundamentals
  - Good understanding of advanced concepts

- **Senior Developer** (≥ 80% average + strong advanced topics):
  - Deep knowledge of and best practices
  - Strong understanding of security, engines, and modular architecture
  - Ready for complex challenges and architectural decisions

## Technology Stack

- **Frontend Framework**: React 18+ with Vite
- **UI Library**: Material-UI (MUI) v6
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material-UI Icons
- **Build Tool**: Vite 7

## Project Structure

```
rails-interview-agent/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx          # Landing page with feature cards
│   │   ├── InterviewPage.jsx     # Main interview interface
│   │   └── ReportPage.jsx        # Final report and assessment
│   ├── data/
│   │   └── questions.js          # Question bank
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
└── README.md
```

## Customization

### Adding New Questions

Edit `src/data/questions.js` and add new question objects:

```javascript
{
  id: 21,
  category: "Your Category",
  question: "Your question here?",
  correctAnswer: "The expected answer..."
}
```

### Modifying Assessment Criteria

Edit the `getCandidateLevel()` function in `src/components/ReportPage.jsx` to adjust scoring thresholds and level descriptions.

### Styling

The app uses Material-UI theming. Modify the theme in `src/App.jsx`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#CC0000', // red
    },
  },
});
```

## Build for Production

```bash
yarn build
```

The optimized production build will be in the `dist/` directory.

## Preview Production Build

```bash
yarn preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your interview processes.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Happy Interviewing! 🚀**
