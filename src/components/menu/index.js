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
    color: '#FFFFFF',
    margin: theme.spacing(1),
  },
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography variant="h6">
          <Link to="/" color="secondary" className={classes.link}>
            Comics
          </Link>
          <Link to="/Favorites" color="primary" className={classes.link}>
            Favorites
          </Link>
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Menu);
