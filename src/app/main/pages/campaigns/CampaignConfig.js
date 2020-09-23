import React from 'react';
const CampaignConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/campaign',
			component: React.lazy(() => import('./campaign/Campaign'))
		}
	]
};
export default CampaignConfig;