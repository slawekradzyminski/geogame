import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useFlagQuiz } from '../../hooks/useFlagQuiz';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import './FlagQuiz.css';
import { Language } from '../../types/quiz';

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];

export const FlagQuizQuestion = () => {
  const { state, question, submitAnswer } = useFlagQuiz();
  const { t, i18n } = useTranslation(['quiz']);
  const theme = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!question) {
    return (
      <div className="loading-container">
        <CircularProgress size={60} />
      </div>
    );
  }

  const currentLanguage = i18n.language as Language;
  const countryName = currentLanguage === 'pl' ? question.namePL : question.nameEN;
  const options = currentLanguage === 'pl' ? question.optionsPL : question.optionsEN;
  const correctAnswer = currentLanguage === 'pl' ? question.correctAnswerPL : question.correctAnswerEN;
  
  const handleAnswerClick = async (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    
    setTimeout(() => {
      submitAnswer(answer);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }, 2000);
  };

  const getButtonClass = (option: string) => {
    if (selectedAnswer === null) return 'flag-option';
    if (selectedAnswer === option) return `flag-option ${isCorrect ? 'correct' : 'incorrect'}`;
    if (option === correctAnswer && selectedAnswer !== null) return 'flag-option correct';
    return 'flag-option disabled';
  };

  return (
    <Box 
      data-testid="quiz-question" 
      className="flag-question-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: '800px',
        margin: '0 auto',
        padding: 4,
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          {t('question')} {state.currentQuestionNumber}/10
        </Typography>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ color: theme.palette.text.secondary }}
        >
          {countryName}
        </Typography>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ color: theme.palette.text.secondary, mb: 3 }}
        >
          {t('questions.flag', { country: countryName })}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {options.map((flagUrl, index) => (
          <Grid item xs={12} sm={6} key={flagUrl}>
            <button
              onClick={() => handleAnswerClick(flagUrl)}
              disabled={selectedAnswer !== null}
              data-testid={`answer-option-${index}`}
              className={getButtonClass(flagUrl)}
            >
              <span className="flag-answer-letter">{ANSWER_LETTERS[index]}</span>
              <img src={flagUrl} alt={`Flag option ${index + 1}`} />
            </button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 