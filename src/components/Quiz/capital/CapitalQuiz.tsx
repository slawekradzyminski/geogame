import { Container, Paper } from '@mui/material';
import { CapitalQuizProvider } from '../../../context/capital/CapitalQuizProvider';
import { CapitalQuizQuestion } from './CapitalQuizQuestion';
import { CapitalQuizSummary } from './CapitalQuizSummary';
import { useCapitalQuiz } from '../../../context/capital/useCapitalQuiz';
import { LanguageSwitcher } from '../../LanguageSwitcher';
import './CapitalQuiz.css';

const CapitalQuizContent = () => {
  const { state } = useCapitalQuiz();
  return state.isFinished ? <CapitalQuizSummary /> : <CapitalQuizQuestion />;
};

export const CapitalQuiz = () => {
  return (
    <CapitalQuizProvider>
      <Container maxWidth="md" className="quiz-container">
        <div className="language-switcher-container">
          <LanguageSwitcher />
        </div>
        <Paper elevation={3} className="quiz-paper">
          <CapitalQuizContent />
        </Paper>
      </Container>
    </CapitalQuizProvider>
  );
}; 