import Paper from '@material-ui/core/Paper';
import { Typography, ListItemAvatar, Avatar } from '@material-ui/core/';
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
			return `${start-12} - ${end-12} PM`;
		} else {
			return `${start-12} - ${end-12} AM`;
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
			<Paper className="w-full rounded-8 shadow-none border-1">
				<div className="text-center pt-24 ">
					<ListItemAvatar>
						<Avatar
							style={{
								margin: '0 auto',
								background: '#aa0027'
							}}
						>
							<Typography className="px-12 leading-none text-white" style={{ fontSize: '14px' }}>
								{agents}
							</Typography>
						</Avatar>
					</ListItemAvatar>
				</div>
				<div className="flex items-center justify-center h-40 border-t-1" style={{ marginTop: 20 }}>
					<Typography className="px-10" color="textSecondary">
						{hourSelected ? (
							<b
								style={{ fontSize: 10, color: 'black' }}
							>{`${title}: ${selectStartingTime-12} - ${selectEndingTime-12} ${
								selectEndingTime >= 12 ? 'PM' : 'AM'
							}`}</b>
						) : (
							<b style={{ fontSize: 10, color: 'black' }}>
								{`${title}: `}
								{dateWithStartingHour(new Date())}
							</b>
						)}
					</Typography>
				</div>
				<div style={{ textAlign: 'center' }} className="border-t-1">
					<Typography className="px-10" color="textSecondary" style={{ margin: '10px 0' }}>
						{hourSelected ? (
							<b style={{ fontSize: 10 }}>{SelectedDateFormat()}</b>
						) : (
							<b style={{ fontSize: 10 }}>{initialDate(new Date())}</b>
						)}
					</Typography>
				</div>
			</Paper>
		</>
	);
}

export default React.memo(AgentWidget);
