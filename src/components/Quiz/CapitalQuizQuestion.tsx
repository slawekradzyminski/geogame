import { Box, Typography, Button, Grid, CircularProgress, Paper, alpha } from '@mui/material';
import { useCapitalQuiz } from '../../hooks/useCapitalQuiz';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

export const CapitalQuizQuestion = () => {
  const { state, question, submitAnswer } = useCapitalQuiz();
  const { t } = useTranslation(['quiz']);
  const theme = useTheme();

  if (!question) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box 
      data-testid="quiz-question" 
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
          {t('question')} {state.currentQuestionNumber}/10
        </Typography>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            color: theme.palette.text.secondary,
            fontWeight: 500
          }}
        >
          {t('whatIsCapital', { country: question.name })}
        </Typography>
        <Box my={4} display="flex" justifyContent="center">
          <Paper 
            elevation={8}
            sx={{ 
              p: 2,
              background: 'white',
              borderRadius: 2,
              transform: 'rotate(-1deg)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'rotate(1deg) scale(1.02)'
              }
            }}
          >
            <img 
              src={question.flag} 
              alt={`${question.name} flag`}
              style={{ 
                maxWidth: '200px', 
                height: 'auto',
                borderRadius: '4px',
              }}
              data-testid="country-flag"
            />
          </Paper>
        </Box>
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
              sx={{
                py: 3,
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
              {option}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 