import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { MAIN_PRIMARY_YELLOW_COLOR, WHITE_COLOR } from '../../../variables/variables';

import { EisHover } from '../homePage.type';

interface IUserInfo {
  isHover: { file: boolean; emoji: boolean; sendBtn: boolean; massage: boolean; logout: boolean };
  UserAvatar: string;
  handleMouseEnter: (icon: EisHover, massageId?: string | null) => void;
  handleMouseLeave: (icon: EisHover) => void;
}

const UserInfo = (props: IUserInfo) => {
  const { isHover, UserAvatar, handleMouseEnter, handleMouseLeave } = props;
  return (
    <div className="user_info">
      <div className="user">
        {UserAvatar ? <img className="user_icon" src={UserAvatar} /> : <AccountCircleIcon className="user_icon" style={{ color: WHITE_COLOR }} />}

        <h2 className="user_title">Mr Dude</h2>
      </div>
      <div className="user_settings" onMouseEnter={() => handleMouseEnter(EisHover.logout)} onMouseLeave={() => handleMouseLeave(EisHover.logout)}>
        <ExitToAppIcon style={{ color: isHover.logout ? MAIN_PRIMARY_YELLOW_COLOR : WHITE_COLOR }} />
      </div>
    </div>
  );
};

export default UserInfo;
