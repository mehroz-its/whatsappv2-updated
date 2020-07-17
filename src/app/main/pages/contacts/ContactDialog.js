import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import CitiesDropDown from './CitiesDropDown'
const defaultFormState = {
	id: '',
	name: '',
	lastname: '',
	avatar: 'assets/images/avatars/profile.jpg',
	nickname: '',
	company: '',
	jobTitle: '',
	email: '',
	phone: '',
	address: '',
	birthday: '',
	notes: ''
};

function ContactDialog(props) {
	const { data, isOpen, type } = props
	const dispatch = useDispatch();
	const contactDialog = { data: data, props: { open: isOpen }, type: type }
	const [value, setValue] = React.useState(data.gender);
	const [selectedcountry, setSelectedCountry] = React.useState('Country');
	const [country, setCountry] = React.useState(data.country);

	const [city, setCity] = React.useState('Country');
	const [countries, setCountries] = React.useState([]);
	const [cities, setCities] = React.useState([]);

	const [countryopen, setSelectCountryOpen] = React.useState(false);
	const [cityopen, setSelectCityOpen] = React.useState(false);
	const [selectedCity, setSelectedCity] = React.useState('')


	const { form, handleChange, setForm } = useForm(defaultFormState);
	console.log(form, 'form')

	const getData = ((loadData) => {
		console.log('called get data')
		loadData = () => {
			return CoreHttpHandler.request('locations', 'get_countries', {

				columns: "id, name",
				sortby: "ASC",
				orderby: "id",
				where: "enabled = $1",
				values: true,
				page: 0,
				limit: 0
			}, null, null, true);
		};
		loadData().then((response) => {
			const data = response.data.data.list.data
			setCountries(data)


		});
	})
	const getSelectedCity = (val) => {
		setSelectedCity(val)
	}
	const byName = true
	const defaultValueCountry = country === 'N/A' ? 'Select Country' : country
	// const selected = selectedCountry === 'N/A' ? defaultValue : selectedCountry;

	// const defaultValueCity = (byName) ? 'Select City' : 0;





	React.useEffect(() => {
		getData()
	}, []);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (contactDialog.type === 'edit' && contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...contactDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return contactDialog.type === 'edit'
			? dispatch(Actions.closeEditContactDialog())
			: dispatch(Actions.closeNewContactDialog());
	}

	function canBeSubmitted() {
		return form.name.length > 0;
	}
	const handleRadio = (event) => {
		setValue(event.target.value);
	};
	const handleCountryChange = (event) => {
		setCountry(event.target.value);
		console.log(country, 'i am country')
	}
	const handleCityChange = (event) => {
		setCity(event.target.value);
		console.log(city)

	}

	const handleCountryClose = () => {
		setSelectCountryOpen(false);
	};

	const handleCountryOpen = () => {
		setSelectCountryOpen(true);
	};
	const handleCityClose = () => {
		setSelectCityOpen(false);
	};

	const handleCityOpen = () => {
		setSelectCityOpen(true);
	};

	function handleSubmit(event) {
		event.preventDefault();
		console.log(data)
		
		let params = {
			id: data.id,
			number: data.number,
			assign_name: `${form.firstname}${form.lastname}`,
			attributes: [
				{ attribute_id: data.attribute_idfirstname, firstname: form.firstname },
				{ attribute_id: data.attribute_idlastname, lastname: form.lastname },
				{ attribute_id: data.attribute_idgender, gender: value },
				{ attribute_id: data.attribute_idage, age: form.age },
				{ attribute_id: data.attribute_idemail, email: form.email },
				{ attribute_id: data.attribute_idcountry, country: country },
				{ attribute_id: data.attribute_idcity, city: selectedCity }
			]
		}
		console.log(params,'params')
		CoreHttpHandler.request('contact_book', 'update', {
			key: ':id',
			value: data.id,
			params: params
		}, (response) => {
			console.log(response)
			props.closeDialog("update")

		}, (error) => {
			console.log(error)
			props.closeDialog("error")
		});

		console.log(params, 'i am on submit')
		// if (contactDialog.type === 'new') {
		// 	dispatch(Actions.addContact(form));
		// } else {
		// 	dispatch(Actions.updateContact(form));
		// }
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeContact(form.id));
		closeComposeDialog();
	}

	// if (country !== null) { 
	// 		CoreHttpHandler.request('locations', 'get_cities', {
	// 			columns: "id, name",
	// 			sortby: "ASC",
	// 			orderby: "id",
	// 			where: (byName) ? "country_id = (SELECT id FROM countries WHERE name = $1)" : "country_id = $1",
	// 			values: country.trim(),
	// 			page: 0,
	// 			limit: 0,
	// 		}, (response) => {
	// 			const _cities = response.data.data.list.data;
	// 			console.log(_cities)
	// 			setCities(_cities);
	// 			// setDisplay(true);
	// 		}, (error) => {
	// 			// setCurrentCities([]);
	// 			// setDisplay(false);
	// 		});
	//  }
	console.log(country,'country',defaultValueCountry,'default');

	if(form.lastname=="N/A")
	{
		form.lastname=''
	}
	if(form.firstname=="N/A")
	{
		form.firstname=''
	}
	if(form.email=="N/A")
	{
		form.email=''
	}
	if(form.age=="N/A")
	{
		form.age=''
	}

	

	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new' ? 'New Contact' : 'Edit Contact'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-10">
					<Avatar className="w-56 h-56" alt="contact avatar" src={form.avatar} />
					{contactDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-0">
							{form.name}
						</Typography>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					{/* <div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Name"
							autoFocus
							id="name"
							name="name"
							value={form.name}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div> */}
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">phone</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Phone"
							id="phone"
							name="phone"
							value={form.number}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							disabled
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
						<TextField
							className="mb-24"
							label="First Name"
							id="firstname"
							name="firstname"
							value={form.firstname}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						{/* <div className="min-w-48 pt-20" /> */}
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
						<TextField
							className="mb-24"
							label="LastName"
							id="lastname"
							name="lastname"
							value={form.lastname}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>





					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Email"
							id="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">child_care</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Age"
							id="age"
							name="age"
							value={form.age}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<FormLabel component="legend">Gender</FormLabel>

					</div>
					<div className="flex">
						<RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleRadio}>
							<FormControlLabel value="female" control={<Radio />} label="Female" />
							<FormControlLabel value="male" control={<Radio />} label="Male" />
						</RadioGroup>
					</div>



					<div className="flex mb-20">
						{/* <div className="min-w-48 pt-20">
						
						</div> */}
						{/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={countryopen}
							onClose={handleCountryClose}
							onOpen={handleCountryOpen}
							value={defaultValueCountry}
							onChange={handleCountryChange}
							fullWidth

						>
							{/* <MenuItem value="0">
								<em>None</em>
							</MenuItem> */}
							<MenuItem key={`country_list_item_0`} value={defaultValueCountry}>Select Country</MenuItem>
							{countries.length > 1 ? countries.map((country, i) => {
								let item = null;

								if (byName) {
									item = <MenuItem key={`country_list_item_${i}`} value={country.name}>{country.name}</MenuItem>;
								} else item = <MenuItem key={`country_list_item_${i}`} value={country.id}>{country.name}</MenuItem>;

								return item;
							}) : null}
						</Select>
					</div>


					<div className="flex">
						<CitiesDropDown country={country} selectedCity={getSelectedCity} />
						{/* <div className="min-w-48 pt-20">
							<Icon color="action">work</Icon>
						</div> */}
						{/* <Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={cityopen}
							onClose={handleCityClose}
							onOpen={handleCityOpen}
							value={city}
							onChange={handleCityChange}
							fullWidth
						>
							<MenuItem key={`city_list_item_0`} value={defaultValueCity}>Select City</MenuItem>
							{cities.map((city, i) => {
								let item = null;

								if (byName) {
									item = <MenuItem key={`city_list_item_${i}`} value={city.name}>{city.name}</MenuItem>;
								} else item = <MenuItem key={`city_list_item_${i}`} value={city.id}>{city.name}</MenuItem>;

								return item;
							})}
							<MenuItem value={30}>Thirty</MenuItem>
						</Select> */}
					</div>




					{/* <div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">work</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Job title"
							id="jobTitle"
							name="jobTitle"
							value={form.jobTitle}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">cake</Icon>
						</div>
						<TextField
							className="mb-24"
							id="birthday"
							label="Birthday"
							type="date"
							value={form.birthday}
							onChange={handleChange}
							InputLabelProps={{
								shrink: true
							}}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">home</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Address"
							id="address"
							name="address"
							value={form.address}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex"> */}
					{/* <div className="min-w-48 pt-20">
							<Icon color="action">note</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Notes"
							id="notes"
							name="notes"
							value={form.notes}
							onChange={handleChange}
							variant="outlined"
							multiline
							rows={5}
							fullWidth
						/>
					</div> */}
				</DialogContent>

				{contactDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
							>
								Add
							</Button>
						</div>
					</DialogActions>
				) : (
						<DialogActions className="justify-between p-8">
							<div className="px-16">
								<Button
									variant="contained"
									color="primary"
									type="submit"
									onClick={handleSubmit}
									disabled={!form.firstname||!form.lastname||!form.email||!form.age||country=="N/A"||form.email=="N/A"
								||value=="N/A"}
								>
									Save
							</Button>
							</div>
							{/* <IconButton onClick={handleRemove}>
								<Icon>delete</Icon>
							</IconButton> */}
							<div >
								<Button
									variant="contained"
									color="primary"
									type="submit"
									onClick={()=>{props.closeDialog()}}
								>
									Cancel
							</Button>
							</div>
						</DialogActions>
					)}
			</form>
		</Dialog>
	);
}

export default ContactDialog;
