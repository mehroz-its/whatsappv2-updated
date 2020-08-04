import React from 'react';
import { Redirect } from 'react-router-dom';

const CannedVideoConfig = {
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
			path: '/apps/canned-videos',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedVideoConfig;
