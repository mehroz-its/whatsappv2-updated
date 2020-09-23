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
		id: 'Agent_id',
		align: 'center',
		disablePadding: false,
		label: 'Agent_id',
		sort: true
	},
	{
		id: 'agent_name',
		align: 'center',
		disablePadding: false,
		label: 'agent_name',
		sort: true
	},
	{
		id: 'total_chat_count',
		align: 'center',
		disablePadding: false,
		label: 'Total_chat_count',
		sort: true
	},
	{
		id: 'total_engagement_count',
		align: 'center',
		disablePadding: false,
		label: 'Total_engagement_count',
		sort: true
	},
	{
		id: 'responsetime',
		align: 'center',
		disablePadding: false,
		label: 'responsetime',
		sort: true
	},
	{
		id: 'account_status',
		align: 'center',
		disablePadding: false,
		label: 'Acount_status',
		sort: true
	}	
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function CampaingsTableHead(props) {
	const classes = useStyles(props);
	const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openSelectedProductsMenu(event) {
		setSelectedProductsMenu(event.currentTarget);
	}

	function closeSelectedProductsMenu() {
		setSelectedProductsMenu(null);
	}

	return (
		<TableHead>
			<TableRow className="h-64">
				{rows.map(row => {
					return (
						<TableCell
							key={row.id}
							style={{ fontSize: '12px', padding: '10px 0px 10px 20px' }}
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

export default CampaingsTableHead;
