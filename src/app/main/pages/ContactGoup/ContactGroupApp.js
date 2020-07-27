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







const useStyles = makeStyles({
	layoutRoot: {}
});

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


	// const handleChange = (event) => {
	// 	setAge(event.target.value);
	// };

	const handleClose = () => {
		setOpen(false);
		getData()
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

	const getData = ((loadData) => {
		console.log('called get data')
		loadData = () => {
			return CoreHttpHandler.request('contact_group', 'listing', {

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
	}, []);

	// const updateText =(search)=>
	//   {
	// 	setVal(search)
	//   }

	  const valueReceived = (value) =>{
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

	function search(val) {
		// console.log('ceeleded', props.ValueForSearch, searchVal);

		setVal(val)
		setData2(data.filter(n => n.title.toLowerCase().includes(val.toLowerCase())))
		console.log(data, 'filterssss');


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
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<ContactsHeader pageLayout={pageLayout}  SearchVal={search} />}

				content={<ContactsList isSearched={val} data={data2} onDialogClose={handleClose}  ValueForSearch={val}/>}

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

			{open && <ContactGroupDialog GiveVal={valueReceived} type="Create New Contact Group" isOpen={open} closeDialog={handleClose} data={dialogData} />}

		</>
	);
}

export default ContactsApp;
