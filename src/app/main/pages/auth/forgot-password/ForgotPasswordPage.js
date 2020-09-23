import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'


const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function ForgotPasswordPage(props) {
	const classes = useStyles();
	const [alertmessage, setAlertMessage] = React.useState('')
	const [alertseveirty, setAlertSeveirty] = React.useState('')
	const { form, handleChange, resetForm } = useForm({
		email: ''
	});

	function isFormValid() {
		return form.email.length > 0;

	}

	let validateEmail = email => {
		var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};


	function isFormValid() {
		return (
			form.email.length > 0 &&
			validateEmail(form.email)
		);
	}

	function handleSubmit(ev) {
		ev.preventDefault()
		props.history.push({
			pathname: '/pages/auth/token',

		});
		console.log(props)


		// console.log("ev", form.email);
		// props.history.push("/");

		if (form.email === "") {
			// this.setState({
			//     message: "Please enter email",
			//     severity: 'error',
			// });
			setAlertSeveirty('error')
			setAlertMessage('Pleaseenter a valid email')
			return;
		}

		if (validateEmail(form.email) === true) {
			let data = {
				email: form.email,
			};
			CoreHttpHandler.request(
				'forgetpassword',
				'gettoken',
				data,
				(response) => {
					// console.log("response : ", response);
					props.history.push({
						pathname: '/pages/auth/token',

					});
				},
				(error) => {
					// this.setState({
					//     message: error.response.data.message,
					//     severity: 'error',
					// });
					setAlertSeveirty('error')
					setAlertMessage(error.response.data.message)

				}
			);
		} else {
			// this.setState({
			//     message: "Please enter valid email",
			//     severity: 'error',
			// });
			setAlertSeveirty('error')
			setAlertMessage('Please enter valid email')

		}


	}

	return (
		<div className={clsx('flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0')}
			style={{
				backgroundImage: 'url(' + require('../../../../../images/background-04.jpg') + ')',
				backgroundSize: 'cover'
			}}>
			<div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
				<FuseAnimate animation="transition.expandIn">
					{/* <img className="w-128 mb-32" src="../../../../../images/itsAppLogo.png" alt="logo" /> */}
					<div style={{ marginLeft: -200 }}>
						<img src={require('../../../../../images/LOGO-1-01.gif')}
							style={{ width: 400, marginLeft: '-6%' }}
						/>
					</div>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideUpIn" delay={300}>
				<Typography variant="h3" color="inherit" className="font-light mt-20">
                        Welcome to Intellexal Solutions!
					</Typography>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideUpIn" delay={400}>
					<Typography variant="subtitle1" color="inherit" className="font-light mt-20 ">
						Using our experience from across industries and continents, we tailor solutions that fit your business needs.
					</Typography>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideUpIn" delay={500}>
					<Typography variant="subtitle1" color="inherit" className="font-light mt-20">
						As a WhatsApp Business Solution Provider, we enable enterprises to connect to WhatsApp directly – either through our API or using our web-based interface.
					</Typography>
				</FuseAnimate>

				{/* <FuseAnimate delay={400}>
					<Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel
						convallis elit fermentum pellentesque. Sed mollis velit facilisis facilisis.
					</Typography>
				</FuseAnimate> */}
			</div>

			<FuseAnimate animation={{ translateX: [0, '100%'] }}>
				<Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
					<CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
						<Typography variant="h6" className="md:w-full mb-32 text-center" >
							RECOVER YOUR PASSWORD
						</Typography>

						<form
							name="recoverForm"
							noValidate
							className="flex flex-col justify-center w-full"
						// onSubmit={handleSubmit}
						>
							{alertmessage ? (
								<Alert style={{ marginBottom: '10px' }} severity={alertseveirty}>
									{alertmessage}
								</Alert>
							) : null}
							<TextField
								className="mb-16"
								label="Email"
								autoFocus
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								variant="outlined"
								required
								fullWidth
								size="small"
							/>

							<Button
								variant="contained"
								color="primary"
								className="w-224 mx-auto mt-16"
								aria-label="Reset"
								disabled={!isFormValid()}
								type="submit"
								// onClick={()=>{props.history.push("/pages/auth/reset-password-2")}}
								onClick={handleSubmit}
							>
								Send Token
							</Button>
						</form>

						<div className="flex flex-col items-center justify-center pt-32 pb-24">
							<Link className="font-medium" to="/login">
								Go back to login
							</Link>
						</div>
					</CardContent>
				</Card>
			</FuseAnimate>
		</div>
	);
}

export default ForgotPasswordPage;
