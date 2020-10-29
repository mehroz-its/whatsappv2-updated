import FusePageSimple from '@fuse/core/FusePageSimple';
import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CannedHeader from './TemplateHeader';
import CannedList from './TemplateList';
import CannedSideBar from './TemplateMessageSideBar';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import TemplateDialog from './TemplateDialog'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';


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

function TemplateMessage(props) {
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [open, setOpen] = React.useState(false);
	
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')
	const [val, setVal] = React.useState('')

	const [cannedtype, setCannedType] = React.useState('all')

	const [totalItems, setTotalItems] = React.useState(0)
	const [currentParams, setCurrentParams] = React.useState({limit:5,page:0})
	const [isLoading, setLoading] = React.useState(true)

	const [dialogData, setDialogData] = React.useState({
		enabled: true,
		id: '',
		username: '',
		position: '',
		email: '',
		number: '',
		roles: []
	})

	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	
	React.useEffect(() => {
		setLimit(currentParams.limit)
	}, [cannedtype]);
	

	React.useEffect(() => {
		getData()
	  }, [currentParams]);
	const setPage = (currentPage)=>{
		setCurrentParams({limit:currentParams.limit,page:currentPage})
	}
	
	const setLimit = (pageLimit)=>{
		setCurrentParams({limit:pageLimit,page:0})
	}

	

	const getData = ((loadData) => {
		// setData([])
		setLoading(true)

		loadData = () => {
			return CoreHttpHandler.request('template', 'listing', {
				limit: currentParams.limit,
				page: currentParams.page,
				
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
			setTotalItems(response.data.data.list.totalItems)

			setLoading(false)
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

	const valueReceived = (value) => {
		if (value === "update") {
			setSnackBarMessage("Updated Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (value === "create") {
			setSnackBarMessage("Created Succecfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (value === "error") {
			setSnackBarMessage("Error!Please Try Again Later")
			setOK("error")
			setSnackBarOpen(true)
		}
		else if (value === "delete") {
			setSnackBarMessage("Deleted Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (value && value !== ("update" || "delete" || "create" )) {
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
		setData2(data.filter(n => n.template_name.toLowerCase().includes(val.toLowerCase())))
	}
	function closeDialog(val) {
		setOpen(false);
		getData()
		valueReceived(val)
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleCannedMessageType = (val) => {
		setCannedType(val)
	}
	const getContent = ()=>{
		return (
			<React.Fragment>
			<CannedList isLoading={isLoading} currentParams={currentParams} totalItems={totalItems} setPage={setPage} setLimit={setLimit} isSearched={val} data={data2} onDialogClose={closeDialog} ValueForSearch={val} displaySnack={valueReceived}  />
			
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
			{open ? <TemplateDialog data={dialogData} type="Add Template Message" snackbar={valueReceived} isOpen={open} closeDialog={closeDialog} />:null}
			</React.Fragment>
		)	
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
				content={getContent()}
				leftSidebarContent={<CannedSideBar cannedType={handleCannedMessageType} />}
				sidebarInner
				ref={pageLayout}
			/>
			</>
	);
}

export default TemplateMessage;
