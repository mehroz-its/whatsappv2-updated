import React from 'react';

const ResetPassword2PageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/auth/reset-password-24',
			component: React.lazy(() => import('./ResetPassword2Page'))
		}
	]
};

export default ResetPassword2PageConfig;
