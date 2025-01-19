import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Progress, Text, VStack, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type QuizMode = 'capital' | 'flag' | 'language';

export const Quiz = () => {
  const { mode } = useParams<{ mode: QuizMode }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'quiz']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate quiz mode
    if (!mode || !['capital', 'flag', 'language'].includes(mode)) {
      navigate('/');
      return;
    }

    // Load quiz data
    const loadQuizData = async () => {
      try {
        setIsLoading(true);
        // TODO: Load quiz data based on mode
        setIsLoading(false);
      } catch (err) {
        setError(t('common.error'));
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, [mode, navigate, t]);

  if (error) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={4}>
          <Text color="red.500">{error}</Text>
          <Button onClick={() => navigate('/')}>{t('common.back')}</Button>
        </VStack>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={4}>
          <Text>{t('common.loading')}</Text>
          <Progress size="xs" isIndeterminate w="100%" />
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6}>
        <Heading>{t(`quiz:modes.${mode}`)}</Heading>
        <Box w="100%">
          {/* Quiz content will be added here */}
          <Text>Quiz content coming soon...</Text>
        </Box>
        <Button onClick={() => navigate('/')}>{t('common.back')}</Button>
      </VStack>
    </Container>
  );
}; 