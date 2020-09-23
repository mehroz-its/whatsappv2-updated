import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import MaUTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import ContactsTablePaginationActions from '../canned/ContactsTablePaginationActions';
import Icon from '@material-ui/core/Icon';
import CannedDialog from './CannedDialog'
import { makeStyles,ThemeProvider,createMuiTheme,withStyles,MuiThemeProvider } from '@material-ui/core/styles';
const BodyStyle = createMuiTheme({
	overrides: {
	  MuiTableCell: {
		root: {
		  paddingTop: 4,
		  fontSize:'12px',
		  paddingBottom: 4,
		}
	  }
	}
  });
  
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


const HeaderStyle = createMuiTheme({
	overrides: {
	  MuiTableCell: {
		root: {
	
		  paddingLeft:40,

		  fontSize:'12px',
		  paddingBottom: 4,
		  "&:first-child": {
			paddingRight: 40
		  }
		}
	  }
	}
  });

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<Checkbox ref={resolvedRef} {...rest} />
		</>
	);
});

const EnhancedTable = ({displaySnack, columns, data, onRowClick,onClose }) => {
	const [open, setOpen] = React.useState(false);
	function closeDialog(val){
		setOpen(false);
		onClose()
		displaySnack(val)
	};
	const handleClickOpen = () => {
		setOpen(true);
	}
	const [dialogData, setDialogData] = React.useState()
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			autoResetPage: true
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		hooks => {
			hooks.allColumns.push(_columns => [
				{
					id: 'selection',
					sortable: false,
				
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
				
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox
								{...row.getToggleRowSelectedProps()}
								onClick={ev => ev.stopPropagation()}
							/>
						</div>
					)
				},
				..._columns
			]);
		}
	);

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setPageSize(Number(event.target.value));
	};

	const handleClick = (ev, row) => {
		setDialogData(row.original)
		setOpen(true);
		handleClickOpen()
	}

	// Render the UI for your table
	return (<div>
		<TableContainer className="min-h-full sm:border-1 sm:rounded-16" >
			<MaUTable {...getTableProps()}>
				<TableHead>
					{headerGroups.map(headerGroup => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<MuiThemeProvider theme={HeaderStyle}>
								<TableCell
								    
									style={{fontSize:'11px'}}
								    align="center"
									className="whitespace-no-wrap px-50 py-0" 
									{...(!column.sortable
										? column.getHeaderProps()
										: column.getHeaderProps(column.getSortByToggleProps()))}
								>
									{column.render('Header')}
									{column.sortable ? (
										<TableSortLabel
											active={column.isSorted}
											// react-table has a unsorted state which is not treated here
											direction={column.isSortedDesc ? 'desc' : 'asc'}
										/>
									) : null}
								</TableCell>
								</MuiThemeProvider>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<TableRow
								{...row.getRowProps()}
								onClick={ev => handleClick(ev, row)}
								className="truncate cursor-pointer"
								style={{height:2 }}
							>
								{row.cells.map(cell => {
									console.log(row.original, 'cell')
									if (cell.column.Header === 'Enable') {
										if (row.original.enabled === true) {
											return (
												<TableCell

												style={{ height: 'auto !important' }}
												component="th" scope="row" 
												align="center"
												className={clsx('p-0')}
												>
													<Icon className="text-green text-20">check_circle</Icon>
												</TableCell>
											)
										} else if (row.original.enabled === false) {
											return (
												<TableCell 
												
												className={clsx('p-0')}
												style={{ height: 'auto !important' }}
												component="th" scope="row" 
												align="center">
													<Icon className="text-red text-20">cancel</Icon>
												</TableCell>
											)
										}
									} else {
										return (
											<MuiThemeProvider theme={BodyStyle}>
											<TableCell
									
											
											align="center"
												{...cell.getCellProps()}
												className={clsx('p-0')}
											>
												{cell.render('Cell')}
											</TableCell>
											</MuiThemeProvider>
										);
									}
								})}
							</TableRow>
						);
					})}
				</TableBody>

				<TableFooter>
					<TableRow>
					<MuiThemeProvider theme={PaginationStyle}>
						<TablePagination
							classes={{
								root: 'overflow-hidden',
								spacer: 'w-0 max-w-0',
								actions:'text-64',
								select:'text-12 mt-4',
								 selectIcon:'mt-4',
							}}
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length + 1 }]}
							colSpan={5}
							count={data.length}
							rowsPerPage={pageSize}
							page={pageIndex}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: false
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={ContactsTablePaginationActions}
						/>
						</MuiThemeProvider>	
										</TableRow>
				</TableFooter>
			</MaUTable>
		</TableContainer>
		{open && <CannedDialog type="Update Canned Message" data={dialogData} isOpen={open} closeDialog={closeDialog}/>}

	</div>
	);
};




EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default EnhancedTable;