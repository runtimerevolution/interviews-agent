import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Grid,
  IconButton,
} from '@mui/material';
import {
  Replay,
  Download,
  CheckCircle,
  Psychology,
  Refresh,
  Close,
  PictureAsPdf,
} from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactMarkdown from 'react-markdown';
import AIInsights from './AIInsights';

const ReportPage = ({ interviewData, technology = 'rails', technologyName = 'Ruby on Rails', onRestart, generalFeedback }) => {
  const [transformedFeedback, setTransformedFeedback] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState(null);

  const getLevelBadge = (level) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  const answeredQuestions = interviewData.filter(q => q.score !== null);

  const totalScore = answeredQuestions.reduce((sum, q) => sum + (q.score || 0), 0);
  const averageScore = answeredQuestions.length > 0 ? totalScore / answeredQuestions.length : 0;

  const getCandidateLevel = () => {
    if (answeredQuestions.length === 0) {
      return {
        level: 'No Data',
        description: 'No questions answered.',
        color: '#605e5c',
        bgcolor: '#f3f2f1',
        levelBreakdown: null,
      };
    }

    // Calculate scores by question level (only from answered questions)
    const juniorQuestions = answeredQuestions.filter(q => q.level === 'junior');
    const midQuestions = answeredQuestions.filter(q => q.level === 'mid');
    const seniorQuestions = answeredQuestions.filter(q => q.level === 'senior');

    const juniorScore = juniorQuestions.length > 0
      ? juniorQuestions.reduce((sum, q) => sum + q.score, 0) / juniorQuestions.length
      : null;
    const midScore = midQuestions.length > 0
      ? midQuestions.reduce((sum, q) => sum + q.score, 0) / midQuestions.length
      : null;
    const seniorScore = seniorQuestions.length > 0
      ? seniorQuestions.reduce((sum, q) => sum + q.score, 0) / seniorQuestions.length
      : null;

    const levelBreakdown = {
      junior: { score: juniorScore || 0, count: juniorQuestions.length },
      mid: { score: midScore || 0, count: midQuestions.length },
      senior: { score: seniorScore || 0, count: seniorQuestions.length },
    };

    // Check for Perfect Senior (all answered questions at 100%)
    const allPerfect = answeredQuestions.every(q => q.score === 100);
    if (allPerfect && seniorQuestions.length > 0) {
      return {
        level: 'Perfect Senior',
        description: `🏆 Exceptional performance! Perfect scores across all answered questions. Demonstrates mastery of ${technologyName} at all levels - from fundamentals to advanced concepts. Expert-level knowledge with the ability to mentor others and lead complex projects.`,
        color: '#8661c5',
        bgcolor: '#f3f0f7',
        levelBreakdown,
      };
    }

    // Solid Senior: Outstanding senior performance with excellent fundamentals
    if (seniorScore !== null && seniorScore >= 90 && (midScore === null || midScore >= 85) && (juniorScore === null || juniorScore >= 85)) {
      return {
        level: 'Solid Senior',
        description: `Outstanding senior-level expertise with comprehensive knowledge across ${technologyName} topics. Strong architectural skills, deep understanding of best practices, and excellent fundamentals. Ready to lead complex projects and mentor team members.`,
        color: '#107c10',
        bgcolor: '#dff6dd',
        levelBreakdown,
      };
    }

    // Beginning Senior: Good senior performance, transitioning into senior role
    if (seniorScore !== null && seniorScore >= 75 && (midScore === null || midScore >= 75) && (juniorScore === null || juniorScore >= 75)) {
      return {
        level: 'Beginning Senior',
        description: `Demonstrates solid senior-level capabilities with strong foundation. Good understanding of advanced ${technologyName} concepts, design patterns, and architectural decisions. Ready for senior responsibilities with occasional guidance.`,
        color: '#107c10',
        bgcolor: '#e6f4ea',
        levelBreakdown,
      };
    }

    // Mid → Senior: Transitioning from mid to senior level
    if (seniorScore !== null && seniorScore >= 60 && (midScore === null || midScore >= 70) && (juniorScore === null || juniorScore >= 70)) {
      return {
        level: 'Mid Going to Senior',
        description: 'Strong mid-level developer showing promising senior-level understanding. Good grasp of advanced concepts with solid fundamentals. Ready for more complex challenges and growing into senior responsibilities with mentorship.',
        color: '#8661c5',
        bgcolor: '#f3f0f7',
        levelBreakdown,
      };
    }

    // Solid Mid: Strong mid-level performance
    if (midScore !== null && midScore >= 80 && (juniorScore === null || juniorScore >= 75)) {
      return {
        level: 'Solid Mid-Level',
        description: `Strong mid-level developer with excellent grasp of ${technologyName} concepts and solid fundamentals. Consistently delivers quality work independently on complex features. Ready to tackle senior-level topics with proper guidance.`,
        color: '#0078d4',
        bgcolor: '#e1f5fe',
        levelBreakdown,
      };
    }

    // Beginner Mid: Early mid-level, solid junior foundation
    if (midScore !== null && midScore >= 60 && (juniorScore === null || juniorScore >= 70)) {
      return {
        level: 'Beginner Mid-Level',
        description: `Developing mid-level skills with good fundamental knowledge. Understands core ${technologyName} concepts and can work on moderately complex features with some guidance. Growing into independent mid-level work.`,
        color: '#0078d4',
        bgcolor: '#e8f4f8',
        levelBreakdown,
      };
    }

    // Junior → Mid: Transitioning from junior to mid
    if (juniorScore !== null && juniorScore >= 70 && (midScore === null || midScore >= 50)) {
      return {
        level: 'Junior Going to Mid-Level',
        description: `Strong junior foundation with emerging mid-level capabilities. Demonstrates solid understanding of ${technologyName} fundamentals and beginning to handle more complex topics. Shows promise for mid-level work with continued learning and mentorship.`,
        color: '#ca5010',
        bgcolor: '#fef7e0',
        levelBreakdown,
      };
    }

    // Junior: Entry level
    return {
      level: 'Junior Developer',
      description: `Entry-level understanding of ${technologyName} concepts. Demonstrates basic knowledge of fundamentals. Needs structured guidance, mentorship, and continued learning to develop proficiency in ${technologyName} development.`,
      color: '#d13438',
      bgcolor: '#fde7e9',
      levelBreakdown,
    };
  };

  const assessment = getCandidateLevel();

  // Transform general feedback into Q&A format using OpenAI
  const transformFeedback = async () => {
    if (!generalFeedback) {
      return;
    }

    // Check if there's any filled feedback
    const hasContent = typeof generalFeedback === 'string'
      ? generalFeedback.trim().length > 0
      : (typeof generalFeedback === 'object' && Object.values(generalFeedback).some(value => value && value.trim()));

    if (!hasContent) {
      return;
    }

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      setFeedbackError('OpenAI API key not configured');
      return;
    }

    setLoadingFeedback(true);
    setFeedbackError(null);

    try {
      // Prepare feedback text
      const feedbackText = typeof generalFeedback === 'string'
        ? generalFeedback
        : JSON.stringify(generalFeedback);

      const prompt = `You are a professional HR assistant. Transform the following interview feedback notes into well-structured questions and answers.

For each feedback point, create:
1. A clear, professional question (e.g., "Is the candidate good in English?", "Does the candidate have leadership experience?")
2. A detailed, professional answer that expands on the feedback provided

Make the answers clear, professional, and comprehensive. Fix any grammar or spelling issues. Keep the tone professional but friendly.

Feedback notes:
${feedbackText}

Return ONLY a JSON array in this exact format:
[
  {
    "question": "The question here?",
    "answer": "The detailed answer here."
  }
]

Do not include any markdown formatting, code blocks, or additional text. Return ONLY the JSON array.`;

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
              content: 'You are a professional HR assistant that transforms interview notes into structured Q&A format. Always return valid JSON only.'
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
        throw new Error('Failed to transform feedback');
      }

      const data = await response.json();
      let aiResponse = data.choices[0].message.content.trim();

      // Remove markdown code blocks if present
      aiResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      const qaArray = JSON.parse(aiResponse);
      setTransformedFeedback(qaArray);
    } catch (err) {
      console.error('Error transforming feedback:', err);
      setFeedbackError('Failed to transform feedback into Q&A format');
    } finally {
      setLoadingFeedback(false);
    }
  };

  // Auto-transform feedback on mount
  useEffect(() => {
    transformFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalFeedback]);

  // Remove a Q&A item from the transformed feedback
  const handleRemoveFeedbackItem = (indexToRemove) => {
    if (transformedFeedback) {
      const updated = transformedFeedback.filter((_, index) => index !== indexToRemove);
      setTransformedFeedback(updated);
    }
  };

  const handleExportReport = () => {
    let generalFeedbackSection = '';

    if (transformedFeedback && transformedFeedback.length > 0) {
      const qaText = transformedFeedback
        .map(qa => `Q: ${qa.question}\nA: ${qa.answer}`)
        .join('\n\n');

      generalFeedbackSection = `

GENERAL INTERVIEW FEEDBACK (Q&A):
----------------------------------

${qaText}
`;
    } else if (generalFeedback && generalFeedback.trim()) {
      const feedbackText = typeof generalFeedback === 'string'
        ? generalFeedback
        : JSON.stringify(generalFeedback, null, 2);

      generalFeedbackSection = `

GENERAL INTERVIEW FEEDBACK:
---------------------------

${feedbackText}
`;
    }

    const reportText = `
${technologyName.toUpperCase()} INTERVIEW REPORT
${'='.repeat(technologyName.length + 17)}
Date: ${new Date().toLocaleDateString()}

CANDIDATE LEVEL: ${assessment.level}
AVERAGE SCORE: ${averageScore.toFixed(1)}%
QUESTIONS ANSWERED: ${answeredQuestions.length}

ASSESSMENT:
${assessment.description}
${generalFeedbackSection}

DETAILED RESPONSES:
-------------------

${answeredQuestions.map((q, index) => `
${index + 1}. [${q.category}] [${q.level.toUpperCase()}] ${q.question}
   Score: ${q.score}%
   ${q.correctAnswer ? `\n   Correct Answer:\n   ${q.correctAnswer}\n` : ''}
   ${q.candidateCode ? `\n   Candidate's Code:\n   ${q.candidateCode.split('\n').map(line => '   ' + line).join('\n')}\n` : ''}
   Feedback: ${q.comment || 'No feedback provided'}
`).join('\n')}
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${technology}-interview-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredHeight) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Helper function to add wrapped text
    const addWrappedText = (text, fontSize, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      const lines = doc.splitTextToSize(text, contentWidth);
      const lineHeight = fontSize * 0.4;

      checkPageBreak(lines.length * lineHeight);

      lines.forEach((line) => {
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    };

    // Title
    doc.setFillColor(134, 97, 197); // Purple color
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(`${technologyName} Interview Report`, pageWidth / 2, 25, { align: 'center' });

    yPosition = 50;
    doc.setTextColor(0, 0, 0);

    // Date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }), margin, yPosition);
    yPosition += 15;

    // Candidate Level Section
    doc.setFillColor(assessment.bgcolor === '#dff6dd' ? 223 : assessment.bgcolor === '#fff4ce' ? 255 : 253,
                     assessment.bgcolor === '#dff6dd' ? 246 : assessment.bgcolor === '#fff4ce' ? 244 : 231,
                     assessment.bgcolor === '#dff6dd' ? 221 : assessment.bgcolor === '#fff4ce' ? 206 : 233);
    doc.roundedRect(margin, yPosition, contentWidth, 30, 3, 3, 'F');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('CANDIDATE LEVEL', margin + 5, yPosition + 8);

    doc.setFontSize(16);
    doc.text(assessment.level, margin + 5, yPosition + 18);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(assessment.description, contentWidth - 10);
    descLines.forEach((line, index) => {
      doc.text(line, margin + 5, yPosition + 25 + (index * 4));
    });

    yPosition += 35 + (descLines.length * 4);

    // Statistics
    checkPageBreak(25);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Average Score: ${averageScore.toFixed(1)}%`, margin, yPosition);
    yPosition += 7;
    doc.setFont('helvetica', 'normal');
    doc.text(`Questions Answered: ${answeredQuestions.length}`, margin, yPosition);
    yPosition += 15;

    // Level Breakdown
    if (assessment.levelBreakdown) {
      checkPageBreak(35);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Performance by Level:', margin, yPosition);
      yPosition += 7;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      if (assessment.levelBreakdown.junior.count > 0) {
        doc.text(`Junior (${assessment.levelBreakdown.junior.count} questions): ${assessment.levelBreakdown.junior.score.toFixed(0)}%`, margin + 5, yPosition);
        yPosition += 6;
      }
      if (assessment.levelBreakdown.mid.count > 0) {
        doc.text(`Mid (${assessment.levelBreakdown.mid.count} questions): ${assessment.levelBreakdown.mid.score.toFixed(0)}%`, margin + 5, yPosition);
        yPosition += 6;
      }
      if (assessment.levelBreakdown.senior.count > 0) {
        doc.text(`Senior (${assessment.levelBreakdown.senior.count} questions): ${assessment.levelBreakdown.senior.score.toFixed(0)}%`, margin + 5, yPosition);
        yPosition += 6;
      }
      yPosition += 10;
    }

    // General Feedback
    if (transformedFeedback && transformedFeedback.length > 0) {
      checkPageBreak(20);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('General Interview Feedback:', margin, yPosition);
      yPosition += 10;

      transformedFeedback.forEach((qa, index) => {
        checkPageBreak(15);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(134, 97, 197);
        addWrappedText(`Q${index + 1}: ${qa.question}`, 10, true);
        yPosition += 2;

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        addWrappedText(qa.answer, 9, false);
        yPosition += 8;
      });
    }

    // Detailed Responses
    doc.addPage();
    yPosition = margin;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Question Responses', margin, yPosition);
    yPosition += 12;

    answeredQuestions.forEach((question, index) => {
      checkPageBreak(30);

      // Question header
      doc.setFillColor(243, 242, 241);
      doc.roundedRect(margin, yPosition, contentWidth, 8, 2, 2, 'F');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. [${question.level.toUpperCase()}] [${question.score}%]`, margin + 3, yPosition + 5);
      yPosition += 12;

      // Question text
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      addWrappedText(question.question, 10, false);
      yPosition += 5;

      // Category
      doc.setFontSize(8);
      doc.setTextColor(134, 97, 197);
      doc.text(`Category: ${question.category}`, margin + 5, yPosition);
      yPosition += 8;
      doc.setTextColor(0, 0, 0);

      // Correct Answer
      if (question.correctAnswer) {
        checkPageBreak(15);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 120, 212);
        doc.text('Correct Answer:', margin + 5, yPosition);
        yPosition += 5;

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        addWrappedText(question.correctAnswer, 9, false);
        yPosition += 5;
      }

      // Feedback
      if (question.comment) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Feedback:', margin + 5, yPosition);
        yPosition += 5;

        doc.setFont('helvetica', 'normal');
        addWrappedText(question.comment, 9, false);
        yPosition += 5;
      }

      // Candidate Code
      if (question.candidateCode) {
        checkPageBreak(20);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text("Candidate's Code:", margin + 5, yPosition);
        yPosition += 5;

        doc.setFillColor(245, 245, 245);
        const codeLines = question.candidateCode.split('\n');
        const codeHeight = Math.min(codeLines.length * 4 + 6, 40); // Limit code box height

        checkPageBreak(codeHeight);
        doc.roundedRect(margin + 5, yPosition, contentWidth - 10, codeHeight, 2, 2, 'F');

        doc.setFont('courier', 'normal');
        doc.setFontSize(7);
        const displayedLines = codeLines.slice(0, 8); // Limit to 8 lines
        displayedLines.forEach((line, idx) => {
          doc.text(line.substring(0, 80), margin + 8, yPosition + 4 + (idx * 4)); // Limit line length
        });
        if (codeLines.length > 8) {
          doc.text('... (truncated)', margin + 8, yPosition + 4 + (8 * 4));
        }
        yPosition += codeHeight + 5;
      }

      // Sub-questions
      if (question.hasSubQuestions && question.subQuestions) {
        checkPageBreak(20);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Sub-questions:', margin + 5, yPosition);
        yPosition += 5;

        question.subQuestions.forEach((sub, subIdx) => {
          checkPageBreak(12);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.text(`${subIdx + 1}. [${sub.score || 0}%] ${sub.question}`, margin + 10, yPosition);
          yPosition += 5;
        });
      }

      yPosition += 10;
    });

    // Save PDF
    doc.save(`${technology}-interview-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#faf9f8' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          bgcolor: '#f3f2f1',
          borderRight: '1px solid #e1dfdd',
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#323130', mb: 3 }}>
          {technologyName} Interview Report
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            bgcolor: 'white',
            border: '1px solid #e1dfdd',
          }}
        >
          <Typography variant="caption" sx={{ color: '#605e5c', display: 'block', mb: 1 }}>
            Assessment
          </Typography>
          <Chip
            label={assessment.level}
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              height: 'auto',
              py: 1,
              bgcolor: assessment.bgcolor,
              color: assessment.color,
              mb: 2,
            }}
          />
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#605e5c' }}>
              Overall Average
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#323130' }}>
              {averageScore.toFixed(1)}%
            </Typography>
          </Box>
          {assessment.levelBreakdown && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="caption" sx={{ color: '#605e5c', display: 'block', mb: 1, fontWeight: 600 }}>
                BY LEVEL
              </Typography>
              {assessment.levelBreakdown.junior.count > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ color: '#605e5c' }}>
                    Junior ({assessment.levelBreakdown.junior.count})
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#107c10' }}>
                    {assessment.levelBreakdown.junior.score.toFixed(0)}%
                  </Typography>
                </Box>
              )}
              {assessment.levelBreakdown.mid.count > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ color: '#605e5c' }}>
                    Mid ({assessment.levelBreakdown.mid.count})
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#0078d4' }}>
                    {assessment.levelBreakdown.mid.score.toFixed(0)}%
                  </Typography>
                </Box>
              )}
              {assessment.levelBreakdown.senior.count > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ color: '#605e5c' }}>
                    Senior ({assessment.levelBreakdown.senior.count})
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#8661c5' }}>
                    {assessment.levelBreakdown.senior.score.toFixed(0)}%
                  </Typography>
                </Box>
              )}
            </>
          )}
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#605e5c' }}>
              Answered
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#323130' }}>
              {answeredQuestions.length}
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleExportReport}
            startIcon={<Download />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderColor: '#e1dfdd',
              color: '#605e5c',
              '&:hover': {
                borderColor: '#a19f9d',
                bgcolor: '#f3f2f1',
              },
            }}
          >
            Export Report (TXT)
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleExportPDF}
            startIcon={<PictureAsPdf />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderColor: '#e1dfdd',
              color: '#605e5c',
              '&:hover': {
                borderColor: '#a19f9d',
                bgcolor: '#f3f2f1',
              },
            }}
          >
            Export Report (PDF)
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={onRestart}
            startIcon={<Replay />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: '#8661c5',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#744da9',
                boxShadow: 'none',
              },
            }}
          >
            New Interview
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#323130', mb: 2 }}>
            Interview Summary
          </Typography>
          <Typography variant="body2" sx={{ color: '#605e5c', mb: 4 }}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 3,
              border: '1px solid #e1dfdd',
              bgcolor: assessment.bgcolor,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: assessment.color, fontWeight: 600, display: 'block', mb: 1 }}
            >
              CANDIDATE LEVEL
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: assessment.color, mb: 2 }}>
              {assessment.level}
            </Typography>
            <Typography variant="body1" sx={{ color: '#323130', lineHeight: 1.6 }}>
              {assessment.description}
            </Typography>
          </Paper>

          {/* General Feedback Section */}
          {generalFeedback && (typeof generalFeedback === 'string' ? generalFeedback.trim().length > 0 : (Object.keys(generalFeedback).length > 0 && Object.values(generalFeedback).some(v => v && v.trim()))) && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                bgcolor: 'white',
                border: '1px solid #e1dfdd',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Psychology sx={{ fontSize: 20, color: '#8661c5' }} />
                  <Typography variant="caption" sx={{ color: '#605e5c', fontWeight: 600 }}>
                    GENERAL INTERVIEW FEEDBACK
                  </Typography>
                </Box>
                {transformedFeedback && !loadingFeedback && (
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<Refresh sx={{ fontSize: '0.875rem' }} />}
                    onClick={transformFeedback}
                    sx={{
                      textTransform: 'none',
                      color: '#8661c5',
                      fontSize: '0.75rem',
                      minWidth: 'auto',
                      '&:hover': {
                        bgcolor: '#f3f0f7',
                      },
                    }}
                  >
                    Regenerate
                  </Button>
                )}
              </Box>

              {loadingFeedback && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, bgcolor: '#f9fafb', borderRadius: 1 }}>
                  <CircularProgress size={20} sx={{ color: '#8661c5' }} />
                  <Typography variant="body2" sx={{ color: '#605e5c' }}>
                    Transforming feedback into Q&A format...
                  </Typography>
                </Box>
              )}

              {feedbackError && (
                <Box sx={{ p: 3, bgcolor: '#fff4ce', borderRadius: 1, border: '1px solid #f7b500' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#ca5010', flex: 1 }}>
                      {feedbackError}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={transformFeedback}
                      sx={{
                        ml: 2,
                        textTransform: 'none',
                        borderColor: '#ca5010',
                        color: '#ca5010',
                        '&:hover': {
                          borderColor: '#a04010',
                          bgcolor: '#fff9e6',
                        },
                      }}
                    >
                      Retry
                    </Button>
                  </Box>
                </Box>
              )}

              {!loadingFeedback && !feedbackError && transformedFeedback && (
                <Grid container spacing={2}>
                  {transformedFeedback.map((qa, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ p: 2, bgcolor: '#f9fafb', borderRadius: 1, border: '1px solid #e5e7eb', position: 'relative' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveFeedbackItem(index)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#9ca3af',
                            '&:hover': {
                              color: '#d13438',
                              bgcolor: '#fde7e9',
                            },
                          }}
                        >
                          <Close sx={{ fontSize: '1rem' }} />
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: '#8661c5',
                            mb: 1,
                            fontSize: '0.9rem',
                            pr: 4,
                          }}
                        >
                          {qa.question}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#2d333a',
                            lineHeight: 1.7,
                            whiteSpace: 'pre-wrap'
                          }}
                        >
                          {qa.answer}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}

              {!loadingFeedback && !feedbackError && !transformedFeedback && (
                <Box sx={{ p: 3, bgcolor: '#f9fafb', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ color: '#605e5c', fontStyle: 'italic' }}>
                    Processing feedback...
                  </Typography>
                </Box>
              )}

              {/* Raw Feedback Section - Always show if feedback exists */}
              {!loadingFeedback && generalFeedback && (
                <Box sx={{ mt: 3, p: 3, bgcolor: '#fafafa', borderRadius: 1, border: '1px solid #e5e7eb' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#605e5c',
                      fontWeight: 600,
                      display: 'block',
                      mb: 2,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Original Notes
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#605e5c',
                      lineHeight: 1.6,
                      fontSize: '0.875rem',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {typeof generalFeedback === 'string' ? generalFeedback : JSON.stringify(generalFeedback, null, 2)}
                  </Typography>
                </Box>
              )}
            </Paper>
          )}

          <AIInsights
            interviewData={interviewData}
            technologyName={technologyName}
            generalFeedback={generalFeedback}
          />

          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: '#323130', mb: 3, mt: 4 }}
          >
            Question Responses
          </Typography>

          {answeredQuestions.map((question) => (
            <Paper
              key={question.id}
              elevation={0}
              sx={{
                p: 3,
                mb: 2,
                border: '1px solid #e1dfdd',
                bgcolor: 'white',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CheckCircle sx={{ fontSize: 18, color: '#107c10' }} />
                    <Chip
                      label={getLevelBadge(question.level)}
                      size="small"
                      sx={{
                        bgcolor: question.level === 'junior' ? 'rgba(209, 250, 229, 0.5)' : question.level === 'mid' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(204, 51, 0, 0.5)',
                        color: question.level === 'junior' ? '#107c10' : question.level === 'mid' ? '#000000' : '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.5625rem',
                        height: 16,
                        minWidth: 'auto',
                        textTransform: 'uppercase',
                        '& .MuiChip-label': {
                          px: 0.625,
                          py: 0.125,
                        },
                      }}
                    />
                    <Chip
                      label={question.category}
                      size="small"
                      sx={{
                        bgcolor: '#f3f2f1',
                        color: '#8661c5',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    />
                    <Chip
                      label={`${question.score}%`}
                      size="small"
                      sx={{
                        bgcolor: question.score >= 70 ? '#dff6dd' : question.score >= 50 ? '#fff4ce' : '#fde7e9',
                        color: question.score >= 70 ? '#107c10' : question.score >= 50 ? '#ca5010' : '#d13438',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                  <Box sx={{
                    '& p': { margin: 0, fontWeight: 500, color: '#323130', fontSize: '1rem' },
                    '& code': {
                      bgcolor: '#f3f2f1',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.9em',
                      fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace'
                    },
                    '& pre': {
                      bgcolor: '#0d1117',
                      color: '#e6edf3',
                      padding: '12px',
                      borderRadius: '4px',
                      overflow: 'auto',
                      margin: '8px 0'
                    },
                    '& pre code': {
                      bgcolor: 'transparent',
                      padding: 0,
                      color: 'inherit'
                    },
                    mb: 2
                  }}>
                    <ReactMarkdown>{question.question}</ReactMarkdown>
                  </Box>
                </Box>
              </Box>

              {question.correctAnswer && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: '#6e6e80', fontWeight: 600, display: 'block', mb: 1 }}>
                    CORRECT ANSWER
                  </Typography>
                  <Box sx={{
                    p: 2,
                    bgcolor: '#f0f9ff',
                    borderRadius: 1,
                    borderLeft: '3px solid #0078d4',
                    '& p': { margin: 0, color: '#2d333a', lineHeight: 1.6 },
                    '& code': {
                      bgcolor: '#e1f5fe',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.9em',
                      fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace'
                    },
                    '& pre': {
                      bgcolor: '#0d1117',
                      color: '#e6edf3',
                      padding: '12px',
                      borderRadius: '4px',
                      overflow: 'auto',
                      margin: '8px 0'
                    },
                    '& pre code': {
                      bgcolor: 'transparent',
                      padding: 0,
                      color: 'inherit'
                    }
                  }}>
                    <ReactMarkdown>{question.correctAnswer}</ReactMarkdown>
                  </Box>
                </Box>
              )}

              {question.candidateCode && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: '#6e6e80', fontWeight: 600, display: 'block', mb: 1 }}>
                    CANDIDATE'S CODE
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      p: 2,
                      bgcolor: '#0d1117',
                      color: '#e6edf3',
                      borderRadius: 1,
                      overflow: 'auto',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
                    }}
                  >
                    <code>{question.candidateCode}</code>
                  </Box>
                </Box>
              )}

              {question.comment && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: '#f9fafb',
                    borderRadius: 1,
                    borderLeft: '3px solid #10a37f',
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#6e6e80', fontWeight: 600, display: 'block', mb: 0.5 }}>
                    FEEDBACK
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2d333a', lineHeight: 1.6 }}>
                    {question.comment}
                  </Typography>
                </Box>
              )}

              {question.hasSubQuestions && question.subQuestions && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: '#6e6e80', fontWeight: 600, display: 'block', mb: 1.5 }}>
                    SUB-QUESTIONS BREAKDOWN
                  </Typography>
                  <Grid container spacing={1.5}>
                    {question.subQuestions.map((subQuestion, idx) => (
                      <Grid item xs={12} key={subQuestion.id}>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: '#f3f0f7',
                            borderRadius: 1,
                            border: '1px solid #e0d5f0',
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="body2" sx={{ color: '#8661c5', fontWeight: 600, fontSize: '0.8125rem' }}>
                              Sub-question {idx + 1}
                            </Typography>
                            <Chip
                              label={`${subQuestion.score !== null && subQuestion.score !== undefined ? subQuestion.score : 0}%`}
                              size="small"
                              sx={{
                                bgcolor: (subQuestion.score || 0) >= 70 ? '#dff6dd' : (subQuestion.score || 0) >= 50 ? '#fff4ce' : '#fde7e9',
                                color: (subQuestion.score || 0) >= 70 ? '#107c10' : (subQuestion.score || 0) >= 50 ? '#ca5010' : '#d13438',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                height: 20,
                              }}
                            />
                          </Box>
                          <Box sx={{
                            '& p': { margin: 0, color: '#2d333a', fontSize: '0.875rem', lineHeight: 1.6 },
                            '& code': {
                              bgcolor: '#e0d5f0',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.85em',
                              fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace'
                            },
                            '& pre': {
                              bgcolor: '#0d1117',
                              color: '#e6edf3',
                              padding: '12px',
                              borderRadius: '4px',
                              overflow: 'auto',
                              margin: '8px 0',
                              fontSize: '0.8rem'
                            },
                            '& pre code': {
                              bgcolor: 'transparent',
                              padding: 0,
                              color: 'inherit'
                            }
                          }}>
                            <ReactMarkdown>{subQuestion.question}</ReactMarkdown>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ReportPage;
