import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import PermissionHeader from './PermissionHeader';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PermissionTable from  './PermissionTable';
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
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import { makeStyles,withStyles } from '@material-ui/core/styles';

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


function Permissions(props) {
	const [state, setState] = React.useState({
		
		checkedG: false,
		checkedA: false,
		checkedB: false,
		checkedF: false,
	  });

	  const [age, setAge] = React.useState('0');


	  const handleChangeAgain = (event) => {
		setAge(event.target.value);
	  };
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
	  console.log(age,'age')

	  const checkToShow = ()=>{
		  if(age===10)
		  {
			  console.log('first');
			  
			  return (
				  <>
				<FormControlLabel
		
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedA" />}
        label="Receive Calls"
      />
	  </>
			  )
		  }
		  else if(age===20)
		  {
			  console.log('second');
			  
			  return (
				<FormControlLabel
		
				control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedB" />}
				label="Send Audio"
			  />
			  )
		  }
		  else if(age===30)
		  {
			  console.log('third');
			  
			  return (
				<FormControlLabel
		
				control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedF" />}
				label="Edit City"
			  />
			  )
		  }
	
	  }
	return (
		<>
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<PermissionHeader />}
			content={<PermissionTable />}
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
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{
				paper: 'm-24'
			}}
		
			fullWidth
			maxWidth="md">
      <DialogTitle id="form-dialog-title">Add Permissions</DialogTitle>
	  <DialogContent classes={{ root: 'p-24' }}>
		            <div style={{display:'flex',flexDirection:'row'}}>
						<div style={{flex:1}}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Name"
							autoFocus
							id="name"
							name="name"
					
							variant="outlined"
							required
							fullWidth
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
							id="name"
							name="name"
                            variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex" style={{marginBottom:20}}> 
					<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
					<FormControl className={classes.formControl}>
					
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
		  onChange={handleChangeAgain}
        >
          <MenuItem value={10}>Application</MenuItem>
          <MenuItem value={20}>FrontEnd</MenuItem>
          <MenuItem value={30}>Backend</MenuItem>
		  <MenuItem value={40}>Client</MenuItem>
        </Select>
      </FormControl>
	  </div>
		<FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
        label="Enabled"
      />
	  </div>
	  
	   <div style={{flexDirection:'column',flex:1,display:'flex',alignItems:'flex-end',marginLeft:10}}>
		  {
			checkToShow()
		  }
	  	{/* <FormControlLabel
		
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedA" />}
        label="Agent Backend Access"
      /> */}
	  </div>
	  {/* <div style={{flexDirection:'column',flex:1,display:'flex',alignItems:'flex-end',marginLeft:10	}}>
	  	<FormControlLabel
		
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedA" />}
        label="Agent Backend Access"
      />
	  	<FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedB" />}
        label="Agent FrontEnd Access"
      />
	  	<FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedF" />}
        label="Agent Application Access"
      />
	  </div> */}
     </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
	</>
	);
}

export default withReducer('eCommerceApp', reducer)(Permissions);
