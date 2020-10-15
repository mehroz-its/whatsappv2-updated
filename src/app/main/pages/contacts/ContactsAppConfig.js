import React from 'react';
import { Redirect } from 'react-router-dom';

const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/contacts/:id',
			component: React.lazy(() => import('./ContactsApp'))
		},
		// {
		// 	path: '/apps/contacts',
		// 	component: () => <Redirect to="/apps/contacts/all" />
		// },
		{
			path: '/apps/contacts/all',
			component: React.lazy(() => import('./ContactsApp.js'))
		},
		{
			path: '/apps/blocklist',
			component: React.lazy(() => import('../BlockedContacts/BlockContactApp'))
		},
		{
			path: '/apps/contact-groups',
			component: React.lazy(() => import('../ContactGoup/ContactGroupApp'))
        },
	]
};

export default ContactsAppConfig;
