import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Container, AppBar, Typography, Grow, Grid, Toolbar, Avatar, Button} from '@material-ui/core';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {useHistory,useLocation} from 'react-router-dom';
import memories from '../../images/view-image.png';
const Navbar = () => {
    const classes = useStyles();
    const [user,setUser] =useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const HISTORY = useHistory();
    useEffect(()=>{
        const token=user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    const logout=()=>{
        dispatch({type:'LOGOUT'});
        History.pushState();
        setUser(null);
    };
    return(
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
            <div className ={classes.container}>
                <Typography component = {Link} to="/" className={classes.heading} variant="h2" align="center"> Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
                ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;