import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';

const AddQuestionDialog = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    category: '',
    level: 'mid',
    title: '',
    question: '',
    correctAnswer: '',
    codeExample: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    if (formData.category && formData.title && formData.question && formData.correctAnswer) {
      onAdd(formData);
      setFormData({
        category: '',
        level: 'mid',
        title: '',
        question: '',
        correctAnswer: '',
        codeExample: '',
      });
      onClose();
    }
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
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, color: '#323130', borderBottom: '1px solid #e1dfdd' }}>
        Add New Question
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#323130' }}>
              Category
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., Rails Framework, Security, etc."
              value={formData.category}
              onChange={handleChange('category')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e1dfdd' },
                  '&:hover fieldset': { borderColor: '#a19f9d' },
                  '&.Mui-focused fieldset': { borderColor: '#8661c5' },
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#323130' }}>
              Level
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.level}
                onChange={handleChange('level')}
                sx={{
                  '& fieldset': { borderColor: '#e1dfdd' },
                  '&:hover fieldset': { borderColor: '#a19f9d' },
                  '&.Mui-focused fieldset': { borderColor: '#8661c5' },
                }}
              >
                <MenuItem value="junior">Junior</MenuItem>
                <MenuItem value="mid">Mid-Level</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#323130' }}>
              Title
            </Typography>
            <TextField
              fullWidth
              placeholder="Short title (e.g., 'N+1 Query Problem')"
              value={formData.title}
              onChange={handleChange('title')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e1dfdd' },
                  '&:hover fieldset': { borderColor: '#a19f9d' },
                  '&.Mui-focused fieldset': { borderColor: '#8661c5' },
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#323130' }}>
              Question
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Enter the interview question..."
              value={formData.question}
              onChange={handleChange('question')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e1dfdd' },
                  '&:hover fieldset': { borderColor: '#a19f9d' },
                  '&.Mui-focused fieldset': { borderColor: '#8661c5' },
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#323130' }}>
              Expected Answer
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Enter the expected answer..."
              value={formData.correctAnswer}
              onChange={handleChange('correctAnswer')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e1dfdd' },
                  '&:hover fieldset': { borderColor: '#a19f9d' },
                  '&.Mui-focused fieldset': { borderColor: '#8661c5' },
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#323130' }}>
              Code Example (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Enter code example (Ruby/Rails)..."
              value={formData.codeExample}
              onChange={handleChange('codeExample')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
                  fontSize: '0.875rem',
                  '& fieldset': { borderColor: '#e1dfdd' },
                  '&:hover fieldset': { borderColor: '#a19f9d' },
                  '&.Mui-focused fieldset': { borderColor: '#8661c5' },
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, borderTop: '1px solid #e1dfdd' }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            color: '#605e5c',
            '&:hover': { bgcolor: '#f3f2f1' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.category || !formData.title || !formData.question || !formData.correctAnswer}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#8661c5',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#744da9',
              boxShadow: 'none',
            },
            '&:disabled': {
              bgcolor: '#f3f2f1',
              color: '#a19f9d',
            },
          }}
        >
          Add Question
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuestionDialog;

