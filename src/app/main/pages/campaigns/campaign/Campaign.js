import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React,{useState} from 'react';
import reducer from '../store/reducers';
import CampaignHeader from './CampaignHeader';
import CampaignTable from  './CampaignTable';
import Fab from '@material-ui/core/Fab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import CampaignAdd from './CampaignAdd'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	addButton: {
		position: 'absolute',
		bottom:50,
		right:50,
		zIndex: 99
	}
});


function Campaign(props) {
	const [open, setOpen] = React.useState(false);

	const classes = useStyles(props);
	
	const handleClickOpen = () => {
		setOpen(true);
	  };
	
	  const handleClose = () => {
		setOpen(false);
	  };

	return (
		<>
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CampaignHeader />}
			content={<CampaignTable />}
			innerScroll
		/>
<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
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
      <DialogTitle id="form-dialog-title">Add Campaign</DialogTitle>
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
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">cake</Icon>
						</div>
						<TextField
							className="mb-24"
							id="birthday"
							label="Begin Date"
							type="date"
						
							InputLabelProps={{
								shrink: true
							}}
							variant="outlined"
							fullWidth
						/>
					</div>
					<Button color="black" style={{backgroundColor:'black',color:'white'}} >Upload </Button>

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
