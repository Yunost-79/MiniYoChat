import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import ChatListItem from '../ChatListItem/ChatListItem';
import Search from '../Search/Search';

import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase/firebase';
import { useChatStore } from '../../lib/zustand/useChatStore';
import { EFirebase } from '../../lib/hooks/useAuth/useAuth.types';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../../lib/zustand/useAuth';
import { signOut } from 'firebase/auth';

export interface IUserInfo {
  uid: string;
  displayName: string;
  photoURL: string;
  lastMessage: string;
}

interface IChatList {
  isMobile: boolean;
  isOpenMenu: boolean;
  toggleMenu: () => void;
}

interface IChat {
  date?: {
    nanoseconds: number;
    seconds: number;
  };
  userInfo: IUserInfo;
}

const ChatList = (props: IChatList) => {
  const { isMobile, isOpenMenu, toggleMenu } = props;

  const [chats, setChats] = useState<IChat[]>([]);

  const { setIsAuth } = useAuth();
  const { setUserInfoState } = useChatStore();

  const { currentUser } = useContext(AuthContext);

  const handleSelect = (userInfo: IUserInfo) => {
    if (userInfo) {
      setUserInfoState(currentUser, userInfo);
    }
  };
  const handleSignOut = () => {
    setIsAuth(false);
    signOut(auth);
  };

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
          date: chat.date,
          userInfo: {
            uid: chat.userInfo.uid,
            displayName: chat.userInfo.displayName,
            photoURL: chat.userInfo.photoURL,
            lastMessage: chat.lastMessage?.text,
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

  useEffect(() => {
    const defaultChat = () => {
      if (chats.length > 0 && chats[0].userInfo) {
        setUserInfoState(currentUser, chats[0].userInfo);
      }
    };

    defaultChat();
  }, [chats]);

  return (
    <>
      {isMobile && (
        <div
          className={`hamburger hamburger--spin ${isOpenMenu ? 'is-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-controls="navigation"
          tabIndex={0}
        >
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </div>
      )}

      <div className={`chats_info ${isMobile && isOpenMenu ? 'mobile' : ''}`}>
        <Search isMobile={isMobile} isOpenMenu={isOpenMenu} />
        <div className="chat_list ">
          {chats.length > 0 && !isMobile && <span className="chat_list_title">Chats:</span>}
          {chats.map(
            (chat) =>
              chat.userInfo && (
                <ChatListItem
                  key={chat.userInfo.uid}
                  displayName={chat.userInfo.displayName}
                  photoURL={chat.userInfo.photoURL}
                  lastMessage={chat.userInfo.lastMessage}
                  uid={chat.userInfo.uid}
                  handleSelect={() => handleSelect(chat.userInfo!)}
                  isMobile={isMobile}
                  isOpenMenu={isOpenMenu}
                />
              )
          )}
        </div>
        {isMobile && isOpenMenu && (
          <div className="sign_out" onClick={handleSignOut}>
            <span>Logout</span>
            <ExitToAppIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatList;
