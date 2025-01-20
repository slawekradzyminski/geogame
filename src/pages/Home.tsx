import { Box, Button, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { t } = useTranslation(['common', 'quiz']);
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      bg={bgColor} 
      p={{ base: 6, md: 12, lg: 16 }}
      borderRadius="xl" 
      boxShadow="xl"
      textAlign="center"
      w={{ base: '95%', md: '90%', lg: '1000px' }}
      mx="auto"
    >
      <Heading 
        as="h1" 
        size={{ base: 'xl', md: '2xl' }}
        mb={{ base: 4, md: 6, lg: 8 }}
      >
        {t('app.title')}
      </Heading>
      <Text 
        fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
        mb={{ base: 8, md: 12, lg: 16 }}
        px={{ base: 4, md: 8 }}
      >
        {t('app.description')}
      </Text>
      
      <Stack 
        spacing={{ base: 4, md: 6, lg: 8 }} 
        direction={{ base: 'column', md: 'row' }} 
        justify="center"
        w="full"
      >
        <Button
          size={{ base: 'md', md: 'lg' }}
          onClick={() => navigate('/quiz/capital')}
          px={{ base: 8, md: 10, lg: 12 }}
          py={{ base: 6, md: 7, lg: 8 }}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          w={{ base: 'full', md: 'auto' }}
        >
          {t('quiz:modes.capital')}
        </Button>
        <Button
          size={{ base: 'md', md: 'lg' }}
          onClick={() => navigate('/quiz/flag')}
          px={{ base: 8, md: 10, lg: 12 }}
          py={{ base: 6, md: 7, lg: 8 }}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          w={{ base: 'full', md: 'auto' }}
        >
          {t('quiz:modes.flag')}
        </Button>
        <Button
          size={{ base: 'md', md: 'lg' }}
          onClick={() => navigate('/quiz/language')}
          px={{ base: 8, md: 10, lg: 12 }}
          py={{ base: 6, md: 7, lg: 8 }}
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          w={{ base: 'full', md: 'auto' }}
        >
          {t('quiz:modes.language')}
        </Button>
      </Stack>
    </Box>
  );
}; 