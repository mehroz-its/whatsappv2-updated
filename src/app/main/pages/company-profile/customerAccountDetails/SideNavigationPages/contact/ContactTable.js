import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState, useRef } from 'react';
import moment from "moment";

import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContactTableHeader from './ContactTableHeader';
import ContactTableHeaderGroups from './ContactTableHeaderGroups';
import ContactsTablePaginationActions from '../../../../setting/canned/ContactsTablePaginationActions';
import { makeStyles, ThemeProvider, createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../../../@fuse/core/FuseLoading/FuseLoading'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ContactDialog from './ContactDialog'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import BlockContactInDialog from '../../../../contacts/BlockContactInDialog'
import BlockDialog from '../../../../BlockedContacts/BlockListDialog'
import IconButton from '@material-ui/core/IconButton';

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { CSVLink, CSVDownload } from 'react-csv';
import ContactTableUnblockHeading from './ContactTableUnblockHeading.js';
import LockOpenIcon from '@material-ui/icons/LockOpen';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        padding: '0px'
    },
    content: {
        padding: '0px'
    },
    root2: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
        maxWidth: 150,
        marginTop: '-4',
        minHeight: 10,
        maxHeight: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    largeIcon: {
        height: 22.5,

    },
    addButton: {
        position: 'fixed',
        bottom: 80,
        right: 50,
        zIndex: 99
    },
}))
const PaginationStyle = createMuiTheme({
    overrides: {
        MuiTypography: {
            body2: {
                fontSize: '12px',
                marginTop: '1px'
            }
        }
    }
});


