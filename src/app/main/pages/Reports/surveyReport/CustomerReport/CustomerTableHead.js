import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';

const rows = [
	{
		id: 'id',
		align: 'center',
		disablePadding: false,
		label: 'User Id',
		sort: true
	},
	{
		id: 'agentName',
		align: 'center',
		disablePadding: false,
		label: 'Agent Name',
		sort: true
	},
	{
		id: 'number',
		align: 'center',
		disablePadding: false,
		label: 'Number',
		sort: true
	}
	// {
	// 	id: 'vGood',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: 'Very Good',
	// 	sort: true
	// },
	// {
	// 	id: 'good',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: 'Good',
	// 	sort: true
	// },
	// {
	// 	id: 'poor',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: 'Poor',
	// 	sort: true
	// },
	// {
	// 	id: 'vPoor',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: 'Very Poor',
	// 	sort: true
	// },
	// {
	// 	id: 'other',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: 'Other',
	// 	sort: true
	// }
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function CustomerTableHead(props) {
	const classes = useStyles(props);
	const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className="h-10">
				{rows.map(row => {
					return (
						<TableCell
							style={{ fontSize: '12px' }}
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

export default CustomerTableHead;
