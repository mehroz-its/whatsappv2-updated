import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Paper from '@material-ui/core/Paper';
import * as am4core from "@amcharts/amcharts4/core";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import Widget2 from '../../adminDashboard/widgets/Widget2'
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
import ChartHeader from './ChartHeader'
import ChartTable from './ChartTable'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import moment from "moment";
import DateRangePickerVal from './DatePicker'
import { object } from 'prop-types';
import { CSVLink, CSVDownload } from 'react-csv';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import { Star } from '@material-ui/icons';
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
const useStyles = makeStyles((theme) => ({
	layoutRoot: {},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	dateRange: {
		position: 'absolute',
		zIndex: 1,
		width: '98%'
	}
}));

const incomingAndOutGoingCount = (data) => {

console.log("dataa : " ,  data);

// Create chart instance
let chart = am4core.create("chartdivv", am4charts.XYChart);

// Add data
chart.data = generateChartData();

// Create axes
let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
let series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "visits";
series.dataFields.dateX = "date";
series.strokeWidth = 2;
series.minBulletDistance = 10;
series.tooltipText = "{valueY}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.background.cornerRadius = 20;
series.tooltip.background.fillOpacity = 0.5;
series.tooltip.label.padding(12,12,12,12)



// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;
chart.cursor.snapToSeries = series;
// Add scrollbar
chart.scrollbarX = new am4charts.XYChartScrollbar();
chart.scrollbarX.series.push(series);
chart.scrollbarX.parent = chart.bottomAxesContainer;

function generateChartData() {
    let chartData = [];
      for (var i = 0; i < data.length; i++) {
              chartData.push({
            date: data[i][2].date,
			visits: data[i][0].count,
		});
	
	}
	console.log("chartData",chartData);
    return chartData;
}
}


const engagments = (data) => {
	
console.log("dataa : " ,  data);

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = generateChartData();

// Create axes
let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
let series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "visits";
series.dataFields.dateX = "date";
series.strokeWidth = 2;
series.minBulletDistance = 10;
series.tooltipText = "{valueY}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.background.cornerRadius = 20;
series.tooltip.background.fillOpacity = 0.5;
series.tooltip.label.padding(12,12,12,12)



// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;
chart.cursor.snapToSeries = series;
// Add scrollbar
chart.scrollbarX = new am4charts.XYChartScrollbar();
chart.scrollbarX.series.push(series);
chart.scrollbarX.parent = chart.bottomAxesContainer;

function generateChartData() {
    let chartData = [];
      for (var i = 0; i < data.length; i++) {
              chartData.push({
            date: data[i][2].date,
			visits: data[i][1].count,
		});
	
	}
	console.log("chartData",chartData);
    return chartData;
}
}
const engagmentss = (data) => {
	
	console.log("dataa : " ,  data);
	
	// Create chart instance
	let chart = am4core.create("chartdivvv", am4charts.XYChart);
	
	// Add data
	chart.data = generateChartData();
	
	// Create axes
	let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.renderer.minGridDistance = 50;
	
	let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	
	// Create series
	let series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.valueY = "visits";
	series.dataFields.dateX = "date";
	series.strokeWidth = 2;
	series.minBulletDistance = 10;
	series.tooltipText = "{valueY}";
	series.tooltip.pointerOrientation = "vertical";
	series.tooltip.background.cornerRadius = 20;
	series.tooltip.background.fillOpacity = 0.5;
	series.tooltip.label.padding(12,12,12,12)
	
	
	
	// Add cursor
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.xAxis = dateAxis;
	chart.cursor.snapToSeries = series;
	// Add scrollbar
	chart.scrollbarX = new am4charts.XYChartScrollbar();
	chart.scrollbarX.series.push(series);
	chart.scrollbarX.parent = chart.bottomAxesContainer;
	
	function generateChartData() {
		let chartData = [];
		  for (var i = 0; i < data.length; i++) {
				  chartData.push({
				date: data[i][1].date,
				visits: data[i][0].count,
			});
		
		}
		console.log("chartData",chartData);
		return chartData;
	}
	}
var Start="";
var End="";


function ChatApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [val, setVal] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')
	const [snackbaropen, setSnackBarOpen] = React.useState(false)

	const [totalIngoingMessages, setTotalIngoingMessages] = React.useState(0);
	const [totalOutgoingMessages, setTotalOutgoingMessages] = React.useState(0);
	const [totalEngagement, setTotalEngagement] = React.useState(0);
	const [age, setAge] = React.useState('day');
	const [selectOPen, setSelectOPen] = React.useState(false);
	const [isLoading,setisLoading] = React.useState(false)
	const toggle = () => setOpen(!open);
	const [dateDisplay, setDateDisplay] = React.useState(false);
	const [dateRange, setdateRange] = React.useState({
		startDate: null,
		endDate: null
	});
	const [focus, setFocus] = React.useState(null);
	const { startDate, endDate } = dateRange;
	const [data2, setData2] = React.useState([])
	const [chartdata, setchartdata] = React.useState(null);

	// const toggle = () => setOpen(!open);
	const [state, setState] = React.useState({
		columns: [
			{ title: 'Number', field: 'number' },
			{ title: 'Incoming DateTime', field: 'incoming' },
			{ title: 'Outgoing DateTime', field: 'outgoing', },
			{ title: 'Incoming Messages Count', field: 'incoming_count', },
			{ title: 'Outgoing Messages Count', field: 'outgoing_count' },

		],

	});
	const [tableData, setTableData] = React.useState([]);
	let data = []
	tableData.map((i, val) => {
		let filtered = {
			incoming: new Date(i.incoming).toISOString(),
			outgoing: new Date(i.outgoing).toISOString(),
			incoming_count: i.incoming_count,
			outgoing_count: i.outgoing_count,
			number: i.number
		}
		data.push(filtered)
	})
	const getData = ((loadData) => {
		console.log('called get data')
		console.log(age,Start,End,"CREDENTIALS");
		loadData = () => {
			return CoreHttpHandler.request('reports', 'chatChartInOutCC', {

				limit: 100,
				page: 0,
				startingDate:Start.substr(0, Start.indexOf('T')),
				endingDate:End.substr(0, End.indexOf('T')),
				filter:age,
				columns: "*",
				sortby: "ASC",
				orderby: "id",
			}, null, null, true);
		}
		loadData().then((response) => {
			let data = response.data
			let dataagain = Object.values(data)
			let finaldata = dataagain[1].report.finalbox[0].conversations
			let finaldata2 = dataagain[1].report.finalbox[0].engagements
			console.log("COnversation",finaldata)
			console.log("Engagements",finaldata2)
			incomingAndOutGoingCount(finaldata);
			engagments(finaldata)
			engagmentss(finaldata2)
			totalCountConversation(finaldata)
			totalEngagements(finaldata2)
			tableRender(finaldata,finaldata2)
		});
	})

	// const dataSourceOptions = {
	// 	params: {
	// 		columns: "*",
	// 		sortby: "ASC",
	// 		orderby: "id",
	// 		where: "id != $1 AND displayed = false",
	// 		values: 0,
	// 	},
	// };
	React.useEffect(() => {
		// CoreHttpHandler.request('reports', 'chatChartInOutCC', { ...dataSourceOptions }, dataSourceSuccess, dataSourceFailure);
		// CoreHttpHandler.request('reports', 'chatChartEngagments', { ...dataSourceOptions }, dataSourceSuccessEngagments, dataSourceFailureEngagments);
		getData()
	}, [])
	const tableRender = (conversation,engagements) =>{
		let chartData = [];
		  for (var i = 0; i < conversation.length; i++) {
				chartData.push({
				id:i+1,
				date: conversation[i][2].date,
				inbound: conversation[i][1].count,
				outbound:conversation[i][0].count,
				engagements:engagements[i][0].count,
			});
		
		}
		console.log("tableRender",chartData);
		setData2(chartData)
		
		// return chartData;
	}
	const exportData  = () =>{
		let name ;
		if (Start === '') {
			alert("if")
			name = new Date().toISOString()
		}
		else{
			name =  Start + "-" +End
		}
		const csvLink = (<CSVLink filename={`chat_${name}.csv`} data={data2}><span style={{ color: 'white' }}>Your exported chat is ready for download</span></CSVLink>);
		setSnackBarMessage(csvLink)
		setOK("success")
		setSnackBarOpen(true)
	}
	const totalCountConversation = (response) => {
		const data = response;
		let totalIngoing = 0;
		let totalOutgoing = 0 ;
		for (var i = 0; i < data.length; i++) {
			totalIngoing  = totalIngoing + parseInt(data[i][1].count)
			totalOutgoing  = totalOutgoing + parseInt(data[i][0].count) 
	  }
	
	  setTotalIngoingMessages(totalIngoing)
	  setTotalOutgoingMessages(totalOutgoing)
	};
	const totalEngagements = (response) => {
		const data = response;
		let totalEngagement = 0;
		for (var i = 0; i < data.length; i++) {
			totalEngagement  = totalEngagement + parseInt(data[i][0].count)
	  }
	  setTotalEngagement(totalEngagement)
	};
	
	const searchContact = (value) => {
		setVal(value)
		setData2(data.filter(n => n.number.toLowerCase().includes(value.toLowerCase())))
	}
	
	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleClose = () => {
		setSelectOPen(false);
	};

	const handleOpen = () => {
		setSelectOPen(true);
	};
	const handleState = () => {
		setOpen(!open)
		alert(open)
	}
	const handleOnDateChange = (startDate, endDate) => {
		setdateRange(startDate, endDate);
	}


	const SelectedDates = (start,end) =>
	{
		console.log(start.toISOString(),end.toISOString(),'received successfully');
		 Start = start.toISOString()
		 End = end.toISOString()
		console.log(Start,End,'Coverted_Datesss');
	}
	const getDataAgain = () =>
	{	setisLoading(true)
		getData('',Start,End);
	}

	console.log(age,"AGEEEE");
	return (
		<FusePageSimple
			header={
				<div className="flex flex-1 w-full items-center  px-20" >
					<div className="flex items-center">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-26">chat</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
								<span style={{ fontSize: '15px' }}>Chat Report</span>
							</Typography>
						</FuseAnimate>
					</div>
					<div style={{ justifyContent: 'space-around',marginLeft:'20%' }}>
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
								defaultValue={"DAY"}
								style={{ fontSize: '12px', marginTop: '-5px' }}
							>
								<MenuItem style={{ fontSize: '12px' }}
									value="days">Day</MenuItem>
								<MenuItem style={{ fontSize: '12px' }}
									value="month">Month</MenuItem>
								<MenuItem style={{ fontSize: '12px' }}
									value="year">Year</MenuItem>
							</Select>
						</FormControl>
						<DateRangePickerVal  SelectedDates ={SelectedDates}/>
				<Button 
				onClick={getDataAgain}
                id="content-upload-button" 
                style={{ marginLeft: '8px', marginTop: '6px', fontSize: '10px' }} size='small' variant="contained" color="primary" component="span" >
                    Generate Report 
                </Button> 
                <Button onClick={exportData} id="content-upload-button" style={{ marginLeft: '8px', marginTop: '6px', fontSize: '10px' }} size='small' variant="contained" color="primary" component="span"                            >
                    Export
                </Button>
					</div>
				</ div>
			}
			content={
				<div className="p-12">
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}>
						<Grid item md={12} sm={12} xs={12} className="widget flex w-full sm:w-1/1 md:w-1/2 p-12" >
							<Grid container spacing={3}>
								<Grid item md={4} sm={12} xs={12} >
									<Widget2 title='Dummy' count={totalIngoingMessages} bottom_title='Inbound' />
								</Grid>
								<Grid item md={4} sm={12} xs={12} >
									<Widget2 title='Dummy' count={totalOutgoingMessages} bottom_title='Outbound' />
								</Grid>
								<Grid item md={4} sm={12} xs={12} >
									<Widget2 title='Dummy' count={totalEngagement} bottom_title='Engagements' />
								</Grid>
								
							</Grid>
						</Grid>
						<div className="widget flex w-full sm:w-1/1 md:w-1 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<Typography variant="h6" className="header-card text-center pt-8" >Conversation outgoing</Typography>
								<div id="chartdivv" style={{ width: "100%", height: "300px" }}></div>
							</Paper>
						</div>
						<div className="widget flex w-full sm:w-1/1 md:w-1 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<Typography variant="h6" className="header-card text-center pt-8" >Conversation incoming</Typography>
								<div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
							</Paper>
						</div>
						<div className="widget flex w-full sm:w-1/1 md:w-1 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<Typography variant="h6" className="header-card text-center pt-8" >Engagements</Typography>
								<div id="chartdivvv" style={{ width: "100%", height: "300px" }}></div>
							</Paper>
						</div>
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
					</FuseAnimateGroup>
					<FusePageSimple
						classes={{
							contentWrapper: 'p-0 sm:p-12 pb-80 sm:pb-80 h-full',
							content: 'flex flex-col h-full',
							leftSidebar: 'w-256 border-0',
							header: 'min-h-72 h-72 sm:h-100 sm:min-h-100',
							wrapper: 'min-h-0'
						}}
						header={<ChartHeader SearchVal={searchContact} />}
						content={
							<ChartTable data={data2} val={val} />}
					/>
				</div>
			}
		/>
	);
}

export default ChatApp;
