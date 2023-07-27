import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import { ToastProvider } from './contexts/ToastContext';
import { SnackbarProvider } from 'notistack';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <SnackbarProvider preventDuplicate maxSnack={5}>
      <ToastProvider>
      <AuthProvider>
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
      </AuthProvider>
      </ToastProvider>
      </SnackbarProvider>
    </SettingsProvider>
  );
};

export default App;
