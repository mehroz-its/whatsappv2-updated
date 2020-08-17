import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import CannedHeader from './CannedHeader';
import CannedList from './CannedList';
import CannedSideBar from './CannedSideBar';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import * as Actions from './store/actions';
import { useDispatch } from 'react-redux';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CannedDialog from './CannedDialog'
const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'fixed',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330,

	},
}));

function ContactsApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')
	const [val, setVal] = React.useState('')
	const [cannedtype, setCannedType] = React.useState('all')
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
			attachment_url: ''
		}
	)

	const getData = ((loadData) => {
		setData([])
		setData2([])
		console.log('called get data')
		loadData = () => {
			return CoreHttpHandler.request('canned_messages', 'type_listing', {
				limit: 100,
				key: ':type',
				value: cannedtype,
				page: 0,
				columns: "*",
				sortby: "DESC",
				orderby: "id",
				where: "id != $1",
				values: 0,
			}, null, null, true);
		};
		loadData().then((response) => {
			const tableData = response.data.data.list.data
			console.log(tableData)
			setData(tableData)
			setData2(tableData)
			setTimeout(() => {
				setSnackBarMessage('')
				setSnackBarOpen(false)
			}, 3000);

		})
			.catch((error) => {
				setTimeout(() => {
					setSnackBarMessage('')
					setSnackBarOpen(false)
				}, 3000);

			})


	})
	React.useEffect(() => {
		getData()
	}, [cannedtype]);
	const valueReceived = (value) => {
		// alert(value)
		if (value == "update") {
			setSnackBarMessage("Updated Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (value == "create") {
			setSnackBarMessage("Created Succecfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (value == "error") {
			setSnackBarMessage("Error!Please Try Again Later")
			setOK("error")
			setSnackBarOpen(true)
		}
		else if (value === "delete") {
			setSnackBarMessage("Deleted Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (value !== ("update" || "delete" || "create" )) {
			setSnackBarMessage(value)
			setOK("error")
			setSnackBarOpen(true)
		}
	
	}
	setTimeout(() => {
		setSnackBarMessage('')
		setSnackBarOpen(false)
	}, 4000);

	function search(val) {
		setVal(val)
		setData2(data.filter(n => n.message_name.toLowerCase().includes(val.toLowerCase())))
	}
	function closeDialog(val) {
		setOpen(false);
		getData()
		valueReceived(val)
	};
	const handleCannedMessageType = (val) => {
		setCannedType(val)
	}

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbaropen}
				autoHideDuration={5000}
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
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<CannedHeader pageLayout={pageLayout} SearchVal={search} />}
				content={<CannedList isSearched={val} data={data2} onDialogClose={closeDialog} ValueForSearch={val} displaySnack={valueReceived} />}
				leftSidebarContent={<CannedSideBar cannedType={handleCannedMessageType} />}
				sidebarInner
				ref={pageLayout}
			// innerScroll
			/>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					size="medium"
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={handleClickOpen}
				// onClick={ev => dispatch(Actions.openNewContactDialog())}
				>
					<Icon>person_add</Icon>
				</Fab>
			</FuseAnimate>
			{open ? <CannedDialog isSearched={val} type="Add Canned Message" isOpen={open} closeDialog={closeDialog} data={dialogData} /> : null}
		</>
	);
}

export default ContactsApp;
