import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Paper from '@material-ui/core/Paper';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MaterialTable from 'material-table';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
import ChartHeader from './ChartHeader'
import ChartTable from './ChartTable'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles({
	layoutRoot: {}
});

const incomingAndOutGoingCount = (data) => {
	let chart = am4core.create("chartdivv", am4charts.XYChart);
	chart.data = data;
	// chart.data = [
	// 	{
	// 		category: 'Place #1',
	// 		first: 40,
	// 		second: 55,
	// 		third: 60
	// 	},
	// 	{
	// 		category: 'Place #2',
	// 		first: 30,
	// 		second: 78,
	// 		third: 69
	// 	},
	// 	{
	// 		category: 'Place #3',
	// 		first: 27,
	// 		second: 40,
	// 		third: 45
	// 	},
	// 	{
	// 		category: 'Place #4',
	// 		first: 50,
	// 		second: 33,
	// 		third: 22
	// 	}
	// ]
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
	// createSeries('incoming', 'Incoming');
	// createSeries('outgoing', 'Outgoing');
	createSeries('incoming', 'Incoming');
	createSeries('outgoing', 'Outgoing');
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

	// chart.data = [{
	// 	"country": "USA",
	// 	"visits": 2025
	// }, {
	// 	"country": "China",
	// 	"visits": 1882
	// }, {
	// 	"country": "Japan",
	// 	"visits": 1809
	// }, {
	// 	"country": "Germany",
	// 	"visits": 1322
	// }, {
	// 	"country": "UK",
	// 	"visits": 1122
	// }, {
	// 	"country": "France",
	// 	"visits": 1114
	// }, {
	// 	"country": "India",
	// 	"visits": 984
	// }, {
	// 	"country": "Spain",
	// 	"visits": 711
	// }, {
	// 	"country": "Netherlands",
	// 	"visits": 665
	// }, {
	// 	"country": "Russia",
	// 	"visits": 580
	// }, {
	// 	"country": "South Korea",
	// 	"visits": 443
	// }, {
	// 	"country": "Canada",
	// 	"visits": 441
	// }, {
	// 	"country": "Brazil",
	// 	"visits": 395
	// }];	// Create axes

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

	const [data2, setData2] = React.useState([])
	const [chartdata, setchartdata] = React.useState(null);
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
		// type: 'dashboard',
		// apiType: 'listing',
	};
	React.useEffect(() => {
		CoreHttpHandler.request('reports', 'chatChartInOutCC', { ...dataSourceOptions }, dataSourceSuccess, dataSourceFailure);
		CoreHttpHandler.request('reports', 'chatChartEngagments', { ...dataSourceOptions }, dataSourceSuccessEngagments, dataSourceFailureEngagments);

		// incomingAndOutGoingCount()
		// engagments()
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

	console.log(chartdata, 'chartdataaa');

	const dataSourceFailureEngagments = (response) => {
	};
	// if (tableData.length === 0) {
	// 	return (
	// 		<div className="flex flex-1 items-center justify-center h-full">
	// 			<FuseLoading />
	// 		</div>
	// 	);
	// }

	const searchContact = (value) => {
		setVal(value)
		// console.log('ceeleded', props.ValueForSearch, searchVal);

		// setSearchVal(props.ValueForSearch)
		setData2(data.filter(n => n.number.toLowerCase().includes(value.toLowerCase())))
		console.log(data2, 'filterssss');


	}
	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot,
				header: 'min-h-160 h-160',
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between px-16">
					<div className="flex items-center">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-32">chat</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
								Chat Report
					</Typography>
						</FuseAnimate>
					</div>

				</div>

			}
			content={
				<div className="p-24">
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}>
						<div className="widget flex w-full sm:w-1/1 md:w-1/2 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<Typography variant="h5" className="header-card" >Conversation Count</Typography>

								<div id="chartdivv" style={{ width: "100%", height: "300px" }}></div>
							</Paper>
						</div>
						<div className="widget flex w-full sm:w-1/1 md:w-1/2 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<Typography variant="h5" className="header-card" >Engagements</Typography>

								<div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
							</Paper>
						</div>
					</FuseAnimateGroup>


					<FusePageSimple
						classes={{
							contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
							content: 'flex flex-col h-full',
							leftSidebar: 'w-256 border-0',
							header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
							wrapper: 'min-h-0'
						}}
						header={<ChartHeader SearchVal={searchContact} />}
						content={

							<ChartTable data={val == '' ? data : data2} />}

					/>





				</div>
			}
		/>
	);
}

export default ChatApp;
