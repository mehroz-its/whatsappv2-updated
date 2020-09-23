import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
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
		id: 'number',
		align: 'left',
		disablePadding: false,
		label: 'Number',
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
		id: 'blockedon',
		align: 'left',
		disablePadding: false,
		label: 'Blocked On',
		sort: true
	},
	{
		id: 'blocked',
		align: 'center',
		disablePadding: false,
		label: 'Blocked',
		sort: true
	},
];
function BlockTableHead(props) {
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
export default BlockTableHead;