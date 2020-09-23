import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContactTableHeader from './ContactTableHeader';
import ContactsTablePaginationActions from '../../../../setting/canned/ContactsTablePaginationActions';
import { makeStyles, ThemeProvider, createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../../../@fuse/core/FuseLoading/FuseLoading'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ContactDialog from './ContactDialog'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
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


function ContactTable(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false)
	const [selected, setSelected] = useState([]);
	const [mainTab, setMainTab] = useState(0);
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
	function handleChangeTabMain(event, value) {
		setMainTab(value);
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
					<div className='companyDetailHeaderTabs'>
						<Tabs
							value={mainTab}
							onChange={handleChangeTabMain}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="off"
							className="w-full border-b-1 px-100 text-center h-48 "
							style={{ marginBottom: '8px' }}
						>
							<Tab
								style={{ marginTop: '0.2%' }}
								className="text-12 font-600 normal-case" label="Contacts" />
							<Tab
								style={{ marginTop: '0.2%' }}
								className="text-12 font-600 normal-case" label="Contact Group" />
							<Tab
								style={{ marginTop: '0.2%' }}
								className="text-12 font-600 normal-case" label="Blocked Contacts" />
						</Tabs>
					</div>
					<Snackbar

						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						open={snackbaropen}
						autoHideDuration={3000}

					>
						<Alert variant="filled" severity={ok}>
							{snackbarmessage}
						</Alert>
					</Snackbar>

					<div style={{ flexDirection: 'row', flex: 1, display: 'flex', paddingLeft: '14px' }}>
						<FormControl className={classes.formControl}>
							<Select
								value={number}
								onChange={handleChange}
								displayEmpty
								className={classes.selectEmpty}
								inputProps={{ 'aria-label': 'Without label' }}
							>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={25}>25</MenuItem>
								<MenuItem value={50}>50</MenuItem>
							</Select>
						</FormControl>
						<div style={{ marginTop: '20px' }}>
							<Button
								size='small'
								variant="contained"
								style={{ borderRadius: 0 }}
							>
								Export
            </Button>
							<Button
								style={{ marginLeft: '-4px', paddingTop: '10px' }}
								size='small'
								variant="contained"
								style={{ borderRadius: 0 }}
							>
								<Icon
									fontSize="small"
									className={classes.largeIcon}
								>send</Icon>
							</Button>
						</div>
					</div>

					<div className="w-full flex flex-col">
						<FuseScrollbars className="flex-grow overflow-x-auto">
							<Table className="min-w-xl" aria-labelledby="tableTitle">
								<ContactTableHeader
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
													<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
														{n.activated ? (
															<Icon className="text-green text-16">check_circle</Icon>
														) : (
																<Icon className="text-red text-16">cancel</Icon>
															)}
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</FuseScrollbars>
						<MuiThemeProvider theme={PaginationStyle}>
							<TablePagination
								classes={{
									root: 'overflow-hidden',
									spacer: 'w-0 max-w-0',
									actions: 'text-64',
									select: 'text-12 mt-4',
									selectIcon: 'mt-4',
								}}
								className="overflow-hidden"
								component="div"
								count={data.length}
								style={{ fontSize: '12px' }}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={ContactsTablePaginationActions}
							/>
						</MuiThemeProvider>
						{open && <ContactDialog isOpen={open} type='Update Campaign' data={dialogData} closeDialog={handleDialogClose} />}
					</div>
				</CardContent>
			</Card>
		</>
	);
}
export default withRouter(ContactTable);