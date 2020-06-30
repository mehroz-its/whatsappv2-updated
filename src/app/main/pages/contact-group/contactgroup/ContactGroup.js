import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import FormControl from '@material-ui/core/FormControl';
import ContactGroupHeader from './ContactGroupHeader'
import ContactGroupTable from './ContactGroupTable'
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FuseAnimate from '@fuse/core/FuseAnimate';
import ContactGroupDialog from './ContactGroupDialog'

import { makeStyles } from '@material-ui/core/styles';

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

function ContactGroup(props) {
	const [open, setOpen] = React.useState(false);

	const classes = useStyles(props);


	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpen = () => {
		setOpen(true);
	}

	const [age, setAge] = React.useState('Text');
	const [dialogData, setDialogData] = React.useState(
		{
		  id: 0,
		  title: '',
		  description: '',
		  enabled: true,
		  customers: [],
		}
	  )

	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<ContactGroupHeader />}
				content={<ContactGroupTable />}
			// innerScroll
			/>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={handleClickOpen}
				// onClick={ev => dispatch(Actions.openNewContactDialog())}
				>
					<Icon>person_add</Icon>
				</Fab>
			</FuseAnimate>
			{open && <ContactGroupDialog type="Create New Contact Group" isOpen={open} closeDialog={handleClose} data={dialogData} />}
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(ContactGroup);