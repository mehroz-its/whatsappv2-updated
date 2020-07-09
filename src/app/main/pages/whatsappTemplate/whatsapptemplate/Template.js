import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import DialogContent from '@material-ui/core/DialogContent';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import DialogTitle from '@material-ui/core/DialogTitle';
import reducer from '../store/reducers';
import TemplateHeader from './TemplateHeader';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TemplateTable from './TemplateTable';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TemplateDialog from './TemplateDialog'

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



function Campaign(props) {
	const classes = useStyles(props);
	const [open, setOpen] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);


	const[val,setVal]=React.useState('')

	const handleClickOpen = () => {
		setOpen(true);
	};

	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('template', 'listing', {

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
			console.log(data,'i am adta2')

			console.log(response.data.data.list.data)

		});
	})

	React.useEffect(() => {
		getData()
	}, []);

	function search(value){
		// console.log('ceeleded',props.ValueForSearch,searchVal);
		console.log(data)
		setVal(value)
		setData2(data.filter(n=>n.template_name.toLowerCase().includes(value.toLowerCase())))
		console.log(data,'filterssss');
		
		
	}
	
	
	const handleClose = () => {
		setOpen(false);
	};
	
	const updateText =(search)=>
	{
	  setVal(search)
	}

	const [age, setAge] = React.useState('Text');

	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<TemplateHeader SearchVal={search} />}
				content={<TemplateTable dataa={data2}  ValueForSearch={val} />}
			// innerScroll
			/>
			{/* <FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					// onClick={ev => dispatch(Actions.openNewContactDialog())}
					onClick={handleClickOpen}
				>
					<Icon>person_add</Icon>
				</Fab>
			</FuseAnimate> */}
			{open && <TemplateDialog type="Add Template" isOpen={open}  closeDialog={handleClose} />}
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Campaign);
