import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Divider,
} from '@mui/material';

const GeneralFeedbackDialog = ({ open, onClose, initialData, onSave }) => {
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (initialData && typeof initialData === 'string') {
      setFeedback(initialData);
    }
  }, [initialData]);

  const handleSave = () => {
    onSave(feedback);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'white',
          border: '1px solid #e5e7eb',
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, color: '#2d333a', borderBottom: '1px solid #e5e7eb' }}>
        General Interview Feedback
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ color: '#6e6e80', mb: 3, lineHeight: 1.6 }}>
          Write your complete interview feedback in free form. Include observations about:
        </Typography>

        <Box sx={{ mb: 3, pl: 2 }}>
          <Typography variant="body2" sx={{ color: '#6e6e80', mb: 0.5 }}>
            • Communication skills (e.g., "Very good at English, clear communication")
          </Typography>
          <Typography variant="body2" sx={{ color: '#6e6e80', mb: 0.5 }}>
            • Technical skills and experience level
          </Typography>
          <Typography variant="body2" sx={{ color: '#6e6e80', mb: 0.5 }}>
            • Autonomy and work style
          </Typography>
          <Typography variant="body2" sx={{ color: '#6e6e80', mb: 0.5 }}>
            • Leadership and team management
          </Typography>
          <Typography variant="body2" sx={{ color: '#6e6e80', mb: 0.5 }}>
            • Strengths and areas for improvement
          </Typography>
          <Typography variant="body2" sx={{ color: '#6e6e80', mb: 0.5 }}>
            • Runtime Revolution fit
          </Typography>
          <Typography variant="body2" sx={{ color: '#6e6e80' }}>
            • Hiring decision and recommended level
          </Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={20}
          placeholder={`Example:

Communication & Soft Skills:
- Very good at English, articulates ideas clearly
- Friendly and creates a good environment with the team
- Excellent communication skills

Technical Skills:
- Senior developer with 5+ years in React and Node.js
- Strong understanding of system architecture
- Can deliver autonomously with minimal guidance
- Worked on complex projects with 8+ people, QA, and design teams

Learning & Growth:
- Proactive learner, stays up to date with new technologies
- Focused and specialized, not just superficial learning

Leadership:
- Has experience managing teams of 5+ people
- Good at mentoring junior developers
- Experience with 1-1s and career development

Strengths:
- Excellent problem-solving skills
- Very good communication
- Strong technical foundation
- Team player

Areas for Improvement:
- Could improve testing practices
- Needs more experience with database optimization

Runtime Revolution Fit:
- Great fit for the team culture
- Aligns well with company values
- Works well in remote environment

Hiring Decision:
- Yes, hire as Senior Developer
- Ready to lead complex projects and mentor team members`}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              '& fieldset': {
                borderColor: '#e5e7eb',
              },
              '&:hover fieldset': {
                borderColor: '#d1d5db',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#10a37f',
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid #e5e7eb' }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            color: '#6e6e80'
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            textTransform: 'none',
            bgcolor: '#10a37f',
            '&:hover': {
              bgcolor: '#0d8c6e',
            }
          }}
        >
          Save Feedback
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralFeedbackDialog;

