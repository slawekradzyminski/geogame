import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: ColorMode;
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light'
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setMode] = useState<ColorMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#9c27b0',
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
} 