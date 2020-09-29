import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, {  useState } from 'react';
import { withRouter } from 'react-router-dom';
import {createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import TemplateTableHead from './TemplateTableHead';
import TemplateDialog from './TemplateDialog'
import ContactsTablePaginationActions from '../../setting/canned/ContactsTablePaginationActions';
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
import Typography from '@material-ui/core/Typography';

const PaginationStyle = createMuiTheme({
	overrides: {
		MuiTypography: {
		body2: {
			fontSize:'12px',
			marginTop:'1px'
		}
	  }
	}
  });

function TemplateTable(props) {
	let data2 = props.dataa
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [open, setOpen] = React.useState(false)
	const [dialogData, setDialogData] = React.useState({ name: '', params: '' })
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
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

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleRowClick(n) {
		setOpen(true)
		setDialogData({ name: n.template_name, params: n.template_text })
	}
	function handleClose() {
		setOpen(false)
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
					<TemplateTableHead
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
										onClick={event => handleRowClick(n)}
									>

										<TableCell component="th" scope="row" align="center" style={{fontSize:'11px',padding:'10px'}}>
											{n.id}
										</TableCell>
										<TableCell component="th" scope="row" align="center" style={{fontSize:'11px',padding:'10px'}}>
											{n.template_name}
										</TableCell>
										<TableCell component="th" scope="row" align="center" style={{fontSize:'11px',padding:'10px'}}>
											{n.template_text}
										</TableCell>
										{n.params === null ? (<TableCell component="th" scope="row" align="center" style={{fontSize:'11px',padding:'10px'}}>
											{n.template_params}
										</TableCell>) :
											(<TableCell component="th" scope="row" align="center" style={{fontSize:'11px',padding:'10px'}}>
												Null
											</TableCell>)}
										<TableCell component="th" scope="row" align="center" style={{fontSize:'11px',padding:'10px'}}>
											{n.template_type}
										</TableCell>
										<TableCell component="th" scope="row" align="center" style={{fontSize:'11px',padding:'10px'}}>
											{n.approved ? (
												<Icon className="text-green text-16">check_circle</Icon>
											) : (
													<Icon className="text-red text-16">cancel</Icon>
												)}
										</TableCell>
										<TableCell component="th" scope="row" align="center" style={{fontSize:'11px',padding:'10px'}}>
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
			<MuiThemeProvider theme={PaginationStyle}>
			<TablePagination
							classes={{
								root: 'overflow-hidden',
								spacer: 'w-0 max-w-0',
								actions:'text-64',
								select:'text-12 mt-4',
								 selectIcon:'mt-4',
							}}			
				className="overflow-hidden"
				component="div"
				style={{fontSize:'12px'}}
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				ActionsComponent={ContactsTablePaginationActions}
			/>
			</MuiThemeProvider>
			{open && <TemplateDialog type="Update Template" isOpen={open} closeDialog={handleClose} data={dialogData} />}
		</div>
	);
}

export default withRouter(TemplateTable);
