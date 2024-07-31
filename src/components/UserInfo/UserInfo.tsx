import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase/firebase';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { MAIN_PRIMARY_YELLOW_COLOR, WHITE_COLOR } from '../../variables/variables';

import UserAvatar from '/testUserAvatar.png';
import { useAuth } from '../../zustand/useAuth';

const UserInfo = () => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const { setIsAuth } = useAuth();

  const handleSignOut = () => {
    setIsAuth(false);
    signOut(auth);
  };

  const toggleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };
  return (
    <div className="user_info">
      <div className="user">
        {UserAvatar ? <img className="user_icon" src={UserAvatar} /> : <AccountCircleIcon className="user_icon" style={{ color: WHITE_COLOR }} />}

        <h2 className="user_title">Mr Dude</h2>
      </div>
      <div className="user_settings" onMouseEnter={toggleOpenSetting} onMouseLeave={toggleOpenSetting} onClick={handleSignOut}>
        <ExitToAppIcon style={{ color: openSetting ? MAIN_PRIMARY_YELLOW_COLOR : WHITE_COLOR }} />
      </div>
    </div>
  );
};

export default UserInfo;
