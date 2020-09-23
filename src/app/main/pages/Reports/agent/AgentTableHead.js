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
		label: 'Agent Id',
		sort: true
	},
	{
		id: 'agent_name',
		align: 'center',
		disablePadding: false,
		label: 'Agent Name',
		sort: true
	},
	{
		id: 'inbound_message',
		align: 'center',
		disablePadding: false,
		label: 'Inbound Message',
		sort: true
	},
	{
		id: 'outbound_message',
		align: 'center',
		disablePadding: false,
		label: 'Outbound Message',
		sort: true
	},
	{
		id: 'engagements',
		align: 'center',
		disablePadding: false,
		label: 'Engagements',
		sort: true
	},
	{
		id: 'Total',
		align: 'center',
		disablePadding: false,
		label: 'Total Chats',
		sort: true
	},
	{
		id: 'response',
		align: 'center',
		disablePadding: false,
		label: 'Response Time',
		sort: true
	},
	{
		id: 'active_status',
		align: 'center',
		disablePadding: false,
		label: 'Active Status',
		sort: true
	}	
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function AgentTableHead(props) {
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

export default AgentTableHead;
