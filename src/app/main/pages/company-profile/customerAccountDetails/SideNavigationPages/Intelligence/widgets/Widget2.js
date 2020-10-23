import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function Widget2(props) {
	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
			<div className="text-center pt-24 ">
				<Typography className="text-24 px-12 leading-none text-red">{props.count}</Typography>
			</div>
			<div className="flex items-center justify-center mt-20 px-8 h-40 border-t-1">
				<Typography className="text-11 px-10" color="textSecondary">
					<b className="px-8" style={{ fontSize: 10}}>
						{props.bottom_title}
					</b>
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(Widget2);
