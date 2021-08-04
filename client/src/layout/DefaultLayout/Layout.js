import React from 'react';
import { Layout as RaLayout } from 'react-admin';
import { makeStyles, Typography, Box } from '@material-ui/core';
import AppBar from './AppBar';
import TreeMenu from './TreeMenu/TreeMenu';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  appFrame: {
    marginTop: 56
  },
  title: {
    position: 'absolute',
    top: 80,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
});

const Layout = ({ appBar, menu, userMenu, children, classes, ...otherProps }) => {
  const innerClasses = useStyles();
  return (
    <RaLayout {...otherProps} classes={{...classes, appFrame: innerClasses.appFrame }} appBar={appBar} menu={menu}>
      <Typography variant="h4" color="primary" className={innerClasses.title} id="react-admin-title" component="h1" />
      <Box>
        {children}
      </Box>
      <Box>
        <Typography variant="subtitle2" color="textSecondary" align="right" >
          <Link to="/Page/a-propos/show" className={classes.footerLink}>A propos</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to="/Page/contact/show" className={classes.footerLink}>Contact</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to="/Page/mentions-legales/show" className={classes.footerLink}>Mentions légales</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to="/Page/conditions-generales-d-utilisation/show" className={classes.footerLink}>Conditions générales d'utilisation</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link href="https://semapps.org/" className={innerClasses.link}> Propulsé par SemApps</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to="/Page/finance-par-la-region-normandie-et-le-fnadt/show" className={classes.footerLink}>Financé par la Région Normandie et le FNADT</Link>

        </Typography>
      </Box>    
    </RaLayout>
  );
};

Layout.defaultProps = {
  appBar: AppBar,
  menu: TreeMenu
};

export default Layout;
