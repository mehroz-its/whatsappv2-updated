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
import * as Actions from '../store/actions';
import TemplateTableHead from './TemplateTableHead';
import TableData from '../TemplateData'
import TemplateDialog from './TemplateDialog'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'



function TemplateTable(props) {
	console.log(props)
	const dispatch = useDispatch();
	const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [open, setOpen] = React.useState(false)
	const [dialogData, setDialogData] = React.useState({ name: '', params: '' })
	const [searchVal, setSearchVal] = useState(props.ValueForSearch)
	const [data2, setData2] = useState(data);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	const getData = ((loadData) => {
		loadData = () => {
			return CoreHttpHandler.request('template', 'listing', {

				limit: 10,
				page: 0,
				columns: "*",
				sortby: "DESC",
				orderby: "id",
				where: "id != $1",
				values: 0,
			}, null, null, true);
		};
		loadData().then((response) => {
			const tableData = response.data.data.list.data
			console.log(tableData)
			setData(tableData)
			setData2(tableData)

		});
	})

	React.useEffect(() => {
		getData()
	}, []);

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
	if (data2.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
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
		setDialogData({ name: n.template_name, params: n.template_params })




	}

	function search(){
		console.log('ceeleded',props.ValueForSearch,searchVal);
		console.log(data)
		setSearchVal(props.ValueForSearch)
		setData2(data.filter(n=>n.template_name.toLowerCase().includes(props.ValueForSearch.toLowerCase())))
		console.log(data,'filterssss');
		
		
	}
	
	if (searchVal !== props.ValueForSearch) {
		{ search() }
	}
	function handleClose() {
		setOpen(false)

		// props.history.push({pathname:`/apps/groups/group-detail`,id:n.id});
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
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={event => handleRowClick(n)}
									>

										<TableCell component="th" scope="row" >
											{n.id}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.template_name}
										</TableCell>
										<TableCell component="th" scope="row">
											{n.template_text}
										</TableCell>
										{n.params === null ? (<TableCell component="th" scope="row" align="right">
											{n.template_params}
										</TableCell>) :
											(<TableCell component="th" scope="row" align="right">
												Null
											</TableCell>)}
										<TableCell component="th" scope="row" align="right">
											{n.template_type}
										</TableCell>
										<TableCell component="th" scope="row" align="right">
											{n.approved ? (
												<Icon className="text-green text-20">check_circle</Icon>
											) : (
													<Icon className="text-red text-20">cancel</Icon>
												)}
										</TableCell>
										<TableCell component="th" scope="row" align="right">
											{n.enabled ? (
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
			{open && <TemplateDialog type="Update Template" isOpen={open} closeDialog={handleClose} data={dialogData} />}
		</div>
	);
}

export default withRouter(TemplateTable);
