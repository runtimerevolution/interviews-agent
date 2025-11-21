import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { PlayArrow, CheckCircle } from '@mui/icons-material';

const technologies = [
  {
    id: 'rails',
    name: 'Ruby on Rails',
    description: 'Ruby fundamentals, Rails framework, Active Record, security, and advanced topics',
    icon: '💎',
    color: '#CC0000'
  },
  {
    id: 'node',
    name: 'Node.js',
    description: 'Event loop, Express.js, async programming, databases, testing, and deployment',
    icon: '🟢',
    color: '#68A063'
  },
  {
    id: 'react',
    name: 'React',
    description: 'Components, hooks, state management, routing, performance, and testing',
    icon: '⚛️',
    color: '#61DAFB'
  },
  {
    id: 'python',
    name: 'Python',
    description: 'OOP, data structures, Django/Flask, async programming, testing, and performance',
    icon: '🐍',
    color: '#3776AB'
  },
];

const HomePage = ({ onStart }) => {
  const [selectedTech, setSelectedTech] = useState(null);

  const handleStart = () => {
    if (selectedTech) {
      onStart(selectedTech);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff',
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#2d333a',
            }}
          >
            RR
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#2d333a',
              fontSize: '1.1rem',
            }}
          >
            Runtime Revolution
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 8 }}>
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              color: '#2d333a',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
            }}
          >
            Runtime Revolution Technical Interviews
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#6e6e80',
              maxWidth: 700,
              mx: 'auto',
              mb: 6,
              fontWeight: 400,
              lineHeight: 1.6,
              fontSize: '1.25rem',
            }}
          >
            Select your technology stack and conduct structured interviews with AI-powered insights and automatic assessments.
          </Typography>

          {/* Technology Selection */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              mb: 5,
            }}
          >
            {technologies.map((tech) => (
              <Card
                key={tech.id}
                elevation={0}
                sx={{
                  border: selectedTech === tech.id ? '2px solid #10a37f' : '1px solid #e5e7eb',
                  position: 'relative',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#10a37f',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardActionArea onClick={() => setSelectedTech(tech.id)}>
                  <CardContent sx={{ p: 3, textAlign: 'left', position: 'relative' }}>
                    {selectedTech === tech.id && (
                      <CheckCircle
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          color: '#10a37f',
                          fontSize: 24,
                        }}
                      />
                    )}
                    <Box sx={{ fontSize: '2.5rem', mb: 2 }}>{tech.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: '#2d333a',
                        mb: 1,
                        fontSize: '1.1rem',
                      }}
                    >
                      {tech.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6e6e80',
                        lineHeight: 1.6,
                        fontSize: '0.9rem',
                      }}
                    >
                      {tech.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={handleStart}
            startIcon={<PlayArrow />}
            disabled={!selectedTech}
            sx={{
              py: 1.75,
              px: 4,
              fontSize: '1rem',
              fontWeight: 500,
              borderRadius: 2,
              bgcolor: '#10a37f',
              color: 'white',
              '&:hover': {
                bgcolor: '#0d8c6e',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                bgcolor: '#e5e7eb',
                color: '#9ca3af',
              },
              transition: 'all 0.2s',
            }}
          >
            Start Interview
          </Button>

          <Box
            sx={{
              mt: 8,
              pt: 6,
              borderTop: '1px solid #e5e7eb',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
              textAlign: 'left',
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#2d333a',
                  mb: 1,
                  fontSize: '1rem',
                }}
              >
                Smart Assessment
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#6e6e80',
                  lineHeight: 1.6,
                }}
              >
                Automatic evaluation from Junior to Senior level based on performance across question difficulties
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#2d333a',
                  mb: 1,
                  fontSize: '1rem',
                }}
              >
                AI-Powered Insights
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#6e6e80',
                  lineHeight: 1.6,
                }}
              >
                Get personalized recommendations and areas for improvement using OpenAI analysis
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#2d333a',
                  mb: 1,
                  fontSize: '1rem',
                }}
              >
                Comprehensive Coverage
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#6e6e80',
                  lineHeight: 1.6,
                }}
              >
                20 curated questions with code examples covering fundamentals to advanced topics
              </Typography>
            </Box>
          </Box>
        </Box>
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
          Built with React + Vite + Material-UI
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
