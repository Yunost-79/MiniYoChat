import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { BLACK_COLOR, WHITE_COLOR } from '../../variables/variables';
import { useState } from 'react';
import { useChatStore } from '../../lib/zustand/useChatStore';

interface IChatListItem {
  displayName?: string;
  photoURL?: string;
  lastMessage?: string;
  handleSelect?: () => void;
  uid?: string;
  isMobile?: boolean;
  isOpenMenu?: boolean;
}

const ChatListItem = (props: IChatListItem) => {
  const { isMobile, isOpenMenu, displayName, photoURL, lastMessage, uid, handleSelect } = props;

  const [isHover, setIsHover] = useState(false);

  const { userInfoState } = useChatStore();

  return (
    <div
      className={`list_item ${userInfoState.user.uid === uid && 'active'} ${!isOpenMenu && isMobile ? 'closed_modal' : ''}`}
      onClick={handleSelect}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {photoURL ? (
        <div className="user_image">
          <img src={photoURL} />
        </div>
      ) : (
        <AccountCircleIcon className="user_icon" style={{ color: isHover ? BLACK_COLOR : WHITE_COLOR }} />
      )}

      <div className={`list_item_info ${!isOpenMenu && isMobile ? 'invisible' : ''}`}>
        <div className="username">{displayName}</div>
        {lastMessage && <div className="last_message">{lastMessage}</div>}
      </div>
    </div>
  );
};

export default ChatListItem;
