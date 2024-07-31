import { SetStateAction, useContext, useState } from 'react';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase/firebase';
import { User } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';

import SearchItem from '../ChatListItem/ChatListItem';

import { InputAdornment } from '@mui/material';
import { SearchTextField } from '../MuiUI/TextFields.styled/SearchTextField.styled';

import { EFirebase } from '../../lib/firebase/hooks/useAuth/useAuth.types';

import SearchIcon from '@mui/icons-material/Search';
import { MAIN_PRIMARY_YELLOW_COLOR, WHITE_COLOR } from '../../variables/variables';

const Search = () => {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);

  const handleChangeSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setUsername(e.target.value);
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
  console.log('error', error);


  return (
    <>
      <div className="search">
        <SearchTextField
          className="input search_input"
          type="text"
          label="Search user..."
          variant="standard"
          value={username}
          onChange={handleChangeSearch}
          onKeyDown={handleKeyDown}
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
      {user && <SearchItem photoURL={user?.photoURL} displayName={user?.displayName} />}
      {error && <span className="user_not_found">User not found!</span>}
    </>
  );
};

export default Search;
