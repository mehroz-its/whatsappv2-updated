class APIS {
	apis() {
		return {
			survey: {
				headers: {
					'xt-user-token': null
				},
				method: 'post',
				path: '/customer/survey'
			}
		};
	}
}

export default new APIS();
