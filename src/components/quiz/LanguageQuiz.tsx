import { useTranslation } from 'react-i18next';
import { Text } from '@chakra-ui/react';
import { QuizGame } from './QuizGame';
import { useQuiz } from '../../context/QuizContext';

export function LanguageQuiz() {
  const { t } = useTranslation('quiz');
  const { currentQuestion } = useQuiz();

  if (!currentQuestion) {
    return (
      <Text textAlign="center" p={8}>
        {t('loading')}
      </Text>
    );
  }

  return (
    <QuizGame
      questionContent={
        <Text fontSize="xl" fontWeight="bold">
          {t('question.language', {
            item: currentQuestion.questionItem,
          })}
        </Text>
      }
    />
  );
} 