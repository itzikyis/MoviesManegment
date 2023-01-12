// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import firebaseDb from './firebase'
import { getAuth } from "firebase/auth";
import MainPageComp from './components/MainPageComp'

const PrivateRoute = () => {

    // Add your own authentication on the below line.
    const auth = getAuth(firebaseDb);
    var user = auth.currentUser;
    const isLoggedIn = (user != null)

    return (
        isLoggedIn ? (
            <MainPageComp />
        ) : (
            <Navigate to={{ pathname: '/MoviesManagement/login', }} />
        )
    )
}

export default PrivateRoute