import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React,{useState} from 'react';
import reducer from '../store/reducers';
import CampaignHeader from './CampaignHeader';
import CampaignTable from  './CampaignTable';
import Fab from '@material-ui/core/Fab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import CampaignDialog from './CampaignDialog'


const useStyles = makeStyles({
	addButton: {
		position: 'absolute',
		bottom:50,
		right:50,
		zIndex: 99
	},
	full:{
		width:'100%'
	}
});



function Campaign(props) {
	const [open, setOpen] = React.useState(false);
	const [dialogData,setDialogData] =  React.useState({
		name:'',
		description:'',
		begin_dt:''
	})

	const classes = useStyles(props);
	
	const handleClickOpen = () => {
		setOpen(true);
	  };
	  const handleDialogClose = () => {
		setOpen(false)
	  };


	
	  const handleClose = () => {
		setOpen(false);
	  };

	return (
		<>
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
				root:classes.layoutRoot,
			}}
			header={<CampaignHeader />}
			content={<CampaignTable />}
			// innerScroll
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
			{open && <CampaignDialog isOpen={open} type='Add Campaign' closeDialog={handleDialogClose}  />}

		
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Campaign);
