import { FullScreen, useFullScreenHandle } from 'react-full-screen';


import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const OwnMessage = () => {
  const [isHoverMessage, setIsHoverMessage] = useState<boolean>(false);
  const [isHoverClose, setIsHoverClose] = useState<boolean>(false);

  const handleFullscreen = useFullScreenHandle();

  return (
    <div className="message_item own" onMouseEnter={() => setIsHoverMessage(true)} onMouseLeave={() => setIsHoverMessage(false)}>
      <div className="message_images own" onClick={() => (!handleFullscreen.active ? handleFullscreen.enter() : undefined)}>
        <FullScreen handle={handleFullscreen}>
          {handleFullscreen.active && (
            <CloseIcon
              className={`close_button ${isHoverClose ? 'isHover' : ''}`}
              onClick={handleFullscreen.active && handleFullscreen.exit}
              onMouseEnter={() => setIsHoverClose(true)}
              onMouseLeave={() => setIsHoverClose(false)}
            />
          )}
          <img src="https://i.pinimg.com/originals/3b/ed/ee/3bedeeceae73caa73675bea502eaa03c.jpg" alt="" />
        </FullScreen>
      </div>

      <div className="message_text">
        Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. A culpa temporibus necessitatibus voluptatem tempora et facere
        nobis ab odit quidem unde omnis reprehenderit optio assumenda, eaque laboriosam minima volu
      </div>
      <div className={`message_timestamp ${isHoverMessage ? 'isHover' : ''}`}>11:24</div>
    </div>
  );
};

export default OwnMessage;
