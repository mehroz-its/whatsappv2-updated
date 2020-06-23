import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

class FuseAuthorization extends Component {

	

	constructor(props, context) {
		super(props);
		const { routes } = context;
		this.state = {
			accessGranted: true,
			routes,
			user_routes:null
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
			console.log(this.state.user_routes,"state.user_routes")
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

	static getDerivedStateFromProps(props, state) {
		const { location, userRole } = props;
		const { pathname } = location;

		const matched = matchRoutes(state.routes, pathname)[0];

		return {
			accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, userRole) : true
		};
	}

	redirectRoute() {
		const { location, userRole, history } = this.props;
		const { pathname, state } = location;
		const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';

		/*
        User is guest
        Redirect to Login Page
        */
		if (!userRole || userRole.length === 0) {
			history.push({
				pathname: '/login',
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
