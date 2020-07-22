import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

function WidgetNow() {
	const [time, setTime] = useState(moment());
	const intervalRef = useRef();

	useEffect(() => {
		intervalRef.current = setInterval(update, 1000);
		return () => {
			clearInterval(intervalRef.current);
		};
	});

	function update() {
		setTime(moment());
	}

	return (
		<Paper className="rounded-8 shadow-none border-1" style={{height:'70%'}}>
			<div className="flex items-center justify-between">
				<Typography className="text-13 px-12">{time.format('dddd, HH:mm:ss')}</Typography>
				<IconButton className="text">
					<Icon>more_vert</Icon>
				</IconButton>
			</div>
			<div className="text-center px-20 py-26">
				<Typography className="text-24 leading-tight" color="textSecondary">
					{time.format('MMMM')}
				</Typography>
				<Typography className="text-72 leading-tight" color="textSecondary">
					{time.format('D')}
				</Typography>
				<Typography className="text-24 leading-tight" color="textSecondary">
					{time.format('Y')}
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(WidgetNow);
