import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { EisHover } from '../../pages/HomePage/homePage.type';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

import UserSenderAvatar from '/testSenderUserAvatar.png';

import { WHITE_COLOR } from '../../variables/variables';

interface IMessages {
  isHover: { [key in EisHover]: boolean };
  hoverMessageId: string | null;
  handleMouseEnter: (icon: EisHover, MessageId?: string | null) => void;
  handleMouseLeave: (icon: EisHover) => void;
  testArr2: string[];
}

const Message = (props: IMessages) => {
  const { isHover, hoverMessageId, handleMouseEnter, handleMouseLeave, testArr2 } = props;

  const handleFullscreen = useFullScreenHandle();
  return (
    <div
      className="message_item"
      id="1"
      onMouseEnter={() => handleMouseEnter(EisHover.message, '1')}
      onMouseLeave={() => handleMouseLeave(EisHover.message)}
    >
      <div className="sender_Message_info">
        {UserSenderAvatar ? (
          <img className="sender_icon" src={UserSenderAvatar} />
        ) : (
          <AccountCircleIcon className="sender_icon" style={{ color: WHITE_COLOR }} />
        )}
        <div className="sender_username">Mrs Dude</div>
      </div>
      <div className="Message_images" onClick={() => (!handleFullscreen.active ? handleFullscreen.enter() : undefined)}>
        <FullScreen handle={handleFullscreen}>
          {handleFullscreen.active && (
            <CloseIcon
              className={`close_button ${isHover.close ? 'isHover' : ''}`}
              onClick={handleFullscreen.active && handleFullscreen.exit}
              onMouseEnter={() => handleMouseEnter(EisHover.close)}
              onMouseLeave={() => handleMouseLeave(EisHover.close)}
            />
          )}
          <img src="https://i.pinimg.com/originals/7e/94/b4/7e94b4b6fe5c93cc09936888457710e8.jpg" alt="" />
        </FullScreen>
      </div>

      <div className="message_text">
        Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. A culpa temporibus necessitatibus voluptatem tempora et facere
        nobis ab odit quidem unde omnis reprehenderit optio assumenda, eaque laboriosam minima volu
      </div>
      <div className={`message_timestamp ${isHover.message && testArr2[0] === hoverMessageId ? 'isHover' : ''}`}>11:24</div>
    </div>
  );
};

export default Message;
