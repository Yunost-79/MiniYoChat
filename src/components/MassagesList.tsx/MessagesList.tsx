import { useEffect, useRef, useState } from 'react';

import { EisHover } from '../../pages/HomePage/homePage.type';

import OwnMessage from '../MessageItems/OwnMessage';
import Message from '../MessageItems/Message';
import MessageSender from '../MessageSender/MessageSender';

interface IMessagesList {
  testArr2: string[];
}

const MessagesList = (props: IMessagesList) => {
  const { testArr2 } = props;

  const [messageValue, setMessageValue] = useState<string>('');
  const [hoverMessageId, setHoverMessageId] = useState<string | null>(null);

  const MessageListRef = useRef<HTMLDivElement>(null);

  const [isHover, setIsHover] = useState<{ [key in EisHover]: boolean }>({
    [EisHover.file]: false,
    [EisHover.emoji]: false,
    [EisHover.sendBtn]: false,
    [EisHover.message]: false,
    [EisHover.close]: false,
  });

  const handleMouseEnter = () => {
    (icon: EisHover, MessageId: string | null = null) => {
      setIsHover((prev) => ({ ...prev, [icon]: true }));
      setHoverMessageId(MessageId);
    };
  };

  const handleMouseLeave = () => {
    (icon: EisHover) => {
      setIsHover((prev) => ({ ...prev, [icon]: false }));
      setHoverMessageId(null);
    };
  };

  useEffect(() => {
    if (MessageListRef.current) {
      MessageListRef.current.scrollTop = MessageListRef.current.scrollHeight;
    }
  }, [testArr2, messageValue]);

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

      <MessageSender
        isHover={isHover}
        messageValue={messageValue}
        setMessageValue={setMessageValue}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default MessagesList;
