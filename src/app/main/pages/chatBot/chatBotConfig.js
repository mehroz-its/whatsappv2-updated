import React from 'react';
const chatBotConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/chatbot',
            component: React.lazy(() => import('./ChatBot.js'))
        }
    ]
};

export default chatBotConfig;