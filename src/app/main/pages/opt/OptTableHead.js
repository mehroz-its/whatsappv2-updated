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
		label: 'ID',
		sort: true
	},
	{
		id: 'wt_num',
		align: 'center',
		disablePadding: false,
		label: 'Number',
		sort: true
	},
	{
		id: 'short_code',
		align: 'center',
		disablePadding: false,
		label: 'Code',
		sort: true
	},
	{
		id: 'redeem',
		align: 'center',
		disablePadding: false,
		label: 'Redeem',
		sort: true
	},
	{
		id: 'dt',
		align: 'center',
		disablePadding: false,
		label: 'Created Date',
		sort: true
	},
	{
		id: 'expires',
		align: 'center',
		disablePadding: false,
		label: 'Expires',
		sort: true
	},
	// {
	// 	id: 'delete',
	// 	align: 'center',
	// 	disablePadding: false,
	// 	label: 'Delete',
	// 	sort: true
	// }

];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function OptTableHead(props) {
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
							style={{ fontSize: '12px', padding: '10px 0px 10px 20px' }}
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

export default OptTableHead;
