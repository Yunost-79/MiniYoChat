import React, { useState } from 'react';

import { EisHover } from '../homePage.type';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import UserSenderAvatar from '/testSenderUserAvatar.png';
import { MAIN_LIGHT_SAGE_COLOR, MAIN_PRIMARY_YELLOW_COLOR, WHITE_COLOR } from '../../../variables/variables';
import { MassageTextField } from '../../../components/MuiUI/TextFields.styled/MassageTextField.styled';
import ClickAwayListener from 'react-click-away-listener';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

interface IMassagesList {
  isHover: { [key in EisHover]: boolean };
  hoverMassageId: string | null;
  handleMouseEnter: (icon: EisHover, massageId?: string | null) => void;
  handleMouseLeave: (icon: EisHover) => void;
  testArr2: string[];
}
const MassagesList = (props: IMassagesList) => {
  const { isHover, hoverMassageId, handleMouseEnter, handleMouseLeave, testArr2 } = props;

  const [massageValue, setMassageValue] = useState<string>('');
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  const handleFullscreen1 = useFullScreenHandle();
  const handleFullscreen2 = useFullScreenHandle();

  const toggleEmojiBar = () => {
    setOpenEmoji(!openEmoji);
  };

  const handleSetEmoji = (e: { emoji: string }) => {
    setMassageValue((massageValue) => massageValue + e.emoji);
  };

  return (
    <div className="message_info">
      <div className="message_list">
        <div
          className="message_item"
          id="1"
          onMouseEnter={() => handleMouseEnter(EisHover.massage, '1')}
          onMouseLeave={() => handleMouseLeave(EisHover.massage)}
        >
          <div className="sender_massage_info">
            {UserSenderAvatar ? (
              <img className="sender_icon" src={UserSenderAvatar} />
            ) : (
              <AccountCircleIcon className="sender_icon" style={{ color: WHITE_COLOR }} />
            )}
            <div className="sender_username">Mrs Dude</div>
          </div>
          <div className="massage_images" onClick={() => (!handleFullscreen1.active ? handleFullscreen1.enter() : undefined)}>
            <FullScreen handle={handleFullscreen1}>
              {handleFullscreen1.active && <CloseIcon className="close_button" onClick={handleFullscreen1.active && handleFullscreen1.exit} />}
              <img src="https://i.pinimg.com/originals/7e/94/b4/7e94b4b6fe5c93cc09936888457710e8.jpg" alt="" />
            </FullScreen>
          </div>

          <div className="message_text">
            Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. A culpa temporibus necessitatibus voluptatem tempora et
            facere nobis ab odit quidem unde omnis reprehenderit optio assumenda, eaque laboriosam minima volu
          </div>
          {/* {isHover.massage && <div className="message_timestamp">11:24</div>} */}
          <div className={`message_timestamp ${isHover.massage && testArr2[0] === hoverMassageId ? 'isHover' : ''}`}>11:24</div>
        </div>

        <div
          className="message_item own"
          id="2"
          onMouseEnter={() => handleMouseEnter(EisHover.massage, '2')}
          onMouseLeave={() => handleMouseLeave(EisHover.massage)}
        >
          <div className="massage_images own" onClick={() => (!handleFullscreen2.active ? handleFullscreen2.enter() : undefined)}>
            <FullScreen handle={handleFullscreen2}>
              {handleFullscreen2.active && <CloseIcon className="close_button" onClick={handleFullscreen2.active && handleFullscreen2.exit} />}
              <img src="https://i.pinimg.com/originals/3b/ed/ee/3bedeeceae73caa73675bea502eaa03c.jpg" alt="" />
            </FullScreen>
          </div>

          <div className="message_text">
            Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. A culpa temporibus necessitatibus voluptatem tempora et
            facere nobis ab odit quidem unde omnis reprehenderit optio assumenda, eaque laboriosam minima volu
          </div>
          <div className={`message_timestamp ${isHover.massage && testArr2[1] === hoverMassageId ? 'isHover' : ''}`}>11:24</div>
        </div>
      </div>
      <div className="message_sender">
        <MassageTextField
          className="input message_input"
          type="text"
          variant="filled"
          margin="none"
          // multiline
          // maxRows={2}
          value={massageValue}
          onChange={(e) => setMassageValue(e.target.value)}
          label="Write a message..."
        />

        <div className="message_items">
          <AttachFileIcon
            className="icon_item"
            style={{ color: isHover.file ? MAIN_PRIMARY_YELLOW_COLOR : WHITE_COLOR }}
            onMouseEnter={() => handleMouseEnter(EisHover.file)}
            onMouseLeave={() => handleMouseLeave(EisHover.file)}
          />
          {openEmoji && (
            <ClickAwayListener onClickAway={toggleEmojiBar}>
              <div className="picker">
                <EmojiPicker open={openEmoji} theme={Theme.DARK} skinTonesDisabled={true} onEmojiClick={handleSetEmoji} />
              </div>
            </ClickAwayListener>
          )}
          <EmojiEmotionsIcon
            className="icon_item"
            style={{ color: isHover.emoji ? MAIN_PRIMARY_YELLOW_COLOR : WHITE_COLOR }}
            onClick={toggleEmojiBar}
            onMouseEnter={() => handleMouseEnter(EisHover.emoji)}
            onMouseLeave={() => handleMouseLeave(EisHover.emoji)}
          />
        </div>
        <div className="send_item" onMouseEnter={() => handleMouseEnter(EisHover.sendBtn)} onMouseLeave={() => handleMouseLeave(EisHover.sendBtn)}>
          <SendIcon style={{ color: isHover.sendBtn ? MAIN_LIGHT_SAGE_COLOR : WHITE_COLOR }} />
        </div>
      </div>
    </div>
  );
};

export default MassagesList;
