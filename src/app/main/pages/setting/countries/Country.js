import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import CountryHeader from './CountryHeader';
import CountryTable from  './CountryTable';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';

import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import Fab from '@material-ui/core/Fab';
import CountryDialog from './CountryDialog'

import { makeStyles,withStyles } from '@material-ui/core/styles';
import { enable } from 'promise/lib/rejection-tracking';

const GreenCheckbox = withStyles({
	root: {
	  color: green[400],
	  '&$checked': {
		color: green[600],
	  },
	},
	checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme)=>({
	addButton: {
		position: 'absolute',
		bottom:50,
		right:50,
		zIndex: 99
	},
}))


function Country(props) {

	
	// React.useEffect(()=>{
	// 	this.loadCities()
	// })

	function closeDialog(){
		setOpen(false)
	}
	
	const [state, setState] = React.useState({
		
		checkedG: true,
	  });
	  
	const [open, setOpen] = React.useState(false);

	const [dialogData, setDialogData] = React.useState({
  		enabled:true, id:'',name:'',code:'',cities:''
	})		
	
	const[val,setVal]=React.useState('')
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
	const classes = useStyles(props);
	


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
		loadData = () => {
			return CoreHttpHandler.request('locations', 'get_countries', {

				limit: 10,
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
		});
	})

	React.useEffect(() => {
		getData()
		
		
	}, []);
	  
	const searchContact =(value)=> {
		setVal(value)
		// console.log('ceeleded', props.ValueForSearch, searchVal);

		// setSearchVal(props.ValueForSearch)
		setData2(data.filter(n =>n.name.toLowerCase().includes(value.toLowerCase())))
		console.log(data2, 'filterssss');


	}
	
	return (
		<>
		<FusePageCarded
		
			header={<CountryHeader  SearchVal={searchContact} />}
			content={<CountryTable   InsertedVal={val}  dataa={data2} ValueForSearch={val} isOpen={updateDialogOpen} onClickOpen={handleUpdateClickOpen} onClose={handleClose} />}   
	
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
	   {open ?<CountryDialog type="Add" isOpen={open} closeDialog={handleClose} data={dialogData} /> :null }
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Country);
