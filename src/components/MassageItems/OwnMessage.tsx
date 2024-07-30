import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { EisHover } from '../../pages/HomePage/homePage.type';

import CloseIcon from '@mui/icons-material/Close';

interface IOwnMessage {
  isHover: { [key in EisHover]: boolean };
  hoverMessageId: string | null;
  handleMouseEnter: (icon: EisHover, MessageId?: string | null) => void;
  handleMouseLeave: (icon: EisHover) => void;
  testArr2: string[];
}
const OwnMessage = (props: IOwnMessage) => {
  const { isHover, hoverMessageId, handleMouseEnter, handleMouseLeave, testArr2 } = props;

  const handleFullscreen = useFullScreenHandle();

  return (
    <div
      className="message_item own"
      id="2"
      onMouseEnter={() => handleMouseEnter(EisHover.Message, '2')}
      onMouseLeave={() => handleMouseLeave(EisHover.Message)}
    >
      <div className="Message_images own" onClick={() => (!handleFullscreen.active ? handleFullscreen.enter() : undefined)}>
        <FullScreen handle={handleFullscreen}>
          {handleFullscreen.active && (
            <CloseIcon
              className={`close_button ${isHover.close ? 'isHover' : ''}`}
              onClick={handleFullscreen.active && handleFullscreen.exit}
              onMouseEnter={() => handleMouseEnter(EisHover.close)}
              onMouseLeave={() => handleMouseLeave(EisHover.close)}
            />
          )}
          <img src="https://i.pinimg.com/originals/3b/ed/ee/3bedeeceae73caa73675bea502eaa03c.jpg" alt="" />
        </FullScreen>
      </div>

      <div className="message_text">
        Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. A culpa temporibus necessitatibus voluptatem tempora et facere
        nobis ab odit quidem unde omnis reprehenderit optio assumenda, eaque laboriosam minima volu
      </div>
      <div className={`message_timestamp ${isHover.Message && testArr2[1] === hoverMessageId ? 'isHover' : ''}`}>11:24</div>
    </div>
  );
};

export default OwnMessage;
