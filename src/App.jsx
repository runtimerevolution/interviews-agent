import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './components/HomePage';
import InterviewPage from './components/InterviewPage';
import ReportPage from './components/ReportPage';
import CodeEditor from './components/CodeEditor';
import { questions as railsQuestions } from './data/questions_rails';
import { questions as nodeQuestions } from './data/questions_node';
import { questions as reactQuestions } from './data/questions_react';
import { questions as pythonQuestions } from './data/questions_python';

const questionsByTech = {
  rails: railsQuestions,
  node: nodeQuestions,
  react: reactQuestions,
  python: pythonQuestions,
};

const techNames = {
  rails: 'Ruby on Rails',
  node: 'Node.js',
  react: 'React',
  python: 'Python',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#10a37f',
    },
    secondary: {
      main: '#6e6e80',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d333a',
      secondary: '#6e6e80',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.95rem',
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 6,
          padding: '8px 16px',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [interviewData, setInterviewData] = useState([]);
  const [codeSessionId, setCodeSessionId] = useState(null);
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [generalFeedback, setGeneralFeedback] = useState(null);

  // Check URL for code editor session
  useEffect(() => {
    const path = window.location.pathname;
    if (path.length > 1) {
      const sessionId = path.substring(1);
      setCodeSessionId(sessionId);
      setCurrentPage('code-editor');
    }
  }, []);

  const startInterview = (technology) => {
    const questions = questionsByTech[technology];
    setSelectedTechnology(technology);
    setInterviewData(
      questions.map(q => ({
        ...q,
        score: null,
        comment: '',
        codeSessionId: null,
        candidateCode: '',
        subQuestions: q.subQuestions ? q.subQuestions.map(sq => ({ ...sq, score: null })) : undefined
      }))
    );
    setCurrentPage('interview');
  };

  const updateQuestionData = (questionId, data) => {
    setInterviewData(prev =>
      prev.map(q => (q.id === questionId ? { ...q, ...data } : q))
    );
  };

  const addQuestion = (newQuestionData) => {
    const newQuestion = {
      ...newQuestionData,
      id: Date.now(),
      score: null,
      comment: '',
      codeSessionId: null,
      candidateCode: '',
      subQuestions: newQuestionData.subQuestions ? newQuestionData.subQuestions.map(sq => ({ ...sq, score: null })) : undefined
    };
    setInterviewData(prev => [...prev, newQuestion]);
  };

  const handleCodeSave = (sessionId, code) => {
    // Find question with this session ID and update its code
    setInterviewData(prev =>
      prev.map(q => (q.codeSessionId === sessionId ? { ...q, candidateCode: code } : q))
    );
  };

  const finishInterview = () => {
    // Load any saved code from localStorage before showing report
    const updatedData = interviewData.map(q => {
      if (q.codeSessionId) {
        const sessionData = localStorage.getItem(`code_session_${q.codeSessionId}`);
        if (sessionData) {
          try {
            const { code } = JSON.parse(sessionData);
            return { ...q, candidateCode: code || '' };
          } catch (e) {
            console.error('Error loading code:', e);
          }
        }
      }
      return q;
    });

    setInterviewData(updatedData);
    setCurrentPage('report');
  };

  const restartInterview = () => {
    setInterviewData([]);
    setSelectedTechnology(null);
    setGeneralFeedback(null);
    setCurrentPage('home');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage === 'home' && <HomePage onStart={startInterview} />}
      {currentPage === 'interview' && (
        <InterviewPage
          questions={interviewData}
          onUpdateQuestion={updateQuestionData}
          onAddQuestion={addQuestion}
          onFinish={finishInterview}
          generalFeedback={generalFeedback}
          onGeneralFeedbackChange={setGeneralFeedback}
        />
      )}
      {currentPage === 'report' && (
        <ReportPage
          interviewData={interviewData}
          technology={selectedTechnology}
          technologyName={techNames[selectedTechnology]}
          onRestart={restartInterview}
          generalFeedback={generalFeedback}
        />
      )}
      {currentPage === 'code-editor' && (
        <CodeEditor
          sessionId={codeSessionId}
          onSave={handleCodeSave}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
