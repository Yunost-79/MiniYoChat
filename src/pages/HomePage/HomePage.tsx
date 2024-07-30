import { useState } from 'react';

import { EisHover } from './homePage.type';

import UserInfo from './components/UserInfo';
import MassageUserInfo from './components/MassageUserInfo';
import ChatList from './components/ChatList';
import MassagesList from './components/MassagesList';

import UserAvatar from '/testUserAvatar.png';
import './HomePage.scss';

const HomePage = () => {
  const [test] = useState<boolean>(true);
  const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const testArr2 = ['1', '2'];

  const [hoverMassageId, setHoverMassageId] = useState<string | null>(null);

  const [isHover, setIsHover] = useState<{ [key in EisHover]: boolean }>({
    [EisHover.file]: false,
    [EisHover.emoji]: false,
    [EisHover.sendBtn]: false,
    [EisHover.massage]: false,
    [EisHover.logout]: false,
  });

  const handleMouseEnter = (icon: EisHover, massageId: string | null = null) => {
    setIsHover((prev) => ({ ...prev, [icon]: true }));
    setHoverMassageId(massageId);
  };

  const handleMouseLeave = (icon: EisHover) => {
    setIsHover((prev) => ({ ...prev, [icon]: false }));
    setHoverMassageId(null);
  };

  return (
    <div className="home_page">
      <div className="wrapper">
        <div className="header">
          <UserInfo isHover={isHover} UserAvatar={UserAvatar} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />

          <MassageUserInfo />
        </div>
        <div className="container">
          <ChatList test={test} testArr={testArr} />

          <MassagesList
            isHover={isHover}
            hoverMassageId={hoverMassageId}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            testArr2={testArr2}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
