import React from 'react';
import { Redirect } from 'react-router-dom';

const CampaignConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/apps/campaign/group-detail',
		// 	component: React.lazy(() => import('./group-detail/GroupDetail'))
		// },
		{
			path: '/apps/permissions',
			component: React.lazy(() => import('./Permission'))
		}
		// {
		// 	path: '/apps/campaigns',
		// 	component: () => <Redirect to="/ca/group" />
		// }
	]
};

export default CampaignConfig;
