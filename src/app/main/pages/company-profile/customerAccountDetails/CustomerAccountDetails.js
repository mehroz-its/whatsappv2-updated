import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import CustomerDetailsHeader from './CustomerDetailsHeader';
import CustomerDetailSideBar from './CustomerDetailSideBar';
import { useDispatch } from 'react-redux';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Profile from './SideNavigationPages/Profile/Index'
import ContactTable from './SideNavigationPages/contact/ContactTable'
import TemplateMessage from './SideNavigationPages/TemplateMessage/Index'
import AgentTable from './SideNavigationPages/agents/AgentTable'
import CannedReplies from './SideNavigationPages/CannedReplies/Index'
import Dashboard from './SideNavigationPages/Intelligence/DashboardApp'
const useStyles = makeStyles((theme) => ({
    addButton: {
        position: 'fixed',
        bottom: 50,
        right: 50,
        zIndex: 99
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 330,

    },
}));

function CustomerDetails(props) {
    const { location } = props
    const pageLayout = useRef(null);
    const [companyDetails, setCompanyDetails] = React.useState(location.data);
    const [statics, setStatics] = React.useState([]);
    const [agent, setAgent] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [data2, setData2] = React.useState(data);
    const [snackbaropen, setSnackBarOpen] = React.useState(false)
    const [snackbarmessage, setSnackBarMessage] = React.useState('')
    const [ok, setOK] = React.useState('')
    const [cannedtype, setCannedType] = React.useState('all')
    const [tab, setTab] = React.useState('Intelligence')


    const [dialogData, setDialogData] = React.useState(
        {
            id: 0,
            title: '',
            description: '',
            enabled: true,
            customers: [],
            attachment_url: ''
        }
    )

    const getData = ((loadData) => {
        setData([])
        setData2([])
        loadData = () => {
            return CoreHttpHandler.request('canned_messages', 'type_listing', {
                limit: 100,
                key: ':type',
                value: cannedtype,
                page: 0,
                columns: "*",
                sortby: "DESC",
                orderby: "id",
                where: "id != $1",
                values: 0,
            }, null, null, true);
        };
        loadData().then((response) => {
            const tableData = response.data.data.list.data
            setData(tableData)
            setData2(tableData)
            setTimeout(() => {
                setSnackBarMessage('')
                setSnackBarOpen(false)
            }, 3000);

        })
            .catch((error) => {
                setTimeout(() => {
                    setSnackBarMessage('')
                    setSnackBarOpen(false)
                }, 3000);

            })


    })

    React.useEffect(() => {
        console.log("companyDetailssss", companyDetails);
        if (companyDetails) {
            let update_params = {
                key: ':client_id',
                value: companyDetails.id,
                params: {}
            }
            CoreHttpHandler.request('BusinessDetails', 'get', update_params, dataSourceSuccessBusinessDetails, dataSourceFailureBusinessDetails);
            // CoreHttpHandler.request('CompanyStats', 'get', update_params, dataSourceSuccessCompanyStats, dataSourceFailureCompanyStats);
            // CoreHttpHandler.request('CompanyAgent', 'get', update_params, dataSourceSuccessCompanyAgent, dataSourceFailureCompanyAgent);
        }
        else {
            props.history.push({ pathname: '/apps/company-profile' })
        }

    }, [])

    const dataSourceSuccessBusinessDetails = (response) => {
        console.log("dataSourceSuccessBusinessDetails response : ", response);

    };
    const dataSourceFailureBusinessDetails = (response) => {
        console.log("dataSourceFailureBusinessDetails response : ", response);
    };
    const dataSourceSuccessCompanyStats = (response) => {
        console.log("dataSourceSuccessCompanyStats response", response);
        setStatics(response.data.data.chart)
    };
    const dataSourceFailureCompanyStats = (response) => {
        console.log("dataSourceFailureCompanyStats response : ", response);
    };

    const dataSourceSuccessCompanyAgent = (response) => {
        setAgent(response.data.data.all_agents)
        console.log("dataSourceSuccessCompanyAgent response", response);
    };
    const dataSourceFailureCompanyAgent = (response) => {
        console.log("dataSourceFailureCompanyAgent response : ", response);
    };
   
    const valueReceived = (value) => {
        // alert(value)
        if (value === "update") {
            setSnackBarMessage("Updated Successfully")
            setOK("success")
            setSnackBarOpen(true)
        }
        else if (value === "create") {
            setSnackBarMessage("Created Succecfully")
            setOK("success")
            setSnackBarOpen(true)
        }
        else if (value === "error") {
            setSnackBarMessage("Error!Please Try Again Later")
            setOK("error")
            setSnackBarOpen(true)
        }
        else if (value === "delete") {
            setSnackBarMessage("Deleted Successfully")
            setOK("success")
            setSnackBarOpen(true)
        }
        else if (value !== ("update" || "delete" || "create")) {
            setSnackBarMessage(value)
            setOK("error")
            setSnackBarOpen(true)
        }

    }

    setTimeout(() => {
        setSnackBarMessage('')
        setSnackBarOpen(false)
    }, 4000);

    function search(val) {
        setData2(data.filter(n => n.message_name.toLowerCase().includes(val.toLowerCase())))
    }

    const handleCannedMessageType = (val) => {
        setCannedType(val)
    }
    const handleTabChange = (val) => {
        setTab(val)
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackbaropen}
                autoHideDuration={5000}
            >
                <Alert variant="filled" severity={ok}>
                    {snackbarmessage}
                </Alert>
            </Snackbar>
            <FusePageSimple
                classes={{
                    contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
                    content: 'flex flex-col h-full',
                    leftSidebar: 'w-256 border-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                    wrapper: 'min-h-0'
                }}
                header={<CustomerDetailsHeader pageLayout={pageLayout} SearchVal={search} data={companyDetails} />}
                content={
                    tab === 'Intelligence' ? <Dashboard data={companyDetails} />
                        : tab === 'Profile' ? <Profile data={companyDetails}/>
                            : tab === 'Contact' ? <ContactTable data={companyDetails} />
                                : tab === 'TemplateMessage' ? <TemplateMessage />
                                    : tab === 'Agents' ? <AgentTable data={companyDetails} />
                                        : tab === 'CannedReplies' ? <CannedReplies />
                                            : null
                }
                leftSidebarContent={<CustomerDetailSideBar onTabChange={handleTabChange} cannedType={handleCannedMessageType} />}
                sidebarInner
                ref={pageLayout}
            />
        </>
    );
}

export default CustomerDetails;
