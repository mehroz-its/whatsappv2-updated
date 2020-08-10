import React from 'react';
import Card from '@material-ui/core/Card';
import Iframe from 'react-iframe';

const LocationMessageType = function (props) {
    const { message, index } = props;

    const { attachments } = message;

    const [latitude, setMapLatitude] = React.useState('');
    const [longitude, setMapLongitude] = React.useState('');

    React.useEffect(() => {
        if (attachments && attachments !== null) {
            attachments.forEach((attribute) => {
                if (attribute.attribute_name === 'latitude') {
                    setMapLatitude(attribute.attribute_value);
                }
                
                if (attribute.attribute_name === 'longitude') {
                    setMapLongitude(attribute.attribute_value);
                }
            });
        }
    }, []);
    
    return (
        <Card style={{width: '350px', height: '250px'}} className={message.type == 'inbound' ? 'messageRecieve' : 'messageSent'}>
            <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.3205731008234!2d74.28067401450447!3d31.51535418137123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903abe07ca681%3A0x74f82a9e219f19c8!2sim%20sorry%20its%20wrong!5e0!3m2!1sen!2s!4v1582719141988!5m2!1sen!2s"
                width="100%"
                height="100%"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
                frameBorder="0"
            />
        </Card>
    )
};

export default LocationMessageType;