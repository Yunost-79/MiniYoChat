import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useLogin } from '../../lib/firebase/hooks/useLogin';

import AuthLoading from '../../components/UI/AuthLoading/AuthLoading';

import { InputAdornment, Link } from '@mui/material';
import { AuthTextField } from '../../components/MuiUI/TextFields.styled/AuthTextField.styled';
import { AuthButton } from '../../components/MuiUI/Button.styled/AuthButton.styled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { ERROR_COLOR, MAIN_PRIMAL_SAGE_COLOR } from '../../variables/variables';

import './AuthPage.scss';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { loginUserOnFirestore, loading, error } = useLogin();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const userInfo = {
        email: values.email,
        password: values.password,
        path: '/',
      };

      loginUserOnFirestore(userInfo);
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="auth_page">
      <div className="wrapper">
        {loading ? (
          <AuthLoading />
        ) : (
          <>
            <div className="auth_title">
              <h1 className="title_name">Mini Yo Chat</h1>
              <span className="title_subtitle">Login</span>
            </div>
            <form className="auth_form" onSubmit={formik.handleSubmit}>
              <AuthTextField
                className="from_input input_email"
                name="email"
                type="text"
                label="E-mail"
                variant="standard"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <AuthTextField
                className="from_input input_password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                variant="standard"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
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
              />
              <AuthButton className="form_button" type="submit">
                Sign in
              </AuthButton>
              {error && <span style={{ color: ERROR_COLOR }}>Something went wrong!</span>}
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
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
