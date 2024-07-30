import { useState } from 'react';

import AuthDragAndDrop from '../../components/DragAndDrop/AuthDragAndDrop/AuthDragAndDrop';

import { AuthTextField } from '../../components/MuiUI/TextFields.styled/AuthTextField.styled';
import { AuthButton } from '../../components/MuiUI/Button.styled/AuthButton.styled';
import { InputAdornment, Link } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { MAIN_PRIMAL_SAGE_COLOR } from '../../variables/variables';

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="auth_page">
      <div className="wrapper">
        <div className="auth_title">
          <h1 className="title_name">Mini Yo Chat</h1>
          <span className="title_subtitle">Registration</span>
        </div>
        <form className="auth_form">
          <AuthTextField className="from_input input_email" type="text" label="Username" variant="standard" />
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
          />
          <div className="from_file_input" onClick={toggleShowModal}>
            <AddAPhotoIcon className="add_file_icon" />
            <span className="add_file_text">Add avatar</span>
          </div>
          <AuthButton className="form_button">Sign in</AuthButton>
        </form>
        <div className="auth_change">
          <span className="change_text">Do you have account a Mini Yo Chat?</span>
          <div className="change_subtext">
            <Link className="subtext_link" href="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <AuthDragAndDrop showModal={showModal} toggleShowModal={toggleShowModal} />
    </div>
  );
};

export default RegistrationPage;
