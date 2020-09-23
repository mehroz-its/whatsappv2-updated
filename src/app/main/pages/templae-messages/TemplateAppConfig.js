import React from 'react';
const TemplateAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/whatsapp-template',
			component: React.lazy(() => import('./TemplateMessage'))
	}
	]
};

export default TemplateAppConfig;
