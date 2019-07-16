import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import renderHTML from 'react-render-html';
import ComicComments from './comicComments';
import AlertDialog from '../dialog';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    marginTop: 40,
    width: '80%',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  info: {
    marginTop: '20px',
  },
}));

const ADD_FAVORITE = gql`
    mutation favorite($comicid: String!, $title: String!) {
      addFavorite(
        comicid: $comicid,
        title: $title,
      ) {
        comicid,
        title
      }
    }
`;

const FullScreenDialog = forwardRef((props, ref) => {
  const classes = useStyles();
  const childRef = useRef();

  let comicid; let title;
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  useImperativeHandle(ref, () => ({
    openModal() {
      handleClickOpen();
    },
  }));

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} scroll="body">
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.comic.title}
            </Typography>
            {
              <Mutation mutation={ADD_FAVORITE} onCompleted={() => childRef.current.openModal()}>
                {addFavorite => (
                  <React.Fragment>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      addFavorite({ variables: { comicid: comicid.value, title: title.value } });
                      comicid.value = '';
                      title.value = '';
                    }}
                    >
                      <input
                        type="hidden"
                        name="comicid"
                        ref={(node) => {
                          comicid = node;
                        }}
                        value={props.comic.id}
                      />
                      <input
                        type="hidden"
                        name="title"
                        ref={(node) => {
                          title = node;
                        }}
                        value={props.comic.title}
                      />
                      {props.isFavorite === false
                        || (
                          <IconButton type="submit" color="inherit">
                            <StarIcon />
                            <Typography variant="body1">
                              &nbsp; Add to favorites
                            </Typography>
                          </IconButton>
                        )
                      }
                    </form>
                  </React.Fragment>
                )}
              </Mutation>
            }
          </Toolbar>
        </AppBar>
        <AlertDialog ref={childRef} message="Your comic was saved." />
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            {props.comic.description
              ? (
                <Typography variant="body1">
                  <strong>Description</strong>
                  <br />
                  {renderHTML(props.comic.description)}
                </Typography>
              ) : ''
            }

            {props.comic.description
              ? (
                <Typography variant="body1" className={classes.info}>
                  <strong>Format</strong>
                  <br />
                  {props.comic.format}
                </Typography>
              ) : ''
            }

            {props.comic.pageCount > 0
              ? (
                <Typography variant="body1" className={classes.info}>
                  <strong>Pages</strong>
                  <br />
                  {props.comic.pageCount}
                </Typography>
              ) : ''
            }

            <ComicComments commicid={props.comic.id} />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
});

export default FullScreenDialog;
