import React from 'react';
import { ListBase, Show } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { MapList } from '@semapps/geo-components';
import ProjectFilterSidebar from './HomePagefilterSideBar';

const HomePage = () => {

  const mainImage = makeStyles(theme => ({
    root: {
      height:"500px",
      boxSizing: "border-box",
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        height:"200px",
      }
    },
  }));

  const text1 = makeStyles(theme => ({
    root: {
      color:"#30a082",
      textAlign:"center",
      fontSize: "50px",
      fontFamily: "Comic Sans MS",
      marginTop: "60px",
      marginBottom: "60px"
    },
  }));

  const text2 = makeStyles(theme => ({
    root: {
      textAlign:"center",
      fontSize: "30px",
      fontFamily: "Comic Sans MS",
      marginBottom: "60px"
    },
  }));

  const text3 = makeStyles(theme => ({
    root: {
      textAlign:"center",
      fontSize: "50px",
      fontFamily: "Comic Sans MS",
      marginTop: "60px",
      marginBottom: "60px"
    },
  }));

  const mainImageStyles = mainImage();
  const text1Style = text1();
  const text2Style = text2();
  const text3Style = text3();
  const urlImage = "https://www.zupimages.net/up/21/22/zikv.png";

  return(
    <Grid container spacing={0} aside={ProjectFilterSidebar}>

      <Grid item md={11} sm={11} xs={12} >
        <Paper variant="outlined" square>
            <CardMedia
              image={urlImage}
              title="village"
              classes={mainImageStyles}
            />
        </Paper>
      </Grid>
      <Grid item md={1} sm={1} xs={0}></Grid>

      <Grid item sm={11} xs={12} classes={text1Style}>
        <strong>Participer aux sessions Passerelle Normandie</strong>
      </Grid>      
      <Grid item md={1} sm={1} xs={0}></Grid>

      <Grid item sm={11} xs={12} classes={text2Style}>
        <strong>
          Pour découvrir un territoire, rencontrer ses acteurs et échanger sur vos projets (ou idées) de transition et d'installation à la campagne
        </strong><br></br>
          Passerelle Normandie est né d'un désir d'accompagner les personnes dans leur projet personnel ou professionnel, de transition et d'installation dans le monde rural.
          Ce projet vise à appuyer les personnes qui souhaitent repenser leur mode de vie, notamment par la découverte de métiers porteurs de sens et de lieux de vie inspirants.
          En facilitant la découverte des richesses du monde rural, Passerelle Normandie aspire à participer à l’émergence de nouveaux liens entre villes et campagnes.
      </Grid>
      <Grid item md={1} sm={1} xs={0}></Grid>
      
      <Grid item sm={11} xs={12} classes={text3Style}>
        <strong>Voici la carte des acteurs qui nous on rejoint :</strong>
      </Grid>
      <Grid item md={1} sm={1} xs={0}></Grid>

      <Grid item sm={1} xs={0}></Grid>
      <Grid item sm={9} xs={12}>
        <ListBase resource="Organization" basePath="/Organization" perPage={4}>
          <MapList
          
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
            label={record => record['pair:label']}
            description={record => record['pair:comment']}
            scrollWheelZoom
          />
        </ListBase>
        <Grid item sm={2} xs={0}></Grid>

      </Grid>
    </Grid>
  );
};

export default HomePage;
