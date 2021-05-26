class APIS {
	apis() {
		return {
			get: {
				headers: {
					'xt-user-token': null
				},
				method: 'get',
				path: '/client/stats/:client_id'
			},
			postStats: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/client/stats'
			},
			info_client: {
				headers: {
					'xt-user-token': null
				},
				method: 'get',
				path: '/client/info/:client_id'
			}
		};
	}
}

export default new APIS();
