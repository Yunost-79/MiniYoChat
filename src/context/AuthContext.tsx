import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../lib/firebase/firebase';
import { useAuth } from '../zustand/useAuth';

interface IProps {
  children?: ReactNode;
}

export const AuthContext = createContext({
  currentUser: {} as User | null,
});

export const AuthContextProvider = (props: IProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const { setIsAuth } = useAuth();

  const { children } = props;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuth(!!user);
    });

    return () => {
      unSub();
    };
  }, [setIsAuth]);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
