import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles, ThemeProvider, createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import ContactsTablePaginationActions from '../../setting/canned/ContactsTablePaginationActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from './store/actions';
import RolesTableHead from './RolesTableHead';
import TableData from './RolesData'
import RolesDialog from './RolesDialog'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'

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

function RolesTable(props) {
	function closeDialog(val) {
		setOpen(false)
		props.onClose(val)
	}
	const dispatch = useDispatch();
	const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [searchVal, setSearchVal] = useState(props.ValueForSearch)
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [dialogData, setDialogData] = useState({
		enabled: '',
		id: '0',
		name: '',
		description: '',
		permission: []
	})
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	let data2 = props.dataa
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
	let loadPermissions = () => {
		return CoreHttpHandler.request('permissions', 'listing', {
			columns: "id, title",
			sortby: "ASC",
			orderby: "id",
			where: "displayed = $1",
			values: true,
			page: 0,
			limit: 0
		}, null, null, true);
	};
	function handleClick(n) {
		setOpen(true)
		setDialogData({
			enabled: n.enabled,
			id: n.id,
			name: n.name,
			description: n.description,
			permission: n.permissions
		})
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
	const hadleDelete = (event, n) => {
		event.stopPropagation()
		console.log(n, 'eventtt')
		CoreHttpHandler.requestCustomer('roles', 'delete',
			{
				key: ':id',
				value: n.id
			}
			, (response) => {
				// console.log(response)
				closeDialog("delete")
				// setopenDialog(false);
			}, (error) => {
				closeDialog(error.response.data.message)
				// setopenDialog(false);

			});
	}
	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
					<RolesTableHead
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
										{/* <TableCell className="w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell> */}
										<TableCell component="th" scope="row" align="center" style={{ fontSize: '12px', padding: '10px' }}>
											{n.id}
										</TableCell>
										<TableCell component="th" scope="row" align="center" style={{ fontSize: '12px', padding: '10px' }}>
											{n.name}
										</TableCell>
										<TableCell component="th" scope="row" align="center" style={{ fontSize: '12px', padding: '10px' }}>
											{n.description}
										</TableCell>

										<TableCell component="th" scope="row" align="center" style={{ fontSize: '12px', padding: '10px' }}>
											{n.enabled ? (
												<Icon className="text-green text-16">check_circle</Icon>
											) : (
													<Icon className="text-red text-16">cancel</Icon>
												)}
										</TableCell>
										<TableCell className="w-64 text-center" padding="none">
											<Icon onClick={event => hadleDelete(event, n)} className="text-16">delete_outline</Icon>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>
			<MuiThemeProvider theme={PaginationStyle}>
				<TablePagination
					className="overflow-hidden"
					component="div"
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
					count={data2.length}
					style={{ fontSize: '12px' }}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					ActionsComponent={ContactsTablePaginationActions}
				/>
			</MuiThemeProvider>
			{open ? <RolesDialog isOpen={open} closeDialog={closeDialog} type="Update" data={dialogData} /> : null}
		</div>
	);
}

export default withRouter(RolesTable);
