import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Grid from '@material-ui/core/Grid';

import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import Widget2 from './widgets/Widget2';
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading'
import CustomerTable from './customerTable/CustomerTable'


am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
const useStyles = makeStyles({
    layoutRoot: {},
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
function CustomerAccounts(props) {
    const classes = useStyles();
    const pageLayout = useRef(null);
    const [rader, setrader] = React.useState(newMessageList);
    const [box, setBox] = React.useState([]);
    const [radarList, setRadarList] = React.useState([]);
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
        chart.scrollbarX = new am4core.Scrollbar();
    }
    const dataSourceSuccess = (response) => {
        const list = response.data.data.dashboardBoxInfo.boxes;
        setBox(list)
    };

    const dataSourceFailure = (response) => {
    };
    const messagestateSuccess = (response) => {
        const list = response.data.data.chartData;
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
                                Customer Accounts
							</Typography>
                        </FuseAnimate>
                    </div>
                </div>
            }
            content={

                <>
                    <div className="p-24" style={{ scrollX: false }}>
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: 'transition.slideUpBigIn'
                            }}>
                            <Grid container spacing={4}>
                                <Grid item md={12} sm={12} xs={12} >
                                    <Grid container spacing={4} style={{ marginBottom: '22px', marginTop: '-1px', marginLeft: 4 }}>
                                        <Button style={{ fontSize: '11px' }} variant="contained" color="primary" onClick={(e) => { props.history.push({ pathname: '/apps/company-forms' }) }}>
                                            New Account
                                        </Button>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item md={3} sm={12} xs={12} >
                                            <Widget2 title='Dummy Title' count='5' bottom_title='title' />
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12} >
                                            <Widget2 title='Dummy Title' count='5' bottom_title='title' />
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12} >
                                            <Widget2 title='Dummy Title' count='5' bottom_title='title' />
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12} >
                                            <Widget2 title='Dummy Title' count='5' bottom_title='title' />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} style={{ marginTop: 10 }}>
                                <Grid item md={12} sm={12} xs={12} >
                                    <CustomerTable />
                                </Grid>
                            </Grid>
                        </FuseAnimateGroup>
                    </div>
                </>
            }
        />

    );
}

export default CustomerAccounts;
