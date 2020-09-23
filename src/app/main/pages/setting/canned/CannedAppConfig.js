import React from 'react';
import { Redirect } from 'react-router-dom';

const CannedAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/canned-messages',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedAppConfig;
