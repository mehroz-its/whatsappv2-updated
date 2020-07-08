import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import navigationLogo from '../../../../../images/logo.jpg';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

const formStyle = {
    padding: '30px 10px',
    justifyContent: 'center',
};

const formItem = {
    margin: '10px 0',
};

const LogoStyle = {
    width: '70%',
    display: 'block',
    padding: '0 0 0 0',
    margin: '70px auto -40px auto',
    // borderBottom: '2px solid #f3d63c',
};




class Login2Page extends React.Component {

	constructor(props) {
        super(props);
        this.userToken = localStorage.getItem('user_token');
        this.settings = JSON.parse(localStorage.getItem('client_settings'));

        if (this.settings === null) this.settings = {
            client_logo: navigationLogo
        }
    }

    state = {
        username: '',
        passsword: '',
        has_error: false,
        error_message: null,
        client_settings: null,
    };

    handleUserNameInput = (e) => {
        this.setState({ username: e.target.value });
    };

    handlePassordInput = (e) => {
        this.setState({ passsword: e.target.value });
    };
    authSuccess = (response) => {
        const token = response.data.data.token;

        localStorage.setItem('client_token', token);

        CoreHttpHandler.request('core', 'clientSettings', {}, this.settingsSuccess, this.settingsFailure);
    };

    authFailure = (error) => {
        console.log("CLIENT AUTH ERROR > ", error);
    };

    settingsSuccess = (response) => {
        const settings = response.data.data.setting;
        this.setState({
            client_settings : settings
        })
        localStorage.setItem('client_settings', JSON.stringify(settings));
    };

    settingsFailure = (error) => {
        console.log("CLIENT SETTINGS ERROR >", error);
    };

    clientAuthentication() {
        CoreHttpHandler.request('core', 'clientAuth', {}, this.authSuccess, this.authFailure);
    }

    componentDidMount() {
        if (this.userToken !== null){
            this.props.history.push('/dashboard');
        }else{
            this.clientAuthentication();

        }
        // const clientToken = localStorage.getItem('client_token');

        // if (clientToken === null) this.clientAuthentication();
    }

    // componentDidMount() {
    //     if (this.userToken !== null) this.props.history.push('/dashboard');
    // }

    loginSuccess = (data) => {
		this.setState({error_message:''})
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

    loginFailure = (error) => {
        this.setState({
            has_error: true,
			error_message: error.response.data.message,
		
		});
		
    };

    login = () => {
		this.setState({error_message:''})
        const data = {
            username: this.state.username,
            password: this.state.passsword,
        };
		   if(this.state.username ==''||this.state.passsword=='')
		   {
			  this.setState({error_message:'Please fill every field'})
		   }
		   else {
        CoreHttpHandler.request(
            'core',
            'userAuth',
            data,
            this.loginSuccess,
            this.loginFailure
        );
	}
};

    _handleKeyDown = (e) => {
		console.log('in handleee');
		
		
        if (e.key === 'Enter') {
            this.login();
        }
    };

    goToForget = () => {
        this.props.history.push('/forget-password');
	};

	
render(){


	return (
		<div className={clsx( 'flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0')}>
			<div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
				<FuseAnimate animation="transition.expandIn">
					<img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo" />
				</FuseAnimate>

				<FuseAnimate animation="transition.slideUpIn" delay={300}>
					<Typography variant="h3" color="inherit" className="font-light">
						Welcome to the FUSE!
					</Typography>
				</FuseAnimate>

				<FuseAnimate delay={400}>
					<Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel
						convallis elit fermentum pellentesquasdasdse. Sed mollis velit facilisis facilisis.
					</Typography>
				</FuseAnimate>
			</div>

			<FuseAnimate animation={{ translateX: [0, '100%'] }}>
				<Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
					<CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
						<Typography variant="h6" className="md:w-full mb-32">
							LOGIN TO YOUR ACCOUNT
						</Typography>

						<form
							name="loginForm"
							noValidate
							className="flex flex-col justify-center w-full"
							
						>
							<TextField
								className="mb-16"
								label="Email"
								autoFocus
								type="email"
								name="email"
								value={this.state.username}
								onChange={this.handleUserNameInput}
								variant="outlined"
								required
								style={formItem}
								fullWidth
								onKeyDown={this._handleKeyDown}
							/>

							<TextField
								className="mb-16"
								label="Password"
								type="password"
								name="password"
								
								onChange={this.handlePassordInput}
								variant="outlined"
								value={this.state.passsword}
								required
								style={formItem}
								fullWidth
								onKeyDown={this._handleKeyDown}
							/>
							

							<div className="flex items-center justify-between">
								{/* <FormControl>
									<FormControlLabel
										control={
											<Checkbox name="remember" checked={form.remember} onChange={handleChange} />
										}
										label="Remember Me"
									/>
								</FormControl> */}

								<Link className="font-medium" to="/pages/auth/forgot-password">
									Forgot Password?
								</Link>
							</div>
							<input
							
							value={this.state.error_message}
							style={{color:'red',fontSize:15,textAlign:'center',marginTop:2}}/>

							<Button
								variant="contained"
								color="primary"
								className="w-full mx-auto mt-16"
								aria-label="LOG IN"
								
								onClick={this.login}

							>
								LOGIN
							</Button>
						</form>

					

						<div className="flex flex-col items-center justify-center pt-32 pb-24">
							<span className="font-medium">Don't have an account?</span>
							<Link className="font-medium" to="/pages/auth/register">
								Create an account
							</Link>
						</div>
					</CardContent>
				</Card>
			</FuseAnimate>
		</div>
	);
}
}
export default Login2Page;
