import React from 'react';
import { ListBase, Show } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { MapList } from '@semapps/geo-components';
import { SimpleList as RaSimpleList } from 'react-admin';
import ProjectFilterSidebar from './HomePagefilterSideBar';

const mainStyle = makeStyles(theme => ({
    image: {
      height:"500px",
      boxSizing: "border-box",
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        height:"200px",
      }
    },
    mainTitle: {
      color:"#30a082",
      textAlign:"left",
      fontSize: "50px",
      fontFamily: "Comic Sans MS",
      marginTop: "60px",
      marginBottom: "60px"
    },
    mainText: {
      textAlign:"left",
      fontSize: "30px",
      fontFamily: "Comic Sans MS",
      marginBottom: "60px"
    },
    mapTitle: {
      textAlign:"lett",
      fontSize: "50px",
      fontFamily: "Comic Sans MS",
      marginTop: "60px",
      marginBottom: "60px"
    },
  }));

const HomePage = () => {

  const style = mainStyle();
  const urlImage = "https://www.zupimages.net/up/21/22/zikv.png";

  return(
    <Grid container spacing={0} aside={ProjectFilterSidebar}>

      <Grid item md={11} sm={11} xs={12} >
        <Paper variant="outlined" square>
            <CardMedia
              image={urlImage}
              title="village"
              className={style.image}
            />
        </Paper>
      </Grid>
      <Grid item md={1} sm={1} xs={0}></Grid>

      <Grid item sm={11} xs={12} className={style.mainTitle}>
        <strong>Participer aux sessions Passerelle Normandie</strong>
      </Grid>      
      <Grid item md={1} sm={1} xs={0}></Grid>

      <Grid item sm={11} xs={12} className={style.mainText}>
        Ce site est dédié à rendre visible la richesse des territoires normands. Vous pourrez naviguer à travers 5 concepts principaux : 
          <br></br>
          <ul>
            - Les individus<br></br>
            - Leurs organisations<br></br>
            - Les projets<br></br>
            - Les évènements<br></br>
            - Les lieux qui les accueillent
          </ul>
          Vous pouvez naviguer sur cette plateforme et découvrir le contenu. 
          Il sera nécessaire de vous créer un compte pour publier du contenu. 
          <br></br><br></br>
          Vous trouverez un guide d'utilisation à cette adresse [lien], une FAQ [lien] et une page pour contacter l'équipede Passerelle [lien].

      </Grid>
      <Grid item md={1} sm={1} xs={0}></Grid>

      <Grid item sm={11} xs={12} className={style.mapTitle}>
        <strong>La carte du bocage :</strong>
      </Grid>
      <Grid item md={1} sm={1} xs={0}></Grid>

      <Grid item sm={11} xs={12}>
        <ListBase resource="Organization" basePath="/Organization" perPage={4}>
          <MapList
          
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
            label={record => record['pair:label']}
            description={record => record['pair:comment']}
            scrollWheelZoom
          />
        </ListBase>
        <Grid item sm={1} xs={0}></Grid>
      </Grid>

      <Grid item sm={11} xs={12} className={style.mainTitle}>
        <strong>Les prochains évènements dans le bocage :</strong>
      </Grid>      
      <Grid item md={1} sm={1} xs={0}></Grid>

      <Grid item sm={11} xs={12} >
        <Paper  variant="outlined" square>
          <ListBase resource="Event" basePath="/Events" perPage={4}>
            <RaSimpleList primaryText={record => record['pair:label']} secondaryText={record => record['pair:comment']} linkType="show" />
          </ListBase>
        </Paper>
      </Grid>
      <Grid item md={1} sm={1} xs={0}></Grid>

    </Grid>
  );
};

export default HomePage;
