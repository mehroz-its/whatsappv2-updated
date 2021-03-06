import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function SurveyWidget2({ value, count, title, index }) {
	// console.log(value, 'widgetvalueeee');
	// console.log(count, 'widgetttcount');
	console.log(title[index].bottomTitle, 'boxDataaaaaa');
	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
			<div className="text-center pt-24 ">
				<Typography className="text-24 px-12 leading-none text-red">
					{count} {value.value2 ? '/' : null} {value.value2 ? value.value2 : null}
				</Typography>
			</div>
			<div className="flex items-center justify-center mt-20  h-40 border-t-1">
				<Typography className="px-10" color="textSecondary">
					<b style={{ fontSize: 8 }}>
						{/* {value.subtitle} {value.title} {value.title2 ? '/' : null} {value.title2 ? value.title2 : null} */}{' '}
						{title[index].bottomTitle}
						 {/* {title ? '/' : null} {title ? title : null} */}
						{/* {`${value.subtitle} ${value.title}`} */}
					</b>
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(SurveyWidget2);
