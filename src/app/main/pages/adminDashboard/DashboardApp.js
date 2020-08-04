import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';

import Paper from '@material-ui/core/Paper';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import Widget2 from './widgets/Widget2';
import WidgetNow from './widgets/WidgetNow';
import WidgetWeather from './widgets/WidgetWeather';
import Widget5 from './/widgets/Widget5'
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading'

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
const useStyles = makeStyles({
	layoutRoot: {},
	// root: {
	// 	display: 'flex',
	// 	flexDirection: 'row',
	// 	minHeight: '100%',
	// 	position: 'relative',
	// 	flex: '1 1 auto',
	// 	height: 'auto',
	// 	backgroundColor: 'theme.palette.background.default'
	// },
	content: {
		'& canvas': {
			maxHeight: '80%'
		}
	}

});


const rader_chart = (list) => {
	am4core.useTheme(am4themes_material);
	am4core.useTheme(am4themes_animated);
	let myEle = document.getElementById("chartdivv");

	if (myEle) {
		let chart = am4core.create("chartdivv", am4charts.RadarChart);
		chart.data = list;
		// chart.data = [{
		// 	"category": "Document",
		// 	"value": 80,
		// 	"full": 100
		// }, {
		// 	"category": "Photos",
		// 	"value": 35,
		// 	"full": 100
		// }, {
		// 	"category": "Audio",
		// 	"value": 92,
		// 	"full": 100
		// }, {
		// 	"category": "Text",
		// 	"value": 68,
		// 	"full": 100
		// }, {
		// 	"category": "Contacts",
		// 	"value": 68,
		// 	"full": 100
		// }, {
		// 	"category": "Locations",
		// 	"value": 68,
		// 	"full": 100
		// }];

		// Make chart not full circle
		chart.startAngle = -90;
		chart.endAngle = 180;
		chart.innerRadius = am4core.percent(20);

		// Set number format
		chart.numberFormatter.numberFormat = "#.#'%'";

		// Create axes
		let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "category";
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.grid.template.strokeOpacity = 0;
		categoryAxis.renderer.labels.template.horizontalCenter = "right";
		categoryAxis.renderer.labels.template.fontWeight = 300;
		categoryAxis.renderer.labels.template.fontSize = 10;
		categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
			return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
		});
		categoryAxis.renderer.minGridDistance = 10;

		let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
		valueAxis.renderer.grid.template.strokeOpacity = 0;
		valueAxis.min = 0;
		valueAxis.max = 100;
		valueAxis.strictMinMax = true;

		// Create series
		let series1 = chart.series.push(new am4charts.RadarColumnSeries());
		series1.dataFields.valueX = "full";
		series1.dataFields.categoryY = "category";
		series1.clustered = false;
		series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
		series1.columns.template.fillOpacity = 0.08;
		series1.columns.template.cornerRadiusTopLeft = 20;
		series1.columns.template.strokeWidth = 0;
		series1.columns.template.radarColumn.cornerRadius = 20;

		let series2 = chart.series.push(new am4charts.RadarColumnSeries());
		series2.dataFields.valueX = "value";
		series2.dataFields.categoryY = "category";
		series2.clustered = false;
		series2.columns.template.strokeWidth = 0;
		series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
		series2.columns.template.radarColumn.cornerRadius = 20;

		series2.columns.template.adapter.add("fill", function (fill, target) {
			return chart.colors.getIndex(target.dataItem.index);
		});

		// Add cursor
		chart.cursor = new am4charts.RadarCursor();
	}


}
const newMessageList = [
	{ category: "My-Locations", value: "0", full: "100" },
	{ category: "My-Contacts", value: "0", full: "100" },
	{ category: "My-Text", value: "0", full: "100" },
	{ category: "My-Audio", value: "0", full: "100" },
	{ category: "My-Photos", value: "0", full: "100" },
	{ category: "My-MYDocuments", value: "0", full: "100" }
]
function DashboardApp(props) {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [rader, setrader] = React.useState(newMessageList);
	const [box, setBox] = React.useState([]);
	const [radarList, setRadarList] = React.useState([]);


	const [tabValue, setTabValue] = useState(0);
	console.log(props)


	const [state, setState] = React.useState({
		columns: [
			{ title: 'Name', field: 'name' },
			{ title: 'Surname', field: 'surname' },
			{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
			{
				title: 'Birth Place',
				field: 'birthCity',
				lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
			},
		],
		data: [
			{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
			{
				name: 'Zerya Betül',
				surname: 'Baran',
				birthYear: 2017,
				birthCity: 34,
			},
		],
	});

	const dataSourceOptions = {
		params: {
			columns: "*",
			sortby: "ASC",
			orderby: "id",
			where: "id != $1 AND displayed = false",
			values: 0,
		},
		type: 'dashboard',
		apiType: 'listing',
	};
	const dataSourceOptionss = {
		params: {
			columns: "*",

		},
	};
	React.useEffect(() => {

		CoreHttpHandler.request('dashboard', 'listing', { ...dataSourceOptions.params }, dataSourceSuccess, dataSourceFailure);
		CoreHttpHandler.request('dashboard', 'messagestate', { ...dataSourceOptions.params }, messagestateSuccess, messagestateFailure);
		CoreHttpHandler.request('reports', 'campaignChart', { ...dataSourceOptionss.params }, dataSourceSuccesss, dataSourceFailuree);

	}, [])
	const dataSourceSuccesss = (response) => {
		const list = response.data.data.report;
		// setBox(list)
		const data = list.map((item, i) => {
			const chartObj = {
				country: item.name,
				units: item.total,
				pie: []

			};
			for (let i = 0; i < item.statistic.length; i++) {
				let key = Object.keys(item.statistic[i])
				let value = Object.values(item.statistic[i])
				chartObj.pie = [{
					value: parseInt(value[0]),
					title: key[0]
				}]
				//    chartObj.pie{"value"} = Object.values(item.statistic[i])
				//    chartObj.pie['title'] = Object.keys(item.statistic[i])
			}
			return chartObj;
		});
		campaign_report_chart(data);
		// setLoading(false)
		// rader_chart()
	};

	const dataSourceFailuree = (response) => {
	};
	const campaign_report_chart = (dataa) => {
		let data = dataa
		// Create chart instance
		let chart = am4core.create("chartdivcampaign", am4charts.XYChart);
		chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

		// Add data
		chart.data = data;

		// Create axes
		let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "country";
		categoryAxis.renderer.grid.template.disabled = true;

		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.title.text = "Campaigns Report";
		valueAxis.min = 0;
		valueAxis.renderer.baseGrid.disabled = true;
		valueAxis.renderer.grid.template.strokeOpacity = 0.07;

		// Create series
		let series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueY = "units";
		series.dataFields.categoryX = "country";
		series.tooltip.pointerOrientation = "vertical";


		let columnTemplate = series.columns.template;
		// add tooltip on column, not template, so that slices could also have tooltip
		columnTemplate.column.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
		columnTemplate.column.tooltipY = 0;
		columnTemplate.column.cornerRadiusTopLeft = 20;
		columnTemplate.column.cornerRadiusTopRight = 20;
		columnTemplate.strokeOpacity = 0;


		// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
		// columnTemplate.adapter.add("fill", function (fill, target) {
		//     let color = chart.colors.getIndex(target.dataItem.index * 3);
		//     return color;
		// });

		// create pie chart as a column child
		let pieChart = series.columns.template.createChild(am4charts.PieChart);
		pieChart.width = am4core.percent(80);
		pieChart.height = am4core.percent(80);
		pieChart.align = "center";
		pieChart.valign = "middle";
		pieChart.dataFields.data = "pie";

		let pieSeries = pieChart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "value";
		pieSeries.dataFields.category = "title";
		pieSeries.labels.template.disabled = true;
		pieSeries.ticks.template.disabled = true;
		pieSeries.slices.template.strokeWidth = 1;

		// pieSeries.slices.template.adapter.add("stroke", function (stroke, target) {
		//     return chart.colors.getIndex(target.parent.parent.dataItem.index * 3);
		// });

		pieSeries.slices.template.adapter.add("fill", function (fill, target) {
			return am4core.color("#ffffff")
		});

		pieSeries.slices.template.adapter.add("fillOpacity", function (fillOpacity, target) {
			return (target.dataItem.index + 1) * 0.2;
		});

		pieSeries.hiddenState.properties.startAngle = -90;
		pieSeries.hiddenState.properties.endAngle = 270;

		// this moves the pie out of the column if column is too small
		pieChart.adapter.add("verticalCenter", function (verticalCenter, target) {
			let point = am4core.utils.spritePointToSprite({ x: 0, y: 0 }, target.seriesContainer, chart.plotContainer);
			point.y -= target.dy;

			if (point.y > chart.plotContainer.measuredHeight - 15) {
				target.dy = -target.seriesContainer.measuredHeight - 15;
			}
			else {
				target.dy = 0;
			}
			return verticalCenter
		})

		// chart.cursor = new am4charts.XYCursor();
		// chart.cursor.xAxis = dateAxis;
		chart.scrollbarX = new am4core.Scrollbar();


	}
	const dataSourceSuccess = (response) => {
		const list = response.data.data.dashboardBoxInfo.boxes;
		console.log("list :", list);
		setBox(list)
	};

	const dataSourceFailure = (response) => {

	};
	const messagestateSuccess = (response) => {
		const list = response.data.data.chartData;
		console.log("list : ", list);
		setRadarList(list)
		rader_chart(list)
	};

	const messagestateFailure = (response) => {
	};
	function handleChangeTab(event, value) {
		setTabValue(value);
		if (value === 0) {
			CoreHttpHandler.request('dashboard', 'listing', { ...dataSourceOptions.params }, dataSourceSuccess, dataSourceFailure);
			CoreHttpHandler.request('dashboard', 'messagestate', { ...dataSourceOptions.params }, messagestateSuccess, messagestateFailure);
			CoreHttpHandler.request('reports', 'campaignChart', { ...dataSourceOptionss.params }, dataSourceSuccesss, dataSourceFailuree);
		}
	}
	if (box.length === 0 && radarList.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	let data = null
	data = JSON.parse(localStorage.getItem('user_data'))
	console.log(data)

	let firstName = ''
	let lastName = ''
	if (data !== null) {
		function titleCase(str) {
			str = str.toLowerCase().split(' ');
			for (var i = 0; i < str.length; i++) {
				str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
			}
			return str.join(' ');
		}
		console.log(data)
		firstName = titleCase(data.firstName);
		lastName = titleCase(data.firstName);

	}
	return (

		<FusePageSimple
			classes={{
				// content: classes.content,
				header: 'min-h-150 h-150 sm:h-150 sm:min-h-150',
				// toolbar: 'min-h-48 h-48',
				// rightSidebar: 'w-288',
				content: classes.content

			}}
			header={
				<div className="flex flex-col justify-between flex-1 px-20 pt-20 ">
					<div className="flex items-center pt-30">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-26">dashboard</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className=" py-0 sm:py-24 hidden sm:flex mx-0 sm:mx-12 text-20" variant="h6">
								Welcome {firstName} {lastName}
							</Typography>
						</FuseAnimate>
					</div>
					{/* <Typography className="py-0 sm:py-24" variant="h5">
						Welcome {username}
					</Typography> */}
				</div>
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="off"
					className="w-full border-b-1 px-100 text-center h-48 "
				>
					<Tab
						style={{ marginTop: '0.2%' }}
						className="text-12 font-600 normal-case" label="Statics" />
					<Tab
						style={{ marginTop: '0.2%' }}
						className="text-12 font-600 normal-case" label="Charts" />
				</Tabs>
			}
			content={

				<>
					<div className="p-24">
						{tabValue === 0 && (
							<FuseAnimateGroup
								className="flex flex-wrap"
								enter={{
									animation: 'transition.slideUpBigIn'
								}}>
								<Grid container spacing={4}>
									<Grid item md={8} sm={12} xs={12} >
										<Grid container spacing={3}>
											{box.map((value, index) => {
												return (
													<Grid item md={4} sm={12} xs={12} >
														<Widget2 title={value.title} count={value.value} bottom_title={value.subtitle} />
													</Grid>
												)
											})}
										</Grid>
									</Grid>
									<Grid item md={4} sm={12} xs={12} >
										<Paper className="w-full rounded-8 shadow-none border-1 pt-10 pb-10">

											<div id="chartdivv" style={{ width: "110%", height: "275px", padding: 25 }}></div>
										</Paper>
									</Grid>
								</Grid>
								<Grid container spacing={3} style={{ marginTop: 10 }}>

									<Grid item md={12} sm={12} xs={12} >
										<Paper className="w-full rounded-8 shadow-none border-1">

											<div id="chartdivcampaign" style={{ width: "100%", height: "280px" }}></div>
										</Paper>
									</Grid>
								</Grid>
							</FuseAnimateGroup>
						)}

						{tabValue === 1 && (
							<FuseAnimateGroup
								className="flex flex-wrap"
								enter={{
									animation: 'transition.slideUpBigIn'
								}}>
								<Widget5 />
							</FuseAnimateGroup>


						)}

					</div>
					<div style={{ height: 250 }}></div>
				</>
			}
			rightSidebarContent={
				<FuseAnimateGroup
					className="w-full"
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div className="widget w-full p-12">
						<WidgetNow />
					</div>
					<div className="widget w-full p-12">
						<WidgetWeather />
					</div>
				</FuseAnimateGroup>
			}
		// innerScroll
		/>

	);
}

export default DashboardApp;
