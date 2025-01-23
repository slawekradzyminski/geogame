import { Box, Typography, Button, Grid, Paper, alpha } from '@mui/material';
import { useCapitalQuiz } from '../../hooks/useCapitalQuiz';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

export const CapitalQuizSummary = () => {
  const { state, resetQuiz } = useCapitalQuiz();
  const { t } = useTranslation(['quiz']);
  const theme = useTheme();

  const accuracy = (state.score / state.answers.length) * 100;

  return (
    <Box 
      data-testid="quiz-summary"
      p={4} 
      display="flex" 
      flexDirection="column" 
      minHeight="70vh"
      sx={{
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
        borderRadius: 2
      }}
    >
      <Box mb={6} textAlign="center">
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 800,
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
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {state.answers.map((answer) => (
          <Grid item xs={12} key={answer.questionId}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                background: 'white',
                borderRadius: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <Typography variant="h6" gutterBottom>
                {t('whatIsCapital', { country: answer.countryName })}
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography color="text.secondary">
                  {t('correctAnswer')}: {answer.correctAnswer}
                </Typography>
                <Typography color={answer.isCorrect ? 'success.main' : 'error.main'}>
                  {t('yourAnswer')}: {answer.selectedAnswer || t('noAnswer')}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          size="large"
          onClick={resetQuiz}
          data-testid="play-again-button"
          sx={{
            py: 2,
            px: 4,
            fontSize: '1.2rem',
            fontWeight: 600,
            borderRadius: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
            }
          }}
        >
          {t('playAgain')}
        </Button>
      </Box>
    </Box>
  );
}; 