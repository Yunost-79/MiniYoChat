import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import ChatListItem from '../ChatListItem/ChatListItem';
import Search from '../Search/Search';
import { doc, onSnapshot } from 'firebase/firestore';
import { EFirebase } from '../../lib/firebase/hooks/useAuth/useAuth.types';
import { db } from '../../lib/firebase/firebase';
import { ChatContext } from '../../context/ChatContext';

export interface IUserInfo {
  uid: string;
  displayName: string;
  photoURL: string;
  lastMessage: string;
}

interface IChat {
  date?: {
    nanoseconds: number;
    seconds: number;
  };
  userInfo?: IUserInfo;
}

const ChatList = () => {
  const [chats, setChats] = useState<IChat[]>([]);

  const { currentUser } = useContext(AuthContext);
  const chatContext = useContext(ChatContext);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const getChats = () => {
      const unSub = onSnapshot(doc(db, EFirebase.userChats, currentUser?.uid), (doc) => {
        const data = doc.data();
        if (!data) {
          return setChats([]);
        }

        const chatsArray: IChat[] = Object.values(data).map((chat) => ({
          ...chat,
          userInfo: {
            ...chat.userInfo,
            uid: chat.userInfo.uid,
          },
        })) as IChat[];

        chatsArray.sort((a, b) => {
          if (a.date && b.date) {
            return b.date.seconds - a.date.seconds;
          }
          return 0;
        });

        setChats(chatsArray);
      });

      return () => {
        unSub();
      };
    };

    getChats();
  }, [currentUser?.uid, currentUser]);

  const handleSelect = (userInfo: IUserInfo) => {
    if (chatContext && chatContext.dispatch && userInfo) {
      chatContext.dispatch({ type: 'CHANGE_USER', payload: userInfo });
    }
  };

  console.log(chats);
  return (
    <div className="chats_info">
      <Search />
      <div className="chat_list">
        {chats.length < 0 && <span className="chat_list_title">Chats:</span>}
        {chats.map(
          ({ userInfo }) =>
            userInfo && (
              <ChatListItem
                key={userInfo?.uid}
                displayName={userInfo?.displayName}
                photoURL={userInfo?.photoURL}
                handleSelect={() => handleSelect(userInfo)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ChatList;
