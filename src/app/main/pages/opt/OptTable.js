import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';
import OptTableHead from './OptTableHead';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ContactsTablePaginationActions from '../setting/canned/ContactsTablePaginationActions';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading';
import OptDialog from './OptDialog';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

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

function OptTable(props) {
	function displayError(msg) {
		props.showError(msg);
	}
	function closeDialog(val) {
		setOpen(false);
		setDeleteDialog(false);
		props.onClose(val);
	}
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = useState([]);
	const  startDate = moment(new Date());
	let startDateMoment = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
	console.log("startDate" , startDateMoment);
	const { rowsPerPage, currentPage, setLimit, totalItems, setPage, isLoading } = props;

	const [deleteDialogData, setDeleteDialogData] = React.useState({});
	const [deleteDialog, setDeleteDialog] = React.useState(false);

	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [dialogData, setDialogData] = useState({
		enabled: '',
		id: '',
		username: '',
		position: '',
		email: '',
		number: '',
		roles: []
	});
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
	function handleClick(n) {
		setOpen(true);
		setDialogData({
			enabled: n.enabled,
			id: n.id,
			username: n.username,
			position: n.position,
			email: n.email,
			number: n.number,
			roles: n.roles
		});
	}
	let data2 = props.dataa;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setLimit(Number(event.target.value));
	};

	const hadleDelete = (event, n) => {
		event.stopPropagation();
		setDeleteDialog(true);
		setDeleteDialogData(n);
		return;
		CoreHttpHandler.requestCustomer(
			'users',
			'delete',
			{
				key: ':id',
				value: n.id
			},
			response => {
				closeDialog('delete');
			},
			error => {
				closeDialog(error.response.data.message);
			}
		);
	};

	if (isLoading) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	} else if (data2.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					No Data Found
				</Typography>
			</div>
		);
	} else {
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table className="min-w-xl" aria-labelledby="tableTitle">
						<OptTableHead
							numSelected={selected.length}
							order={order}
							// onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={data2.length}
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
							).map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								let duration = moment.duration(startDate.diff(n.dt));
								let asMilliseconds = duration.asMilliseconds();
								return (
									<TableRow
										className="h-10 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										// onClick={event => handleClick(n)}
									>
										<TableCell
											component="th"
											scope="row"
											align="center"
											style={{ fontSize: '12px', padding: '10px' }}
										>
											{n.id}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											align="center"
											style={{ fontSize: '12px', padding: '10px' }}
										>
											{n.wt_num}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											align="center"
											style={{ fontSize: '12px', padding: '10px' }}
										>
											{n.short_code}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											align="center"
											style={{ fontSize: '12px', padding: '10px' }}
										>
											{n.redeem === null || n.redeem === false ? 
												asMilliseconds < 2700000  ?
												// <IconButton color="secondary" aria-label="add an alarm">
												(<IconButton color="secondary" aria-label="add an alarm" onClick={()=>props.reedem(n.id)}>
													<Icon className="text-green text-16">check_circle</Icon>
												</IconButton>) :  (
												<Icon className="text-red text-16">cancel</Icon>
											)
											 : (
												<Icon className="text-red text-16">cancel</Icon>
											)}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											align="center"
											style={{ fontSize: '12px', padding: '10px' }}
										>
											{moment(n.dt).format('YYYY-MM-DD HH:mm:ss')}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											align="center"
											style={{ fontSize: '12px', padding: '10px' }}
										>
											{  asMilliseconds >= 2700000 || n.redeem === true ? (
												<Icon className="text-red text-16">cancel</Icon>
											) : (
												<Icon className="text-green text-16">check_circle</Icon>
												
											)}
										</TableCell>
										{/* <TableCell className="w-64 text-center" padding="none">
											{
												n.enabled?
														null
													:
														<Icon onClick={event => hadleDelete(event, n)} className="text-16">delete_outline</Icon>
											}
											</TableCell> */}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</FuseScrollbars>
				<MuiThemeProvider theme={PaginationStyle}>
					<TablePagination
						style={{ fontSize: '12px' }}
						classes={{
							root: 'overflow-hidden',
							spacer: 'w-0 max-w-0',
							actions: 'text-64',
							select: 'text-12 mt-4',
							selectIcon: 'mt-4'
						}}
						className="overflow-hidden"
						component="div"
						rowsPerPageOptions={[10, 25, 50, { label: 'All', value: totalItems }]}
						count={totalItems}
						rowsPerPage={rowsPerPage}
						page={currentPage}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						ActionsComponent={ContactsTablePaginationActions}
					/>
				</MuiThemeProvider>
				{open ? (
					<OptDialog
						isOpen={open}
						closeDialog={closeDialog}
						displayError={displayError}
						type="Update"
						data={dialogData}
					/>
				) : null}
				{deleteDialog && (
					<OptDialog
						path="users"
						method="delete"
						isOpen={deleteDialog}
						type="Delete"
						closeDialog={closeDialog}
						data={deleteDialogData}
					/>
				)}
			</div>
		);
	}
}

export default withRouter(OptTable);
