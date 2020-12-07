import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AutoReplyTableHeader from './autoReplyTableHeader';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler';
import FuseLoading from '../../../../../../../@fuse/core/FuseLoading/FuseLoading';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { Redirect } from 'react-router'
import { useHistory } from "react-router-dom";
import AddAutoReply from "./addAutoReply";
import moment from "moment"
import ConfirmationDialogue from './confirmationDialogue';
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%',
        padding: '0px'
    },
    content: {
        padding: '0px'
    },
    addButton: {
        position: 'fixed',
        bottom: 80,
        right: 50,
        zIndex: 99
    },
    root2: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
        maxWidth: 150,
        marginTop: '-4',
        minHeight: 10,
        maxHeight: 100
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    largeIcon: {
        height: 22.5
    },
    addButton: {
        position: 'fixed',
        bottom: 80,
        right: 50,
        zIndex: 99
    }
}));

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

function AutoReplyTable(props) {

    const history = useHistory();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [chatBotData, setChatBotData] = React.useState(null);

    const [selected, setSelected] = useState([]);
    const [companyDetails, setCompanyDetails] = React.useState(props.data);
    const [data, setData] = useState([]);
    const [agent, setAgent] = React.useState([]);

    const [data2, setData2] = useState(data);

    const [searchVal, setSearchVal] = useState(props.ValueForSearch);

    const [snackbaropen, setSnackBarOpen] = React.useState(false);
    const [snackbarmessage, setSnackBarMessage] = React.useState('');
    const [ok, setOK] = React.useState('');
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });
    const [checked, setChecked] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({
        id: 0,
        name: '',
        description: '',
        begin_dt: null,
        begin_time: null,
        msisdnUrl: '',
        state: false,
        template_id: 0,
        type: null,
        activated: false
    });
    const [number, SetNumber] = useState(10);
    const handleChange = event => {
        SetNumber(event.target.value);
    };

    const [totalItems, setTotalItems] = React.useState(0);
    const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 });
    const [isLoading, setLoading] = React.useState(true);
    const [confirmation, setConfirmationType] = React.useState(null);
    const [confirmationData, setConfirmationData] = React.useState(null);

    const getData = loadData => {
        loadData = () => {
            return CoreHttpHandler.request(
                'campaigns',
                'listing',
                {
                    columns: '*',
                    limit: 100,
                    orderby: 'id',
                    page: 0,
                    sortby: 'ASC',
                    values: 1,
                    where: 'displayed = $1'
                },
                null,
                null,
                true
            );
        };
        loadData().then(response => {
            const tableData = response.data.data.list.data;
            setData(tableData);
            setData2(tableData);
        });
    };
    setTimeout(() => {
        setSnackBarOpen(false);
        setSnackBarMessage('');
    }, 3000);

    React.useEffect(() => {
        getPaginatedData();
    }, [currentParams]);

    const getPaginatedData = () => {
        if (companyDetails) {
            setLoading(true);

            let update_params = {
                key: ':id',
                value: companyDetails.id
            };
            CoreHttpHandler.request(
                'CompanyAgent',
                'get_chatbot',
                update_params,
                response => {
                    setLoading(false);
                    setData(response.data.data.autoreply)
                },
                error=>{
                    
                }
            );
        }
    };
    const dataSourceSuccessCompanyAgent = response => {
        setAgent(response.data.agentList);
        setData(response.data.data.all_agents);
        console.log('dataSourceSuccessCompanyAgent response', response);
    };
    const dataSourceFailureCompanyAgent = response => {
        console.log('dataSourceFailureCompanyAgent response : ', response);
    };

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

    function search() {
        setSearchVal(props.ValueForSearch);
        setData2(data.filter(n => n.name.toLowerCase().includes(props.ValueForSearch.toLowerCase())));
    }
    if (searchVal !== props.ValueForSearch) {
        {
            search();
        }
    }
    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }


    const handleClick = (e) => {
        props.history.push({ pathname: '/apps/addAutoReply' });

    }


    const handleClickAdd = () => {
        setOpen(true);
    };
    const updateChatBot = n =>{
        setOpen(true)
        setChatBotData(n)
    }
    function showError(msg) {
        setSnackBarMessage(msg);
        setOK('error');
        setSnackBarOpen(true);
    }
    function showMessage ({msg,success}){

        if (msg) {
            setSnackBarMessage(msg);
            setOK(success ? "success" : "error");
            setSnackBarOpen(true);
        }
    }
    function closeHandler({ msg, success }) {
        setOpen(false)
        setChatBotData(null)
        showMessage({ msg, success})
    }

    function handleDialogClose(e) {
        if (e == 'create') {
            setSnackBarMessage('Created Successfully');
            setOK('success');
            setSnackBarOpen(true);
        } else if (e == 'update') {
            setSnackBarMessage('Update Successfully');
            setOK('success');
            setSnackBarOpen(true);
        } else if (e == 'error') {
            setSnackBarMessage('Error! Please Try Again Later');
            setOK('error');
            setSnackBarOpen(true);
            setOpen(false);
            return;
        } else if (e == 'No Change') {
            setSnackBarMessage('You did not make any changes');
            setOK('error');
            setSnackBarOpen(true);
            return;
        }


        setDialogData({});

        getPaginatedData();

        setOpen(false);
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

    const setPage = currentPage => {
        setCurrentParams({ limit: currentParams.limit, page: currentPage });
    };

    const setLimit = pageLimit => {
        setCurrentParams({ limit: pageLimit, page: 0 });
    };

    const toggleChecked = () => {
        setChecked(prev => !prev);
    };
    const handleClickOpen = () => {
        setDialogData('');
        setOpen(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setLimit(Number(event.target.value));
    };
    const saveHandler = ({ treeData, name }) => {
        if (companyDetails) {
            let update_params = {
                treeData,
                clientId: companyDetails.id,
                name
            };
            CoreHttpHandler.request(
                'CompanyAgent',
                'add_chatbot',
                update_params,
                response => {
                    closeHandler({ msg: "Successfully Saved", success: true })
                    getPaginatedData()
                },
            );
        }
    }
    const updateHandler = ({ treeData, name }) => {
        if (companyDetails&&chatBotData) {
            let update_params = {
                treeData,
                clientId: companyDetails.id,
                name,
                id:chatBotData.id
            }
            CoreHttpHandler.request(
                'CompanyAgent',
                'update_chatbot',
                update_params,
                response => {
                    closeHandler({ msg: "Successfully Updated", success: true })
                    getPaginatedData()
                },
            );
        }
    }
    const handleConfirmationDialogClose = e =>{
        setConfirmationData(null)
        setConfirmationType(null)
    }
    const openConfirmationDialogue = (type,data)=>{

        setConfirmationData(data)
        setConfirmationType(type)
    }
    const handleConfirmationSubmit = value =>{
        if (confirmationData&&confirmation) {
            let update_params = {
                attributeType: confirmation,
                value,
                id:confirmationData.id,
                
                clientId: companyDetails.id,
            }
            CoreHttpHandler.request(
                'CompanyAgent',
                'update_chatbot_attribute',
                update_params,
                response => {
                    showMessage({ msg:"Successfully Updated", success:true})
                    handleConfirmationDialogClose()
                    getPaginatedData()
                },
            );
        }
        
    }
    return (
        <>
            <Card className={classes.root}>
                <CardContent className={classes.content} style={{ width: '100%' }}>
                    {
                        !open ?

                            <Typography
                                variant="h2"
                                className="companyDetailHeader"
                                style={{ backgroundColor: '#e73859', color: 'white' }}
                            >
                                Auto Reply
					</Typography> : null
                    }
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={snackbaropen}
                        autoHideDuration={7000}
                    >
                        <Alert variant="filled" severity={ok}>
                            {snackbarmessage}
                        </Alert>
                    </Snackbar>
                    {
                        open ?
                        <div style={{backgroundColor:"white"}}>

                        <AddAutoReply
                                data={chatBotData}
                                closeHandler={closeHandler}
                                saveHandler={saveHandler}
                                updateHandler={updateHandler}
                            /> 
                        </div>:
                            (
                                isLoading ? (
                                    <div className="flex flex-1 items-center justify-center h-full">
                                        <FuseLoading />
                                    </div>
                                ) : data.length ? (
                                    <div className="w-full flex flex-col">
                                        <FuseScrollbars className="flex-grow overflow-x-auto">
                                            <Table className="min-w-xl" aria-labelledby="tableTitle">
                                                <AutoReplyTableHeader
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

                                                        .map((n, i) => {
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

                                                                >

                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        align="center"
                                                                        style={{ fontSize: '11px', padding: '10px' }}
                                                                    >
                                                                        {n.name}
                                                                    </TableCell>




                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        align="center"
                                                                        style={{ fontSize: '11px', padding: '10px' }}
                                                                        onClick={(e)=>{openConfirmationDialogue("enabled",n)}}
                                                                    >
                                                                        <div>
                                                                            {
                                                                                n.enabled === true ?

                                                                                    <Icon name="lock" color="primary">
                                                                                        check_circle
                                                                            </Icon>
                                                                                    :
                                                                                    <Icon name="lock">radio_button_unchecked</Icon>
                                                                            }
                                                                        </div>
                                                                    </TableCell>

                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        align="center"
                                                                        style={{ fontSize: '11px', padding: '10px' }}
                                                                        onClick={
                                                                            (e)=>{
                                                                                if(n.enabled&&!n.is_deleted&&!n.is_default)
                                                                                openConfirmationDialogue("default",n)
                                                                                
                                                                                }
                                                                        
                                                                        }
                                                                    
                                                                    >
                                                                        <div>
                                                                            {
                                                                                n.is_default === true ?

                                                                                    <Icon name="lock" color="primary">
                                                                                        check_circle
                                                                            </Icon>
                                                                                    :
                                                                                    <Icon name="lock">radio_button_unchecked</Icon>
                                                                            }
                                                                        </div>
                                                                    </TableCell>


                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        align="center"
                                                                        style={{ fontSize: '11px', padding: '10px' }}
                                                                        onClick={(e)=>{openConfirmationDialogue("delete",n)}}

                                                                    >
                                                                        <div>
                                                                            {
                                                                                n.is_deleted === true ?

                                                                                    <Icon name="lock" color="primary">
                                                                                        restore
                                                                                    </Icon>
                                                                                    :
                                                                                    <Icon name="lock">delete</Icon>
                                                                            }
                                                                        </div>
                                                                    </TableCell>


                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        align="center"
                                                                        style={{ fontSize: '11px', padding: '10px' }}
                                                                    >
                                                                        {moment(n.dt).format("YYYY-MM-DD hh:mm")}
                                                                    </TableCell>


                                                                    

                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        align="center"
                                                                        style={{ fontSize: '11px', padding: '10px' }}
                                                                            onClick={e=>{updateChatBot(n)}}
                                                                    >
                                                                        <Icon name="lock" color="primary">
                                                                                        edit
                                                                                    </Icon>
                                                                    </TableCell>

                                                                </TableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                            {
                                                confirmation&&confirmationData?
                                                    <ConfirmationDialogue
                                                        type={confirmation}
                                                        data={confirmationData}
                                                        handleDialogClose={handleConfirmationDialogClose}
                                                        handleSubmit={handleConfirmationSubmit}
                                                    />

                                                :null
                                            }
                                        </FuseScrollbars>
                                        <FuseAnimate animation="transition.expandIn" delay={300}>
                                            <Fab
                                                color="primary"
                                                aria-label="add"
                                                size="medium"
                                                className={classes.addButton}
                                                onClick={handleClickAdd}
                                            >
                                                <Icon>person_add</Icon>
                                            </Fab>
                                        </FuseAnimate>
                                    </div>
                                ) : (
                                            <div className="flex flex-1 items-center justify-center h-full mt-2">
                                                <Typography color="textSecondary" variant="h5">
                                                    No Data Found!
                                                </Typography>
                                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                                    <Fab
                                                        color="primary"
                                                        aria-label="add"
                                                        size="medium"
                                                        className={classes.addButton}
                                                        onClick={handleClickAdd}
                                                    >
                                                        <Icon>person_add</Icon>
                                                    </Fab>
                                                </FuseAnimate>

                                            </div>
                                        ))

                    }
                </CardContent>
            </Card>
        </>
    );
}

export default withRouter(AutoReplyTable);


