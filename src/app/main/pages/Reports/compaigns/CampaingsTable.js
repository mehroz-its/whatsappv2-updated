import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, {  useState } from 'react';
import { withRouter } from 'react-router-dom';
import CampaingsTableHead from './CampaingsTableHead';


function CampaingsTable(props) {
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const[dialogData,setDialogData]=useState({
		enabled:'',
		id:'',
		name:'',
		code:'',
		country:''
		
	})

    let data=props.data
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
		setDialogData({
			enabled:n.enabled,
			id:n.id,
			name:n.name,
			code:n.code,
            country:0
         })
		
		
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
					<CampaingsTableHead
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
											{n.incoming}
										</TableCell>
										<TableCell component="th" scope="row" align="center" style={{fontSize:'12px',padding:'10px'}}>
											{n.incoming_count}
										</TableCell>
										<TableCell component="th" scope="row" align="center" style={{fontSize:'12px',padding:'10px'}}>
											{n.number}
										</TableCell>
										<TableCell component="th" scope="row" align="center" style={{fontSize:'12px',padding:'10px'}}>
											{n.outgoing}
										</TableCell>
                                        <TableCell component="th" scope="row" align="center" style={{fontSize:'12px',padding:'10px'}} >
											{n.outgoing_count}
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
				
		</div>
	);
}

export default withRouter(CampaingsTable);
