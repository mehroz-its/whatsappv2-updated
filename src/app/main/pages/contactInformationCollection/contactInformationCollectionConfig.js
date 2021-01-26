import React from 'react';

const ContactInformationCollectionConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/ContactInformationCollection',
			component: React.lazy(() => import('./contactInformationCollection'))
		},
		
	]
};

export default ContactInformationCollectionConfig;
