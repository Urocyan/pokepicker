import { createRoot } from 'react-dom/client';
import { Index } from './components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Render your React component instead
const root = createRoot(document.querySelector('body')!);
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
root.render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Index />
    </ThemeProvider>
);