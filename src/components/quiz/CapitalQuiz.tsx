import { useTranslation } from 'react-i18next';
import { Text, Image, VStack } from '@chakra-ui/react';
import { QuizGame } from './QuizGame';
import { useQuiz } from '../../context/QuizContext';

export function CapitalQuiz() {
  const { t } = useTranslation('quiz');
  const { currentQuestion } = useQuiz();

  if (!currentQuestion) {
    return (
      <Text textAlign="center" p={8}>
        {t('loading')}
      </Text>
    );
  }

  // Use the country code from the question data
  const flagUrl = currentQuestion.countryCode ? 
    `/flags/${currentQuestion.countryCode.toLowerCase()}.svg` : 
    undefined;

  // Debug logging
  console.log('Current question:', currentQuestion);
  console.log('Country code:', currentQuestion.countryCode);
  console.log('Flag URL:', flagUrl);

  return (
    <QuizGame
      questionContent={
        <VStack spacing={4}>
          {flagUrl && (
            <Image
              src={flagUrl}
              alt={t('flagAlt')}
              boxSize="200px"
              objectFit="contain"
              onError={(e) => {
                console.error('Error loading flag:', e);
                console.log('Failed URL:', flagUrl);
              }}
            />
          )}
          <Text fontSize="xl" fontWeight="bold">
            {t('question.capital', {
              item: currentQuestion.questionItem,
            })}
          </Text>
        </VStack>
      }
    />
  );
} 