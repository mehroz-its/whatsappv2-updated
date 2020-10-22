import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ContactsTablePaginationActions from '../../setting/canned/ContactsTablePaginationActions';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AgentTableHead from './AgentTableHead';
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

function AgentTable(props) {
	const [selected, setSelected] = useState([]);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	const { rowsPerPage, currentPage, setLimit, totalItems, setPage, isLoading } = props;

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

	const handleChangeRowsPerPage = event => {
		setLimit(Number(event.target.value));
		// setPageSize(Number(event.target.value));

	};
	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	// if (data2.length === 0) {
	// 	return (
	// 		<div className="flex flex-1 items-center justify-center h-full">
	// 			<FuseLoading />
	// 		</div>
	// 	);
	// }

	function handleClick(n) {




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
		<>	{
			data.filter((item) => {
				return item.agent_name.toLowerCase().includes(props.SearchVal.toLowerCase())
			}).length ?
				<div className="w-full flex flex-col">
					<FuseScrollbars className="flex-grow overflow-x-auto">


						<Table className="min-w-xl" aria-labelledby="tableTitle">
							<AgentTableHead
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
									.filter((item) => {
										// return props.SearchValue ? item.agent_name.toLowerCase().includes(props.SearchValue.toLowerCase()) : true
										return props.SearchVal ? item.agent_name.toLowerCase().includes(props.SearchVal.toLowerCase()) : true
									})
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
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.agent_id}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.agent_name}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.inbound}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.outbound}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.total_engagement_count}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.total_chat_count}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.responsetime}
												</TableCell>
												<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
													{n.account_status}
												</TableCell>

												{/* <TableCell component="th" scope="row" align="right">
											{n.progress ? (
												<Icon className="text-red text-20">check_circle</Icon>
												) : (
													<Icon className="text-green text-20">remove_circle</Icon>
												)}
										</TableCell>
										<TableCell component="th" scope="row" align="right">
											{n.consumers}
										</TableCell>
										<TableCell component="th" scope="row" align="right">
											{n.success}
										</TableCell>
										<TableCell component="th" scope="row" align="right">
											{n.failure}
										</TableCell>
										<TableCell component="th" scope="row" align="right">
											{n.lastUpdated}
										</TableCell> */}
												{/* 
										<TableCell component="th" scope="row" align="right">
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

												{/* <TableCell component="th" scope="row" align="right">
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

							rowsPerPageOptions={[10, 25, 50, { label: 'All', value: totalItems }]}
							count={totalItems}
							rowsPerPage={rowsPerPage}
							page={currentPage}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={ContactsTablePaginationActions}
						/>
					</MuiThemeProvider>
				</div> : <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center", width: "100%" }}>
					<h1 style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>No Data Found</h1>
					{/* <FuseLoading /> */}
				</div>
		}
		</>
	);
}

export default withRouter(AgentTable);
