import { useEffect, useState } from 'react';
import MassageUserInfo from '../../components/MessageUserInfo/MessageUserInfo';
import MassagesList from '../../components/MassagesList/MessagesList';
import UserInfo from '../../components/UserInfo/UserInfo';
import ChatList from '../../components/ChatList/ChatList';

import './HomePage.scss';
import 'hamburgers/dist/hamburgers.min.css';

const HomePage = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
      if (!event.matches) {
        setIsOpenMenu(false);
      }
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="home_page">
      <div className="wrapper">
        <div className="header">
          {!isMobile && <UserInfo />}
          <MassageUserInfo />
        </div>
        <div className="container">
          <ChatList isMobile={isMobile} isOpenMenu={isOpenMenu} toggleMenu={toggleMenu} />
          <MassagesList />
        </div>
        <div className={`dropdown_zone ${isOpenMenu ? 'active' : ''} `} onClick={() => setIsOpenMenu(false)}></div>
      </div>
    </div>
  );
};

export default HomePage;
