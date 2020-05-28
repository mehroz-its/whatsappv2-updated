import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'Super Admin',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'Intelligence',
				title: 'Intelligence',
				translate: 'INTELLEIGENCE',
				type: 'item',
				icon: 'dashboard',
				url: '/pages/intelligence'
			},
			{
				id: 'Accounts',
				title: 'Accounts',
				translate: 'ACCOUNTS',
				type: 'item',
				icon: 'dashboard',
				url: '/account'
			},
			{
				id: 'Reports',
				title: 'Reports',
				translate: 'REPORTS',
				type: 'item',
				icon: 'dashboard',
				url: '/reports'
			},
			{
				id: 'Package',
				title: 'Package',
				translate: 'PACKAGE',
				type: 'item',
				icon: 'dashboard',
				url: '/package'
			},
			{
				id: 'Template',
				title: 'Template',
				translate: 'TEMPLATE',
				type: 'collapse',
				icon: 'dashboard',
				children : [
					{
						id   : 'Request',
						title: 'Request',
						type : 'item',
						url  : '/Request'
					},
					{
						id   : 'Manage',
						title: 'Manage',
						type : 'item',
						url  : '/Manage'
					}
				]
			},
		]
	},
	{
		id: 'applications',
		title: 'Applications',
		translate: 'ADMIN',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboards',
				title: 'Dashboards',
				translate: 'DASHBOARDS',
				type: 'collapse',
				icon: 'dashboard',
				children: [
					{
						id: 'analytics-dashboard',
						title: 'Analytics',
						type: 'item',
						url: '/apps/dashboards/analytics'
					},
					{
						id: 'project-dashboard',
						title: 'Project',
						type: 'item',
						url: '/apps/dashboards/project'
					}
				]
			},
			{
				id: 'Conversation',
				title: 'Conversation',
				translate: 'CONVERSATION',
				type: 'item',
				icon: 'today',
				url: '/apps/chat',
				badge: {
					title: 13,
					bg: 'rgb(9, 210, 97)',
					fg: '#FFFFFF'
				}
			},
			{
				id: 'Groups',
				title: 'Groups',
				translate: 'GRUOP',
				type: 'collapse',
				icon: 'shopping_cart',
				url: '/apps/groups/group',
				children: [
					{
						id: 'Conversation',
						title: 'Conversation',
						type: 'item',
						url: '/apps/group-chat',
						exact: true,
						badge: {
					title: 25,
					bg: '#F44336',
					fg: '#FFFFFF'
				}
					},
					{
						id: 'Groups',
						title: 'Groups',
						type: 'item',
						url: '/apps/groups/group',
						exact: true,
						badge: {
					title: 25,
					bg: '#F44336',
					fg: '#FFFFFF'
				}
					},
					{
						id: 'Group Details',
						title: 'Group Details',
						type: 'item',
						url: '/apps/groups/group-detail',
						exact: true,
						badge: {
					title: 25,
					bg: '#F44336',
					fg: '#FFFFFF'
				}
					}
				
				]
			},
			{
				id: 'Template Message',
				title: 'Template Message',
				translate: 'TEMPLATE MESSAGE',
				type: 'item',
				icon: 'school',
				url: '/apps/academy'
			},
			{
				id: 'Compaigns',
				title: 'Compaigns',
				translate: 'COMPAIGNS',
				type: 'item',
				icon: 'email',
				url: '/apps/campaign',
				// badge: {
				// 	title: 25,
				// 	bg: '#F44336',
				// 	fg: '#FFFFFF'
				// }
			},
			{
				id: 'Contact Book',
				title: 'Contact Book',
				translate: 'CONTACT BOOK',
				type: 'item',
				icon: 'shopping_cart',
				url: '/apps/contacts/all',
			},
			{
				id: 'Gallery',
				title: 'Gallery',
				translate: 'GALLERY',
				type: 'collapse',
				icon: 'shopping_cart',
				
				children: [
					{
						id: 'Whatsapp Template',
						title: 'Whatsapp Template',
						type: 'item',
						url: '/apps/whatsapp-template',
						exact: true
					},
					{
						id: 'Canned Messages',
						title: 'Canned Messages',
						type: 'item',
						url: '/apps/canned-messages',
						exact: true
					}
				
				
				]
			},
			{
				id: 'REPORTS',
				title: 'REPORTS',
				translate: 'REPORTS',
				type: 'collapse',
				icon: 'shopping_cart',
				url: '/apps/todo',
				children: [
					{
						id: 'Chat',
						title: 'Chat',
						type: 'item',
						url: '/apps/e-commerce/products',
						exact: true
					},
					{
						id: 'Agent',
						title: 'Agent',
						type: 'item',
						url: '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
						exact: true
					},
					{
						id: 'Compaigns',
						title: 'Compaigns',
						type: 'item',
						url: '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
						exact: true
					}
				
				
				]
			},
			{
				id: 'SETTINGS',
				title: 'SETTINGS',
				translate: 'SETTINGS',
				type: 'collapse',
				icon: 'shopping_cart',
				url: '/apps/todo',
				children: [
					{
						id: 'Countries',
						title: 'Countries',
						type: 'item',
						url: '/apps/e-commerce/products',
						exact: true
					},
					{
						id: 'Cities',
						title: 'Cities',
						type: 'item',
						url: '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
						exact: true
					},
					{
						id: 'Roles',
						title: 'Roles',
						type: 'item',
						url: '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
						exact: true
					},
					{
						id: 'Permissions',
						title: 'Permissions',
						type: 'item',
						url: '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
						exact: true
					},
					{
						id: 'Users',
						title: 'Users',
						type: 'item',
						url: '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
						exact: true
					},

				
				
				]
			},
			{
				id: 'Agent_Conversation_History',
				title: 'Agent Conversation History',
				translate: 'AGENT HISTORY',
				type: 'item',
				icon: 'folder',
				url: '/apps/scrumboard'
			},
			{
				id: 'LOGS',
				title: 'LOGS',
				translate: 'LOGS',
				type: 'collapse',
				icon: 'shopping_cart',
				url: '/apps/todo',
				children: [
					{
						id: 'Activaty_Log',
						title: 'Activaty Log',
						type: 'item',
						url: '/apps/e-commerce/products',
						exact: true
					},
					
				
				
				]
			},
		
		]
	},
];

export default navigationConfig;
