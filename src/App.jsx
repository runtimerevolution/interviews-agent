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

// LocalStorage key for persisting interview state
const INTERVIEW_STORAGE_KEY = 'interview_session';

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load interview state from localStorage on mount
  useEffect(() => {
    const path = window.location.pathname;

    // Check URL for code editor session first
    if (path.length > 1) {
      const sessionId = path.substring(1);
      setCodeSessionId(sessionId);
      setCurrentPage('code-editor');
      setIsInitialized(true);
      return;
    }

    // Check for existing interview in localStorage
    try {
      const savedSession = localStorage.getItem(INTERVIEW_STORAGE_KEY);
      if (savedSession) {
        const {
          interviewData: savedData,
          selectedTechnology: savedTech,
          generalFeedback: savedFeedback,
          currentPage: savedPage,
          currentQuestionIndex: savedIndex
        } = JSON.parse(savedSession);

        if (savedData && savedData.length > 0 && savedTech) {
          setInterviewData(savedData);
          setSelectedTechnology(savedTech);
          setGeneralFeedback(savedFeedback || null);
          setCurrentQuestionIndex(savedIndex || 0);
          // Resume to interview page (not report, as that requires finishing)
          setCurrentPage(savedPage === 'report' ? 'report' : 'interview');
        }
      }
    } catch (e) {
      console.error('Error loading interview from localStorage:', e);
    }

    setIsInitialized(true);
  }, []);

  // Save interview state to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;

    // Only save if there's an active interview
    if (interviewData.length > 0 && selectedTechnology && currentPage !== 'home') {
      const sessionData = {
        interviewData,
        selectedTechnology,
        generalFeedback,
        currentPage,
        currentQuestionIndex,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(INTERVIEW_STORAGE_KEY, JSON.stringify(sessionData));
    }
  }, [interviewData, selectedTechnology, generalFeedback, currentPage, currentQuestionIndex, isInitialized]);

  const startInterview = (technology) => {
    // Clear any existing interview data from localStorage
    localStorage.removeItem(INTERVIEW_STORAGE_KEY);

    const questions = questionsByTech[technology];
    setSelectedTechnology(technology);
    setGeneralFeedback(null);
    setCurrentQuestionIndex(0);
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
    // Clear interview data from localStorage
    localStorage.removeItem(INTERVIEW_STORAGE_KEY);

    setInterviewData([]);
    setSelectedTechnology(null);
    setGeneralFeedback(null);
    setCurrentQuestionIndex(0);
    setCurrentPage('home');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage === 'home' && <HomePage onStart={startInterview} />}
      {currentPage === 'interview' && (
        <InterviewPage
          questions={interviewData}
          technology={selectedTechnology}
          technologyName={techNames[selectedTechnology]}
          onUpdateQuestion={updateQuestionData}
          onAddQuestion={addQuestion}
          onFinish={finishInterview}
          generalFeedback={generalFeedback}
          onGeneralFeedbackChange={setGeneralFeedback}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionIndexChange={setCurrentQuestionIndex}
          onGoHome={restartInterview}
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
