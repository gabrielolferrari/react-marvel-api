import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    float: 'right',
  },
  link: {
    margin: theme.spacing(1),
  },
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography>
          <Link to="/" color="inherit" className={classes.link}>
            Comics
          </Link>
          <Link to="/Favorites" color="inherit" className={classes.link}>
            Favorites
          </Link>
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Menu);
