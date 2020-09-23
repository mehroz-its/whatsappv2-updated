import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import widget from './Widget5Data'

function Widget5(props) {
	// console.log('props in widget',props.widget)
	const [currentRange, setCurrentRange] = useState('TW');
	const theme = useTheme();

	// const widget = _.merge({}, props.widget);

	function handleChangeRange(range) {
		
		setCurrentRange(range);
	}

	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
			<div className="flex items-center justify-between px-16 py-16 border-b-1">
				<Typography className="text-16"> {widget[0].title}</Typography>
				<div className="items-center">
					{Object.entries(widget[0].ranges).map(([key, n]) => {
						return (
							<Button
								key={key}
								className="normal-case shadow-none px-16"
								onClick={() => handleChangeRange(key)}
								color={currentRange === key ? 'secondary' : 'default'}
								variant={currentRange === key ? 'contained' : 'text'}
							>
								{n}
							</Button>
						);
					})}
				</div>
			</div>
			<div className="flex flex-row flex-wrap">
				<div className="w-full md:w-1/2 p-8 min-h-450 h-450">
					<Bar
						data={{
							labels: widget[0].mainChart[currentRange].labels,
							datasets: widget[0].mainChart[currentRange].datasets.map((obj, index) => {
								const palette = theme.palette[index === 0 ? 'primary' : 'secondary'];
								return {
									...obj,
									borderColor: palette.main,
									backgroundColor: palette.main,
									pointBackgroundColor: palette.dark,
									pointHoverBackgroundColor: palette.main,
									pointBorderColor: palette.contrastText,
									pointHoverBorderColor: palette.contrastText
								};
							})
						}}
						options={widget[0].mainChart.options}
					/>
				</div>
				<div className="flex w-full md:w-1/2 p-8 ">
					{Object.entries(widget[0].supporting).map(([key, item]) => {
						
						return (
							<div key={key} className="w-full sm:w-1/2 p-12">
								<Typography className="text-15 whitespace-no-wrap" color="textSecondary">
								 {item.chart.options.label}
								</Typography>
								<Typography className="text-32">{item.chart.options.count[currentRange]}</Typography>
							 <div className="h-400 w-full">
									<Line
										data={{
											labels: item.chart[currentRange].labels,
											datasets: item.chart[currentRange].datasets.map((obj, index) => {
												const palette = theme.palette.secondary;
												return {
													...obj,
													borderColor: palette.main,
													backgroundColor: palette.main,
													pointBackgroundColor: palette.dark,
													pointHoverBackgroundColor: palette.main,
													pointBorderColor: palette.contrastText,
													pointHoverBorderColor: palette.contrastText
												};
											})
										}}
										options={item.chart.options}
									/>
								</div>
							</div>
						);
					})}
				</div>
			
			</div>
		</Paper>
	);
}

export default React.memo(Widget5);
