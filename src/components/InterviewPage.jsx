import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Slider,
  List,
  ListItem,
  ListItemButton,
  Divider,
  IconButton,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Add,
  Code as CodeIcon,
  ContentCopy,
  Assignment,
  AccountTree,
} from '@mui/icons-material';
import AddQuestionDialog from './AddQuestionDialog';
import GeneralFeedbackDialog from './GeneralFeedbackDialog';

const InterviewPage = ({ questions, onUpdateQuestion, onFinish, onAddQuestion, generalFeedback, onGeneralFeedbackChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const currentQuestion = questions[currentIndex];

  const handleScoreChange = (event, newValue) => {
    onUpdateQuestion(currentQuestion.id, { score: newValue });
  };

  const handleSubQuestionScoreChange = (subQuestionId, newValue) => {
    const updatedSubQuestions = (currentQuestion.subQuestions || []).map(sq =>
      sq.id === subQuestionId ? { ...sq, score: newValue } : sq
    );

    // Calculate average score from sub-questions
    const scoredSubQuestions = updatedSubQuestions.filter(sq => sq.score !== null && sq.score !== undefined);
    const averageScore = scoredSubQuestions.length > 0
      ? Math.round(scoredSubQuestions.reduce((sum, sq) => sum + sq.score, 0) / scoredSubQuestions.length)
      : null;

    onUpdateQuestion(currentQuestion.id, {
      subQuestions: updatedSubQuestions,
      score: averageScore
    });
  };

  const handleCommentChange = (event) => {
    onUpdateQuestion(currentQuestion.id, { comment: event.target.value });
  };

  const handleWithoutKnowledge = () => {
    onUpdateQuestion(currentQuestion.id, {
      score: 0,
      comment: 'without knowledge',
      skipped: false
    });
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const answeredCount = questions.filter(q => q.score !== null).length;
  const progress = (answeredCount / questions.length) * 100;
  const [copiedSessionId, setCopiedSessionId] = useState(null);

  const handleAddQuestion = (newQuestion) => {
    onAddQuestion(newQuestion);
  };

  const generateCodeSession = () => {
    // Generate unique 20-character session ID with timestamp in format: XXXXX-XXXXX-XXXXX-XXXXX
    const timestamp = Date.now().toString(36); // Convert timestamp to base36
    const random1 = Math.random().toString(36).substring(2);
    const random2 = Math.random().toString(36).substring(2);

    // Combine timestamp and random parts to get enough characters
    const combined = (timestamp + random1 + random2).replace(/[^a-z0-9]/g, '');

    // Extract 20 characters and format with dashes
    const chars = combined.substring(0, 20).padEnd(20, '0'); // Ensure 20 chars
    const sessionId = `${chars.substring(0, 5)}-${chars.substring(5, 10)}-${chars.substring(10, 15)}-${chars.substring(15, 20)}`;

    // Store question info in localStorage for the code editor
    const sessionData = {
      questionInfo: {
        title: currentQuestion.title,
        question: currentQuestion.question,
        image: currentQuestion.image, // Include image if present
      },
      code: '',
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(`code_session_${sessionId}`, JSON.stringify(sessionData));

    // Update question with session ID
    onUpdateQuestion(currentQuestion.id, { codeSessionId: sessionId });

    return sessionId;
  };

  const handleShareCodeEditor = () => {
    let sessionId = currentQuestion.codeSessionId;

    if (!sessionId) {
      sessionId = generateCodeSession();
    }

    const url = `${window.location.origin}/${sessionId}`;
    navigator.clipboard.writeText(url);
    setCopiedSessionId(sessionId);
    setTimeout(() => setCopiedSessionId(null), 3000);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'junior': return { bg: '#d1fae5', text: '#065f46' };
      case 'mid': return { bg: '#dbeafe', text: '#1e40af' };
      case 'senior': return { bg: '#e0e7ff', text: '#5b21b6' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  // Check if general feedback has content
  const hasGeneralFeedback = generalFeedback && typeof generalFeedback === 'string' && generalFeedback.trim().length > 0;

  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#ffffff' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          bgcolor: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d333a', mb: 2, fontSize: '0.95rem' }}>
            Questions
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: '#6e6e80', mb: 1, display: 'block', fontSize: '0.75rem' }}>
              {questions.length} answered
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 4,
                bgcolor: '#e5e7eb',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${progress}%`,
                  height: '100%',
                  bgcolor: '#10a37f',
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>
          </Box>
        </Box>

        <List sx={{ flex: 1, overflow: 'auto', py: 0 }}>
          {questions.map((q, index) => (
            <ListItem key={q.id} disablePadding>
              <ListItemButton
                selected={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  py: 1.5,
                  px: 3,
                  '&.Mui-selected': {
                    bgcolor: '#e6f7f1',
                    borderLeft: '3px solid #10a37f',
                    '&:hover': { bgcolor: '#d1f0e0' },
                  },
                  '&:hover': {
                    bgcolor: '#f3f4f6',
                  },
                }}
              >
                <Box sx={{ mr: 2 }}>
                  {q.score !== null ? (
                    <CheckCircle sx={{ fontSize: 18, color: q.score === 0 ? '#f59e0b' : '#10a37f' }} />
                  ) : (
                    <RadioButtonUnchecked sx={{ fontSize: 18, color: '#d1d5db' }} />
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: '#2d333a',
                      mb: 0.5,
                      lineHeight: 1.3,
                    }}
                  >
                    {q.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <Chip
                      label={q.level.charAt(0).toUpperCase() + q.level.slice(1)}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        bgcolor: getLevelColor(q.level).bg,
                        color: getLevelColor(q.level).text,
                        '& .MuiChip-label': {
                          px: 0.75,
                        },
                      }}
                    />
                    {q.hasSubQuestions && (
                      <Chip
                        icon={<AccountTree sx={{ fontSize: '0.75rem !important', ml: 0.5 }} />}
                        label={q.subQuestions?.length || 0}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.65rem',
                          fontWeight: 500,
                          bgcolor: '#f3f0f7',
                          color: '#8661c5',
                          '& .MuiChip-label': {
                            px: 0.75,
                          },
                          '& .MuiChip-icon': {
                            ml: 0.5,
                            fontSize: '0.75rem',
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ p: 3, borderTop: '1px solid #e5e7eb' }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setDialogOpen(true)}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              borderColor: '#d1d5db',
              color: '#6e6e80',
              mb: 2,
              '&:hover': {
                borderColor: '#10a37f',
                bgcolor: '#f0fdf4',
              },
            }}
          >
            Add Question
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setFeedbackDialogOpen(true)}
            startIcon={<Assignment />}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              borderColor: hasGeneralFeedback ? '#10a37f' : '#f59e0b',
              color: hasGeneralFeedback ? '#10a37f' : '#f59e0b',
              bgcolor: hasGeneralFeedback ? 'transparent' : '#fffbeb',
              '&:hover': {
                borderColor: hasGeneralFeedback ? '#0d8c6e' : '#f59e0b',
                bgcolor: hasGeneralFeedback ? '#f0fdf4' : '#fef3c7',
              },
            }}
          >
            General Feedback {hasGeneralFeedback ? '✓' : '(Required)'}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={onFinish}
            disabled={!hasGeneralFeedback}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              bgcolor: '#10a37f',
              '&:hover': {
                bgcolor: '#0d8c6e',
              },
              '&:disabled': {
                bgcolor: '#e5e7eb',
                color: '#9ca3af',
                cursor: 'not-allowed',
              },
            }}
          >
            Finish Interview
          </Button>
          {!hasGeneralFeedback && (
            <Typography
              variant="caption"
              sx={{
                color: '#f59e0b',
                textAlign: 'center',
                fontWeight: 500,
                mt: 1,
              }}
            >
              ⚠️ Please fill General Feedback to finish
            </Typography>
          )}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: '1px solid #e5e7eb',
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ color: '#6e6e80', mb: 0.5, fontSize: '0.875rem' }}>
              Question {currentIndex + 1} of {questions.length}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Chip
                label={currentQuestion.category}
                size="small"
                sx={{
                  bgcolor: '#f3f4f6',
                  color: '#2d333a',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: 24,
                }}
              />
              <Chip
                label={currentQuestion.level.charAt(0).toUpperCase() + currentQuestion.level.slice(1)}
                size="small"
                sx={{
                  bgcolor: getLevelColor(currentQuestion.level).bg,
                  color: getLevelColor(currentQuestion.level).text,
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: 24,
                }}
              />
              {currentQuestion.hasSubQuestions && (
                <Chip
                  icon={<AccountTree sx={{ fontSize: '0.875rem !important' }} />}
                  label={`${currentQuestion.subQuestions?.length || 0} Sub-questions`}
                  size="small"
                  sx={{
                    bgcolor: '#f3f0f7',
                    color: '#8661c5',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    height: 24,
                    '& .MuiChip-icon': {
                      ml: 0.75,
                      fontSize: '0.875rem',
                    },
                  }}
                />
              )}
            </Box>
          </Box>
          <Button
            variant="outlined"
            onClick={handleWithoutKnowledge}
            sx={{
              textTransform: 'none',
              borderColor: '#f59e0b',
              color: '#f59e0b',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#d97706',
                bgcolor: '#fffbeb',
              },
            }}
          >
            Without Knowledge
          </Button>
        </Box>

        {/* Content Area - Split View */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left Panel - Question & Answer */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              overflow: 'auto',
              bgcolor: 'white',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#6e6e80',
                mb: 1.5,
                letterSpacing: '0.025em',
              }}
            >
              QUESTION
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: '#2d333a',
                mb: 5,
                lineHeight: 1.6,
                fontSize: '1.125rem',
              }}
            >
              {currentQuestion.question}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#6e6e80',
                mb: 1.5,
                letterSpacing: '0.025em',
              }}
            >
              EXPECTED ANSWER
            </Typography>
            <Box
              sx={{
                p: 3,
                bgcolor: '#f9fafb',
                borderRadius: 2,
                border: '1px solid #e5e7eb',
                mb: 4,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#2d333a',
                  lineHeight: 1.7,
                  fontSize: '0.9375rem',
                }}
              >
                {currentQuestion.correctAnswer}
              </Typography>
            </Box>

            {currentQuestion.hasSubQuestions && currentQuestion.subQuestions && (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: '#6e6e80',
                    mb: 1.5,
                    letterSpacing: '0.025em',
                  }}
                >
                  SUB-QUESTIONS & ANSWERS
                </Typography>
                {currentQuestion.subQuestions.map((subQuestion, idx) => (
                  <Box
                    key={subQuestion.id}
                    sx={{
                      mb: 3,
                      p: 3,
                      bgcolor: '#f3f0f7',
                      borderRadius: 2,
                      border: '1px solid #e0d5f0',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#8661c5',
                        fontWeight: 600,
                        mb: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      Sub-question {idx + 1}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2d333a',
                        fontWeight: 500,
                        mb: 1.5,
                        fontSize: '0.9375rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {subQuestion.question}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2d333a',
                        lineHeight: 1.7,
                        fontSize: '0.875rem',
                      }}
                    >
                      {subQuestion.correctAnswer}
                    </Typography>
                    {subQuestion.codeExample && (
                      <Box
                        component="pre"
                        sx={{
                          mt: 2,
                          p: 2,
                          bgcolor: '#0d1117',
                          color: '#e6edf3',
                          borderRadius: 1,
                          border: '1px solid #30363d',
                          overflow: 'auto',
                          fontSize: '0.8125rem',
                          lineHeight: 1.6,
                          fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
                        }}
                      >
                        <code>{subQuestion.codeExample}</code>
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}

            {currentQuestion.codeExample && (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: '#6e6e80',
                    mb: 1.5,
                    letterSpacing: '0.025em',
                  }}
                >
                  CODE EXAMPLE
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    p: 3,
                    bgcolor: '#0d1117',
                    color: '#e6edf3',
                    borderRadius: 2,
                    border: '1px solid #30363d',
                    overflow: 'auto',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
                    '& code': {
                      color: '#e6edf3',
                    },
                  }}
                >
                  <code>{currentQuestion.codeExample}</code>
                </Box>
              </>
            )}
          </Box>

          <Divider orientation="vertical" />

          {/* Right Panel - Scoring */}
          <Box
            sx={{
              width: 400,
              p: 4,
              overflow: 'auto',
              bgcolor: '#ffffff',
              borderLeft: '1px solid #e5e7eb',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#6e6e80',
                mb: 2.5,
                letterSpacing: '0.025em',
              }}
            >
              EVALUATION
            </Typography>

            {currentQuestion.hasSubQuestions && currentQuestion.subQuestions ? (
              <>
                <Box sx={{ mb: 3, p: 2, bgcolor: '#f0fdf4', borderRadius: 1, border: '1px solid #10a37f' }}>
                  <Typography variant="body2" sx={{ color: '#107c10', fontWeight: 600, fontSize: '0.875rem' }}>
                    Average Score: {currentQuestion.score !== null ? `${currentQuestion.score}%` : 'Not scored'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6e6e80', fontSize: '0.75rem' }}>
                    Calculated from {currentQuestion.subQuestions.length} sub-questions
                  </Typography>
                </Box>

                {currentQuestion.subQuestions.map((subQuestion, idx) => (
                  <Box key={subQuestion.id} sx={{ mb: 4, pb: 3, borderBottom: idx < currentQuestion.subQuestions.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                    <Typography variant="body2" sx={{ color: '#8661c5', fontWeight: 600, mb: 1, fontSize: '0.875rem' }}>
                      Sub-question {idx + 1}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#2d333a', mb: 2, fontSize: '0.875rem', lineHeight: 1.6 }}>
                      {subQuestion.question}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#2d333a', mb: 2, fontWeight: 500, fontSize: '0.875rem' }}>
                      Score: {subQuestion.score !== null && subQuestion.score !== undefined ? `${subQuestion.score}%` : 'Not scored'}
                    </Typography>
                    <Slider
                      value={subQuestion.score !== null && subQuestion.score !== undefined ? subQuestion.score : 0}
                      onChange={(e, newValue) => handleSubQuestionScoreChange(subQuestion.id, newValue)}
                      valueLabelDisplay="auto"
                      marks={[
                        { value: 0, label: '0' },
                        { value: 50, label: '50' },
                        { value: 100, label: '100' },
                      ]}
                      sx={{
                        color: '#8661c5',
                        '& .MuiSlider-thumb': {
                          width: 16,
                          height: 16,
                        },
                        '& .MuiSlider-mark': {
                          bgcolor: '#8661c5',
                        },
                        '& .MuiSlider-markLabel': {
                          fontSize: '0.75rem',
                          color: '#6e6e80',
                        },
                      }}
                    />
                  </Box>
                ))}
              </>
            ) : (
              <Box sx={{ mb: 4 }}>
                <Typography variant="body2" sx={{ color: '#2d333a', mb: 2, fontWeight: 500, fontSize: '0.9375rem' }}>
                  Score: {currentQuestion.score !== null ? `${currentQuestion.score}%` : 'Not scored'}
                </Typography>
                <Slider
                  value={currentQuestion.score || 0}
                  onChange={handleScoreChange}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                  ]}
                  sx={{
                    color: '#10a37f',
                    '& .MuiSlider-thumb': {
                      width: 16,
                      height: 16,
                    },
                    '& .MuiSlider-mark': {
                      bgcolor: '#10a37f',
                    },
                    '& .MuiSlider-markLabel': {
                      fontSize: '0.75rem',
                      color: '#6e6e80',
                    },
                  }}
                />
              </Box>
            )}

            <Box sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={copiedSessionId === currentQuestion.codeSessionId ? <ContentCopy /> : <CodeIcon />}
                onClick={handleShareCodeEditor}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: '#d1d5db',
                  color: copiedSessionId === currentQuestion.codeSessionId ? '#10a37f' : '#6e6e80',
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#10a37f',
                    bgcolor: '#f0fdf4',
                  },
                }}
              >
                {copiedSessionId === currentQuestion.codeSessionId
                  ? 'Code Editor'
                  : currentQuestion.codeSessionId
                    ? 'Copy Code Editor Link'
                    : 'Share Code Editor with Candidate'}
              </Button>
              {currentQuestion.codeSessionId && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#6e6e80', textAlign: 'center' }}>
                  Candidate can write code at this private link
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: '#2d333a', mb: 1.5, fontWeight: 500, fontSize: '0.9375rem' }}>
                Feedback
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Add your evaluation notes and feedback..."
                value={currentQuestion.comment}
                onChange={handleCommentChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#ffffff',
                    fontSize: '0.9375rem',
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
          </Box>
        </Box>
      </Box>
    </Box>

    <AddQuestionDialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      onAdd={handleAddQuestion}
    />

    <GeneralFeedbackDialog
      open={feedbackDialogOpen}
      onClose={() => setFeedbackDialogOpen(false)}
      initialData={generalFeedback}
      onSave={onGeneralFeedbackChange}
    />
  </>
);
};

export default InterviewPage;
