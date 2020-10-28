import ProjectCreate from './ProjectCreate';
import ProjectEdit from './ProjectEdit';
import ProjectList from './ProjectList';
import ProjectShow from './ProjectShow';
import SettingsIcon from '@material-ui/icons/Settings';

export default {
  list: process.env.REACT_APP_ADMIN==='true'?ProjectList:undefined,
  show: ProjectShow,
  create: ProjectCreate,
  edit: ProjectEdit,
  icon: SettingsIcon,
  options: {
    label: 'Projets'
  }
};
