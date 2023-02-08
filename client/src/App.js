import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from '@mui/system';

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Login/>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
