
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState } from 'react';
const rows = [
	{
		id: 'ID',
		align: 'center',
		disablePadding: false,
		label: 'ID',
		sort: true
	},
	{
		id: 'Name',
		align: 'center',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'Text',
		align: 'center',
		disablePadding: false,
		label: 'Text',
		sort: true
	},
	{
		id: 'Params',
		align: 'center',
		disablePadding: false,
		label: 'Params',
		sort: true
	},
	{
		id: 'Type',
		align: 'center',
		disablePadding: false,
		label: 'Type',
		sort: true
	},
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function CampaignTableHead(props) {
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};
	
	return (
		<TableHead>
			<TableRow className="h-10">
				{rows.map(row => {
					return (
						<TableCell
							style={{ fontSize: '11px', padding: '10px 0px 10px 20px' }}
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'center' ? 'bottom-end' : 'bottom-start'}
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
