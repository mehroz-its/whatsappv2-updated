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
import ProfileContent from './ProfileContent'
// import Widget2 from './widgets/Widget2';
// import WidgetNow from './widgets/WidgetNow';
// import WidgetWeather from './widgets/WidgetWeather';
// import Widget5 from './/widgets/Widget5'
// import BusinessDetails from './forms/BusinessDetails'
// import CreateProfile from './forms/CreateProfile'
// import WhatsAppAcount from './forms/WhatsAppAcount'




const useStyles = makeStyles({
	layoutRoot: {}
});




function ProfileApp() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	let [tabValue, setTabValue] = useState(1);



	React.useEffect(() => {
		// rader_chart();
	})
	function handleChangeTab(event, value) {
		setTabValue(tabValue+1);
	}
	function handleChangeTabBack(event, value) {
		setTabValue(tabValue-1);
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
						Profile
						</Typography>
					{/* </div> */}
				</div>
			}
			// contentToolbar={
			// 	<Tabs
			// 		value={tabValue}
			// 		onChange={handleChangeTab}
			// 		indicatorColor="primary"
			// 		textColor="primary"
			// 		variant="scrollable"
			// 		scrollButtons="off"
			// 		className="w-full border-b-1 px-24"
			// 	>
			// 		<Tab className="text-14 font-600 normal-case" label="Business Details" />
			// 		<Tab className="text-14 font-600 normal-case" label="WhatsApp Account Details" />
			// 		<Tab className="text-14 font-600 normal-case" label="Create Profile" />
			// 		{/* <Tab className="text-14 font-600 normal-case" label="WhatsApp Account Details" />
			// 		<Tab className="text-14 font-600 normal-case" label="WhatsApp Account Details" /> */}
			// 	</Tabs>
			// }
			content={	<ProfileContent />		}
			
		/>
	);
}

export default ProfileApp;