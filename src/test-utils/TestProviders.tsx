import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export const TestProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
}; 