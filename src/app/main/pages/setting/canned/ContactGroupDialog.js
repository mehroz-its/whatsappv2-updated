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
import ContactGroupInDialog from './ContactGroupInDialog'

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

const CampaignDialog = (props) => {
	const classes = useStyles(props);
	const { isOpen, type, getUpdatedData, data } = props
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
		if (type !== 'Contact Group Details') {
			CoreHttpHandler.request('contact_group', 'create', params, (response) => {
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
			CoreHttpHandler.request('contact_group', 'update', update_params, (response) => {
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
		<Dialog open={openDialog}  aria-labelledby="form-dialog-title" classes={{
			paper: 'm-50'
		}}

			fullWidth
			maxWidth="xs"
		>
			<DialogTitle id="form-dialog-title">{props.type} </DialogTitle>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex pb-20" >
					<ContactGroupInDialog sendSelectedNumbers={getSelectedNumbers} rowData={data} />
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20">
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
						fullWidth
						onChange={onInputChange}
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20">
						<Icon color="action">account_circle</Icon>
					</div>

					<TextField
						className="mb-24"
						label="Description"
						autoFocus
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
					<div className="min-w-48 pt-20">
						<Icon color="action">account_circle</Icon>
					</div>

					<Checkbox
						checked={enabled}
						onChange={handleEnable}
					/>

				</div>

			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} color="primary">
					Cancel
             </Button>
				<Button onClick={handleSubmit} disabled={!title || !description || !number} color="primary">
					Done
         </Button>
			</DialogActions>
		</Dialog>

	)
}

export default CampaignDialog