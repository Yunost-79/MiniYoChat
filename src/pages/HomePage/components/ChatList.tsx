import { SearchTextField } from '../../../components/MuiUI/TextFields.styled/SearchTextField.styled';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import UserSenderAvatar from '/testSenderUserAvatar.png';

import { WHITE_COLOR } from '../../../variables/variables';

interface IChatInfo {
  test: boolean;
  testArr: number[];
}

const ChatList = (props: IChatInfo) => {
  const { test, testArr } = props;
  return (
    <div className="chats_info">
      <div className="search">
        <SearchTextField className="input search_input" type="text" label="Search user..." variant="standard" />
      </div>
      <div className="chat_list">
        {test &&
          testArr.map((_, index) => (
            <div className="list_item" key={index}>
              {UserSenderAvatar ? (
                <img className="user_icon" src={UserSenderAvatar} />
              ) : (
                <AccountCircleIcon className="user_icon" style={{ color: WHITE_COLOR }} />
              )}
              <div className="message_user_info">
                <span className="username">Mrs Dude</span>
                <span className="last_message">Lorem ipsum dolor sit amet.</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatList;
