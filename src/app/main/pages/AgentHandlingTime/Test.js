import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import reducer from './store/reducers';
import Fab from '@material-ui/core/Fab';
import UserHeader from './UserHeader';
import UserTable from './UserTable';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import UserDialog from './UserDialog'
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'fixed',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330,

	},
	content: {
		'& canvas': {
			maxHeight: '10%'
		}
	}
}))

function AgentHandlingTime(props) {
	const [open, setOpen] = React.useState(false);
	const [dialogData, setDialogData] = React.useState({
		enabled: true,
		id: '',
		username: '',
		position: '',
		email: '',
		number: '',
		roles: []
	})
	const classes = useStyles(props);
	const [val, setVal] = React.useState('')
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')


	const [totalItems, setTotalItems] = React.useState(0)
	const [currentParams, setCurrentParams] = React.useState({ limit: 10, page: 0 })
	const [isLoading, setLoading] = React.useState(true)

	function showError(mes) {
		if (mes)
			snackbar(mes)

	}
	function closeDialog(mes) {
		if (mes)
			snackbar(mes)

		getData()
		setOpen(false);
	}

	const agentHandligChart = dataa => {
		am4core.useTheme(am4themes_animated);
		let chart = am4core.create("chartdivv", am4charts.PieChart);

		// Add data
		chart.data = [{
			"country": "Lithuania",
			"litres": 501.9
		}, {
			"country": "Czechia",
			"litres": 301.9
		}, {
			"country": "Ireland",
			"litres": 201.1
		}, {
			"country": "Germany",
			"litres": 165.8
		}, {
			"country": "Australia",
			"litres": 139.9
		}, {
			"country": "Austria",
			"litres": 128.3
		}, {
			"country": "UK",
			"litres": 99
		}, {
			"country": "Belgium",
			"litres": 60
		}, {
			"country": "The Netherlands",
			"litres": 50
		}];

		// Set inner radius
		chart.innerRadius = am4core.percent(35);

		// Add and configure Series
		let pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "litres";
		pieSeries.dataFields.category = "country";
		pieSeries.slices.template.stroke = am4core.color("#fff");
		pieSeries.slices.template.strokeWidth = 2;
		pieSeries.slices.template.strokeOpacity = 1;

		// This creates initial animation
		pieSeries.hiddenState.properties.opacity = 1;
		pieSeries.hiddenState.properties.endAngle = -90;
		pieSeries.hiddenState.properties.startAngle = -90;


	};

	const getData = ((loadData) => {
		setLoading(true)
		setData([])
		setData2([])
		loadData = () => {
			return CoreHttpHandler.request('agentHandlingTime', 'listing', {
				page: currentParams.page + 1,
				limit: currentParams.limit,
				columns: "*",
				sortby: "ASC",
				orderby: "id",
				where: "displayed = $1",
				values: true,
			}, null, null, true);
		};
		loadData().then((response) => {
			setLoading(false)
			// setTotalItems(response.data.data.list.totalItems)
			console.log(response.data.data.average_time, 'response.data.data.list.data')
			const tableData = response.data.data.average_time
			setData(tableData)
			setData2(tableData)
			setTimeout(() => {
				setSnackBarMessage('')
				setSnackBarOpen(false)
			}, 3000);

		})
			.catch((error) => {
				setLoading(false)

				setTimeout(() => {
					setSnackBarMessage('')
					setSnackBarOpen(false)
				}, 3000);

			})
	})

	React.useEffect(() => {
		getData()
		agentHandligChart()
	}, [currentParams]);

	const setPage = (currentPage) => {
		setCurrentParams({ limit: currentParams.limit, page: currentPage })
	}

	const setLimit = (pageLimit) => {
		setCurrentParams({ limit: pageLimit, page: 0 })
	}


	const handleClickOpen = () => {
		setOpen(true);
	};

	function search(value) {
		setVal(value)
		setData2(data.filter(n => n.username.toLowerCase().includes(value.toLowerCase())))
	}

	const snackbar = (snackmsg) => {
		if (snackmsg === "create") {
			setSnackBarMessage("Created Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg === "update") {
			setSnackBarMessage("Update Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg === "delete") {
			setSnackBarMessage("Deleted Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg === "error") {
			setSnackBarMessage("Error! Please Try Again Later")
			setOK("error")
			setSnackBarOpen(true)
		}
		else if (snackmsg !== ("update" || "delete" || "create" || "error")) {
			if (snackmsg) {
				setSnackBarMessage(snackmsg)
				setOK("error")
				setSnackBarOpen(true)
			} else {
				setSnackBarMessage("")
				setSnackBarOpen(false)
			}
		}
	}

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbaropen}
				autoHideDuration={1000}
			>
				<Alert variant="filled" severity={ok}>
					{snackbarmessage}
				</Alert>
			</Snackbar>
			<FusePageSimple
				classes={{
					header: 'min-h-150 h-150 sm:h-150 sm:min-h-150',
					content: classes.content
				}}
				header={<UserHeader SearchVal={search} />}
				content={
					<Grid container spacing={2} className="p-18" style={{ marginTop: '15px'}}>
						<Grid item md={8} sm={12} xs={12}>
							<Paper className="h-full rounded-8 shadow-none border-1 pt-10 pb-10">
								<UserTable
									showError={showError}
									totalItems={totalItems} setPage={setPage} setLimit={setLimit} rowsPerPage={currentParams.limit} currentPage={currentParams.page} isLoading={isLoading}
									snackbar={snackbar} ValueForSearch={val} dataa={data2} onClose={closeDialog} />
							</Paper>

						</Grid>
						<Grid item md={4} sm={12} xs={12}>
							<Paper className="w-full rounded-8 shadow-none border-1 pt-10 pb-10">

								<div id="chartdivv" style={{ width: '100%', height: '221px' }}></div>
							</Paper>
						</Grid>
					</Grid>

				}
			/>


		</>
	);
}

export default withReducer('eCommerceApp', reducer)(AgentHandlingTime);