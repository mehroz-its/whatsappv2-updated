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
import GroupChatAppConfig from './group-chat/GroupChatAppConfig';
import GroupConfig from './groups/GroupConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import CampaignConfig from './campaigns/CampaignConfig';
import WhatsAppTemplateConfig from  './whatsappTemplate/WhatsAppTemplateConfig'
import CannedMessageConfig from './canned/CannedMessageConfig'



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
	GroupChatAppConfig,
	GroupConfig,
	ContactsAppConfig,
	CampaignConfig,
	WhatsAppTemplateConfig,
	CannedMessageConfig


	
];

export default pagesConfigs;
