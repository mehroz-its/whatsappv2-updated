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
import BlockTableHead from './BlockListTableHead';
import BlockDialog from './BlockListDialog'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
function BlockTable() {
	const [selected, setSelected] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [dialogData, setDialogData] = React.useState(
		{ id: '', number: '' })
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('contact_book', 'listing', {
				limit: 100,
				page: 0,
				columns: "*",
				sortby: "DESC",
				orderby: "id",
				where: "blocked = $1",
				values: true,
			}, null, null, true);
		};
		loadData().then((response) => {
			const tableData = response.data.data.list.data
			setData(tableData)
		});
	})
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
	const handleClose = () => {
		getData()
		setOpen(false);
	};
	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}
	function handleClick(n) {
		setDialogData({ id: n.id, number: n.number })
		setOpen(true);
	}
	function handleChangePage(event, value) {
		setPage(value);
	}
	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}
	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
					<BlockTableHead
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
							.map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
										<TableCell component="th" scope="row" >
											{n.id}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.name}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.number}
										</TableCell>
										<TableCell component="th" scope="row" align="left">
											{n.reason}
										</TableCell>
										<TableCell component="th" scope="row" align="left">
											{n.dt}
										</TableCell>
										<TableCell component="th" scope="row" align="center">
											{n.blocked ? (
												<Icon className="text-green text-20">check_circle</Icon>
											) : (
													<Icon className="text-red text-20">cancel</Icon>
												)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>
			<TablePagination
				className="overflow-hidden"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
			{open && <BlockDialog isOpen={open} type="Update" closeDialog={handleClose} getUpdatedData={getData} data={dialogData} />}
		</div>
	);
}
export default withRouter(BlockTable);	