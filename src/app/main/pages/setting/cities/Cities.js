import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import CitiesHeader from './CitiesHeader';
import CitiesTable from  './CitiesTable';
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
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import CitiesDialog from './CitiesDialog';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'

const GreenCheckbox = withStyles({

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


function Cities(props) {

	const classes = useStyles(props);
	function closeDialog(){
		setOpen(false)
	}
	
	const [dialogData, setDialogData] = React.useState(
		{ enabled: true, id: '', name: '',code:'', country:'' }
	)	
	const [open, setOpen] = React.useState(false);
	const[val,setVal]=React.useState('')
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
	
	
	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('locations', 'get_cities', {

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
			console.log(tableData)
			setData(tableData)
			setData2(tableData)
		});
	})


	
	React.useEffect(() => {
		getData()
	}, []);
	
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
	const searchContact =(value)=> {
		setVal(value)
		// console.log('ceeleded', props.ValueForSearch, searchVal);

		// setSearchVal(props.ValueForSearch)
		setData2(data.filter(n => n.name.toLowerCase().includes(value.toLowerCase())))
		console.log(data2, 'filterssss');


	}

	
	
	return (
		<>
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CitiesHeader  SearchVal={searchContact}  />}
			content={<CitiesTable   InsertedVal={val}  dataa={data2} ValueForSearch={val} isOpen={updateDialogOpen} onClickOpen={handleUpdateClickOpen} onClose={handleClose} />}
			// innerScrollss
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
			{open ?<CitiesDialog type="Add" isOpen={open} closeDialog={handleClose} data={dialogData}/> :null }
	</>
	);
}

export default withReducer('eCommerceApp', reducer)(Cities);
