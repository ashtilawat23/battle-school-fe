import React, { ElementType } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/Admin';
import Student from './pages/Student';
import Home from './pages/Home';
import AuthenticationButton from './components/AuthenticationButton';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AuthenticationButton />;
  }

  const namespace = 'YOUR_NAMESPACE'; // Replace with your namespace
  const roles = user ? user[`${namespace}/roles`] ?? [] : [];

  return (
    <div>
      {roles.includes('admin') && <Admin />}
      {roles.includes('student') && <Student />}
      {!roles.length && <div>No recognized roles</div>}
      <AuthenticationButton />
    </div>
  );
};

interface PrivateRouteProps {
  component: ElementType;
  role: string;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, role, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  const namespace = 'YOUR_NAMESPACE'; // Same namespace as in your Auth0 Action
  const userRoles = user ? user[`${namespace}/roles`] ?? [] : [];
  const isAuthorized = isAuthenticated && userRoles.includes(role);

  return (
    <Route
      {...rest}
      element={isAuthorized ? <Component /> : <Navigate to="/" />}
    />
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* Protected Routes with updated usage */}
        <Route path="/admin" element={<PrivateRoute component={Admin} role="admin" path="/admin" />} />
        <Route path="/student" element={<PrivateRoute component={Student} role="student" path="/student" />} />
        {/* Additional routes can be added here */}
      </Routes>
    </Router>
  );
};

export default App;