import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListComics from './components/comics/listComics';
import Menu from './components/menu';
import Favorites from './components/favorites';

const App = () => (
  <React.Fragment>
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          MARVEL
        </Typography>
        <Menu />
      </Toolbar>
    </AppBar>
    <main>
      <Switch>
        <Route exact path="/" component={ListComics} />
        <Route exact path="/Favorites" component={Favorites} />
      </Switch>
    </main>
  </React.Fragment>
);

export default App;
