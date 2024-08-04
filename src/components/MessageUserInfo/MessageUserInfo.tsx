import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useChatStore } from '../../lib/zustand/useChatStore';

const MassageUserInfo = () => {
  const { userInfoState } = useChatStore();

  return (
    <div className="message_user_info">
      <span className="message_user_title">{userInfoState.user.displayName}</span>
      <div className="message_user_settings">
        <MoreVertIcon />
      </div>
    </div>
  );
};

export default MassageUserInfo;
