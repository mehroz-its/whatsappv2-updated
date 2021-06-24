import React, { useState, useRef } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '../../../../../@fuse/core/FuseLoading/FuseLoading';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { CSVLink, CSVDownload } from 'react-csv';
import Slide from '@material-ui/core/Slide';
import moment from 'moment';
import ChatHourlyWidget from './ChatHourlyWidget';
import { Icon } from '@material-ui/core';
import Card from 'react-animated-3d-card';

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

var Start = '';
var End = '';

function ChatHourly() {
	const classes = useStyles();
	const csvLinkK = useRef(); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
	const [val, setVal] = useState('');
	const [isLoading, setisLoading] = useState(false);
	const [name, setName] = useState('');
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [ChatHourly, setChatHourly] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectStartingTime, setSelectStartingTIme] = useState('');
	const [selectEndingTime, setSelectEndingTIme] = useState('');
	const [hourSelected, setHourSelected] = useState(false);
	const [selectedTime, setSelectedTime] = useState(new Date());
	const [checked, setChecked] = useState(true);

	const handleDateChange = date => {
		setSelectedDate(date._d);
	};
	const handleTimeChange = time => {
		setSelectedTime(time._d);
		setHourSelected(true);
	};

	React.useEffect(() => {
		dateWithStartingHour();
		dateWithEndingHour();
		TimeWithStartingHour();
		SelectedDateFormat();
	}, [selectedTime]);

	function TimeWithStartingHour() {
		let date = selectedTime;
		let time = date.getHours();
		date.setHours(time);
		date.setMinutes(0);

		setSelectStartingTIme(time);
		setSelectEndingTIme(time + 1);
	}

	function SelectedDateFormat() {
		let date = selectedDate;
		// let start = moment()
		// 	.month(date.getMonth())
		// 	.date(date.getDate())
		// 	.hours(date.getHours())
		// 	.minutes(0)
		// 	.seconds(0)
		// 	.milliseconds(0);
		let format = moment(date).format('YYYY-MM-DD');

		return `${format.substr(0, 19)}`;
	}
	function dateWithStartingHour() {
		let date = selectedDate;
		date.setHours(selectStartingTime);
		date.setMinutes(0);
		// let start = moment()
		// 	.month(date.getMonth())
		// 	.date(date.getDate())
		// 	.hours(date.getHours())
		// 	.minutes(0)
		// 	.seconds(0)
		// 	.milliseconds(0);
		let format = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

		console.log(format, 'newformated');

		return `${format.substr(0, 19)}Z`;
	}

	function dateWithStartingHourCurrent(newDateeeee) {
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

	function dateWithEndingHourCurrent(newDateeeee) {
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

	function dateWithEndingHour() {
		let date = selectedDate;
		date.setHours(selectEndingTime);
		date.setMinutes(0);
		// let end = moment()
		// 	.month(date.getMonth())
		// 	.date(date.getDate())
		// 	.hours(date.getHours() + 1)
		// 	.minutes(0)
		// 	.seconds(0)
		// 	.milliseconds(0);
		let format = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

		return `${format.substr(0, 19)}Z`;
	}

	const getData = loadData => {
		setisLoading(true);

		CoreHttpHandler.request(
			'convoHourly',
			'chatHourly',
			{
				// startingTime: '2021-06-12T1:00:00.000Z',
				startingTime: hourSelected ? dateWithStartingHour() : dateWithStartingHourCurrent(new Date()),
				// endingTime: '2021-06-12T2:00:00.000Z'
				endingTime: hourSelected ? dateWithEndingHour() : dateWithEndingHourCurrent(new Date())
			},
			_response => {
				setChatHourly(_response.data.data.report);
				setisLoading(false);
			},
			error => {}
		);
	};

	React.useEffect(() => {
		getData();
		return () => {
			Start = '';
			End = '';
		};
	}, []);

	const searchContact = value => {
		setVal(value);
		// if (value !== "") {
		// setTableData2(tableData2.filter(n => n.agent_name.toLowerCase().includes(value.toLowerCase())))
		// } else  {
		// setTableData2(tableData)
		// }
	};

	const getDataAgain = () => {
		setChecked(false);
		setTimeout(() => {
			setChecked(true);
		}, 1000);
		setisLoading(true);
		getData();
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
							<Icon className="text-26">history</Icon>
							{/* <ReportIcon style={{ color: '#8b8b8b' }} /> */}
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
								<span style={{ fontSize: '15px' }}>Hourly Chat Logs</span>
							</Typography>
						</FuseAnimate>
					</div>
					<div style={{ justifyContent: 'space-around', marginLeft: '20%' }}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="YYYY-MM-DD"
							margin="normal"
							id="date-picker-inline"
							label="Select Date"
							value={selectedDate}
							style={{ marginRight: '10px' }}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date'
							}}
						/>
					</div>

					{/* <Button
						onClick={handleClickOpen}
						style={{ marginLeft: '10px', marginTop: '28px', fontSize: '10px' }}
						variant="contained"
						color="primary"
						component="span"
					>
						Select Time
					</Button> */}

					<KeyboardTimePicker
						margin="normal"
						id="time-picker"
						label="Select Time"
						value={selectedTime}
						onChange={handleTimeChange}
						KeyboardButtonProps={{
							'aria-label': 'change time'
						}}
					/>

					{/* <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
						<DialogContent>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="demo-dialog-native">Starting Time</InputLabel>
								<Select
									native
									value={selectStartingTime}
									onChange={handleChangeStartingTime}
									input={<Input id="demo-dialog-native" />}
								>
									<option value={1}>1</option>
									<option value={2}>2</option>
									<option value={3}>3</option>
									<option value={4}>4</option>
									<option value={5}>5</option>
									<option value={6}>6</option>
									<option value={7}>7</option>
									<option value={8}>8</option>
									<option value={9}>9</option>
									<option value={10}>10</option>
									<option value={11}>11</option>
									<option value={12}>12</option>
									<option value={13}>13</option>
									<option value={14}>14</option>
									<option value={15}>15</option>
									<option value={16}>16</option>
									<option value={17}>17</option>
									<option value={18}>18</option>
									<option value={19}>19</option>
									<option value={20}>20</option>
									<option value={21}>21</option>
									<option value={22}>22</option>
									<option value={23}>23</option>
								</Select>
							</FormControl>
							<FormControl className={classes.formControl}>
								<InputLabel id="demo-dialog-select-label">Ending Time</InputLabel>
								<Select
									native
									value={selectEndingTime}
									// onChange={handleChangeEndingTime}
									input={<Input id="demo-dialog-native" />}
								>
									<option value={1}>{selectEndingTime}</option>
								</Select>
							</FormControl>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={handleClose} color="primary">
								Ok
							</Button>
						</DialogActions>
					</Dialog> */}

					<Button
						onClick={getDataAgain}
						id="content-upload-button"
						style={{ marginLeft: '10px', marginTop: '28px', fontSize: '10px' }}
						size="small"
						variant="contained"
						color="primary"
						component="span"
					>
						Generate Logs
					</Button>
					{/* <Button
						onClick={DownloadData}
						id="content-upload-button"
						style={{ marginLeft: '8px', marginTop: '6px', fontSize: '10px' }}
						size="small"
						variant="contained"
						color="primary"
						component="span"
					>
						Export
					</Button> */}
					<CSVLink
						data={ChatHourly}
						filename={`agent_${name}.csv`}
						className="hidden"
						ref={csvLinkK}
						target="_blank"
					/>
				</div>
			}
			content={
				<div className="p-12" style={{ overflow: 'hidden' }}>
					<Slide direction="up" in={checked} timeout={1000} mountOnEnter unmountOnExit>
						<Grid container justify="center" style={{ margin: '100px 0' }}>
							{isLoading ? (
								<FuseLoading />
							) : (
								<Grid item xs={12} sm={3}>
									<Card
										style={{
											width: '350px',
											height: '200px'
										}}
										onClick={() => console.log('Card clicked')}
									>
										{ChatHourly.map(item => {
											return (
												<ChatHourlyWidget
													agents={item.count}
													title="Hourly Chat"
													hourSelected={hourSelected}
													selectStartingTime={selectStartingTime}
													selectEndingTime={selectEndingTime}
													SelectedDateFormat={SelectedDateFormat}
												/>
											);
										})}
									</Card>
								</Grid>
							)}
						</Grid>
					</Slide>
				</div>
			}
		/>
	);
}

export default ChatHourly;
