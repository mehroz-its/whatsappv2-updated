import React from "react";

class MessageStateResolver {

    constructor() {
        this.states = {
            "sinch":{
                2: 'Queued',
                3: 'Sent',
                4: 'Delivered',
                5: 'Dispatched',
                6: 'Read',
                7: 'Failed',
            },
            "mfms":{
                2: 'Queued',
                3: 'Sent',
                4: 'Delivered',
                5: 'Dispatched',
                6: 'Read',
                7: 'Failed',
                8: 'Undelivered',
                9: 'Invalid Template',
                10: 'Delayed',
                11: 'Cancelled',
            },
        }
    }

    resolve(state,mfms) {
        let status = this.states["sinch"]

        if(mfms){
            status = this.states["mfms"]
        }
        
        if (!status[state]) return ('Unknown');

        const _state = status[state];

        return (` - ${_state}`);
    }
}

export default new MessageStateResolver;