import React, { useLayoutEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Grid from '@material-ui/core/Grid';

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

const SatisfactionReport = ({ satisfactionSurvey }) => {
	useLayoutEffect(() => {
		console.log('satadffafdaf ', satisfactionSurvey);

		am4core.useTheme(am4themes_material);
		am4core.useTheme(am4themes_animated);
		let myEle = document.getElementById('chartdivv');
		let chart = am4core.create('chartdivv', am4charts.PieChart);

		chart.data = satisfactionSurvey;
		// chart.data = generateChartData();

		// function generateChartData() {
		// 	console.log(satisfactionSurvey, 'chartDataaaaaaaaaaaa');
		// 	let chartData = [];
		// 	for (var i = 0; i < satisfactionSurvey.length; i++) {
		// 		chartData.push({
		// 			// date: data[i][1].date,
		// 			// visits: data[i][0].count
		// 			user_id: satisfactionSurvey[i].user_id,
		// 			excellent: satisfactionSurvey[i].response === '5' ? satisfactionSurvey[i].count : 0,
		// 			veryGood: satisfactionSurvey[i].response === '4' ? satisfactionSurvey[i].count : 0,
		// 			good: satisfactionSurvey[i].response === '3' ? satisfactionSurvey[i].count : 0,
		// 			poor: satisfactionSurvey[i].response === '2' ? satisfactionSurvey[i].count : 0,
		// 			veryPoor: satisfactionSurvey[i].response === '1' ? satisfactionSurvey[i].count : 0,
		// 			other: satisfactionSurvey[i].response === 'other' ? satisfactionSurvey[i].count : 0
		// 		});
		// 		console.log(chartData, 'chrrsfasdasfsaf');
		// 	}
		// 	return chartData;
		// }

		if (myEle) {
			// Add and configure Series
			let pieSeries = chart.series.push(new am4charts.PieSeries());

			console.log(pieSeries, 'pieeee');
			pieSeries.dataFields.value = 'count';
			pieSeries.dataFields.category = 'response';
			pieSeries.slices.template.stroke = am4core.color('#fff');
			pieSeries.slices.template.strokeOpacity = 1;

			// This creates initial animation
			pieSeries.hiddenState.properties.opacity = 1;
			pieSeries.hiddenState.properties.endAngle = -90;
			pieSeries.hiddenState.properties.startAngle = -90;

			chart.hiddenState.properties.radius = am4core.percent(0);
		}
	});

	return (
		// <Grid item md={6} sm={12} xs={12}>
		<Grid item xs={12}>
			<Paper className="w-full rounded-8 shadow-none border-1 pt-10 pb-10">
				<div id="chartdivv" style={{ width: '100%', height: '221px' }}></div>
			</Paper>
		</Grid>
	);
};

export default SatisfactionReport;
