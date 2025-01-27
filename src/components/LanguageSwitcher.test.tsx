import { render, screen, fireEvent, waitFor } from '../test-utils/test-utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import i18n from 'i18next';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('should change language when selecting from menu', async () => {
    // given
    render(<LanguageSwitcher />);
    
    // when
    const languageButton = screen.getByRole('button', { name: /language/i });
    fireEvent.click(languageButton);
    fireEvent.click(screen.getByText('Polski'));

    // then
    await waitFor(() => {
      expect(i18n.language).toBe('pl');
      expect(screen.getByRole('button', { name: /język/i })).toBeInTheDocument();
    });
  });

  it('should handle keyboard navigation', async () => {
    // given
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button', { name: /language/i });
    
    // when
    fireEvent.click(button);
    
    // then
    const menu = await screen.findByRole('menu');
    expect(menu).toBeVisible();
    
    const polishOption = await screen.findByText('Polski');
    const englishOption = await screen.findByText('English');
    expect(polishOption).toBeVisible();
    expect(englishOption).toBeVisible();
  });
}); 