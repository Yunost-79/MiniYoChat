import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

import { WHITE_COLOR } from '../../variables/variables';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useChatStore } from '../../lib/zustand/useChatStore';

interface IMessage {
  message: {
    id: string;
    senderId: string;
    text?: string;
    img?: string;
    date: {
      nanoseconds: number;
      seconds: number;
    };
  };
}

const Message = (props: IMessage) => {
  const { message } = props;

  // const [isHoverMessage, setIsHoverMessage] = useState<boolean>(false);
  const [isHoverClose, setIsHoverClose] = useState<boolean>(false);

  const { userInfoState } = useChatStore();
  const { currentUser } = useContext(AuthContext);

  const handleFullscreen = useFullScreenHandle();

  const icon = message.senderId === currentUser?.uid ? currentUser?.photoURL : userInfoState?.user.photoURL;
  const name = message.senderId === currentUser?.uid ? currentUser?.displayName : userInfoState.user.displayName;


  if (!message) {
    return null;
  }
  return (
    <div
      className={`message_item ${message.senderId === currentUser?.uid && 'own'}`}
      // onMouseEnter={() => setIsHoverMessage(true)}
      // onMouseLeave={() => setIsHoverMessage(false)}
    >
      <div className="sender_message_info">
        {icon ? <img className="sender_icon" src={icon} /> : <AccountCircleIcon className="sender_icon" style={{ color: WHITE_COLOR }} />}
        {name && <div className="sender_username">{name}</div>}
      </div>
      {message.img && (
        <div className="message_images" onClick={() => (!handleFullscreen.active ? handleFullscreen.enter() : undefined)}>
          <FullScreen handle={handleFullscreen}>
            {handleFullscreen.active && (
              <CloseIcon
                className={`close_button ${isHoverClose ? 'isHover' : ''}`}
                onClick={handleFullscreen.active && handleFullscreen.exit}
                onMouseEnter={() => setIsHoverClose(true)}
                onMouseLeave={() => setIsHoverClose(false)}
              />
            )}
            <img src={message.img} alt="" />
          </FullScreen>
        </div>
      )}

      {message && <div className="message_text">{message.text}</div>}
      {/* <div className={`message_timestamp ${isHoverMessage ? 'isHover' : ''}`}>11:24</div> */}
    </div>
  );
};

export default Message;
