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
import AppBar from '@material-ui/core/AppBar';
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
	const { isOpen, data } = props
	const [openDialog, setopenDialog] = React.useState(isOpen);
	const [age, setAge] = React.useState('');
	const [params, setParams] = React.useState(data.params);
	const [name, setName] = React.useState(data.name);
	const [filteredParams, setfilteredParams] = React.useState(null);
	const handleClose = () => {
		props.closeDialog()
		setopenDialog(false);
	};

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleParams = e => {
		setParams(e.target.value)
		let pattern = /[^{}]*(?=\})/g;
		let found = params.match(pattern)
		if (found.length === 0) {
			setfilteredParams(found[0])
		} if (found.length > '2') {
			var i;
			var val = []
			for (i = 0; i < found.length; i += 3) {
				val.push(found[i])
			}
			setfilteredParams(val)
			console.log(filteredParams, 'here')
		}
	}

	const onInputChange = e => {

		switch (e.target.name) {
			case "name":
				setName(e.target.value)
				break;
		}
	}


	return (
		<Dialog open={openDialog}
		onClose={handleClose}
		aria-labelledby="form-dialog-title" classes={{
			paper: 'm-24'
		}}

			fullWidth
			maxWidth="xs">
			<AppBar position="static" elevation={1}>

				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
					style={{ paddingBottom: 20, paddingTop: 20 }}>
					{props.type}
				</div>
			</AppBar>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex">
					<div className="min-w-48 pt-10">
						<Icon color="action">account_circle</Icon>
					</div>

					<TextField
						className="mb-24"
						label="Name"
						autoFocus
						size="small"
						id="name"
						name="name"
						variant="outlined"
						required
						disabled={true}
						fullWidth
						value={name}
						onChange={onInputChange}
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20">
						<Icon color="action">notinsert_commentes</Icon>
					</div>
					<TextField id="outlined-basic-email" multiline
						name={'params'}
						value={params}
						disabled={true}
						rows="4"
						label="Params"
						size="small"
						variant="outlined"
						fullWidth
						onChange={handleParams}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" size="small"
					variant="contained">
					Cancel
             </Button>
				<Button onClick={handleClose} disabled={true} color="primary" size="small"
					variant="contained" >
					Done
         </Button>
			</DialogActions>
		</Dialog>
	)
}

export default CampaignDialog