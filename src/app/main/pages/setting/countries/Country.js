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
import CountryDialog from './CountryDialog'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Fab from '@material-ui/core/Fab';

import { makeStyles,withStyles } from '@material-ui/core/styles';

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
	const[data,setData]=React.useState('')
	const classes = useStyles(props);
	
	const handleClickOpen = () => {
		setOpen(true)
		console.log('handle');
		;
	  };
	
	
	  const handleClose = () => {
		setOpen(false);
	  };
	//   const handleChange = (event) => {
	// 	setState({ ...state, [event.target.name]: event.target.checked });
	//   };
	//   const loadCities = () => {
    //     return CoreHttpService.request('locations', 'get_cities', {
    //         columns: "id, name",
    //         sortby: "ASC",
    //         orderby: "id",
    //         where: "enabled = $1",
    //         values: true,
    //         page: 0,
    //         limit: 0
	// 	}, null, null, true);
	// 	{createCountryDialog}
	// };
	


	//   const createCountryDialog = () => {
	// 	  console.log('called');
		  
    //     loadCities().then(response => {
    //         const cities = response.data.data.list.data;

    //         setDialogData({
    //             country: {
    //                 id: '',
    //                 code: '',
    //                 name: '',
    //                 enabled: true,
    //                 cities: []
    //             },
    //             cities,
    //             type: 'create',
    //             state: true,
    //         })
    //     });
	// };
	
	return (
		<>
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CountryHeader />}
			content={<CountryTable />}
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
	   {open ?<CountryDialog isOpen={open} closeDialog={closeDialog} type="Add" data={data}/> :null }
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Country);
