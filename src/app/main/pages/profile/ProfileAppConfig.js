import React from 'react';

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
