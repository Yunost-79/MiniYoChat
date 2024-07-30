import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/AuthPages/LoginPage';
import RegistrationPage from './pages/AuthPages/RegistrationPage';

import './main.scss';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route>
          {/*// <PrivateRoute></> */}
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
};

export default App;
