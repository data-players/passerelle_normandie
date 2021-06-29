import React from 'react';
import { Grid, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  logo: {
    maxWidth: 180,
    maxHeight: 180,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 150,
      maxHeight: 150
    }
  }
}));

const partners = {
  'agirpe.png': 'https://www.agirpourlenvironnement.org',
  'andev.jpg': 'https://www.andev.fr',
  'cemea.jpg': 'https://www.cemea.asso.fr',
  'EPNS.png': 'https://www.ecolenaturesavoirs.com',
  'EnfantNature.png': 'https://www.lenfantdanslanature.org',
  'fcpe.png': 'https://www.fcpe.asso.fr',
  'fcpn.png': 'https://www.fcpn.org',
  'fee.png': 'https://faire-ecole.org',
  'FNE.jpg': 'https://www.fne.asso.fr/',
  'frene.jpg': 'https://frene.org',
  'graines-oc.png': 'https://www.grainepc.org',
  'ligue-enseignement.png': 'https://laligue.org',
  'OCCE.png': 'http://www2.occe.coop/',
  'profs-en-transition.jpg': 'https://profsentransition.com',
  'rfve.jpg': 'https://rfve.fr',
  'tdf.png': 'https://tousdehors.fr',
  'tiers-lieux-edu.jpg': 'https://www.tierslieuxedu.org',
  'av.png': 'https://virtual-assembly.org',
};

const Partners = () => {
  const classes = useStyles();
  return (
    <Grid container>
      {Object.entries(partners).map(([key, url]) => (
        <Grid item xs={6} sm={3} key={key}>
          <Box
            display="flex"
            height={200}
            alignItems="center"
            justifyContent="center"
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img className={classes.logo} src={'/partners/' + key} alt="" />
            </a>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default Partners;
