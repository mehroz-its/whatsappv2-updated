import React from 'react';

const IntelligenceConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	routes: [
		{
			path: '/pages/intelligence',
			component: React.lazy(() => import('./Intelligence'))
		}
	]
};

export default IntelligenceConfig;
