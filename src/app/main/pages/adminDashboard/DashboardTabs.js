import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import UserTable from '../ServiceLevel/UserTable';
import UserTableAHT from '../AgentHandlingTime/UserTable';
import CustomerFeedbackTable from '../Reports/surveyReport/SurveyTable';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CoreHttpHandler from 'http/services/CoreHttpHandler';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
	root: {
		// flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
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

const DashboardTabs = () => {
	const classes = useStyles();
	const [totalItems, setTotalItems] = React.useState(0);
	const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 });
	const [isLoading, setisLoading] = React.useState(true);
	const [val, setVal] = React.useState('');
	const [searchText, setSearchText] = React.useState('');
	const [totalChatIn20sec, setTotalChatIn20Sec] = React.useState('');
	const [agentSatisfactionSurvey, setAgentSatisfactionSurvey] = React.useState([]);
	const [days, setDays] = React.useState('days');
	const [data2, setData2] = React.useState([]);
	const [data, setData] = React.useState([]);
	const [totalAgentChats, setTotalAgenChats] = React.useState('');
	const [ok, setOK] = React.useState('');
	const [snackbarmessage, setSnackBarMessage] = React.useState('');
	const [snackbaropen, setSnackBarOpen] = React.useState(false);
	const [value, setValue] = React.useState('1');

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
		dateWithStartingHourCustomer();
		dateWithEndingHourCustomer();
		getDataServiceLevel();
		getDataAHT();
		getDataCustomerReport();
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

	function dateWithStartingHourCustomer(newDateeeee) {
		console.log(newDateeeee, 'startdateeeeeeeeeeeeee');
		let date = new Date(newDateeeee);
		console.log(date, 'eeeeeeeeeeeeeeeeeeeeee');
		let start = moment().month(date.getMonth()).date(date.getDate()).hours(0).minutes(0).seconds(0).milliseconds(0);
		let format = moment(start).format();
		let finalFormat = format.substr(0, 19) + '.000Z';
		console.log(format.substr(0, 19), 'formattttttt');
		return finalFormat;
	}
	function dateWithEndingHourCustomer(newDateeeee) {
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
		let finalFormat = format.substr(0, 19) + '.999Z';
		console.log(format.substr(0, 19), 'formattttttt');
		return finalFormat;
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
				setTotalAgenChats(response.data.data.total_chats);
				setTotalChatIn20Sec(response.data.data.within20seconds);
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
		console.log(dateWithStartingHour(Start), 'loaddataaaaaaaaaa');
		console.log(End, 'enddateeeeeeeeeeee');
		let initialStartDate = new Date();
		console.log(initialStartDate.getDate(), 'initialStartDateinitialStartDateinitialStartDate');
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
				console.log(response.data.data.average_time, 'response.data.data.list.data');
				const tableData = [];
				response.data.data.average_time.map(val => {
					tableData.push({
						user_id: val.user_id,
						count: val.count,
						username: val.username,
						response_time: `${val?.average_time?.minutes} minutes ${val?.average_time?.seconds} seconds ${val?.average_time?.milliseconds} ms`
					});
				});
				setData(tableData);
				setData2(tableData);
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

	const getDataCustomerReport = loadData => {
		let initialStartDate = new Date();
		console.log(initialStartDate.getDate(), 'initialStartDateinitialStartDateinitialStartDate');
		let initialEndDate = new Date();

		setisLoading(true);
		loadData = () => {
			return CoreHttpHandler.request(
				'surveyReport',
				'survey',
				{
					limit: 100,
					page: 0,
					startingDate:
						Start == ''
							? dateWithStartingHourCustomer(initialStartDate.setDate(initialStartDate.getDate() - 1))
							: dateWithStartingHourCustomer(Start),
					endingDate:
						Start == ''
							? dateWithEndingHourCustomer(initialEndDate.setDate(initialEndDate.getDate() - 1))
							: dateWithEndingHourCustomer(End),
					filter: days,
					columns: '*',
					sortby: 'ASC',
					orderby: 'id'
				},
				null,
				null,
				true
			);
		};
		loadData().then(res => {
			let tempArr = [];

			res.data.data.survey.agent_satisfaction.map((res, ind) => {
				let newobj = {
					agentName: '',
					user_id: null,
					excellent: 0,
					veryGood: 0,
					good: 0,
					poor: 0,
					veryPoor: 0,
					other: 0,
					total: 0
				};
				let isIncluded = tempArr.findIndex(x => x.user_id == res.user_id);

				if (isIncluded != -1) {
					tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
					switch (res.response) {
						case '1' || 1:
							tempArr[isIncluded].veryPoor = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case '2' || 2:
							tempArr[isIncluded].poor = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case '3' || 3:
							tempArr[isIncluded].good = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case '4' || 4:
							tempArr[isIncluded].veryGood = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case '5' || 5:
							tempArr[isIncluded].excellent = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case 'other':
							tempArr[isIncluded].other = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
					}
				} else {
					newobj.total = parseInt(newobj.total) + parseInt(res.count);

					switch (res.response) {
						case '1' || 1:
							newobj.veryPoor = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case '2' || 2:
							newobj.poor = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case '3' || 3:
							newobj.good = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case '4' || 4:
							newobj.veryGood = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case '5' || 5:
							newobj.excellent = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case 'other':
							newobj.other = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
					}

					let { excellent, veryGood, good, poor, veryPoor, other } = newobj;

					let totalCount =
						parseInt(excellent) +
						parseInt(veryGood) +
						parseInt(good) +
						parseInt(poor) +
						parseInt(veryPoor) +
						parseInt(other);
					tempArr.push({
						...newobj,
						user_id: res.user_id,
						agentName: res.username
					});
				}
			});

			setAgentSatisfactionSurvey(tempArr);
			// setSatisfactionSurvey(res.data.data.survey.satisfaction);

			setisLoading(false);
		});
	};

	return (
		<div className={classes.root}>
			<TabContext value={value}>
				<AppBar position="static">
					<TabList onChange={handleChange} aria-label="simple tabs example" className={classes.tabsss}>
						<Tab label="Service Levels" value="1" onClick={() => getDataServiceLevel()} />
						<Tab label="Average Handling Time" value="2" onClick={() => getDataAHT()} />
						<Tab label="Customer Feedback" value="3" onClick={() => getDataCustomerReport()} />
					</TabList>
				</AppBar>
				<TabPanel value="1">
					<UserTable
						totalItems={totalItems}
						setPage={setPage}
						setLimit={setLimit}
						rowsPerPage={currentParams.limit}
						currentPage={currentParams.page}
						isLoading={isLoading}
						ValueForSearch={searchText}
						dataa={data2}
					/>
				</TabPanel>
				<TabPanel value="2">
					<UserTableAHT
						totalItems={totalItems}
						setPage={setPage}
						setLimit={setLimit}
						rowsPerPage={currentParams.limit}
						currentPage={currentParams.page}
						isLoading={isLoading}
						ValueForSearch={searchText}
						dataa={data2}
					/>
				</TabPanel>
				<TabPanel value="3">
					<CustomerFeedbackTable
						totalItems={totalItems}
						setPage={setPage}
						setLimit={setLimit}
						rowsPerPage={currentParams.limit}
						currentPage={currentParams.page}
						isLoading={isLoading}
						ValueForSearch={searchText}
						agentSatisfactionSurvey={agentSatisfactionSurvey}
						val={val}
					/>
				</TabPanel>
			</TabContext>
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
