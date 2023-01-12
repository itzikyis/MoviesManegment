import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import LoginPageComp from './components/LoginPageComp'
import CreateAccountComp from './components/CreateAccountComp'
import ManageUsersPage from './components/ManageUsersPageComp'
import WelcomePageComp from './components/WelcomePageComp'
import AppBarComp from './components/AppBarComp'
import { Link, Route, Switch, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import { ReactSession } from 'react-client-session';
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import { logout } from "./actions/auth";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { clearMessage } from "./actions/message";
import { useNavigate } from 'react-router-dom';

import Logo from './images/Logo.png';

function App() {
  //const [currentUser, setCurrentUser] = useState(undefined);
  // const [userName, setUserName] = useState('itzik');
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/signup"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
    // const auth = getAuth(firebaseDb);
    //     auth.signOut();
        navigate("../MoviesManagement/home", { replace: true });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      //setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      //setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      //setShowModeratorBoard(false);
      //setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="absolute">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">
              {currentUser ? (
                <Link to="/MoviesManagement/main" replace >
                  <div className='logoHorizontallyCenter'>
                    <img src={Logo} className='logo' alt="logo" />
                  </div>
                </Link>
              ) : (
                <Link to="/MoviesManagement/home" replace >
                  <div className='logoHorizontallyCenter'>
                    <img src={Logo} className='logo' alt="logo" />
                  </div>
                </Link>
              )}
            </Typography>
            {currentUser ? (
              <Box>
                <Typography sx={{ display: 'inline', color: 'black', textAlign: 'right' }} variant="h6">
                  {currentUser.email.split('@')[0]}
                </Typography>
                <Button color="inherit" sx={{ flexGrow: 1, color: 'black', textAlign: 'right' }} onClick={logOut}>LogOut</Button>
              </Box>
            ) : (
              <Box>
                <Link to="/MoviesManagement/login">
                  <Button color="inherit" sx={{ flexGrow: 1, color: 'black', textAlign: 'right' }}>Login</Button>
                </Link>
                <Link to="/MoviesManagement/signup">
                  <Button color="inherit" sx={{ flexGrow: 1, color: 'black', textAlign: 'right' }}>Sign_In</Button>
                </Link>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <br />
      <div className="container mt-3">
        <Routes>
          <Route path='/MoviesManagement/' element={<WelcomePageComp />} />
          <Route path='/MoviesManagement/home' element={<WelcomePageComp />} />
          <Route path='/MoviesManagement/login' element={<LoginPageComp />} />
          <Route path='/MoviesManagement/signup' element={<CreateAccountComp />} />
          <Route path='/MoviesManagement/main' element={<PrivateRoute />} />
          <Route path='/MoviesManagement/users' element={<ManageUsersPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
