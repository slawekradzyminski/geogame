import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useCapitalQuiz } from '../../hooks/useCapitalQuiz';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { CountryMap } from './CountryMap';
import './CapitalQuizQuestion.css';
import { Language } from '../../types/quiz';

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];

export const CapitalQuizQuestion = () => {
  const { state, question, submitAnswer } = useCapitalQuiz();
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
    if (selectedAnswer === null) return 'answer-button';
    if (selectedAnswer === option) return isCorrect ? 'answer-button correct' : 'answer-button wrong';
    if (option === correctAnswer) return 'answer-button correct';
    return 'answer-button disabled';
  };

  return (
    <Box 
      data-testid="quiz-question" 
      className="question-container"
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
          sx={{ color: theme.palette.text.secondary, mb: 3 }}
        >
          {t('whatIsCapital', { country: countryName })}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className="flag-container">
              <img 
                src={question.flag} 
                alt={`${countryName} flag`}
                className="flag-image"
                data-testid="country-flag"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CountryMap 
              coordinates={question.coordinates}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        {options.map((option, index) => (
          <Grid item xs={12} sm={6} key={option}>
            <button
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
              data-testid={`answer-option-${index}`}
              className={getButtonClass(option)}
            >
              <span className="answer-letter">{ANSWER_LETTERS[index]}</span>
              <span className="answer-text">{option}</span>
            </button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 