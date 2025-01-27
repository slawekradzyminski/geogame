import { render as rtlRender, screen, fireEvent, waitFor } from '@testing-library/react';
import { TestProviders } from './TestProviders';

const customRender = (ui: React.ReactElement, options = {}) =>
  rtlRender(ui, { wrapper: TestProviders, ...options });

export { customRender as render, screen, fireEvent, waitFor }; 