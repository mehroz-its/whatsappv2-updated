import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function Widget2(props) {
	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
			<div className="flex items-center justify-center px-4 pt-4">
				<Typography className="text-13 px-12 pt-20">{props.title}</Typography>
				
			</div>
			<div className="text-center pt-8 ">
				<Typography className="text-24 px-12 leading-none text-red">{props.count}</Typography>
				
			</div>
			<div className="flex items-center justify-center mt-20 px-8 h-40 border-t-1">
				<Typography className="text-5 px-10" color="textSecondary">
					{/* <span className="truncate">lable</span>: */}
					<b className="px-8">{props.bottom_title}</b>
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(Widget2);
