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
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
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




const useStyles = makeStyles((theme) => ({
margin: {
  
  color:'white',
  paddingLeft:'14px',
  fontWeight:'bold',
  paddingRight:'14px',
  paddingTop:'5px',
  paddingBottom:'5px',
  fontSize:'12px',
 
},
}));

const theme = createMuiTheme({
palette: {
  primary: green,
},
});

function ContactDialog(props) {
	const classes = useStyles();
	const { data, isOpen, type } = props
	const dispatch = useDispatch();
	const contactDialog = { data: data, props: { open: isOpen }, type: type }
	const [value, setValue] = React.useState(data.gender);
	const [selectedcountry, setSelectedCountry] = React.useState('Country');
	const [country, setCountry] = React.useState(data.country);
    const [valid,SetValid]=React.useState('')
	const [city, setCity] = React.useState('Country');
	const [countries, setCountries] = React.useState([]);
	const [cities, setCities] = React.useState([]);
    const [initialSelect,setinitialSelect]= ("Select Gender")
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
		console.log(value,'this is valueeeeeee');
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

	if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	.test(form.email))
	{
	var abc=false
	}
	else {
var abc=true
	}
	const handleMethodChange = (e) => {
	
		}
	

console.log(value,'vlsssssssssssssssssss');
 
	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			onClose={()=>{props.closeDialog()}} 
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
			
				<div className="flex flex-col items-center justify-center pb-10 pt-16">
				
					<Avatar className="w-56 h-56" alt="contact avatar" src={form.avatar} />
					{contactDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-0">
					  {form.name =="N/AN/A" ?
					  form.name='':form.name }
						</Typography>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }} style={{marginTop:'2%'}}>

					<div className="flex">
						<div className="min-w-48 pt-10">
							<Icon color="action">phone</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Phone"
							size="small"
							required
							id="phone"
							name="phone"
							value={form.number}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							disabled
							type="number"
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-10" >
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
							required
							size="small"
						/>
					</div>

					<div className="flex">
						{/* <div className="min-w-48 pt-20" /> */}
						<div className="min-w-48 pt-10" >
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
							size="small"
							required
						/>
					</div>





					<div className="flex">
						<div className="min-w-48 pt-10" >
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
							required
							size="small"
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-10" >
							<Icon color="action">child_care</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Age"
							id="age"
							name="age"
							value={form.age}
							required
							onChange={handleChange}
							variant="outlined"
							fullWidth
							type="number"
							size="small"
						/>
					</div>



					
<div className="flex mb-20">
						{/* <div className="min-w-48 pt-20">
						
						</div> */}
						{/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

					
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue='Select Gender'
				  onChange={handleRadio}
				  fullWidth
				  value={value}
                >
                  <MenuItem value={value}>Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
              
                </Select>
					</div>

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
							<div className="px-16 my-10">
							<ThemeProvider theme={theme}>
								<Button
									variant="contained"
									color="primary"
									className={classes.margin}
									type="submit"
									onClick={handleSubmit}
									disabled={!form.firstname||!form.lastname||!form.email||!form.age||form.email=="N/A"
								||value=="N/A"||value=="select" ||abc != true}
									size="small"
								>
									Save
							</Button>
							</ThemeProvider>
							</div>
							{/* <IconButton onClick={handleRemove}>
								<Icon>delete</Icon>
							</IconButton> */}
							<div className="mx-16 my-10">
								<Button
									variant="contained"
									color="primary"
									type="submit"
									onClick={()=>{props.closeDialog()}}
									size="small"
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
