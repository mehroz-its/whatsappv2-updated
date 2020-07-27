import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import BlockContactsTable from './ContactGroupTable';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading'



function ContactsList(props) {
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
			<BlockContactsTable
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

export default ContactsList;