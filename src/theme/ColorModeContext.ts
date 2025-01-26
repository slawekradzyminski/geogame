import { createContext } from 'react';

export type ColorMode = 'light' | 'dark';

export interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: ColorMode;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light'
}); 