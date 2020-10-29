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
import ContactsTablePaginationActions from './ContactsTablePaginationActions';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider, createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import CannedDialog from './TemplateDialog'
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import DeleteDialog from './DeletDialog'

const BodyStyle = createMuiTheme({
	overrides: {
		MuiTableCell: {
			root: {
				paddingTop: 4,
				fontSize: '12px',
				paddingBottom: 4,
			}
		}
	}
});

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


const HeaderStyle = createMuiTheme({
	overrides: {
		MuiTableCell: {
			root: {
				paddingLeft: 40,
				fontSize: '12px',
				paddingBottom: 4,
				"&:first-child": {
					paddingRight: 16
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
const EnhancedTable = ({ displaySnack, columns, data, onRowClick, onClose,rowsPerPage,currentPage,setLimit, totalItems, setPage }) => {
	const [open, setOpen] = React.useState(false);
	const [deleteDialog, setDeleteDialog] = React.useState(false);
	const [deleteDialogData, setDeleteDialogData] = React.useState({});
	function closeDialog(val) {
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
				..._columns
			]);
		}
	);

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	};

	const handleChangeRowsPerPage = event => {
		setLimit(Number(event.target.value));		
		setPageSize(Number(event.target.value));

	};


	const handleClick = (ev, row) => {
		setDialogData(row.original)
		setOpen(true);
		handleClickOpen()
	}
	const hadleDelete = (event, n) => {
		setDeleteDialog(true)
		event.stopPropagation()
		setDeleteDialogData(n)
	}
	return (<div>
		<TableContainer className="min-h-full sm:border-1 sm:rounded-16" >
			<MaUTable {...getTableProps()}>
				<TableHead>
					{headerGroups.map(headerGroup => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<MuiThemeProvider theme={HeaderStyle}>
									<TableCell
										style={{ fontSize: '11px' }}
										align="center"
										className="whitespace-no-wrap px-50 py-8"
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
								style={{ fontSize: '11px' }}
								{...row.getRowProps()}
								onClick={ev => handleClick(ev, row)}
								className="truncate cursor-pointer"

							>
								{row.cells.map(cell => {
									console.log(row.original, 'cell')
									if (cell.column.Header === 'Enable') {
										if (row.original.enabled === true) {
											return (
												<TableCell

													style={{ height: 'auto !important' ,padding:'5px'}}
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
													style={{ height: 'auto !important' ,padding:'5px'}}
													component="th" scope="row"
													align="center"
													className={clsx('p-0')}
												>
													<Icon className="text-red text-20">cancel</Icon>
												</TableCell>
											)
										}
									}
									else if (cell.column.Header === 'Delete') {
										return (
											<TableCell
												style={{ height: 'auto !important'}}
												component="th" scope="row"
												align="center"
												className={clsx('p-0')}
											>
												<Icon onClick={event => hadleDelete(event, row.original)} className="text-16">delete_outline</Icon>
											</TableCell>
										)
									}
									else {
										return (
											<MuiThemeProvider theme={BodyStyle}>
												<TableCell
												// style={{ height: 'auto !important' ,padding:'5px',maxWidth:'150px',width:'150px',overflowX:auto}}
												style={{ height: 'auto !important' ,padding:'5px',whiteSpace:'break-spaces'}}
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

				<TableFooter
					classes={{ root: 'h-0' }}
				>
					<TableRow classes={{ root: 'h-0' }}
					>
						<MuiThemeProvider theme={PaginationStyle}>
							<TablePagination

								classes={{
									root: 'overflow-hidden',
									spacer: 'w-0 max-w-0',
									actions: 'text-64',
									select: 'text-12 mt-4',
									selectIcon: 'mt-4',
								}}
								rowsPerPageOptions={[5,10,25, { label: 'All', value: totalItems }]}
								colSpan={5}
								style={{ fontSize: '12px' }}
								count={totalItems}
								rowsPerPage={rowsPerPage}
								page={currentPage}
								SelectProps={{
									inputProps: { 'aria-label': 'rows per page' },
									native: false,
									fontSize: 50
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
		{open && <CannedDialog type="Update Template Message" data={dialogData} isOpen={open} closeDialog={closeDialog} />}
		{deleteDialog && <DeleteDialog isOpen={deleteDialog} type="Delete" closeDialog={closeDialog}  data={deleteDialogData} />}
	</div>
	);
};




EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	onRowClick: PropTypes.func
};

export default EnhancedTable;