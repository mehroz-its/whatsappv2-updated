import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import GetAppIcon from '@material-ui/icons/GetApp';
import DescriptionIcon from '@material-ui/icons/Description';
import moment from 'moment/moment';


const DocumentMessageType = function (props) {
    const { message, index, classes } = props;

    const { attachments } = message;

    const [documentPath, setDocumentPath] = React.useState('');
    const [filename, setFilename] = React.useState('');
    const [caption, setCaption] = React.useState('');
    const [mimeType, SetMimeType] = React.useState('');

    React.useEffect(() => {

        if (attachments && attachments !== null) {
            
            console.log("DocumentMessageType attachments : " ,  attachments)
            attachments.forEach((attribute) => {
                if (attribute.attribute_name === 'url') {
                    setDocumentPath(attribute.attribute_value);
                }

                if (attribute.attribute_name === 'filename') {
                    setFilename(`${attribute.attribute_value.slice(0, 20)}...`);
                }
                if (attribute.attribute_name === 'caption') {
                    setCaption(`${attribute.attribute_value}`);
                }
                if (attribute.attribute_name === "mime_type") {
                    SetMimeType(`${attribute.attribute_value}`);
                }
            });
        }
    }, []);

    return (
        <div>
            <Card >
                <div style={{ width: '100%' }}>
                    <CardContent style={{ padding: '10px 10px' }} >
                        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'whitesmoke', }}>
                            <CardMedia style={{ width: '20%', padding: 0 }}>
                                {mimeType === "application/pdf" ?
                                    <PictureAsPdfIcon style={{ width: 50, fontSize: 40, padding: '14px 0', color: 'red' }} />
                                    :  <DescriptionIcon style={{ width: 50, fontSize: 40, padding: '14px 0', color: 'Blue' }} />
                                }
                            </CardMedia>
                            <div style={{ width: '80%', padding: 0, alignSelf: 'center' }}>
                                <Typography variant="subtitle1" style={{ padding: 0 }} >
                                    {filename}
                                </Typography>
                            </div>
                            <CardMedia style={{ width: '20%', padding: '10px 0' }}>
                                <a href={documentPath} target={'_blank'}><GetAppIcon style={{ width: 50, fontSize: 40, padding: 5, color: 'grey', marginTop: '-2px' }} /></a>
                            </CardMedia>

                        </div>
                        <p style={{ width: "100%", margin: '5px 5px 5px 7px' }}>{caption}</p>
                        <p style={{ width: "100%", margin: '10px', fontSize: '10px' }}>{moment(message.dt).format('MMM Do YY, h:mm a')}</p>


                    </CardContent>
                </div>

            </Card>
        </div>
    )
};

export default DocumentMessageType;