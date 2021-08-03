import React from 'react';
import { ListBase, useShowController, ShowContextProvider } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { MapList } from '@semapps/geo-components';
import { SimpleList as RaSimpleList } from 'react-admin';
import ProjectFilterSidebar from './HomePagefilterSideBar';
import PageShow from '../resources/pages/PageShow';
import Typography from '@material-ui/core/Typography';

const mainStyle = makeStyles(theme => ({
    h3 :{
      textAlign : 'center'
    }
}));

const config = {
  basePath: '/Page',
  id: process.env.REACT_APP_MIDDLEWARE_URL + 'pages/accueil',
  resource: 'Page'
};

const HomePage = () => {

  const style = mainStyle();

  return(
    <Grid container spacing={0} classes={style}>
      <Grid item md={12} sm={12} xs={12} >
        <Paper>
          <ShowContextProvider value={useShowController(config)}>
            <PageShow {...config} />
          </ShowContextProvider>
        </Paper>    
      </Grid>
    </Grid>
  );
};

export default HomePage;
