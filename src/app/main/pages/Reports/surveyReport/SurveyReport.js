import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import * as am4core from '@amcharts/amcharts4/core';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Widget2 from '../../adminDashboard/widgets/Widget2';
import ReportChatWidget from '../../adminDashboard/widgets/ReportChatWidget';
import MaterialTable from 'material-table';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
// import ChartHeader from './ChartHeader';
// import ChartTable from './ChartTable';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import DateRangePickerVal from './DatePicker';
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading';
import { object } from 'prop-types';
import { CSVLink, CSVDownload } from 'react-csv';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Star } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import SurveyTable from './SurveyTable';
import SurveyAgentChart from './SurveyAgentChart';
import { Grid, Paper } from '@material-ui/core';
import SurveyTableSearch from './SurveyTableSearch';
import SurveyWidgets2 from './Widgets/SurveyWidgets2';

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

var Start = '';
var End = '';
function SurveyReport() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [val, setVal] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [snackbarmessage, setSnackBarMessage] = React.useState('');
	const [name, setName] = React.useState('');
	const [ok, setOK] = React.useState('');
	const [snackbaropen, setSnackBarOpen] = React.useState(false);
	const [totalIngoingMessages, setTotalIngoingMessages] = React.useState(0);
	const [totalOutgoingMessages, setTotalOutgoingMessages] = React.useState(0);
	const [totalEngagement, setTotalEngagement] = React.useState(0);
	const [age, setAge] = React.useState('days');
	const [selectOPen, setSelectOPen] = React.useState(false);
	const [isLoading, setisLoading] = React.useState(true);
	const toggle = () => setOpen(!open);
	const [dateDisplay, setDateDisplay] = React.useState(false);
	const [dateRange, setdateRange] = React.useState({
		startDate: null,
		endDate: null
	});
	const [focus, setFocus] = React.useState(null);
	const { startDate, endDate } = dateRange;
	const [data2, setData2] = React.useState([]);
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
	let data = [];
	tableData.map((i, val) => {
		let filtered = {
			incoming: new Date(i.incoming).toISOString(),
			outgoing: new Date(i.outgoing).toISOString(),
			incoming_count: i.incoming_count,
			outgoing_count: i.outgoing_count,
			number: i.number
		};
		data.push(filtered);
	});
	const getData = loadData => {
		setisLoading(true);
		loadData = () => {
			return CoreHttpHandler.request(
				'reports',
				'chatChartInOutCC',
				{
					limit: 100,
					page: 0,
					startingDate: Start.substr(0, Start.indexOf('T')),
					endingDate: End.substr(0, End.indexOf('T')),
					filter: age,
					columns: '*',
					sortby: 'ASC',
					orderby: 'id'
				},
				null,
				null,
				true
			);
		};
		loadData().then(response => {
			let data = response.data;
			let dataagain = Object.values(data);
			let finaldata = dataagain[1].report.finalbox[0].conversations;
			let finaldata2 = dataagain[1].report.finalbox[0].engagements;
			// incomingAndOutGoingCount(finaldata);
			// engagments(finaldata);
			// engagmentss(finaldata2);
			// totalCountConversation(finaldata);
			// totalEngagements(finaldata2);
			tableRender(finaldata, finaldata2);
			setisLoading(false);
		});
	};
	React.useEffect(() => {
		getData();
		return () => {
			am4core.disposeAllCharts();
		};
	}, []);
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

	const handleChange = event => {
		setAge(event.target.value);
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
	const handleOnDateChange = (startDate, endDate) => {
		setdateRange(startDate, endDate);
	};
	const SelectedDates = (start, end) => {
		console.log(start.toISOString(), end.toISOString(), 'received successfully');
		Start = start.toISOString();
		End = end.toISOString();
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
								<span style={{ fontSize: '15px' }}>Survey Report</span>
							</Typography>
						</FuseAnimate>
					</div>
					<div style={{ justifyContent: 'space-around', marginLeft: '20%' }}>
						<FormControl className={classes.formControl}>
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
						</FormControl>
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

						<Grid container style={{ paddingLeft: 12, paddingRight: 12 }}>
							<Grid item md={6} sm={12} xs={12}>
								{/* <Grid container spacing={1}>
									{box.map((value, index) => {
										console.log('value :', value);
										return (
											<Grid item md={4} sm={12} xs={12}>
												<SurveyWidgets2
													value={value}
													// title={value.subtitle}
													// count={value.value}
													// bottom_title={`${value.subtitle} ${value.title}`}
												/>
											</Grid>
										);
									})}
								</Grid> */}
							</Grid>
							<Grid item xs={12} md={6}>
								<Paper className="w-full rounded-8 shadow-none border-1">
									{/* <Typography variant="h6" className="header-card text-center pt-8">
										Survery Report
									</Typography> */}
									<SurveyAgentChart />
								</Paper>
							</Grid>
						</Grid>

						<FusePageSimple
							classes={{
								contentWrapper: 'p-0 sm:p-12 pb-80 sm:pb-80 h-full',
								content: 'flex flex-col h-full',
								leftSidebar: 'w-256 border-0',
								header: 'min-h-72 h-72 sm:h-100 sm:min-h-100',
								wrapper: 'min-h-0'
							}}
							header={<SurveyTableSearch SearchVal="" />}
							content={
								<>
									<SurveyTable />
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
