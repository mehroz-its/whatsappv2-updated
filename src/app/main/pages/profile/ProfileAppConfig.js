import React from 'react';
import { Redirect } from 'react-router-dom';

const ProfileAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/profile',
			component: React.lazy(() => import('./ProfileApp.js'))
		}
		
	]
};

export default ProfileAppConfig;
