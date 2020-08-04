import React from 'react';
import { Redirect } from 'react-router-dom';

const CannedTextConfig = {
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
			path: '/apps/canned-text',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedTextConfig;
