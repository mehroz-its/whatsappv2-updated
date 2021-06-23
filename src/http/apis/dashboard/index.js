class APIS {
	apis() {
		return {
			listing: {
				headers: {
					'xt-user-token': null
				},
				method: 'get',
				path: '/info/boxes'
			},
			messagestate: {
				headers: {
					'xt-user-token': null
				},
				method: 'get',
				path: '/message/stats'
			},

			chatHourly: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/chat/hourly'
			}
		};
	}
}

export default new APIS();
