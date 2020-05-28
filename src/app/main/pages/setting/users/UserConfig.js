import React from 'react';
import { Redirect } from 'react-router-dom';

const UserConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/apps/campaign/group-detail',
		// 	component: React.lazy(() => import('./group-detail/GroupDetail'))
		// },
		{
			path: '/apps/users',
			component: React.lazy(() => import('./Users'))
		}
		// {
		// 	path: '/apps/campaigns',
		// 	component: () => <Redirect to="/ca/group" />
		// }
	]
};

export default UserConfig;
