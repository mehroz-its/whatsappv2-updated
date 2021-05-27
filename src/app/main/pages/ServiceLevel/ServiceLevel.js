import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Paper from '@material-ui/core/Paper';
import * as am4core from '@amcharts/amcharts4/core';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AgentWidgets from '../adminDashboard/widgets/AgentWidgets';

import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
import AgentHandlingTimeHeader from './UserHeader.js';
import UserTable from './UserTable';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import DateRangePickerVal from '../Reports/Chat/DatePicker';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading';
import { object } from 'prop-types';
import { CSVLink, CSVDownload } from 'react-csv';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Star } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';

am4core.useTheme(am4themes_material);
const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	dateRange: {
		position: 'absolute',
		zIndex: 1,
		width: '98%'
	}
}));

const incomingAndOutGoingCount = data => {
	am4core.useTheme(am4themes_animated);
	let chart = am4core.create('chartdivv', am4charts.PieChart);
	console.log(data, 'dataaAAA');
	// Add data
	let formatedData = [];
	data.map(val => {
		formatedData.push({ country: val.username, litres: val.chat_in_20_seconds });
	});
	chart.data = formatedData;
	// Set inner radius
	chart.innerRadius = am4core.percent(50);

	// Add and configure Series
	let pieSeries = chart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = 'litres';
	pieSeries.dataFields.category = 'country';
	pieSeries.slices.template.stroke = am4core.color('#fff');
	pieSeries.slices.template.strokeWidth = 2;
	pieSeries.slices.template.strokeOpacity = 1;

	// This creates initial animation
	pieSeries.hiddenState.properties.opacity = 1;
	pieSeries.hiddenState.properties.endAngle = -90;
	pieSeries.hiddenState.properties.startAngle = -90;

	let nodes = document.querySelector('div #chartdivv g').childNodes[1].childNodes[1];
	nodes.remove();
};

