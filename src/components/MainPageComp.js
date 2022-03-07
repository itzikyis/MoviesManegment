import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link, Route, Switch } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 0, 2, 1),
    },
}));

function MainPageComp() {

    const classes = useStyles();

    const navigate = useNavigate();

    const routeChangeUser = () => {
        let path = `newPath`;
        navigate.push("/users");
    }

    return (
        <div>
            <Button type="Button" variant="contained" color="primary" className={classes.button}>Movies</Button>
            <Button type="Button" variant="contained" color="primary" className={classes.button}>Subscriptions</Button>
            <Button type="Button" variant="contained" color="primary" className={classes.button} onClick={routeChangeUser}>User Management</Button>
            <Button type="Button" variant="contained" color="primary" className={classes.button}>Log Out</Button>
            <br />
        </div>
    )
}

export default MainPageComp
