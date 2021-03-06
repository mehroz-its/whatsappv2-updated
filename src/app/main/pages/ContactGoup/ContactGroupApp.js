import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import ContactsHeader from './ContactGroupHeadder';
import ContactsList from './ContactGroupList';
import ContactsSidebarContent from './ContactsGroupSidebarContent';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import * as Actions from './store/actions';
import { useDispatch } from 'react-redux';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import ContactGroupDialog from './ContactGroupDialog'
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
	const[val,setVal]=React.useState('')

	const [totalItems, setTotalItems] = React.useState(0)
	const [currentParams, setCurrentParams] = React.useState({limit:5,page:0})
	const [isLoading, setLoading] = React.useState(true)
	

	// const handleChange = (event) => {
	// 	setAge(event.target.value);
	// };

	
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

	const getData = ((loadData) => {
		setLoading(true)

		console.log('called get data')
		loadData = () => {
			return CoreHttpHandler.request('contact_group', 'listing', {

				limit: currentParams.limit,
				page: currentParams.page+1,
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

	  const valueReceived = (value) =>{
		  console.log('i am called')
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
	  }
	  setTimeout(() => {
		setSnackBarMessage('')
		setSnackBarOpen(false)
	}, 3000);

	function search(val) {
		// console.log('ceeleded', props.ValueForSearch, searchVal);

		setVal(val)
		setData2(data.filter(n => n.title.toLowerCase().includes(val.toLowerCase())))
		console.log(data, 'filterssss');


	}
	const handleClose = (val) => {
		setOpen(false);
		getData()
		valueReceived(val)
	};
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
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<ContactsHeader pageLayout={pageLayout}  SearchVal={search} />}

				content={<ContactsList totalItems={totalItems} setPage={setPage} setLimit={setLimit} rowsPerPage={currentParams.limit} currentPage={currentParams.page} isLoading={isLoading} isSearched={val} data={data2} onDialogClose={handleClose}  ValueForSearch={val} displaySnack={valueReceived}/>}

				leftSidebarContent={<ContactsSidebarContent />}
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

			{open && <ContactGroupDialog  isSearched={val} type="Create New Contact Group" isOpen={open} closeDialog={handleClose} data={dialogData} />}

		</>
	);
}

export default ContactsApp;
