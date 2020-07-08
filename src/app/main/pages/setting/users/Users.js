import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import reducer from './store/reducers';
import Fab from '@material-ui/core/Fab';
import UserHeader from './UserHeader';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import UserTable from './UserTable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import UserDialog from './UserDialog'
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330,

	},
}))

function Users(props) {
	const [open, setOpen] = React.useState(false);
	const [dialogData, setDialogData] = React.useState({
		enabled: true,
		id: '',
		username: '',
		email: '',
		number: '',
		roles: []
	})
	const classes = useStyles(props);
	const [val, setVal] = React.useState('')
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [state, setState] = React.useState({

		checkedG: true,
		checkedB: true

	})
	function closeDialog() {
		setOpen(false)
		getData()
	}
	const updateText = (search) => {
		setVal(search)
	}
	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('users', 'listing', {
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



	const handleClickOpen = () => {
		setOpen(true);
	};

	function search(value) {
		// console.log('ceeleded',props.ValueForSearch,searchVal);
		setVal(value)
		// setSearchVal(props.ValueForSearch)
		setData2(data.filter(n => n.username.toLowerCase().includes(value.toLowerCase())))
		console.log(data, 'filterssss');


	}
	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<UserHeader SearchVal={search} />}
				content={<UserTable ValueForSearch={val} dataa={data2} onClose={closeDialog} />}
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
			{open ? <UserDialog isOpen={open} closeDialog={closeDialog} type="Add" data={dialogData} /> : null}


		</>
	);
}

export default withReducer('eCommerceApp', reducer)(Users);