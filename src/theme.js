import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ed1d24',
    },
    secondary: {
      main: '#2a75b3',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#dedede',
    },
  },
});

export default theme;
