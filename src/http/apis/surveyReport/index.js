class APIS {
	apis() {
		return {
			survey: {
				headers: {
					'xt-user-token': null
				},
				method: 'get',
				path: '/customer/survey'
			}
		};
	}
}

export default new APIS();
