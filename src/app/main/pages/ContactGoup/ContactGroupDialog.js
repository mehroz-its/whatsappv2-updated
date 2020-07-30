import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { green, purple } from '@material-ui/core/colors';
import { makeStyles,ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import ContactGroupInDialog from './ContactGroupInDialog'
import FormControlLabel from '@material-ui/core/FormControlLabel';



const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330,

	},
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





const CampaignDialog = (props) => {
	const classes = useStyles(props);

	const { isOpen, type, getUpdatedData, data } = props
	console.log(data, 'in grp dialog')
	const [openDialog, setopenDialog] = React.useState(isOpen);
	const [title, setTitle] = React.useState(data.title);
	const [enabled, setEnabled] = React.useState(data.enabled);
	const [description, setDescription] = React.useState(data.description);
	const [open, setOpen] = React.useState(false);
	const [number, setNumbers] = React.useState(data.customers)






	const handleDialogClose = () => {
		props.closeDialog()
		setopenDialog(false);
	};

	const handleSubmit = () => {

		// let fileName = uploadedFilePath.split('https://upload.its.com.pk/')
		let params = {
			title: title,
			description: description,
			customers: number,
			enabled: enabled
		};
		console.log(params, 'newSelected in dialog done')
		if (type !== 'Contact Group Details') {
			
			CoreHttpHandler.request('contact_group', 'create', params, (response) => {
				// props.getUpdatedData()
				console.log(response)
				props.closeDialog("create")
				setopenDialog(false);
			}, (error) => {
				props.closeDialog("error")
				setopenDialog(false);

			});
		} else {
			let update_params = {
				key: ':id',
				value: data.id,
				params: params
			}
			console.log(update_params, 'update_params')
			// return
			CoreHttpHandler.request('contact_group', 'update', update_params, (response) => {
				// props.getUpdatedData()
				console.log(response)

				props.closeDialog('update')
				setopenDialog(false);
			}, (error) => {
				props.closeDialog('error')
				setopenDialog(false);

			});
		}
	};
	const handleEnable = (event) => {

		setEnabled(event.target.checked);
		console.log(enabled, 'enable')
	};

	const onInputChange = e => {
		switch (e.target.name) {
			case "title":
				setTitle(e.target.value)
				break;
			case "description":
				setDescription(e.target.value)
				break;
		}
	}
	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const getSelectedNumbers = (num) => {
		setNumbers(num)
	};


	return (
		// <div> {isOpen}</div>
		<Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{
			paper: 'm-50'
		}}

			fullWidth
			maxWidth="xs"
			>
			{/* <DialogTitle id="form-dialog-title">{props.type} </DialogTitle> */}
			<AppBar position="static" elevation={1}>
				
				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
        style={{paddingBottom:30,paddingTop:30}}>
	      {type} 
				</div>
			</AppBar>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex pb-20" >
					<ContactGroupInDialog sendSelectedNumbers={getSelectedNumbers} rowData={data} />

				</div>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{marginTop:'-12px'}}>
						<Icon color="action">account_circle</Icon>
					</div>

					<TextField
						className="mb-24"
						label="Title"
						
						autoFocus
						id="title"
						name="title"
						value={title}
						variant="outlined"
						required
						size="small"
						fullWidth
						onChange={onInputChange}
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{marginTop:'-12px'}}>
						<Icon color="action">account_circle</Icon>
					</div>

					<TextField
						className="mb-24"
						label="Description"
						autoFocus
						size="small"
						id="description"
						name="description"
						value={description}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
					/>
				</div>


				<div className="flex">
					<div className="min-w-48 pt-20" style={{marginTop:'-12px'}}>
						<Icon color="action">account_circle</Icon>
					</div>

					<FormControlLabel
					control={	<Checkbox
						
						checked={enabled}
						onChange={handleEnable}
					/>}
					label="Enabled"
				/>

				</div>

			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} color="primary" size="small" variant="contained">
					Cancel
             </Button>
			 <ThemeProvider theme={theme}>
				<Button 
				color="primary"
				className={classes.margin}
				onClick={handleSubmit} disabled={!title||!description||!number} 
				size="small"
				variant="contained">
					Done
         </Button>
		 </ThemeProvider>
			</DialogActions>
		</Dialog>

	)
}

export default CampaignDialog