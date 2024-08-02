import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { BLACK_COLOR, WHITE_COLOR } from '../../variables/variables';
import { useState } from 'react';

interface IChatListItem {
  displayName?: string;
  photoURL?: string;
  lastMessage?: string;
  handleSelect?: () => void;
}

const ChatListItem = (props: IChatListItem) => {
  const { displayName, photoURL, lastMessage, handleSelect } = props;

  const [isHover, setIsHover] = useState(false);

  return (
    <div className="list_item" onClick={handleSelect} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {photoURL ? (
        <img className="user_icon" src={photoURL} />
      ) : (
        <AccountCircleIcon className="user_icon" style={{ color: isHover ? BLACK_COLOR : WHITE_COLOR }} />
      )}
      <div className="list_item_info">
        <div className="username">{displayName}</div>
        <div className="last_message">{lastMessage}</div>
      </div>
    </div>
  );
};

export default ChatListItem;
