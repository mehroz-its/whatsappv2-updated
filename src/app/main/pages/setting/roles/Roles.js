import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import RolesHeader from './RolesHeader';
import Rolestable from './RolesTable';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import FuseAnimate from '@fuse/core/FuseAnimate';

import Fab from '@material-ui/core/Fab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import RolesDialog from './RolesDialog';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		'&$checked': {
			color: green[600],
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'fixed',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
}))

function Roles(props) {
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')
	const [state, setState] = React.useState({

		checkedG: false,
		checkedA: false,
		checkedB: false,
		checkedF: false,
	});
	const [open, setOpen] = React.useState(false);
	const [dialogData, setdialogData] = React.useState({
		enabled: false
	})
	
	const [totalItems, setTotalItems] = React.useState(0)
	const [currentParams, setCurrentParams] = React.useState({limit:10,page:0})
	const [isLoading, setLoading] = React.useState(true)
	

	const classes = useStyles(props);
	const [val, setVal] = React.useState('')
	const handleClickOpen = () => {
		setOpen(true);
	};
	function closeDialog(mes) {
		snackbar(mes)
		getData()
		setOpen(false);

	}
	const getData = ((loadData) => {
		setLoading(true)

		loadData = () => {
			return CoreHttpHandler.request('roles', 'listing', {
				...currentParams,
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
			setLoading(false)
			setTotalItems(response.data.data.list.totalItems)

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
	  }, [currentParams]);
	const setPage = (currentPage)=>{
		setCurrentParams({limit:currentParams.limit,page:currentPage})
	}
	
	const setLimit = (pageLimit)=>{
		setCurrentParams({limit:pageLimit,page:0})
	}

	function search(value) {
		setVal(value)
		setData2(data.filter(n => n.name.toLowerCase().includes(value.toLowerCase())))
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
		else if (snackmsg &&snackmsg !==( "update" || "delete"||"create"|| "error")) {
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
				header={<RolesHeader SearchVal={search} />}
				content={<Rolestable 
				
				totalItems={totalItems}
				setPage={setPage}
				setLimit={setLimit}
				rowsPerPage={currentParams.limit}
				currentPage={currentParams.page}
				isLoading={isLoading}
				snackbar={snackbar} dataa={data2} ValueForSearch={val} onClose={closeDialog} />}
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
			{open ? <RolesDialog snackbar={snackbar} isOpen={open} closeDialog={closeDialog} type="Add" data={dialogData} /> : null}
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Roles);
