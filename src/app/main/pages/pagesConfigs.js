import ForgotPasswordPageConfig from './auth/forgot-password/ForgotPasswordPageConfig';
import LockPageConfig from './auth/lock/LockPageConfig';
import Login2PageConfig from './auth/login-2/Login2PageConfig';
import MailConfirmPageConfig from './auth/mail-confirm/MailConfirmPageConfig';
import RegisterPageConfig from './auth/register/RegisterPageConfig';
import ResetPasswordPageConfig from './auth/reset-password/ResetPasswordPageConfig';
import Error404PageConfig from './errors/404/Error404PageConfig';
import IntelligenceConfig from './Intelligence/IntelligenceConfig';
import ChatAppConfig from './chat/ChatAppConfig';
import GroupChatAppConfig from './group-chat/GroupChatAppConfig';
import GroupConfig from './groups/GroupConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import CampaignConfig from './campaigns/CampaignConfig';
import WhatsAppTemplateConfig from  './whatsappTemplate/WhatsAppTemplateConfig'
import CannedAppConfig from './setting/canned/CannedAppConfig'
import CannedAudioConfig from './setting/cannedAudio/CannedAudioConfig'
import CannedDocumentConfig from './setting/cannedDocument/CannedDocumentConfig'
import CannedImageConfig from './setting/cannedImage/CannedImageConfig'
import CannedVideoConfig from './setting/cannedVideo/CannedVideoConfig'
import CannedTextConfig from './setting/cannedText/CannedTextConfig'
import CitiesConfig from './setting/cities/CitiesConfig'
import CountryConfig from './setting/countries/CountryConfig'
import PermissionConfig from './setting/permission/PermissionConfig'
import RolesConfig from './setting/roles/RolesConfig'
import UserConfig from './setting/users/UserConfig'
import TemplateConfig from './template-message/TemplateConfig'
import ReportsAppConfig from './reports/ReportsAppConfig'
// import ReportsAppConfig from './reports/ReportsAppConfig'
import AdminDashboardAppConfig from './adminDashboard/AdminDashboardAppConfig'
import AgentConfig from './agent-conversation/AgentConfig'
import BlockListConfig from './blocklist/BlockListConfig'
import ContactGroupConfig from './ContactGoup/ContactGroupConfig'
import TokenConfig from './auth/token/TokenConfig'
import ResetPassword2PageConfig from './auth/reset-password-2/ResetPassword2PageConfig'
import BlockAppConfig from './BlockedContacts/BlockAppConfig'
import ProfileAppConfig from './profile/ProfileAppConfig'
import ChatHistoryConfig from './chat-history/ChatHistoryConfig'
import CompanyProfileConfig   from './company-profile/CompanyProfileConfig'

const pagesConfigs = [
	CompanyProfileConfig,
	CannedDocumentConfig,
	CannedImageConfig,
	CannedAudioConfig,
	CannedVideoConfig,
	CannedTextConfig,
	ContactGroupConfig,
	ChatHistoryConfig,
	ProfileAppConfig,
	BlockAppConfig,
	BlockListConfig,
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
	ReportsAppConfig,
	GroupChatAppConfig,
	GroupConfig,
	ContactsAppConfig,
	CampaignConfig,
	WhatsAppTemplateConfig,
	CannedAppConfig,
	CitiesConfig,
	CountryConfig,
	PermissionConfig,
	RolesConfig,
	UserConfig,
	TemplateConfig,
	AdminDashboardAppConfig,
	AgentConfig,
	TokenConfig,
	ResetPassword2PageConfig


	
];

export default pagesConfigs;
