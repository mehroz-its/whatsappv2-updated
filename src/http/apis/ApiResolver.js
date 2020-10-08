import CoreApis from './core';
import DashboardApis from './dashboard';
import RoleApis from './roles';
import GroupsApis from './group';
import UserApis from './users';
import PermissionsApi from './permissions';
import CannedMessagesApi from './canned_messages';
import ContactBookApis from './contact_book';
import ContactGroupApis from './contact_group';
import Template from './template';
import ContentApis from './content';
import AttachmentApis from './attachments';
import ConversationsApi from './conversations';
import ForgetPasswordApi from './forgetPassword';
import CampaignApis from './campaigns';
import Reports from './reports';
import ProfileApis from './profile';
import LocationApis from './locations';
import CustomerOnBoard from './customerOnBoard';
import Business from './onBoarding/business';
import BusinessDetails from './onBoarding/businessDetails';
import CompanyStats from './onBoarding/companyStats';
import CompanyAgent from './onBoarding/companyAgent';

class ApiResolver {
    constructor() {
        this.apis = {
            CompanyAgent:CompanyAgent.apis(),
            CompanyStats:CompanyStats.apis(),
            Business:Business.apis(),
            BusinessDetails:BusinessDetails.apis(),
            customerOnBoard:CustomerOnBoard.apis(),
            core: CoreApis.apis(),
            dashboard: DashboardApis.apis(),
            roles: RoleApis.apis(),
            users: UserApis.apis(),
            groups: GroupsApis.apis(),
            permissions: PermissionsApi.apis(),
            conversations: ConversationsApi.apis(),
            attachments: AttachmentApis.apis(),
            canned_messages: CannedMessagesApi.apis(),
            contact_book : ContactBookApis.apis(),
            contact_group : ContactGroupApis.apis(),
            template: Template.apis(),
            content: ContentApis.apis(),
            campaigns: CampaignApis.apis(),
            forgetpassword: ForgetPasswordApi.apis(),
            reports: Reports.apis(),
            profile: ProfileApis.apis(),
            locations: LocationApis.apis(),
        };
    }

    resolve(name, apiCall) {
        if (!this.apis[name])
            throw new Error(`Failed to resolve api [${name}]`);

        if (!this.apis[name][apiCall])
            throw new Error(`Failed to resolve api call [${apiCall}]`);

        return this.apis[name][apiCall];
    }
}

export default new ApiResolver();
