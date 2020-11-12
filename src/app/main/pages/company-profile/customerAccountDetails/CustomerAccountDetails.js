import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import CustomerDetailsHeader from './CustomerDetailsHeader';
import CustomerDetailSideBar from './CustomerDetailSideBar';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Profile from './SideNavigationPages/Profile/Index'
import ContactTable from './SideNavigationPages/contact/ContactTable'
import TemplateMessage from './SideNavigationPages/TemplateMessage/Index'
import AgentTable from './SideNavigationPages/agents/AgentTable'
import AutoReplyTable from './SideNavigationPages/autoReply/autoReplyTable'
import CannedReplies from './SideNavigationPages/CannedReplies/Index'
import Dashboard from './SideNavigationPages/Intelligence/DashboardApp'
import Config from './SideNavigationPages/configration/config'
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
    const [data, setData] = React.useState([]);
    const [data2, setData2] = React.useState(data);
    const [snackbaropen, setSnackBarOpen] = React.useState(false)
    const [snackbarmessage, setSnackBarMessage] = React.useState('')
    const [ok, setOK] = React.useState('')
    const [cannedtype, setCannedType] = React.useState('all')
    const [tab, setTab] = React.useState('Intelligence')
    React.useEffect(() => {
        if (!companyDetails) {
            props.history.push({ pathname: '/apps/company-profile' })
        }
    }, [])

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
                        : tab === 'Profile' ? <Profile data={companyDetails} />
                            : tab === 'Contact' ? <ContactTable data={companyDetails} />
                                : tab === 'Configration' ? <Config data={companyDetails} />
                                    : tab === 'Agents' ? <AgentTable data={companyDetails} />
                                        : tab === 'CannedReplies' ? <CannedReplies data={companyDetails} />
                                            : tab === 'AutoReply' ? <AutoReplyTable data={companyDetails} />
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