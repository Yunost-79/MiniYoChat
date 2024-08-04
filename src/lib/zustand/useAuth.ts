import { create } from 'zustand';

interface IUseAuth {
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
}

export const useAuth = create<IUseAuth>((set) => ({
  isAuth: JSON.parse(localStorage.getItem('isAuth') || 'false'),
  setIsAuth: (auth: boolean) => {
    localStorage.setItem('isAuth', JSON.stringify(auth));
    set(() => ({ isAuth: auth }));
  },
}));
