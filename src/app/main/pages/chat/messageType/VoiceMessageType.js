import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import GetAppIcon from '@material-ui/icons/GetApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MicIcon from '@material-ui/icons/Mic'

const VoiceMessageType = function (props) {
    console.log(props,'prpps');
    
    const { classes, message, index } = props;

    const { attachments } = message;

    const [audioPath, setAudioPath] = React.useState('');
    const [filename, setFilename] = React.useState('');
    const [fileType, setFileType] = React.useState('');
    const [audio, setAudio] = React.useState('');
    const [play, setAudioState] = React.useState(false);

    const audioPlayHandler = () => {
        if (play) {
            setAudioState(false);
            audio.pause();
        } else {
            setAudioState(true);
            audio.play();
        }
    };

    React.useEffect(() => {
        if (attachments && attachments !== null) {
            attachments.forEach((attribute) => {
                if (attribute.attribute_name === 'url') {
                    setAudioPath(attribute.attribute_value);
                    setAudio(new Audio(attribute.attribute_value));
                }

                if (attribute.attribute_name === 'filename') {
                    setFilename(`${attribute.attribute_value.slice(0, 25)}...`);
                }

                if (attribute.attribute_name === 'mime_type') {
                    setFileType(`Format: ${attribute.attribute_value.split('/')[1]}`);
                }
            });
        }
    }, []);

    return (
        <div className={message.type == 'inbound' ? 'messageRecieve' : 'messageSent'}>
            <Card className={classes.root}>
                <div>
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1" >
                            {/* {filename} */}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {/* {fileType} */}
                        </Typography>
                    </CardContent>
                  
                 
                    <div>
                        <AccountCircleIcon style={{width:40,height:40,marginTop:'8px'}}/>
                        <MicIcon style={{position:'absolute',color:'#72bcd4',top:48,width:20,left:51,marginTop:'3px'}} />
                        <IconButton onClick={audioPlayHandler} aria-label="play/pause" style={{marginTop:'-30px'}}>
                            {!play && <PlayArrowIcon />}
                            {play && <PauseIcon  />}
                        </IconButton>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'flex-end',flex:1}}>
                <a href={audioPath} target={'_blank'}><GetAppIcon style={{ width: 22, fontSize: 40, color: 'grey',marginTop:'20px' }} /></a>
                </div>
            </Card>
        </div>
    )
};

export default VoiceMessageType;