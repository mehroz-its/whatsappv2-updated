import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserTable from '../ServiceLevel/UserTable';
import UserTableAHT from '../AgentHandlingTime/UserTable';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CoreHttpHandler from 'http/services/CoreHttpHandler';
import moment from 'moment';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		// flexGrow: 1,
		// backgroundColor: theme.palette.background.paper,
		marginTop: '40px'
	},
	tabsss: {
		'&.MuiTabs-root .MuiTabs-scroller .MuiTabs-flexContainer': {
			justifyContent: 'space-around'
		},
		'&.MuiTabs-root .MuiTabs-scroller .MuiTabs-flexContainer .MuiButtonBase-root': {
			fontSize: '13px',
			textTransform: 'none'
		}
	}
}));

var Start = '';
var End = '';

const DashboardTabs = props => {
	const classes = useStyles();
	const [totalItems, setTotalItems] = React.useState(0);
	const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 });
	const [isLoading, setisLoading] = React.useState(true);
	const [val, setVal] = React.useState('');
	const [searchText, setSearchText] = React.useState('');
	const [days, setDays] = React.useState('days');
	const [data2, setData2] = React.useState([]);
	const [data, setData] = React.useState([]);
	const [dataAht, setDataAht] = React.useState([]);
	const [ok, setOK] = React.useState('');
	const [snackbarmessage, setSnackBarMessage] = React.useState('');
	const [snackbaropen, setSnackBarOpen] = React.useState(false);
	const [value, setValue] = React.useState('1');
	let agentPermissions = JSON.parse(localStorage.getItem('user_acl'));

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const setPage = currentPage => {
		setCurrentParams({ limit: currentParams.limit, page: currentPage });
	};
	const setLimit = pageLimit => {
		setCurrentParams({ limit: pageLimit, page: 0 });
	};

	const searchContact = value => {
		setVal(value);
		// setData2(data.filter(n => n.number.toLowerCase().includes(value.toLowerCase())))
	};

	useEffect(() => {
		dateWithStartingHour();
		dateWithEndingHour();
		getDataServiceLevel();
		getDataAHT();
	}, []);
	function dateWithStartingHour(newDateeeee) {
		console.log(newDateeeee, 'startdateeeeeeeeeeeeee');
		let date = new Date(newDateeeee);
		console.log(date, 'eeeeeeeeeeeeeeeeeeeeee');
		let start = moment().month(date.getMonth()).date(date.getDate()).hours(0).minutes(0).seconds(0).milliseconds(0);
		let format = moment(start).format();
		return format.substr(0, 19);
	}
	function dateWithEndingHour(newDateeeee) {
		console.log(newDateeeee, 'enddateeeeeee');
		let date = new Date(newDateeeee);
		console.log(date, 'eeeeeeeeeeeeeeeeeeeeee22222222222');
		let end = moment()
			.month(date.getMonth())
			.date(date.getDate())
			.hours(23)
			.minutes(59)
			.seconds(59)
			.milliseconds(59);
		let format = moment(end).format();
		console.log(format.substr(0, 19), 'formattttttt');
		return format.substr(0, 19);
	}

	const getDataServiceLevel = loadData => {
		let initialStartDate = new Date();
		console.log(initialStartDate.getDate(), 'initialStartDateinitialStartDateinitialStartDate');
		let initialEndDate = new Date();

		setisLoading(true);
		setData([]);
		setData2([]);
		loadData = () => {
			return CoreHttpHandler.request(
				'agentHandlingTime',
				'serviceLevel',
				{
					starting_date:
						Start == ''
							? dateWithStartingHour(initialStartDate.setDate(initialStartDate.getDate() - 1))
							: dateWithStartingHour(Start),
					ending_date:
						Start == ''
							? dateWithEndingHour(initialEndDate.setDate(initialEndDate.getDate() - 1))
							: dateWithEndingHour(End)
				},
				null,
				null,
				true
			);
		};
		loadData()
			.then(response => {
				setisLoading(false);
				// setTotalItems(response.data.data.list.totalItems)
				console.log(response.data.data, 'response.data.data.list.data');
				const tableData = response.data.data.serviceLevel;
				props.setTotalAgenChats(response.data.data.total_chats);
				props.setTotalChatIn20Sec(response.data.data.within20seconds);
				let array = [];
				tableData.map(val => {
					console.log(val, 'valaaaaa');
					array.push({
						user_id: val.user_id,
						username: val.username,
						chat_in_20_seconds: val.count,
						total_chats: val.total,
						chat_in_20_seconds_in_percentage: `${((val.count / val.total) * 100).toFixed()} %`
					});
				});
				setData(array);
				setData2(array);
				setTimeout(() => {
					setSnackBarMessage('');
					setSnackBarOpen(false);
				}, 3000);
			})
			.catch(error => {
				setisLoading(false);

				setTimeout(() => {
					setSnackBarMessage('');
					setSnackBarOpen(false);
				}, 3000);
			});
	};

	const getDataAHT = (loadData, endDate) => {
		let initialStartDate = new Date();
		let initialEndDate = new Date();
		setisLoading(true);
		setData([]);
		setData2([]);
		loadData = () => {
			return CoreHttpHandler.request(
				'agentHandlingTime',
				'listing',
				{
					starting_date:
						Start == ''
							? dateWithStartingHour(initialStartDate.setDate(initialStartDate.getDate() - 1))
							: dateWithStartingHour(Start),
					ending_date:
						Start == ''
							? dateWithEndingHour(initialEndDate.setDate(initialEndDate.getDate() - 1))
							: dateWithEndingHour(End)
				},
				null,
				null,
				true
			);
		};
		loadData()
			.then(response => {
				setisLoading(false);
				// setTotalItems(response.data.data.list.totalItems)
				const tableData = [];
				response.data.data.average_time.map(val => {
					tableData.push({
						user_id: val.user_id,
						username: val.username,
						count: val?.count,
						response_time: `${val?.average_time?.minutes} minutes ${val?.average_time?.seconds} seconds ${val?.average_time?.milliseconds} ms`
					});
				});
				setDataAht(tableData);
				setTimeout(() => {
					setSnackBarMessage('');
					setSnackBarOpen(false);
				}, 3000);
			})
			.catch(error => {
				setisLoading(false);

				setTimeout(() => {
					setSnackBarMessage('');
					setSnackBarOpen(false);
				}, 3000);
			});
	};

	return (
		<div className={classes.root}>
			{/* <TabContext value={value}> */}
			{/* <AppBar position="static">
					<TabList onChange={handleChange} aria-label="simple tabs example" className={classes.tabsss}>
						<Tab label="Service Levels" value="1" onClick={() => getDataServiceLevel()} />
						<Tab label="Average Handling Time" value="2" onClick={() => getDataAHT()} />
						<Tab label="Customer Feedback" value="3" onClick={() => getDataCustomerReport()} />
					</TabList>
				</AppBar> */}
			{/* <TabPanel value="1"></TabPanel>
			<TabPanel value="2"></TabPanel>
			<TabPanel value="3"></TabPanel> */}
			{agentPermissions['FRONT:/all/stats'] == 1 ? (
				<div style={{ marginBottom: 20, background: '#fff', borderRadius: '12.8px 12.8px' }}>
					<div style={{ textAlign: 'center', background: '#aa0027', borderRadius: '12.8px 12.8px 0 0' }}>
						<Typography variant="h6" style={{ color: '#fff', fontSize: '11px', lineHeight: 2.5 }}>
							Service Levels
						</Typography>
					</div>
					<UserTable
						totalItems={totalItems}
						setPage={setPage}
						setLimit={setLimit}
						rowsPerPage={currentParams.limit}
						currentPage={currentParams.page}
						isLoading={isLoading}
						ValueForSearch={searchText}
						dataa={data2}
						serviceStyling="serviceStyling"
					/>
				</div>
			) : null}

			{agentPermissions['FRONT:/all/stats'] == 1 ? (
				<div style={{ marginBottom: 20, background: '#fff', borderRadius: '12.8px 12.8px' }}>
					<div style={{ textAlign: 'center', background: '#aa0027', borderRadius: '12.8px 12.8px 0 0' }}>
						<Typography variant="h6" style={{ color: '#fff', fontSize: '11px', lineHeight: 2.5 }}>
							Average Handling Time
						</Typography>
					</div>
					<UserTableAHT
						totalItems={totalItems}
						setPage={setPage}
						setLimit={setLimit}
						rowsPerPage={currentParams.limit}
						currentPage={currentParams.page}
						isLoading={isLoading}
						ValueForSearch={searchText}
						dataa={dataAht}
						ahtStyling="aht"
					/>
				</div>
			) : null}

			{/* </TabContext> */}
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbaropen}
				autoHideDuration={4000}
				onClose={() => setSnackBarOpen(false)}
			>
				<Alert variant="filled" severity={ok}>
					{snackbarmessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default DashboardTabs;
