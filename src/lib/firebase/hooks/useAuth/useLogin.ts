import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { ILoginUserParams } from './useAuth.types';
import { auth } from '../../firebase';

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const loginUserOnFirestore = async (params: ILoginUserParams): Promise<void> => {
    const { email, password, path } = params;
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (path) {
        navigate(path);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return { loginUserOnFirestore, loading, error };
};
