import { User } from 'firebase/auth';
import { create } from 'zustand';

interface IUser {
  uid: string;
  displayName?: string;
  photoURL?: string;
}

interface IState {
  chatId: string | null;
  user: IUser;
}

interface IChatStore {
  userInfoState: IState;
  setUserInfoState: (currentUser: User | null, newUser: IUser) => void;
}

export const useChatStore = create<IChatStore>((set) => ({
  userInfoState: {
    chatId: null,
    user: {} as IUser,
  },
  setUserInfoState: (currentUser, newUser) => {
    if (currentUser) {
      set(() => ({
        userInfoState: {
          user: newUser,
          chatId: currentUser.uid > newUser.uid ? currentUser.uid + newUser.uid : newUser.uid + currentUser.uid,
        },
      }));
    }
  },
}));
