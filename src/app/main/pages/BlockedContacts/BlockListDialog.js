import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
// import { getUserData } from '../../chat/store/actions';
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import { makeStyles,ThemeProvider,createMuiTheme,withStyles } from '@material-ui/core/styles';


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

    

const BlockDialog = (props) => {
	const classes = useStyles(props);

	const { isOpen, type, getUpdatedData, data } = props
	console.log(props)
	const [openDialog, setopenDialog] = React.useState(isOpen);
	const [open, setOpen] = React.useState(false);






	const handleDialogClose = () => {
		props.closeDialog()
		setopenDialog(false);
	};

	const handleSubmit = () => {
		CoreHttpHandler.request('conversations', 'unblock', {
			key: ':number',
			value: data.number,
		}, (response) => {
			// props.getUpdatedData()
			console.log(response)
			props.closeDialog()
			setopenDialog(false);
		}, (error) => {
			props.closeDialog()
			setopenDialog(false);

		});

	};
	// const handleEnable = (event) => {

	// 	setEnabled(event.target.checked);
	// 	console.log(enabled, 'enable')
	// };

	// const onInputChange = e => {
	// 	switch (e.target.name) {
	// 		case "name":
	// 			setName(e.target.value)
	// 			break;
	// 		case "description":
	// 			setDescription(e.target.value)
	// 			break;
	// 		case "canned_type":
	// 			setCannedType(e.target.value)
	// 			break;
	// 		case "text":
	// 			setText(e.target.value)
	// 			break;
	// 	}
	// }
	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	// const onChangeHandler = event => {
	// 	setIsLoading(true);

	// 	if (event.target.files.length > 0) {
	// 		const _data = new FormData();

	// 		let _name = event.target.files[0].name;

	// 		_name = _name.replace(/\s/g, "");

	// 		_data.append(
	// 			"file",
	// 			event.target.files[0],
	// 			`${new Date().getTime()}_${_name}`
	// 		);

	// 		CoreHttpHandler.request(
	// 			"content",
	// 			"upload",
	// 			{
	// 				params: _data
	// 			},
	// 			response => {
	// 				setIsLoading(false);
	// 				setUploadedFilePath(response.data.data.link)
	// 				// let name = response.data.data.link
	// 				// setAttachment_name(name.split('/'))
	// 				// console.log(attachment_name,'name')

	// 				onInputChange({
	// 					target: {
	// 						name: 'msisdnUrl',
	// 						value: response.data.data.link
	// 					}
	// 				})
	// 			},
	// 			error => {
	// 			}
	// 		);
	// 	}
	// };


	return (
		// <div> {isOpen}</div>
		<Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{
			paper: 'm-24'
		}}

			fullWidth
			maxWidth="xs">
			{/* <DialogTitle id="form-dialog-title">{props.type} </DialogTitle> */}
			<AppBar position="static" elevation={1}>
				
				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
        style={{paddingBottom:20,paddingTop:20}}>
	      {props.type} 
				</div>
				</AppBar>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex">
					<div className="min-w-48 pt-10">
						<Icon color="action">block</Icon>
					</div>
					{`Are you sure you want to unblock this number [${data.number}] ?`}
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} color="primary" size="small" variant="contained" >
					Cancel
             </Button>
			 <ThemeProvider theme={theme}>
				<Button variant="contained" onClick={handleSubmit} color="primary" size="small" className={classes.margin}>
					Done
         </Button>
		 </ThemeProvider>
			</DialogActions>
		</Dialog>

	)
}

export default BlockDialog