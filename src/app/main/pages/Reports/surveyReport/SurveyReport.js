import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import * as am4core from '@amcharts/amcharts4/core';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import DateRangePickerVal from './DatePicker';
import { CSVLink, CSVDownload } from 'react-csv';
// import CircularProgress from '@material-ui/core/CircularProgress';
import SurveyTable from './SurveyTable';
import SurveyAgentChart from './SurveyAgentChart';
import { Grid, Paper } from '@material-ui/core';
import SurveyTableSearch from './SurveyTableSearch';
import SurveyWidgets2 from './Widgets/SurveyWidgets2';
import SatisfactionChart from './SatisfactionChart';
import CustomerResponseReport from './CustomerReport/CustomerResponseReport';

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

const boxData = [
	{
		bottomTitle: 'Excellent'
	},
	{
		bottomTitle: 'Very Good'
	},
	{
		bottomTitle: 'Good'
	},
	{
		bottomTitle: 'Poor'
	},
	{
		bottomTitle: 'Very Poor'
	}
];

var Start = '';
var End = '';

function SurveyReport() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [val, setVal] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState('');
	const [days, setDays] = React.useState('days');
	const [agentSatisfactionSurvey, setAgentSatisfactionSurvey] = React.useState([]);
	const [satisfactionSurvey, setSatisfactionSurvey] = React.useState([]);
	const [selectOPen, setSelectOPen] = React.useState(false);
	const [isLoading, setisLoading] = React.useState(true);
	const [customerFeedback, setCustomerFeedback] = React.useState([]);
	const [feedbackValue, setFeedbackValue] = React.useState('*');
	const [dateRange, setdateRange] = React.useState({
		startDate: null,
		endDate: null
	});
	const { startDate, endDate } = dateRange;
	const [data2, setData2] = React.useState([]);
	const [chartdata, setchartdata] = React.useState(null);
	const csvLinkK = useRef(); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
	// const [state, setState] = React.useState({
	// 	columns: [
	// 		{ title: 'Number', field: 'number' },
	// 		{ title: 'Incoming DateTime', field: 'incoming' },
	// 		{ title: 'Outgoing DateTime', field: 'outgoing' },
	// 		{ title: 'Incoming Messages Count', field: 'incoming_count' },
	// 		{ title: 'Outgoing Messages Count', field: 'outgoing_count' }
	// 	]
	// });
	// const [tableData, setTableData] = React.useState([]);
	// let data = [];
	// tableData.map((i, val) => {
	// 	let filtered = {
	// 		incoming: new Date(i.incoming).toISOString(),
	// 		outgoing: new Date(i.outgoing).toISOString(),
	// 		incoming_count: i.incoming_count,
	// 		outgoing_count: i.outgoing_count,
	// 		number: i.number
	// 	};
	// 	data.push(filtered);
	// });

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
		let finalFormat = format.substr(0, 19) + '.000Z';
		console.log(format.substr(0, 19), 'formattttttt');
		return finalFormat;
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
		let finalFormat = format.substr(0, 19) + '.999Z';
		console.log(format.substr(0, 19), 'formattttttt');
		return finalFormat;
	}

	const getData = (loadData, value) => {
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
							? dateWithStartingHour(initialStartDate.setDate(initialStartDate.getDate() - 1))
							: dateWithStartingHour(Start),
					endingDate:
						Start == ''
							? dateWithEndingHour(initialEndDate.setDate(initialEndDate.getDate() - 1))
							: dateWithEndingHour(End),
					columns: '*',
					sortby: 'ASC',
					orderby: 'id',
					feedback: value ? value : '*'
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
						// total: `${excellent + good}`,
						agentName: res.username
					});
				}

				// tempArr.map((result, index) => {
				// 	if (res.user_id == result.user_id) {
				// 		console.log(res, 'IFFFFFFFFFFF');
				// 	} else {
				// 		tempArr.push(res);
				// 		console.log(res, 'IFFFFFFFFFFF');
				// 	}
				// });

				// let index = tempArr.findIndex(x => x.user_id == res.user_id);
				// let indxxxx = tempArr.findIndex(x => console.log(x, 'xxxxxxxxxxxxxxxx'));
				// console.log(index, 'INDASDSDSADSDAD');
				// if (index != -1) {
				// 	// tempArr[index].push(res);
				// 	let data = [tempArr[index]];
				// 	console.log(data, 'DAAAAAAAAAAAAAAAAAA');
				// 	data = [...data, res];
				// 	console.log(data, 'DAAAAAAAAAAAAAAAAAA_NEXTTTTTTTTTT');
				// 	tempArr[index] = data;
				// } else {
				// 	tempArr.push(res);
				// }
				// console.log(tempArr, 'TEMP_ARRRRRRRRRRRRRR');
				// setAgentSatisfactionSurvey()
			});

			let tempArrFeedback = res.data.data.survey.customer_feedback.filter(item => {
				if (item.response === value) {
					return item;
				} else return item;
			});
			// setAgentSatisfactionSurvey(res?.data?.data?.survey?.agent_satisfaction);
			// setSatisfactionSurvey(res.data?.data?.survey?.satisfaction);
			// let tempArr = [];
			// let tempArr = res.data.data.survey.agent_satisfaction.map((res, index) => {
			// 	// for (let i = 0; i < res.data.data.survey.agent_satisfaction.length; i++){
			// 	// 	console.log(res[i],"RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
			// 	// }
			// 	// return { user_id: res.user_id, response: res.response, count: res.count };
			// 	tempArr.map((response, index) => {
			// 		// console.log(response, 'tempressss');
			// 		if (response.user_id != res.user_id) {
			// 			tempArr.push(res);
			// 		} else {
			// 			// alert('Else');
			// 		}
			// 	});
			// });

			setAgentSatisfactionSurvey(tempArr);
			setSatisfactionSurvey(res.data.data.survey.satisfaction);
			setCustomerFeedback(tempArrFeedback);
			// let dataagain = Object.values(data);
			// let finaldata = dataagain[1].report.finalbox[0].conversations;
			// let finaldata2 = dataagain[1].report.finalbox[0].engagements;
			// incomingAndOutGoingCount(finaldata);
			// engagments(finaldata);
			// engagmentss(finaldata2);
			// totalCountConversation(finaldata);
			// totalEngagements(finaldata2);
			// tableRender(finaldata, finaldata2);
			setisLoading(false);
		});
	};
	React.useEffect(() => {
		getData();
		return () => {
			am4core.disposeAllCharts();
			Start = '';
			End = '';
		};
	}, []);
	// const tableRender = (conversation, engagements) => {
	// 	let chartData = [];
	// 	for (var i = 0; i < conversation.length; i++) {
	// 		chartData.push({
	// 			id: i + 1,
	// 			date: conversation[i][2].date,
	// 			inbound: conversation[i][1].count,
	// 			outbound: conversation[i][0].count,
	// 			engagements: engagements[i][0].count
	// 		});
	// 	}
	// 	setData2(chartData);
	// };
	const exportData = () => {
		if (Start === '') setName(moment(new Date().toISOString()).format('DD/MM/YYYY'));
		else setName(moment(Start).format('DD/MM/YYYY') + '-' + moment(End).format('DD/MM/YYYY'));
		setTimeout(() => {
			csvLinkK.current.link.click();
		}, 1000);
	};

	const handleChange = event => {
		setDays(event.target.value);
	};
	const handleClose = () => {
		setSelectOPen(false);
	};
	const handleOpen = () => {
		setSelectOPen(true);
	};
	const handleState = () => {
		setOpen(!open);
		alert(open);
	};

	const searchContact = value => {
		setVal(value);
		// setData2(data.filter(n => n.number.toLowerCase().includes(value.toLowerCase())))
	};

	const handleOnDateChange = (startDate, endDate) => {
		setdateRange(startDate, endDate);
	};
	const SelectedDates = (start, end) => {
		console.log(start.toISOString(), end.toISOString(), 'received successfully');
		Start = start.toISOString();
		End = end.toISOString();
		dateWithStartingHour(Start);
		dateWithEndingHour(End);
		console.log(Start, End, 'Coverted_Datesss');
	};
	const getDataAgain = () => {
		getData('', Start, End);
	};
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
								<span style={{ fontSize: '15px' }}>Customer Report</span>
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
								value={days}
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
							data={agentSatisfactionSurvey}
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
						{/* <Snackbar
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							open={snackbaropen}
							autoHideDuration={4000}
							onClose={() => setSnackBarOpen(false)}
						>
							<Alert variant="filled" severity={ok}>
								{snackbarmessage}
							</Alert>
						</Snackbar> */}

						<Grid container spacing={1} style={{ paddingLeft: 12, paddingRight: 12 }}>
							{/* <Grid item md={6} sm={12} xs={12}>
								<Grid container spacing={1}>
									{satisfactionSurvey?.map((value, index) => {
										console.log('eeeeeeeeeeeeeeeeeeeeeee', value);
										return (
											<Grid item md={4} sm={12} xs={12}>
												<SurveyWidgets2
													value={value.response}
													// title={value.subtitle}
													title={boxData}
													index={index}
													count={value.count}
													// bottom_title={`${value.subtitle} ${value.title}`}
												/>
											</Grid>
										);
									})}
								</Grid>
							</Grid> */}
							<Grid item xs={12}>
								<Paper className="w-full rounded-8 shadow-none border-1">
									{/* <Typography variant="h6" className="header-card text-center pt-8">
										Survery Report
									</Typography> */}
									<SurveyAgentChart
										agentSatisfactionSurvey={agentSatisfactionSurvey}
										chartTitle={boxData}
									/>
								</Paper>
							</Grid>

							<SatisfactionChart satisfactionSurvey={satisfactionSurvey} />
						</Grid>

						<FusePageSimple
							classes={{
								contentWrapper: 'p-0 sm:p-12 pb-80 h-full',
								content: 'flex flex-col h-full',
								leftSidebar: 'w-256 border-0',
								header: 'min-h-72 h-72 sm:h-100 sm:min-h-100',
								wrapper: 'min-h-0'
							}}
							// header={<SurveyTableSearch SearchVal="" SearchVal={searchContact}  />}
							header={<SurveyTableSearch SearchVal={searchContact} />}
							content={
								<>
									{/* <SurveyTable data={data2} val={val} /> */}
									<SurveyTable agentSatisfactionSurvey={agentSatisfactionSurvey} val={val} />

									{/* <CustomerResponseReport /> */}
								</>
							}
						/>
						<FusePageSimple
							classes={{
								contentWrapper: 'p-0 sm:p-12 pb-80 sm:pb-80 h-full',
								content: 'flex flex-col h-full',
								leftSidebar: 'w-256 border-0',
								header: 'min-h-72 h-72 sm:h-100 sm:min-h-100',
								wrapper: 'min-h-0'
							}}
							// header={<CustomerTableSearch SearchVal={searchContact} />}
							content={
								<>
									<Paper className="w-full rounded-8 shadow-none border-1">
										<CustomerResponseReport
											customerFeedback={customerFeedback}
											getData={getData}
											setFeedbackValue={setFeedbackValue}
											isLoading={isLoading}
										/>
									</Paper>
								</>
							}
						/>
					</div>
				</>
			}
		/>
	);
}

export default SurveyReport;
