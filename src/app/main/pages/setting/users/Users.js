import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import reducer from './store/reducers';
import Fab from '@material-ui/core/Fab';
import UserHeader from './UserHeader';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import UserTable from  './UserTable';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import UserDialog from './UserDialog'
import FormControlLabel from '@material-ui/core/FormControlLabel';

const GreenCheckbox = withStyles({
	root: {
	  color: green[400],
	  '&$checked': {
		color: green[600],
	  },
	},
	checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const useStyles = makeStyles((theme)=>({
	addButton: {
		position: 'absolute',
		bottom:50,
		right:50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330,
	
	  },
}))

function Users(props) {
	const [state, setState] = React.useState({
		
		checkedG: true,
		checkedB:true

	})
	function closeDialog(){
		setOpen(false)
	}


	const handleClose = () => {
		setOpen(false);
	  };
	  const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	  };
	const [open, setOpen] = React.useState(false);
	const[data,setData]=React.useState('')
	const classes = useStyles(props);
	
	const handleClickOpen = () => {
		setOpen(true);
	  };
	return (
		<>
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<UserHeader />}
			content={<UserTable />}
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
       {open ? <UserDialog isOpen={open} closeDialog={closeDialog}  type="Add"  data={data} /> : null}
		

		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Users);
