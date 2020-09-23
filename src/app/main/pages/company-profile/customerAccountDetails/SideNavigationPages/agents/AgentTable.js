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
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
		padding: '0px'
	},
	content: {
		padding: '0px'
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
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
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
		getData()
	}, []);
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
		setOpen(true)
		setDialogData(n)
	}
	if (data2.length === 0) {
		if (props.ValueForSearch === '') {
			return (
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						No Data Found
					</Typography>
				</div>
			)
		} else {
			return (
				<div className="flex flex-1 items-center justify-center h-full">
					<FuseLoading />
				</div>
			);
		}
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
	function handleDialogClose() {
		setOpen(false)
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
										data2,
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
										.map(n => {
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
														{n.name}
													</TableCell>
													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.description}
													</TableCell>
													{<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.begin_dt === null ? 'N/A' : n.begin_dt}
													</TableCell>}
													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														<FormControlLabel
															style={{ marginLeft: '2px' }}
															control={
																<Switch
																	checked={checked}
																	onChange={toggleChecked}
																	name="checkedB"
																	color="primary"
																	size="small"

																/>
															}
														/>
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</FuseScrollbars>
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
						{open && <AgentDialog isOpen={open} type='Update Agent' data={dialogData} closeDialog={handleDialogClose} />}
					</div>
				</CardContent>
			</Card>
		</>
	);
}

export default withRouter(AgentTable);