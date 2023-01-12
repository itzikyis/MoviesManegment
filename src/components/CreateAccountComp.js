
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import firebaseDb from '../firebase';
import { Link, Route, Switch } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Box, Grid, TextField, Button, Avatar, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ReactSession } from 'react-client-session';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <a color="inherit" href="https://itzikyis.com"> Itzikyis</a> {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function CreateAccountComp() {

    let navigate = useNavigate();
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [open, setOpen] = useState(false);
    const [errorCode, setErrorCode] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const auth = getAuth(firebaseDb);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user);


                ReactSession.set("username", user.email.split('@')[0]);

                const db = getDatabase(firebaseDb);

                set(ref(db, 'users/' + user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    userName: user.email,
                    createDate: Date.now(),
                    sessionTimeOut: 20
                })
                    .then(() => {
                        // Data saved successfully!
                        console.log("Data saved successfully!");
                    })
                    .catch((error2) => {
                        // The write failed...
                        console.log("The write failed");
                    });

                set(ref(db, 'permissions/' + user.uid), {
                    createMovies: 0,
                    createSubscriptions: 0,
                    deleteMovies: 0,
                    deleteSubscriptions: 0,
                    viewMovies: 1,
                    viewSubscriptions: 1
                })
                    .then(() => {
                        // Data saved successfully!
                        console.log("Data saved successfully!");
                    })
                    .catch((error2) => {
                        // The write failed...
                        console.log("The write failed");
                    });

                navigate("../MoviesManagement/main", { replace: true });
                // route.Link('/main');//this.props.history.push('/main')
                // ...
            })
            .catch((error) => {
                console.log(error);
                var errorCode = error.code;
                var errorMessage = error.message;
                var errorStr = 'Try Again!';

                if (errorCode.substring(errorCode.indexOf('/') + 1) == 'email-already-in-use') {
                    errorStr = 'Email already in use';
                }
                else if (errorCode.substring(errorCode.indexOf('/') + 1) == 'invalid-email') {
                    errorStr = 'Invalid email';
                }
                else if (errorCode.substring(errorCode.indexOf('/') + 1) == 'operation-not-allowed') {
                    errorStr = 'Email/Password accounts are not enabled';
                }
                else if (errorCode.substring(errorCode.indexOf('/') + 1) == 'weak-password') {
                    errorStr = 'Weak password';
                }

                setErrorCode(errorStr);
                setOpen(true);
                //console.log(errorCode);
                //console.log(errorMessage);
            });
    };


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        onChange={(e) => { setFirstName(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                        onChange={(e) => { setLastName(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/MoviesManagement/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errorCode}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}
export default CreateAccountComp
