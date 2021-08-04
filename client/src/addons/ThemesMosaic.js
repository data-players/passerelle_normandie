import React from 'react';
import { Link, useQueryWithStore } from 'react-admin';
import { GridList, GridListTile, GridListTileBar, makeStyles } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const useStyles = makeStyles(() => ({
  tile: {
    backgroundColor: 'lightgrey',
  },
  backgroundImage: {
    left: '50%',
    width: '100%',
    height: '100%',
    position: 'relative',
    transform: 'translateX(-50%)',
  },
}))

const tileData = [
  {
    slug: 'agriculture',
    title: 'Agriculture et Alimentation',
    cols: 3
   },
   {
     slug: 'biodiversite',
     title: 'Biodiversité & protection de l\'environnement',
     cols: 3
   },
   {
    slug: 'economie',
    title: 'Economie circulaire',
    cols: 2
  },
   {
     slug: 'culture',
     title: 'Culture & vivre ensemble',
     cols: 3
   },
   {
    slug: 'democratie',
    title: 'Démocratie & politiques publiques',
    cols: 3
  },
   {
    slug: 'education',
    title: 'Education & formation',
    cols: 2
  },
   {
     slug: 'habitat',
     title: 'Habitat & Energie',
     cols: 3
   },
   {
     slug: 'low-tech',
     title: 'Low-tech',
     cols: 2
   },
   {
    slug: 'mobilite',
    title: 'Mobilité',
    cols: 3
  },
  {
    slug: 'sante',
    title: 'Santé & bien-être',
    cols: 3
  },
  {
    slug: 'tiers-lieux',
    title: 'Tiers-lieux',
    cols: 3
  }
];

export const ThemesMosaic = () => {
  const classes = useStyles();

  const { data, loading } = useQueryWithStore({
    type: 'getMany',
    resource: 'Sector',
    payload: { ids: tileData.map(tile => process.env.REACT_APP_MIDDLEWARE_URL + 'sectors/' + tile.slug) }
  });

  if( loading ) {
    return(
      <GridList cellHeight={240} cols={8}>
        {tileData.map((tile, i) =>
          <GridListTile key={i} cols={tile.cols} className={classes.tile}>
            <GridListTileBar title={tile.title} />
          </GridListTile>
        )}
      </GridList>
    )
  } else {
    return (
      <GridList cellHeight={240} cols={8}>
        {tileData.map((tile, i) =>
          <GridListTile key={i} cols={tile.cols}>
            {data[i] &&
              <Link to={'/sector/' + encodeURIComponent(data[i].id) + '/show'}>
                <img src={data[i].image} alt={tile.title || data[i]['pair:label']} className={classes.backgroundImage} />
                <GridListTileBar title={tile.title || data[i]['pair:label']} />
              </Link>
            }
            {!data[i] &&
              <GridListTileBar title={tile.title} />
            }
          </GridListTile>
        )}
      </GridList>
    );
  }
}

export default ThemesMosaic;
