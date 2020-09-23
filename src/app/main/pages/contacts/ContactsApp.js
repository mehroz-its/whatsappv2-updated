import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import ContactsSidebarContent from './ContactsSidebarContent';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import ContactDialog from './ContactDialog'
import * as Actions from './store/actions';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles({
	layoutRoot: {}
});

function ContactsApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [open, setOpen] = React.useState(false);
	const [val, setVal] = React.useState('')
	const dispatch = useDispatch();


	// const handleChange = (event) => {
	// 	setAge(event.target.value);
	// };

	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpen = () => {
		setOpen(true);
	}

	const [dialogData, setDialogData] = React.useState(
		{
			id: 0,
			title: '',
			description: '',
			enabled: true,
			customers: [],
		}
	)
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')

	const updateText = (search) => {
		setVal(search)
	}

	const valueReceived = (value) => {
		if (value == "update") {
			setSnackBarMessage("Updated Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}

		else if (value == "error") {
			setSnackBarMessage("Error!Please Try Again Later")
			setOK("error")
			setSnackBarOpen(true)
		}
	}
	setTimeout(() => {
		setSnackBarMessage('')
		setSnackBarOpen(false)
	}, 3000);
	//   const snackbar = (snackmsg) => {




	// }
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
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-80 h-80 sm:h-134 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<ContactsHeader pageLayout={pageLayout} SearchVal={updateText} />}

				content={<ContactsList GiveVal={valueReceived} ValueForSearch={val} />}

				leftSidebarContent={<ContactsSidebarContent />}
				sidebarInner
				ref={pageLayout}
			// innerScroll
			/>

		</>
	);
}

export default ContactsApp;
