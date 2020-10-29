import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import TemplateMessageTable from './TemplateMessageTable';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading';

function CannedList(props) {
	const {onDialogClose,isSearched,displaySnack,currentParams,totalItems,setPage,setLimit,isLoading,data}  = props
	
	const columns = React.useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Name',
				accessor: 'template_name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Text',
				accessor: 'template_text',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Params',
				accessor: 'template_params',
				sortable: true
			},
			{
				Header: 'Type',
				accessor: 'template_type',
				sortable: true
			},
			{
				Header: 'Enable',
				accessor: 'enabled',
				sortable: true
			},
			// {
			// 	Header: 'Delete',
			// 	accessor: 'delete',
			// 	sortable: true
			// },
		],
		[]
	);
	if(isLoading){
		
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}else if (data.length == 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					No Template Messages
		</Typography>
			</div>
		)
	}
	else{

		return (
			<TemplateMessageTable
				columns={columns}
				data={data}
				onRowClick={(ev, row) => {

					console.log(row, 'rowrow')
				}}
				onClose={onDialogClose}
				displaySnack={displaySnack}
				setPage={setPage}
				setLimit={setLimit}
				rowsPerPage={currentParams.limit}
				currentPage={currentParams.page}
				totalItems={totalItems}
					
				/>
		);
	}
}
export default CannedList;