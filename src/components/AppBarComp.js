import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../images/Logo.png';
import '../css/AppBarCss.css'
import { Link, Route, Switch } from 'react-router-dom';
import { ReactSession } from 'react-client-session';


const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    appBar: {
        marginBottom: theme.spacing(2),
    },
}));

function AppBarComp() {

    const classes = useStyles();
    const username = ReactSession.get("username");
    var usernameHtml = '';
    if (username)
        usernameHtml = <Typography variant="h6" >Hello: {username} </Typography>;
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/MoviesManagement/home" replace >
                        <div className='logoHorizontallyCenter'>
                            <img src={Logo} className='logo' alt="logo" />
                        </div>
                    </Link>
                </Typography>
                {usernameHtml}
                <Link to="/MoviesManagement/login" variant="outlined">
                    <Button type="Button" variant="contained" color="primary">
                        Login
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarComp
