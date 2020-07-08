import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import PermissionHeader from './PermissionHeader';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PermissionTable from './PermissionTable';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PermissionDialog from './PermissionDialog'
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},

}))


function Permissions(props) {

	function closeDialog() {
		setOpen(false)
	}
	const [dialogData, setDialogData] = React.useState({
		enabled: true,
		id: '',
		description: '',
		title: '',
		method: null,
		rule_set: [],
		consumer: ""
	})
	const [open, setOpen] = React.useState(false);
	const [val, setVal] = React.useState('')
	const classes = useStyles(props);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const updateText = (search) => {
		setVal(search)
	}


	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<PermissionHeader SearchVal={updateText} />}
				content={<PermissionTable ValueForSearch={val} />}
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
			{open ? <PermissionDialog isOpen={open} closeDialog={closeDialog} type="Add" data={dialogData} /> : null}
		</>
	);
}



export default withReducer('eCommerceApp', reducer)(Permissions);
