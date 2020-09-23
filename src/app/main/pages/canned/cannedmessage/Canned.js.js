import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import CannedHeader from './CannedHeader'
import CannedTable from './CannedTable'
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import FuseAnimate from '@fuse/core/FuseAnimate';
import CannedDialog from './CannedDialog'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
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
function Canned(props) {
	const [open, setOpen] = React.useState(false);
	const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')
	const [val, setVal] = React.useState('')
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [dialogData, setDialogData] = React.useState(
		{ enable: true, id: '', name: '', type: 'text', text: '', url: '', attachment_type: '', file_name: '' }
	)
	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('canned_messages', 'listing', {
				limit: 100,
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
	}, []);
	const classes = useStyles(props);
	const handleClose = (mes) => {
		snackbar(mes)
		getData()
		setOpen(false);
	};
	const handleClickOpen = () => {
		setOpen(true);
	}
	const handleUpdateClickOpen = () => {
		setUpdateDialogOpen(true);
	}
	const searchContact = (value) => {
		setVal(value)
		setData2(data.filter(n => n.message_name.toLowerCase().includes(value.toLowerCase())))
	}
	const snackbar = (snackmsg) => {
		if (snackmsg == "create") {
			setSnackBarMessage("Created Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg == "update") {
			setSnackBarMessage("Updated Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}

		else if (snackmsg == "error") {
			setSnackBarMessage("Error!Please Try Again Later")
			setOK("error")
			setSnackBarOpen(true)
		}
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
					header: 'min-h-25 h-25 sm:h-25 sm:min-h-25'
				}}
				header={<CannedHeader SearchVal={searchContact} />}
				content={<CannedTable snackbar={snackbar} InsertedVal={val} dataa={data2} ValueForSearch={val} isOpen={updateDialogOpen} onClickOpen={handleUpdateClickOpen} onClose={handleClose} />}
			/>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					size="medium"
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={handleClickOpen}
				>
					<Icon>person_add</Icon>
				</Fab>
			</FuseAnimate>
			{open && <CannedDialog snackbar={snackbar} type="Add Canned Message" isOpen={open} closeDialog={handleClose} data={dialogData} />}
		</>
	);
}
export default withReducer('eCommerceApp', reducer)(Canned);
