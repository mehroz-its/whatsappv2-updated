import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
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
import Widget2 from './widgets/Widget2';
import WidgetNow from './widgets/WidgetNow';
import WidgetWeather from './widgets/WidgetWeather';
import Widget5 from './/widgets/Widget5'

const useStyles = makeStyles({
	layoutRoot: {}
});


const rader_chart = () => {
	am4core.useTheme(am4themes_material);
	am4core.useTheme(am4themes_animated);
	let myEle = document.getElementById("chartdivv");
	
    if(myEle){
		let chart = am4core.create("chartdivv", am4charts.RadarChart);
		chart.data = [{
			"category": "Document",
			"value": 80,
			"full": 100
		}, {
			"category": "Photos",
			"value": 35,
			"full": 100
		}, {
			"category": "Audio",
			"value": 92,
			"full": 100
		}, {
			"category": "Text",
			"value": 68,
			"full": 100
		}, {
			"category": "Contacts",
			"value": 68,
			"full": 100
		}, {
			"category": "Locations",
			"value": 68,
			"full": 100
		}];
	
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
function DashboardApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [rader, setrader] = React.useState(newMessageList);
	const [tabValue, setTabValue] = useState(0);

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

	React.useEffect(() => {
		rader_chart();
	})
	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot,
				header: 'min-h-160 h-160',
			}}
			header={
				<div className="flex flex-col justify-between flex-1 px-24 pt-24">
					{/* <div className="flex justify-between items-start"> */}
					<Typography className="py-0 sm:py-24" variant="h4">
						Welcome back, John!
						</Typography>
					{/* </div> */}
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
					className="w-full border-b-1 px-24"
				>
					<Tab className="text-14 font-600 normal-case" label="Statics" />
					<Tab className="text-14 font-600 normal-case" label="Charts" />
				</Tabs>
			}
			content={
				<div className="p-24">
					{tabValue === 0 && (
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}>
							<Grid container spacing={3}>
								<Grid item md={8} sm={12} xs={12} >
									<Grid container spacing={3}>
										<Grid item md={4} sm={6} xs={12} >
											<Widget2 title="Daily" count="100" bottom_title="Customer Engaged" />
										</Grid>
										<Grid item md={4} sm={6} xs={12} >
											<Widget2 title="Monthly" count="100" bottom_title="Customer Engaged" />
										</Grid>
										<Grid item md={4} sm={6} xs={12} >
											<Widget2 title="Total" count="100" bottom_title="Customer Engaged" />
										</Grid>

										<Grid item md={4} sm={6} xs={12} >
											<Widget2 title="Daily" count="100" bottom_title="Conversation" />
										</Grid>
										<Grid item md={4} sm={6} xs={12} >
											<Widget2 title="Monthly" count="100" bottom_title="Conversation" />
										</Grid>
										<Grid item md={4} sm={6} xs={12} >
											<Widget2 title="Total" count="100" bottom_title="Conversation" />
										</Grid>



									</Grid>
								</Grid>

								<Grid item md={4} sm={6} xs={12} >
									<Card elevation={3} className="pt-12 pb-12">
										<div id="chartdivv" style={{ width: "100%", height: "300px" }}></div>
									</Card>
								</Grid>
								{/* <Grid item md={3} sm={12} xs={12} >
								<Card elevation={3} style={{ padding: 10 }}>
									<div id="columnchartdiv" style={{ width: "100%", height: "280px" }}></div>
								</Card>

							</Grid> */}
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
		/>
	);
}

export default DashboardApp;
