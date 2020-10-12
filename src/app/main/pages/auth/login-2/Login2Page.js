import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import navigationLogo from '../../../../../images/logo.jpg';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles,ThemeProvider,createMuiTheme,withStyles,MuiThemeProvider } from '@material-ui/core/styles';
import {HOME_URL} from "./../../../../common/parameters.js";
import {useSelector, useDispatch} from "react-redux";


const useStyles = makeStyles(theme => ({

    underline: {
        "&&&:before": {
          borderBottom: "30px"
        },
        "&&:after": {
          borderBottom: "none"
        },
        "&:focus":{
        border:"none"
        }
      },
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '100%',
        },
        
      },
    
}));

const HeaderStyle = createMuiTheme({
	overrides: {
        MuiTextField: {
		root: {
        border:'none',
		  "&:focus": {
            paddingRight: 500,
            borderColor:'pink',
            paddingTop:600
		  }
		}
	  }
	}
  });




const formStyle = {
    padding: '30px 10px',
    justifyContent: 'center',
};

const formItem = {
    margin: '10px 0',
};


const error = {
    color: 'red'
}
const LogoStyle = {
    width: '70%',
    display: 'block',
    padding: '0 0 0 0',
    margin: '70px auto -40px auto',
    // borderBottom: '2px solid #f3d63c',
};

const success = {
    color: 'pink'
}


const styles = {
    root: {
        color: 'red'
    }
}

