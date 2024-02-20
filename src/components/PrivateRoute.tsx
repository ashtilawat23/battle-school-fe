import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface PrivateRouteProps {
  component: React.ElementType;
  role: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, role }) => {
  const { isAuthenticated, user } = useAuth0();
  const userRoles = user && user['https://claims.example.com/roles'];
  const hasRole = userRoles?.includes(role);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return hasRole ? <Component /> : <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;