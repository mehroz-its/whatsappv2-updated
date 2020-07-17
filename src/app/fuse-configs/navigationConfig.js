import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

// let user_token = localStorage.getItem('user_token')
// if (user_token !== null) {
// 	var user_routes = []
// 	let userAcl = localStorage.getItem('user_acl');
// 	let _routes = JSON.parse(userAcl)
// 	_routes = Object.keys(_routes)
// 	_routes.map((i, v) => {
// 		let val = i.split('FRONT:')
// 		user_routes.push(val[1])
// 	})

// 	console.log(user_routes)
// } else {
// 	console.log("user_token null")

// }


const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'ADMIN',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboards',
				title: 'Intelligence',
				translate: 'Intelligence',
				type: 'item',
				icon: 'dashboard',
				url: '/dashboard',

			},
			{
				id: 'Chat',
				title: 'Chat',
				translate: 'Chat',
				type: 'collapse',
				icon: 'chat',
				// url: '/apps/groups/group',
				children: [
					{
						id: 'Conversation',
						title: 'Conversation',
						translate: 'Conversation',
						type: 'item',
						url: '/apps/chat',

					},
					{
						id: 'History',
						title: 'History',
						translate: 'History',
						type: 'item',
						url: '/apps/history',

					},

				]
			},
			{
				id: 'Template',
				title: 'Template',
				translate: 'Template',
				type: 'collapse',
				icon: 'chrome_reader_mode',
				// url: '/apps/groups/group',
				children: [
					{
						id: 'Campaigns',
						title: 'Campaigns',
						translate: 'Campaigns',
						type: 'item',
						url: '/apps/campaign',
						// badge: {
						// 	title: 25,
						// 	bg: '#F44336',
						// 	fg: '#FFFFFF'
						// }
					},
					{
						id: 'Template List',
						title: 'Template List',
						type: 'item',
						translate: 'Template List',
						url: '/apps/whatsapp-template',
						exact: true
					},

				]
			},
			{
				id: 'Contact Book',
				title: 'Contact Book',
				translate: 'CONTACT BOOK',
				type: 'collapse',
				icon: 'contact_phone',
				// url: '/apps/groups/group',
				children: [
					{
						id: 'Contacts',
						title: 'Contacts',
						translate: 'Contacts',
						type: 'item',
						exact: true,
						url: '/apps/contacts/all',

					},
					{
						id: 'Contact Book',
						title: 'Contact Groups',
						translate: 'Contact Groups',
						type: 'item',
						exact: true,
						url: '/apps/contact-groups',
						children: [

						]
					},
					// {
					// 	id: 'Block List',
					// 	title: 'Block List ',
					// 	translate: 'Block List',
					// 	type: 'item',
					// 	exact: true,
					// 	url: '/apps/block-list',

					// }

				]
			},

			{
				id: 'Gallery',
				title: 'Gallery',
				translate: 'GALLERY',
				type: 'collapse',
				icon: 'apps',
				children: [
					{
						id: 'Canned Messages',
						title: 'Canned Messages',
						type: 'item',
						url: '/apps/canned-messages',
						exact: true,
					}


				]
			},
			{
				id: 'REPORTS',
				title: 'REPORTS',
				translate: 'REPORTS',
				type: 'collapse',
				icon: 'assessment',
				children: [
					{
						id: 'Chat',
						title: 'Chat',
						type: 'item',
						url: '/report/chat',
						exact: true
					},
					{
						id: 'Agent',
						title: 'Agent',
						type: 'item',
						url: '/report/agent-report',
						exact: true
					},
				

				]
			},
			{
				id: 'SETTINGS',
				title: 'SETTINGS',
				translate: 'SETTINGS',
				type: 'collapse',
				icon: 'settings',
				children: [
					{
						id: 'Countries',
						title: 'Countries',
						type: 'item',
						url: '/apps/countries',
						exact: true
					},
					{
						id: 'Cities',
						title: 'Cities',
						type: 'item',
						url: '/apps/cities',
						exact: true
					},
					{
						id: 'Roles',
						title: 'Roles',
						type: 'item',
						url: '/apps/roles',
						exact: true
					},
					{
						id: 'Permissions',
						title: 'Permissions',
						type: 'item',
						url: '/apps/permissions',
						exact: true
					},
					{
						id: 'Users',
						title: 'Users',
						type: 'item',
						url: '/apps/users',
						exact: true
					},



				]
			}

		]
	},
];

export default navigationConfig;
