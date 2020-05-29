import DemoContent from '@fuse/core/DemoContent';
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

const useStyles = makeStyles({
	layoutRoot: {}
});

const incomingAndOutGoingCount = () => {
	let chart = am4core.create("chartdivv", am4charts.XYChart);
	chart.data = [
		{
			category: 'Daily',
			first: 40,
			second: 55,
			
		},
		{
			category: 'Weekly',
			first: 30,
			second: 78,
			
		},
		{
			category: 'Monthly',
			first: 27,
			second: 40,
			
		},
		{
			category: 'Yearly',
			first: 50,
			second: 33,
			
		}
	]
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
	createSeries('first', 'Conversation');
	createSeries('second', 'Engagements');
	// createSeries('third', 'The Third');
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
const campaign_report_chart = (dataa) => {
	let data = [{
		"country": "Lithuania",
		"units": 500,
		"pie": [{
		  "value": 250,
		  "title": "Cat #1"
		}, {
		  "value": 150,
		  "title": "Cat #2"
		}, {
		  "value": 100,
		  "title": "Cat #3"
		}]
	  }, {
		"country": "Czechia",
		"units": 300,
		"pie": [{
		  "value": 80,
		  "title": "Cat #1"
		}, {
		  "value": 130,
		  "title": "Cat #2"
		}, {
		  "value": 90,
		  "title": "Cat #3"
		}]
	  }, {
		"country": "Ireland",
		"units": 200,
		"pie": [{
		  "value": 75,
		  "title": "Cat #1"
		}, {
		  "value": 55,
		  "title": "Cat #2"
		}, {
		  "value": 70,
		  "title": "Cat #3"
		}]
	  }];
	// Create chart instance
	let chart = am4core.create("chartdiv", am4charts.XYChart);
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


function CompaignsApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
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
		campaign_report_chart()
		// engagments()
	})
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
			content={
				<div className="p-24">
					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}>
						<div className="widget flex w-full sm:w-1/1 md:w-1/1 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
							</Paper>
						</div>
					
					</FuseAnimateGroup>

					<FuseAnimateGroup
						className="flex flex-wrap"
						enter={{
							animation: 'transition.slideUpBigIn'
						}}>
						<div className="widget flex w-full sm:w-1/1 md:w-1/1 p-12">

							<MaterialTable
								title="Compaigns Reports"
								columns={state.columns}
								data={state.data}
								style={{width:'100%',}}
								editable={{
									onRowAdd: newData =>
										new Promise(resolve => {
											setTimeout(() => {
												resolve();
												setState(prevState => {
													const data = [...prevState.data];
													data.push(newData);
													return { ...prevState, data };
												});
											}, 600);
										}),
									onRowUpdate: (newData, oldData) =>
										new Promise(resolve => {
											setTimeout(() => {
												resolve();
												if (oldData) {
													setState(prevState => {
														const data = [...prevState.data];
														data[data.indexOf(oldData)] = newData;
														return { ...prevState, data };
													});
												}
											}, 600);
										}),
									onRowDelete: oldData =>
										new Promise(resolve => {
											setTimeout(() => {
												resolve();
												setState(prevState => {
													const data = [...prevState.data];
													data.splice(data.indexOf(oldData), 1);
													return { ...prevState, data };
												});
											}, 600);
										}),
								}}
							/>
						</div>

					</FuseAnimateGroup>
				</div>
			}
		/>
	);
}

export default CompaignsApp;
