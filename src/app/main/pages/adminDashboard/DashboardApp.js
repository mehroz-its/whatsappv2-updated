import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import './widgets/Dashboard.css';
import Paper from '@material-ui/core/Paper';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
import Widget2 from './widgets/Widget2';
import WidgetNow from './widgets/WidgetNow';
import ChatHourlyWidget from './widgets/ChatHourlyWidget';
import WidgetWeather from './widgets/WidgetWeather';
import FuseLoading from '../../../../@fuse/core/FuseLoading/FuseLoading';
import AgentWidgets from './widgets/AgentWidgets';
import { FormatListNumberedRtlOutlined, KeyboardReturn, SignalCellularNullRounded } from '@material-ui/icons';
// import CustomerFeedbackTable from '../Reports/surveyReport/SurveyTable';
import CustomerFeedbackTable from '../Reports/surveyReport/SurveyTable';
import WebSocket from '../../../socket/WebSocket';
import DashboardTabs from './DashboardTabs';
import moment from 'moment';

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
const useStyles = makeStyles({
	layoutRoot: {},
	content: {
		'& canvas': {
			maxHeight: '10%'
		}
	}
});

const rader_chart = list => {
	// console.log('list ', list);
	am4core.useTheme(am4themes_material);
	am4core.useTheme(am4themes_animated);
	let myEle = document.getElementById('chartdivv');

	let chart = am4core.create('chartdivv', am4charts.PieChart);

	chart.data = list;
	if (myEle) {
		// Add and configure Series
		let pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = 'value';
		pieSeries.dataFields.category = 'category';
		pieSeries.slices.template.stroke = am4core.color('#fff');
		pieSeries.slices.template.strokeOpacity = 1;

		// This creates initial animation
		pieSeries.hiddenState.properties.opacity = 1;
		pieSeries.hiddenState.properties.endAngle = -90;
		pieSeries.hiddenState.properties.startAngle = -90;

		chart.hiddenState.properties.radius = am4core.percent(0);
	}
	let nodes = document.querySelector('div #chartdivv g').childNodes[1].childNodes[1];
	nodes.remove();
};
// const rader_chart = (list) => {
// 	am4core.useTheme(am4themes_material);
// 	am4core.useTheme(am4themes_animated);
// 	let myEle = document.getElementById("chartdivv");
// 	if (myEle) {
// 		let chart = am4core.create("chartdivv", am4charts.RadarChart);
// 		chart.data = list;
// 		chart.startAngle = -90;
// 		chart.endAngle = 180;
// 		chart.innerRadius = am4core.percent(20);
// 		chart.numberFormatter.numberFormat = "#.#'%'";
// 		let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
// 		categoryAxis.dataFields.category = "category";
// 		categoryAxis.renderer.grid.template.location = 0;
// 		categoryAxis.renderer.grid.template.strokeOpacity = 0;
// 		categoryAxis.renderer.labels.template.horizontalCenter = "right";
// 		categoryAxis.renderer.labels.template.fontWeight = 300;
// 		categoryAxis.renderer.labels.template.fontSize = 10;
// 		categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
// 			return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
// 		});
// 		categoryAxis.renderer.minGridDistance = 10;
// 		let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
// 		valueAxis.renderer.grid.template.strokeOpacity = 0;
// 		valueAxis.min = 0;
// 		valueAxis.max = 100;
// 		valueAxis.strictMinMax = true;
// 		// Create series
// 		let series1 = chart.series.push(new am4charts.RadarColumnSeries());
// 		series1.dataFields.valueX = "full";
// 		series1.dataFields.categoryY = "category";
// 		series1.clustered = false;
// 		series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
// 		series1.columns.template.fillOpacity = 0.08;
// 		series1.columns.template.cornerRadiusTopLeft = 20;
// 		series1.columns.template.strokeWidth = 0;
// 		series1.columns.template.radarColumn.cornerRadius = 20;
// 		let series2 = chart.series.push(new am4charts.RadarColumnSeries());
// 		series2.dataFields.valueX = "value";
// 		series2.dataFields.categoryY = "category";
// 		series2.clustered = false;
// 		series2.columns.template.strokeWidth = 0;
// 		series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
// 		series2.columns.template.radarColumn.cornerRadius = 20;
// 		series2.columns.template.adapter.add("fill", function (fill, target) {
// 			return chart.colors.getIndex(target.dataItem.index);
// 		});
// 		// Add cursor
// 		chart.cursor = new am4charts.RadarCursor();
// 	}
// }
const newMessageList = [
	{ category: 'My-Locations', value: '0', full: '100' },
	{ category: 'My-Contacts', value: '0', full: '100' },
	{ category: 'My-Text', value: '0', full: '100' },
	{ category: 'My-Audio', value: '0', full: '100' },
	{ category: 'My-Photos', value: '0', full: '100' },
	{ category: 'My-MYDocuments', value: '0', full: '100' }
];

