import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AuthContext } from './AuthContext';

// Define types for ChatContext
interface IUser {
  uid: string;
  displayName?: string;
  photoURL?: string;
}

interface IState {
  chatId: string | null;
  user: IUser;
}

interface IChangeUserAction {
  type: 'CHANGE_USER';
  payload: IUser;
}

type Action = IChangeUserAction;

interface IChatContext {
  data: IState;
  dispatch: React.Dispatch<Action>;
}

export const ChatContext = createContext<IChatContext | undefined>(undefined);

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE: IState = {
    chatId: null,
    user: {} as IUser,
  };

  const chatReducer = (state: IState, action: Action): IState => {
    switch (action.type) {
      case 'CHANGE_USER':
        if (!currentUser) return state;
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
};
