import React from 'react';
import { Redirect } from 'react-router-dom';

const CannedDocumentConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		
		{
			path: '/apps/canned-docs',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedDocumentConfig;
