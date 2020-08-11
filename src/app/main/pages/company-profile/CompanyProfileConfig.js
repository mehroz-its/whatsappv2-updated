import React from 'react';
import { Redirect } from 'react-router-dom';

const CompanyProfileConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/company-profile',
			component: React.lazy(() => import('./companyProfile.js'))
		},
		
	]
};

export default CompanyProfileConfig;
