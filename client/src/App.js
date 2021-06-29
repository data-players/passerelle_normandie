import React from 'react';
import { Admin, Resource } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '@semapps/archipelago-layout';
import { default as Layout } from './layout/DefaultLayout/Layout';
import { default as AppBar } from './layout/DefaultLayout/AppBar';
import { authProvider, LoginPage, LogoutButton, UserMenu } from '@semapps/auth-provider';
import PasserelleLayout from './layout/PasserelleLayout/passerelleLayout';

import i18nProvider from './config/i18nProvider';
import dataProvider from './config/dataProvider';
import * as resources from './resources';
import  HomePage from './pages/HomePage'

const mainStyle = makeStyles(theme => ({
    content :{
      [theme.breakpoints.up('md')]: {
        paddingRight : '10%',
      },
    }
  }));


const globalLogout = () => {
  // Redirect to login page after disconnecting from SSO
  // The login page will remove the token, display a notification and redirect to the homepage
  const url = new URL(window.location.href);
  window.location.href = `${process.env.REACT_APP_MIDDLEWARE_URL}auth/logout?global=true&redirectUrl=` + encodeURIComponent(url.origin + '/#/login?logout');
  return Promise.resolve('/');
}
const adminAuthProvider = {
  ...authProvider(process.env.REACT_APP_MIDDLEWARE_URL),
  logout: globalLogout
}

// console.log('resources',resources);

const App = () => {
  const style = mainStyle();
  const AppBarWithUserMenu = props => <AppBar userMenu={<UserMenu />} {...props} />;
const LayoutWithUserMenu = props => <Layout {...props} appBar={AppBarWithUserMenu} classes={style} title="Passerelle Normandie"/>;

  return (
    <Admin
      authProvider={adminAuthProvider}
      dataProvider={dataProvider}
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
