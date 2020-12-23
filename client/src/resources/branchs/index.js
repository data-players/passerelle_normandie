import BranchCreate from './BranchCreate';
import BranchEdit from './BranchEdit';
import BranchList from './BranchList';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';

export default {
  list: process.env.REACT_APP_ADMIN==='true'?BranchList:undefined,
  create: BranchCreate,
  edit: BranchEdit,
  icon: FavoriteBorderIcon,
  options: {
    label: 'Branches'
  }
};
