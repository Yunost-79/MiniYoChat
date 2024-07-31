import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import { EFirebase, ICreateUserParams } from './useAuth.types';
import { auth, db, storage } from '../../firebase';

export const useRegistration = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const createUserOnFirestore = async (params: ICreateUserParams): Promise<void> => {
    const { username, email, password, file, date, path } = params;

    setLoading(true);
    setError(false);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, `${username + date}`);

      if (file) {
        await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await updateProfile(res.user, {
          displayName: username,
          photoURL: downloadURL,
        });

        await setDoc(doc(db, EFirebase.users, res.user.uid), {
          uid: res.user.uid,
          displayName: username,
          email,
          photoURL: downloadURL,
        });

        await setDoc(doc(db, EFirebase.userChats, res.user.uid), {});

        if (path) {
          navigate(path);
        }
      }
    } catch (err: boolean | unknown) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { createUserOnFirestore, loading, error };
};
