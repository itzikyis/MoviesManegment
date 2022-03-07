import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Link, Route, Switch, Routes, BrowserRouter } from 'react-router-dom';
import LoginPageComp from './components/LoginPageComp'
import CreateAccountComp from './components/CreateAccountComp'
import MainPageComp from './components/MainPageComp'
import ManageUsersPageComp from './components/ManageUsersPageComp'
import UsersPageComp from './components/UserPageComp'
import EditUserPageComp from './components/EditUserPageComp'
import WelcomePageComp from './components/WelcomePageComp'


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
