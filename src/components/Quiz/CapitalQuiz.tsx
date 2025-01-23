import { Container, Paper, Box } from '@mui/material';
import { CapitalQuizProvider } from '../../context/CapitalQuizProvider';
import { CapitalQuizQuestion } from './CapitalQuizQuestion';
import { CapitalQuizSummary } from './CapitalQuizSummary';
import { useCapitalQuiz } from '../../hooks/useCapitalQuiz';
import LanguageSwitcher from '../LanguageSwitcher';

const CapitalQuizContent = () => {
  const { state } = useCapitalQuiz();
  return state.isFinished ? <CapitalQuizSummary /> : <CapitalQuizQuestion />;
};

export const CapitalQuiz = () => {
  return (
    <CapitalQuizProvider>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <LanguageSwitcher />
        </Box>
        <Paper elevation={3} sx={{ minHeight: '70vh' }}>
          <CapitalQuizContent />
        </Paper>
      </Container>
    </CapitalQuizProvider>
  );
}; 