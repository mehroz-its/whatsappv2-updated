class APIS {
    apis() {
        return {
            // ===== chat report  ====
            chatChartInOutCC: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/chat/stats'
            },
            chatChartEngagments: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/engagement/stats'
            },
            chatReport: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/chat/report'
            },

            //         ======== Agent =========
            agentChart: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/agent/conversation'
            },
            agentReport: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/agent/report'
            },

            //      ======  Campaign    =======

            campaignChart: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/campaign/stats'
            },
            campaignReport: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/campaign/records'
            },

            // ====== Broadcast  =======

            broadcastChart: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: 'campaign/stats'
            },
            broadcastreport: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: 'campaign/report'
            },
            autoreply_report: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/autoreplies/report'
            }
        }
    }
}

export default new APIS;