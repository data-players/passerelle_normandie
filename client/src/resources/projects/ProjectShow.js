import React from 'react';
import { ChipField, SingleFieldList, TextField, UrlField } from 'react-admin';
import { Column, ColumnShowLayout, Hero, GridList, Show, MarkdownField } from '@semapps/archipelago-layout';
import { UriArrayField } from '@semapps/semantic-data-provider';
import { Typography, Box, makeStyles } from '@material-ui/core';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const useStyles = makeStyles(() => ({
  parent: {
    position: 'relative'
  },
  child: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6
  },
  caption: {
    color: 'black',
    fontSize: 13
  }
}));

const UserIcon = ({ record, image }) => {
  const classes = useStyles();
  const fullName = record ? record['pair:firstName'] + ' ' + record['pair:lastName'] : '';
  return (
    <Box className={classes.parent}>
      <img src={record&&image&&record[image]?record[image]:process.env.PUBLIC_URL + '/unknown-user.png'} style={{ width: '100%' }} alt={fullName} />
      <Box bgcolor="secondary.main" className={classes.child} borderRadius={7}>
        <Typography align="center" className={classes.caption} noWrap>
          {fullName}
        </Typography>
      </Box>
    </Box>
  );
};

const ProjectShow = props => (
  <Show {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={9} showLabel>
        <TextField label="Courte description" source="pair:comment" />
        <UrlField label="Site web" source="pair:homePage" />
        <MarkdownField label="Description" source="pair:description" addLabel />
      </Column>
      <Column xs={12} sm={3} showLabel>
        <UriArrayField label="Géré par" reference="Organization" source="pair:managedBy">
          <SingleFieldList linkType="show">
            <ChipField source="pair:label" color="secondary" />
          </SingleFieldList>
        </UriArrayField>
        <UriArrayField label="Responsables" reference="User" source="pair:hasResponsible">
          <GridList xs={6} linkType="show">
            <UserIcon />
          </GridList>
        </UriArrayField>
        <UriArrayField label="Participants" reference="User" source="pair:involves">
          <GridList xs={6} linkType="show">
            <UserIcon image="image"/>
          </GridList>
        </UriArrayField>
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default ProjectShow;
