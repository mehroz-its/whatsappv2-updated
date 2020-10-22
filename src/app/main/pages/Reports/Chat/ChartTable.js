import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import ContactsTablePaginationActions from '../../setting/canned/ContactsTablePaginationActions';
import Typography from '@material-ui/core/Typography';
import ChartTableHead from './ChartTableHead';
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'

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

function ChartTable(props) {

	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});


	let data = props.data
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

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}
	function handleClick(n) {

	}


	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (data.length === 0) {
		if (props.val !== '') {
			return (
				<div
					style={{ alignItems: 'flex-end', flex: 1, marginTop: '30%' }}
					className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						No Data Found
					</Typography>
				</div>
			)
		} else {
			return (
				<div
					style={{ alignItems: 'flex-end', flex: 1, marginTop: '30%' }}
					className="flex flex-1 items-center justify-center h-full">
					<FuseLoading />
				</div>
			);
		}
	}
	return (

		<>
			{  data.filter((item) => {
				return item.date.includes(props.val)
			}).length ?
				< div className="w-full flex flex-col">
					<FuseScrollbars className="flex-grow overflow-x-auto">
						<Table className="min-w-xl" aria-labelledby="tableTitle">
							<ChartTableHead
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
									.filter((item) => {
										return props.val ? item.date.includes(props.val) : true
									}).map(n => {
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
													{n.date}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.inbound}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.outbound}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.engagements}
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
				</div> : <div style={{ display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center" }}><h1>Data Not Found</h1></div>
			}

		</>
	);
}

export default withRouter(ChartTable);
