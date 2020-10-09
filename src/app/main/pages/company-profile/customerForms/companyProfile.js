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
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Icon from '@material-ui/core/Icon';

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

function ComapnyProfile(props) {
	const classes = useStyles();
	const [step, setStep] = React.useState(1)
	const [city, setCity] = React.useState('');
	const [country, setCountry] = React.useState('');
	const [state, setState] = React.useState('');
	const [countriesData, setCountriesData] = React.useState([]);
	const [citiesData, setCitiesData] = React.useState([]);
	const [statesData, setStatesData] = React.useState([]);
	const [profileImage, setProfileImage] = React.useState('')
	const [isLoading, setIsLoading] = React.useState(false)
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')




	const { form, handleChange, resetForm } = useForm({
		username: '',
		email: '',
		address: '',
		firstname: '',
		lastname: '',
		number: '',
		phone: '',
		password: '',
		passwordConfirm: '',
		website: '',
	});


	const getCountries = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('customerOnBoard', 'getCountries', {}, null, null, true);
		};
		loadData().then((response) => {
			const tableData = response.data.data.countries
			setCountriesData(tableData)
		})
			.catch((error) => {
			})
	})

	React.useEffect(() => {
		// getCountries()
		fetch(`https://glist.its.com.pk/v1/fetch/countries`)
			.then(response => response.json())
			.then(data => setCountriesData(data.data.countries));
	}, [])

	const handleCityChange = (event) => {
		setCity(event.target.value);
	}

	const handleStatesChange = (event) => {
		setState(event.target.value);
		console.log(event.target.value, 'country')
		let state = event.target.value
		fetch(`https://glist.its.com.pk/v1/fetch/cities/${state.id}`)
			.then(response => response.json())
			.then(data => setCitiesData(data.data.cities));

	};

	const handleCountryChange = (event) => {
		setCountry(event.target.value);
		console.log(event.target.value, 'country')
		let country = event.target.value

		fetch(`https://glist.its.com.pk/v1/fetch/states/${country.id}`)
			.then(response => response.json())
			.then(data => setStatesData(data.data.states));

	};


	function handleSubmit(ev) {
		ev.preventDefault();
		console.log('form', form, country, city)
		let params = { ...form, city: city.name, country: country.name, logo: profileImage }
		console.log(params, 'params')
		// return;
		CoreHttpHandler.request('customerOnBoard', 'submitForm', params, (response) => {
			setSnackBarOpen(true)
			setOK('success')
			setSnackBarMessage('Created successfully')
			props.history.push({
				pathname: '/login'

			});


		}, (error) => {
			alert('hi')
			setSnackBarOpen(true)
			setSnackBarMessage('Loggin Failed')
			setOK('error')



		});
	}
	function handleTabChange(ev) {
		ev.preventDefault();
		console.log('form', form, country, city)
		let params = { ...form, city: city.id, country: country.id, state: state.id, logo: profileImage }
		console.log(params, 'params')
		// return;
		CoreHttpHandler.request('customerOnBoard', 'submitForm', params, (response) => {
			setSnackBarOpen(true)
			setOK('success')
			setSnackBarMessage('Created successfully')
			props.history.push({
				pathname: '/apps/company-profile'
			});


		}, (error) => {
			alert('hi')
			setSnackBarOpen(true)
			setSnackBarMessage('Loggin Failed')
			setOK('error')



		});
		// setStep(2)
	}
	let snackbarClose = (event) => {
		// this.setState({ snackbaropen: false })
		setSnackBarOpen(false)

	}

	const onChangeHandler = event => {
		setIsLoading(true)
		if (event.target.files.length > 0) {
			const _data = new FormData();

			let _name = event.target.files[0].name;

			_name = _name.replace(/\s/g, "");

			_data.append(
				"file",
				event.target.files[0],
				`${new Date().getTime()}_${_name}`
			);

			CoreHttpHandler.request("content", "upload", { params: _data },
				response => {
					let url = response.data.data.link
					setProfileImage(url)
					setIsLoading(false)


				},
				error => {
					setIsLoading(false)

				});
		}
	};
