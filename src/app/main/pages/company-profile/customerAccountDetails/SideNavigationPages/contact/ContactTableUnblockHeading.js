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
        id: 'firstname',
        align: 'center',
        disablePadding: false,
        label: 'First Name',
        sort: true
    },
    {
        id: 'lastname',
        align: 'center',
        disablePadding: false,
        label: 'Last Name',
        sort: true
    },
    {
        id: 'age',
        align: 'center',
        disablePadding: false,
        label: 'Age',
        sort: true
    },
    {
        id: 'gender',
        align: 'center',
        disablePadding: false,
        label: 'Gender',
        sort: true
    },
    {
        id: 'number',
        align: 'center',
        disablePadding: false,
        label: 'Number',
        sort: true
    },
    {
        id: 'email',
        align: 'center',
        disablePadding: false,
        label: 'Email',
        sort: true
    },
    {
        id: 'date',
        align: 'center',
        disablePadding: false,
        label: 'Date',
        sort: true
    },
    {
        id: 'block',
        align: 'center',
        disablePadding: false,
        label: 'Unblock',
        sort: true
    },
];
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
