import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReactPlayer from 'react-player'
import { Card } from '@material-ui/core';

const VideoMessageType = function (props) {
    const { message, index, http } = props;

    const { attachments } = message;

    const [video, setVideo] = React.useState('https://retreat-guru-static.imgix.net/placeholder-video.png');
    const [caption, setCaption] = React.useState('');
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        if (attachments && attachments !== null) {
            attachments.forEach((attribute) => {
                if (attribute.attribute_name === 'url') {
                    setVideo(attribute.attribute_value);
                }
                if (attribute.attribute_name === 'caption') {
                    setCaption(`${attribute.attribute_value}`);
                }
            });

            setDisplay(true);
        }
    }, []);

    return (
        <div>
        {display && <Card style={{width: '350px', height: 'auto'}} className={message.type == 'inbound' ? 'messageRecieve' : 'messageSent'}>
            <div style={{ position: "relative", display: 'inline-block' }}>
                <ReactPlayer controls url={video} height="250px" width="350px" />
                <p style={{ width: "100%", margin: '10px 5px 5px 0px' }}>{caption}</p>
            </div>
        </Card>}
        </div>
    )
};

export default VideoMessageType;