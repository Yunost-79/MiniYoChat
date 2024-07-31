import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthTextField } from '../../components/MuiUI/TextFields.styled/AuthTextField.styled';
import { AuthButton } from '../../components/MuiUI/Button.styled/AuthButton.styled';

import { InputAdornment, Link } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { ERROR_COLOR, MAIN_PRIMAL_SAGE_COLOR } from '../../variables/variables';
import { EAuthFirebase, ERegistrationPage } from './authPage.types';
import { createUserOnFireStore } from '../../lib/helpers/registrationHelpers';
import { ICreateUserOptions, ICreateUserParams } from '../../lib/helpers/registrationHelpers.types';

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (imagePreview !== null) {
        setSelectedFile(file);
      }
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const formData = {
      date: new Date().getTime(),
      username: (target[0] as HTMLInputElement).value,
      email: (target[1] as HTMLInputElement).value,
      password: (target[2] as HTMLInputElement).value,
    };

    if (formData.username !== '' && formData.email !== '' && formData.password !== '') {
      try {
        const userInfo: ICreateUserParams = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          file: selectedFile,
          date: formData.date,
          usersPath: EAuthFirebase.users,
          userChatsPath: EAuthFirebase.userChats,
        };

        const options: ICreateUserOptions = {
          navigate: navigate,
          path: '/',
          setError: setError,
          setLoading: setLoading,
        };

        createUserOnFireStore(userInfo, options);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth_page">
      <div className="wrapper">
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <div className="auth_title">
              <h1 className="title_name">Mini Yo Chat</h1>
              <span className="title_subtitle">Registration</span>
            </div>
            <form className="auth_form" onSubmit={handleSubmit}>
              <AuthTextField className="from_input input_email" name={ERegistrationPage.username} type="text" label="Username" variant="standard" />
              <AuthTextField className="from_input input_email" name={ERegistrationPage.email} type="text" label="E-mail" variant="standard" />
              <AuthTextField
                className="from_input input_password"
                name={ERegistrationPage.password}
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
              />
              <input id="file" type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
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
              </div>
              <AuthButton className="form_button" type="submit">
                Sign up
              </AuthButton>
              {error && <span style={{ color: ERROR_COLOR }}>Something went wrong!</span>}
            </form>
            <div className="auth_change">
              <span className="change_text">Do you have account a Mini Yo Chat?</span>
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
