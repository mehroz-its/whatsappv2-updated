import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AgentTableHeader from './AgentTableHeader';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../../../@fuse/core/FuseLoading/FuseLoading'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import AgentDialog from './AgentDialog'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
		padding: '0px'
	},
	content: {
		padding: '0px'
	},
	addButton: {
		position: 'fixed',
		bottom: 80,
		right: 50,
		zIndex: 99
	},
	root2: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 100,
		maxWidth: 150,
		marginTop: '-4',
		minHeight: 10,
		maxHeight: 100,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	largeIcon: {
		height: 22.5,

	},
	addButton: {
		position: 'fixed',
		bottom: 80,
		right: 50,
		zIndex: 99
	},

}))

const PaginationStyle = createMuiTheme({
	overrides: {
		MuiTypography: {
			body2: {
				fontSize: '12px',
				marginTop: '1px'
			}
		}
	}
});


function AgentTable(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false)
	const [type, setType] = React.useState("update")
	const [selected, setSelected] = useState([]);
	const [companyDetails, setCompanyDetails] = React.useState(props.data);
	const [data, setData] = useState([]);
	const [agent, setAgent] = React.useState([]);

	const [data2, setData2] = useState(data);
	const [page, setPage] = useState(0);
	const [searchVal, setSearchVal] = useState(props.ValueForSearch)
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [checked, setChecked] = React.useState(false);
	const [dialogData, setDialogData] = React.useState({
		id: 0,
		name: "",
		description: "",
		begin_dt: null,
		begin_time: null,
		msisdnUrl: "",
		state: false,
		template_id: 0,
		type: null,
		activated: false,
	});
	const [number, SetNumber] = useState(10)
	const handleChange = (event) => {
		SetNumber(event.target.value);
	};
	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('campaigns', 'listing', {
				columns: "*",
				limit: 100,
				orderby: "id",
				page: 0,
				sortby: "ASC",
				values: 1,
				where: "displayed = $1",
			}, null, null, true);
		};
		loadData().then((response) => {
			const tableData = response.data.data.list.data
			setData(tableData)
			setData2(tableData)
		});
	})
	setTimeout(() => {
		setSnackBarOpen(false)
		setSnackBarMessage("")
	}, 3000);
	React.useEffect(() => {
		if (companyDetails) {
			let update_params = {
				key: ':client_id',
				value: companyDetails.id,
				params: {}
			}
			CoreHttpHandler.request('CompanyAgent', 'get', update_params, dataSourceSuccessCompanyAgent, dataSourceFailureCompanyAgent);
		}
		// getData()
	}, []);
	const dataSourceSuccessCompanyAgent = (response) => {
		setAgent(response.data.data.all_agents)
		setData(response.data.data.all_agents)
		console.log("dataSourceSuccessCompanyAgent response", response);
	};
	const dataSourceFailureCompanyAgent = (response) => {
		console.log("dataSourceFailureCompanyAgent response : ", response);
	};

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';
		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}
		setOrder({
			direction,
			id
		});
	}

	function search() {
		setSearchVal(props.ValueForSearch)
		setData2(data.filter(n => n.name.toLowerCase().includes(props.ValueForSearch.toLowerCase())))
	}
	if (searchVal !== props.ValueForSearch) {
		{ search() }
	}
	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(n) {
		setType("update")
		setOpen(true)
		setDialogData(n)
	}
	const handleClickAdd = () => {
		// alert("handleClickAdd")
		setOpen(true);
		setType("Create")
	};
	function handleDialogClose() {
		setDialogData({})
		let update_params = {
			key: ':client_id',
			value: companyDetails.id,
			params: {}
		}
		CoreHttpHandler.request('CompanyAgent', 'get', update_params, dataSourceSuccessCompanyAgent, dataSourceFailureCompanyAgent);
		setOpen(false)
	}
	if (data.length === 0) {
		return (
			<>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						No Data Found
					</Typography>
				</div>
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab
						color="primary"
						aria-label="add"
						size="medium"
						className={classes.addButton}
						onClick={handleClickAdd}
					>
						<Icon>person_add</Icon>
					</Fab>
				</FuseAnimate>
				{open && <AgentDialog isOpen={open} type={type} data={dialogData} clientId={companyDetails.id} closeDialog={handleDialogClose} />}
			</>
		)
	}
	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}
	const toggleChecked = () => {
		setChecked((prev) => !prev);
	};
	const handleClickOpen = () => {
		setDialogData('')
		setOpen(true);
	}
	
	return (
		<>
			<Card className={classes.root}>
				<CardContent className={classes.content} style={{ width: '100%' }}>
					<Typography variant='h2' className='companyDetailHeader'>Agents</Typography>
					<Snackbar
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						open={snackbaropen}
						autoHideDuration={3000}
					>
						<Alert variant="filled" severity={ok}>
							{snackbarmessage}
						</Alert>
					</Snackbar>
					<div className="w-full flex flex-col">
						<FuseScrollbars className="flex-grow overflow-x-auto">
							<Table className="min-w-xl" aria-labelledby="tableTitle">
								<AgentTableHeader
									numSelected={selected.length}
									order={order}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={data.length}
								/>
								<TableBody>
									{_.orderBy(
										data,
										[
											o => {
												switch (order.id) {
													case 'categories': {
														return o.categories[0];
													}
													default: {
														return o[order.id];
													}
												}
											}
										],
										[order.direction]
									)
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((n, i) => {
											const isSelected = selected.indexOf(n.id) !== -1;
											return (
												<TableRow
													className="h-10 cursor-pointer"
													hover
													role="checkbox"
													aria-checked={isSelected}
													tabIndex={-1}
													key={n.id}
													selected={isSelected}
													onClick={event => handleClick(n)}
												>
													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.id}
													</TableCell>
													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.username}
													</TableCell>

													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.number}
													</TableCell>
													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.email}
													</TableCell>
													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.position}
													</TableCell>

													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.max_token_count === 1 ? "Agent" : "Admin"}
													</TableCell>
													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.enabled === true ?
															<div>	<Icon name='lock' color='primary'>check_circle</Icon></div> :
															<div>	<Icon name='lock'>radio_button_unchecked</Icon></div>}
														{/* <FormControlLabel
															style={{ marginLeft: '2px' }}
															control={
																<Switch
																	checked={n.enabled}
																	onChange={toggleChecked}
																	name="checkedB"
																	color="primary"
																	size="small" />
															}
														/> */}
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</FuseScrollbars>
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Fab
								color="primary"
								aria-label="add"
								size="medium"
								className={classes.addButton}
								onClick={handleClickAdd}
							>
								<Icon>person_add</Icon>
							</Fab>
						</FuseAnimate>
						<TablePagination
							classes={{
								root: 'overflow-hidden',
								spacer: 'w-0 max-w-0',
								actions: 'text-64',
								select: 'text-12',
							}}
							className="overflow-hidden"
							component="div"
							count={data.length}
							style={{ fontSize: '12px' }}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
						{open && <AgentDialog isOpen={open} type={type} data={dialogData} clientId={companyDetails.id} closeDialog={handleDialogClose} />}
					</div>
				</CardContent>
			</Card>
		</>
	);
}

export default withRouter(AgentTable);