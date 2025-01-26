import { useTranslation } from 'react-i18next';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Tooltip,
  alpha
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' }
];

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    handleClose();
  };

  return (
    <>
      <Tooltip title={t('language.select')}>
        <IconButton
          onClick={handleClick}
          size="large"
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          color="inherit"
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        PaperProps={{
          sx: {
            bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.9),
            color: 'white',
            '& .MuiMenuItem-root': {
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
              },
              '&.Mui-selected': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.6),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.7),
                },
              },
            },
          },
        }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            selected={i18n.language === lang.code}
          >
            <ListItemIcon sx={{ fontSize: 20, color: 'white' }}>
              {lang.flag}
            </ListItemIcon>
            <ListItemText>{lang.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
} 