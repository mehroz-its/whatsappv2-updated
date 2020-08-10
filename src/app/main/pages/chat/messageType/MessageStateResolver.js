import React from "react";

class MessageStateResolver {

    constructor() {
        this.states = {
            2: 'Queued',
            3: 'Sent',
            4: 'Delivered',
            5: 'Dispatched',
            6: 'Read',
            7: 'Failed',
        }
    }

    resolve(state) {
        if (!this.states[state]) return ('Unknown');

        const _state = this.states[state];

        return (_state);
    }
}

export default new MessageStateResolver;