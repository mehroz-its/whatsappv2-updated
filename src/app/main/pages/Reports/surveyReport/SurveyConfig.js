import React from 'react';

const SurveyConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/report/surveyReport',
			component: React.lazy(() => import('./SurveyReport'))
		}
	]
};

export default SurveyConfig;
