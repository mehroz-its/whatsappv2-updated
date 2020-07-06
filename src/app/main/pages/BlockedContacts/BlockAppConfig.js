import React from 'react';
import { Redirect } from 'react-router-dom';

const BlockAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		// {
		// 	path: '/apps/contacts/:id',
		// 	component: React.lazy(() => import('./BlockContactApp'))
		// },
		{
			path: '/apps/blocklist',
			component: React.lazy(() => import('./BlockContactApp'))
	}
	]
};

export default BlockAppConfig;
