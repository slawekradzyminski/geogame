import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { theme } from './theme/theme';
import Home from "./pages/Home";
import { CapitalQuiz } from "./components/Quiz/CapitalQuiz";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth={false}
        disableGutters
        sx={{
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:mode" element={<CapitalQuiz />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
