import ForgotPasswordPageConfig from './auth/forgot-password/ForgotPasswordPageConfig';
import LockPageConfig from './auth/lock/LockPageConfig';
import Login2PageConfig from './auth/login-2/Login2PageConfig';
import MailConfirmPageConfig from './auth/mail-confirm/MailConfirmPageConfig';
import RegisterPageConfig from './auth/register/RegisterPageConfig';
import ResetPassword2PageConfig from './auth/reset-password-2/ResetPassword2PageConfig';
import ResetPasswordPageConfig from './auth/reset-password/ResetPasswordPageConfig';
import Error404PageConfig from './errors/404/Error404PageConfig';
import IntelligenceConfig from './Intelligence/IntelligenceConfig';
import ChatAppConfig from './chat/ChatAppConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import ChartsAppConfig from './charts/ChartsAppConfig';


const pagesConfigs = [
	RegisterPageConfig,
	ResetPasswordPageConfig,
	ForgotPasswordPageConfig,
	MailConfirmPageConfig,
	LockPageConfig,
	Login2PageConfig,
	ResetPassword2PageConfig,
	Error404PageConfig,
	IntelligenceConfig,
	ChatAppConfig,
	ContactsAppConfig,
	ChartsAppConfig
	
];

export default pagesConfigs;
