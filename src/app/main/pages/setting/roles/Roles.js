import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import RolesHeader from './RolesHeader';
import Rolestable from './RolesTable';
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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import RolesDialog from './RolesDialog';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'



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
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
}))



function Roles(props) {

	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);






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
	const classes = useStyles(props);
	const [val, setVal] = React.useState('')
	const handleClickOpen = () => {
		setOpen(true);
	};



	function closeDialog() {
		setOpen(false)
		getData()

	}
	const handleClose = () => {
		setOpen(false);
	};
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('roles', 'listing', {

				limit: 100,
				page: 0,
				columns: "*",
				sortby: "ASC",
				orderby: "id",
				where: "displayed = $1",
				values: true,
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
	function search(value) {
		console.log('ceeleded', value);
		setVal(value)
		setData2(data.filter(n => n.name.toLowerCase().includes(value.toLowerCase())))
		console.log(data, 'filterssss');


	}
	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<RolesHeader SearchVal={search} />}
				content={<Rolestable dataa={data2} ValueForSearch={val} onClose={closeDialog} />}
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
			{open ? <RolesDialog isOpen={open} closeDialog={closeDialog} type="Add" data={dialogData} /> : null}
		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Roles);
