import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PermissionDialog from './PermissionDialog'
import React, {  useState } from 'react';
import {   createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ContactsTablePaginationActions from '../../setting/canned/ContactsTablePaginationActions';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import PermissionTableHead from './PermissionTableHead';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
import DeleteDialog from '../DeletDialog'

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

function PermissionTable(props) {


	function closeDialog(val) {
		setOpen(false)
		setDeleteDialog(false)
		props.onClose(val)
	}
	const {rowsPerPage,currentPage,setLimit, totalItems, setPage, isLoading} = props;

	const dispatch = useDispatch();
	const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = useState([]);
	const [userRules, setUserRules] = useState([])

	const [deleteDialogData, setDeleteDialogData] = React.useState({});
	const [deleteDialog, setDeleteDialog] = React.useState(false);

	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	const [dialogData, setDialogData] = useState({
		enabled: '',
		id: '',
		description: '',
		title: '',
		method: '',
		rule_set: [],
		consumer: ""
	})
	const loadRuleSets = () => {
		return CoreHttpHandler.request('permissions', 'rule_set', {
		}, null, null, true);
	};
	React.useEffect(() => {
		loadRuleSets().then(response => {
			let rules = (response.data.data.rule_set);
			setUserRules(response.data.data.rule_set)
		});
	}, []);
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
	// if (data2.length === 0) {
	// 	if (props.ValueForSearch !== '') {
	// 		return (
	// 			<div className="flex flex-1 items-center justify-center h-full">
	// 				<Typography color="textSecondary" variant="h5">
	// 					No Data Found
	// 				</Typography>
	// 			</div>
	// 		)
	// 	} else {
	// 		return (
	// 			<div className="flex flex-1 items-center justify-center h-full">
	// 				<FuseLoading />
	// 			</div>
	// 		);
	// 	}
	// }
	function handleClick(n) {
		setDialogData({
			enabled: n.enabled,
			id: n.id,
			description: n.description,
			title: n.title,
			method: n.method,
			rule_set: n.rule_set,
			consumer: n.consumer,
			displayRules: n.method === "FRONT" ? userRules.frontend : n.method === "APP" ? userRules.app : n.method === "BACK" ? userRules.backend : []
		})
		setOpen(true)
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


	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	};

	const handleChangeRowsPerPage = event => {
		setLimit(Number(event.target.value));		
	};

	const hadleDelete = (event, n) => {
		setDeleteDialog(true)
		event.stopPropagation()
		setDeleteDialogData(n)
	}
	if(isLoading){

		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}else if(data2.length===0){
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					No Data Found!
		</Typography>
			</div>
		)
	}else{
		return (
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table className="min-w-xl" aria-labelledby="tableTitle">
						<PermissionTableHead
							numSelected={selected.length}
							order={order}
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
											<TableCell component="th" scope="row" align="center" style={{ fontSize: '12px', padding: '10px' }}>
												{n.id}
											</TableCell>
											<TableCell component="th" scope="row" align="center" style={{ fontSize: '12px', padding: '10px' }}>
												{n.title}
											</TableCell>
											<TableCell component="th" scope="row" align="center" style={{ fontSize: '12px', padding: '10px' }}>
												{n.method !== 'APP' ? `${n.method}END` : n.method}
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
						style={{ fontSize: '12px' }}
						classes={{
							root: 'overflow-hidden',
							spacer: 'w-0 max-w-0',
							actions: 'text-64',
							select: 'text-12 mt-4',
							selectIcon: 'mt-4',
						
						}}
						rowsPerPageOptions={[10,25,50, { label: 'All', value: totalItems }]}
	
						className="overflow-hidden"
						component="div"
						count={totalItems}
						rowsPerPage={rowsPerPage}
						page={currentPage}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						ActionsComponent={ContactsTablePaginationActions}
					/>
				</MuiThemeProvider>
		
				{open ? <PermissionDialog isOpen={open} closeDialog={closeDialog} type="Update" data={dialogData} /> : null}
				{deleteDialog && <DeleteDialog path='permissions' method='delete' isOpen={deleteDialog} type="Delete" closeDialog={closeDialog}  data={deleteDialogData} />}
	
			</div>
		);
	}

}

export default withRouter(PermissionTable);