let Start = '';
let End = '';

function DashboardApp(props) {
	const classes = useStyles();
	const [box, setBox] = useState([]);
	const [radarList, setRadarList] = useState([]);
	const [tabValue, setTabValue] = useState(0);
	const [agents, setAgents] = useState([]);
	const [chatCounts, setChatCounts] = useState([]);
	const [chatHourly, setChatHourly] = useState([]);
	const [isLoading, setisLoading] = React.useState(true);
	const [val, setVal] = React.useState('');
	const [totalItems, setTotalItems] = React.useState(0);
	const [searchText, setSearchText] = React.useState('');
	const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 });
	const [totalChatIn20sec, setTotalChatIn20Sec] = React.useState('');
	const [totalAgentChats, setTotalAgenChats] = React.useState('');
	const [agentSatisfactionSurvey, setAgentSatisfactionSurvey] = React.useState([]);
	let agentPermissions = JSON.parse(localStorage.getItem('user_acl'));
	const socket = WebSocket.getSocket();

	React.useEffect(() => {
		// EventEmitter.subscribe('GetAgentsAgain', (event) => getAgents())

		socket.on('agentsOnline', data => {
			CoreHttpHandler.request(
				'conversations',
				'agent_list',
				{
					columns: 'USR.id, USR.username',
					role: 64,
					displayed: true,
					enabled: true
				},
				_response => {
					console.log(_response, 'ressssssssssssssssssss');
					setAgents(_response.data.data.agents.data);
				},
				error => {}
			);
		});
		// socket.on("newOnGoingConversationCount", (data) => {
		// 	setAgentConversationCount(data)
		// })
		return () => {
			socket.removeListener('agentsOnline');
			// socket.removeListener("newOnGoingConversationCount")
		};
	}, []);

	const dataSourceOptions = {
		params: {
			columns: '*',
			sortby: 'ASC',
			orderby: 'id',
			where: 'id != $1 AND displayed = false',
			values: 0
		},
		type: 'dashboard',
		apiType: 'listing'
	};
	const dataSourceOptionss = {
		params: {
			columns: '*'
		}
	};
	React.useEffect(() => {
		CoreHttpHandler.request(
			'dashboard',
			'listing',
			{ ...dataSourceOptions.params },
			dataSourceSuccess,
			dataSourceFailure
		);
		CoreHttpHandler.request(
			'dashboard',
			'messagestate',
			{ ...dataSourceOptions.params },
			messagestateSuccess,
			messagestateFailure
		);
		CoreHttpHandler.request(
			'reports',
			'campaignChart',
			{ ...dataSourceOptionss.params },
			dataSourceSuccesss,
			dataSourceFailuree
		);

		CoreHttpHandler.request(
			'conversations',
			'agent_list',
			{
				columns: 'USR.id, USR.username',
				role: 64,
				displayed: true,
				enabled: true
			},
			_response => {
				console.log(_response, 'ressssssssssssssssssss');
				setAgents(_response.data.data.agents.data);
			},
			error => {}
		);

		CoreHttpHandler.request(
			'chatsCount',
			'conversation',
			{
				columns: 'USR.id, USR.username',
				role: 64,
				displayed: true,
				enabled: true
			},
			_response => {
				console.log(_response, 'chatCountssss');
				setChatCounts(_response.data.data.conversations);
			},
			error => {}
		);

		CoreHttpHandler.request(
			'convoHourly',
			'chatHourly',
			{
				// startingTime: '2021-06-12T1:00:00.000Z',
				startingTime: dateWithStartingHour(new Date()),
				// endingTime: '2021-06-12T2:00:00.000Z'
				endingTime: dateWithEndingHour(new Date())
			},
			_response => {
				setChatHourly(_response.data.data.report);
			},
			error => {}
		);

		getDataCustomerReport();

		return () => {
			am4core.disposeAllCharts();
		};
	}, []);

	React.useEffect(() => {
		dateWithStartingHourService();
		dateWithEndingHourService();
	}, []);

	function dateWithStartingHourService(newDateeeee) {
		console.log(newDateeeee, 'startdateeeeeeeeeeeeee');
		let date = new Date(newDateeeee);
		console.log(date, 'eeeeeeeeeeeeeeeeeeeeee');
		let start = moment().month(date.getMonth()).date(date.getDate()).hours(0).minutes(0).seconds(0).milliseconds(0);
		let format = moment(start).format();
		return format.substr(0, 19);
	}
	function dateWithEndingHourService(newDateeeee) {
		console.log(newDateeeee, 'enddateeeeeee');
		let date = new Date(newDateeeee);
		console.log(date, 'eeeeeeeeeeeeeeeeeeeeee22222222222');
		let end = moment()
			.month(date.getMonth())
			.date(date.getDate())
			.hours(23)
			.minutes(59)
			.seconds(59)
			.milliseconds(59);
		let format = moment(end).format();
		console.log(format.substr(0, 19), 'formattttttt');
		return format.substr(0, 19);
	}

	function dateWithStartingHour(newDateeeee) {
		let date = new Date(newDateeeee);
		let start = moment()
			.month(date.getMonth())
			.date(date.getDate())
			.hours(date.getHours())
			.minutes(0)
			.seconds(0)
			.milliseconds(0);
		let format = moment(start).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

		return `${format.substr(0, 19)}Z`;
	}

	function dateWithEndingHour(newDateeeee) {
		let date = new Date(newDateeeee);
		let end = moment()
			.month(date.getMonth())
			.date(date.getDate())
			.hours(date.getHours() + 1)
			.minutes(0)
			.seconds(0)
			.milliseconds(0);
		let format = moment(end).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

		return `${format.substr(0, 19)}Z`;
	}

	function dateWithStartingHourCustomer(newDateeeee) {
		console.log(newDateeeee, 'startdateeeeeeeeeeeeee');
		let date = new Date(newDateeeee);
		console.log(date, 'eeeeeeeeeeeeeeeeeeeeee');
		let start = moment().month(date.getMonth()).date(date.getDate()).hours(0).minutes(0).seconds(0).milliseconds(0);
		let format = moment(start).format();
		let finalFormat = format.substr(0, 19) + '.000Z';
		console.log(format.substr(0, 19), 'formattttttt');
		return finalFormat;
	}
	function dateWithEndingHourCustomer(newDateeeee) {
		console.log(newDateeeee, 'enddateeeeeee');
		let date = new Date(newDateeeee);
		console.log(date, 'eeeeeeeeeeeeeeeeeeeeee22222222222');
		let end = moment()
			.month(date.getMonth())
			.date(date.getDate())
			.hours(23)
			.minutes(59)
			.seconds(59)
			.milliseconds(59);
		let format = moment(end).format();
		let finalFormat = format.substr(0, 19) + '.999Z';
		console.log(format.substr(0, 19), 'formattttttt');
		return finalFormat;
	}

	const setPage = currentPage => {
		setCurrentParams({ limit: currentParams.limit, page: currentPage });
	};
	const setLimit = pageLimit => {
		setCurrentParams({ limit: pageLimit, page: 0 });
	};

	const getDataCustomerReport = loadData => {
		let initialStartDate = new Date();
		console.log(initialStartDate.getDate(), 'initialStartDateinitialStartDateinitialStartDate');
		let initialEndDate = new Date();

		setisLoading(true);
		loadData = () => {
			return CoreHttpHandler.request(
				'surveyReport',
				'survey',
				{
					limit: 100,
					page: 0,
					startingDate:
						Start == ''
							? dateWithStartingHourCustomer(initialStartDate.setDate(initialStartDate.getDate() - 1))
							: dateWithStartingHourCustomer(Start),
					endingDate:
						Start == ''
							? dateWithEndingHourCustomer(initialEndDate.setDate(initialEndDate.getDate() - 1))
							: dateWithEndingHourCustomer(End),
					columns: '*',
					sortby: 'ASC',
					orderby: 'id'
				},
				null,
				null,
				true
			);
		};
		loadData().then(res => {
			let tempArr = [];

			res.data.data.survey.agent_satisfaction.map((res, ind) => {
				let newobj = {
					agentName: '',
					user_id: null,
					excellent: 0,
					veryGood: 0,
					good: 0,
					poor: 0,
					veryPoor: 0,
					other: 0,
					total: 0
				};
				let isIncluded = tempArr.findIndex(x => x.user_id == res.user_id);

				if (isIncluded != -1) {
					tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
					switch (res.response) {
						case '1' || 1:
							tempArr[isIncluded].veryPoor = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case '2' || 2:
							tempArr[isIncluded].poor = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case '3' || 3:
							tempArr[isIncluded].good = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case '4' || 4:
							tempArr[isIncluded].veryGood = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case '5' || 5:
							tempArr[isIncluded].excellent = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
						case 'other':
							tempArr[isIncluded].other = res.count;
							// tempArr[isIncluded].total = parseInt(tempArr[isIncluded].total) + parseInt(res.count);
							break;
					}
				} else {
					newobj.total = parseInt(newobj.total) + parseInt(res.count);

					switch (res.response) {
						case '1' || 1:
							newobj.veryPoor = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case '2' || 2:
							newobj.poor = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case '3' || 3:
							newobj.good = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case '4' || 4:
							newobj.veryGood = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case '5' || 5:
							newobj.excellent = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
						case 'other':
							newobj.other = res.count;
							// newobj.total = parseInt(newobj.total) + parseInt(res.count);
							break;
					}

					let { excellent, veryGood, good, poor, veryPoor, other } = newobj;

					let totalCount =
						parseInt(excellent) +
						parseInt(veryGood) +
						parseInt(good) +
						parseInt(poor) +
						parseInt(veryPoor) +
						parseInt(other);
					tempArr.push({
						...newobj,
						user_id: res.user_id,
						agentName: res.username
					});
				}
			});

			setAgentSatisfactionSurvey(tempArr);
			// setSatisfactionSurvey(res.data.data.survey.satisfaction);

			setisLoading(false);
		});
	};

	const dataSourceSuccesss = response => {
		const list = response.data.data.report;
		const data = list.map((item, i) => {
			const chartObj = {
				country: item.name,
				units: item.total,
				pie: []
			};
			for (let i = 0; i < item.statistic.length; i++) {
				let key = Object.keys(item.statistic[i]);
				let value = Object.values(item.statistic[i]);
				chartObj.pie = [
					{
						value: parseInt(value[0]),
						title: key[0]
					}
				];
			}
			return chartObj;
		});
		campaign_report_chart(data);
	};

	const dataSourceFailuree = response => {};
	const campaign_report_chart = dataa => {
		let data = dataa;
		let chart = am4core.create('chartdivcampaign', am4charts.XYChart);
		chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
		// Add data
		chart.data = data;
		// Create axes
		let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = 'country';
		categoryAxis.renderer.grid.template.disabled = true;
		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.title.text = 'Campaigns Report';
		valueAxis.min = 0;
		valueAxis.renderer.baseGrid.disabled = true;
		valueAxis.renderer.grid.template.strokeOpacity = 0.07;
		// Create series
		let series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueY = 'units';
		series.dataFields.categoryX = 'country';
		series.tooltip.pointerOrientation = 'vertical';
		let columnTemplate = series.columns.template;
		// add tooltip on column, not template, so that slices could also have tooltip
		columnTemplate.column.tooltipText = 'Series: {name}\nCategory: {categoryX}\nValue: {valueY}';
		columnTemplate.column.tooltipY = 0;
		columnTemplate.column.cornerRadiusTopLeft = 20;
		columnTemplate.column.cornerRadiusTopRight = 20;
		columnTemplate.strokeOpacity = 0;
		// create pie chart as a column child
		let pieChart = series.columns.template.createChild(am4charts.PieChart);
		pieChart.width = am4core.percent(80);
		pieChart.height = am4core.percent(80);
		pieChart.align = 'center';
		pieChart.valign = 'middle';
		pieChart.dataFields.data = 'pie';
		let pieSeries = pieChart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = 'value';
		pieSeries.dataFields.category = 'title';
		pieSeries.labels.template.disabled = true;
		pieSeries.ticks.template.disabled = true;
		pieSeries.slices.template.strokeWidth = 1;
		pieSeries.slices.template.adapter.add('fill', function (fill, target) {
			return am4core.color('#ffffff');
		});
		pieSeries.slices.template.adapter.add('fillOpacity', function (fillOpacity, target) {
			return (target.dataItem.index + 1) * 0.2;
		});
		pieSeries.hiddenState.properties.startAngle = -90;
		pieSeries.hiddenState.properties.endAngle = 270;
		pieChart.adapter.add('verticalCenter', function (verticalCenter, target) {
			let point = am4core.utils.spritePointToSprite({ x: 0, y: 0 }, target.seriesContainer, chart.plotContainer);
			point.y -= target.dy;

			if (point.y > chart.plotContainer.measuredHeight - 15) {
				target.dy = -target.seriesContainer.measuredHeight - 15;
			} else {
				target.dy = 0;
			}
			return verticalCenter;
		});
		chart.scrollbarX = new am4core.Scrollbar();
	};
	const dataSourceSuccess = response => {
		const list = response.data.data.dashboardBoxInfo.boxes;
		// console.log('list :', list);
		setBox(list);
	};

	const dataSourceFailure = response => {};
	const messagestateSuccess = response => {
		const list = response.data.data.chartData;
		console.log('list : ', list);
		setRadarList(list);
		rader_chart(list);
	};
	const messagestateFailure = response => {};
	function handleChangeTab(event, value) {
		setTabValue(value);
		if (value === 0) {
			CoreHttpHandler.request(
				'dashboard',
				'listing',
				{ ...dataSourceOptions.params },
				dataSourceSuccess,
				dataSourceFailure
			);
			CoreHttpHandler.request(
				'dashboard',
				'messagestate',
				{ ...dataSourceOptions.params },
				messagestateSuccess,
				messagestateFailure
			);
			CoreHttpHandler.request(
				'reports',
				'campaignChart',
				{ ...dataSourceOptionss.params },
				dataSourceSuccesss,
				dataSourceFailuree
			);
		}
	}
	if (box.length === 0 && radarList.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	let data = null;
	data = JSON.parse(localStorage.getItem('user_data'));
	let firstName = '';
	let lastName = '';
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

	// const countAgents = agents.filter(Boolean).length;

	let onlineAgents = agents.filter(el => {
		return el.active == true;
	});
	let offlineAgents = agents.filter(el => {
		return el.active == false;
	});
	// console.log(onlineAgents.length, 'trueeeeValuesss');
	// console.log(offlineAgents.length, 'falseValuesssssss');

	const agentData = [
		{
			title: 'Total Agent',
			totalAgent: agents.length
		},
		{
			title: 'Online Agent',
			totalAgent: onlineAgents.length
		},
		{
			title: 'Offline Agent',
			totalAgent: offlineAgents.length
		}
	];

	const chatsData = [
		{
			title: 'Total Chats',
			chats: chatCounts[0]?.total
		},
		{
			title: 'Resolved Chat',
			chats: chatCounts[0]?.resolved
		},
		{
			title: 'Pending Chats',
			chats: chatCounts[0]?.pending
		}
	];

	console.log(chatCounts, 'countsChaaa');

	return (
		<FusePageSimple
			classes={{
				header: 'min-h-150 h-150 sm:h-150 sm:min-h-150',
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
					<Tab style={{ marginTop: '0.2%' }} className="text-12 font-600 normal-case" label="Statics" />
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
								}}
							>
								<Grid container spacing={4}>
									<Grid item md={6} sm={12} xs={12}>
										<Grid container spacing={1}>
											{box.map((value, index) => {
												return (
													<Grid item md={4} sm={12} xs={12}>
														<Widget2
															value={value}
															// title={value.subtitle}
															// count={value.value}
															// bottom_title={`${value.subtitle} ${value.title}`}
														/>
													</Grid>
												);
											})}
										</Grid>
										<Grid container spacing={1}>
											{agentPermissions['FRONT:/all/stats'] == 1
												? agentData.map((value, index) => {
														console.log('value :', value);
														return (
															<Grid item md={4} sm={12} xs={12}>
																<AgentWidgets
																	agents={value.totalAgent}
																	title={value.title}
																	// bottom_title={`${value.subtitle} ${value.title}`}
																/>
															</Grid>
														);
												  })
												: null}
										</Grid>
										<Grid container spacing={1}>
											{agentPermissions['FRONT:/all/stats'] == 1
												? chatsData.map((value, index) => {
														return (
															<Grid item md={4} sm={12} xs={12}>
																<AgentWidgets
																	agents={value.chats}
																	title={value.title}
																	// bottom_title={`${value.subtitle} ${value.title}`}
																/>
															</Grid>
														);
												  })
												: null}
										</Grid>
										<Grid container spacing={1}>
											<Grid item md={4} sm={12} xs={12}>
												{agentPermissions['FRONT:/all/stats'] == 1
													? chatHourly.map(item => {
															return (
																<ChatHourlyWidget
																	// agents={value.chats}
																	agents={item.count}
																	title="Chat Hourly"
																	bottom_title="askjdahdkj"
																/>
															);
													  })
													: null}
											</Grid>
											<Grid item md={4} sm={12} xs={12}>
												{agentPermissions['FRONT:/all/stats'] == 1 ? (
													<AgentWidgets
														agents={totalChatIn20sec}
														title="Total Chats in 20 seconds"
														// bottom_title={`${value.subtitle} ${value.title}`}
													/>
												) : null}
											</Grid>
											<Grid item md={4} sm={12} xs={12}>
												{agentPermissions['FRONT:/all/stats'] == 1 ? (
													<AgentWidgets
														agents={totalAgentChats}
														title="Total Chats"
														// bottom_title={`${value.subtitle} ${value.title}`}
													/>
												) : null}
											</Grid>
										</Grid>
										{agentPermissions['FRONT:/all/stats'] == 1 ? (
											<Grid container>
												<Grid item xs={12}>
													<div
														style={{
															marginBottom: 20,
															background: '#fff',
															borderRadius: '12.8px 12.8px'
														}}
													>
														<div
															style={{
																textAlign: 'center',
																background: '#aa0027',
																borderRadius: '12.8px 12.8px 0 0',
																marginTop: 20
															}}
														>
															<Typography
																variant="h6"
																style={{
																	color: '#fff',
																	fontSize: '11px',
																	lineHeight: 2.5
																}}
															>
																Customer Feedback
															</Typography>
														</div>
														<CustomerFeedbackTable
															totalItems={totalItems}
															setPage={setPage}
															setLimit={setLimit}
															rowsPerPage={currentParams.limit}
															currentPage={currentParams.page}
															isLoading={isLoading}
															ValueForSearch={searchText}
															agentSatisfactionSurvey={agentSatisfactionSurvey}
															val={val}
															customerStyling="customerStyling"
														/>
													</div>
												</Grid>
											</Grid>
										) : null}
									</Grid>
									<Grid item md={6} sm={12} xs={12}>
										<Paper className="w-full rounded-8 shadow-none border-1 pt-10 pb-10">
											<div id="chartdivv" style={{ width: '100%', height: '221px' }}></div>
										</Paper>
										<DashboardTabs
											setTotalChatIn20Sec={setTotalChatIn20Sec}
											setTotalAgenChats={setTotalAgenChats}
										/>
									</Grid>
									{/* <Grid item xs={12}></Grid> */}
								</Grid>
							</FuseAnimateGroup>
						)}
					</div>
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
		/>
	);
}
export default DashboardApp;
