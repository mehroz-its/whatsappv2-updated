import React from 'react';
import { Redirect } from 'react-router-dom';

const CampaignConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/permissions',
			component: React.lazy(() => import('./Permission'))
		}
	]
};

export default CampaignConfig;
