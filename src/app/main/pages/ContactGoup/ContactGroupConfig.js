import React from 'react';

const ContactGroupConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
	
		{
			path: '/apps/contact-groups',
			component: React.lazy(() => import('./ContactGroupApp'))
	}
	]
};

export default ContactGroupConfig;
