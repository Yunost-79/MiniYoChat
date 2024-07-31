import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { WHITE_COLOR } from '../../variables/variables';

interface ISearchItem {
  photoURL: string | null;
  displayName: string | null;
}

const SearchItem = (props: ISearchItem) => {
  const { photoURL, displayName } = props;

  return (
    <div className="search_item">
      {photoURL ? <img className="user_icon" src={photoURL} /> : <AccountCircleIcon className="user_icon" style={{ color: WHITE_COLOR }} />}
      <div className="search_user_info">
        <span className="username">{displayName}</span>
      </div>
    </div>
  );
};

export default SearchItem;
