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
am4core.useTheme(am4themes_animated);
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
	let chart = am4core.create("chartdivv", am4charts.PieChart);

	// Add data
	chart.data = [{
		"country": "Lithuania",
		"litres": 501.9
	}, {
		"country": "Czechia",
		"litres": 301.9
	}, {
		"country": "Ireland",
		"litres": 201.1
	}, {
		"country": "Germany",
		"litres": 165.8
	}, {
		"country": "Australia",
		"litres": 139.9
	}, {
		"country": "Austria",
		"litres": 128.3
	}, {
		"country": "UK",
		"litres": 99
	}, {
		"country": "Belgium",
		"litres": 60
	}, {
		"country": "The Netherlands",
		"litres": 50
	}];

	// Set inner radius
	chart.innerRadius = am4core.percent(35);

	// Add and configure Series
	let pieSeries = chart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = "litres";
	pieSeries.dataFields.category = "country";
	pieSeries.slices.template.stroke = am4core.color("#fff");
	pieSeries.slices.template.strokeWidth = 2;
	pieSeries.slices.template.strokeOpacity = 1;

	// This creates initial animation
	pieSeries.hiddenState.properties.opacity = 1;
	pieSeries.hiddenState.properties.endAngle = -90;
	pieSeries.hiddenState.properties.startAngle = -90;


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
	const [ok, setOK] = React.useState('')
	const [totalItems, setTotalItems] = React.useState(0)
	const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 })
	const [dateRange, setdateRange] = React.useState({
		startDate: null,
		endDate: null
	});
	const [focus, setFocus] = React.useState(null);
	const { startDate, endDate } = dateRange;
	const [data2, setData2] = React.useState([]);
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



	const getData = ((loadData) => {
		setisLoading(true)
		setData([])
		setData2([])
		loadData = () => {
			return CoreHttpHandler.request('agentHandlingTime', 'listing', {
				starting_date: "2021-05-09",
				ending_date: "2021-05-10"
			}, null, null, true);
		};
		loadData().then((response) => {
			setisLoading(false)
			// setTotalItems(response.data.data.list.totalItems)
			console.log(response.data.data.average_time, 'response.data.data.list.data')
			const tableData = response.data.data.average_time
			setData(tableData)
			setData2(tableData)
			setTimeout(() => {
				setSnackBarMessage('')
				setSnackBarOpen(false)
			}, 3000);

		})
			.catch((error) => {
				setisLoading(false)

				setTimeout(() => {
					setSnackBarMessage('')
					setSnackBarOpen(false)
				}, 3000);

			})
	})
	React.useEffect(() => {
		getData();
		return () => {
			am4core.disposeAllCharts();
		};
	}, []);


	const setPage = (currentPage) => {
		setCurrentParams({ limit: currentParams.limit, page: currentPage })
	}

	const setLimit = (pageLimit) => {
		setCurrentParams({ limit: pageLimit, page: 0 })
	}



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
								<span style={{ fontSize: '15px' }}>Agenty Handling Time</span>
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
								<Grid item md={4} sm={12} xs={12}>

								</Grid>
								<Grid item md={4} sm={12} xs={12}>

								</Grid>
								<Grid item md={4} sm={12} xs={12}>

								</Grid>
							</Grid>
						)}
						<Grid container spacing={3} style={{ paddingLeft: 12, paddingRight: 12 }}>
							<Grid item md={8} sm={12} xs={12}>
								<Paper className="w-full rounded-8 shadow-none border-1">
									<Input
										style={{ border: '1px solid #80808042',borderRadius:'5px',width:'50%' ,alignSelf:'flex-end',float:'right'}}
										rows={1}
										placeholder="Search"
										className="flex mx-8 my-8 "
										disableUnderline
										onChange={e => {

											// props.SearchVal(e.target.value)

										}}
									/>
									<UserTable
										totalItems={totalItems} setPage={setPage} setLimit={setLimit} rowsPerPage={currentParams.limit} currentPage={currentParams.page} isLoading={isLoading}
										ValueForSearch={val} dataa={data2} />
								</Paper>
							</Grid>
							<Grid item md={4} sm={12} xs={12}>
								<Paper className="w-full rounded-8 shadow-none border-1">
									<Typography variant="h6" className="header-card text-center pt-8">
										Outgoing
									</Typography>
									<div id="chartdivv" style={{ width: '100%', height: '300px' }}></div>
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
						<FusePageSimple
							classes={{
								contentWrapper: 'p-0 sm:p-12 pb-80 sm:pb-80 h-full',
								content: 'flex flex-col h-full',
								leftSidebar: 'w-256 border-0',
								header: 'min-h-72 h-72 sm:h-100 sm:min-h-100',
								wrapper: 'min-h-0'
							}}
						// header={<AgentHandlingTimeHeader SearchVal={searchContact} />}
						// content={<div> hiii</div> }
						/>
					</div>
				</>
			}
		/>
	);
}

export default ChatApp;
