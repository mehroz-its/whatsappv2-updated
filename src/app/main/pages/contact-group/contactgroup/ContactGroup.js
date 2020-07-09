import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import FormControl from '@material-ui/core/FormControl';
import ContactGroupHeader from './ContactGroupHeader'
import ContactGroupTable from './ContactGroupTable'
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch } from 'react-redux';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FuseAnimate from '@fuse/core/FuseAnimate';
import ContactGroupDialog from './ContactGroupDialog'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330,

	},
}));

function ContactGroup(props) {
	const [open, setOpen] = React.useState(false);
	const[val,setVal]=React.useState('')
	const classes = useStyles(props);
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);


	const handleClose = () => {
		getData()
		setOpen(false);
		// setUpdateDialogOpen(false)
	};
	const handleClickOpen = () => {
		setOpen(true);

	}
	const handleUpdateClickOpen = () => {
		setUpdateDialogOpen(true);
	}

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
		});
	})

	React.useEffect(() => {
		getData()
	}, []);

	const [age, setAge] = React.useState('Text');
	const [dialogData, setDialogData] = React.useState(
		{
		  id: 0,
		  title: '',
		  description: '',
		  enabled: true,
		  customers: [],
		}
	  )

	  const searchContact =(value)=> {
		setVal(value)
		// console.log('ceeleded', props.ValueForSearch, searchVal);

		// setSearchVal(props.ValueForSearch)
		setData2(data.filter(n =>n.title.toLowerCase().includes(value.toLowerCase())))
		console.log(data2, 'filterssss');


	}
	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<ContactGroupHeader  SearchVal={searchContact} />}
				content={<ContactGroupTable InsertedVal={val}  dataa={data2} ValueForSearch={val} isOpen={updateDialogOpen} onClickOpen={handleUpdateClickOpen} onClose={handleClose}  />}
			// innerScroll
			/>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={handleClickOpen}
				// onClick={ev => dispatch(Actions.openNewContactDialog())}
				>
					<Icon>person_add</Icon>
				</Fab>
			</FuseAnimate>
			{open && <ContactGroupDialog type="Create New Contact Group" isOpen={open} closeDialog={handleClose} data={dialogData} />}
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(ContactGroup);
