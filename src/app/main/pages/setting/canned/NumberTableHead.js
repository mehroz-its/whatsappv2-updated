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
        id: 'name',
        align: 'left',
        // disablePadding: true,
        label: 'Name',
        sort: true
    },
    {
        id: 'number',
        align: 'right',
        // disablePadding: true,
        label: 'Number',
        sort: true
    },
  
];

const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

function NumberTableHead(props) {
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
            <TableRow className="h-63" style={{ height: '33px' }} >
               
                <TableCell
                >
                    <Checkbox
                        indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                        checked={props.numSelected === props.rowCount}
                        onChange={props.onSelectAllClick}
                        style={{ paddingLeft: '20px' }} />
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
                                    padding={0}
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

export default NumberTableHead;
