import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useState } from 'react';
import reducer from '../store/reducers';
import CampaignHeader from './CustomerTableHeader';
import CampaignTable from './CustomerTable';
import Fab from '@material-ui/core/Fab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import CampaignDialog from './CampaignDialog'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
	addButton: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	full: {
		width: '100%'
	}
});



function Campaign(props) {
	const [open, setOpen] = React.useState(false);
	const [val, setVal] = React.useState('')
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')

	const [dialogData, setDialogData] = React.useState({
		id: 0,
		name: "",
		description: "",
		begin_dt: null,
		begin_time: null,
		msisdnUrl: "",
		state: false,
		template_id: 0,
		type: null,
		activated: false,
	})

	const classes = useStyles(props);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleDialogClose = (val) => {
		console.log(val,'valuee');
		setOpen(false)
	};



	const handleClose = () => {
		setOpen(false);
	};
	const updateText = (search) => {
		setVal(search)
		console.log(val)
	}
	

	return (
		<>

<Snackbar

anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
open={snackbaropen}
autoHideDuration={3000}

>
<Alert variant="filled" severity={ok}>
	{snackbarmessage}
</Alert>
</Snackbar>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					root: classes.layoutRoot,
				}}
				header={<CampaignHeader SearchVal={updateText} />}
				content={<CampaignTable ValueForSearch={val} />}
			// innerScroll
			/>
		
			{open && <CampaignDialog  	isOpen={open} type='Add Campaign' data={dialogData} closeDialog={handleDialogClose} />}


		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Campaign);
