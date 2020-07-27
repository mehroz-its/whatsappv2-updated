import React from 'react';
import { Redirect } from 'react-router-dom';

const ContactGroupConfig = {
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
			path: '/apps/contact-groups',
			component: React.lazy(() => import('./ContactGroupApp'))
	}
	]
};

export default ContactGroupConfig;
