import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
import decode from 'jwt-decode';
import memories from '../../images/memories.png';
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useNavigate();
    const location = useLocation();



    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, user?.token]);


    const logout = () => {
        dispatch({ type: LOGOUT });
        history('/');
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">SignIn</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}





export default Navbar;