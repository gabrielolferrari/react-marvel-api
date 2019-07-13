import React, { forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({

    openModal() {
      handleClickOpen();
    }

  }));


  function handleClickOpen() {
    setOpen(true);
  }

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
              Comic Info
            </Typography>
            {/* <Button color="inherit">
              Fav
            </Button> */}
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
});

export default FullScreenDialog;