import { Dispatch, SetStateAction, useState } from 'react';

import ClickAwayListener from 'react-click-away-listener';
import EmojiPicker, { Theme } from 'emoji-picker-react';

import { MessageTextField } from '../MuiUI/TextFields.styled/MessageTextField.styled';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';

import { EisHover } from '../../pages/HomePage/homePage.type';

import { MAIN_LIGHT_SAGE_COLOR, MAIN_PRIMARY_YELLOW_COLOR, WHITE_COLOR } from '../../variables/variables';

interface IMessageSender {
  messageValue: string;
  setMessageValue: Dispatch<SetStateAction<string>>;
  isHover: { file: boolean; emoji: boolean; sendBtn: boolean; message: boolean; close: boolean };
  handleMouseEnter: (icon: EisHover, messageId?: string | null) => void;
  handleMouseLeave: (icon: EisHover) => void;
}

const MessageSender = (props: IMessageSender) => {
  const { isHover, messageValue, setMessageValue, handleMouseEnter, handleMouseLeave } = props;

  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  const toggleEmojiBar = () => {
    setOpenEmoji(!openEmoji);
  };

  const handleSetEmoji = (e: { emoji: string }) => {
    setMessageValue((messageValue) => messageValue + e.emoji);
  };

  return (
    <div className="message_sender">
      <MessageTextField
        className="input message_input"
        type="text"
        variant="filled"
        margin="none"
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
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
  );
};

export default MessageSender;
