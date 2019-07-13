import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListComics from './components/comics/listComics';

const App = () => (
  <React.Fragment>
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          MARVEL
        </Typography>
      </Toolbar>
    </AppBar>
    <main>
      <ListComics />
    </main>
  </React.Fragment>
);

export default App;
