import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "./services/AuthService";
import { useState, useEffect } from "react";
import AdminContent from './components/AdminContent';
import UserContent from './components/UserContent';
import Layout from './components/Layout';

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

  const theme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {
            isLoggedIn ?
              <Route element={<Layout />}>
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/admin" element={<AdminContent />} />
                <Route exact path="/user" element={<UserContent />} />
                <Route exact path={"/home"} element={<Home />} />
                <Route exact path={"/"} element={<Home />} />
              </Route>
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
