import { ReactNode } from 'react';
import { Box, Flex, HStack, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <Flex direction="column" minH="100vh" overflow="hidden">
      <Flex
        as="header"
        align="center"
        justify="space-between"
        py={{ base: 3, md: 4 }}
        px={{ base: 4, md: 8 }}
        borderBottomWidth={1}
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        position="sticky"
        top={0}
        zIndex={1}
        boxShadow="sm"
      >
        <Box as="nav">
          {/* Navigation items can be added here */}
        </Box>
        <HStack spacing={{ base: 2, md: 4 }}>
          <LanguageSwitcher />
          <IconButton
            aria-label={t('settings.theme.' + colorMode)}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            size={{ base: 'sm', md: 'md' }}
          />
        </HStack>
      </Flex>

      <Box 
        as="main" 
        flex="1"
        bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
        overflow="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 2, sm: 4, md: 6, lg: 8 }}
        py={{ base: 4, md: 6, lg: 8 }}
      >
        {children}
      </Box>
    </Flex>
  );
}; 