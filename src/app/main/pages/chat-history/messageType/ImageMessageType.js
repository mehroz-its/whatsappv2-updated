import React from 'react';
import { Card } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import moment from 'moment/moment';
import MessageStateResolver from '../../chat/messageType/MessageStateResolver'



const ImageMessageType = function (props) {
    const { message, index } = props;

    const { attachments } = message;

    const [imageSrc, setImageSrc] = React.useState(`/images/image_placeholder.png`);
    const [imageCaption, setImageCaption] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        if (attachments && attachments !== null) {
            attachments.forEach((attribute) => {
                if (attribute.attribute_name === 'url') {
                    setImageSrc(attribute.attribute_value);
                }

                if (attribute.attribute_name === 'caption') {
                    setImageCaption(attribute.attribute_value);
                }

            });
        }
    }, []);

    return (
        <div>
            <Card style={{ width: '350px', height: 'auto' }} onClick={() => setIsOpen(true)} className={message.type == 'inbound' ? 'messageRecieve' : 'messageSent'}>
                <LazyLoadImage
                    key={`message_list_item_type_image_${index}`}
                    alt={imageCaption}
                    effect="blur"
                    src={imageSrc}
                    style={{ width: '100%', objectFit: 'cover' }}
                />
                {imageCaption !== '' ?   <p style={{ width: "100%", margin: '10px' }}>{imageCaption}</p> : null}
                <p style={{ width: "100%", margin: '10px' ,fontSize:'10px'}}>{moment(message.dt).format('MMM Do YY, h:mm a')}{message.type === "outbound" ? MessageStateResolver.resolve(message.status) : null}</p>
            </Card>
            {isOpen && (
                <Lightbox mainSrc={imageSrc} onCloseRequest={() => setIsOpen(false)} />
            )}
        </div >
    )
};

export default ImageMessageType;