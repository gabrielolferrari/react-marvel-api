import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { getComics } from '../../services/MarvelAPI';
import CardComic from './cardComic';

const ListComics = props => {

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

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
    <React.Fragment className={useStyles}>
    {
      comics.map((comic) =>
      <CardComic key={comic.id.toString()} info={comic} />
      )
    }
    </React.Fragment>
  );
}

export default ListComics