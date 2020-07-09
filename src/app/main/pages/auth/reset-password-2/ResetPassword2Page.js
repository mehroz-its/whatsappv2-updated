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
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function ResetPasswordPage2(props) {
	console.log(props)
	const classes = useStyles();

	const { form, handleChange, resetForm } = useForm({
		password: '',
		passwordConfirm: ''
	});
	const [alertmessage, setAlertMessage] = React.useState('')
	const [alertseveirty, setAlertSeveirty] = React.useState('')


	function isFormValid() {
		return (
			form.password.length > 3 &&
			form.password === form.passwordConfirm
		);
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		// resetForm();
		let data = {
			resetToken:props.location.token,
			password: form.password,
			cpassword: form.passwordConfirm
		}
		console.log(data, 'datadata')

		CoreHttpHandler.request(
			'forgetpassword',
			'setpassword',
			data,
			(response) => {
				// this.setState({
				//     message: 'updated succesfully',
				//     severity: 'success',
				// });
				setAlertSeveirty('success')
				setAlertMessage('updated Succesfully')
				setTimeout(() => {
					props.history.push({
						pathname: '/'
						
					});
				}, 1000);
			},
			(error) => {
				if (error.response.status === 422) {
					// this.setState({
					//     message: error.response.data.message,
					//     severity: 'error',
					// });
					setAlertMessage(error.response.data.message)
					setAlertSeveirty('error')
					setTimeout(() => {
						props.history.push({
							pathname: '/pages/auth/forgot-password'
							
						});
					}, 1000);
				} else {
					// this.setState({
					//     message: error.response.data.message,
					//     severity: 'error',
					// });
					setAlertMessage(error.response.data.message)
					setAlertSeveirty('error')
				}
			}
		);
	}


	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0')}>
			<div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
			<FuseAnimate animation="transition.expandIn">
					<img  style={{ width: 500, height: 100, }} src={require('../../../../../images/itsAppLogo.png')} alt="logo" />
				</FuseAnimate>

				<FuseAnimate animation="transition.slideUpIn" delay={300}>
					<Typography variant="h3" color="inherit" className="font-light mt-20">
					Welcome to the Intellexal Solutions!
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
					<CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128">
						<Typography variant="h6" className="md:w-full mb-32">
							RESET YOUR PASSWORD
						</Typography>

						<form
							name="resetForm"
							noValidate
							className="flex flex-col justify-center w-full"
						// onSubmit={handleSubmit}
						>
							{alertmessage ? (
								<Alert style={{marginBottom:'10px'}}  severity={alertseveirty}>
									{alertmessage}
								</Alert>
							) : null}

							<TextField
								className="mb-16"
								label="Password"
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								variant="outlined"
								required
								fullWidth
							/>

							<TextField
								className="mb-16"
								label="Password (Confirm)"
								type="password"
								name="passwordConfirm"
								value={form.passwordConfirm}
								onChange={handleChange}
								variant="outlined"
								required
								fullWidth
							/>

							<Button
								variant="contained"
								color="primary"
								className="w-224 mx-auto mt-16"
								aria-label="Reset"
								disabled={!isFormValid()}
								type="submit"
								onClick={handleSubmit}
							>
								RESET MY PASSWORD
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

export default ResetPasswordPage2;
