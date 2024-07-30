import { useState } from 'react';

import { InputAdornment, Link } from '@mui/material';
import { AuthTextField } from '../../components/MuiUI/TextFields.styled/AuthTextField.styled';
import { AuthButton } from '../../components/MuiUI/Button.styled/AuthButton.styled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MAIN_PRIMAL_SAGE_COLOR } from '../../variables/variables';

import './AuthPage.scss';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="auth_page">
      <div className="wrapper">
        <div className="auth_title">
          <h1 className="title_name">Mini Yo Chat</h1>
          <span className="title_subtitle">Login</span>
        </div>
        <form className="auth_form">
          <AuthTextField className="from_input input_email" type="text" label="E-mail" variant="standard" />
          <AuthTextField
            className="from_input input_password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start" className="auth_show" onClick={handleShowPassword}>
                  {showPassword ? (
                    <VisibilityIcon style={{ color: MAIN_PRIMAL_SAGE_COLOR, cursor: 'pointer' }} />
                  ) : (
                    <VisibilityOffIcon style={{ color: MAIN_PRIMAL_SAGE_COLOR, cursor: 'pointer' }} />
                  )}
                </InputAdornment>
              ),
            }}
          />{' '}
          <AuthButton className="form_button">Sign in</AuthButton>
        </form>
        <div className="auth_change">
          <span className="change_text">First time at Mini Yo Chat?</span>
          <div className="change_subtext">
            <span className="subtext_title">Create an account</span>
            <Link className="subtext_link" href="/registration">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
