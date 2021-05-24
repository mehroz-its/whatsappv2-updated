import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function AgentWidget({ title, agents }) {
	return (
		<>
			<Paper className="w-full rounded-8 shadow-none border-1">
				<div className="text-center pt-24 ">
					<Typography className="px-12 leading-none text-red" style={{ fontSize: '20px' }}> {agents}</Typography>
				</div>
				<div className="flex items-center justify-center mt-20  h-40 border-t-1">
					<Typography className="px-10" color="textSecondary">
						<b style={{ fontSize: 8 }}>
							{/* {value.title} {value.title2 ? '/' : null}  */}
							{`${title}`}
						</b>
					</Typography>
				</div>
			</Paper>
		</>
	);
}

export default React.memo(AgentWidget);
