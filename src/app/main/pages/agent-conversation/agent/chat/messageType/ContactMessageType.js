import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';

const TextMessageType = function (props) {
    const { message, index } = props;

    return (
        <ListItemText key={`message_list_item_text_${index}`} className={message.type == 'inbound' ? 'messageRecieve' : 'messageSent'} primary={message.message_body}></ListItemText>
    )
};

export default TextMessageType;