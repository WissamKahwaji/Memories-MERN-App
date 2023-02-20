import React, { useState } from 'react';
import { Avatar, Button, Grid, Typography, Container, Paper, } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { signup, signin } from '../../actions/auth';

const initialState = { firstName: "", lastName: "", password: "", confirmPassword: "" };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSingup, setIsSignUp] = useState(false);
    const [formDate, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSingup) {
            dispatch(signup(formDate, navigate));
        } else {

            dispatch(signin(formDate, navigate));
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formDate, [e.target.name]: e.target.value })
    };
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !isSingup);
        setShowPassword(false);
    };
    const dispatch = useDispatch();

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In unsuccessfull, Try again later");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSingup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSingup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSingup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}


                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSingup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='975601445311-lacljsouqulnknbkoro0sj3eai7ccmjm.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justifyContent='flex-end' >
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSingup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth
