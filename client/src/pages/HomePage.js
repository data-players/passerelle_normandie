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
      {/* <Grid item sm={12} xs={12}>
        <Paper>
          <Typography variant="h3" classes={style}>
            La carte du bocage
          </Typography>
          <ListBase resource="Organization" basePath="/Organization">
            <MapList
              latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
              longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
              label={record => record['pair:label']}
              description={record => record['pair:comment']}
              scrollWheelZoom
            />
          </ListBase>
        </Paper>
      </Grid>
      <Grid item sm={12} xs={12} >
        <Paper>
          <Typography variant="h3" classes={style}>
            Les prochains évènements dans le bocage
          </Typography>
          <ListBase resource="Event" basePath="/Events" perPage={4} sort={{ field: 'pair:startDate', order: 'ASC' }} >
            <RaSimpleList primaryText={record => record['pair:label']} secondaryText={record => record['pair:comment']} linkType="show" />
          </ListBase>
        </Paper>
      </Grid> */}

    </Grid>
  );
};

export default HomePage;
