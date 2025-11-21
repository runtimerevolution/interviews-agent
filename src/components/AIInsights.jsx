import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { Psychology, Send } from '@mui/icons-material';

const AIInsights = ({ interviewData, technologyName = 'Ruby on Rails', generalFeedback }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const generateInsights = async () => {
    if (!apiKey || !apiKey.trim()) {
      setError('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const answeredQuestions = interviewData.filter(q => q.score !== null);

      // Prepare data for OpenAI
      const interviewSummary = answeredQuestions.map(q => ({
        title: q.title,
        category: q.category,
        level: q.level,
        question: q.question,
        score: q.score,
        feedback: q.comment || 'No feedback provided'
      }));

      // Build general feedback summary
      let generalFeedbackText = '';
      if (generalFeedback && typeof generalFeedback === 'string' && generalFeedback.trim()) {
        generalFeedbackText = `

Interviewer's General Feedback:
${generalFeedback}`;
      }

      const prompt = `You are an expert ${technologyName} technical interviewer and hiring manager at Runtime Revolution. Analyze this comprehensive interview data and provide detailed insights:

Technical Interview Results:
${JSON.stringify(interviewSummary, null, 2)}
${generalFeedbackText}

Based on both the technical questions performance AND the general interview feedback, please provide:

1. **Technical Strengths**: Highlight technical areas where the candidate performed well
2. **Technical Areas for Improvement**: Identify specific ${technologyName} topics needing work based on scores and feedback
3. **Soft Skills & Professional Assessment**: Analyze communication, autonomy, proactivity, and leadership potential based on general feedback
4. **Runtime Revolution Fit**: Assess if the candidate is a good fit for Runtime Revolution based on all feedback (would hire decision, work style, growth potential)
5. **Career Development Path**: Based on current level and 6-month projection, outline what the candidate should focus on
6. **Recommendations**: Specific learning resources, mentorship needs, and skills to practice for both technical and professional growth
7. **Overall Hiring Recommendation**: A comprehensive paragraph summarizing whether to hire, at what level, and with what expectations

Format your response in clear sections with markdown headers (##) for each section. Be specific and actionable in your recommendations.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert ${technologyName} technical interviewer and educator. Provide constructive, specific, and actionable feedback.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate insights');
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      setInsights(aiResponse);
    } catch (err) {
      setError(err.message || 'Failed to generate AI insights');
    } finally {
      setLoading(false);
    }
  };

  const parseInsights = (text) => {
    // Simple markdown-like parsing for sections
    const sections = text.split('##').filter(s => s.trim());
    return sections.map((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      return { title, content, id: index };
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: '1px solid #e1dfdd',
          bgcolor: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Psychology sx={{ fontSize: 32, color: '#8661c5' }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#323130' }}>
              AI-Powered Insights
            </Typography>
            <Typography variant="body2" sx={{ color: '#605e5c' }}>
              Get personalized recommendations and areas for improvement
            </Typography>
          </Box>
        </Box>

        {!insights && (
          <Box>
            <Typography variant="body2" sx={{ mb: 2, color: '#605e5c' }}>
              {apiKey && apiKey.trim()
                ? 'Click the button below to generate AI-powered insights about this interview:'
                : 'OpenAI API key not configured. Add VITE_OPENAI_API_KEY to your .env file to enable AI insights.'}
            </Typography>
            <Button
              variant="contained"
              onClick={generateInsights}
              disabled={loading || !apiKey || !apiKey.trim()}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
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
                  bgcolor: '#e1dfdd',
                  color: '#a19f9d',
                },
              }}
            >
              {loading ? 'Analyzing Interview...' : 'Generate AI Insights'}
            </Button>
            {(!apiKey || !apiKey.trim()) && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Setup Instructions:
                </Typography>
                <Typography variant="body2" component="div" sx={{ fontSize: '0.875rem' }}>
                  1. Get your API key from{' '}
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#8661c5' }}>
                    platform.openai.com
                  </a>
                  <br />
                  2. Create/edit <code style={{ bgcolor: '#f3f2f1', padding: '2px 6px', borderRadius: '3px' }}>.env</code> file in project root
                  <br />
                  3. Add: <code style={{ bgcolor: '#f3f2f1', padding: '2px 6px', borderRadius: '3px' }}>VITE_OPENAI_API_KEY=your_key_here</code>
                  <br />
                  4. Restart the dev server: <code style={{ bgcolor: '#f3f2f1', padding: '2px 6px', borderRadius: '3px' }}>yarn dev</code>
                </Typography>
              </Alert>
            )}
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {insights && (
          <Box>
            <Box sx={{ mb: 3, p: 2, bgcolor: '#f3f0f7', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#8661c5', fontWeight: 600 }}>
                ✓ AI Analysis Complete
              </Typography>
              <Button
                size="small"
                onClick={() => setInsights(null)}
                sx={{ textTransform: 'none', color: '#605e5c' }}
              >
                Generate New
              </Button>
            </Box>

            {parseInsights(insights).map((section) => (
              <Box key={section.id} sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#323130',
                    mb: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  {section.title}
                </Typography>
                <Paper
                  sx={{
                    p: 2.5,
                    bgcolor: '#f8f9fa',
                    border: '1px solid #e1dfdd',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#323130',
                      lineHeight: 1.7,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {section.content}
                  </Typography>
                </Paper>
              </Box>
            ))}

            <Divider sx={{ my: 3 }} />

            <Alert severity="info" sx={{ bgcolor: '#e8f4f8', border: '1px solid #b3d9ff' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                💡 How to use these insights
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                Use this analysis to create a personalized learning plan. Focus on the "Areas to Explore More"
                and follow the specific recommendations. Revisit these insights as you improve your skills.
              </Typography>
            </Alert>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AIInsights;

