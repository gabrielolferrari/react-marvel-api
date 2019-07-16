import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearRounded from '@material-ui/icons/ClearRounded';
import { getComics } from '../../services/MarvelAPI';
import CardComic from './cardComic';
import Loading from '../loading';

const useStyles = makeStyles(({
  fragment: {
    marginTop: 20,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: '20px',
  },
  rootSearch: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: '0 auto',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: 10,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  pagination: {
    width: '50%',
    margin: '0 auto',
    marginTop: 20,
    marginBottom: 20,
  },
  nextBtn: {
    float: 'right',
  },
}));

const ListComics = () => {
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [charSearch, setICharSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  async function fetchMyAPI(page, character) {
    try {
      const result = await getComics(page, character);

      if (result) {
        const dataList = result.data.data;
        setComics(dataList.results);
        setCount(result.data.data.count);
      } else {
        setComics([]);
        setCount(0);
      }

      setLoading(false);
    } catch (e) {
      console.log(`Request failed: ${e}`);
    }
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  function filter() {
    setLoading(true);
    fetchMyAPI(currentPage, charSearch);
  }

  function clear() {
    setLoading(true);
    fetchMyAPI();
  }

  function togglePrev() {
    setLoading(true);
    const index = currentPage - 1;
    setCurrentPage(index);
    fetchMyAPI(index, charSearch);
  }

  function toggleNext() {
    setLoading(true);
    const index = currentPage + 1;
    setCurrentPage(index);
    fetchMyAPI(index, charSearch);
  }

  return (
    <React.Fragment>
      <div className={classes.fragment}>
        <Paper className={classes.rootSearch}>
          <IconButton className={classes.iconButton} aria-label="Search" onClick={() => clear()}>
            <ClearRounded />
          </IconButton>
          <Divider className={classes.divider} />
          <InputBase
            className={classes.input}
            placeholder="Look for comic by character"
            inputProps={{ 'aria-label': 'Search Google Maps' }}
            value={charSearch}
            onInput={e => setICharSearch(e.target.value)}
          />
          <Divider className={classes.divider} />
          <IconButton className={classes.iconButton} aria-label="Search" onClick={() => filter()}>
            <SearchIcon />
          </IconButton>
        </Paper>

        {
          loading
            ? (
              <Loading />
            )
            : (
              <React.Fragment>
                <Grid container className={classes.root}>
                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={10}>
                      { comics.length > 0
                        ? (
                          comics.map(comic => (
                            <Grid key={comic.id.toString()} item>
                              {
                                <CardComic
                                  key={comic.id.toString()}
                                  info={comic}
                                />
                              }
                            </Grid>
                          ))
                        )
                        : (
                          <Grid item>
                            No comics found. Try filter using the full name. e.g., Spider-Man
                          </Grid>
                        )
                    }
                    </Grid>
                  </Grid>
                </Grid>
                <div className={classes.pagination}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => togglePrev()}
                    disabled={(currentPage < 2)}
                  >
                    previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={(count < 21)}
                    onClick={() => toggleNext()}
                    className={classes.nextBtn}
                  >
                    Next
                  </Button>
                </div>
              </React.Fragment>
            )
        }
      </div>
    </React.Fragment>
  );
};

export default ListComics;
