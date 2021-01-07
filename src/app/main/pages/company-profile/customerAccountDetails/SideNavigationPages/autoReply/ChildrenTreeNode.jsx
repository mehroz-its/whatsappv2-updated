import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DraftsIcon from '@material-ui/icons/Drafts';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WorkIcon from '@material-ui/icons/Work';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import ChildrenTableHead from "./ChildrenTableHead";
import _ from '@lodash';

import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

const theme = createMuiTheme({
	palette: {
		primary: green
	}
});

const useStyles = makeStyles(theme => ({
	addButton: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330
	},
	margin: {
		color: 'white',
		paddingLeft: '14px',
		fontWeight: 'bold',
		paddingRight: '14px',
		paddingTop: '5px',
		paddingBottom: '5px',
		fontSize: '12px'
	}
}));

export default class ChildrenTreeNode extends Component {
	constructor(props) {
		super(props);

	}
	state = {
		data: [],
		errors: {}

	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({errors:{}},()=>{
			let _data = this.state.data;
			let errors = {}
			for (let i = 0; i < _data.length; i++) {
				let dataCheck = _data.filter(el => el.key == _data[i].key && _data[i].id !== el.id)
	
				if (dataCheck && dataCheck.length) {
					for (let j = 0; j < dataCheck.length; j++) {
						if(dataCheck[j].key){
							errors[dataCheck[j].id] = "Duplicate Key"
						}
					}
				}
			}	
	
			if (Object.keys(errors) && Object.keys(errors).length) {
				this.setState({ errors })
			} else {
	
				_data.map(el => {
					delete el.title
					return el
				})
	
				this.props.submitNode(_data)
			}
		})
		

	}

	onInputChange = (id, e) => {
		e.preventDefault()
		let _data = this.state.data;

		let index = _data.findIndex((el => el.id == id));

		console.log("INDEX", index)
		if (index >= 0) {
			_data[index].key = e.target.value
			console.log("_data", _data)
			this.setState({ data: _data })
		}
	}
	componentDidMount() {

		const { childrenTreeNode, closeDialog, submitNode } = this.props;
		const { node } = childrenTreeNode;
		const { children } = node;

		let _data = [];
		if (children && children.length) {

			_data = children.map(el => {
				return { title: el.title, key: null, id: el.id }
			})
			let _ref = node.__ref;
			// { id,key}
			if (!_ref) {
				_ref = []
			}

			if (_ref && _ref.length) {
				for (let i = 0; i < _ref.length; i++) {
					if (_ref[i].id && _ref[i].key) {
						let index = _data.findIndex((el => el.id == _ref[i].id));
						_data[index].key = _ref[i].key
					}
				}
			}
		}

		this.setState({ data: _data })
	}
	handleDialogClose = () => {
		this.props.closeDialog()
	}

	render() {
		const { data, errors } = this.state;

		return (
			<Dialog
				open={true}
				onClose={this.handleDialogClose}
				aria-labelledby="form-dialog-title"
				classes={{
					paper: 'm-24'
				}}
				style={{ marginTop: '2%' }}
				fullWidth
				maxWidth="xs"
			>
				<AppBar position="static" elevation={1}>
					<div
						className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
						style={{ paddingBottom: 20, paddingTop: 20 }}
					>
						Link Children
				</div>
				</AppBar>
				<DialogContent classes={{ root: 'p-24' }}>

					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Title</TableCell>
									<TableCell align={"center"}>Key</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((el) => (
									<TableRow key={el.id}>
										<TableCell component="th" scope="row">
											{el.title}
										</TableCell>
										<TableCell align="right">

											<TextField
												key={el.id}
												className="mb-24"
												id={"key_" + el.id}
												name="key"
												value={el.key}
												variant="outlined"
												fullWidth
												onChange={(e) => { this.onInputChange(el.id, e) }}
												size="small"

												error={errors[el.id]}
												helperText={errors[el.id] ? errors[el.id] : ""}

											/>
										</TableCell>

									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
				<DialogActions>
					<div className="px-16 my-10">
						<Button variant="contained" onClick={this.handleDialogClose} color="primary" size="small">
							Cancel
					</Button>
					</div>
					{
						data && data.length ?

							<ThemeProvider theme={theme}>

								<div className="mx-32 md:mx-24 my-10">
									<Button
										style={{
											color: 'white',
											paddingLeft: '14px',
											fontWeight: 'bold',
											paddingRight: '14px',
											paddingTop: '5px',
											paddingBottom: '5px',
											fontSize: '12px'
										}}
										size="small"
										variant="contained"
										onClick={this.handleSubmit}
										color="primary"
									>
										Update
							</Button>
								</div>
							</ThemeProvider>

							: null
					}
				</DialogActions>
			</Dialog>
		)
	}
}


