import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "./services/AuthService";
import { useState, useEffect } from "react";

const theme = createTheme();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if (!AuthService.getCurrentUser()) {
      setIsLoggedIn(false)
      navigate("/login");
    }
    else {
      setIsLoggedIn(true)
    }

  }, [navigate]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {
            isLoggedIn?
              <>
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path={"/home"} element={<Home />} />
                <Route exact path={"/"} element={<Home />} />
              </>
              :
              <Route exact path="/login" element={<Login />} />
          }
          <Route path={"*"} element={<Navigate replace to={"/"} />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
