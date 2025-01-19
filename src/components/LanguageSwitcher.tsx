import { Select } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
      size={{ base: 'sm', md: 'md' }}
      width={{ base: '80px', md: 'auto' }}
      variant="filled"
      fontSize={{ base: 'sm', md: 'md' }}
    >
      <option value="en">{t('language.en')}</option>
      <option value="pl">{t('language.pl')}</option>
    </Select>
  );
}; 