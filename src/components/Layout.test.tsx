import { render, screen, fireEvent } from '../test-utils/test-utils';
import Layout from './Layout';
import { useColorMode } from '../theme/hooks';

// Mock the useColorMode hook
jest.mock('../theme/hooks', () => ({
  useColorMode: jest.fn()
}));

describe('Layout', () => {
  const mockToggleColorMode = jest.fn();

  beforeEach(() => {
    // given
    (useColorMode as jest.Mock).mockReturnValue({
      toggleColorMode: mockToggleColorMode,
      mode: 'light'
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render children content', () => {
    // given
    const testContent = 'Test Content';

    // when
    render(<Layout>{testContent}</Layout>);

    // then
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('should render theme toggle button with correct icon in light mode', () => {
    // when
    render(<Layout>Content</Layout>);

    // then
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
    expect(themeButton.querySelector('svg[data-testid="Brightness4Icon"]')).toBeInTheDocument();
  });

  it('should render theme toggle button with correct icon in dark mode', () => {
    // given
    (useColorMode as jest.Mock).mockReturnValue({
      toggleColorMode: mockToggleColorMode,
      mode: 'dark'
    });

    // when
    render(<Layout>Content</Layout>);

    // then
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
    expect(themeButton.querySelector('svg[data-testid="Brightness7Icon"]')).toBeInTheDocument();
  });

  it('should call toggleColorMode when theme button is clicked', () => {
    // when
    render(<Layout>Content</Layout>);
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(themeButton);

    // then
    expect(mockToggleColorMode).toHaveBeenCalledTimes(1);
  });

  it('should render language switcher', () => {
    // when
    render(<Layout>Content</Layout>);

    // then
    expect(screen.getByRole('button', { name: /language/i })).toBeInTheDocument();
  });
}); 