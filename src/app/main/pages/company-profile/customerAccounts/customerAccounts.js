import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import Widget2 from './widgets/Widget2';
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
import CustomerTable from './customerTable/CustomerTable'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';

import { ThemeProvider, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const SearchStyle = createMuiTheme({
    overrides: {
        MuiInput: {
            root: {
                paddingTop: 0,
                fontSize: '12px',
                paddingBottom: 0,
                margin: 0,
                border: 0,
                borderRadius: 0,
                height: '30px'
            }
        }
    }
});


const useStyles = makeStyles({
    layoutRoot: {},
    content: {
        '& canvas': {
            maxHeight: '80%'
        }
    }
});
function CustomerAccounts(props) {

    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    const classes = useStyles();
    const [clients, setClient] = React.useState([]);
    const [activeClients, setActiveClients] = React.useState("");
    const [inactiveClients, setInactiveClients] = React.useState("");
    const [value, setValue] = React.useState("");
    const dataSourceOptions = {
        params: {
            columns: "*",
            sortby: "ASC",
            orderby: "id",
            where: "id != $1 AND displayed = false order by id",
            values: 0,
        },
        type: 'dashboard',
        apiType: 'listing',
    };

    React.useEffect(() => {
        CoreHttpHandler.request('Business', 'get', {}, dataSourceSuccessBusiness, dataSourceFailureBusiness);
    }, [])
    const dataSourceSuccessBusiness = (response) => {
        setClient(response.data.data.clients.clients)
        setActiveClients(response.data.data.clients.active_clients.active)
        setInactiveClients(response.data.data.clients.inactive_clients.inactive)
    };
    const dataSourceFailureBusiness = (response) => {
    };
    const changeStatus = (params) => {
        CoreHttpHandler.request('Business', 'changeStatus', params, dataSourceSuccessChangeStatus, dataSourceFailureChangeStatus);

    }
    const dataSourceSuccessChangeStatus = (response) => {
        CoreHttpHandler.request('Business', 'get', { ...dataSourceOptions.params }, dataSourceSuccessBusiness, dataSourceFailureBusiness);


    };
    const dataSourceFailureChangeStatus = (response) => {
        console.log("dataSourceFailureChangeStatus response : ", response);
    };


    if (clients.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <FuseLoading />
            </div>
        );
    }

    return (
        <FusePageSimple
            classes={{
                header: 'min-h-150 h-150 sm:h-150 sm:min-h-150',
                content: classes.content
            }}
            header={
                <div className="flex flex-col justify-between flex-1 px-20 pt-20 ">
                    <div className="flex items-center pt-30">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-26">dashboard</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className=" py-0 sm:py-24 hidden sm:flex mx-0 sm:mx-12 text-20" variant="h6">
                                Business Accounts
							</Typography>
                        </FuseAnimate>
                        {/*  */}
                        <div className="flex flex-1 items-center justify-center px-12">
                            <ThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideDownIn" delay={300}>
                                    <Paper className="flex items-center w-full max-w-sm px-8 py-4" elevation={1}>
                                        <Icon color="action" fontSize="small">search</Icon>
                                        <MuiThemeProvider theme={SearchStyle}>
                                            <Input
                                                style={{ border: 'none' }}
                                                rows={1}
                                                placeholder="Search"
                                                className="flex flex-1 mx-8 "
                                                disableUnderline
                                                onChange={e => {
                                                    setValue(e.target.value)
                                                }}
                                            />
                                        </MuiThemeProvider>
                                    </Paper>
                                </FuseAnimate>
                            </ThemeProvider>
                        </div>


                    </div>
                </div>
            }
            content={

                <>
                    <div className="p-24" style={{ scrollX: false }}>
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: 'transition.slideUpBigIn'
                            }}>
                            <Grid container spacing={4}>
                                <Grid item md={12} sm={12} xs={12} >
                                    <Grid container spacing={4} style={{ marginBottom: '22px', marginTop: '-1px', marginLeft: 4 }}>
                                        <Button style={{ fontSize: '11px' }} variant="contained" color="primary" onClick={(e) => { props.history.push({ pathname: '/apps/company-forms' }) }}>
                                            <span style={{textTransform:"capitalize",fontSize:"13px"}}>Create Account</span>
                                        </Button>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item md={6} sm={12} xs={12} >
                                            <Widget2 count={activeClients} bottom_title='Active Customers' />
                                        </Grid>
                                        <Grid item md={6} sm={12} xs={12} >
                                            <Widget2 count={inactiveClients} bottom_title='Inactive Customers' />
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} style={{ marginTop: 10 }}>
                                <Grid item md={12} sm={12} xs={12} >
                                    <CustomerTable clients={clients} onchange={(e) => { changeStatus(e) }} searchValue={value} />
                                </Grid>
                            </Grid>
                        </FuseAnimateGroup>
                    </div>
                </>
            }
        />
    );
}

export default CustomerAccounts;
