import React from "react";

import {
    Route,
    Redirect,
} from "react-router-dom";

const ProtectedRoute = ({ component: Comp, hasPermission, setSnackBarMessage, userAuthenticated, path, ...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={props => {
                return userAuthenticated ? (
                    <Comp {...props} hasPermission={hasPermission} setSnackBarMessage={setSnackBarMessage} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    prevLocation: path,
                                    error: "You dont have access to this page",
                                },
                            }}
                        />
                    );
            }}
        />
    );
};

export default ProtectedRoute;  