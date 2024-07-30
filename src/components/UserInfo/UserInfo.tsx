import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { MAIN_PRIMARY_YELLOW_COLOR, WHITE_COLOR } from '../../variables/variables';

import UserAvatar from '/testUserAvatar.png';
import { useState } from 'react';

const UserInfo = () => {
  // const { } = props;
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const toggleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };
  return (
    <div className="user_info">
      <div className="user">
        {UserAvatar ? <img className="user_icon" src={UserAvatar} /> : <AccountCircleIcon className="user_icon" style={{ color: WHITE_COLOR }} />}

        <h2 className="user_title">Mr Dude</h2>
      </div>
      <div className="user_settings" onMouseEnter={toggleOpenSetting} onMouseLeave={toggleOpenSetting}>
        <ExitToAppIcon style={{ color: openSetting ? MAIN_PRIMARY_YELLOW_COLOR : WHITE_COLOR }} />
      </div>
    </div>
  );
};

export default UserInfo;
