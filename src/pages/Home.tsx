import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Button,
  alpha,
  useTheme,
  SvgIconProps,
  Grid,
  Container
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import FlagIcon from '@mui/icons-material/Flag';
import TranslateIcon from '@mui/icons-material/Translate';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LanguageSwitcher from '../components/LanguageSwitcher';

interface QuizOptionProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  description: string;
  onClick: () => void;
  color: string;
}

const QuizOption = ({ icon: Icon, title, description, onClick, color }: QuizOptionProps) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
        },
      }}
    >
      <CardContent sx={{ height: '100%', p: 4, textAlign: 'center' }}>
        <Box
          sx={{
            mb: 3,
            display: 'inline-flex',
            p: 2,
            borderRadius: '50%',
            backgroundColor: alpha(color, 0.1),
          }}
        >
          <Icon sx={{ fontSize: 40, color: color }} />
        </Box>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'quiz']);
  const theme = useTheme();

  const startQuiz = (mode: string) => {
    navigate(`/quiz/${mode}`);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 6 }
      }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'flex-end',
          mb: 2
        }}
      >
        <LanguageSwitcher />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 800, mb: 8 }}>
        <Typography
          component="h1"
          variant="h2"
          sx={{
            mb: 3,
            fontWeight: 800,
            textAlign: 'center',
            background: (theme) =>
              `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('app.title')}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ mb: 4, textAlign: 'center' }}
        >
          {t('app.description')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => startQuiz('random')}
            startIcon={<EmojiEventsIcon />}
            sx={{ 
              px: 4, 
              py: 1.5,
              mb: { xs: 4, md: 6 } 
            }}
          >
            {t('quiz:modes.select')}
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          {t('quiz:modes.select')}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          textAlign="center" 
          sx={{ mb: 6 }}
        >
          {t('app.description')}
        </Typography>

        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
          alignItems="stretch"
        >
          <QuizOption
            icon={PublicIcon}
            title={t('quiz:modes.capital')}
            description={t('quiz:questions.capital', { country: '' })}
            onClick={() => startQuiz('capital')}
            color={theme.palette.primary.main}
          />
          <QuizOption
            icon={FlagIcon}
            title={t('quiz:modes.flag')}
            description={t('quiz:questions.flag', { country: '' })}
            onClick={() => startQuiz('flag')}
            color={theme.palette.secondary.main}
          />
          <QuizOption
            icon={TranslateIcon}
            title={t('quiz:modes.language')}
            description={t('quiz:questions.language', { country: '' })}
            onClick={() => startQuiz('language')}
            color={theme.palette.primary.dark}
          />
        </Grid>
    </Box>
    </Container>
  );
} 