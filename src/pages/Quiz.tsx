import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useQuiz } from '../context/QuizContext';
import { QuizMode } from '../types/quiz';
import { CapitalQuiz } from '../components/quiz/CapitalQuiz';
import { FlagQuiz } from '../components/quiz/FlagQuiz';
import { LanguageQuiz } from '../components/quiz/LanguageQuiz';

export function Quiz() {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('quiz');
  const { startQuiz } = useQuiz();

  useEffect(() => {
    if (!mode || !['capital', 'flag', 'language'].includes(mode)) {
      navigate('/');
      return;
    }
    startQuiz(mode as QuizMode);
  }, [mode, navigate, startQuiz]);

  if (!mode || !['capital', 'flag', 'language'].includes(mode)) {
    return (
      <Box p={8} textAlign="center">
        <Text>{t('invalidMode')}</Text>
      </Box>
    );
  }

  switch (mode) {
    case 'capital':
      return <CapitalQuiz />;
    case 'flag':
      return <FlagQuiz />;
    case 'language':
      return <LanguageQuiz />;
    default:
      return null;
  }
} 