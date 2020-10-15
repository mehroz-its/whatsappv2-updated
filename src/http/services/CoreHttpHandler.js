import axios from 'axios';
import ApiResolver from '../apis/ApiResolver';


class CoreHttpHandler {
    constructor() {
        //this.apiEndpoint = process.env.REACT_APP_FRONTEND_ENDPOINT;
        //this.apiEndpoint = 'https://terminus-demo.its.com.pk/v1';
        this.apiEndpoint = 'https://terminus-business-whatsapp.its.com.pk/v1';
        // this.apiEndpoint = 'http://192.168.2.62:3001/v1';
        // this.apiEndpoint = 'https://local-whatsapp.its.com.pk/v1';
        // this.apiEndpoint = 'http://localhost:3000/v1';

        this.config = {
            headers: {
                'content-type': 'text/plain',
            },
        };
    }

    beforeSend = (data) => {
        console.log('REQUEST DATA [BEFORE_SEND] >', data);
    };

    afterSend = (data) => {
        console.log('REQUEST DATA [AFTER_SEND] >', data);
    };

    get(args) {
        return axios['get'].apply(this, [args]);
    };

    request(name, service, params, success, failure, promise = false) {
        const resolvedApi = ApiResolver.resolve(name, service);
        const apiCall = { ...resolvedApi };
        let apiPath = `${this.apiEndpoint}${apiCall.path}`;
        if (
            apiCall.headers.hasOwnProperty('xt-client-token') &&
            apiCall.headers['xt-client-token'] === null
        ) {
            apiCall.headers['xt-client-token'] = localStorage.getItem(
                'client_token'
            );
            if (apiCall.headers['xt-client-token'] === null)
                throw new Error(
                    `Cannot call remote service without authentication token`
                );
        }
        if (
            apiCall.headers.hasOwnProperty('xt-user-token') &&
            apiCall.headers['xt-user-token'] === null
        ) {
            apiCall.headers['xt-user-token'] = localStorage.getItem(
                'user_token'
            );
            // console.log(" apiCall.headers : ", apiCall.headers);
            if (apiCall.headers['xt-user-token'] === null)
                throw new Error(
                    `Cannot call remote service without user authentication token`
                );
        }
        const _config = { headers: { ..._config, ...apiCall.headers } };
        if (params.key !== undefined && apiCall.method === 'get') {
            apiPath = apiPath.replace(params.key, params.value);
            apiPath = apiPath.replace(params.key2, params.value2);
        }
        if (
            params.key !== undefined &&
            (apiCall.method === 'put' || apiCall.method === 'post' || apiCall.method === 'delete')
        ) {
            apiPath = apiPath.replace(params.key, params.value);
            console.log('apiPath', apiPath);

        }
        if (apiCall.method === 'put' && params) {
            apiPath = apiPath.replace(params.key, params.value);
        }
        if (apiCall.method === 'delete' && params) {
            apiPath = apiPath.replace(params.key, params.value);
        }

        const args = [apiPath];

        if (apiCall.method === 'get') {
            args.push(_config);
        } else {
            if (apiCall.method === 'put' || apiCall.method === 'post' || apiCall.method === 'delete') {
                if (params.params) {
                    args.push(params.params);
                } else args.push(params);
            } else {
                args.push(params);
            }
            args.push(_config);
            console.log("args", args);
        }
        if (promise) {
            return axios[apiCall.method].apply(this, args);
        } else {
            axios[apiCall.method]
                .apply(this, args)
                .then((result) => {

                    success(result);
                })
                .catch((error) => {
                    let ah = JSON.stringify(error)
                    let ff = JSON.parse(ah)
                    if (ff.message === "Request failed with status code 401") {
                        alert("Your session has expired please try to login in again")
                        localStorage.clear()
                        window.location.reload(false);
                        return
                    }
                    failure(error);
                });
        }
    }
    requestCustomer(name, service, params, success, failure, promise = false) {

        const resolvedApi = ApiResolver.resolve(name, service);

        const apiCall = { ...resolvedApi };
        console.log('====================================');
        console.log("apiCall : ", apiCall);
        console.log('====================================');
        let apiPath = `${this.apiEndpoint}${apiCall.path}`;
        if (
            apiCall.headers.hasOwnProperty('xt-client-token') &&
            apiCall.headers['xt-client-token'] === null
        ) {
            apiCall.headers['xt-client-token'] = localStorage.getItem(
                'client_token'
            );
            if (apiCall.headers['xt-client-token'] === null)
                throw new Error(
                    `Cannot call remote service without authentication token`
                );
        }
        if (
            apiCall.headers.hasOwnProperty('xt-user-token') &&
            apiCall.headers['xt-user-token'] === null
        ) {
            apiCall.headers['xt-user-token'] = localStorage.getItem(
                'user_token'
            );
            // console.log(" apiCall.headers : ", apiCall.headers);
            if (apiCall.headers['xt-user-token'] === null)
                throw new Error(
                    `Cannot call remote service without user authentication token`
                );
        }
        const _config = { headers: { ...apiCall.headers, ..._config } };
        if (params.key !== undefined && apiCall.method === 'get') {
            apiPath = apiPath.replace(params.key, params.value);
            apiPath = apiPath.replace(params.key2, params.value2);
        }
        if (
            params.key !== undefined &&
            (apiCall.method === 'put' || apiCall.method === 'post' || apiCall.method === 'delete')
        ) {
            apiPath = apiPath.replace(params.key, params.value);

        }
        if (apiCall.method === 'put' && params) {
            apiPath = apiPath.replace(params.key, params.value);
        }
        if (apiCall.method === 'delete' && params) {
            apiPath = apiPath.replace(params.key, params.value);
        }

        const args = [apiPath];
        args.push(_config);
        console.log('====================================');
      
        console.log("_config ", _config);
        console.log('====================================');
        if (apiCall.method === 'put' || apiCall.method === 'post' || apiCall.method === 'delete') {
            if (params.params) {
                args.push(params.params);
            } else args.push(params);
        }
         else {
            args.push(params);
        }
        console.log("args ", args);
        console.log("PROMISE",promise)
         if (promise) {
        return axios[apiCall.method].apply(this, args);
    } else {                
        axios[apiCall.method]
            .apply(this, args)
            .then((result) => {
                success(result);
            })
            .catch((error) => {
                console.log('====================================');
                console.log("error",error);
                console.log('====================================');
                // console.log("errorrrr :" , error.code);
                let ah = JSON.stringify(error)
                let ff = JSON.parse(ah)
                if (ff.message === "Request failed with status code 401") {
                    alert("Your session has expired please try to login in again")
                    localStorage.clear()
                    window.location.reload(false);
                    return
                }
                failure(error);
            });
    }
    // if (apiCall.method === 'get') {
    //     
    // } else {
    // if (apiCall.method === 'put' || apiCall.method === 'post' || apiCall.method === 'delete' ) {
    //     if (params.params) {
    //         args.push(params.params);
    //     } else args.push(params);
    // } else {
    //     args.push(params);
    // }
    // args.push(_config);
    // }
   
}



}

export default new CoreHttpHandler();
