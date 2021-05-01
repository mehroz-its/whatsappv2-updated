class APIS {
	apis() {
		return {
			// ===== chat report  ====
			conversation: {
				headers: {
					'xt-user-token': null
				},
				method: 'get',
				path: '/conversation/count'
			}
		};
	}
}

export default new APIS();
