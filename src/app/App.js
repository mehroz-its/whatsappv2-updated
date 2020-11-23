import MomentUtils from '@date-io/moment';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import store from './store';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useIdleTimer } from 'react-idle-timer'
import CoreHttpHandler from './../http/services/CoreHttpHandler';


const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName();

const App = () => {
	const [hasPermission, setHasPermission] = React.useState(null)
	const [displaySnack, setDisplaySnack] = React.useState(false)

	window.addEventListener("storage",e=>{
		let userToken = localStorage.getItem("user_token")
		if(!userToken&&window.location.pathname!=="/login"){
			window.location.reload()
		}
	})
	React.useEffect(() => {
		const user_acl = localStorage.getItem('user_acl')
		setHasPermission(user_acl)
	});
	setTimeout(() => {

		setDisplaySnack(true)

	}, 4000);



	const handleOnIdle = event => {

		let userToken = localStorage.getItem("user_token")

		if(userToken){
			localStorage.setItem('online', false);

			CoreHttpHandler.request(
				'core',
				'offline',
				{},
				response => { },
				response => { }
			);
			CoreHttpHandler.request(
				'core',
				'userLogout',
				{},
				response => {
					window.location.href = '/login';
					localStorage.clear();
				},
				response => {}
			);
		}
		
	}
	 
	const { getRemainingTime, getLastActiveTime } = useIdleTimer({
		timeout: 1000 * 60 * 15,
		onIdle: handleOnIdle,
		debounce: 500
	})

	return (
		<AppContext.Provider
			value={{
				routes
			}}
		>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<Auth>
							<Router history={history}>
								<FuseAuthorization
									hasPermission={hasPermission}>
									<FuseTheme>
										<FuseLayout />
										{/* {displaySnack ? (
											<Alert severity="error">
												<AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
											</Alert>
										) : null

										} */}
									</FuseTheme>
								</FuseAuthorization>
							</Router>
						</Auth>
					</MuiPickersUtilsProvider>
				</Provider>
			</StylesProvider>
		</AppContext.Provider>
	);
};

export default App;
