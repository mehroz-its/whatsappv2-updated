import Paper from '@material-ui/core/Paper';
import { Typography, ListItemAvatar, Avatar, Grid, Divider } from '@material-ui/core/';
import React from 'react';
import moment from 'moment';

function AgentWidget({ title, agents, selectStartingTime, selectEndingTime, hourSelected, SelectedDateFormat }) {
	console.log(selectStartingTime, 'SAdjaksd');
	console.log(selectEndingTime, 'asjakufndsufaskyfkdsj');

	function dateWithStartingHour(newDateeeee) {
		let date = new Date(newDateeeee);
		let start = date.getHours();
		let end = date.getHours() + 1;
		if (end >= 12) {
			return `${start - 12} - ${end - 12} PM`;
		} else {
			return `${start} - ${end} AM`;
		}
	}
	function initialDate(newDate) {
		let date = newDate;
		let end = moment()
			.month(date.getMonth())
			.date(date.getDate())
			.hours(date.getHours() + 1)
			.minutes(0)
			.seconds(0)
			.milliseconds(0);
		let format = moment(end).format('YYYY-MM-DD');

		return `${format.substr(0, 19)}`;
	}

	return (
		<>
			<Paper className="w-full rounded-8 shadow-none">
				<div
					style={{
						height: '200px',
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						width: '100%',
						background:
							'url(https://upload.its.com.pk/v1/fetch/file/263b0c91-0626-48b8-b3e6-1c1f70b126b6.png)',
						backgroundPosition: 'center',
						backgroundSize: 'cover'
					}}
				>
					<div
						className="pt-24"
						style={{
							width: '100%'
							// height: '250px'
						}}
					>
						{/* <img
						src="https://upload.its.com.pk/1574e1f1-1950-4ff5-9db7-1b5633b88f37.png"
						width="100%"
						height="100%"
					/> */}
						<Grid container alignItems="center">
							<Grid item xs={4}>
								<ListItemAvatar>
									<Avatar
										style={{
											margin: '0 auto 0 20px',
											background: '#aa002782',
											width: '70px',
											height: '70px'
										}}
									>
										<Typography
											className="px-12 leading-none text-white"
											style={{ fontSize: '22px' }}
										>
											{agents}
										</Typography>
									</Avatar>
								</ListItemAvatar>
							</Grid>
							<Grid item xs={8}>
								<Typography className="px-10" color="textSecondary">
									{hourSelected ? (
										<>
											{selectStartingTime > 12 ? (
												<b style={{ fontSize: 15, color: '#fff' }}>{`${title}: ${
													selectStartingTime - 12
												} - ${selectEndingTime - 12} ${
													selectEndingTime >= 12 ? 'PM' : 'AM'
												}`}</b>
											) : (
												<b
													style={{ fontSize: 15, color: '#fff' }}
												>{`${title}: ${selectStartingTime} - ${selectEndingTime} ${
													selectEndingTime >= 12 ? 'PM' : 'AM'
												}`}</b>
											)}
										</>
									) : (
										<b style={{ fontSize: 15, color: '#fff' }}>
											{`${title}: `}
											{dateWithStartingHour(new Date())}
										</b>
									)}
								</Typography>
								<Divider style={{ background: '#fff', height: '2px', margin: '3px 0', width: '75%' }} />
								<div style={{ textAlign: 'center', marginRight: 50 }}>
									<Typography className="px-10" color="textSecondary">
										{hourSelected ? (
											<b style={{ fontSize: 13, color: '#fff' }}>{SelectedDateFormat()}</b>
										) : (
											<b style={{ fontSize: 13, color: '#fff' }}>{initialDate(new Date())}</b>
										)}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</div>
				</div>
				{/* <div className="flex items-center justify-center h-40 border-t-1" style={{ marginTop: 20 }}></div> */}
			</Paper>
		</>
	);
}

export default React.memo(AgentWidget);
