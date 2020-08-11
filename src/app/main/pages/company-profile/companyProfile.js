import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText,

	},
	formControl: {
		// margin: theme.spacing(1),
		minWidth: 180,
	},
	selectEmpty: {
		// marginTop: theme.spacing(2),
	},
}));

function ComapnyProfile() {
	const classes = useStyles();
	const [step, setStep] = React.useState(1)
	const [city, setCity] = React.useState('');
	const [country, setCountry] = React.useState('');



	const { form, handleChange, resetForm } = useForm({
		username: '',
		email: '',
		address: '',
		firstname: '',
		lastname: '',
		phonenumber: '',
		wnumber: '',
		zipcode: '',
		state: '',
		password: '',
		passwordConfirm: '',
		acceptTermsConditions: false
	});

	// function isFormValid() {
	//     return (
	//         form.email.length > 0 &&
	//         form.password.length > 0 &&
	//         form.password.length > 3 &&
	//         form.password === form.passwordConfirm &&
	//         form.acceptTermsConditions
	//     );
	// }
	const handleCityChange = (event) => {
		setCity(event.target.value);
	};
	const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};



	function handleSubmit(ev) {
		ev.preventDefault();
		// resetForm();
		setStep(2)
	}
	let pic = require('../../../../images/logo-head.png')
	console.log(form, 'formform')
	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-0')}>
			<div className="flex flex-col items-center justify-center w-450">
				<FuseAnimate animation="transition.expandIn">
					{step === 1 ? <Card className=" w-9/12 p-16">
						<CardContent className="flex flex-col items-center justify-center ">
							<img className="w-60 m-10" src={pic} alt="logo" />
							<Typography variant="h6" className="mt-10 mb-16">
								Onboarding
								</Typography>
							<form
								name="registerForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>
								<Grid container spacing={3} style={{ marginBottom: '10px' }} >
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="firstname" type="firstname" value={form.firstname} required id="outlined-basic-email" label="First Name" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="lastname" type="lastname" value={form.lastname} required id="outlined-basic-email" label="Last Name" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="phonenumber" type="number" value={form.phonenumber} required id="outlined-basic-email" label="Phone Number" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="wnumber" type="number" value={form.wnumber} required id="outlined-basic-email" label="W-Number" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="email" type="email" value={form.email} required id="outlined-basic-email" label="E-mail" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="address" type="address" value={form.address} required id="outlined-basic-email" label="Address" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<FormControl variant="outlined" size='small' fullWidth style={{ marginTop: '0px' }}>
											<InputLabel id="outlined-age-native-simple	">Country</InputLabel>
											<Select
												required
												labelId="demo-simple-select-outlined-label"
												id="demo-simple-select-outlined"
												value={country}
												onChange={handleCountryChange}
												fullWidth
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												<MenuItem value={10}>Dummy</MenuItem>
												<MenuItem value={20}>Dummy</MenuItem>
												<MenuItem value={30}>Dummy</MenuItem>
											</Select>
											{/* <FormHelperText>Some important helper text</FormHelperText> */}
										</FormControl>
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<FormControl variant="outlined" size='small' fullWidth style={{ marginTop: '0px' }}>
											<InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
											<Select
												required
												labelId="demo-simple-select-outlined-label"
												id="demo-simple-select-outlined"
												value={city}
												onChange={handleCityChange}
												fullWidth
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												<MenuItem value={10}>Dummy</MenuItem>
												<MenuItem value={20}>Dummy</MenuItem>
												<MenuItem value={30}>Dummy</MenuItem>
											</Select>
											{/* <FormHelperText>Some important helper text</FormHelperText> */}
										</FormControl>
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="state" type="state" value={form.state} required id="outlined-basic-email" label="State" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="zipcode" type="zipcode" value={form.zipcode} required id="outlined-basic-email" label="Zip-code" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
								</Grid>
								{/* <FormControl className="items-center">
										<FormControlLabel
											control={
												<Checkbox
													name="acceptTermsConditions"
													checked={form.acceptTermsConditions}
													onChange={handleChange}
												/>
											}
											label="I read and accept terms and conditions"
										/>
									</FormControl> */}

								<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16"
									aria-label="Register"
									disabled={false}
									type="submit"
								>
									Register
									</Button>
							</form>

							{/* <div className="flex flex-col items-center justify-center pt-32 pb-24">
									<span className="font-medium">Already have an account?</span>
									<Link className="font-medium" to="/pages/auth/login">
										Login
									</Link>
								</div> */}
						</CardContent>
					</Card> :
						<Card className="w-full max-w-400">
							<CardContent className="flex flex-col items-center justify-center p-48">
								<img className="w-60 m-10" src={pic} alt="logo" />
								<Typography variant="h6" className="mt-10 mb-16">
									Account Setup
							</Typography>

								<form
									name="registerForm"
									noValidate
									className="flex flex-col justify-center w-full"
									onSubmit={handleSubmit}
								>
									<TextField
										className="mb-16"
										label="Username"
										autoFocus
										type="username"
										name="username"
										value={form.name}
										onChange={handleChange}
										variant="outlined"
										required
										fullWidth
										size='small'

									/>
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
										size='small'
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
										size='small'

									/>
									<Button
										variant="contained"
										color="primary"
										className="w-220 mx-auto mt-16 mb-20"
										aria-label="Register"
										// disabled={!isFormValid()}
										type="submit"
										size='small'

									>
										CREATE AN ACCOUNT
								</Button>
								</form>

								{/* <div className="flex flex-col items-center justify-center pt-32 pb-24">
								<span className="font-medium">Already have an account?</span>
								<Link className="font-medium" to="/pages/auth/login">
									Login
								</Link>
							</div> */}


								{/* <div className="flex flex-col items-center justify-center pt-32 pb-24">
								<span className="font-medium">Already have an account?</span>
								<Link className="font-medium" to="/pages/auth/login">
									Login
								</Link>
							</div> */}
							</CardContent>
						</Card>
					}
				</FuseAnimate>
			</div>
		</div>



	);
}

export default ComapnyProfile;
