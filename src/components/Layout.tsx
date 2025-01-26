import { ReactNode } from 'react';
import { Box, Container, IconButton, Stack } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useColorMode } from '../theme/hooks';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { toggleColorMode, mode } = useColorMode();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          spacing={2}
          sx={{
            py: 2,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <IconButton onClick={toggleColorMode} color="inherit" aria-label="toggle theme">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <LanguageSwitcher />
        </Stack>
        <Box component="main">
          {children}
        </Box>
      </Container>
    </Box>
  );
} 