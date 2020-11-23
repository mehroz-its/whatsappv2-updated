import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import routes from 'app/store/reducers/fuse/routes.reducer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import pagesConfigs from "../../../app/main/pages/pagesConfigs";
import allPagesConfig from "../../../app/main/pages/allPagesConfig";
import {HOME_URL,HOME_URL2} from "./../../../app/common/parameters.js";

class FuseAuthorization extends Component {



	constructor(props, context) {
		super(props);
		const { routes } = context;
		this.state = {
			accessGranted: true,
			routes,
			user_routes: null
		};
	}



	componentDidMount() {
		// if (!this.state.accessGranted) {
		// 	this.redirectRoute();
		// }
		if (this.props.hasPermission === null) {
			this.redirectRoute();
		} else {
			this.setState({ user_routes: this.props.hasPermission })
			// console.log(this.state.user_routes, "state.user_routes")
		}


	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.accessGranted !== this.state.accessGranted;
	}

	componentDidUpdate() {
		if (!this.state.accessGranted) {
			this.redirectRoute();
		}
	}
//{"FRONT:/dashboard":1,"FRONT:/apps/chat":1,"FRONT:/apps/history":1,"FRONT:/apps/campaign":1,"FRONT:/apps/whatsapp-template":1,"FRONT:/apps/contacts/all":1,"FRONT:/apps/contacts":1,"FRONT:/report/chat":1,"FRONT:/report/agent-report":1,"FRONT:/apps/agent":1,"FRONT:/apps/canned-messages":1,"FRONT:/apps/roles":1,"FRONT:/apps/permissions":1,"FRONT:/apps/users":1,"FRONT:/apps/blocklist":1,"FRONT:/apps/groups/group-detail":1,"FRONT:/apps/groups/group":1,"FRONT:/apps/groups":1,"FRONT:/apps/contact-groups":1,"FRONT:/pages/errors/error-404":1,"FRONT:/apps/company-profile":1}
	static pageExists(pathname) {

		if (allPagesConfig && allPagesConfig.length) {
			let data = allPagesConfig.map(config => {
				if (config && config.routes && config.routes.length) {
					return [...config.routes.map(route => {
						if (route && route.path && route.path === pathname) {
							return true
						}
					})]
				}
			})
			data = [].concat(...data)
			if (data && data.length) {
				data = data.filter(el => el === true)
				if (data && data.length) {
					return true
				}
			}
		}

		return false
	}
	static findPath(pathname) {

		if (pagesConfigs && pagesConfigs.length) {
			let data = pagesConfigs.map(config => {
				if (config && config.routes && config.routes.length) {
					return [...config.routes.map(route => {
						if (route && route.path && route.path === pathname) {
							return true
						}
					})]
				}
			})
			data = [].concat(...data)
			if (data && data.length) {
				data = data.filter(el => el === true)
				if (data && data.length) {
					return true
				}
			}
		}
		return false
	}

	static getDerivedStateFromProps(props, state) {
		// const { location, userRole } = props;
		// const { pathname } = location;
		// console.log('propsprops', pathname)
		// const matched = matchRoutes(state.routes, pathname)[0];

		// return {
		// 	accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, userRole) : true
		// };

		const { location, userRole } = props;
		const { pathname } = location;

		let check = FuseAuthorization.findPath(pathname);
		if (check) {

			return {
				accessGranted: check
			};
		} else {
			let userAcl = localStorage.getItem('user_acl');

			let pageExists = FuseAuthorization.pageExists(pathname)
			if (pageExists) {
				if (userAcl) {
					if (window.location.pathname !== HOME_URL) {
						window.location = HOME_URL
					}else if (window.location.pathname !== HOME_URL2) {
						window.location = HOME_URL2
					}else{
						window.location = "/"
					}
				} else {

					if (window.location.pathname !== '/login') {
						window.location = "/login"
					}
				}
			} else {
				if (userAcl) {

					if (window.location.pathname !== '/pages/errors/error-404') {
						window.location = "/pages/errors/error-404"
					}
				} else {
					if(window.location.pathname === '/'){
						window.location = "/login"
					}else if (window.location.pathname !== '/pagenotfound' ) {
						window.location = "/pagenotfound"
					}
				}
			}

			return {
				accessGranted: false
			};
		}
	}

	redirectRoute() {
		const { location, userRole, history } = this.props;
		const { pathname, state } = location;
		const redirectUrl = state && state.redirectUrl ? state.redirectUrl : location.pathname;
		/*
		User is guest
		Redirect to Login Page
		*/
		if (!userRole || userRole.length === 0) {
			history.push({
				pathname: redirectUrl === '/' ? '/login' : redirectUrl,
				state: { redirectUrl: pathname }
			});
		} else {
			/*
		User is member
		User must be on unAuthorized page or just logged in
		Redirect to dashboard or redirectUrl
		*/
			history.push({
				pathname: redirectUrl
			});
		}
	}

	render() {
		// console.info('Fuse Authorization rendered', accessGranted);
		return this.state.accessGranted ? <>{this.props.children}</> : null;
	}
}

function mapStateToProps({ auth }) {
	return {
		userRole: auth.user.role
	};
}

// const FuseAuthorization = ({ component: Comp, hasPermission, setSnackBarMessage, userAuthenticated, path, ...rest }) => {
//     return (
//         <Route
//             path={path}
//             {...rest}
//             render={props => {
//                 return userAuthenticated ? (
//                     <Comp {...props} hasPermission={hasPermission} setSnackBarMessage={setSnackBarMessage} />
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/",
//                                 state: {
//                                     prevLocation: path,
//                                     error: "You dont have access to this page",
//                                 },
//                             }}
//                         />
//                     );
//             }}
//         />
//     );
// };

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
