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
}

const ChatListItem = (props: IChatListItem) => {
  const { displayName, photoURL, lastMessage, uid, handleSelect } = props;

  const [isHover, setIsHover] = useState(false);

  const { userInfoState } = useChatStore();

  return (
    <div
      className={`list_item ${userInfoState.user.uid === uid && 'active'}`}
      onClick={handleSelect}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {photoURL ? (
        <img className="user_icon" src={photoURL} />
      ) : (
        <AccountCircleIcon className="user_icon" style={{ color: isHover ? BLACK_COLOR : WHITE_COLOR }} />
      )}
      <div className="list_item_info">
        <div className="username">{displayName}</div>
        {lastMessage && <div className="last_message">{lastMessage}</div>}
      </div>
    </div>
  );
};

export default ChatListItem;
