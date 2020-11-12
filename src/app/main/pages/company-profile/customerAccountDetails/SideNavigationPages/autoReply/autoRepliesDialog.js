import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler';
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DraftsIcon from '@material-ui/icons/Drafts';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles(theme => ({
	addButton: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330
	},
	margin: {
		color: 'white',
		paddingLeft: '14px',
		fontWeight: 'bold',
		paddingRight: '14px',
		paddingTop: '5px',
		paddingBottom: '5px',
		fontSize: '12px'
	}
}));
const theme = createMuiTheme({
	palette: {
		primary: green
	}
});
const AutoRepliesDialog = props => {
	const classes = useStyles(props);
	const { isOpen, type, getUpdatedData, data, clientId } = props;
	const [openDialog, setopenDialog] = React.useState(isOpen);
	const [canned_type, setCannedType] = React.useState(data.message_type);
	const [username, setUsername] = React.useState(data.username);
	const [password, setPassword] = React.useState('');
	const [firstname, setFirstname] = React.useState(data.firstname);
	const [lastname, setLastname] = React.useState(data.lastname);
	const [email, setEmail] = React.useState(data.email);
	const [mobile, setMobile] = React.useState(data.number);
	const [position, setPosition] = React.useState(data.position);
	const [maxTokenCount, setMaxTokenCount] = React.useState(data.max_token_count);
	const [status, setStatus] = React.useState(data.enabled);
	const [enabled, setEnabled] = React.useState(data.enabled);

	const [dataCopy, setDataCopy] = React.useState({
		password: '',
		firstname: data.firstname,
		lastname: data.lastname,
		email: data.email,
		number: data.number,
		enabled: data.enabled,
		role: data.max_token_count === -1 ? '61' : '64',
		position: data.position,
		max_token_count: data.max_token_count,
		default_receiver: data.max_token_count === -1 ? true : false
	});

	function filterData(params) {
		let updated = {};

		if (dataCopy && Object.keys(dataCopy) && Object.keys(dataCopy).length) {
			Object.keys(dataCopy).forEach(key => {
				if (dataCopy[key] != params[key]) {
					updated[key] = params[key];
				}
			});
		}

		return updated;
	}

	const handleDialogClose = () => {
		props.closeDialog();
		setopenDialog(false);
	};

	const handleEnable = event => {
		setEnabled(event.target.checked);
	};

	const onInputChange = e => {
		switch (e.target.name) {
			case 'username':
				setUsername(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
				break;
			case 'firstname':
				setFirstname(e.target.value);
				break;
			case 'lastname':
				setLastname(e.target.value);
				break;
			case 'email':
				setEmail(e.target.value);
				break;
			case 'mobile':
				setMobile(e.target.value);
				break;
			case 'position':
				setPosition(e.target.value);
				break;
		}
	};
	const handleTypeChange = event => {
		console.log('event.target.value : ', event.target.value);
		setMaxTokenCount(event.target.value);
	};
	const toggleChecked = e => {
		console.log('ToggleChecked e', e.target.checked);
		setStatus(e.target.checked);
	};
	const handleSubmit = () => {
		let params = {
			username: username,
			password: password,
			firstname: firstname,
			lastname: lastname,
			email: email,
			number: mobile,
			enabled: status,
			role: maxTokenCount === -1 ? '61' : '64',
			position: position,
			max_token_count: maxTokenCount,
			default_receiver: maxTokenCount === -1 ? true : false
		};
		if (type !== 'update') {
			params.clientId = clientId;

			CoreHttpHandler.request(
				'CompanyAgent',
				'create',
				params,
				response => {
					console.log('CompanyAgent response : ', response);

					props.closeDialog('create');
					setopenDialog(false);
				},
				error => {
					if (error && error.response && error.response.data && error.response.data.message) {
						props.showError(error.response.data.message);
					} else {
						props.closeDialog('error');
						setopenDialog(false);
					}
				}
			);
		} else {
			let filtered = filterData(params);
			if (filtered && Object.keys(filtered) && Object.keys(filtered).length) {
				filtered.clientId = clientId;
				filtered.username = undefined;

				let update_params = {
					key: ':id',
					value: data.id,
					params: filtered
				};
				CoreHttpHandler.request(
					'CompanyAgent',
					'update_partial',
					update_params,
					response => {
						console.log('CompanyAgent response : ', response);
						if (maxTokenCount === -1) {
							let data = {
								enabled: !enabled,
								id: clientId
							};
							CoreHttpHandler.request(
								'Business',
								'changeStatus',
								data,
								dataSourceSuccessChangeStatus,
								dataSourceFailureChangeStatus
							);
						}
						props.closeDialog('update');
						setopenDialog(false);
					},
					error => {
						if (error && error.response && error.response.data && error.response.data.message) {
							props.showError(error.response.data.message);
						} else {
							props.closeDialog('error');
							setopenDialog(false);
						}
					}
				);
			} else {
				props.closeDialog('No Change');
			}
		}
	};
	const dataSourceSuccessChangeStatus = response => {
	};
	const dataSourceFailureChangeStatus = response => {
	};

	return (
		<Dialog
			open={openDialog}
			onClose={handleDialogClose}
			aria-labelledby="form-dialog-title"
			classes={{
				paper: 'm-24'
			}}
			style={{ marginTop: '2%' }}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<div
					className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
					style={{ paddingBottom: 20, paddingTop: 20 }}
				>
					{type === 'update' ? 'Update' : 'Create'} User
				</div>
			</AppBar>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<PersonIcon color="action" style={{ color: '#8b8b8b' }} />
					</div>
					<TextField
						className="mb-24"
						label="User Name"
						id="name"
						name="username"
						value={username}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
						disabled={type == 'update'}
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<VisibilityOffIcon color="action" style={{ color: '#8b8b8b' }} />
					</div>

					<TextField
						className="mb-24"
						label="Password"
						id="name"
						name="password"
						value={password}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
					/>
				</div>

				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<DraftsIcon color="action" style={{ color: '#8b8b8b' }} />
					</div>
					<TextField
						className="mb-24"
						label="Email"
						id="name"
						name="email"
						value={email}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<PhoneAndroidIcon color="action" style={{ color: '#8b8b8b' }} />
					</div>

					<TextField
						className="mb-24"
						label="Mobile"
						id="mobile"
						name="mobile"
						value={mobile}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<WorkIcon color="action" style={{ color: '#8b8b8b' }} />
					</div>

					<TextField
						className="mb-24"
						label="Position"
						id="position"
						name="position"
						value={position}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<Icon color="action" style={{ color: '#8b8b8b' }}>
							accessibility
						</Icon>
					</div>
					<Select
						required
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={maxTokenCount}
						onChange={handleTypeChange}
						fullWidth
					>
						<MenuItem value="">
							<em>Select Type</em>
						</MenuItem>
						<MenuItem value={-1}>Admin</MenuItem>
						<MenuItem value={1}>Agent</MenuItem>
					</Select>
				</div>
				<div className="flex" style={{ marginTop: 20 }}>
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<h3 style={{ color: 'red', fontWeight: 'bold', marginTop: '-8px' }}>Enable</h3>
					</div>
					<FormControlLabel
						style={{ marginLeft: '2px' }}
						control={
							<Switch
								checked={status}
								onChange={toggleChecked}
								name="status"
								color="primary"
								size="small"
							/>
						}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<div className="px-16 my-10">
					<Button variant="contained" onClick={handleDialogClose} color="primary" size="small">
						Cancel
					</Button>
				</div>
				<ThemeProvider theme={theme}>
					{type !== 'update' ? (
						<div className="mx-32 md:mx-24 my-10">
							<Button
								className={classes.margin}
								size="small"
								variant="contained"
								onClick={handleSubmit}
								color="primary"
								disabled={
									username !== '' &&
									username !== undefined &&
									password !== '' &&
									password !== undefined &&
									email !== '' &&
									email !== undefined &&
									mobile !== '' &&
									mobile !== undefined &&
									position !== '' &&
									position !== undefined
										? false
										: true
								}
							>
								create
							</Button>
						</div>
					) : (
						<div className="mx-32 md:mx-24 my-10">
							<Button
								className={classes.margin}
								size="small"
								variant="contained"
								onClick={handleSubmit}
								color="primary"
							>
								Update
							</Button>
						</div>
					)}
				</ThemeProvider>
			</DialogActions>
		</Dialog>
	);
};
export default AutoRepliesDialog;
