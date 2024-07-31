import MassageUserInfo from '../../components/MessageUserInfo/MessageUserInfo';
import MassagesList from '../../components/MassagesList.tsx/MessagesList';
import UserInfo from '../../components/UserInfo/UserInfo';
import ChatList from '../../components/ChatList/ChatList';

import './HomePage.scss';

const HomePage = () => {
  const testArr2 = ['1', '2'];

  return (
    <div className="home_page">
      <div className="wrapper">
        <div className="header">
          <UserInfo />
          <MassageUserInfo />
        </div>
        <div className="container">
          <ChatList />
          <MassagesList testArr2={testArr2} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
