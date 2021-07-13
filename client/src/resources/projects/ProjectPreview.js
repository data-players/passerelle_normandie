import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  content: {
    height: 150,
    position: 'relative',
    overflow: 'hidden',
    '&:after': {
      position: 'absolute',
      bottom: 0,
      height: '100%',
      width: '100%',
      content: '""',
      background: 'linear-gradient(to bottom, rgba(255,255,255, 0) 60%, rgba(255,255,255, 1) 100%)',
      pointerEvents: 'none' /* so the text is still selectable */
    }
  }
}));

const ProjectPreview = ({ record }) => {
  const classes = useStyles();
  return (
    <Box className={classes.content}>
      <Typography variant="h5" color="textPrimary">{record?.['pair:label']}</Typography>
      <Typography variant="body2" color="textSecondary">
        {record?.['pair:description']}
      </Typography>
    </Box>
  );
}

export default ProjectPreview;
