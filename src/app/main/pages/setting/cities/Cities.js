import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import CitiesHeader from './CitiesHeader';
import CitiesTable from  './CitiesTable';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import CitiesDialog from './CitiesDialog';

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
}))


function Cities(props) {

	function closeDialog(){
		setOpen(false)
	}
	
		
	const [state, setState] = React.useState({
		
		checkedG: true,
	  });
	const [open, setOpen] = React.useState(false);

	const classes = useStyles(props);
	
	const handleClickOpen = () => {
		setOpen(true);
	  };
	
	
	  const handleClose = () => {
		setOpen(false);
	  };
	  const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	  };
	
	
	return (
		<>
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CitiesHeader />}
			content={<CitiesTable />}
			// innerScrollss
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
			{open ?<CitiesDialog isOpen={open} closeDialog={closeDialog} type="Add" /> :null }
	</>
	);
}

export default withReducer('eCommerceApp', reducer)(Cities);
