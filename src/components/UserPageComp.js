import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import firebaseDb from '../firebase';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

// const useStyles = makeStyles({
//     root: {
//         width: '25rem',
//         margin: '5px',
//         float: 'left'
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//         float: 'left'
//     },
//     title: {
//         fontSize: 14,
//         float: 'left',
//     },
//     pos: {
//         fontSize: 14,
//         float: 'left'
//     },
// });

function UserPageComp() {

    const [firstName, setFirstName] = useState('itzik');
    const [lastName, setLastName] = useState('yisaschar');
    const [userName, setUserName] = useState('itzik.yis@gmail.com');
    const [session, setSession] = useState(0);
    const [createdDate, setCreatedDate] = useState('20/20/20');
    const [viewSubscriptions, setViewSubscriptions] = useState(true);
    const [createSubscriptions, setCreateSubscriptions] = useState(false);
    const [deleteSubscriptions, setDeleteSubscriptions] = useState(false);
    const [updateSubscriptions, setUpdateSubscriptions] = useState(false);
    const [viewMovies, setViewMovies] = useState(true);
    const [createMovies, setCreateMovies] = useState(false);
    const [deleteMovies, setDeleteMovies] = useState(false);
    const [updateMovies, setUpdateMovies] = useState(false);

    let permissions = '';
    if (viewSubscriptions)
        permissions += ', ' + 'viewSubscriptions';
    if (createSubscriptions)
        permissions += ', ' + 'createSubscriptions';
    if (deleteSubscriptions)
        permissions += ', ' + 'deleteSubscriptions';
    if (updateSubscriptions)
        permissions += ', ' + 'updateSubscriptions';
    if (viewMovies)
        permissions += ', ' + 'viewMovies';
    if (createMovies)
        permissions += ', ' + 'createMovies';
    if (deleteMovies)
        permissions += ', ' + 'deleteMovies';
    if (updateMovies)
        permissions += ', ' + 'updateMovies';

    if (permissions.charAt(0))
        permissions = permissions.slice(2);

        //const classes = useStyles();
    const navigate = useNavigate();

    const routeChange = () => {
        let path = `newPath`;
        navigate.push("/users");

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
    }
    return (
        <Card sx={{ maxWidth: 360 }}>
            <CardContent>
                <TextField id="standard-basic" label="Name:" variant="standard" align='left' value={firstName + " " + lastName} disabled />
                <br />
                <TextField id="standard-basic" label="User name:" variant="standard" align='left' value={userName} disabled />
                <br />
                <TextField id="standard-basic" label="Session time out(Minutes):" variant="standard" align='left' value={session} disabled />
                <br />
                <TextField id="standard-basic" label="Created Date:" variant="standard" align='left' value={createdDate} disabled />
                <br />
                <TextField id="standard-basic" multiline label="Permissions:" variant="standard" align='left' value={permissions} disabled />
                <br />
            </CardContent>
            <br />
            <CardActions>
                <Button type="Button" variant="contained" color="primary" onClick={routeChange}>Edit</Button>
                <Button type="Button" variant="contained" color="primary" onClick={routeChange}>Delete</Button>
                <br />
            </CardActions>
        </Card>

    )
}

export default UserPageComp
