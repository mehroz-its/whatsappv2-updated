import ForgotPasswordPageConfig from './auth/forgot-password/ForgotPasswordPageConfig';
import LockPageConfig from './auth/lock/LockPageConfig';
import Login2PageConfig from './auth/login-2/Login2PageConfig';
import MailConfirmPageConfig from './auth/mail-confirm/MailConfirmPageConfig';
import RegisterPageConfig from './auth/register/RegisterPageConfig';
import ResetPasswordPageConfig from './auth/reset-password/ResetPasswordPageConfig';
import Error404PageConfig from './errors/404/Error404PageConfig';
import IntelligenceConfig from './Intelligence/IntelligenceConfig';
import ContactInformationCollectionConfig from './contactInformationCollection/contactInformationCollectionConfig';
import ChatAppConfig from './chat/ChatAppConfig';
import GroupChatAppConfig from './group-chat/GroupChatAppConfig';
import GroupConfig from './groups/GroupConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import CampaignConfig from './campaigns/CampaignConfig';
import WhatsAppTemplateConfig from './whatsappTemplate/WhatsAppTemplateConfig';
import CannedAppConfig from './setting/canned/CannedAppConfig';
import PermissionConfig from './setting/permission/PermissionConfig';
import RolesConfig from './setting/roles/RolesConfig';
import UserConfig from './setting/users/UserConfig';
import AgentHandlingTimeConfig from './AgentHandlingTime/AgentHandlingTimeConfig.js';
import ServiceLevelConfig from './ServiceLevel/ServiceLevelConfig.js';
import TemplateAppConfig from './templae-messages/TemplateAppConfig';
import ReportsAppConfig from './Reports/ReportsAppConfig';
import AdminDashboardAppConfig from './adminDashboard/AdminDashboardAppConfig';
import AgentConfig from './agent-conversation/AgentConfig';
import BlockListConfig from './blocklist/BlockListConfig';
import ContactGroupConfig from './ContactGoup/ContactGroupConfig';
import TokenConfig from './auth/token/TokenConfig';
import ResetPassword2PageConfig from './auth/reset-password-2/ResetPassword2PageConfig';
import BlockAppConfig from './BlockedContacts/BlockAppConfig';
import ProfileAppConfig from './profile/ProfileAppConfig';
import ChatHistoryConfig from './chat-history/ChatHistoryConfig';
import CompanyProfileConfig from './company-profile/CompanyProfileConfig';
import Error404LoggedOutPageConfig from './errors/404-logged-out/Error404LoggedOutPageConfig';
import chatBotConfig from './chatBot/chatBotConfig';
import OptConfig from './opt/OptConfig';
import OptReportAppConfig from './optReport/OptReportAppConfig';
import SurveyCOnfig from './Reports/surveyReport/SurveyConfig';

let allPagesConfig = [
	CompanyProfileConfig,
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
	ContactInformationCollectionConfig,
	ChatAppConfig,
	ReportsAppConfig,
	GroupChatAppConfig,
	GroupConfig,
	ContactsAppConfig,
	CampaignConfig,
	WhatsAppTemplateConfig,
	CannedAppConfig,
	PermissionConfig,
	RolesConfig,
	UserConfig,
	AgentHandlingTimeConfig,
	ServiceLevelConfig,
	TemplateAppConfig,
	AdminDashboardAppConfig,
	AgentConfig,
	TokenConfig,
	Error404LoggedOutPageConfig,
	chatBotConfig,
	OptConfig,
	OptReportAppConfig,
	SurveyCOnfig
];

export default allPagesConfig;
