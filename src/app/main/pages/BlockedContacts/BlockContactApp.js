import FusePageSimple from '@fuse/core/FusePageSimple';
import React, { useRef } from 'react';
import ContactsHeader from './BlockHeader';
import ContactsList from './BlockList';
import ContactsSidebarContent from './ContactsSidebarContent';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
function ContactsApp() {
	const pageLayout = useRef(null);
	const [val, setVal] = React.useState('')
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
	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbaropen}
				autoHideDuration={3000}>
				<Alert variant="filled" severity={ok}>
					{snackbarmessage}
				</Alert>
			</Snackbar>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<ContactsHeader pageLayout={pageLayout} SearchVal={updateText} />}
				content={<ContactsList GiveVal={valueReceived} ValueForSearch={val} />}
				leftSidebarContent={<ContactsSidebarContent />}
				sidebarInner
				ref={pageLayout}
			/>
		</>
	);
}
export default ContactsApp;