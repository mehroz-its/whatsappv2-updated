import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState } from 'react';
const rows = [
	{
		id: 'id',
		align: 'center',
		disablePadding: false,
		label: 'ID',
		sort: true
	},
	{
		id: 'name',
		align: 'center',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'description',
		align: 'center',
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
		align: 'center',
		disablePadding: false,
		label: 'Activated',
		sort: true
	},
	{
		id: 'progress',
		align: 'center',
		disablePadding: false,
		label: 'In Progress',
		sort: true
	},
	{
		id: 'consumer',
		align: 'center',
		disablePadding: false,
		label: 'Consumer',
		sort: true
	},
	{
		id: 'success',
		align: 'center',
		disablePadding: false,
		label: 'Success',
		sort: true
	},
	{
		id: 'faliure',
		align: 'center',
		disablePadding: false,
		label: 'Failure',
		sort: true
	},
	// {
	// 	id: 'lastUpdated',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: 'Last Updated',
	// 	sort: true
	// },
	{
		id: 'completed',
		align: 'center',
		disablePadding: false,
		label: 'Completed',
		sort: true
	}

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
