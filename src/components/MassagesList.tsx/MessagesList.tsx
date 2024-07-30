import { useEffect, useRef, useState } from 'react';

import ClickAwayListener from 'react-click-away-listener';
import EmojiPicker, { Theme } from 'emoji-picker-react';

import { EisHover } from '../../pages/HomePage/homePage.type';

import OwnMessage from '../MassageItems/OwnMessage';
import Message from '../MassageItems/Message';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';

import { MessageTextField } from '../MuiUI/TextFields.styled/MessageTextField.styled';

import { MAIN_LIGHT_SAGE_COLOR, MAIN_PRIMARY_YELLOW_COLOR, WHITE_COLOR } from '../../variables/variables';

interface IMessagesList {
  testArr2: string[];
}
const MessagesList = (props: IMessagesList) => {
  const { testArr2 } = props;

  const [MessageValue, setMessageValue] = useState<string>('');
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [hoverMessageId, setHoverMessageId] = useState<string | null>(null);

  const MessageListRef = useRef<HTMLDivElement>(null);

  const [isHover, setIsHover] = useState<{ [key in EisHover]: boolean }>({
    [EisHover.file]: false,
    [EisHover.emoji]: false,
    [EisHover.sendBtn]: false,
    [EisHover.Message]: false,
    [EisHover.close]: false,
  });

  const handleMouseEnter = (icon: EisHover, MessageId: string | null = null) => {
    setIsHover((prev) => ({ ...prev, [icon]: true }));
    setHoverMessageId(MessageId);
  };

  const handleMouseLeave = (icon: EisHover) => {
    setIsHover((prev) => ({ ...prev, [icon]: false }));
    setHoverMessageId(null);
  };

  const toggleEmojiBar = () => {
    setOpenEmoji(!openEmoji);
  };

  const handleSetEmoji = (e: { emoji: string }) => {
    setMessageValue((MessageValue) => MessageValue + e.emoji);
  };

  useEffect(() => {
    if (MessageListRef.current) {
      MessageListRef.current.scrollTop = MessageListRef.current.scrollHeight;
    }
  }, [testArr2, MessageValue]);

  return (
    <div className="message_info">
      <div className="message_list" ref={MessageListRef}>
        <Message
          isHover={isHover}
          hoverMessageId={hoverMessageId}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          testArr2={testArr2}
        />
        <OwnMessage
          isHover={isHover}
          hoverMessageId={hoverMessageId}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          testArr2={testArr2}
        />
        
      </div>
      <div className="message_sender">
        <MessageTextField
          className="input message_input"
          type="text"
          variant="filled"
          margin="none"
          // multiline
          // maxRows={2}
          value={MessageValue}
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
    </div>
  );
};

export default MessagesList;
