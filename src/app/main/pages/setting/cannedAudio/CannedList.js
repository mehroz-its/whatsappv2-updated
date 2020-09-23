import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import CannedTable from './CannedTable';
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
function CannedList(props) {
	const {data,onDialogClose,isSearched,displaySnack }  = props
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
				accessor: 'message_name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Text',
				accessor: 'message_text',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Params',
				accessor: 'message_params',
				sortable: true
			},
			{
				Header: 'Type',
				accessor: 'message_type',
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

	if (data.length === 0) {
		if (isSearched !== '') {
			return (
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
					No Data Found!
				</Typography>
				</div>
			)
		} else {
			return (
				<div className="flex flex-1 items-center justify-center h-full">
					<FuseLoading />
				</div>
			);
		}
	}
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<CannedTable
				columns={columns}
				data={data}
				onRowClick={(ev, row) => {
					
					console.log(row, 'rowrow')
				}}
				onClose={onDialogClose}
				displaySnack={displaySnack}
			/>
		</FuseAnimate>
	);
}

export default CannedList;