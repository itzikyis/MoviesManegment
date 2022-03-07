import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, Route, Switch } from 'react-router-dom';
import firebaseDb from '../firebase';
import { useNavigate  } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        width: '25rem',
        margin: '5px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        float: 'left',
    },
    pos: {
        fontSize: 14,
        float: 'left'
    },
});

function UserPageComp() {
    const classes = useStyles();
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
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} variant="h5" component="h2">
                    Name:
                </Typography>
                <br />
                <Typography className={classes.pos} variant="h5" component="h2">
                    User name:
                </Typography>
                <br />
                <Typography className={classes.pos} variant="h5" component="h2">
                    Session time out(Minutes):
                </Typography>
                <br />
                <Typography className={classes.pos} variant="h5" component="h2">
                    Created Date:
                </Typography>
                <br />
                <Typography className={classes.pos} variant="h5" component="h2">
                    Permissions:
                </Typography>
                <br />
            </CardContent>
            <br />
            <CardActions>
                <Button type="Button" variant="contained" color="primary" className={classes.button} onClick={routeChange}>Edit</Button>
                <Button type="Button" variant="contained" color="primary" className={classes.button} onClick={routeChange}>Delete</Button>
                <br />
            </CardActions>
        </Card>

    )
}

export default UserPageComp
