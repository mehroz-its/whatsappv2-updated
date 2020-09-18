import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CampaignTableHead from './CustomerTableHead';
import ContactsTablePaginationActions from '../../../setting/canned/ContactsTablePaginationActions';
import { makeStyles, ThemeProvider, createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import CampaignDialog from './CampaignDialog'
import CoreHttpHandler from '../../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../../@fuse/core/FuseLoading/FuseLoading'
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';




const PaginationStyle = createMuiTheme({
	overrides: {
		MuiTypography: {
			body2: {
				fontSize: '12px',
				marginTop: '1px'

				//   "&:last-child": {
				// 	paddingRight: 5
				//   }
			}
		}
	}
});


function CampaignTable(props) {
	console.log(props)
	// const dispatch = useDispatch();
	// const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
	// const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);
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
			console.log(tableData)
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

	// useEffect(() => {
	// 	dispatch(Actions.getProducts());
	// }, [dispatch]);

	// useEffect(() => {
	// 	if (searchText.length !== 0) {
	// 		setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
	// 		setPage(0);
	// 	} else {
	// 		setData(products);
	// 		console.log(products,'here in prdoducts table')
	// 	}
	// }, [products, searchText]);

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
		console.log('ceeleded', props.ValueForSearch, searchVal);

		setSearchVal(props.ValueForSearch)
		setData2(data.filter(n => n.name.toLowerCase().includes(props.ValueForSearch.toLowerCase())))
		console.log(data, 'filterssss');


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
		props.history.push({ pathname: '/apps/company-details', data: n });
	}

	if (data2.length === 0) {
		if (props.ValueForSearch !== '') {
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
		console.log("hhe");
		setOpen(false)
	}


	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	const toggleChecked = () => {
		setChecked((prev) => !prev);
	};
	return (
		<>

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
					<TableContainer component={Paper}>

						<Table className="min-w-xl" aria-labelledby="tableTitle">
							<CampaignTableHead
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
										console.log(n, 'i am in table')
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

												{/* <TableCell className="w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell> */}
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
													{n.activated ? (
														<Icon className="text-green text-16">check_circle</Icon>
													) : (
															<Icon className="text-red text-16">cancel</Icon>
														)}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{/* {n.progress ? ( 
												<Icon className="text-green text-16">check_circle</Icon>
											) : (
													<Icon className="text-red text-16">cancel</Icon>
												)} */}
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
													// label="Primary"
													/>
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.consumers}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.success}
												</TableCell >
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.failures}
												</TableCell>
												{/* <TableCell component="th" scope="row" align="center" style={{fontSize:'11px',padding:'10px'}}>
											{n.dtu}
									
										</TableCell> */}
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.completed ? (
														<Icon className="text-green text-16">check_circle</Icon>
													) : (
															<Icon className="text-red text-16">cancel</Icon>
														)}
												</TableCell>
												{/* 
										<TableCell component="th" scope="row" align="center">
											{n.quantity}
											<i
												className={clsx(
													'inline-block w-8 h-8 rounded mx-8',
													n.quantity <= 5 && 'bg-red',
													n.quantity > 5 && n.quantity <= 25 && 'bg-orange',
													n.quantity > 25 && 'bg-green'
												)}
											/>
										</TableCell> */}

												{/* <TableCell component="th" scope="row" align="center">
											{n.active ? (
												<Icon className="text-green text-20">check_circle</Icon>
											) : (
													<Icon className="text-red text-20">remove_circle</Icon>
												)}
										</TableCell> */}
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
				</FuseScrollbars>
				<MuiThemeProvider theme={PaginationStyle}>
					<TablePagination
						classes={{
							root: 'overflow-hidden',
							spacer: 'w-0 max-w-0',
							actions: 'text-64',
							select: 'text-12 mt-4',
							selectIcon: 'mt-4',
							// input:'text-64',
							// menuItem:'text-64',
							// toolbar:'text-64',
							// selectRoot:'text-64'
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

				{open && <CampaignDialog isOpen={open} type='Update Campaign' data={dialogData} closeDialog={handleDialogClose} />}
			</div>
		</>
	);
}

export default withRouter(CampaignTable);