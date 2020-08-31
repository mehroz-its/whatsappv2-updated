import React from 'react';
import { Redirect } from 'react-router-dom';

const TemplateAppConfig = {
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
			path: '/apps/whatsapp-template',
			component: React.lazy(() => import('./TemplateMessage'))
	}
	]
};

export default TemplateAppConfig;
