import { ReactNode, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/AuthPages/LoginPage';
import RegistrationPage from './pages/AuthPages/RegistrationPage';

import './main.scss';
import { useAuth } from './lib/zustand/useAuth';

interface IPrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const { isAuth } = useAuth();

  if (!currentUser && !isAuth) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

console.log('VITE_TEST_KEY:', import.meta.env.VITE_TEST_KEY);
console.log('working');

const App = () => {
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
