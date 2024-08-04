import { SetStateAction, useContext, useState } from 'react';

import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../lib/firebase/firebase';
import { User } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';

import SearchItem from '../SearchItem/SearchItem';

import { InputAdornment } from '@mui/material';
import { SearchTextField } from '../MuiUI/TextFields.styled/SearchTextField.styled';

import SearchIcon from '@mui/icons-material/Search';
import { MAIN_PRIMARY_YELLOW_COLOR, WHITE_COLOR } from '../../variables/variables';
import { EFirebase } from '../../lib/hooks/useAuth/useAuth.types';

const Search = () => {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);

  const handleChangeSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setUsername(e.target.value);
    if (error) setError(false);
  };

  const handleKeyDown = (e: { code: string }) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (username === currentUser?.displayName) {
      return;
    }
    const q = query(collection(db, EFirebase.users), where('displayName', '==', username));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setUser(null);
        setError(true);
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data() as User);
          setError(false);
        });
      }
    } catch (err: unknown) {
      setError(true);
    }
  };

  const handleSelect = async () => {
    if (currentUser && user) {
      const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

      try {
        const res = await getDoc(doc(db, EFirebase.chats, combinedId));

        if (!res.exists()) {
          await setDoc(doc(db, EFirebase.chats, combinedId), { messages: [] });

          await updateDoc(doc(db, EFirebase.userChats, currentUser.uid), {
            [combinedId + '.userInfo']: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });

          await updateDoc(doc(db, EFirebase.userChats, user.uid), {
            [combinedId + '.userInfo']: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error(err);
      }
      setUser(null);
      setUsername('');
    }
  };

  return (
    <>
      <div className="search">
        <SearchTextField
          className="input search_input"
          type="text"
          label="Search"
          variant="standard"
          value={username}
          // error={error}
          helperText={error && 'User not found!'}
          onChange={handleChangeSearch}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start" className="auth_show">
                <div className="search_icon" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={handleSearch}>
                  <SearchIcon style={{ color: isHover ? MAIN_PRIMARY_YELLOW_COLOR : WHITE_COLOR }} />
                </div>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {user && <SearchItem photoURL={user.photoURL} displayName={user.displayName} handleSelect={handleSelect} />}
    </>
  );
};

export default Search;
