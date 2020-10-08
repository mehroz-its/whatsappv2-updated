import allPagesConfig from "./allPagesConfig";
import ForgotPasswordPageConfig from './auth/forgot-password/ForgotPasswordPageConfig';
import Login2PageConfig from './auth/login-2/Login2PageConfig';
import ResetPasswordPageConfig from './auth/reset-password/ResetPasswordPageConfig';
import Error404PageConfig from './errors/404/Error404PageConfig';
import TokenConfig from './auth/token/TokenConfig'
import ResetPassword2PageConfig from './auth/reset-password-2/ResetPassword2PageConfig'
import Error404LoggedOutPageConfig from './errors/404-logged-out/Error404LoggedOutPageConfig';

let pagesConfigs = []
let userAcl = localStorage.getItem('user_acl');

if (userAcl !== null){
	userAcl = JSON.parse(userAcl)
	
	pagesConfigs = allPagesConfig.map(config=>{
		let check = false
		if(config&&config.routes&&config.routes.length){
			for(let i=0;i<config.routes.length;i++){
				let route = config.routes[i];

				if(userAcl[`FRONT:${route.path}`]){
					check = true; break;
				}
			}
		}

		if(check){
			return config
		}
	})

	pagesConfigs = pagesConfigs.filter(el=>el)

	
}else{
	pagesConfigs = [
		
		Login2PageConfig,
		ResetPassword2PageConfig,
		Error404LoggedOutPageConfig,
		ResetPasswordPageConfig,
		ForgotPasswordPageConfig,
		TokenConfig
	]
}


export default pagesConfigs;
