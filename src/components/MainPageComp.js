import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import firebaseDb from '../firebase';
import { getAuth } from "firebase/auth";
import Stack from '@mui/material/Stack';
import { ReactSession } from 'react-client-session';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: 3,
        marginLeft: 3,
        marginRight: 3,
        textAlign: 'center',
    },
}));

function MainPageComp() {

    const classes = useStyles();

    const navigate = useNavigate();

    const routeChangeUser = () => {
        let path = `newPath`;
        navigate("../MoviesManagement/users", { replace: true });
    };

    // const logOut = () => {
    //     ReactSession.remove("username");
    //     const auth = getAuth(firebaseDb);
    //     auth.signOut();
    //     //firebaseDb.auth().signOut();
    //     navigate("../MoviesManagement/home", { replace: true });

    // };

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Stack direction="row"  justifyContent="center" alignItems="center" spacing={2}>
                <Button type="Button" variant="contained" color="primary" className={classes.button}>Movies</Button>
                <Button type="Button" variant="contained" color="primary" className={classes.button}>Subscriptions</Button>
                <Button type="Button" variant="contained" color="primary" className={classes.button} onClick={routeChangeUser}>User Management</Button>
               {/* <Button type="Button" variant="contained" color="inherit" className={classes.button} onClick={logOut}>Log Out</Button>*/}
            </Stack>
            <br />
        </div>
    )
}

export default MainPageComp
