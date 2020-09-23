import React from 'react';
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
