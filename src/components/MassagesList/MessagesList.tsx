import { useEffect, useRef, useState } from 'react';

import Message from '../MessageItems/Message';
import MessageSender from '../MessageSender/MessageSender';
import { useChatStore } from '../../lib/zustand/useChatStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase/firebase';
import { EFirebase } from '../../lib/hooks/useAuth/useAuth.types';

interface MessageType {
  id: string;
  senderId: string;
  text?: string | undefined;
  img?: string | undefined;
  date: { nanoseconds: number; seconds: number };
}

const MessagesList = () => {
  const [messageValue, setMessageValue] = useState<string>(''); // Correctly declared state

  const [messages, setMessages] = useState<MessageType[]>([]);

  const { userInfoState } = useChatStore();

  const MessageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (MessageListRef.current) {
      MessageListRef.current.scrollTop = MessageListRef.current.scrollHeight;
    }
  }, [messageValue, messages]);

  useEffect(() => {
    if (!userInfoState.chatId) {
      return;
    }
    const unSub = onSnapshot(doc(db, EFirebase.chats, userInfoState.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [userInfoState.chatId]);

  return (
    <div className="message_info">
      <div className="message_list" ref={MessageListRef}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <MessageSender messageValue={messageValue} setMessageValue={setMessageValue} />
    </div>
  );
};

export default MessagesList;
