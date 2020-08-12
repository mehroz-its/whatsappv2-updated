import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';

const routeConfigs = [...pagesConfigs,ExampleConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs,null),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/dashboard" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
