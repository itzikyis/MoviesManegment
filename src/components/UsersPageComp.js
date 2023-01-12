import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import AddUser from './EditUserPageComp';
import UserPage from './UserPageComp';
import firebaseDb from '../firebase';

function UsersPageComp() {
    const [showUsers, setShowUsers] = useState(true);

    useEffect(() => {
        const dbRef = firebaseDb.database().ref();
        dbRef.child("users").get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
      });

    function Comp() {
        if (showUsers) {
            return <UserPage />;
        }
        return <AddUser />;
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button type="Button" variant="contained" color="primary" onClick={() => setShowUsers(true)}>All Users</Button>
            <Button type="Button" variant="contained" color="primary" onClick={() => setShowUsers(false)}>Add User</Button>
            <br />
            <div>
                <Comp />
            </div>
        </div>
    )
}

export default UsersPageComp
