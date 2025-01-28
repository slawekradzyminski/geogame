import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useFlagQuiz } from '../../../context/flag/useFlagQuiz';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import './FlagQuizQuestion.css';
import { Language } from '../../../types/quiz';
import { ANSWER_LETTERS } from '../constants';

export const FlagQuizQuestion = () => {
  const { state, question, submitAnswer } = useFlagQuiz();
  const { t, i18n } = useTranslation(['quiz']);
  const theme = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!question) {
    return (
      <div className="loading-container" data-testid="loading-indicator">
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
    >
      <Box textAlign="center">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
          data-testid="question-number"
        >
          {t('question')} {state.currentQuestionNumber}/10
        </Typography>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ color: theme.palette.text.secondary }}
          data-testid="country-name"
        >
          {countryName}
        </Typography>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ color: theme.palette.text.secondary, mb: 3 }}
          data-testid="question-text"
        >
          {t('questions.flag', { country: countryName })}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {options.map((flagUrl, index) => (
          <Grid item xs={12} sm={6} key={flagUrl}>
            <div className="flag-option-container">
              <button
                onClick={() => handleAnswerClick(flagUrl)}
                disabled={selectedAnswer !== null}
                data-testid={`answer-option-${index}`}
                className={getButtonClass(flagUrl)}
              >
                <span className="flag-answer-letter">{ANSWER_LETTERS[index]}</span>
                <img src={flagUrl} alt={`Flag option ${index + 1}`} data-testid={`flag-image-${index}`} />
              </button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 