var Start = '';
var End = '';
function ChatApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [val, setVal] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [snackbarmessage, setSnackBarMessage] = React.useState('');
	const [name, setName] = React.useState('');
	const [snackbaropen, setSnackBarOpen] = React.useState(false);
	const [totalIngoingMessages, setTotalIngoingMessages] = React.useState(0);
	const [totalOutgoingMessages, setTotalOutgoingMessages] = React.useState(0);
	const [totalEngagement, setTotalEngagement] = React.useState(0);
	const [age, setAge] = React.useState('days');
	const [selectOPen, setSelectOPen] = React.useState(false);
	const [isLoading, setisLoading] = React.useState(true);
	const toggle = () => setOpen(!open);
	const [ok, setOK] = React.useState('');
	const [totalItems, setTotalItems] = React.useState(0);
	const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 });
	const [searchText, setSearchText] = React.useState('');
	const [dateRange, setdateRange] = React.useState({
		startDate: null,
		endDate: null
	});
	const [focus, setFocus] = React.useState(null);
	const { startDate, endDate } = dateRange;
	const [data2, setData2] = React.useState([]);
	const [totalChatIn20sec, setTotalChatIn20Sec] = React.useState('');
	const [totalAgentChats, setTotalAgenChats] = React.useState('');
	const [data, setData] = React.useState([]);
	const [chartdata, setchartdata] = React.useState(null);
	const csvLinkK = useRef(); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
	const [state, setState] = React.useState({
		columns: [
			{ title: 'Number', field: 'number' },
			{ title: 'Incoming DateTime', field: 'incoming' },
			{ title: 'Outgoing DateTime', field: 'outgoing' },
			{ title: 'Incoming Messages Count', field: 'incoming_count' },
			{ title: 'Outgoing Messages Count', field: 'outgoing_count' }
		]
	});
	const [tableData, setTableData] = React.useState([]);

	React.useEffect(() => {
		dateWithStartingHour();
		dateWithEndingHour();
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

	const getData = loadData => {
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
						total_chats: val.total
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
	React.useEffect(() => {
		getData();
		incomingAndOutGoingCount(data);
		return () => {
			am4core.disposeAllCharts();
			Start = '';
			End = '';
		};
	}, []);
	React.useEffect(() => {
		incomingAndOutGoingCount(data);
	}, [data]);

	React.useEffect(() => {
		search(searchText);
	}, [searchText]);

	function search(value) {
		setData2(data.filter(n => n.username.toLowerCase().includes(value.toLowerCase())));
	}

	const setPage = currentPage => {
		setCurrentParams({ limit: currentParams.limit, page: currentPage });
	};

	const setLimit = pageLimit => {
		setCurrentParams({ limit: pageLimit, page: 0 });
	};

	const tableRender = (conversation, engagements) => {
		let chartData = [];
		for (var i = 0; i < conversation.length; i++) {
			chartData.push({
				id: i + 1,
				date: conversation[i][2].date,
				inbound: conversation[i][1].count,
				outbound: conversation[i][0].count,
				engagements: engagements[i][0].count
			});
		}
		setData2(chartData);
	};
	const exportData = () => {
		if (Start === '') setName(moment(new Date().toISOString()).format('DD/MM/YYYY'));
		else setName(moment(Start).format('DD/MM/YYYY') + '-' + moment(End).format('DD/MM/YYYY'));
		setTimeout(() => {
			csvLinkK.current.link.click();
		}, 1000);
	};
	const totalCountConversation = response => {
		const data = response;
		let totalIngoing = 0;
		let totalOutgoing = 0;
		for (var i = 0; i < data.length; i++) {
			totalIngoing = totalIngoing + parseInt(data[i][1].count);
			totalOutgoing = totalOutgoing + parseInt(data[i][0].count);
		}

		setTotalIngoingMessages(totalIngoing);
		setTotalOutgoingMessages(totalOutgoing);
	};
	const totalEngagements = response => {
		const data = response;
		let totalEngagement = 0;
		for (var i = 0; i < data.length; i++) {
			totalEngagement = totalEngagement + parseInt(data[i][0].count);
		}
		setTotalEngagement(totalEngagement);
	};
	const searchContact = value => {
		setVal(value);
		// setData2(data.filter(n => n.number.toLowerCase().includes(value.toLowerCase())))
	};
	const handleChange = event => {
		setAge(event.target.value);
	};
	const handleClose = () => {
		setSelectOPen(false);
	};
	const handleOpen = () => {
		setSelectOPen(true);
	};

	const handleOnDateChange = (startDate, endDate) => {
		setdateRange(startDate, endDate);
	};
	const SelectedDates = (start, end) => {
		console.log(start.toISOString(), end.toISOString(), 'received successfully');
		Start = start.toISOString();
		dateWithStartingHour(Start);
		End = end.toISOString();
		dateWithEndingHour(End);
		console.log(Start, End, 'Coverted_Datesss');
	};
	const getDataAgain = () => {
		getData('', Start, End);
	};

	// function dateWithStartingHour(date, days) {
	// 	var result = new Date(date);
	// 	result.setDate(result.getDate() + days)
	// 	result.setHours('17')
	// 	result.setMinutes('00')
	// 	result.setSeconds('00')
	// 	return result;
	// }
	// function dateWithEndingHour(date, days) {
	// 	var result = new Date(date);
	// 	result.setDate(result.getDate() + days)
	// 	result.setHours(40)
	// 	result.setMinutes(59)
	// 	result.setSeconds(59)
	// 	return result;
	// }

	console.log(searchText, 'searchTextsearchText');
	return (
		<FusePageSimple
			header={
				<div className="flex flex-1 w-full items-center  px-20">
					<div className="flex items-center">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-26">chat</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
								<span style={{ fontSize: '15px' }}>Service Level</span>
							</Typography>
						</FuseAnimate>
					</div>
					<div style={{ justifyContent: 'space-around', marginLeft: '20%' }}>
						{/* <FormControl className={classes.formControl}>
							<Select
								labelId="demo-controlled-open-select-label"
								id="demo-controlled-open-select"
								open={selectOPen}
								onClose={handleClose}
								onOpen={handleOpen}
								value={age}
								onChange={handleChange}
								fullwidth
								defaultValue={'DAY'}
								style={{ fontSize: '12px', marginTop: '-5px' }}
							>
								<MenuItem style={{ fontSize: '12px' }} value="days">
									Day
								</MenuItem>
								<MenuItem style={{ fontSize: '12px' }} value="month">
									Month
								</MenuItem>
								<MenuItem style={{ fontSize: '12px' }} value="year">
									Year
								</MenuItem>
							</Select>
						</FormControl> */}
						<DateRangePickerVal SelectedDates={SelectedDates} />
						<Button
							onClick={getDataAgain}
							id="content-upload-button"
							style={{ marginLeft: '8px', marginTop: '6px', fontSize: '10px' }}
							size="small"
							variant="contained"
							color="primary"
							component="span"
						>
							Generate Report
						</Button>
						<Button
							onClick={exportData}
							id="content-upload-button"
							style={{ marginLeft: '8px', marginTop: '6px', fontSize: '10px' }}
							size="small"
							variant="contained"
							color="primary"
							component="span"
						>
							Export
						</Button>
						<CSVLink
							data={data2}
							filename={`chat_${name}.csv`}
							className="hidden"
							ref={csvLinkK}
							target="_blank"
						/>
					</div>
				</div>
			}
			content={
				<>
					<div className="p-12">
						{isLoading ? (
							<div style={{ width: '100%', textAlign: 'center', margin: '18px 0' }}>
								<CircularProgress
									color="red"
									style={{
										flex: 1,
										alignItems: 'center',
										alignSelf: 'center',
										alignContent: 'center'
									}}
								/>
							</div>
						) : (
							<Grid container spacing={3} style={{ paddingLeft: 12, paddingRight: 12 }}>
								<Grid item md={4} sm={12} xs={12}></Grid>
								<Grid item md={4} sm={12} xs={12}></Grid>
								<Grid item md={4} sm={12} xs={12}></Grid>
							</Grid>
						)}
						<Grid container spacing={3} style={{ paddingLeft: 12, paddingRight: 12 }}>
							<Grid item md={8} sm={12} xs={12}>
								<Grid container spacing={2} style={{ paddingLeft: 12, paddingRight: 12 }}>
									<Grid item md={6} sm={12} xs={12}>
										<AgentWidgets agents={totalChatIn20sec} title={'Total Chats in 20 seconds'} />
									</Grid>
									<Grid item md={6} sm={12} xs={12}>
										<AgentWidgets agents={totalAgentChats} title={'Total Chats'} />
									</Grid>
									<Grid item md={12} sm={12} xs={12}>
										<Paper
											className="w-full rounded-8 shadow-none border-1"
											style={{ display: 'flex', flexDirection: 'column', height: '175px' }}
										>
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
										</Paper>
									</Grid>
								</Grid>
							</Grid>
							<Grid item md={4} sm={12} xs={12}>
								<Paper className="w-full rounded-8 shadow-none border-1">
									<Typography
										variant="h6"
										className="header-card text-center pt-8"
										style={{ fontSize: '16px' }}
									>
										Service Level
									</Typography>
									<div
										id="chartdivv"
										style={{ width: '98%', height: '264px', marginLeft: '10px' }}
									></div>
								</Paper>
							</Grid>
						</Grid>

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
				</>
			}
		/>
	);
}

export default ChatApp;
