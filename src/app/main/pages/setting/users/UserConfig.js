import React from 'react';
import { Redirect } from 'react-router-dom';

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
