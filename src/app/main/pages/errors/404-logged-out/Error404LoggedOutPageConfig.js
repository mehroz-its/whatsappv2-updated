import React from 'react';

const Error404PageConfig = {
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
			path: '/pagenotfound',
			component: React.lazy(() => import('./Error404LoggedOutPage'))
		}
	]
};

export default Error404PageConfig;