const Login2Page = (props) => {
    const dispatch = useDispatch()

    if (settings === null) settings = {
        client_logo: navigationLogo
    }

    let userToken = localStorage.getItem('user_token');
    let settings = JSON.parse(localStorage.getItem('client_settings'));
    if (settings === null) settings = {
        client_logo: navigationLogo
    }

    const [username, setUserName] = React.useState('')
    const [passsword, setPassword] = React.useState('')
    const [has_error, setHasError] = React.useState(false)
    const [client_settings, setClientSettings] = React.useState(null)
    const [error_message, setErrorMessage] = React.useState(null)
    const [snackbaropen, setSnackBarOpen] = React.useState(false)
    const [snackbarmessage, setSnackBarMessage] = React.useState('')
    const [ok, setOK] = React.useState('')
    const [hit, setHitFalse] = React.useState(true)
    const [isLoading, setIsLoading] = React.useState(false);


    let snackbarClose = (event) => {
        setSnackBarOpen(false)

    }
    let handleUserNameInput = (e) => {
        setUserName(e.target.value)
    };

    let handlePassordInput = (e) => {
        setPassword(e.target.value)
    };
    let authSuccess = (response) => {
        const token = response.data.data.token;

        localStorage.setItem('client_token', token);

        CoreHttpHandler.request('core', 'clientSettings', {}, settingsSuccess, settingsFailure);
    };

    let authFailure = (error) => {
    };

    let settingsSuccess = (response) => {
        const settings = response.data.data.setting;
        setClientSettings(settings)
        localStorage.setItem('client_settings', JSON.stringify(settings));
    };

    let settingsFailure = (error) => {
    };

    let clientAuthentication = () => {
        CoreHttpHandler.request('core', 'clientAuth', {}, authSuccess, authFailure);
    }
    let checkUser = () => {
        if (userToken !== null) {
            props.history.push(HOME_URL);
        } else if (hit !== false) {
            clientAuthentication();
        }
    }
    React.useEffect(() => {
        checkUser()

    }, []);

  

    let login = () => {
        setIsLoading(true);
        setErrorMessage('')
        const data = {
            username: username,
            password: passsword,
        };
        if (username == '' || passsword == '' || passsword == undefined || username == undefined) {
            setIsLoading(false)
            setSnackBarOpen(true)
            setSnackBarMessage('Please Fill The Required Fields')
            setOK('error')
        }
        else {
            CoreHttpHandler.request(
                'core',
                'userAuth',
                data,
                loginSuccess,
                loginFailure
            );
        }
    };
    const loginSuccess = (data) => {
        console.log("loginSuccess  data",data);
        setErrorMessage('')
        setSnackBarOpen(true)
        setSnackBarMessage('Successfully Logged In')
        setOK('success')
        const { token, acl, app, back, user } = data.data.data;
        localStorage.setItem('user_token', token);
        if (user) {
            localStorage.setItem('user_data', JSON.stringify(user));
        } else localStorage.setItem('user_data', JSON.stringify({}));

        if (acl) {
            localStorage.setItem('user_acl', JSON.stringify(acl));
        } else localStorage.setItem('user_acl', JSON.stringify({}));

        if (app) {
            localStorage.setItem('app_acl', JSON.stringify(app));
        } else localStorage.setItem('app_acl', JSON.stringify({}));

        if (back) {
            localStorage.setItem('back_acl', JSON.stringify(back));
        } else localStorage.setItem('back_acl', JSON.stringify({}));

        localStorage.setItem('online', false);

        
        window.location.reload(false);
    };

    const loginFailure = (error) => {
        console.log("loginFailure data",error);
        setHasError(true)
        setErrorMessage('')
        setSnackBarOpen(true)
        setSnackBarMessage(`${error.response.data.message}`)
        setOK('error')
        setIsLoading(false)

    };
    let _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    let goToForget = () => {
        this.props.history.push('/forget-password');
    };

    const classes = useStyles();

    return (
        <div
            className={clsx('flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0')}
            style={{backgroundImage: 'url(' + require('../../../../../images/background-04.jpg') + ')',
        backgroundSize:'cover'
    }}
            >
            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 sm:p-16 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
                <FuseAnimate animation="transition.expandIn">
                        <div style={{marginLeft:-200}}>
                        <img src={require('../../../../../images/LOGO-1-01.gif')}
                        style={{width:400,marginLeft:'-6%'}}
                    />
                    </div>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <Typography variant="h3" color="inherit" className="font-light mt-20">
                        Welcome to Intellexal Solutions!
					</Typography>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideUpIn" delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="font-light mt-20 text-13 sm:text-20 md:text-20 lg:text-25 xl:text-30">
                    Using our experience from across industries and continents, we tailor solutions that fit your business needs.
					</Typography>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideUpIn" delay={500}>
                    <Typography variant="subtitle1" color="inherit" className="font-light mt-20 text-13 sm:text-20 md:text-20 lg:text-25 xl:text-30">
                    As a WhatsApp Business Solution Provider, we enable enterprises to connect to WhatsApp directly – either through our API or using our web-based interface.
					</Typography>
                </FuseAnimate>
            </div>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackbaropen}
                autoHideDuration={3000}
                onClose={snackbarClose}
            >
                <Alert variant="filled" severity={ok}>
                    {snackbarmessage}
                </Alert>
            </Snackbar>

            <FuseAnimate animation={{ translateX: [0, '100%'] }}>
                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 sm:p-0">
                        <Typography  style={{marginTop:'2%'}} variant="h6" className="mt-32 md:w-full mb-16 sm:mb-0 text-center text-13 sm:text-20 md:text-20 lg:text-25 xl:text-30 sm:p-0">
                            LOGIN TO YOUR ACCOUNT
						</Typography>

                        <form
                            name="loginForm"
                            noValidate
                            className={classes.root}

                        >
                         
                            <TextField
                                className="mb-16 sm:mb-4"
                                label="Username"
                                autoFocus
                                type="email"
                                name="email"
                                value={username}
                                onChange={handleUserNameInput}
                                variant="outlined"
                                required
                                style={formItem}
                                fullWidth
                                size="small"
                                onKeyDown={_handleKeyDown}
                            />
                            <TextField
                                className="mb-16 sm:mb-4"
                                label="Password"
                                type="password"
                                name="password"
                                size="small"
                                onChange={handlePassordInput}
                                variant="outlined"
                                value={passsword}
                                required
                                style={formItem}
                                fullWidth
                                onKeyDown={_handleKeyDown}
                            />
                       

                            <div className="flex items-center justify-between mt-16 mb-32">
                                <Link className="font-medium" to="/pages/auth/forgot-password">
                                    Forgot Password?
								</Link>
                            </div>

                            {isLoading === true ? <CircularProgress color="secondary" style={{ marginLeft: '40%' }} />
                                : <Button
                                    variant="contained"
                                    color="primary"
                                    className="w-full mx-auto mt-16 sm:mt-0"
                                    aria-label="LOG IN"
                                    onClick={login}
                                >
                                    LOGIN
							</Button>
                            }
                        </form>
                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    );

}
export default Login2Page;
