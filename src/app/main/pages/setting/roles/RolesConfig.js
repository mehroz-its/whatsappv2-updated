import React from 'react';
import { Redirect } from 'react-router-dom';

const RolesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/apps/campaign/group-detail',
		// 	component: React.lazy(() => import('./group-detail/GroupDetail'))
		// },
		{
			path: '/apps/roles',
			component: React.lazy(() => import('./Roles'))
		}
		// {
		// 	path: '/apps/campaigns',
		// 	component: () => <Redirect to="/ca/group" />
		// }
	]
};

export default RolesConfig;
