import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../images/Logo.png';
import '../css/AppBarCss.css'
import { Link, Route, Switch } from 'react-router-dom';


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

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/home" replace >
                        <div className='logoHorizontallyCenter'>
                            <img src={Logo} className='logo' alt="logo" />
                        </div>
                    </Link>
                </Typography>
                <Link to="/Login" variant="outlined">
                    <Button type="Button" variant="contained" color="primary"                    >
                        Login
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarComp
