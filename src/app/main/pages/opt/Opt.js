import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import reducer from './store/reducers';
import Fab from '@material-ui/core/Fab';
import OptHeader from './OptHeader';
import OptTable from './OptTable';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import OptDialog from './OptDialog'
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


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
}))

function Opt(props) {
	const [open, setOpen] = React.useState(false);
	const [dialogData, setDialogData] = React.useState({
		enabled: true,
		id: '',
		username: '',
		position: '',
		email: '',
		number: '',
		roles: []
	})
	const classes = useStyles(props);
	const [val, setVal] = React.useState('')
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')


	const [totalItems, setTotalItems] = React.useState(0)
	const [currentParams, setCurrentParams] = React.useState({limit:10,page:0})
	const [isLoading, setLoading] = React.useState(true)
	
	function showError(mes){
		if(mes)
			snackbar(mes)

	}
	function closeDialog(mes) {
		if(mes)
			snackbar(mes)

		getData()
		setOpen(false);
	}

	const getData = ((loadData) => {
		setLoading(true)
		setData([])
		setData2([])
		loadData = () => {
			return CoreHttpHandler.request('otp', 'listing', {
				page:currentParams.page+1,
				limit:currentParams.limit,				
				columns: "*",
				sortby: "ASC",
				orderby: "id",
				where: "displayed = $1",
				values: true,
			}, null, null, true);
		};
		loadData().then((response) => {
			setLoading(false)
			setTotalItems(response.data.data.list.totalItems)

			const tableData = response.data.data.list.data
			setData(tableData)
			setData2(tableData)
			setTimeout(() => {
				setSnackBarMessage('')
				setSnackBarOpen(false)
			}, 3000);

		})
			.catch((error) => {
				setLoading(false)

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


	const handleClickOpen = () => {
		setOpen(true);
	};

	function search(value) {
		setVal(value)
		setData2(data.filter(n => n.username.toLowerCase().includes(value.toLowerCase())))
	}

	const snackbar = (snackmsg) => {
		if (snackmsg === "create") {
			setSnackBarMessage("Created Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg === "update") {
			setSnackBarMessage("Update Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg === "delete") {
			setSnackBarMessage("Deleted Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg === "error") {
			setSnackBarMessage("Error! Please Try Again Later")
			setOK("error")
			setSnackBarOpen(true)
		}
		else if (snackmsg !== ("update" || "delete" || "create" || "error")) {
			if(snackmsg){
				setSnackBarMessage(snackmsg)
				setOK("error")
				setSnackBarOpen(true)
			}else{
				setSnackBarMessage("")
				setSnackBarOpen(false)
			}
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
				header={<OptHeader SearchVal={search} />}
				content={<OptTable 
					showError={showError}
					totalItems={totalItems} setPage={setPage} setLimit={setLimit} rowsPerPage={currentParams.limit} currentPage={currentParams.page} isLoading={isLoading} 
				snackbar={snackbar} ValueForSearch={val} dataa={data2} onClose={closeDialog} />}
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
			{open ? <OptDialog snackbar={snackbar} isOpen={open} closeDialog={closeDialog} type="Add" data={dialogData} /> : null}
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Opt);