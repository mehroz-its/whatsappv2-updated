import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import CampaignTableHead from './CampaignTableHead';
import ContactsTablePaginationActions from '../../setting/canned/ContactsTablePaginationActions';
import {  createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CampaignDialog from './CampaignDialog'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import TableData from '../CampaignData'

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
	const [data, setData] = useState(TableData);
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
		if (n.completed) {
			setSnackBarMessage("Completed campaigns can not be edited")
			setOK("success")
			setSnackBarOpen(true)
		} else {
			setDialogData({
				id: n.id,
				name: n.name,
				description: n.description,
				begin_dt: n.begin_dt,
				msisdnUrl: null,
				template_id: n.template_id,
				type: "update",
				state: true,
				activated: n.activated
			});
			setOpen(true)
		}
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
	

	function handleChangePage(event, value) {
		setPage(value);
	}
	function handleDialogClose() {
		setOpen(false)
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}
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
												{n.activated ? (
													<Icon className="text-green text-16">check_circle</Icon>
												) : (
														<Icon className="text-red text-16">cancel</Icon>
													)}
											</TableCell>
											<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
												{n.progress ? (
													<Icon className="text-green text-16">check_circle</Icon>
												) : (
														<Icon className="text-red text-16">cancel</Icon>
													)}
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
											<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
												{n.completed ? (
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

				{open && <CampaignDialog isOpen={open} type='Update Campaign' data={dialogData} closeDialog={handleDialogClose} />}
			</div>
		</>
	);
}
export default withRouter(CampaignTable);