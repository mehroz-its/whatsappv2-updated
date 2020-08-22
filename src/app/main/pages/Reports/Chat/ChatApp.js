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
// import { DateRangePicker } from 'rsuite';
// import DateRangePickerValue from './DatePicker.tcs'
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import Widget2 from '../../adminDashboard/widgets/Widget2'
import Grid from '@material-ui/core/Grid';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRangePicker } from 'react-date-range';
import MaterialTable from 'material-table';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
import ChartHeader from './ChartHeader'
import ChartTable from './ChartTable'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
// import { DateRangePicker, DateRange } from "materialui-daterange-picker";

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
const useStyles = makeStyles((theme) => ({
	layoutRoot: {},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const incomingAndOutGoingCount = (data) => {
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
	createSeries('incoming', 'Inbound');
	createSeries('outgoing', 'Outbound');
	function createSeries(value, name) {
		let series = chart.series.push(new am4charts.ColumnSeries())
		series.dataFields.valueY = value
		series.dataFields.categoryX = 'category'
		series.name = name
		series.events.on("hidden", arrangeColumns);
		series.events.on("shown", arrangeColumns);

		let bullet = series.bullets.push(new am4charts.LabelBullet())
		bullet.interactionsEnabled = false
		bullet.dy = 30;
		bullet.label.text = '{valueY}'
		bullet.label.fill = am4core.color('#ffffff')

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

const engagments = (data) => {
	let chart = am4core.create("chartdiv", am4charts.XYChart);
	chart.data = data;
	let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "type";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 30;

	categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
		if (target.dataItem && target.dataItem.index & 2 == 2) {
			return dy + 25;
		}
		return dy;
	});

	let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

	// Create series
	let series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.valueY = "value";
	series.dataFields.categoryX = "type";
	series.name = "value";
	series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
	series.columns.template.fillOpacity = .8;

	let columnTemplate = series.columns.template;
	columnTemplate.strokeWidth = 2;
	columnTemplate.strokeOpacity = 1;
}

function ChatApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [val, setVal] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [age, setAge] = React.useState('');
	const [selectOPen, setSelectOPen] = React.useState(false);
	const [dateRange, setDateRange] = React.useState({});

	const toggle = () => setOpen(!open);
	const [dateDisplay, setDateDisplay] = React.useState(false);
	// const [dateRange, setDateRange] = React.useState({});


	const selectionRange = {
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	}
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
		loadData = () => {
			return CoreHttpHandler.request('reports', 'chatReport', {

				limit: 100,
				page: 0,
				columns: "*",
				sortby: "ASC",
				orderby: "id",
			}, null, null, true);
		};
		loadData().then((response) => {
			let tableData = response.data.data.list.data
			console.log(tableData)
			setTableData(tableData)
			setData2(tableData)
		});
	})
	const dataSourceOptions = {
		params: {
			columns: "*",
			sortby: "ASC",
			orderby: "id",
			where: "id != $1 AND displayed = false",
			values: 0,
		},
	};
	React.useEffect(() => {
		CoreHttpHandler.request('reports', 'chatChartInOutCC', { ...dataSourceOptions }, dataSourceSuccess, dataSourceFailure);
		CoreHttpHandler.request('reports', 'chatChartEngagments', { ...dataSourceOptions }, dataSourceSuccessEngagments, dataSourceFailureEngagments);
		getData()
	}, [])
	const dataSourceSuccess = (response) => {
		const list = response.data.data.report.boxes;
		const data = list.map((item, i) => {
			const chartObj = {
				category: item.type
			};
			for (let i = 0; i < item.value.length; i++) {
				chartObj[item.value[i].direction] = item.value[i].count;
			}
			return chartObj;
		});
		setchartdata(data)
		incomingAndOutGoingCount(data);

	};
	const dataSourceFailure = (response) => {
	};
	const dataSourceSuccessEngagments = (response) => {
		const list = response.data.data.report.boxes;
		engagments(list)
	};
	const dataSourceFailureEngagments = (response) => {
	};
	const searchContact = (value) => {
		setVal(value)
		setData2(data.filter(n => n.number.toLowerCase().includes(value.toLowerCase())))
	}
	function handleSelect(ranges) {
		console.log(ranges);
		// {
		//   selection: {
		//     startDate: [native Date Object],
		//     endDate: [native Date Object],
		//   }
		// }
	}
	// const instance = <DateRangePicker
	// 	ranges={[{
	// 		label: 'Yesterday',
	// 		value: [dateFns.addDays(new Date(), -1), dateFns.addDays(new Date(), -1)]
	// 	}, {
	// 		label: 'Today',
	// 		value: [new Date(), new Date()]
	// 	}, {
	// 		label: 'Tomorrow',
	// 		value: [dateFns.addDays(new Date(), 1), dateFns.addDays(new Date(), 1)]
	// 	}, {
	// 		label: 'Last 7 days',
	// 		value: [dateFns.subDays(new Date(), 6), new Date()]
	// 	}]}
	// />;

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleClose = () => {
		setSelectOPen(false);
	};

	const handleOpen = () => {
		setSelectOPen(true);
	};
console.log(dateRange,'rnageeeeeeee');
const handleState =() =>{
	setOpen(!open)
	alert(open)
}
	return (
		<FusePageSimple
			header={
				<div className="flex flex-1 w-full items-center justify-between px-16">
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
					<div style={{ justifyContent: 'space-around' }}>
						<FormControl className={classes.formControl}>
							<InputLabel  	style={{ fontSize: '12px',marginTop:'-26px' }} id="demo-controlled-open-select-label">{age	 === '' ? "Select Interval":''}</InputLabel>
							<Select
								labelId="demo-controlled-open-select-label"
								id="demo-controlled-open-select"
								open={selectOPen}
								onClose={handleClose}
								onOpen={handleOpen}
								value={age}
								onChange={handleChange}
								fullwidth
								// defaultValue={"Select Interval"}
								style={{ fontSize: '12px',marginTop:'-8px' }}
							>
								{/* <MenuItem value="">
									<em>None</em>
								</MenuItem> */}
								<MenuItem style={{ fontSize: '12px' }}
									value={10}>Day</MenuItem>
								<MenuItem style={{ fontSize: '12px' }}
									value={20}>Month</MenuItem>
								<MenuItem style={{ fontSize: '12px' }}
									value={30}>Year</MenuItem>
							</Select>
						</FormControl>
						<Button  
							id="content-upload-button" style={{ marginLeft: '8px', marginTop: '3px', fontSize: '10px' }} size='small' variant="contained" color="primary" component="span" onClick={handleState}>
							{dateRange ? "Load" : "Select Date Range"}
						</Button>
						<Button id="content-upload-button" style={{ marginLeft: '8px', marginTop: '3px', fontSize: '10px' }} size='small' variant="contained" color="primary" component="span"                            >
							Export
 						</Button>
					</div>

					{/* <button onClick={() => setDateDisplay(false)}>
						SelectDate
					</button> */}
					{/* <FuseAnimate>
						
					</FuseAnimate> */}
				</ div>
			}
			content={
				<div className="p-12">
					{/* {dateDisplay && <DateRangePicker
						ranges={[selectionRange]}
						onChange={handleSelect}
						editableDateInputs={true}
						disabled={true}
					/>} */}
	<DateRangePicker
      open={open}
      toggle={toggle}
	  onChange={(range) => setDateRange(range)}
	  
	
    />
					{/* {instance} */}

					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}>
						<Grid item md={12} sm={12} xs={12} className="widget flex w-full sm:w-1/1 md:w-1/2 p-12" >
							<Grid container spacing={3}>
								{/* {box.map((value, index) => {
									return (
										<Grid item md={4} sm={12} xs={12} >
											<Widget2 title={value.title} count={value.value} bottom_title={value.subtitle} />
										</Grid>
									)
								})} */}
								<Grid item md={3} sm={12} xs={12} >
									<Widget2 title='Dummy' count='5' bottom_title='Inbound' />
								</Grid>
								<Grid item md={3} sm={12} xs={12} >
									<Widget2 title='Dummy' count='5' bottom_title='Outbound' />
								</Grid>
								<Grid item md={3} sm={12} xs={12} >
									<Widget2 title='Dummy' count='5' bottom_title='Engagements' />
								</Grid>
								<Grid item md={3} sm={12} xs={12} >
									<Widget2 title='Dummy' count='5' bottom_title='Conversation' />
								</Grid>
							</Grid>
						</Grid>
						<div className="widget flex w-full sm:w-1/1 md:w-1/2 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<Typography variant="h6" className="header-card text-center pt-8" >Conversation</Typography>
								<div id="chartdivv" style={{ width: "100%", height: "300px" }}></div>
							</Paper>
						</div>
						<div className="widget flex w-full sm:w-1/1 md:w-1/2 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<Typography variant="h6" className="header-card text-center pt-8" >Engagements</Typography>
								<div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
							</Paper>
						</div>
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
							<ChartTable data={val == '' ? data : data2} val={val} />}
					/>
				</div>
			}
		/>
	);
}

export default ChatApp;
