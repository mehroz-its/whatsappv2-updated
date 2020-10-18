import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React  from 'react';
import BlockContactsTable from './ContactGroupTable';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading'



function ContactsList(props) {

	const {data,onDialogClose,isSearched,displaySnack,isLoading,totalItems,setPage,setLimit,rowsPerPage,currentPage}  = props
	const columns = React.useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Title',
				accessor: 'title',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Decsription',
				accessor: 'description',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Total Consumer',
				accessor: 'customers.length',
				sortable: true
			},
			{
				Header: 'Enable',
				accessor: 'enabled',
				sortable: true
			},
		],
		[]
	);
	if(isLoading){

		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}else if(data.length === 0){
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
				No Data Found!
			</Typography>
			</div>
		)
	}else{
		return (
			
				<BlockContactsTable
					columns={columns}
					data={data}
					onRowClick={(ev, row) => {
						
						console.log(row, 'rowrow')
					}}
					onClose={onDialogClose}
					displaySnack={displaySnack}
					
					totalItems={totalItems}
					setPage={setPage}
					setLimit={setLimit}
					rowsPerPage={rowsPerPage}
					currentPage={currentPage}
				/>
				
		);
	}	
}

export default ContactsList;