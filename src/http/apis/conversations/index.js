class APIS {
	apis() {
		return {
			numbers: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/agent/conversations'
				// path: '/fetch/list/agent/customers'
			},
			historyNumbers: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/agent/history/conversations'
				// path: '/fetch/list/agent/customers'
			},
			historyChat: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/agent/history/chat'
			},
			inbound: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/backend/fetch/list/inbound_messages'
			},
			outbound: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/backend/fetch/list/wt_messages'
			},
			conversations: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/agent/get/chat'
				// path: '/agent/history/chat/:number/:last_closed'
				// path: '/messages/conversations/:number'
			},
			historyConversations: {
				headers: {
					'xt-user-token': null
				},
				method: 'get',
				path: '/agent/history/chat/:number/:last_closed'
				// path: '/agent/history/chat/:number/:last_closed'
				// path: '/messages/conversations/:number'
			},
			historyConversationsPagination: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/agent/history/chat'
				// path: '/agent/history/chat/:number/:start_date/:last_closed'
				// path: '/agent/history/chat/:number/:last_closed'
				// path: '/messages/conversations/:number'
			},
			send_text: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/messages/send/text'
			},
			send: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/messages/send/:type'
			},
			email: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/messages/send/email'
			},
			send_template: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/messages/send/template'
			},
			agent_list_a: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/list/agentlist'
			},
			agent_admin_list: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/list/agentadminlist'
			},
			agent_list: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/list/agents'
			},
			transfer: {
				headers: {
					'xt-user-token': null
				},
				method: 'put',
				path: '/forward/agent/:id'
			},
			end: {
				headers: {
					'xt-user-token': null
				},
				method: 'put',
				path: '/chat/update/:number'
			},
			reset_group_message_count: {
				headers: {
					'xt-user-token': null
				},
				method: 'get',
				path: '/messages/reset/group/:group_id'
			},
			reset_message_count: {
				headers: {
					'xt-user-token': null
				},
				method: 'get',
				path: '/messages/reset/:number'
			},
			block: {
				headers: {
					'xt-user-token': null
				},
				method: 'put',
				path: '/backend/toggle/customer/block/:number'
			},
			agents_list: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/list/agents'
			},
			agents_list2: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/list/agentlist'
			},
			agents_customer_list: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/backend/fetch/agent/customers'
			},
			agents_customer_conversations: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/agent/conversations/ongoing'
				// path: '/agent/conversations/:number'
			},
			unblock: {
				headers: {
					'xt-user-token': null
				},
				method: 'put',
				path: '/backend/toggle/customer/unblock/:number'
			},
			allAgents: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/fetch/customers-agents'
			}
		};
	}
}

export default new APIS();
