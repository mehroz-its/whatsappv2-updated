import React from 'react';
import { Redirect } from 'react-router-dom';

const RolesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/roles',
			component: React.lazy(() => import('./Roles'))
		}
	]
};

export default RolesConfig;
