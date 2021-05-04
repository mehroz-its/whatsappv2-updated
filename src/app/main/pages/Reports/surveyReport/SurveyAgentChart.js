import React, { useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const SurveyAgentChart = ({ agentSatisfactionSurvey, chartTitle }) => {
	useLayoutEffect(() => {
		let chart = am4core.create('chartdiv', am4charts.XYChart);
		chart.colors.step = 2;

		chart.legend = new am4charts.Legend();
		chart.legend.position = 'top';
		chart.legend.paddingBottom = 20;
		chart.legend.labels.template.maxWidth = 95;

		let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		console.log(xAxis.dataFields, 'xxxxxxxxxxxxxx');
		// xAxis.dataFields.category = 'category';
		xAxis.dataFields.category = 'agentName';
		xAxis.renderer.cellStartLocation = 0.1;
		xAxis.renderer.cellEndLocation = 0.9;
		xAxis.renderer.grid.template.location = 0;

		let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
		yAxis.min = 0;

		chart.data = generateChartData();

		function generateChartData() {
			console.log(agentSatisfactionSurvey, 'chartDataaaaaaaaaaaa');
			let chartData = [];
			for (var i = 0; i < agentSatisfactionSurvey.length; i++) {
				chartData.push({
					// date: data[i][1].date,
					// visits: data[i][0].count
					agentName: agentSatisfactionSurvey[i].agentName,
					excellent: agentSatisfactionSurvey[i].excellent,
					veryGood: agentSatisfactionSurvey[i].veryGood,
					good: agentSatisfactionSurvey[i].good,
					poor: agentSatisfactionSurvey[i].poor,
					veryPoor: agentSatisfactionSurvey[i].veryPoor,
					other: agentSatisfactionSurvey[i].other
				});
				console.log(chartData, 'chrrsfasdasfsaf');
			}
			return chartData;
		}

		function createSeries(value, name) {
			console.log(value, 'valueeeeeee', name, 'nameeeeeeeeeeeeee');
			let series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.valueY = value;
			// series.dataFields.categoryX = 'category';
			series.dataFields.categoryX = 'agentName';
			series.name = name;

			series.events.on('hidden', arrangeColumns);
			series.events.on('shown', arrangeColumns);

			let bullet = series.bullets.push(new am4charts.LabelBullet());
			bullet.interactionsEnabled = false;
			bullet.dy = 30;
			bullet.label.text = '{valueY}';
			bullet.label.fill = am4core.color('#ffffff');

			return series;
		}

		// chart.data = [
		// 	{
		// 		category: 'Agent #1',
		// 		first: 40,
		// 		second: 55,
		// 		third: 60,
		// 		fourth: 20,
		// 		fifth: 35
		// 	},
		// 	{
		// 		category: 'Agent #2',
		// 		first: 30,
		// 		second: 78,
		// 		third: 69,
		// 		fourth: 20,
		// 		fifth: 35
		// 	},
		// 	{
		// 		category: 'Agent #3',
		// 		first: 27,
		// 		second: 40,
		// 		third: 45,
		// 		fourth: 20,
		// 		fifth: 35
		// 	},
		// 	{
		// 		category: 'Agent #4',
		// 		first: 50,
		// 		second: 33,
		// 		third: 22,
		// 		fourth: 20,
		// 		fifth: 35
		// 	}
		// ];

		createSeries('excellent', 'Excellent');
		createSeries('veryGood', 'Very Good');
		createSeries('good', 'Good');
		createSeries('poor', 'Poor');
		createSeries('veryPoor', 'Very Poor');
		createSeries('other', 'Other');

		// createSeries('Agent#1', 'Agent#1');
		// createSeries('Agent#2', 'Agent#2');
		// createSeries('Agent#3', 'Agent#3');
		// createSeries('Agent#4', 'Agent#4');
		// // createSeries('veryPoor', 'Very Poor');

		function arrangeColumns() {
			let series = chart.series.getIndex(0);

			let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
			if (series.dataItems.length > 1) {
				let x0 = xAxis.getX(series.dataItems.getIndex(0), 'categoryX');
				let x1 = xAxis.getX(series.dataItems.getIndex(1), 'categoryX');
				let delta = ((x1 - x0) / chart.series.length) * w;
				if (am4core.isNumber(delta)) {
					let middle = chart.series.length / 2;

					let newIndex = 0;
					chart.series.each(function (series) {
						if (!series.isHidden && !series.isHiding) {
							series.dummyData = newIndex;
							newIndex++;
						} else {
							series.dummyData = chart.series.indexOf(series);
						}
					});
					let visibleCount = newIndex;
					let newMiddle = visibleCount / 2;

					chart.series.each(function (series) {
						let trueIndex = chart.series.indexOf(series);
						let newIndex = series.dummyData;

						let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

						series.animate(
							{ property: 'dx', to: dx },
							series.interpolationDuration,
							series.interpolationEasing
						);
						series.bulletsContainer.animate(
							{ property: 'dx', to: dx },
							series.interpolationDuration,
							series.interpolationEasing
						);
					});
				}
			}
		}
		let nodes =  document.querySelector("div #chartdiv g").childNodes[1].childNodes[1]
	nodes.remove()
	});

	return <div id="chartdiv" style={{ width: '100%', height: '400px' }}></div>;
};

export default SurveyAgentChart;
