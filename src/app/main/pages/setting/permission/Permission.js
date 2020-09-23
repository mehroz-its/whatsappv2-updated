import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import PermissionHeader from './PermissionHeader';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PermissionTable from './PermissionTable';
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
import PermissionDialog from './PermissionDialog'
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'fixed',
		bottom: 50,
		right: 50,
		zIndex: 99
	},

}))


function Permissions(props) {
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [dialogData, setDialogData] = React.useState({
		enabled: true,
		id: '',
		description: '',
		title: '',
		method: null,
		rule_set: [],
		consumer: ""
	})
	const [open, setOpen] = React.useState(false);
	const [val, setVal] = React.useState('')
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')

	const classes = useStyles(props);

	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('permissions', 'listing', {

				limit: 100,
				page: 0,
				columns: "*",
				sortby: "ASC",
				orderby: "id",
				where: "displayed = $1",
				values: true,
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
	});

	React.useEffect(() => {
		getData()
	}, []);
	const handleClickOpen = () => {
		setOpen(true);
	};
	function search(val) {
		setVal(val)
		setData2(data.filter(n => n.title.toLowerCase().includes(val.toLowerCase())))
	}

	function closeDialog(mes) {
		snackbar(mes)
		getData()
		setOpen(false);
	}

	const snackbar = (snackmsg) => {
		if (snackmsg == "create") {
			setSnackBarMessage("Created Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg == "update") {
			setSnackBarMessage("Update Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg == "delete") {
			setSnackBarMessage("Deleted Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg == "error") {
			setSnackBarMessage("Error!Please Try Again Later")
			setOK("error")
			setSnackBarOpen(true)
		}
		else if (snackmsg !==( "update" || "delete"||"create"|| "error")) {
			setSnackBarMessage(snackmsg)
			setOK("error")
			setSnackBarOpen(true)
		}
	}

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbaropen}
				autoHideDuration={1000}
			>
				<Alert variant="filled" severity={ok}>
					{snackbarmessage}
				</Alert>
			</Snackbar>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<PermissionHeader SearchVal={search} />}
				content={<PermissionTable snackbar={snackbar} ValueForSearch={val} dataa={data2} onClose={closeDialog} />}
			// innerScroll
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
			{open ? <PermissionDialog snackbar={snackbar} isOpen={open} closeDialog={closeDialog} type="Add" data={dialogData} /> : null}
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Permissions);
