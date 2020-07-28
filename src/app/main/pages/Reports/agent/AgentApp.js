import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Paper from '@material-ui/core/Paper';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

import MaterialTable from 'material-table';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import AgentHeader from './AgentHeader'
import AgentTable from './AgentTable'
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
const useStyles = makeStyles({
	layoutRoot: {}
});
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
const incomingAndOutGoingCount = (data) => {
	let chart = am4core.create("chartdivv", am4charts.XYChart);
	chart.data = data;

		// chart.data = [
		// 	{
		// 		category: 'Daily',
		// 		first: 40,
		// 		second: 55,
				
		// 	},
		// 	{
		// 		category: 'Weekly',
		// 		first: 30,
		// 		second: 78,
				
		// 	},
		// 	{
		// 		category: 'Monthly',
		// 		first: 27,
		// 		second: 40,
				
		// 	},
		// 	{
		// 		category: 'Yearly',
		// 		first: 50,
		// 		second: 33,
				
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
	createSeries('conversation', 'conversation');
	createSeries('engagements', 'engagements');
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

const engagments = () => {

	let chart = am4core.create("chartdiv", am4charts.XYChart);
	chart.data = [{
		"country": "USA",
		"visits": 2025
	}, {
		"country": "China",
		"visits": 1882
	}, {
		"country": "Japan",
		"visits": 1809
	}, {
		"country": "Germany",
		"visits": 1322
	}, {
		"country": "UK",
		"visits": 1122
	}, {
		"country": "France",
		"visits": 1114
	}, {
		"country": "India",
		"visits": 984
	}, {
		"country": "Spain",
		"visits": 711
	}, {
		"country": "Netherlands",
		"visits": 665
	}, {
		"country": "Russia",
		"visits": 580
	}, {
		"country": "South Korea",
		"visits": 443
	}, {
		"country": "Canada",
		"visits": 441
	}, {
		"country": "Brazil",
		"visits": 395
	}];	// Create axes

	let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "country";
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
	series.dataFields.valueY = "visits";
	series.dataFields.categoryX = "country";
	series.name = "visits";
	series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
	series.columns.template.fillOpacity = .8;

	let columnTemplate = series.columns.template;
	columnTemplate.strokeWidth = 2;
	columnTemplate.strokeOpacity = 1;
}

function AgentApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const[data2,setData2]=React.useState([])
	const [val, setVal] = React.useState('');
	const [state, setState] = React.useState({
		columns: [
			{ title: 'Agent', field: 'agent_id' },
			{ title: 'Name', field: 'agent_name' },
			{ title: 'Average response time', field: 'responsetime' },
			{ title: 'Count of total conversations', field: 'total_chat_count' },
			{ title: 'Count of total engagements', field: 'total_engagement_count' },
			{ title: 'Account status (active or disable)', field: 'account_status'},
		],
	});
	const [tableData, setTableData] = React.useState([]);
	const getData = ((loadData) => {
		console.log('called get data')
		loadData = () => {
			return CoreHttpHandler.request('reports', 'agentReport', {
				role_id: 64,
				limit: 10,
				page: 0
			}, null, null, true);
		};
		loadData().then((response) => {
			let tableData = response.data.data.list.data
			console.log(tableData)
			setTableData(tableData)
		});
	})

	React.useEffect(() => {
		// incomingAndOutGoingCount()
		CoreHttpHandler.request('reports', 'agentChart', {
            role_id: 64
        }, dataSourceSuccess, dataSourceFailure)
		// engagments()
		getData()
	},[])
	const dataSourceSuccess = (response) => {
        let stats = [];
        const list = response.data.data.list[0];
        let daily = list.daily[0]
        const Daily = {
            category: "Daily",
            conversation: parseInt(daily.conversation),
            engagements: parseInt(daily.engagements),
        };


        let weekly = list.weekly[0]
        const Weekly = {
            category: "Weekly",
            conversation: parseInt(weekly.conversation),
            engagements: parseInt(weekly.engagements),
        };

        let monthly = list.daily[0]
        const Monthly = {
            category: "Monthly",
            conversation: parseInt(monthly.conversation),
            engagements: parseInt(monthly.engagements),
        };

        let yearly = list.yearly[0]
        const Yearly = {
            category: "Yearly",
            conversation: parseInt(yearly.conversation),
            engagements: parseInt(yearly.engagements),
        };
        // setBox(list)


        stats = [
            Daily,
            Weekly,
            Monthly,
            Yearly
        ]
        incomingAndOutGoingCount(stats);
    };

    const dataSourceFailure = (response) => {
	};
	
	const searchContact =(value)=> {
		setVal(value)
			// console.log('ceeleded', props.ValueForSearch, searchVal);
	
			// setSearchVal(props.ValueForSearch)
			setData2(tableData.filter(n =>n.agent_name.toLowerCase().includes(value.toLowerCase())))
			console.log(data2, 'filterssss');
	
	
		}
	return (
		<FusePageSimple
		
			header={
				<div className="flex flex-1 w-full items-center justify-between px-16">
				<div className="flex items-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-26">face</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<span style={{fontSize:'15px'}}>Agent Report</span>
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
						<div className="widget flex w-full sm:w-1/1 md:w-1/1 p-12">
							<Paper className="w-full rounded-8 shadow-none border-1">
								<div id="chartdivv" style={{ width: "100%", height: "300px" }}></div>
							</Paper>
						</div>
					
					</FuseAnimateGroup>

					
					<FusePageSimple 
		classes={{
			content: 'flex',
			header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
			contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
			// content: 'flex flex-col h-full',
			leftSidebar: 'w-256 border-0',
			// header: 'min-h-72 h-full sm:h-136 sm:min-h-136',
			wrapper: 'min-h-0'
		}}
						header={<AgentHeader   SearchVal={searchContact} />}
						content={ <AgentTable data={ val==''? tableData : data2} />}
						/>
							
					

					
				</div>
			}
		/>
	);
}

export default AgentApp;
