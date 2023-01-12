import React, { useState, useEffect } from 'react';
import '../css/LoginPage.css'
//import Avatar from '@material-ui/core/Avatar';
//import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
//import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
//import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockIcon from '@mui/icons-material/Lock';
//import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import Container from '@material-ui/core/Container';
import { Link, Route, Switch } from 'react-router-dom';
import firebaseDb from '../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Box, Grid, TextField, Button, Avatar, Typography, Container } from '@mui/material';
import { ReactSession } from 'react-client-session';
import { login } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";

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

//const route = useRoute();


function LoginPageComp() {

    let navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [open, setOpen] = useState(false);
    const [errorCode, setErrorCode] = useState();

    const { message } = useSelector(state => state.message);
    
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       // dispatch(AuthService.login(email, password))

       dispatch(login(email, password))
            .then(() => {
                // Signed in
                navigate("../MoviesManagement/main", { replace: true });
            })
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                var errorStr = 'Try Again!';

                if (message && message.substring(message.indexOf('/') + 1) == 'wrong-password') {
                    errorStr = 'Worng Password';
                }
                else if (message && message.substring(message.indexOf('/') + 1) == 'user-not-found') {
                    errorStr = 'User Not Found';
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
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
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
                        autoFocus
                        onChange={(e) => { setEmail(e.target.value) }}
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
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/MoviesManagement/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
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

export default LoginPageComp
