import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import AddUser from './AddUserComp';
import UserPage from './UserPageComp';
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@mui/material/Stack';
import firebaseDb from '../firebase';
import { getDatabase, ref, child, get } from "firebase/database";


const useStyles = makeStyles((theme) => ({
    button: {
        margin: 3,
        marginLeft: 3,
        marginRight: 3,
        textAlign: 'center',
    },
}));

function ManageUsersPageComp() {
    const classes = useStyles();
    const [showUsers, setShowUsers] = useState(true);

    useEffect(() => {

        const dbRef = ref(getDatabase(firebaseDb));
        get(child(dbRef, `users/${'1'}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        //     const dbRef = firebaseDb.database().ref();
        //     dbRef.child("users").get().then((snapshot) => {
        //         if (snapshot.exists()) {
        //             console.log(snapshot.val());
        //         } else {
        //             console.log("No data available");
        //         }
        //     }).catch((error) => {
        //         console.error(error);
        //     });
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
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Button type="Button" variant="contained" color="primary" className={classes.button} onClick={() => setShowUsers(true)}>All Users</Button>
                <Button type="Button" variant="contained" color="primary" className={classes.button} onClick={() => setShowUsers(false)}>Add User</Button>
            </Stack>
            <br />
            <div>
                <Comp />
            </div>
        </div>
    )
}

export default ManageUsersPageComp
