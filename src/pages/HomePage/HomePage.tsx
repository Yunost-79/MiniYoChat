import MassageUserInfo from '../../components/MessageUserInfo/MessageUserInfo';
import MassagesList from '../../components/MassagesList/MessagesList';
import UserInfo from '../../components/UserInfo/UserInfo';
import ChatList from '../../components/ChatList/ChatList';

import './HomePage.scss';

const HomePage = () => {

  return (
    <div className="home_page">
      <div className="wrapper">
        <div className="header">
          <UserInfo />
          <MassageUserInfo />
        </div>
        <div className="container">
          <ChatList />
          <MassagesList  />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
