import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },

  palette: {
    primary: {
      main: '#26415C',
    },
    secondary: {
      main: '#A9D18E',
      contrastText: '#fff',
    }
  },

  chip: {
    // deleteIconColor: 'white',
    deleteIconColorSecondary: 'white',
  },

});

export default theme;
