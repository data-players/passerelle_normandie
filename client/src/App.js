import React from 'react';
import { Admin, Resource } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '@semapps/archipelago-layout';
import { default as Layout } from './layout/DefaultLayout/Layout';
import { default as AppBar } from './layout/DefaultLayout/AppBar';
import { LoginPage, LogoutButton, UserMenu } from '@semapps/auth-provider';
import { createBrowserHistory as createHistory } from 'history';


// import { Layout, AppBar, theme } from '@semapps/archipelago-layout';



import i18nProvider from './config/i18nProvider';
import dataProvider from './config/dataProvider';
import * as resources from './resources';
import  HomePage from './pages/HomePage'

import authProvider from './config/authProvider';

const history = createHistory();

const mainStyle = makeStyles(theme => ({
    content :{
      [theme.breakpoints.up('md')]: {
        paddingRight : '10%',
      },
    }
  }));


const App = () => {
  const style = mainStyle();
  const AppBarWithUserMenu = props => <AppBar userMenu={<UserMenu />} {...props} title="Passerelle Normandie"/>;
  const LayoutWithUserMenu = props => <Layout {...props} appBar={AppBarWithUserMenu} classes={style}/>;

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      history={history}
      i18nProvider={i18nProvider}
      layout={LayoutWithUserMenu}
      theme={theme}
      loginPage={LoginPage}
      logoutButton={LogoutButton}
      dashboard={HomePage}
    >
      {Object.entries(resources).map(([key, resource]) => (
        <Resource key={key} name={key} {...resource.config} />
      ))}
    </Admin>
  )
};

export default App;
