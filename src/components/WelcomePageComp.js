import React, { useState, useEffect } from 'react'
import '../css/WelcomePage.css';
import LoginPageComp from './LoginPageComp'
import CreateAccountComp from './CreateAccountComp'
import MainPageComp from './MainPageComp'
import ManageUsersPageComp from './ManageUsersPageComp'
import UsersPageComp from './UserPageComp'
import EditUserPageComp from './EditUserPageComp'
import AppBarComp from './AppBarComp'
import { Link, Route, Switch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Welcome from '../images/logo_welcome.png';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://itzikyis.com/" to="/">
        Itzikyis
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



function WelcomePageComp() {

  useEffect(() => {
    console.log('In useEffect')

  });

  return (
    <div className="welcome">
      <img src={Welcome} className='Welcome' alt="Welcome" />
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
};

export default WelcomePageComp
