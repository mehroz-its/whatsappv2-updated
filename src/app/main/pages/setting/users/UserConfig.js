import React from 'react';
const UserConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/users',
			component: React.lazy(() => import('./Users'))
		}
	]
};

export default UserConfig;
