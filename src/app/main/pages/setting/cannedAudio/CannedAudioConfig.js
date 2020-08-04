import React from 'react';
import { Redirect } from 'react-router-dom';

const CannedAudioConfig
 = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		// {
		// 	path: '/apps/contacts/:id',
		// 	component: React.lazy(() => import('./BlockContactApp'))
		// },
		{
			path: '/apps/canned-audio',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedAudioConfig
;
