import React from 'react';
import { Admin, Resource } from 'react-admin';
import { Layout, AppBar, theme } from '@semapps/archipelago-layout';
import { authProvider, LoginPage, LogoutButton, UserMenu } from '@semapps/auth-provider';

import i18nProvider from './config/i18nProvider';
import dataProvider from './config/dataProvider';
import * as resources from './resources';
import  HomePage from './pages/HomePage'

const AppBarWithUserMenu = props => <AppBar userMenu={<UserMenu />} {...props} />;
const LayoutWithUserMenu = props => <Layout {...props} appBar={AppBarWithUserMenu} />;

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

const App = () => (
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
);

export default App;
