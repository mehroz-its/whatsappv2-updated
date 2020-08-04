import React from 'react';
import { Redirect } from 'react-router-dom';

const CannedImageConfig = {
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
			path: '/apps/canned-images',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedImageConfig;
