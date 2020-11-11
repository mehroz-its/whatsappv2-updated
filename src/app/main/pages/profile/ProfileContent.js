import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import picture from './profileImage.png';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { EventEmitter } from '../../../../events';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2)
	},
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12)
	}
}));
const Profile = function (props) {
	const classes = useStyles();
	const { updateImage } = props;
	const [profileUsername, setProfileUsername] = React.useState('Your Profile');
	const [profileId, setProfileId] = React.useState('');
	const [profileData, setProfileData] = React.useState([]);
	const [profileImage, setProfileImage] = React.useState(picture);
	const [dob, setDOB] = React.useState(null);
	const [snackbaropen, setSnackBarOpen] = React.useState(false);
	const [snackbarmessage, setSnackBarMessage] = React.useState('');
	const [ok, setOK] = React.useState('');
	const [countriesData, setCountriesData] = React.useState([]);
	const [citiesData, setCitiesData] = React.useState([]);
	const [statesData, setStatesData] = React.useState([]);

	const [countryy, setcountryy] = React.useState('');
	const [statee, setstatee] = React.useState('');
	const [cityy, setcityy] = React.useState('');

	const [country, setCountry] = React.useState('');
	const [step, setStep] = React.useState(1);
	const [city, setCity] = React.useState('');

	const handleDate = e => {
		setDOB(e.target.value);
		const id = e.target.id.split('-');
		const name = e.target.name;
		const attrs = profileData.map((attr, i) => {
			if (attr.dob) {
				attr[name] = e.target.value;
				return attr;
			} else return attr;
		});

		setProfileData(attrs);
	};
	const onInputChange = (e, idd) => {
		let attrs = [];
		if (e.target.name === 'country') {
			console.log('e', e);
			const id = idd.split('-');
			const name = e.target.name;
			handleCountryChange(e);
			console.log('id : ', id);
			console.log('name : ', name);
			attrs = profileData.map(attr => {
				if (attr[id[0]] === id[1]) {
					attr[name] = e.target.value;
					return attr;
				} else return attr;
			});
		} else if (e.target.name === 'state') {
			console.log('e', e);
			const id = idd.split('-');
			const name = e.target.name;
			handleStatesChange(e);
			console.log('id : ', id);
			console.log('name : ', name);
			attrs = profileData.map(attr => {
				if (attr[id[0]] === id[1]) {
					attr[name] = e.target.value;
					return attr;
				} else return attr;
			});
		} else if (e.target.name === 'city') {
			console.log('e', e);
			const id = idd.split('-');
			const name = e.target.name;
			handleCityChange(e);
			console.log('id : ', id);
			console.log('name : ', name);
			attrs = profileData.map(attr => {
				if (attr[id[0]] === id[1]) {
					attr[name] = e.target.value;
					return attr;
				} else return attr;
			});
		} else {
			console.log('e', e);
			const id = e.target.id.split('-');
			const name = e.target.name;
			console.log('id : ', id);
			console.log('name : ', name);
			attrs = profileData.map(attr => {
				if (attr[id[0]] === id[1]) {
					attr[name] = e.target.value;

					return attr;
				} else return attr;
			});
		}

		let firstname = '';
		let lastname = '';
		console.log('attrs : ', attrs);
		attrs.find(function (element) {
			if (element.firstname) {
				if (element.firstname === 'N/A') {
					firstname = '';
				} else {
					firstname = element.firstname;
				}
			}
			if (element.lastname) {
				if (element.lastname === 'N/A') {
					lastname = '';
				} else {
					lastname = element.lastname;
				}
			}
		});
		setProfileData(attrs);
	};
	const _update = () => {
		let newData = profileData;
		profileData.map((item, index) => {
			if (item.image) {
				return (newData[index] = { id: item.id, image: props.urlImageHeader });
			}
		});
		let data = {
			key: ':id',
			value: profileId,
			attributes: newData
		};
		// setTimeout(() => {
		//     setSnackBarMessage('')
		//     setSnackBarOpen(false)
		// }, 4000);
		CoreHttpHandler.request(
			'profile',
			'update',
			data,
			response => {
				console.log('response   : ', response);
				const { user_data, user } = response.data.data;
				if (user) {
					localStorage.setItem('user_data', JSON.stringify(user));
					props.onChange(user);
				} else if (user_data) {
					localStorage.setItem('user_data', JSON.stringify(user_data));
					props.onChange(user_data);
				} else {
					localStorage.setItem('user_data', JSON.stringify({}));
				}
				setSnackBarMessage('Updated Successfully');
				setOK('success');
				setSnackBarOpen(true);
				EventEmitter.dispatch('ProfileUpdate', true);
			},
			error => {
				setSnackBarMessage('Error! Please Try Again Later');
				setOK('error');
				setSnackBarOpen(true);
			}
		);
	};
	const loadProfile = () => {
		return CoreHttpHandler.request('profile', 'get_profile', {}, null, null, true);
	};
	React.useEffect(() => {
		loadProfile().then(response => {
			const profileData = response.data.data.attribute;
			const user = JSON.parse(localStorage.getItem('user_data'));
			console.log('users', user);
			console.log('profileData', profileData);
			let nameCapitalized = '';
			let lastname = '';
			if (user.firstName) {
				nameCapitalized = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
			}
			if (user.lastName) {
				lastname = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
			}
			setProfileUsername(`${nameCapitalized}'s Profile`);
			setProfileId(user.id);
			setProfileData(profileData);
			console.log('profileData L ', profileData);
			setcountryy(profileData[8].country);
			setstatee(profileData[10] && profileData[10].state ? profileData[10].state : []);
			setcityy(profileData[9].city);
			props.onChange(user);
			let image = null;
			profileData.map((val, id) => {
				if (val.image) {
					return (image = val.image);
				}
			});
			setProfileImage(image);
			updateImage(image);
			if (profileData[8].country !== 'N/A' && profileData[8].country !== '') {
				fetch(`https://glist.its.com.pk/v1/fetch/states/${profileData[8].country}`)
					.then(response => response.json())
					.then(data => {
						console.log('data : ', data);
						if (data.data) {
							setStatesData(data.data.states);
						}
					});
			}
			if (profileData[10] && profileData[10].state !== 'N/A' && profileData[10].state !== '') {
				fetch(`https://glist.its.com.pk/v1/fetch/cities/${profileData[10].state}`)
					.then(response => response.json())
					.then(data => {
						console.log('city data', data);
						if (data.data) {
							setCitiesData(data.data.cities);
						}
					});
			}
		});
		fetch(`https://glist.its.com.pk/v1/fetch/countries`)
			.then(response => response.json())
			.then(data => {
				console.log('data', data);
				setCountriesData(data.data.countries);
			});
	}, []);
	const handleCountryChange = event => {
		setCountry(event.target.value);
		console.log(event.target.value, 'country');
		let country = event.target.value;
		setcountryy(event.target.value);
		setStatesData([]);
		setCitiesData([]);
		// let dataProfile = profileData['country'] = country
		// console.log("dataProfile :", dataProfile);
		fetch(`https://glist.its.com.pk/v1/fetch/states/${country}`)
			.then(response => response.json())
			.then(data => setStatesData(data.data.states));
	};
	const handleStatesChange = event => {
		setStep(event.target.value);
		console.log(event.target.value, 'state');
		setstatee(event.target.value);
		setCitiesData([]);
		let state = event.target.value;
		// let dataProfile = profileData['state'] = state

		fetch(`https://glist.its.com.pk/v1/fetch/cities/${state}`)
			.then(response => response.json())
			.then(data => setCitiesData(data.data.cities));
	};
	const handleCityChange = event => {
		let city = event.target.value;
		// let dataProfile = profileData['city'] = city
		setCity(event.target.value);
		setcityy(event.target.value);
	};
	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbaropen}
				autoHideDuration={6000}
			>
				<Alert variant="filled" severity={ok}>
					{snackbarmessage}
				</Alert>
			</Snackbar>
			<div className={classes.root}>
				<Grid container spacing={2} style={{ marginTop: 10, paddingRight: 30, paddingLeft: 20 }}>
					{profileData.map((attribute, i) => {
						console.log(attribute);
						const _field = (obj, props) => {
							const [attribute_id, attribute_value] = props;
							return { id: obj[attribute_id], value: obj[attribute_value], keys: props };
						};
						const { id, value, keys } = _field(attribute, Object.keys(attribute));
						if (value === 'N/A') {
							console.log(`${keys[1].toUpperCase()}`, 'here i am');
							if (`${keys[1].toUpperCase()}` === 'COUNTRY') {
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<FormControl
												variant="outlined"
												size="small"
												fullWidth
												style={{ marginTop: '0px' }}
											>
												<InputLabel id="outlined-age-native-simple">Country</InputLabel>
												<Select
													required
													labelId="demo-simple-select-outlined-label"
													id={`id-${id}`}
													name={keys[1]}
													key={`user_attribute_data_${i}`}
													value={parseInt(countryy)}
													onChange={e => onInputChange(e, `id-${id}`)}
													fullWidth
												>
													<MenuItem value="">
														<em>Select Country</em>
													</MenuItem>
													{countriesData.map(val => {
														return <MenuItem value={val.id}>{val.name}</MenuItem>;
													})}
												</Select>
											</FormControl>
										</div>
									</Grid>
								);
							} else if (`${keys[1].toUpperCase()}` === 'STATE') {
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<FormControl
												variant="outlined"
												size="small"
												fullWidth
												style={{ marginTop: '0px' }}
											>
												<InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
												<Select
													required
													labelId="demo-simple-select-outlined-label"
													id={`id-${id}`}
													name={keys[1]}
													key={`user_attribute_data_${i}`}
													value={parseInt(statee)}
													onChange={e => onInputChange(e, `id-${id}`)}
													fullWidth
												>
													<MenuItem value="">
														<em>Select State</em>
													</MenuItem>
													{statesData.map(val => {
														return <MenuItem value={val.id}>{val.name}</MenuItem>;
													})}
												</Select>
											</FormControl>
										</div>
									</Grid>
								);
							} else if (`${keys[1].toUpperCase()}` === 'CITY') {
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<FormControl
												variant="outlined"
												size="small"
												fullWidth
												style={{ marginTop: '0px' }}
											>
												<InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
												<Select
													required
													labelId="demo-simple-select-outlined-label"
													value={parseInt(cityy)}
													id={`id-${id}`}
													name={keys[1]}
													key={`user_attribute_data_${i}`}
													onChange={e => onInputChange(e, `id-${id}`)}
													fullWidth
												>
													<MenuItem value="">
														<em>Select City</em>
													</MenuItem>
													{citiesData.map(val => {
														return <MenuItem value={val.id}>{val.name}</MenuItem>;
													})}
												</Select>
											</FormControl>
										</div>
									</Grid>
								);
							} else {
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<TextField
												type={`${keys[1].toUpperCase()}` === 'DOB' ? 'date' : null}
												id={`id-${id}`}
												name={keys[1]}
												key={`user_attribute_data_${i}`}
												value={`${keys[1].toUpperCase()}` === 'DOB' ? dob : ''}
												autoFocus
												label={
													`${keys[1].toUpperCase()}` === 'ADDRESS'
														? 'ADDRESS'
														: `${keys[1].toUpperCase()}` === 'FIRSTNAME'
														? 'FIRSTNAME'
														: `${keys[1].toUpperCase()}` === 'LASTNAME'
														? 'LASTNAME'
														: `${keys[1].toUpperCase()}` === 'AGE'
														? 'AGE'
														: `${keys[1].toUpperCase()}` === 'GENDER'
														? 'GENDER'
														: `${keys[1].toUpperCase()}` === 'CNIC'
														? 'CNIC'
														: `${keys[1].toUpperCase()}` === 'DOB'
														? null
														: `${keys[1].toUpperCase()}` === 'COUNTRY'
														? 'COUNTRYY'
														: `${keys[1].toUpperCase()}` === 'CITY'
														? 'CITY'
														: `${keys[1].toUpperCase()}` === 'IMAGE'
														? 'IMAGE'
														: null
												}
												variant="outlined"
												fullWidth
												autoComplete="off"
												onChange={onInputChange}
												size="small"
												className="mb-16"
											/>
										</div>
									</Grid>
								);
							}
						} else {
							console.log(`${keys[1].toUpperCase()}`, 'here i am');
							if (attribute.image) {
								console.log(`${keys[1].toUpperCase()}`, 'here i if');
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<TextField
												disabled
												size="small"
												id={`id-${id}`}
												key={`user_attribute_data_${i}`}
												value={value}
												name={keys[1]}
												autoFocus
												label={`${keys[1].toUpperCase()}`}
												variant="outlined"
												fullWidth
												autoComplete="off"
												onChange={onInputChange}
											/>
										</div>
									</Grid>
								);
							} else if (attribute.dob) {
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<TextField
												id="date"
												fullWidth
												value={moment(attribute.dob).format('YYYY-MM-DD')}
												size="small"
												name={'dob'}
												label="D.O.B"
												type="date"
												onChange={handleDate}
												defaultValue={dob}
												InputLabelProps={{ shrink: true }}
											/>
										</div>
									</Grid>
								);
							} else if (attribute.cnic) {
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<TextField
												required
												id={`id-${id}`}
												key={`user_attribute_data_${i}`}
												value={value}
												name={keys[1]}
												autoFocus
												label={`${keys[1].toUpperCase()}`}
												size="small"
												onInput={e => {
													e.target.value = Math.max(0, parseInt(e.target.value))
														.toString()
														.slice(0, 13);
												}}
												type={
													keys[1] !== 'cnic' ? 'text' : keys[1] === 'cnic' ? 'number' : null
												}
												variant="outlined"
												fullWidth
												autoComplete="off"
												onChange={onInputChange}
											/>
										</div>
									</Grid>
								);
							} else if (`${keys[1].toUpperCase()}` === 'COUNTRY') {
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<FormControl
												variant="outlined"
												size="small"
												fullWidth
												style={{ marginTop: '0px' }}
											>
												<InputLabel id="outlined-age-native-simple">Country</InputLabel>
												<Select
													required
													labelId="demo-simple-select-outlined-label"
													id={`id-${id}`}
													name={keys[1]}
													key={`user_attribute_data_${i}`}
													value={parseInt(countryy)}
													onChange={e => onInputChange(e, `id-${id}`)}
													fullWidth
												>
													<MenuItem value="">
														<em>Select Country</em>
													</MenuItem>
													{countriesData.map(val => {
														return <MenuItem value={val.id}>{val.name}</MenuItem>;
													})}
												</Select>
											</FormControl>
										</div>
									</Grid>
								);
							} else if (`${keys[1].toUpperCase()}` === 'STATE') {
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<FormControl
												variant="outlined"
												size="small"
												fullWidth
												style={{ marginTop: '0px' }}
											>
												<InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
												<Select
													required
													labelId="demo-simple-select-outlined-label"
													id={`id-${id}`}
													name={keys[1]}
													key={`user_attribute_data_${i}`}
													value={parseInt(statee)}
													onChange={e => onInputChange(e, `id-${id}`)}
													fullWidth
												>
													<MenuItem value="">
														<em>Select State</em>
													</MenuItem>
													{statesData.map(val => {
														return <MenuItem value={val.id}>{val.name}</MenuItem>;
													})}
												</Select>
											</FormControl>
										</div>
									</Grid>
								);
							} else if (`${keys[1].toUpperCase()}` === 'CITY') {
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
											<FormControl
												variant="outlined"
												size="small"
												fullWidth
												style={{ marginTop: '0px' }}
											>
												<InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
												<Select
													required
													labelId="demo-simple-select-outlined-label"
													value={parseInt(cityy)}
													id={`id-${id}`}
													name={keys[1]}
													key={`user_attribute_data_${i}`}
													onChange={e => onInputChange(e, `id-${id}`)}
													fullWidth
												>
													<MenuItem value="">
														<em>Select City</em>
													</MenuItem>
													{citiesData.map(val => {
														return <MenuItem value={val.id}>{val.name}</MenuItem>;
													})}
												</Select>
											</FormControl>
										</div>
									</Grid>
								);
							} else {
								console.log(keys[1], 'here i else');
								return (
									<Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
										{keys[1] !== 'age' && 'dob' ? (
											<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
												<TextField
													required
													id={`id-${id}`}
													size="small"
													key={`user_attribute_data_${i}`}
													value={value}
													name={keys[1]}
													autoFocus
													label={`${keys[1].toUpperCase()}`}
													type={
														keys[1] !== 'cnic'
															? 'text'
															: keys[1] === 'cnic'
															? 'number'
															: null
													}
													variant="outlined"
													fullWidth
													autoComplete="off"
													onChange={onInputChange}
												/>
											</div>
										) : (
											<div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }}>
												<TextField
													required
													id={`id-${id}`}
													key={`user_attribute_data_${i}`}
													size="small"
													value={value}
													name={keys[1]}
													autoFocus
													label={`${keys[1].toUpperCase()}`}
													type={'number'}
													onInput={e => {
														e.target.value = Math.max(0, parseInt(e.target.value))
															.toString()
															.slice(0, 3);
													}}
													variant="outlined"
													fullWidth
													autoComplete="off"
													onChange={onInputChange}
												/>
											</div>
										)}
									</Grid>
								);
							}
						}
					})}
				</Grid>
				<Grid container spacing={2} style={{ marginTop: 10, paddingRight: 15, paddingLeft: 15 }}>
					<Grid item md={3} xs={12}></Grid>
					<Grid item md={6} xs={12}>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={_update}
							style={{ marginTop: 8 }}
						>
							Save
						</Button>
					</Grid>
					<Grid item md={3} xs={12}></Grid>
					<div style={{ height: 500 }}></div>
				</Grid>
			</div>
		</>
	);
};
export default Profile;
