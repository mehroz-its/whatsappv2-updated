import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function WidgetWeather(props) {
	const items = [
		{
			icon: "rainy",
			name: "Sunday", 
			temp: {
				C: "21",
				F: "70"
			} 
		},
		{
			icon: "cloudy",
			name: "Monaday", 
			temp: {
				C: "21",
				F: "70"
			} 
		},
		{
			icon: "windy3",
			name: "Tuesday", 
			temp: {
				C: "21",
				F: "70"
			} 
		}
]
	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
			<div className="flex items-center justify-between px-4 pt-4">
				<div className="flex items-center px-12">
					<Icon color="action">location_on</Icon>
					<Typography className="text-16 mx-8">
						Karachi
					</Typography>
				</div>
				<IconButton aria-label="more">
					<Icon>more_vert</Icon>
				</IconButton>
			</div>
			<div className="flex items-center justify-center p-16 pb-32">
				<Icon className="meteocons text-40 ltr:mr-8 rtl:ml-8" color="action">
				rainy2
				</Icon>
				<Typography className="text-44 mx-8" color="textSecondary">
					22
				</Typography>
				<Typography className="text-48 font-300" color="textSecondary">
					°
				</Typography>
				<Typography className="text-44 font-300" color="textSecondary">
					C
				</Typography>
			</div>
			<Divider />
			<div className="flex justify-between items-center p-16">
				<div className="flex items-center">
					<Icon className="meteocons text-14" color="action">
						windy
					</Icon>
					<Typography className="mx-4">
						12
					</Typography>
					<Typography color="textSecondary">KMH</Typography>
				</div>

				<div className="flex items-center">
					<Icon className="meteocons text-14" color="action">
						compass
					</Icon>
					<Typography className="mx-4">
					NW
					</Typography>
				</div>

				<div className="flex items-center">
					<Icon className="meteocons text-14" color="action">
						rainy
					</Icon>
					<Typography className="mx-4">
					98%
					</Typography>
				</div>
			</div>
			<Divider />
			<div className="w-full py-16">
				{items.map( (id,day) => (
					<div className="flex items-center justify-between w-full py-16 px-24" key={day}>
						<Typography className="text-15">{id.name}</Typography>
						<div className="flex items-center">
							<Icon className="meteocons text-24 ltr:mr-16 rtl:ml-16" color="action">
							{id.icon}
							</Icon>
							<Typography className="text-20">{day.temp}</Typography>
							<Typography className="text-20" color="textSecondary">
								&deg;
							</Typography>
						
						</div>
					</div>
				))}
			</div>
		</Paper>
	);
}

export default React.memo(WidgetWeather);
