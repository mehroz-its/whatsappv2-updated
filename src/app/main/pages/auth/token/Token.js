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
	const classes = useStyles();

	const { form, handleChange, resetForm } = useForm({
		token: '',
	});

	function isFormValid() {
		return (
			form.token.length > 0

		);
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		props.history.push({
			pathname: '/pages/auth/reset-password', token: form.token

		});

	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0')}>
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
					<Typography variant="subtitle1" color="inherit" className="font-light mt-20 text-13 sm:text-20 md:text-20 lg:text-25 xl:text-30 ">
						Using our experience from across industries and continents, we tailor solutions that fit your business needs.
					</Typography>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideUpIn" delay={500}>
					<Typography variant="subtitle1" color="inherit" className="font-light mt-20 text-13 sm:text-20 md:text-20 lg:text-25 xl:text-30">
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
					<CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128">
						<Typography variant="h6" className="md:w-full mb-32">
							RESET YOUR PASSWORD
						</Typography>




						<form
							name="resetForm"
							noValidate
							className="flex flex-col justify-center w-full"
							onSubmit={handleSubmit}
						>
							<TextField
								className="mb-16 sm:mb-4"
								label="Token"
								autoFocus
								type="token"
								name="token"
								value={form.token}
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
								onClick={handleSubmit}
							>
								Verify Token
							</Button>
						</form>

						<div className="flex flex-col items-center justify-center pt-32 pb-24">
							<Link className="font-medium" to="/login" style={{ fontSize: "14px" }}>
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
