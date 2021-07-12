import { authProvider as semappsAuthProvider } from '@semapps/auth-provider';
import { httpClient } from '@semapps/semantic-data-provider';
import * as resources from '../resources';

const globalLogout = () => {
  // Redirect to login page after disconnecting from SSO
  // The login page will remove the token, display a notification and redirect to the homepage
  const url = new URL(window.location.href);
  window.location.href = `${process.env.REACT_APP_MIDDLEWARE_URL}auth/logout?global=true&redirectUrl=` + encodeURIComponent(url.origin + '/login?logout');
  return Promise.resolve('/');
}

const authProvider = {
  ...semappsAuthProvider({
    middlewareUri: process.env.REACT_APP_MIDDLEWARE_URL,
    httpClient,
    checkPermissions: false,
    resources: Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, v.dataModel]))
  }),
  logout: globalLogout
};

// const adminAuthProvider = {
//   ...authProvider({middlewareUri:process.env.REACT_APP_MIDDLEWARE_URL}),
//   logout: globalLogout
// }


export default authProvider;
