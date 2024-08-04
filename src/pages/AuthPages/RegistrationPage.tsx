import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthTextField } from '../../components/MuiUI/TextFields.styled/AuthTextField.styled';
import { AuthButton } from '../../components/MuiUI/Button.styled/AuthButton.styled';
import AuthLoading from '../../components/UI/AuthLoading/AuthLoading';

import { useRegistration } from '../../lib/hooks/useAuth/useRegistration';
import { ICreateUserParams } from '../../lib/hooks/useAuth/useAuth.types';

import { InputAdornment, Link } from '@mui/material';

import { ERROR_COLOR, MAIN_PRIMAL_SAGE_COLOR } from '../../variables/variables';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { createUserOnFirestore, loading, error } = useRegistration();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    file: Yup.mixed().required('File is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      file: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const userInfo: ICreateUserParams = {
        username: values.username,
        email: values.email,
        password: values.password,
        file: selectedFile,
        date: new Date().getTime(),
        path: '/',
      };

      createUserOnFirestore(userInfo);
    },
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      formik.setFieldValue('file', file);

      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
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
              <span className="title_subtitle">Registration</span>
            </div>
            <form className="auth_form" onSubmit={formik.handleSubmit}>
              <AuthTextField
                className="from_input input_username"
                name="username"
                type="text"
                label="Username"
                variant="standard"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <AuthTextField
                className="from_input input_email"
                name="email"
                type="email"
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
              <input
                id="file"
                type="file"
                name="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              />
              <div className="from_file_input" onClick={handleIconClick}>
                {selectedFile ? (
                  <div className="file_preview">
                    <img className="file_image" src={imagePreview} alt="user_image" />
                    <span className="file_name">{selectedFile.name}</span>
                  </div>
                ) : (
                  <>
                    <AddAPhotoIcon className="add_file_icon" />
                    <span className="add_file_text">Add avatar</span>
                  </>
                )}
                {formik.touched.file && formik.errors.file ? <span className="file_error">{formik.errors.file}</span> : null}
              </div>
              <AuthButton className="form_button" type="submit">
                Sign up
              </AuthButton>
              {error && <span style={{ color: ERROR_COLOR }}>Something went wrong!</span>}
            </form>
            <div className="auth_change">
              <span className="change_text">Do you have an account at Mini Yo Chat?</span>
              <div className="change_subtext">
                <Link className="subtext_link" href="/login">
                  Sign in
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
