import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Admin from './pages/Admin';
import Student from './pages/Student';
import Home from './pages/Home';
import AuthenticationButton from './components/AuthenticationButton';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <AuthenticationButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<PrivateRoute component={Admin} role="admin" />} />
          <Route path="/student" element={<PrivateRoute component={Student} role="student" />} />
          <Route path="/unauthorized" element={<div>Unauthorized</div>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;