import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { Save, CheckCircle, CloudSync } from '@mui/icons-material';

const API_URL = import.meta.env.PROD
  ? '/api/code-session'
  : 'http://localhost:5173/api/code-session';

// Helper function to get placeholder based on technology
const getPlaceholderByTech = (technology) => {
  const placeholders = {
    rails: `# Type your Ruby/Rails code here...

def example
  puts 'Hello, Rails!'
end`,
    node: `// Type your Node.js code here...

function example() {
  console.log('Hello, Node.js!');
}`,
    react: `// Type your React code here...

function Example() {
  return <div>Hello, React!</div>;
}`,
    python: `# Type your Python code here...

def example():
    print('Hello, Python!')`,
  };

  return placeholders[technology] || `// Type your code here...`;
};

const CodeEditor = ({ sessionId, onSave }) => {
  const [saved, setSaved] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [code, setCode] = useState('');
  const [questionInfo, setQuestionInfo] = useState(null);
  const [lastRemoteModified, setLastRemoteModified] = useState(null);
  const isLocalChange = useRef(false);
  const loadingInitialData = useRef(true);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // Helper function to save to backend
  const saveToBackend = async (codeToSave, questionInfoToSave) => {
    try {
      console.log('[CodeEditor] Saving to backend:', {
        codeLength: codeToSave?.length,
        sessionId,
        apiUrl: API_URL,
        codePreview: codeToSave?.substring(0, 50)
      });

      const fullUrl = `${API_URL}?sessionId=${sessionId}`;
      console.log('[CodeEditor] POST to:', fullUrl);

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: codeToSave,
          questionInfo: questionInfoToSave,
        }),
      });

      console.log('[CodeEditor] Save response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('[CodeEditor] Saved successfully to backend:', data);
        setLastRemoteModified(Date.now());
        // Also save to localStorage as backup
        localStorage.setItem(`code_session_${sessionId}`, JSON.stringify({
          code: codeToSave,
          timestamp: data.timestamp,
          questionInfo: questionInfoToSave,
        }));
        return true;
      }
      console.error('[CodeEditor] Save failed with status:', response.status);
      return false;
    } catch (error) {
      console.error('[CodeEditor] Error saving to backend:', error);
      // Fallback to localStorage
      localStorage.setItem(`code_session_${sessionId}`, JSON.stringify({
        code: codeToSave,
        timestamp: new Date().toISOString(),
        questionInfo: questionInfoToSave,
      }));
      return false;
    }
  };

  // Load initial data from backend
  useEffect(() => {
    const loadSessionData = async () => {
      try {
        console.log('[CodeEditor] Loading session data for:', sessionId);
        console.log('[CodeEditor] API URL:', API_URL);
        const fullUrl = `${API_URL}?sessionId=${sessionId}`;
        console.log('[CodeEditor] Full URL:', fullUrl);

        const response = await fetch(fullUrl);
        console.log('[CodeEditor] Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('[CodeEditor] Loaded data:', data);
          console.log('[CodeEditor] Code length:', data.code?.length);
          console.log('[CodeEditor] Question info:', data.questionInfo);

          if (data.exists) {
            console.log('[CodeEditor] Session exists in backend. Code length:', data.code?.length || 0);
            setCode(data.code || '');
            setQuestionInfo(data.questionInfo || null);
            setLastRemoteModified(data.lastModified);
          } else {
            console.log('[CodeEditor] No data in backend, checking localStorage');
            // Try localStorage as fallback for backward compatibility
            const localData = localStorage.getItem(`code_session_${sessionId}`);
            console.log('[CodeEditor] LocalStorage data:', localData ? 'found' : 'not found');
            if (localData) {
              const parsed = JSON.parse(localData);
              console.log('[CodeEditor] Parsed localStorage:', parsed);
              setCode(parsed.code || '');
              setQuestionInfo(parsed.questionInfo || null);
              // Upload to backend
              console.log('[CodeEditor] Uploading localStorage data to backend');
              await saveToBackend(parsed.code, parsed.questionInfo);
            } else {
              console.log('[CodeEditor] No localStorage data either');
            }
          }
        } else {
          console.error('[CodeEditor] Response not OK:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('[CodeEditor] Error loading session data:', error);
        // Fallback to localStorage
        const localData = localStorage.getItem(`code_session_${sessionId}`);
        if (localData) {
          const parsed = JSON.parse(localData);
          setCode(parsed.code || '');
          setQuestionInfo(parsed.questionInfo || null);
        }
      } finally {
        console.log('[CodeEditor] Initial load complete. Code length:', code.length);
        loadingInitialData.current = false;
      }
    };

    loadSessionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Poll for updates from backend every 3 seconds
  useEffect(() => {
    // Wait a bit after initial load before starting polling
    const startDelay = setTimeout(() => {
      console.log('[CodeEditor] Starting polling...');

      const pollInterval = setInterval(async () => {
        try {
          setSyncing(true);
          const response = await fetch(`${API_URL}?sessionId=${sessionId}`);

          if (response.ok) {
            const data = await response.json();
            console.log('[CodeEditor] Polled data:', data, 'Local change:', isLocalChange.current);

            // Only update if there's a newer version from remote and we haven't made local changes recently
            if (data.exists &&
                data.lastModified &&
                (!lastRemoteModified || data.lastModified > lastRemoteModified) &&
                !isLocalChange.current) {
              console.log('[CodeEditor] Updating from remote');
              setCode(data.code || '');
              setQuestionInfo(data.questionInfo || null);
              setLastRemoteModified(data.lastModified);
            }
          }
        } catch (error) {
          console.error('Error polling session data:', error);
        } finally {
          setSyncing(false);
        }
      }, 3000); // Poll every 3 seconds

      return () => clearInterval(pollInterval);
    }, 2000); // Start polling after 2 seconds

    return () => clearTimeout(startDelay);
  }, [sessionId, lastRemoteModified]);

  // Auto-save: save code every 2 seconds when there are changes
  useEffect(() => {
    if (loadingInitialData.current) {
      return; // Don't auto-save during initial load
    }

    const autoSaveTimer = setTimeout(async () => {
      if (isLocalChange.current && code !== undefined) {
        console.log('[CodeEditor] Auto-saving code...');
        setAutoSaving(true);
        const success = await saveToBackend(code, questionInfo);
        setAutoSaving(false);
        if (success) {
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }
        isLocalChange.current = false;
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [code, questionInfo]);

  const handleSave = async () => {
    isLocalChange.current = true;
    await saveToBackend(code, questionInfo);

    if (onSave) {
      onSave(sessionId, code);
    }

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      isLocalChange.current = false;
    }, 3000);
  };

  const handleCodeChange = (e) => {
    isLocalChange.current = true;
    setCode(e.target.value);
    // Reset local change flag after a delay
    setTimeout(() => {
      isLocalChange.current = false;
    }, 5000);
  };

  // Handle Tab key to insert tab character instead of focusing next element
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      // Insert tab (2 spaces)
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      setCode(newValue);

      // Move cursor after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Calculate line numbers based on code content
  const lineNumbers = code.split('\n').map((_, index) => index + 1).join('\n');

  // Sync scroll between textarea and line numbers
  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ color: '#2d333a', fontWeight: 500 }}>
                Write your code here
              </Typography>
              {autoSaving && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CloudSync sx={{ fontSize: '1rem', color: '#10a37f', animation: 'spin 2s linear infinite' }} />
                  <Typography variant="caption" sx={{ color: '#10a37f', fontSize: '0.75rem' }}>
                    Auto-saving...
                  </Typography>
                </Box>
              )}
              {!autoSaving && saved && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircle sx={{ fontSize: '1rem', color: '#10a37f' }} />
                  <Typography variant="caption" sx={{ color: '#10a37f', fontSize: '0.75rem' }}>
                    Saved
                  </Typography>
                </Box>
              )}
              {syncing && !autoSaving && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CloudSync sx={{ fontSize: '1rem', color: '#6e6e80', animation: 'spin 2s linear infinite' }} />
                  <Typography variant="caption" sx={{ color: '#6e6e80', fontSize: '0.75rem' }}>
                    Syncing...
                  </Typography>
                </Box>
              )}
            </Box>
            <Button
              variant="contained"
              startIcon={saved ? <CheckCircle /> : <Save />}
              onClick={handleSave}
              disabled={autoSaving}
              sx={{
                bgcolor: saved ? '#10a37f' : '#10a37f',
                '&:hover': {
                  bgcolor: '#0d8c6e',
                },
              }}
            >
              {saved ? 'Saved!' : 'Save Now'}
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              border: '1px solid #d1d5db',
              borderRadius: 1,
              overflow: 'hidden',
              bgcolor: '#f9fafb',
              '&:hover': {
                borderColor: '#9ca3af',
              },
              '&:focus-within': {
                borderColor: '#10a37f',
                borderWidth: '2px',
              },
            }}
          >
            {/* Line Numbers */}
            <Box
              component="pre"
              ref={lineNumbersRef}
              sx={{
                m: 0,
                p: 2,
                pr: 1,
                bgcolor: '#e5e7eb',
                color: '#6e6e80',
                fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
                fontSize: '0.9375rem',
                lineHeight: 1.5,
                textAlign: 'right',
                userSelect: 'none',
                minWidth: '50px',
                borderRight: '1px solid #d1d5db',
                overflow: 'hidden',
                height: '500px',
              }}
            >
              {lineNumbers}
            </Box>

            {/* Code Input */}
            <Box
              component="textarea"
              ref={textareaRef}
              placeholder={getPlaceholderByTech(questionInfo?.technology)}
              value={code}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              sx={{
                flex: 1,
                p: 2,
                m: 0,
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
                fontSize: '0.9375rem',
                lineHeight: 1.5,
                bgcolor: 'transparent',
                color: '#2d333a',
                height: '500px',
                '&::placeholder': {
                  color: '#9ca3af',
                },
              }}
            />
          </Box>
        </Box>

        <Alert
          severity="info"
          sx={{ borderRadius: 2 }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            💡 Auto-save & Real-time collaboration enabled
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            Your code is automatically saved 2 seconds after you stop typing. Changes sync across all viewers every 3 seconds. Use Tab key to indent.
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

