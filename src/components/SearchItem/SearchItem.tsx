import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { WHITE_COLOR } from '../../variables/variables';

interface ISearchItem {
  photoURL: string | null;
  displayName: string | null;
  handleSelect: () => Promise<void>;
}

const SearchItem = (props: ISearchItem) => {
  const { photoURL, displayName, handleSelect } = props;

  return (
    <div className="search_item" onClick={handleSelect}>
      {photoURL ? <img className="user_icon" src={photoURL} /> : <AccountCircleIcon className="user_icon" style={{ color: WHITE_COLOR }} />}
      <div className="search_user_info">
        <span className="username">{displayName}</span>
      </div>
    </div>
  );
};

export default SearchItem;
