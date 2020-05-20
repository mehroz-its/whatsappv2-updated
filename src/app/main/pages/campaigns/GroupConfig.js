import React from 'react';
import { Redirect } from 'react-router-dom';

const GroupConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/groups/group-detail',
			component: React.lazy(() => import('./group-detail/GroupDetail'))
		},
		{
			path: '/apps/groups/group',
			component: React.lazy(() => import('./campaign/Groups'))
		},
		{
			path: '/apps/groups',
			component: () => <Redirect to="/groups/group" />
		}
	]
};

export default GroupConfig;
