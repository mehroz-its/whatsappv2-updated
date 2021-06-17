import React from 'react';
import { Grid } from '@material-ui/core';
import CustomerReportSidebar from './CustomerReportSidebar';
import CustomerReportTable from './CustomerReportTable';

const CustomerResponseReport = ({ customerFeedback, getData, setFeedbackValue, isLoading, setCustomerFeedback }) => {
	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={3}>
					<CustomerReportSidebar getData={getData} setFeedbackValue={setFeedbackValue} />
				</Grid>
				<Grid item xs={12} sm={9}>
					<CustomerReportTable
						customerFeedback={customerFeedback}
						isLoading={isLoading}
						setCustomerFeedback={setCustomerFeedback}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default CustomerResponseReport;
