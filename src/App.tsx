import { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from './zustand/useAuth';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/AuthPages/LoginPage';
import RegistrationPage from './pages/AuthPages/RegistrationPage';

import './main.scss';

interface IPrivateRouteProps {
  children: ReactNode;
}

const App = () => {
  const { isAuth } = useAuth();

  const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
    if (!isAuth) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
};

export default App;
