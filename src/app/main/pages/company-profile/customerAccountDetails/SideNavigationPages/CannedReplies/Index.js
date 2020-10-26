import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TableHeader from './TableHeader';
import ContactsTablePaginationActions from '../../../../setting/canned/ContactsTablePaginationActions';
import { makeStyles, ThemeProvider, createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import CannedDialog from './CannedDialog'
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../../../@fuse/core/FuseLoading/FuseLoading'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import SwipeableViews from 'react-swipeable-views';



import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
    addButton: {
        position: 'fixed',
        bottom: 80,
        right: 50,
        zIndex: 99
    },
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

function CannedReplies(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([]);
    const [companyDetails, setCompanyDetails] = React.useState(props.data);

    const [data2, setData2] = useState(data);
    const [page, setPage] = useState(0);
    const [searchVal, setSearchVal] = useState(props.ValueForSearch)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [snackbaropen, setSnackBarOpen] = React.useState(false)
    const [snackbarmessage, setSnackBarMessage] = React.useState('')
    const [type, setType] = React.useState('')
    const [totalItems, setTotalItems] = React.useState(0);

    const [ok, setOK] = React.useState('')
    const [textType, settextType] = React.useState([])
    const [audioType, setaudioType] = React.useState([])
    const [videoType, setvideoType] = React.useState([])
    const [docmentType, setdocumentType] = React.useState([])
    const [imageype, setimageType] = React.useState([])
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });
    const [checked, setChecked] = React.useState(false);
    const [enabled, setEnabled] = React.useState(false);


    const [tabValue, setTabValue] = useState(0);
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 });

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
        client_id: props.data.id,
        enabled: false
    });
    const [number, SetNumber] = useState(10)
    const handleChange = (event) => {
        SetNumber(event.target.value);
    };
    const getData = ((loadData) => {
        loadData = () => {
            return CoreHttpHandler.request(
                'canned_messages',
                'type_listing',
                {
                    ...currentParams,
                    key: ':type',
                    value: "all",
                    columns: '*',
                    sortby: 'DESC',
                    orderby: 'id',
                    where: 'message_type = $1',
                    values: 0,
                    client_id: props.data.id
                },
                null,
                null,
                true
            );
        };
        loadData().then((response) => {
            const tableData = response.data.data.list.data
            setData(tableData)
            setData2(tableData)
            console.log(tableData)
            setTotalItems(response.data.data.list.totalItems);
            settextType(tableData.filter(type => type.message_type === "text"));
            setvideoType(tableData.filter(type => type.message_type === "video"))
            setaudioType(tableData.filter(type => type.message_type === "audio"))
            setdocumentType(tableData.filter(type => type.message_type === "document"))
            setimageType(tableData.filter(type => type.message_type === "image"))
           
        });
    })
    setTimeout(() => {
        setSnackBarOpen(false)
        setSnackBarMessage("")
    }, 3000);
    React.useEffect(() => {
        getData()
    }, []);
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
    function handleChangeTab(event, value) {
        setTabValue(value);

    }
    function search() {
        setSearchVal(props.ValueForSearch)
        setData2(data.filter(n => n.name.toLowerCase().includes(props.ValueForSearch.toLowerCase())))

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
        console.log("row data : ", n);
        setDialogData(n)
        setType('Update Canned Message')
        setOpen(true)
    }

    if (data2.length === 0) {
        if (props.ValueForSearch === '') {
            return (
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No Data Found
					</Typography>
                </div>
            )
        }
        // else {
        //     return (
        //         <div className="flex flex-1 items-center justify-center h-full">
        //             <FuseLoading />
        //         </div>
        //     );
        // }
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

    function handleChangePage(event, value) {
        setPage(value);
    }
    function handleDialogClose() {
        setOpen(false)
    }


    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    // const toggleChecked = () => {
    //     setChecked((prev) => !prev);
    // };

    const toggleChecked = (e) => {
        console.log("e", e);
        // setEnabled((prev) => !prev);
    };


    const closeDialog = () => {
        setOpen(false);
        getData();

    };
    const handleClickOpen = () => {
        // alert("Create")
        setDialogData({
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
            client_id: props.data.id,
            enabled: false
        })
        setType("Create Canned Message")
        setOpen(true);
    };


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


    const handleChangee = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndexx = (index) => {
        setValue(index);
    };

    console.log(data2)

    return (

        <>

            <Card className={classes.root} >

                <CardContent className={classes.content} style={{ width: '100%' }}>
                    <Typography variant='h2' className='companyDetailHeader' style={{ backgroundColor: "#e73859", color: "white" }}>Canned Replies</Typography>

                    <Tabs
                        value={value}
                        onChange={handleChangee}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full border-b-1 px-100 text-center h-48 "
                        style={{ marginBottom: '8px' }}
                    >
                        <Tab label="All Messages" {...a11yProps(0)} />
                        <Tab label="text" {...a11yProps(1)} />
                        <Tab label="image" {...a11yProps(2)} />
                        <Tab label="Video" {...a11yProps(3)} />
                        <Tab label="Audio" {...a11yProps(4)} />
                        <Tab label="document" {...a11yProps(5)} />
                    </Tabs>

                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndexx}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <div className="w-full flex flex-col">
                                <FuseScrollbars className="flex-grow overflow-x-auto">
                                    <Table className="min-w-xl" aria-labelledby="tableTitle">
                                        <TableHeader
                                            numSelected={selected.length}
                                            order={order}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={data.length}
                                        />
                                        <TableBody>
                                            {_.orderBy(
                                                data2,

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
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                            onClick={event => handleClick(n)}
                                                        >
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.id}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_name}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_text}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_type}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.enabled ? (
                                                                    <Icon className="text-green text-16">check_circle</Icon>
                                                                ) : (
                                                                        <Icon className="text-red text-16">cancel</Icon>
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
                                        count={data.length}
                                        style={{ fontSize: '12px' }}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={ContactsTablePaginationActions}
                                    />
                                </MuiThemeProvider>
                                {/* <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        size="medium"
                                        className={classes.addButton}
                                        onClick={handleClickOpen}
                                    >
                                        <Icon>person_add</Icon>
                                    </Fab>
                                </FuseAnimate> */}
                               
                            </div>

                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <div className="w-full flex flex-col">
                                <FuseScrollbars className="flex-grow overflow-x-auto">
                                    <Table className="min-w-xl" aria-labelledby="tableTitle">
                                        <TableHeader
                                            numSelected={selected.length}
                                            order={order}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={textType.length}
                                        />
                                        <TableBody>
                                            {_.orderBy(
                                                textType,

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
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                            onClick={event => handleClick(n)}
                                                        >
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.id}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_name}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_text}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_type}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.enabled ? (
                                                                    <Icon className="text-green text-16">check_circle</Icon>
                                                                ) : (
                                                                        <Icon className="text-red text-16">cancel</Icon>
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
                                        count={data.length}
                                        style={{ fontSize: '12px' }}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={ContactsTablePaginationActions}
                                    />
                                </MuiThemeProvider>
                                {/* <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        size="medium"
                                        className={classes.addButton}
                                        onClick={handleClickOpen}
                                    >
                                        <Icon>person_add</Icon>
                                    </Fab>
                                </FuseAnimate> */}
                               
                            </div>

                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <div className="w-full flex flex-col">
                                <FuseScrollbars className="flex-grow overflow-x-auto">
                                    <Table className="min-w-xl" aria-labelledby="tableTitle">
                                        <TableHeader
                                            numSelected={selected.length}
                                            order={order}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={imageype.length}
                                        />
                                        <TableBody>
                                            {_.orderBy(
                                                imageype,

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
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                            onClick={event => handleClick(n)}
                                                        >
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.id}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_name}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_text}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_type}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.enabled ? (
                                                                    <Icon className="text-green text-16">check_circle</Icon>
                                                                ) : (
                                                                        <Icon className="text-red text-16">cancel</Icon>
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
                                        count={data.length}
                                        style={{ fontSize: '12px' }}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={ContactsTablePaginationActions}
                                    />
                                </MuiThemeProvider>
                                
                               
                            </div>

                        </TabPanel>
                        <TabPanel value={value} index={3} dir={theme.direction}>
                            <div className="w-full flex flex-col">
                                <FuseScrollbars className="flex-grow overflow-x-auto">
                                    <Table className="min-w-xl" aria-labelledby="tableTitle">
                                        <TableHeader
                                            numSelected={selected.length}
                                            order={order}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={videoType.length}
                                        />
                                        <TableBody>
                                            {_.orderBy(
                                                videoType,

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
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                            onClick={event => handleClick(n)}
                                                        >
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.id}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_name}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_text}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_type}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.enabled ? (
                                                                    <Icon className="text-green text-16">check_circle</Icon>
                                                                ) : (
                                                                        <Icon className="text-red text-16">cancel</Icon>
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
                                        count={data.length}
                                        style={{ fontSize: '12px' }}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={ContactsTablePaginationActions}
                                    />
                                </MuiThemeProvider>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        size="medium"
                                        className={classes.addButton}
                                        onClick={handleClickOpen}
                                    >
                                        <Icon>person_add</Icon>
                                    </Fab>
                                </FuseAnimate>
                               
                            </div>

                        </TabPanel>
                        <TabPanel value={value} index={4} dir={theme.direction}>
                            <div className="w-full flex flex-col">
                                <FuseScrollbars className="flex-grow overflow-x-auto">
                                    <Table className="min-w-xl" aria-labelledby="tableTitle">
                                        <TableHeader
                                            numSelected={selected.length}
                                            order={order}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={audioType.length}
                                        />
                                        <TableBody>
                                            {_.orderBy(
                                                audioType,

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
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                            onClick={event => handleClick(n)}
                                                        >
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.id}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_name}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_text}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_type}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.enabled ? (
                                                                    <Icon className="text-green text-16">check_circle</Icon>
                                                                ) : (
                                                                        <Icon className="text-red text-16">cancel</Icon>
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
                                        count={data.length}
                                        style={{ fontSize: '12px' }}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={ContactsTablePaginationActions}
                                    />
                                </MuiThemeProvider>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        size="medium"
                                        className={classes.addButton}
                                        onClick={handleClickOpen}
                                    >
                                        <Icon>person_add</Icon>
                                    </Fab>
                                </FuseAnimate>
                               
                            </div>

                        </TabPanel>
                        <TabPanel value={value} index={5} dir={theme.direction}>
                            <div className="w-full flex flex-col">
                                <FuseScrollbars className="flex-grow overflow-x-auto">
                                    <Table className="min-w-xl" aria-labelledby="tableTitle">
                                        <TableHeader
                                            numSelected={selected.length}
                                            order={order}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={docmentType.length}
                                        />
                                        <TableBody>
                                            {_.orderBy(
                                                docmentType,

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
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                            onClick={event => handleClick(n)}
                                                        >
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.id}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_name}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_text}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.message_type}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row" align="center" style={{ fontSize: '11px', padding: '10px' }}>
                                                                {n.enabled ? (
                                                                    <Icon className="text-green text-16">check_circle</Icon>
                                                                ) : (
                                                                        <Icon className="text-red text-16">cancel</Icon>
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
                                        count={data.length}
                                        style={{ fontSize: '12px' }}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={ContactsTablePaginationActions}
                                    />
                                </MuiThemeProvider>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        size="medium"
                                        className={classes.addButton}
                                        onClick={handleClickOpen}
                                    >
                                        <Icon>person_add</Icon>
                                    </Fab>
                                </FuseAnimate>
                               
                            </div>

                        </TabPanel>
                   
                   
                   
                    </SwipeableViews>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={snackbaropen}
                        autoHideDuration={3000}
                    >
                        <Alert variant="filled" severity={ok}>
                            {snackbarmessage}
                        </Alert>
                    </Snackbar>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        size="medium"
                                        className={classes.addButton}
                                        onClick={handleClickOpen}
                                    >
                                        <Icon>person_add</Icon>
                                    </Fab>
                                </FuseAnimate>
                    {open && <CannedDialog type={type} data={dialogData} isOpen={open} closeDialog={closeDialog} />}
                </CardContent>
            </Card>
        </>
    );
}
export default withRouter(CannedReplies);