import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { ICreateUserOptions, ICreateUserParams } from "./registrationHelpers.types";



export const createUserOnFireStore = async (
    params: ICreateUserParams,
    options: ICreateUserOptions
): Promise<void> => {
    const { username, email, password, file, date, usersPath, userChatsPath } = params;
    const { navigate, path, setError, setLoading, } = options;


    setLoading(true);

    const res = await createUserWithEmailAndPassword(auth, email, password);

    const storageRef = ref(storage, `${username + date}`);

    if (file) {
        await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    await updateProfile(res.user, {
                        displayName: username,
                        photoURL: downloadURL,
                    });

                    await setDoc(doc(db, usersPath, res.user.uid), {
                        uid: res.user.uid,
                        displayName: username,
                        email,
                        photoURL: downloadURL,
                    });

                    await setDoc(doc(db, userChatsPath, res.user.uid), {});
                    navigate(path);
                } catch (err) {
                    console.log(err);
                    setError(true);
                    setLoading(false);
                }
            });
        });
    }
}