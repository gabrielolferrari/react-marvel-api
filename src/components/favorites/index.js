import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getFavoriteComics } from '../../services/MarvelAPI';
import CardComic from '../comics/cardComic';
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
}));

const GET_FAVORITES = gql`
    query {
      favorites {
        id,
        comicid
      }
    }
`;

const ListFavorites = (props) => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  let arrayComics = [];

  async function fetchMyAPI() {
    const fetchData = async () => {
      const data = await props.client.query({ query: GET_FAVORITES, fetchPolicy: 'network-only' });
      try {
        const listId = data.data.favorites.map(comic => comic.comicid);

        const promises = listId.map(id => getFavoriteComics(id));
        const registrations = await Promise.all(promises).then(result => result);

        arrayComics = registrations.map((comic) => {
          const info = comic.data.data.results;
          return info[0];
        });

        setComics(arrayComics);
        setLoading(false);
      } catch (e) {
        console.log(`Request failed: ${e}`);
      }
    };
    fetchData();
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.fragment}>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            {
          loading
            ? (
              <Loading />
            )
            : (
              <Grid container justify="center" spacing={10}>
                { comics.map(comic => (
                  <Grid key={comic.id ? comic.id.toString() : ''} item>
                    { comic.id ? (
                      <CardComic
                        key={comic.id.toString()}
                        info={comic}
                      />
                    ) : ''
                    }
                  </Grid>
                ))}
              </Grid>
            )
          }
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withApollo(ListFavorites);
