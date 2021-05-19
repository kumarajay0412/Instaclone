import React ,{useState}from 'react';
import {Avatar,Button,Paper,Grid,Typography,Container, TextField} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from 'react-google-login';
import useStyles from './style';
import Input from './Input';
import Icon from './icon';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

const Auth = () => {
    const [showPassword ,setShowPassword] = useState(false);
    const classes= useStyles();
    const history =useHistory();
    const [isSignup,setIsSignup]=useState(false);
    const dispatch = useDispatch();
    const handleSubmit= () => {
    
    };
    const handleChange=()=>{

    };
    const handleShowPassword = ()=> setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () =>{
            setIsSignup((prevIsSignup) => !prevIsSignup);
            handleShowPassword(false);
    };
    const googleSuccess = async (res)=>{
        const result =res?.profileObj;
        const token =res?.tokenId;
        try {
            dispatch({type: 'AUTH' , data: {result,token}});
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure =()=>{
        console.log("try again google login failed");
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant ="h5">{isSignup ? 'Sign Up' : 'Sign In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing ={2}>{
                            isSignup &&(
                            <>
                                <Grid>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />      
                                </Grid>
                            </>
                            )
                            }
                            <Input name="email" label="Email" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name ="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin 
                        clientId="498714550085-t2mgmonbo9nd7lcjvk45ithbojls7rhk.apps.googleusercontent.com"
                        render ={(renderProps) => (
                            <Button 
                            className ={classes.googleButton} 
                            color ='primary' 
                            fullWidth onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>} 
                            variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        cookiePolicy="single_host_origin"
                        onFailure={googleFailure}
                    />
                    <Grid container justify ="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                 { isSignup ? 'Already have an account ? Sign In ' :"Don't have an account ? Signup" }
                            </Button>
                       
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth
