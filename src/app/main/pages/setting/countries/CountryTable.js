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
import * as Actions from './store/actions';
import CountryTableHead from './CountryTableHead'
import TableData from './CountryData'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'


import CountryDialog from './CountryDialog'
import { database } from 'firebase';

function CountryTable(props) {

	function closeDialog(){
		setOpen(false)
	}
	
	let data2 = props.dataa
    // let data3=props.dataa
	const dispatch = useDispatch();
	const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);

	const [filter, setFilter] = useState([]);
	const [press,setPress]=useState(props.PressedVal)
	const[searchVal,setSearchVal]=useState(props.ValueForSearch)
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const[dialogData,setDialogData]=useState({
		enabled:true,
		id:'',
		name:'',
		code:'',
		cities:''
		
	})
	
	




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

	const openDialog = props.onClickOpen
	let openDialogValue = props.isOpen

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

	function handleClick(filter) {
		props.onClickOpen()
		handleClickOpen()

		setDialogData({
			enabled:filter.enabled,
			id:filter.id,
			name:filter.name,
			code:filter.code
    })
		
		
}


	// if (data3.length === 0) {
	// 	return (
	// 		<div className="flex flex-1 items-center justify-center h-full">
	// 			<FuseLoading />
	// 		</div>
	// 	);
	// }

	if(data2.length===0&&props.InsertedVal.length!=0)
	{
		console.log(props.InsertedVal,'sdsdsd');
		
	return (
		<div style={{justifyContent:'center',alignItems:'center',display:'flex',flex:1,fontSize:40,fontStyle:'italic'}}>
               No Data Found
		</div>
	)
	}

	
	const handleClose = () => {
		// getData()

		setOpen(false);
		props.onClose()
	};
	

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
					<CountryTableHead
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
							.map(filter => {
								const isSelected = selected.indexOf(filter.id) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={filter.id}
										selected={isSelected}
										onClick={event => handleClick(filter)}
									>

										{/* <TableCell className="w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell> */}
										<TableCell component="th" scope="row" >
											{filter.id}
										</TableCell>
										<TableCell component="th" scope="row">
											{filter.name}
										</TableCell>
										<TableCell component="th" scope="row">
											{filter.code}
										</TableCell>
									
										<TableCell component="th" scope="row" align="left">
										{filter.enabled ? (
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
			{open ? <CountryDialog  isOpen={open} closeDialog={closeDialog} closeDialog={handleClose} type="Update" data={dialogData} />:null }
		</div>
	);
}

export default withRouter(CountryTable);
