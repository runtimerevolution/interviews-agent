import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { Save, CheckCircle } from '@mui/icons-material';

const CodeEditor = ({ sessionId, onSave }) => {
  const [saved, setSaved] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState(null);

  // Initialize state with localStorage data based on sessionId
  const [code, setCode] = useState(() => {
    const sessionData = localStorage.getItem(`code_session_${sessionId}`);
    if (sessionData) {
      try {
        const data = JSON.parse(sessionData);
        return data.code || '';
      } catch (e) {
        console.error('Error parsing session data:', e);
      }
    }
    return '';
  });

  const [questionInfo, setQuestionInfo] = useState(() => {
    const sessionData = localStorage.getItem(`code_session_${sessionId}`);
    if (sessionData) {
      try {
        const data = JSON.parse(sessionData);
        return data.questionInfo || null;
      } catch (e) {
        console.error('Error parsing session data:', e);
      }
    }
    return null;
  });

  // Synchronize React state with external system (localStorage) when sessionId changes
  // This is a valid use case: loading initial data from external storage
  useEffect(() => {
    const sessionData = localStorage.getItem(`code_session_${sessionId}`);
    if (sessionData) {
      try {
        const data = JSON.parse(sessionData);
        // eslint-disable-next-line
        setCode(data.code || '');
        setQuestionInfo(data.questionInfo || null);
      } catch (e) {
        console.error('Error parsing session data:', e);
        setCode('');
        setQuestionInfo(null);
      }
    } else {
      setCode('');
      setQuestionInfo(null);
    }
  }, [sessionId]);

  // Auto-save every 10 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (code.trim()) {
        setAutoSaving(true);
        const sessionData = {
          code,
          timestamp: new Date().toISOString(),
          questionInfo,
        };
        localStorage.setItem(`code_session_${sessionId}`, JSON.stringify(sessionData));

        // Also save to parent if callback provided
        if (onSave) {
          onSave(sessionId, code);
        }

        setLastAutoSave(new Date().toLocaleTimeString());

        // Show auto-save indicator briefly
        setTimeout(() => setAutoSaving(false), 2000);
      }
    }, 10000); // 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(autoSaveInterval);
  }, [code, sessionId, questionInfo, onSave]);

  const handleSave = () => {
    const sessionData = {
      code,
      timestamp: new Date().toISOString(),
      questionInfo,
    };
    localStorage.setItem(`code_session_${sessionId}`, JSON.stringify(sessionData));

    // Also save to parent if callback provided
    if (onSave) {
      onSave(sessionId, code);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: '1px solid #e5e7eb',
          py: 2,
          px: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#2d333a',
            fontSize: '1.1rem',
          }}
        >
          Code Editor - Interview
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {questionInfo && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              border: '1px solid #e5e7eb',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#6e6e80', mb: 1, fontSize: '0.875rem' }}>
              Question
            </Typography>
            <Typography variant="h6" sx={{ color: '#2d333a', fontWeight: 500, fontSize: '1.125rem' }}>
              {questionInfo.title}
            </Typography>
          </Paper>
        )}

        <Box sx={{ mb: 3 }}>
          {questionInfo?.image && (
            <Box sx={{ mb: 3 }}>
              <img
                src={questionInfo.image}
                alt="Question reference"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ color: '#2d333a', fontWeight: 500 }}>
              Write your code here
            </Typography>
            <Button
              variant="contained"
              startIcon={saved ? <CheckCircle /> : <Save />}
              onClick={handleSave}
              sx={{
                bgcolor: saved ? '#10a37f' : '#10a37f',
                '&:hover': {
                  bgcolor: '#0d8c6e',
                },
              }}
            >
              {saved ? 'Saved!' : 'Save Code'}
            </Button>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={20}
            placeholder="# Type your Ruby/Rails code here...

def example
  puts 'Hello, Rails!'
end"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
                fontSize: '0.9375rem',
                bgcolor: '#f9fafb',
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: '#9ca3af',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10a37f',
                  borderWidth: '2px',
                },
              },
            }}
          />
        </Box>

        <Alert
          severity={autoSaving ? "success" : "info"}
          sx={{ borderRadius: 2 }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {autoSaving ? '✓ Auto-saving...' : '💡 Auto-save enabled (every 10 seconds)'}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            {lastAutoSave
              ? `Last auto-saved at ${lastAutoSave}. Click "Save Code" to confirm your submission.`
              : 'Your code will be automatically saved every 10 seconds. Click "Save Code" to confirm your submission.'
            }
          </Typography>
        </Alert>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          borderTop: '1px solid #e5e7eb',
          py: 3,
          px: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '0.875rem' }}>
          This link is private. Only share it with the candidate you're interviewing.
        </Typography>
      </Box>
    </Box>
  );
};

export default CodeEditor;

