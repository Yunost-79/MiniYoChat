import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { ICreateUserParams } from './useRegistration.types';
import { auth, db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { EAuthFirebase } from '../../../pages/AuthPages/authPage.types';

export const useRegistration = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate()

    const createUserOnFirestore = async (
        params: ICreateUserParams,
        path: string
    ): Promise<void> => {
        const { username, email, password, file, date, } = params;

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

                await setDoc(doc(db, EAuthFirebase.users, res.user.uid), {
                    uid: res.user.uid,
                    displayName: username,
                    email,
                    photoURL: downloadURL,
                });

                await setDoc(doc(db, EAuthFirebase.userChats, res.user.uid), {});
                navigate(path);
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
