import React from 'react';
import { Redirect } from 'react-router-dom';

const ChartsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/chart/chats',
			component: React.lazy(() => import('./ChatApp'))
		},
		{
			path: '/apps/contacts',
			component: () => <Redirect to="/apps/contacts/all" />
		}
	]
};

export default ChartsAppConfig;
