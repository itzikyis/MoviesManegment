import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import database from '../firebase';
import { db } from '../firebase'
import { getDatabase, ref, set } from "firebase/database";

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function AddUserComp() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [session, setSession] = useState(0);
    const [viewSubscriptions, setViewSubscriptions] = useState(false);
    const [createSubscriptions, setCreateSubscriptions] = useState(false);
    const [deleteSubscriptions, setDeleteSubscriptions] = useState(false);
    const [updateSubscriptions, setUpdateSubscriptions] = useState(false);
    const [viewMovies, setViewMovies] = useState(false);
    const [createMovies, setCreateMovies] = useState(false);
    const [deleteMovies, setDeleteMovies] = useState(false);
    const [updateMovies, setUpdateMovies] = useState(false);

    useEffect(() => {
        console.log("The write failed");

        console.log(firstName);
    })

    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const current = new Date();

        const db = getDatabase(database);

        set(ref(db, 'users/' +2), {
            createDate: current,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            sessionTimeOut: session
        })
            .then(() => {
                // Data saved successfully!
                console.log("Data saved successfully!");
            })
            .catch((error) => {
                // The write failed...
                console.log("The write failed");
            });


        // database.database().ref('users').set({
        //     createDate: current,
        //     firstName: "menehem",
        //     lastName: "chohen",
        //     sessionTimeOut: 33
        // });
        // database.database().ref('users').set({
        //     createDate: current,
        //     firstName: "meni",
        //     lastName: "mamtera",
        //     sessionTimeOut: 44
        // });
        // database.database().ref('users/' + 3).set({
        //     createDate: current,
        //     firstName: "roman2",
        //     lastName: "takatch2",
        //     sessionTimeOut: 22
        // });

        // database.database().ref('permissions/' + 2).set({
        //     createMovies: "1",
        //     createSubscriptions: "1",
        //     deleteMovies: "1",
        //     deleteSubscriptions: "1",
        //     viewMovies: "1",
        //     viewSubscriptions: "1"
        // });

    };

    return (
        <Card sx={{ maxWidth: 500 }}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <CardContent>
                    <Grid container direction={"column"} >
                        <Grid item>
                            <TextField id="filled-helperText" label="First Name" variant="filled" margin='normal' onChange={(e) => setFirstName(e.target.value)} />
                        </Grid>
                        <Grid item>
                            <TextField id="filled-helperText" label="Last Name" variant="filled" margin='normal' onChange={(e) => setLastName(e.target.value)} />
                        </Grid>
                        <Grid item>
                            <TextField id="filled-helperText" label="User Name" variant="filled" margin='normal' onChange={(e) => setUserName(e.target.value)} />
                        </Grid>
                        <Grid item>
                            <TextField id="filled-helperText" label="Session time out(Minutes):" variant="filled" margin='normal' onChange={(e) => setSession(e.target.value)} />
                        </Grid>
                    </Grid>
                    <br />
                    <Typography variant="body2" align='left'>Permissions:</Typography>
                    <br />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="View Subscriptions" onChange={(e) => setViewSubscriptions(e.target.checked)} />
                        <FormControlLabel control={<Checkbox />} label="Create Subscriptions" onChange={(e) => setCreateSubscriptions(e.target.checked)} />
                        <FormControlLabel control={<Checkbox />} label="Delete Subscriptions" onChange={(e) => setDeleteSubscriptions(e.target.checked)} />
                        <FormControlLabel control={<Checkbox />} label="Update Subscriptions" onChange={(e) => setUpdateSubscriptions(e.target.checked)} />
                        <FormControlLabel control={<Checkbox />} label="View Movies" onChange={(e) => setViewMovies(e.target.checked)} />
                        <FormControlLabel control={<Checkbox />} label="Create Movies" onChange={(e) => setCreateMovies(e.target.checked)} />
                        <FormControlLabel control={<Checkbox />} label="Delete Movies" onChange={(e) => setDeleteMovies(e.target.checked)} />
                        <FormControlLabel control={<Checkbox />} label="Update Movies" onChange={(e) => setUpdateMovies(e.target.checked)} />
                    </FormGroup>
                    <br />
                </CardContent>
                <br />
                <CardActions>
                    <Button type="submit" variant="contained" color="primary" className={classes.submit}>Add</Button>
                    <Button type="Button" variant="contained" color="primary" className={classes.submit}>Cancel</Button>
                    <br />
                </CardActions>
            </form>
        </Card>
    )
}

export default AddUserComp
