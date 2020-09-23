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
import CannedTableHead from './CannedTableHead';
import CannedDialog from './CannedDialog'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
import Typography from '@material-ui/core/Typography';
function CannedTable(props) {
	const [data, setData] = useState(props.dataa);
	const [selected, setSelected] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [dialogData, setDialogData] = React.useState(
		{ enable: true, id: '', name: '', type: 'text', text: '', url: '', attachment_type: '', file_name: '' }
	)
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
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
	const handleClose = (val) => {
		setOpen(false);
		props.onClose(val)
	};
	const handleClickOpen = () => {
		setOpen(true);
	}
	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}
	function handleClick(n) {
		setDialogData({ enable: n.enabled, id: n.id, name: n.message_name, type: n.message_type, text: n.message_text, url: n.attachment_url, attachment_type: n.attachment_type, file_name: n.attachment_name })
		props.onClickOpen()
		handleClickOpen()
	}
	function handleChangePage(event, value) {
		setPage(value);
	}
	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
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
	return (
		<div className="w-full flex flex-col" >
			<FuseScrollbars className="flex-grow overflow-x-auto" >
				<Table className="min-w-xl" aria-labelledby="tableTitle" >
					<CannedTableHead
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
										className="h-6 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
										<TableCell component="th" scope="row" style={{ fontSize: '12px' }}
										>
											{n.id}
										</TableCell>
										<TableCell style={{ fontSize: '12px' }} component="th" scope="row">
											{n.message_name}
										</TableCell>
										<TableCell style={{ fontSize: '12px' }} component="th" scope="row">
											{n.message_text}
										</TableCell>
										<TableCell style={{ fontSize: '12px' }} component="th" scope="row" align="right">
											{n.message_params}
										</TableCell>
										<TableCell style={{ fontSize: '12px' }} component="th" scope="row" align="right">
											{n.message_type}
										</TableCell>
										<TableCell style={{ fontSize: '12px' }} component="th" scope="row" align="right">
											{n.enabled ? (
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
			{open && <CannedDialog isOpen={open} type="Update Canned Message" closeDialog={handleClose} data={dialogData} />}
		</div>
	);
}
export default withRouter(CannedTable);	