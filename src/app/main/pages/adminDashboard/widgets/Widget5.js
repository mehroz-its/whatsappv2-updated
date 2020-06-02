import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
	  {
		label: 'My First dataset',
		backgroundColor: 'rgba(255,99,132,0.2)',
		borderColor: 'rgba(255,99,132,1)',
		borderWidth: 1,
		hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		hoverBorderColor: 'rgba(255,99,132,1)',
		data: [100, 500, 80, 400, 56, 600, 40]
	  }
	]
  };
function Widget5() {
	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
			<div className="flex items-center justify-between px-16 py-16 border-b-1">
			<Bar
          data={data}
          width={100}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
			</div>
			
		</Paper>
	);
}

export default React.memo(Widget5);
