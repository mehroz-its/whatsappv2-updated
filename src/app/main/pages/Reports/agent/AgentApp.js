import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Paper from '@material-ui/core/Paper';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import AgentHeader from './AgentHeader'
import AgentTable from './AgentTable'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DateRangePickerVal from '../chat/DatePicker'
import { CSVLink, CSVDownload } from 'react-csv';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
const useStyles = makeStyles((theme) => ({
	layoutRoot: {},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));



am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);


var Start = "";
var End = "";


function AgentApp() {

	const classes = useStyles();
	const pageLayout = useRef(null);
	const [data2, setData2] = React.useState([])
	const [val, setVal] = React.useState('');
	const [tableData, setTableData] = React.useState([]);
	const [StartingDate, setStartingDate] = React.useState('')
	const [EndingDate, setEndingDate] = React.useState('')
	const [isLoading, setisLoading] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	// const [HitValue,setHitValue] = React.useState(false)
	const getData = ((loadData) => {
		console.log('called_get_data', Start, End)
		loadData = () => {
			return CoreHttpHandler.request('reports', 'agentReport', {
				role_id: 64,
				limit: 10,
				page: 0,
				start_date: Start,
				end_date: End,

			}, null, null, true);
		};
		loadData().then((response) => {
			console.log(response);
			let tableData = response.data.data.list.data
			setTableData(tableData)
			setisLoading(false)
		});
	})
	const incomingAndOutGoingCount = (data) => {
		let myEle = document.getElementById("chartdivv");
		if (myEle) {
			let chart = am4core.create("chartdivv", am4charts.XYChart);
			chart.data = data;
			chart.colors.step = 1;
			chart.legend = new am4charts.Legend()
			chart.legend.position = 'top'
			chart.legend.paddingBottom = 20
			chart.legend.labels.template.maxWidth = 95
			let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			xAxis.dataFields.category = 'category'
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.9
			xAxis.renderer.grid.template.location = 0;
			let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			createSeries('conversation', 'Conversation');
			createSeries('engagements', 'Engagements');
			createSeries('inbound', 'Inbound');
			createSeries('outbound', 'Outbound');
			function createSeries(value, name) {
				let series = chart.series.push(new am4charts.ColumnSeries())
				series.dataFields.valueY = value
				series.dataFields.categoryX = 'category'
				series.name = name

				series.events.on("hidden", arrangeColumns);
				series.events.on("shown", arrangeColumns);
				series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";

				// let bullet = series.bullets.push(new am4charts.LabelBullet())
				// bullet.interactionsEnabled = false
				// bullet.dy = 30;
				// bullet.label.text = '{valueY}'
				// bullet.label.fill = am4core.color('#ffffff')

				return series;
			}


			function arrangeColumns() {

				let series = chart.series.getIndex(0);

				let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
				if (series.dataItems.length > 1) {
					let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
					let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
					let delta = ((x1 - x0) / chart.series.length) * w;
					if (am4core.isNumber(delta)) {
						let middle = chart.series.length / 2;

						let newIndex = 0;
						chart.series.each(function (series) {
							if (!series.isHidden && !series.isHiding) {
								series.dummyData = newIndex;
								newIndex++;
							}
							else {
								series.dummyData = chart.series.indexOf(series);
							}
						})
						let visibleCount = newIndex;
						let newMiddle = visibleCount / 2;

						chart.series.each(function (series) {
							let trueIndex = chart.series.indexOf(series);
							let newIndex = series.dummyData;

							let dx = (newIndex - trueIndex + middle - newMiddle) * delta

							series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
							series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
						})
					}
				}
			}
		}

	}
	React.useEffect(() => {
		CoreHttpHandler.request('reports', 'agentChart', {
			role_id: 64
		}, dataSourceSuccess, dataSourceFailure)
		// engagments()

		getData()
	}, [])

	if (tableData.length > 0) {
		console.log("tableData : ", tableData);

		let chart_display_objects = tableData.map((val, i) => {
			console.log(val, 'vall')
			return {
				category: val.agent_name,
				conversation: parseInt(val.total_chat_count),
				engagements: parseInt(val.total_engagement_count),
				inbound: parseInt(val.inbound),
				outbound: parseInt(val.outbound),
			};
		})
		let stats = [];
		chart_display_objects.forEach((element, i) => {
			console.log('element', i)
			stats.push(chart_display_objects[i])
			return [
				chart_display_objects[i],
			]
		});
		incomingAndOutGoingCount(stats);
	}


	console.log(tableData, ":tableData=>tableData");
	const dataSourceSuccess = (response) => {
	};

	const dataSourceFailure = (response) => {
	};

	const searchContact = (value) => {
		setVal(value)
		setData2(tableData.filter(n => n.agent_name.toLowerCase().includes(value.toLowerCase())))
	}

	const SelectedDates = (start, end) => {

		Start = start.toISOString()
		End = end.toISOString()

		console.log(Start, End, "REveiced");

		console.log("AFTER_SETTING_STATE", StartingDate, EndingDate);
	}

	const getDataAgain = () => {
		setisLoading(true)
		getData('', Start, End);
	}
	console.log(tableData.length, 'TABLEDATA');

	const DownloadData = () => {
		let name;
		if (Start === '') {
			name = new Date().toISOString()
		}
		else {
			name = Start + "-" + End
		}
		const csvLink = (<CSVLink filename={`chat_${name}.csv`} data={tableData}><span style={{ color: 'white' }}>Your exported chat is ready for download</span></CSVLink>);
		setSnackBarMessage(csvLink)
		setOK("success")
		setSnackBarOpen(true)
	}
	// { HitValue ? getData('',Start,End) : null }

	return (
		<FusePageSimple

			header={
				<div className="flex flex-1 w-full items-center  px-20">
					<div className="flex items-center">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-26">face</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
								<span style={{ fontSize: '15px' }}>Agent Report</span>
							</Typography>
						</FuseAnimate>
					</div>
					<div style={{ justifyContent: 'space-around', marginLeft: '20%' }}>
						<DateRangePickerVal SelectedDates={SelectedDates} />
					</div>

					<Button
						onClick={getDataAgain}
						id="content-upload-button"
						style={{ marginLeft: '8px', marginTop: '6px', fontSize: '10px' }} size='small' variant="contained" color="primary" component="span" >
						Generate Report
                </Button>
					<Button
						onClick={DownloadData}
						id="content-upload-button" style={{ marginLeft: '8px', marginTop: '6px', fontSize: '10px' }} size='small' variant="contained" color="primary" component="span"                            >
						Export
                </Button>

					{isLoading ? <CircularProgress color="secondary" style={{ marginLeft: '4%', color: 'white' }} /> :
						null}

				</div>
			}
			content={
				<div className="p-12">
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}>

						<div className="widget flex w-full sm:w-1/1 md:w-1/1 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<div id="chartdivv" style={{ width: "100%", height: "300px" }}></div>
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
							content: 'flex',
							header: 'min-h-72 h-72 sm:h-100 sm:min-h-100',
							contentWrapper: 'p-0 sm:p-12 pb-80 sm:pb-80',
							// content: 'flex flex-col h-full',
							leftSidebar: 'w-256 border-0',
							// header: 'min-h-72 h-full sm:h-136 sm:min-h-136',
							wrapper: 'min-h-0'
						}}
						header={<AgentHeader SearchVal={searchContact} />}
						content={<AgentTable data={tableData} />}
					/>
					<div style={{ height: '128px' }}></div>
				</div>
			}
		/>
	);
}

export default AgentApp;
