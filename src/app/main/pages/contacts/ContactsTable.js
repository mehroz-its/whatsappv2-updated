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
import ContactsTablePaginationActions from '../setting/canned/ContactsTablePaginationActions';
import ContactDialog from './ContactDialog'
import BlockContactInDialog from './BlockContactInDialog'
import BlockDialog from '../BlockedContacts/BlockListDialog'
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

  const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330,

	},
	margin: {
	  
		color:'white',
		paddingLeft:'14px',
		
		paddingRight:'14px',
		paddingTop:'5px',
		paddingBottom:'5px',
		fontSize:'12px',
	   
	  },
}));


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

const EnhancedTable = ({giveVal,columns, data, getUpdatedData,onRowClick, props,openUnBlockDialog,openBlockDialog, blockRowData ,onBlockDialogClose}) => {
	const [open, setOpen] = React.useState(false);
	const classes = useStyles(props);
	const handleClose = (val) => {
		giveVal(val)
		setOpen(false);
		onBlockDialogClose()
		getUpdatedData()
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
				// Let's make a column for selection
				{
					id: 'selection',
					sortable: false,
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox.  Pagination is a problem since this will select all
					// rows even though not all rows are on the current page.  The solution should
					// be server side pagination.  For one, the clients should not download all
					// rows in most cases.  The client should only download data for the current page.
					// In that case, getToggleAllRowsSelectedProps works fine.
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
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
		console.log(row,"ROWWWWWWWW");
		setDialogData(row.original)
		handleClickOpen()
	}

	return (<div>
		<TableContainer className="min-h-full sm:border-1 sm:rounded-16" >
			<MaUTable {...getTableProps()}>
				<TableHead style={{fontSize:'11px'}}>
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
							style={{fontSize:'11px'}}
								{...row.getRowProps()}
								onClick={ev => handleClick(ev, row)}
								className="truncate cursor-pointer"
							>
								{row.cells.map(cell => {
									return (
										<MuiThemeProvider theme={BodyStyle}>
										<TableCell
										
										className="whitespace-no-wrap px-50 py-0"
										align="center"
										     	
							  
										
										>
											{cell.render('Cell')}
										</TableCell>
										</MuiThemeProvider>
									);
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
							style={{fontSize:'12px'}}
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
		{open && <ContactDialog type="edit" data={dialogData} isOpen={open} closeDialog={handleClose}  />}
		{openBlockDialog && <BlockContactInDialog isOpen={openBlockDialog} type="Block Number" data={blockRowData} closeDialog={handleClose} />}
		{openUnBlockDialog && <BlockDialog isOpen={openUnBlockDialog} type="UnBlock Number" closeDialog={handleClose} data={blockRowData} />}


	</div>
	);
};




EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default EnhancedTable;
