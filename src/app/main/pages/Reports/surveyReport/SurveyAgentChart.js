import React, { useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const SurveyAgentChart = () => {
	useLayoutEffect(() => {
		let chart = am4core.create('chartdiv', am4charts.XYChart);
		chart.colors.step = 2;

		chart.legend = new am4charts.Legend();
		chart.legend.position = 'top';
		chart.legend.paddingBottom = 20;
		chart.legend.labels.template.maxWidth = 95;

		let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		xAxis.dataFields.category = 'category';
		xAxis.renderer.cellStartLocation = 0.1;
		xAxis.renderer.cellEndLocation = 0.9;
		xAxis.renderer.grid.template.location = 0;

		let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
		yAxis.min = 0;

		function createSeries(value, name) {
			let series = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.valueY = value;
			series.dataFields.categoryX = 'category';
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

		chart.data = [
			{
				category: 'Agent #1',
				first: 40,
				second: 55,
				third: 60
			},
			{
				category: 'Agent #2',
				first: 30,
				second: 78,
				third: 69
			},
			{
				category: 'Agent #3',
				first: 27,
				second: 40,
				third: 45
			},
			{
				category: 'Agent #4',
				first: 50,
				second: 33,
				third: 22
			}
		];

		createSeries('first', 'The First');
		createSeries('second', 'The Second');
		createSeries('third', 'The Third');

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
		// var noding = document.querySelector('div#chartdiv g').childNodes[1].childNodes[1];
	});

	return <div id="chartdiv" style={{ width: '100%', height: '300px' }}></div>;
};

export default SurveyAgentChart;
