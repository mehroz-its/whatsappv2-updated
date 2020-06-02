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
		<Paper className="w-full rounded-8 shadow-none border-1">
			<div className="flex items-center justify-between px-4 pt-4">
				<Typography className="text-16 px-12">timeee</Typography>
				<IconButton aria-label="more">
					<Icon>more_vert</Icon>
				</IconButton>
			</div>
			<div className="text-center px-24 py-32">
				<Typography className="text-24 leading-tight" color="textSecondary">
				MOnth
				</Typography>
				<Typography className="text-72 leading-tight" color="textSecondary">
					date
				</Typography>
				<Typography className="text-24 leading-tight" color="textSecondary">
					Year
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(WidgetNow);
