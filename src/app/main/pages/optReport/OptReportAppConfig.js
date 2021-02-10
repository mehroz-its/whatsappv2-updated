import React from 'react';

const OptReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/optReport',
			component: React.lazy(() => import('./OptReportApp'))
		}
		
	]
};

export default OptReportAppConfig;
