import { Box, Typography, Button, Grid, CircularProgress, Paper } from '@mui/material';
import { useCapitalQuiz } from '../../hooks/useCapitalQuiz';
import { useTranslation } from 'react-i18next';
import { useTheme, alpha } from '@mui/material/styles';
import './CapitalQuizQuestion.css';

export const CapitalQuizQuestion = () => {
  const { state, question, submitAnswer } = useCapitalQuiz();
  const { t } = useTranslation(['quiz']);
  const theme = useTheme();

  if (!question) {
    return (
      <div className="loading-container">
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <Box 
      data-testid="quiz-question" 
      className="question-container"
      sx={{
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h3"
          gutterBottom
          className="question-title"
          sx={{
            background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('question')} {state.currentQuestionNumber}/10
        </Typography>
        <Typography 
          variant="h4" 
          gutterBottom
          className="question-subtitle"
          sx={{ color: theme.palette.text.secondary }}
        >
          {t('whatIsCapital', { country: question.name })}
        </Typography>
        <div className="flag-container">
          <Paper className="flag-paper" elevation={8}>
            <img 
              src={question.flag} 
              alt={`${question.name} flag`}
              className="flag-image"
              data-testid="country-flag"
            />
          </Paper>
        </div>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {question.options.map((option, index) => (
          <Grid item xs={12} sm={6} key={option}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => submitAnswer(option)}
              data-testid={`answer-option-${index}`}
              className="answer-button"
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                '&:hover': {
                  boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                }
              }}
            >
              {option}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 