const submitForms = () =>{
	console.log('form', form, country, city)
		let params = { ...form, city: city.name, country: country.name, logo: profileImage }
		console.log(params, 'params')
		// return;
		CoreHttpHandler.request('customerOnBoard', 'submitForm', params, (response) => {
			setSnackBarOpen(true)
			setOK('success')
			setSnackBarMessage('Created successfully')
			props.history.push({
				pathname: '/login'

			});


		}, (error) => {
			alert('hi')
			setSnackBarOpen(true)
			setSnackBarMessage('Loggin Failed')
			setOK('error')



		});
}
	let pic = require('../../../../../images/logo-head.png')
	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-0')}>
			<div className="flex flex-col items-center justify-center w-450">
				<FuseAnimate animation="transition.expandIn">
					{step === 1 ? <Card className=" w-9/12 p-16">
						<CardContent className="flex flex-col items-center justify-center ">
							{/* <img className="w-60 m-10" src={pic} alt="logo" /> */}
							{isLoading ? <CircularProgress color="secondary" /> :

								<Avatar alt="Remy Sharp" src={profileImage} className={classes.large} />
							}
							<span>
								<input id="contained-button-file" type="file" name="url" style={{ cursor: 'pointer', display: "none", marginBottom: '0px' }} onChange={onChangeHandler} accept="image/*" />
								<label htmlFor="contained-button-file">
									<Icon color="action"
										style={{ position: 'absolute', left: '53%', top: 65 }}
										fontSize="small"
									>
										linked_camera</Icon>
								</label>
							</span>
							<Typography variant="h6" className="mt-10 mb-16">
								Onboarding
								</Typography>
							<form
								name="registerForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleTabChange}
							>
								<Grid container spacing={3} style={{ marginBottom: '10px' }} >
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="firstname" type="firstname" value={form.firstname} required id="outlined-basic-email" label="First Name" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="lastname" type="lastname" value={form.lastname} required id="outlined-basic-email" label="Last Name" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="number" type="number" value={form.number} required id="outlined-basic-email" label="Phone Number" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="phone" type="number" value={form.phone} required id="outlined-basic-email" label="W-Number" variant="outlined" fullWidth autoComplete="off" />
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
													<em>Select Country</em>
												</MenuItem>
												{
													countriesData.map(val => {
														return (
															<MenuItem value={val}>{val.name}</MenuItem>
														)
													})
												}
											</Select>
										</FormControl>
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<FormControl variant="outlined" size='small' fullWidth style={{ marginTop: '0px' }}>
											<InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
											<Select
												required
												labelId="demo-simple-select-outlined-label"
												id="demo-simple-select-outlined"
												value={state}
												onChange={handleStatesChange}
												fullWidth
											>
												<MenuItem value="">
													<em>Select State</em>
												</MenuItem>
												{
													statesData.map(val => {
														return (
															<MenuItem value={val}>{val.name}</MenuItem>
														)
													})
												}
											</Select>
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
													<em>Select City</em>
												</MenuItem>
												{
													citiesData.map(val => {
														return (
															<MenuItem value={val}>{val.name}</MenuItem>
														)
													})
												}
											</Select>
										</FormControl>
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<TextField onChange={handleChange} size='small' name="website" type="website" value={form.website} required id="outlined-basic-email" label="Web-Site" variant="outlined" fullWidth autoComplete="off" />
									</Grid>
								</Grid>
								<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16"
									aria-label="Register"
									disabled={(form.firstname !== '' && form.lastname  !== ''  && form.phone  !== '' && form.number  !== '' && form.email  !== '' && form.address  !== ''&& country  !== ''&& state !== ''&& city  !== '' ) ? false : true}
									type="submit"
								>
									Register
									</Button>
							</form>

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
										disabled={(form.passwordConfirm === form.password && form.password !== '' && form.username !== '') ? false : true}
										type="submit"
										size='small'

									>
										CREATE AN ACCOUNT
								</Button>
									<Button
										variant="contained"
										color="primary"
										className="w-220 mx-auto mt-16 mb-20"
										aria-label="Register"
										// disabled={(form.passwordConfirm === form.password && form.password !== '' && form.username !== '') ? false : true}
										type="submit"
										size='small'
										onClick={() => { setStep(1) }}

									>
										Go Back
										</Button>
								</form>

							</CardContent>
						</Card>
					}

				</FuseAnimate>
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
			</div>
		</div>



	);
}

export default ComapnyProfile;
