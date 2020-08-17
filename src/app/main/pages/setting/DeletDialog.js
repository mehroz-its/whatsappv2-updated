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
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'




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
}));




const DeleteDialog = (props) => {
	const classes = useStyles(props);

	const { isOpen, type, getUpdatedData, data ,path,method} = props
	console.log(props)
	const [openDialog, setopenDialog] = React.useState(isOpen);
	const [open, setOpen] = React.useState(false);






	const handleDialogClose = () => {
		props.closeDialog()
		setopenDialog(false);
	};

	const handleSubmit = () => {
		CoreHttpHandler.requestCustomer(path, method,
			{
				key: ':id',
				value: data.id
			}
			, (response) => {
				// console.log(response)
				props.closeDialog("delete")
				// setopenDialog(false);
			}, (error) => {
				props.closeDialog(error.response.data.message)
				// setopenDialog(false);

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
		<Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title" classes={{
			paper: 'm-24'
		}}

			fullWidth
			maxWidth="xs">
			<DialogTitle id="form-dialog-title">{props.type} </DialogTitle>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex">
					<div className="min-w-48" style={{marginTop:'-3px'}}>
						<Icon color="action">block</Icon>
					</div>
					{`Are you sure you want to delete?`}
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} color="primary">
					Cancel
             </Button>
				<Button onClick={handleSubmit} color="primary">
					Confirm
         </Button>
			</DialogActions>
		</Dialog>

	)
}

export default DeleteDialog