import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import 'react-quill/dist/quill.snow.css';
import './styles/style.css';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