function ContactTable(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = useState([]);
    const [companyDetails, setCompanyDetails] = React.useState(props.data);
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const csvLinkK = useRef() // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

    const handleChangee = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const [mainTab, setMainTab] = useState(0);
    const [data, setData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [blockContact, setBlockContact] = useState([]);

    const [searchVal, setSearchVal] = useState(props.ValueForSearch)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [snackbaropen, setSnackBarOpen] = React.useState(false)
    const [snackbarmessage, setSnackBarMessage] = React.useState('')
    const [ok, setOK] = React.useState('')
    const [openBlockDialog, setOpenBlockDialog] = React.useState(false);
    const [unblockDialog, setUnblockDialog] = React.useState(false);
    const [updateContactDialog, setUpdateContactDialog] = React.useState(false);
    const [unblockDialogData, setUnblockDialogData] = React.useState({});
    const [contactDialogData, setContactDialogData] = React.useState({});
    const [rowvalue, setROWvalue] = React.useState('')
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });


    const [totalItems, setTotalItems] = React.useState(0)
    const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0, blocked: false })
    const [isLoading, setLoading] = React.useState(true)


    const [checked, setChecked] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({
        id: 0,
        name: "",
        description: "",
        begin_dt: null,
        begin_time: null,
        msisdnUrl: "",
        state: false,
        template_id: 0,
        type: null,
        activated: false,
    });
    const [number, SetNumber] = useState(10)
    const [name, setName] = React.useState('')

    const e = (event) => {
        SetNumber(event.target.value);
    };

    const getData = ((loadData) => {
        setLoading(true)

        loadData = () => {
            return CoreHttpHandler.request('contact_book', 'listing', {

                limit: currentParams.limit,
                page: currentParams.page,

                columns: "*",
                orderby: "id",
                sortby: "ASC",
                where: `client_id = $1 AND blocked=${currentParams.blocked}`,
                values: `${companyDetails.id}`,
            }, null, null, true);
        };
        loadData().then((response) => {
            const tableData = response.data.data.list.data
            setData(tableData)
            const result = tableData.filter(tableData => tableData.blocked === true);
            console.log("result : ", result);
            setBlockContact(result)
            setLoading(false)
            setTotalItems(response.data.data.list.totalItems)

        });
    })
    const getDataGroup = ((loadData) => {
        console.log('called get data')
        loadData = () => {
            return CoreHttpHandler.request('contact_group', 'listing', {
                limit: 100,
                page: 0,
                columns: "*",
                sortby: "DESC",
                orderby: "id",
                where: `client_id = $1`,
                values: `${companyDetails.id}`,
            }, null, null, true);
        };
        loadData().then((response) => {
            const tableData = response.data.data.list.data
            console.log("getDataGroup", tableData)
            setGroupData(tableData)

        })
            .catch((error) => {
            })
    })
    setTimeout(() => {
        setSnackBarOpen(false)
        setSnackBarMessage("")
    }, 3000);



    React.useEffect(() => {
        getData()
    }, [currentParams]);

    const setPage = (currentPage) => {
        setCurrentParams({ limit: currentParams.limit, page: currentPage, blocked: currentParams.blocked })
    }

    const setLimit = (pageLimit) => {
        setCurrentParams({ limit: pageLimit, page: 0, blocked: currentParams.blocked })
    }

    const setBlockedOpen = (bool) => {
        setCurrentParams({ limit: currentParams.limit, page: 0, blocked: bool })
    }

    function handleRequestSort(event, property) {
        const id = property;
        let direction = 'desc';
        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }
        setOrder({
            direction,
            id
        });
    }
    function handleChangeTabMain(event, value) {
        setMainTab(value);
    }
    function search() {
        setSearchVal(props.ValueForSearch)
        setData(data.filter(n => n.name.toLowerCase().includes(props.ValueForSearch.toLowerCase())))
    }
    if (searchVal !== props.ValueForSearch) {
        { search() }
    }
    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }
    function handleClick(n) {
        alert("handleClick")
        setOpen(true)
        setDialogData(n)
    }

    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = event => {
        setLimit(Number(event.target.value));
    };

    function handleDialogClose() {
        setUpdateContactDialog(false)
    }

    const toggleChecked = () => {
        setChecked((prev) => !prev);
    };
    const handleClickOpen = () => {
        setDialogData('')
        setOpen(true);

    }
    function handleClick(n) {
        console.log("handleClick : ", n);
        setROWvalue(n)
        setOpenBlockDialog(true)
    }
    const handleUnblockClick = (row) => {
        console.log("handleUnblockClick : ", row);
        setROWvalue(row)
    }
    const handleClose = (val) => {
        setOpen(false)
        setOpenBlockDialog(false)

    };
    const handleCloseAddBlockNumber = () => {
        setOpenBlockDialog(false)
        getData()
    };
    const handleCloseUnBlockUser = () => {
        setUnblockDialog(false)
        getData()
    };
    const handleClickUpdateContact = (data) => {
        setContactDialogData(data)
        setUpdateContactDialog(true)
    };
    const numberExport = () => {
        if (Start === '') setName(moment(new Date().toISOString()).format('DD/MM/YYYY'))
        else setName(moment(Start).format('DD/MM/YYYY') + "-" + moment(End).format('DD/MM/YYYY'))

        setTimeout(() => {
            csvLinkK.current.link.click()
        }, 1000);
    }

    var Start = "";
    var End = "";
    return (
        <>
            <Card className={classes.root}>
                <CardContent className={classes.content} style={{ width: '100%' }}>
                    <div className='companyDetailHeaderTabs' style={{ backgroundColor: '#e73859' }}>
                        <Tabs
                            value={value}
                            onChange={handleChangee}
                            indicatorColor="primary"
                            textColor="white"
                            variant="scrollable"
                            scrollButtons="off"
                            // className="w-full border-b-1 px-100 text-center"
                            // style={{ marginBottom: '0px' }}
                            TabIndicatorProps={{
                                style: { backgroundColor: '#ffffff', height: '3px' }
                            }}
                        >
                            <Tab label="Contacts" {...a11yProps(0)} onClick={() => { setBlockedOpen(false) }} style={{ color: 'white', textColor: 'white' }} />
                            <Tab label="Blocked Contacts" {...a11yProps(1)} style={{ color: 'white', textColor: 'white' }} onClick={() => { setBlockedOpen(true) }} />


                            {/* <Tab label="Contact Group" {...a11yProps(2)} /> */}
                        </Tabs>
                    </div>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={snackbaropen}
                        autoHideDuration={3000}
                    >
                        <Alert variant="filled" severity={ok}>
                            {snackbarmessage}
                        </Alert>
                    </Snackbar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}>



                        <TabPanel value={value} index={0} dir={theme.direction}>


                            {
                                isLoading ?
                                    <div className="flex flex-1 items-center justify-center h-full">
                                        <FuseLoading />
                                    </div>
                                    :
                                    (
                                        data.length ?
                                            (
                                                <React.Fragment>
                                                    <div style={{ flexDirection: 'row', flex: 1, display: 'flex', paddingLeft: '14px' }}>
                                                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                                            <Button
                                                                color="primary"
                                                                size="small"
                                                                variant="contained"
                                                                style={{ borderRadius: 2, marginTop: '-10px' }}
                                                                onClick={numberExport}
                                                            >
                                                                Export
									</Button>
                                                            <CSVLink
                                                                data={data}
                                                                filename={`contacts_${name}.csv`}
                                                                className="hidden"
                                                                ref={csvLinkK}
                                                                target="_blank"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex flex-col">
                                                        <FuseScrollbars className="flex-grow overflow-x-auto">
                                                            <Table className="min-w-xl" aria-labelledby="tableTitle">
                                                                <ContactTableHeader
                                                                    numSelected={selected.length}
                                                                    order={order}
                                                                    onSelectAllClick={handleSelectAllClick}
                                                                    onRequestSort={handleRequestSort}
                                                                    rowCount={data.length}
                                                                />
                                                                <TableBody>
                                                                    {_.orderBy(
                                                                        data,
                                                                        [
                                                                            o => {
                                                                                switch (order.id) {
                                                                                    case 'categories': {
                                                                                        return o.categories[0];
                                                                                    }
                                                                                    default: {
                                                                                        return o[order.id];
                                                                                    }
                                                                                }
                                                                            }
                                                                        ],
                                                                        [order.direction]
                                                                    )
                                                                        .map(n => {
                                                                            const isSelected = selected.indexOf(n.id) !== -1;
                                                                            return (
                                                                                <TableRow
                                                                                    className="h-10 cursor-pointer"
                                                                                    hover
                                                                                    role="checkbox"
                                                                                    aria-checked={isSelected}
                                                                                    tabIndex={-1}
                                                                                    key={n.id}
                                                                                    selected={isSelected}
                                                                                // onClick={event => handleClickUpdateContact(n)}
                                                                                >
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.id}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[0].firstname === "N/A" ? "-" : n.attributes[0].firstname}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[1].lastname === "N/A" ? "-" : n.attributes[1].lastname}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[3].age === "N/A" ? "-" : n.attributes[3].age}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[2].gender === "N/A" ? "-" : n.attributes[2].gender}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.number === "N/A" ? "-" : n.number}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[4].email === "N/A" ? "-" : n.attributes[4].email}

                                                                                    </TableCell>
                                                                                    {<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.dt === null ? '-' : n.dt}
                                                                                    </TableCell>}
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.blocked === true ?
                                                                                            (
                                                                                                <IconButton
                                                                                                    onClick={ev => {
                                                                                                        setUnblockDialogData(n)
                                                                                                        setUnblockDialog(true)
                                                                                                        ev.stopPropagation();
                                                                                                        // handleClick(n)
                                                                                                    }}
                                                                                                >

                                                                                                    <Icon>phone</Icon>

                                                                                                </IconButton>
                                                                                            ) : (
                                                                                                <IconButton
                                                                                                    onClick={ev => {
                                                                                                        ev.stopPropagation();
                                                                                                        setOpenBlockDialog(true)
                                                                                                        setROWvalue(n)
                                                                                                    }}
                                                                                                >
                                                                                                    <Icon name='lock'>block</Icon>

                                                                                                </IconButton>
                                                                                            )}

                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            );
                                                                        })}
                                                                </TableBody>
                                                            </Table>
                                                        </FuseScrollbars>
                                                        <MuiThemeProvider theme={PaginationStyle}>
                                                            <TablePagination
                                                                classes={{
                                                                    root: 'overflow-hidden',
                                                                    spacer: 'w-0 max-w-0',
                                                                    actions: 'text-64',
                                                                    select: 'text-12 mt-4',
                                                                    selectIcon: 'mt-4',
                                                                }}
                                                                className="overflow-hidden"
                                                                component="div"
                                                                style={{ fontSize: '12px' }}
                                                                onChangePage={handleChangePage}
                                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                                                ActionsComponent={ContactsTablePaginationActions}
                                                                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: totalItems }]}
                                                                count={totalItems}
                                                                rowsPerPage={currentParams.limit}
                                                                page={currentParams.page}

                                                            />
                                                        </MuiThemeProvider>
                                                    </div>

                                                </React.Fragment>
                                            )

                                            :


                                            <div className="flex flex-1 items-center justify-center h-full">
                                                <Typography color="textSecondary" variant="h5">
                                                    No Data Found
                                        </Typography>
                                            </div>
                                    )


                            }



                        </TabPanel>

                        <TabPanel value={value} index={1} dir={theme.direction}>


                            {
                                isLoading ?
                                    <div className="flex flex-1 items-center justify-center h-full">
                                        <FuseLoading />
                                    </div>
                                    :
                                    (
                                        data.length ?
                                            (
                                                <React.Fragment>
                                                    <div className="w-full flex flex-col">
                                                        <FuseScrollbars className="flex-grow overflow-x-auto">
                                                            <Table className="min-w-xl" aria-labelledby="tableTitle">
                                                                {/* <ContactTableHeader */}
                                                                <ContactTableUnblockHeading

                                                                    numSelected={selected.length}
                                                                    order={order}
                                                                    onSelectAllClick={handleSelectAllClick}
                                                                    onRequestSort={handleRequestSort}
                                                                    rowCount={blockContact.length}
                                                                />
                                                                <TableBody>
                                                                    {_.orderBy(
                                                                        blockContact,
                                                                        [
                                                                            o => {
                                                                                switch (order.id) {
                                                                                    case 'categories': {
                                                                                        return o.categories[0];
                                                                                    }
                                                                                    default: {
                                                                                        return o[order.id];
                                                                                    }
                                                                                }
                                                                            }
                                                                        ],
                                                                        [order.direction]
                                                                    )
                                                                        .map(n => {
                                                                            const isSelected = selected.indexOf(n.id) !== -1;
                                                                            return (
                                                                                <TableRow
                                                                                    className="h-10 cursor-pointer"
                                                                                    hover
                                                                                    role="checkbox"
                                                                                    aria-checked={isSelected}
                                                                                    tabIndex={-1}
                                                                                    key={n.id}
                                                                                    selected={isSelected}
                                                                                // onClick={event => handleClick(n)}
                                                                                >
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.id}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[0].firstname === "N/A" ? "-" : n.attributes[0].firstname}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[1].lastname === "N/A" ? "-" : n.attributes[1].lastname}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[3].age === "N/A" ? "-" : n.attributes[3].age}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[2].gender === "N/A" ? "-" : n.attributes[2].gender}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.number === "N/A" ? "-" : n.number}
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.attributes[4].email === "N/A" ? "-" : n.attributes[4].email}

                                                                                    </TableCell>
                                                                                    {<TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.dt === null ? '-' : n.dt}
                                                                                    </TableCell>}
                                                                                    <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                                        {n.blocked === true ?
                                                                                            (
                                                                                                <IconButton
                                                                                                    onClick={ev => {
                                                                                                        setUnblockDialogData(n)
                                                                                                        setUnblockDialog(true)
                                                                                                        ev.stopPropagation();
                                                                                                        // handleClick(n)
                                                                                                    }}
                                                                                                >
                                                                                                    {/* <Icon>phone</Icon> */}
                                                                                                    <LockOpenIcon style={{ color: "#8b8b8b" }} />
                                                                                                </IconButton>
                                                                                            ) : (
                                                                                                <IconButton
                                                                                                    onClick={ev => {
                                                                                                        ev.stopPropagation();
                                                                                                        setOpenBlockDialog(true)
                                                                                                        setROWvalue(n)
                                                                                                    }}
                                                                                                >
                                                                                                    <Icon name='lock'>block</Icon>

                                                                                                </IconButton>
                                                                                            )}

                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            );
                                                                        })}
                                                                </TableBody>
                                                            </Table>
                                                        </FuseScrollbars>
                                                        <MuiThemeProvider theme={PaginationStyle}>
                                                            <TablePagination
                                                                classes={{
                                                                    root: 'overflow-hidden',
                                                                    spacer: 'w-0 max-w-0',
                                                                    actions: 'text-64',
                                                                    select: 'text-12 mt-4',
                                                                    selectIcon: 'mt-4',
                                                                }}
                                                                className="overflow-hidden"
                                                                component="div"
                                                                style={{ fontSize: '12px' }}
                                                                onChangePage={handleChangePage}
                                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                                                ActionsComponent={ContactsTablePaginationActions}

                                                                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: totalItems }]}
                                                                count={totalItems}
                                                                rowsPerPage={currentParams.limit}
                                                                page={currentParams.page}

                                                            />
                                                        </MuiThemeProvider>

                                                    </div>

                                                </React.Fragment>
                                            )

                                            :


                                            <div className="flex flex-1 items-center justify-center h-full">
                                                <Typography color="textSecondary" variant="h5">
                                                    No Data Found
                                        </Typography>
                                            </div>
                                    )


                            }



                            {/* <div style={{ flexDirection: 'row', flex: 1, display: 'flex', paddingLeft: '14px' }}>
                                <div>
                                    <Button
                                        size='small'
                                        variant="contained"
                                        style={{ borderRadius: 0 }}>
                                        Export
           							 </Button>
                                </div>
                            </div> */}

                        </TabPanel>

                    </SwipeableViews>
                    {updateContactDialog && <ContactDialog isOpen={updateContactDialog} type='edit' data={contactDialogData} closeDialog={handleDialogClose} />}
                    {/* <ContactDialog isOpen={true} type='Update Campaign' data={dialogData} closeDialog={handleDialogClose} /> */}
                    {openBlockDialog && <BlockContactInDialog isOpen={openBlockDialog} type="Block Number" data={rowvalue} closeDialog={handleCloseAddBlockNumber} />}
                    {unblockDialog && <BlockDialog isOpen={unblockDialog} type="Unblock Number" closeDialog={handleCloseUnBlockUser} data={unblockDialogData} />}
                </CardContent>
            </Card>
        </>
    );
}
export default withRouter(ContactTable);