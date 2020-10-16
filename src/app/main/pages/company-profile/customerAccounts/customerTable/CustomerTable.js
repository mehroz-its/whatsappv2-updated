import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import CampaignTableHead from './CustomerTableHead';
import ContactsTablePaginationActions from '../../../setting/canned/ContactsTablePaginationActions';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CampaignDialog from './CampaignDialog'
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
			}
		}
	}
});

function CampaignTable(props) {
	const [open, setOpen] = React.useState(false)
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(props.clients);
	const [data2, setData2] = useState(props.clients);
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

	setTimeout(() => {
		setSnackBarOpen(false)
		setSnackBarMessage("")
	}, 3000);
	React.useEffect(() => {
		// getData()
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
		props.history.push({ pathname: '/apps/company-details', data: n });
	}

	if (data.length === 0) {
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

	function handleChangePage(event, value) {
		setPage(value);
	}
	function handleDialogClose() {
		setOpen(false)
	}
	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}
	const toggleChecked = (event, id) => {
		console.log("event :,", event.target.checked, "id :", id);
		let data = {
			enabled: event.target.checked,
			id: id
		}
		props.onchange(data)
		event.stopPropagation()
		// setChecked((prev) => !prev);
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
			{props.clients.filter((item) => {
				return item.id.includes(props.searchValue) || item.comapny.toLowerCase().includes(props.searchValue.toLowerCase()) || item.number.includes(props.searchValue) || item.email.toLowerCase().includes(props.searchValue.toLowerCase()) || item.phone.includes(props.searchValue) || item.dt.includes(props.searchValue)
			}).length ?
				<div className="w-full flex flex-col">
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
									props.clients,
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
									.filter((item) => {
										return props.searchValue ? item.id.includes(props.searchValue) || item.comapny.toLowerCase().includes(props.searchValue.toLowerCase()) || item.number.includes(props.searchValue) || item.email.toLowerCase().includes(props.searchValue.toLowerCase()) || item.phone.includes(props.searchValue) || item.dt.includes(props.searchValue) : true
									})
									.map((n, i) => {
										const isSelected = selected.indexOf(n.id) !== -1;
										return (
											<TableRow
												className="h-10 cursor-pointer"
												hover
												role="checkbox"
												aria-checked={isSelected}
												tabIndex={-1}
												key={i}
												selected={isSelected} >
												<TableCell onClick={event => handleClick(n)} component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.id}
												</TableCell>
												<TableCell onClick={event => handleClick(n)} component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.comapny}
												</TableCell>
												<TableCell onClick={event => handleClick(n)} component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.number}
												</TableCell>
												<TableCell onClick={event => handleClick(n)} component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.email}
												</TableCell>
												<TableCell onClick={event => handleClick(n)} component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.phone}
												</TableCell >
												{<TableCell onClick={event => handleClick(n)} component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.dt === null ? 'N/A' : n.dt}
												</TableCell>}
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													<FormControlLabel
														style={{ marginLeft: '2px' }}
														control={
															<Switch
																checked={n.enabled}
																onChange={(e) => toggleChecked(e, n.id)}
																name="checkedB"
																color="primary"
																size="small" />
														}
													/>
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>

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
					{open && <CampaignDialog isOpen={open} type='Update Campaign' data={dialogData} closeDialog={handleDialogClose} />}
				</div> : <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><h1 style={{ color: "gray" }}>Data Not Found</h1></div>
			}

		</>
	);
}
export default withRouter(CampaignTable);