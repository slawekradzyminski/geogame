import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaFlag, FaCity, FaLanguage } from 'react-icons/fa';
import { useQuiz } from '../context/QuizContext';
import { QuizMode } from '../types/quiz';

interface QuizModeCardProps {
  mode: QuizMode;
  icon: React.ElementType;
  onClick: () => void;
}

function QuizModeCard({ mode, icon, onClick }: QuizModeCardProps) {
  const { t } = useTranslation('quiz');
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      as="button"
      onClick={onClick}
      bg={bgColor}
      p={6}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'lg',
      }}
      transition="all 0.2s"
    >
      <VStack spacing={4}>
        <Icon as={icon} boxSize={10} />
        <Heading size="md">{t(`modes.${mode}`)}</Heading>
        <Text>{t(`modeDescriptions.${mode}`)}</Text>
      </VStack>
    </Box>
  );
}

export function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const { resetQuiz } = useQuiz();

  const handleModeSelect = (mode: QuizMode) => {
    resetQuiz();
    navigate(`/quiz/${mode}`);
  };

  return (
    <VStack spacing={8} p={{ base: 6, md: 12, lg: 16 }} align="stretch">
      <Box textAlign="center">
        <Heading
          as="h1"
          size={{ base: 'xl', md: '2xl' }}
          mb={4}
        >
          {t('app.title')}
        </Heading>
        <Text
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
          maxW="container.md"
          mx="auto"
        >
          {t('app.description')}
        </Text>
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 4, md: 6, lg: 8 }}
        maxW="container.xl"
        mx="auto"
      >
        <QuizModeCard
          mode="capital"
          icon={FaCity}
          onClick={() => handleModeSelect('capital')}
        />
        <QuizModeCard
          mode="flag"
          icon={FaFlag}
          onClick={() => handleModeSelect('flag')}
        />
        <QuizModeCard
          mode="language"
          icon={FaLanguage}
          onClick={() => handleModeSelect('language')}
        />
      </SimpleGrid>
    </VStack>
  );
} 