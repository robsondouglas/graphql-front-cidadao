import useAuth from 'app/hooks/useAuth';
import SetPassword from 'app/views/sessions/SetPassword';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, mustChangePassword, usr } = useAuth();
  const { pathname } = useLocation();

  if (isAuthenticated) return <>{children}</>;
  if (mustChangePassword) return (<SetPassword nome={usr.name} email={usr.user} />)

  return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
};

export default AuthGuard;
