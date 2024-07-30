import { useState } from 'react';


import MassageUserInfo from '../../components/MessageUserInfo/MessageUserInfo';
import MassagesList from '../../components/MassagesList.tsx/MessagesList';
import UserInfo from '../../components/UserInfo/UserInfo';
import ChatList from '../../components/ChatList/ChatList';


import './HomePage.scss';

const HomePage = () => {
  const [test] = useState<boolean>(true);
  const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const testArr2 = ['1', '2'];




  return (
    <div className="home_page">
      <div className="wrapper">
        <div className="header">
          <UserInfo  />

          <MassageUserInfo />
        </div>
        <div className="container">
          <ChatList test={test} testArr={testArr} />

          <MassagesList
            testArr2={testArr2}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
