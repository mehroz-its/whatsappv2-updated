import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import './widgets/Dashboard.css'
import Paper from '@material-ui/core/Paper';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import CoreHttpHandler from '../.././../../../../../http/services/CoreHttpHandler'
import Widget2 from './widgets/Widget2';
import WidgetNow from './widgets/WidgetNow';
import WidgetWeather from './widgets/WidgetWeather';
import FuseLoading from '../.././../../../../../@fuse/core/FuseLoading/FuseLoading'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DatePicker from './DatePicker'
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
const useStyles = makeStyles({
	layoutRoot: {
	},
	content: {
		'& canvas': {
			maxHeight: '80%'
		}
	},
	root: {
		maxWidth: '100%',
		padding: '0px'
	},
	contentCard: {
		padding: '0px'
	},
});
const rader_chart = (list) => {
	am4core.useTheme(am4themes_material);
	am4core.useTheme(am4themes_animated);
	let myEle = document.getElementById("chartdivv");
	if (myEle) {
		let chart = am4core.create("chartdivv", am4charts.RadarChart);
		chart.data = list;
		chart.startAngle = -90;
		chart.endAngle = 180;
		chart.innerRadius = am4core.percent(20);
		chart.numberFormatter.numberFormat = "#.#'%'";
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
var Start = "";
var End = "";
function DashboardApp(props) {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [rader, setrader] = React.useState(newMessageList);
	const [box, setBox] = React.useState([]);
	const [radarList, setRadarList] = React.useState([]);
	const [tabValue, setTabValue] = useState(0);
	const [companyDetails, setCompanyDetails] = React.useState(props.data);
	const [totalIngoingMessages, setTotalIngoingMessages] = React.useState(0);
	const [totalOutgoingMessages, setTotalOutgoingMessages] = React.useState(0);
	const [totalEngagement, setTotalEngagement] = React.useState(0);

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
		if (companyDetails) {
			let update_params = {
				params: {
					startingDate: "",
					endingDate: "",
					client_id: companyDetails.id
				}
			}
			CoreHttpHandler.request('CompanyStats', 'postStats', update_params, messagestateSuccess, messagestateFailure);
		}
	}, [])
	const dataSourceSuccesss = (response) => {
		const list = response.data.data.report;
		setBox(list)
		console.log("list :", list);
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
			}
			return chartObj;
		});
		campaign_report_chart(data);
	};
	const dataSourceFailuree = (response) => {
	};
	const campaign_report_chart = (dataa) => {
		let data = dataa
		let chart = am4core.create("chartdivcampaign", am4charts.XYChart);
		chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
		chart.data = data;
		let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "country";
		categoryAxis.renderer.grid.template.disabled = true;
		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.title.text = "Campaigns Report";
		valueAxis.min = 0;
		valueAxis.renderer.baseGrid.disabled = true;
		valueAxis.renderer.grid.template.strokeOpacity = 0.07;
		let series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueY = "units";
		series.dataFields.categoryX = "country";
		series.tooltip.pointerOrientation = "vertical";
		let columnTemplate = series.columns.template;
		columnTemplate.column.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
		columnTemplate.column.tooltipY = 0;
		columnTemplate.column.cornerRadiusTopLeft = 20;
		columnTemplate.column.cornerRadiusTopRight = 20;
		columnTemplate.strokeOpacity = 0;
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
		pieSeries.slices.template.adapter.add("fill", function (fill, target) {
			return am4core.color("#ffffff")
		});
		pieSeries.slices.template.adapter.add("fillOpacity", function (fillOpacity, target) {
			return (target.dataItem.index + 1) * 0.2;
		});
		pieSeries.hiddenState.properties.startAngle = -90;
		pieSeries.hiddenState.properties.endAngle = 270;
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
		chart.scrollbarX = new am4core.Scrollbar();
	}
	const dataSourceSuccess = (response) => {
		const list = response.data.data.dashboardBoxInfo.boxes;
		setBox(list)
	};
	const dataSourceFailure = (response) => {
	};
	const messagestateSuccess = (response) => {
		const list = response.data.data.report.finalbox[0].chart;
		setRadarList(list)
		rader_chart(list)
		totalCountConversation(response.data.data.report.finalbox[0].conversations)
		totalEngagements(response.data.data.report.finalbox[0].engagements)
	};
	const messagestateFailure = (response) => {
	};
	const totalCountConversation = (response) => {
		const data = response;
		console.log("data totalCountConversation : ", data);
		let totalIngoing = 0;
		let totalOutgoing = 0;
		for (var i = 0; i < data.length; i++) {
			totalIngoing = totalIngoing + parseInt(data[i][1].count)
			totalOutgoing = totalOutgoing + parseInt(data[i][0].count)
		}
		console.log("data totalIngoing : ", totalIngoing);
		console.log("data totalOutgoing : ", totalOutgoing);

		setTotalIngoingMessages(totalIngoing)
		setTotalOutgoingMessages(totalOutgoing)
	};
	const totalEngagements = (response) => {
		const data = response;
		let totalEngagement = 0;
		for (var i = 0; i < data.length; i++) {
			totalEngagement = totalEngagement + parseInt(data[i][0].count)
		}
		console.log("totalEngagement :", totalEngagement);
		setTotalEngagement(totalEngagement)
	};
	function handleChangeTab(event, value) {
		setTabValue(value);
		if (value === 0) {
			if (companyDetails) {
				let update_params = {
					key: ':client_id',
					value: companyDetails.id,
					params: {}
				}
				// CoreHttpHandler.request('dashboard', 'listing', { ...dataSourceOptions.params }, dataSourceSuccess, dataSourceFailure);
				// CoreHttpHandler.request('CompanyStats', 'get', update_params, messagestateSuccess, messagestateFailure);
				// CoreHttpHandler.request('reports', 'campaignChart', { ...dataSourceOptionss.params }, dataSourceSuccesss, dataSourceFailuree);
			}
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
		if (data.firstName) {
			firstName = titleCase(data.firstName);
		}
		if (data.lastName) {
			lastName = titleCase(data.lastName);
		}
	}
	const SelectedDates = (start, end) => {
		Start = start.toISOString()
		End = end.toISOString()
		let update_params = {
			params: {
				startingDate: Start,
				endingDate:End,
				client_id: companyDetails.id
			}
		}
		CoreHttpHandler.request('CompanyStats', 'postStats', update_params, messagestateSuccess, messagestateFailure);
	}
	return (
		<FusePageSimple
			classes={{
				header: 'min-h-150 h-150 sm:h-150 sm:min-h-150',
				content: classes.content
			}}
			content={
				<Card className={classes.root}>
					<CardContent className={classes.contentCard} style={{ width: '100%' }}>
						<Typography variant='h2' className='companyDetailHeader' >Intelligence
						</Typography>
						<div className="p-24">
							{tabValue === 0 && (
								<FuseAnimateGroup
									className="flex flex-wrap"
									enter={{
										animation: 'transition.slideUpBigIn'
									}}>
									<Grid container spacing={4}>
										<Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item md={12} sm={12} xs={12}>
											<DatePicker SelectedDates={SelectedDates} />
										</Grid>
										<Grid item md={8} sm={12} xs={12}>
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
										<Grid item md={4} sm={12} xs={12} >
											<Paper className="w-full rounded-8 shadow-none border-1 pt-10 pb-10">
												<div id="chartdivv" style={{ width: "100%", height: "221px" }}></div>
											</Paper>
										</Grid>
									</Grid>
								</FuseAnimateGroup>
							)}
						</div>
					</CardContent>
				</Card>
			}
		/>

	);
}

export default DashboardApp;
