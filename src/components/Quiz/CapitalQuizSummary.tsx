import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useCapitalQuiz } from '../../hooks/useCapitalQuiz';
import { useTranslation } from 'react-i18next';
import { useTheme, alpha } from '@mui/material/styles';
import './CapitalQuizSummary.css';

export const CapitalQuizSummary = () => {
  const { state, resetQuiz } = useCapitalQuiz();
  const { t } = useTranslation(['quiz']);
  const theme = useTheme();

  const accuracy = (state.score / state.answers.length) * 100;

  return (
    <Box 
      data-testid="quiz-summary"
      className="summary-container"
      sx={{
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
      }}
    >
      <div className="summary-header">
        <Typography
          variant="h3"
          gutterBottom
          className="summary-title"
          sx={{
            background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('summary')}
        </Typography>
        <Typography 
          variant="h4" 
          gutterBottom
          className="summary-score"
          sx={{ color: theme.palette.text.secondary }}
        >
          {t('finalScore')}: {state.score}/{state.answers.length}
        </Typography>
        <Typography 
          variant="h5"
          sx={{ color: theme.palette.text.secondary }}
        >
          {t('accuracy')}: {accuracy.toFixed(1)}%
        </Typography>
      </div>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {state.answers.map((answer) => (
          <Grid item xs={12} key={answer.questionId}>
            <Paper
              elevation={3}
              className="answer-card"
            >
              <Typography variant="h6" gutterBottom>
                {t('whatIsCapital', { country: answer.countryName })}
              </Typography>
              <div className="answer-details">
                <Typography color="text.secondary">
                  {t('correctAnswer')}: {answer.correctAnswer}
                </Typography>
                <Typography color={answer.isCorrect ? 'success.main' : 'error.main'}>
                  {t('yourAnswer')}: {answer.selectedAnswer || t('noAnswer')}
                </Typography>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <div className="play-again-container">
        <Button
          variant="contained"
          size="large"
          onClick={resetQuiz}
          data-testid="play-again-button"
          className="play-again-button"
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
            '&:hover': {
              boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
            }
          }}
        >
          {t('playAgain')}
        </Button>
      </div>
    </Box>
  );
}; 