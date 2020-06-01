import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import reducer from '../store/reducers';
import TemplateHeader from './TemplateHeader';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TemplateTable from  './TemplateTable';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
}));



function Campaign(props) {
	const classes = useStyles(props);
	const [open, setOpen] = React.useState(false);
	
	const handleClickOpen = () => {
		setOpen(true);
	  };
	  const handleChange = (event) => {
		setAge(event.target.value);
	  };
	  const handleClose = () => {
		setOpen(false);
	  };
	  const [age, setAge] = React.useState('Text');

	return (
		<>
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<TemplateHeader />}
			content={<TemplateTable />}
			// innerScroll
		/>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					// onClick={ev => dispatch(Actions.openNewContactDialog())}
					onClick={handleClickOpen}
				>
					<Icon>person_add</Icon>
				</Fab>
			</FuseAnimate>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" 	classes={{
				paper: 'm-24'
			}}
		
			fullWidth
			maxWidth="xs">
      <DialogTitle id="form-dialog-title">Create New Template</DialogTitle>
	  <DialogContent classes={{ root: 'p-24' }}>
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
					<div className="flex" style={{marginBottom:20}}>
					<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
					<FormControl className={classes.formControl}>
					
        <InputLabel id="demo-simple-select-label" style={{marginLeft:10}}>Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
		  onChange={handleChange}
        >
          <MenuItem value={10}>Text</MenuItem>
          <MenuItem value={20}>Audio</MenuItem>
          <MenuItem value={30}>Video</MenuItem>
        </Select>
      </FormControl>
	  </div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Text"
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
							label="Params"
							autoFocus
							id="name"
							name="name"
					

							variant="outlined"
							required
							fullWidth
						/>
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

export default withReducer('eCommerceApp', reducer)(Campaign);
