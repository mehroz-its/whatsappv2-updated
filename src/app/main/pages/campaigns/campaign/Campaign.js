import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import CampaignHeader from './CampaignHeader';
import CampaignTable from './CampaignTable';
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
	const handleDialogClose = (val) => {
		setOpen(false)
	};
	const updateText = (search) => {
		setVal(search)
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
			/>
			{open && <CampaignDialog isOpen={open} type='Add Campaign' data={dialogData} closeDialog={handleDialogClose} />}
		</>
	);
}
export default withReducer('eCommerceApp', reducer)(Campaign);