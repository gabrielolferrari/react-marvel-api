import React, { forwardRef, useImperativeHandle } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import Slide from '@material-ui/core/Slide';
import renderHTML from 'react-render-html';
import ComicComments from './comicComments';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const ADD_FAVORITE = gql`
    mutation favorite($comicid: String!) {
      addFavorite(
        comicid: $comicid,
      ) {
        comicid
      }
    }
`;

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const FullScreenDialog = forwardRef((props, ref) => {
  const classes = useStyles();
  let comicid;
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
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.comic.title}
            </Typography>
            {
              <Mutation mutation={ADD_FAVORITE} onCompleted={() => console.log('Complete')}>
                {(addFavorite, { loading, error }) => (
                  <React.Fragment>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      addFavorite({ variables: { comicid: comicid.value } });
                      comicid.value = '';
                    }}
                    >
                      <input
                        type="hidden"
                        name="comicid"
                        ref={(node) => {
                          comicid = node;
                        }}
                        placeholder="ComicID"
                        value={props.comic.id}
                      />
                      <IconButton type="submit" color="inherit"><StarIcon /></IconButton>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error :( Please try again</p>}
                  </React.Fragment>
                )}
              </Mutation>
            }
          </Toolbar>
        </AppBar>

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
            <Typography variant="body1">
              <strong>Format</strong>
              :
              {props.comic.format}
            </Typography>
          ) : ''
        }

        {props.comic.pageCount > 0
          ? (
            <Typography variant="body1">
              <strong>Pages</strong>
              :
              {props.comic.pageCount}
            </Typography>
          ) : ''
        }

        <Typography variant="h6">
          Creators
        </Typography>

        <Typography variant="h6">
          Characters
        </Typography>

        <ComicComments commicid={props.comic.id} />
      </Dialog>
    </div>
  );
});

export default FullScreenDialog;
