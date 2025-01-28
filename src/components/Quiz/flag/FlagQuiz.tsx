import { Container, Paper } from '@mui/material';
import { FlagQuizProvider } from '../../../context/flag/FlagQuizProvider';
import { FlagQuizQuestion } from './FlagQuizQuestion';
import { FlagQuizSummary } from './FlagQuizSummary';
import { useFlagQuiz } from '../../../context/flag/useFlagQuiz';
import { LanguageSwitcher } from '../../LanguageSwitcher';
import './FlagQuiz.css';

const FlagQuizContent = () => {
  const { state } = useFlagQuiz();
  return state.isFinished ? <FlagQuizSummary /> : <FlagQuizQuestion />;
};

export const FlagQuiz = () => {
  return (
    <FlagQuizProvider>
      <Container maxWidth="md" className="flag-quiz-container" data-testid="flag-quiz-container">
        <div className="language-switcher-container">
          <LanguageSwitcher />
        </div>
        <Paper elevation={3} className="flag-quiz-paper" data-testid="flag-quiz-paper">
          <FlagQuizContent />
        </Paper>
      </Container>
    </FlagQuizProvider>
  );
}; 