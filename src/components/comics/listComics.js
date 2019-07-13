import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getComics } from '../../services/MarvelAPI';
import CardComic from './cardComic';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: '20px',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: 10,
  },
}));

const ListComics = props => {

  const [comics, setComics] = useState([]);

  const classes = useStyles();

  async function fetchMyAPI() {
    try {
      const result = await getComics();
      setComics(result.data.data.results);
    } catch (e) {
      console.log(`Request failed: ${e}`);
    }
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={10}>
          { comics.map((comic) =>
            <Grid key={comic.id.toString()} item>
              {
                <CardComic
                  key={comic.id.toString()}
                  info={comic} />
              }
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ListComics