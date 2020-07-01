import React from 'react';

const ResetPassword2PageConfig = {
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
			path: '/pages/auth/reset-password',
			component: React.lazy(() => import('./ResetPassword2Page'))
		}
	]
};

export default ResetPassword2PageConfig;
