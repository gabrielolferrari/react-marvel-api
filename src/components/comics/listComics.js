import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    fetchMyAPI();
  }, []);

  async function fetchMyAPI(page) {
    try {
      const result = await getComics(page);
      setComics(result.data.data.results);
      setCount(result.data.data.count);
    } catch (e) {
      console.log(`Request failed: ${e}`);
    }
  }

  function togglePrev(e) {
    let index = currentPage - 1;
    setCurrentPage(index);
    fetchMyAPI(index);
  }

  function toggleNext(e) {
    let index = currentPage + 1;
    setCurrentPage(index);
    fetchMyAPI(index);
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => togglePrev(e)}
        disabled={(currentPage < 2)}>
          previous
        </Button>
      <Button
        variant="contained"
        color="secondary"
        disabled={(count < 21)}
        onClick={(e) => toggleNext(e)}>
          Next
        </Button>

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
    </React.Fragment>
  );
}

export default ListComics