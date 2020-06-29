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
			path: '/apps/block-list',
			component: React.lazy(() => import('./blocklist/BlockList.js'))
		}
		// {
		// 	path: '/apps/campaigns',
		// 	component: () => <Redirect to="/ca/group" />
		// }
	]
};

export default CampaignConfig;
