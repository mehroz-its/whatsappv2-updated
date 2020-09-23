import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState } from 'react';
const rows = [
	{
		id: 'id',
		align: 'left',
		disablePadding: false,
		label: 'ID',
		sort: true
	},
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'description',
		align: 'left',
		disablePadding: false,
		label: 'Description',
		sort: true
	},
	{
		id: 'begin_dt',
		align: 'center',
		disablePadding: false,
		label: 'Begin Date',
		sort: true
	},
	{
		id: 'activated',
		align: 'right',
		disablePadding: false,
		label: 'Activated',
		sort: true
	},
	{
		id: 'progress',
		align: 'right',
		disablePadding: false,
		label: 'In Progress',
		sort: true
	},
	{
		id: 'consumer',
		align: 'right',
		disablePadding: false,
		label: 'Consumer',
		sort: true
	},
	{
		id: 'success',
		align: 'right',
		disablePadding: false,
		label: 'Success',
		sort: true
	},
	{
		id: 'faliure',
		align: 'right',
		disablePadding: false,
		label: 'Failure',
		sort: true
	},
	{
		id: 'lastUpdated',
		align: 'right',
		disablePadding: false,
		label: 'Last Updated',
		sort: true
	}

];
function CampaignTableHead(props) {
	const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};
	return (
		<TableHead>
			<TableRow className="h-64">
				{rows.map(row => {
					return (
						<TableCell
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default CampaignTableHead;
