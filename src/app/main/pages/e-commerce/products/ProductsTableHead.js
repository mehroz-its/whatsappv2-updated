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
		align: 'left',
		disablePadding: false,
		label: 'ID',
		sort: true
	},
	// {
	// 	id: 'image',
	// 	align: 'left',
	// 	disablePadding: false,
	// 	label: '',
	// 	sort: false
	// },
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'totalMembers',
		align: 'left',
		disablePadding: false,
		label: 'Total Members',
		sort: true
	},
	{
		id: 'creator',
		align: 'right',
		disablePadding: false,
		label: 'Creator',
		sort: true
	},
	{
		id: 'icon',
		align: 'center',
		disablePadding: false,
		label: 'Icon',
		sort: true
	}

];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function ProductsTableHead(props) {
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
				<TableCell padding="none" className="relative w-64 text-center">
					<Checkbox
						indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
						checked={props.numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>
					{props.numSelected > 0 && (
						<div
							className={clsx(
								'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10',
								classes.actionsButtonWrapper
							)}
						>
							<IconButton
								aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
								aria-haspopup="true"
								onClick={openSelectedProductsMenu}
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id="selectedProductsMenu"
								anchorEl={selectedProductsMenu}
								open={Boolean(selectedProductsMenu)}
								onClose={closeSelectedProductsMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											closeSelectedProductsMenu();
										}}
									>
										<ListItemIcon className="min-w-40">
											<Icon>delete</Icon>
										</ListItemIcon>
										<ListItemText primary="Remove" />
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
					)}
				</TableCell>
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

export default ProductsTableHead;
