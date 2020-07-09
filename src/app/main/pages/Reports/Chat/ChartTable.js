import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ChartTableHead from './ChartTableHead';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'


function ChartTable(props) {

	
	function closeDialog(){
		setOpen(false)
	}

	console.log(props)
	// const dispatch = useDispatch();
	// const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
	// const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = useState([]);
	// const [data, setData] = useState([]);
	const[searchVal,setSearchVal]=useState(props.ValueForSearch)
	const [data2, setData2] = useState(data);
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
	// useEffect(() => {
	// 	dispatch(Actions.getProducts());
	// }, [dispatch]);

	// useEffect(() => {
	// 	if (searchText.length !== 0) {
	// 		setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
	// 		setPage(0);
	// 	} else {
	// 		setData(products);
	// 		console.log(products,'here in prdoducts table')
	// 	}
	// }, [products, searchText]);

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

	// if (data2.length === 0) {
	// 	return (
	// 		<div className="flex flex-1 items-center justify-center h-full">
	// 			<FuseLoading />
	// 		</div>
	// 	);
	// }

	function handleClick(n) {
		console.log(n,'nnnnnnnn');
		
		setOpen(true)
		console.log(dialogData,n,'asdsd');
		setDialogData({
			enabled:n.enabled,
			id:n.id,
			name:n.name,
			code:n.code,
            country:0
         })
		
		
}
// if(searchVal!==props.ValueForSearch)
// {
// 	{search()}
// }

// // if(searchVal.length===0)
// // {
// // 	{getData()}
// // }




// //    if(props.PressedVal==8){
// // 	setData(data.filter(n=>n.name.toLowerCase().includes(props.ValueForSearch.toLowerCase())))
// // }

// function search(){
// 	console.log('ceeleded',props.ValueForSearch,searchVal);
	
// 	setSearchVal(props.ValueForSearch)
// 	setData2(data.filter(n=>n.name.toLowerCase().includes(props.ValueForSearch.toLowerCase())))
// 	console.log(data,'filterssss');
	
	
// }

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

	return (
		<div className="w-full flex flex-col">
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
							.map(n => {
                                const isSelected = selected.indexOf(n.id) !== -1;
                                console.log(n,'nnnnnnnnnnn');
                                
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

										{/* <TableCell className="w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell> */}
										<TableCell component="th" scope="row" >
											{n.incoming}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.incoming_count}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.number}
										</TableCell>
										<TableCell component="th" scope="row" align="right">
											{n.outgoing}
										</TableCell>
                                        <TableCell component="th" scope="row" align="right">
											{n.outgoing_count}
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

export default withRouter(ChartTable);