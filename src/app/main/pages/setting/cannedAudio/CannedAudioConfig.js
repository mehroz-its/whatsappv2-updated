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
		
		{
			path: '/apps/canned-audio',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedAudioConfig
;
