import { useTranslation } from 'react-i18next';
import { Text, Image, VStack } from '@chakra-ui/react';
import { QuizGame } from './QuizGame';
import { useQuiz } from '../../context/QuizContext';

export function FlagQuiz() {
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
        <VStack spacing={4}>
          {currentQuestion.imageUrl && (
            <Image
              src={currentQuestion.imageUrl}
              alt={t('flagAlt')}
              boxSize="200px"
              objectFit="contain"
            />
          )}
          <Text fontSize="xl" fontWeight="bold">
            {t('question.flag')}
          </Text>
        </VStack>
      }
    />
  );
} 