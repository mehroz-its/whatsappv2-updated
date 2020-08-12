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
import MessageStateResolver from '../../../../chat/messageType/MessageStateResolver'


const DocumentMessageType = function (props) {
    const { message, index, classes } = props;

    const { attachments } = message;

    const [documentPath, setDocumentPath] = React.useState('');
    const [filename, setFilename] = React.useState('');
    const [caption, setCaption] = React.useState('');
    const [mimeType, SetMimeType] = React.useState('');

    React.useEffect(() => {

        if (attachments && attachments !== null) {

            // console.log("DocumentMessageType attachments : " ,  attachments)
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
    console.log(message, 'messagemessage')
    return (
        <div>
            <Card >
                <div style={{ width: '100%' }}>
                    <CardContent style={{ padding: '10px 10px' }} >
                        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'whitesmoke', }}>

                            <CardMedia>
                                {mimeType === "application/pdf" ?
                                    <PictureAsPdfIcon style={{ marginRight: '2%', marginTop: '2%', width: 30, height: 30, fontSize: 40, color: 'red' }} />
                                    : <DescriptionIcon style={{ width: 30, height: 30, fontSize: 40, color: 'Blue' }} />
                                }
                            </CardMedia>
                            {/* <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <span style={{textAlign:'center'}}>{caption}</span>
                            </div> */}
                            <div style={{ width: '80%', marginLeft: '2%', padding: 0, alignSelf: 'center' }}>
                                <Typography variant="subtitle1" style={{ padding: 0 }} >
                                    {filename}
                                </Typography>
                            </div>
                            {/* <CardMedia style={{ width: '20%', padding: '10px 0' }}>
                                <a href={documentPath} target={'_blank'}><GetAppIcon style={{ width: 50, fontSize: 40, padding: 5, color: 'grey', marginTop: '-2px' }} /></a>
                            </CardMedia> */}
                            <span>
                                <a href={documentPath} target={'_blank'}>
                                    <GetAppIcon style={{ textAlign: 'center', height: 25, width: 25, marginTop: 5 }} />
                                </a>
                            </span>
                        </div>
                        <p style={{ fontWeight: 'bold', marginLeft: '1%', marginTop: '2%' }}>{caption}</p>                    
                        <p id="attachmentDate" style={{ width: "100%", margin: '10px', marginLeft: '1%', fontSize: '10px' }}>{moment(message.dt).format('MMM Do YY, h:mm a')} {message.type === "outbound" ? MessageStateResolver.resolve(message.status) : null}</p>


                    </CardContent>
                </div>

            </Card>
        </div>
    )
};

export default DocumentMessageType;