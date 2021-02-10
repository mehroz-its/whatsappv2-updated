import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Paper from '@material-ui/core/Paper';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
import OptReportHeader from './OptReportHeader';
import OptReportTable from './OptReportTable';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading';
import Button from '@material-ui/core/Button';
// import DateRangePickerVal from '../chat/DatePicker';
import { CSVLink, CSVDownload } from 'react-csv';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import ReportIcon from '@material-ui/icons/Report';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

var Start = '';
var End = '';

function OptReportApp() {
	const csvLinkK = useRef(); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
	const [val, setVal] = React.useState('');
	const [tableData, setTableData] = React.useState([]);
	const [tableData2, setTableData2] = React.useState([]);
	const [StartingDate, setStartingDate] = React.useState('');
	const [EndingDate, setEndingDate] = React.useState('');
	const [isLoading, setisLoading] = React.useState(false);
	const [snackbarmessage, setSnackBarMessage] = React.useState('');
	const [ok, setOK] = React.useState('');
	const [name, setName] = React.useState('');
	const [snackbaropen, setSnackBarOpen] = React.useState(false);
	const [totalItems, setTotalItems] = React.useState(0);
	const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 });

	const getData = loadData => {
		setisLoading(true);

		loadData = () => {
			return CoreHttpHandler.request(
				'otp',
				'optReport',
				{},
				// {
				// 	...currentParams,
				// 	role_id: 64,
				// 	start_date: Start,
				// 	end_date: End
				// },
				null,
				null,
				true
			);
		};
		loadData().then(response => {
			incomingAndOutGoingCount(response.data.data.stats)
			// let tableData = response.data.data.list.data;
			// setTotalItems(response.data.data.list.totalItems);
			// setTableData(tableData);
			// setTableData2(tableData);
			setisLoading(false);
		});
	};
	const incomingAndOutGoingCount = data => {
		console.log("data : ",data );
		let myEle = document.getElementById('chartdivv');
		if (myEle) {
			let chart = am4core.create('chartdivv', am4charts.XYChart);
			chart.data = data;
			chart.colors.step = 1;
			chart.legend = new am4charts.Legend();
			chart.legend.position = 'top';
			chart.legend.paddingBottom = 20;
			chart.legend.labels.template.maxWidth = 95;
			let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			xAxis.dataFields.category = 'store_id';
			xAxis.renderer.cellStartLocation = 0.1;
			xAxis.renderer.cellEndLocation = 0.9;
			xAxis.renderer.grid.template.location = 0;
			let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			createSeries('success', 'Success');
			createSeries('failed', 'Failed');
			function createSeries(value, name) {
				let series = chart.series.push(new am4charts.ColumnSeries());
				series.dataFields.valueY = value;
				series.dataFields.categoryX = 'store_id';
				series.name = name;
				series.events.on('hidden', arrangeColumns);
				series.events.on('shown', arrangeColumns);
				series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
				return series;
			}

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
		}
	};

	React.useEffect(() => {
		getData();
	}, [currentParams]);

	const setPage = currentPage => {
		setCurrentParams({ limit: currentParams.limit, page: currentPage });
	};

	const setLimit = pageLimit => {
		setCurrentParams({ limit: pageLimit, page: 0 });
	};

	React.useEffect(() => {
		getData();
		return () => {
			am4core.disposeAllCharts();
			Start = '';
			End = '';
		};
	}, []);
	// if (tableData.length > 0) {
	// 	let chart_display_objects = tableData.map((val, i) => {
	// 		return {
	// 			category: val.agent_name,
	// 			conversation: parseInt(val.total_chat_count),
	// 			engagements: parseInt(val.total_engagement_count),
	// 			inbound: parseInt(val.inbound),
	// 			outbound: parseInt(val.outbound)
	// 		};
	// 	});
	// 	let stats = [];
	// 	chart_display_objects.forEach((element, i) => {
	// 		stats.push(chart_display_objects[i]);
	// 		return [chart_display_objects[i]];
	// 	});
	// 	incomingAndOutGoingCount(stats);
	// }

	const searchContact = value => {
		setVal(value);
	};

	const SelectedDates = (start, end) => {
		Start = start.toISOString();
		End = end.toISOString();
	};

	const getDataAgain = () => {
		setisLoading(true);
		getData('', Start, End);
	};
	const DownloadData = () => {
		if (Start === '') setName(moment(new Date().toISOString()).format('DD/MM/YYYY'));
		else setName(moment(Start).format('DD/MM/YYYY') + '-' + moment(End).format('DD/MM/YYYY'));
		setTimeout(() => {
			csvLinkK.current.link.click();
		}, 1000);
	};
	return (
		<FusePageSimple
			header={
				<div className="flex flex-1 w-full items-center  px-20">
					<div className="flex items-center">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<ReportIcon style={{ color: '#8b8b8b' }} />
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
								<span style={{ fontSize: '15px' }}>Opt Report</span>
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			}
			content={
				<div className="p-12">
					<div className="widget flex w-full sm:w-1/1 md:w-1/1 p-12">
						<Paper className="w-full rounded-8 shadow-none border-1">
							<div id="chartdivv" style={{ width: '100%', height: '300px' }}></div>
						</Paper>
					</div>
				</div>
			}
		/>
	);
}

export default OptReportApp;
