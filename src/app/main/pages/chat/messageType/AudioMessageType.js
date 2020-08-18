import React from 'react';
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import AudioPlayer from 'material-ui-audio-player';
import { createMuiTheme, useTheme,ThemeProvider } from '@material-ui/core';
import { height } from '@amcharts/amcharts4/.internal/core/utils/Utils';

const VoiceMessageType = function (props) {

    const useStyles = makeStyles((theme) => {
        return {
         
            root: {
              
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    height:'70%'
                },
          border:0,borderColor:'black'
            },
            loopIcon: {
                color: '#3f51b5',
                width:20,
                height:20,
                
                '&.selected': {
                    color: '#0921a9',
                    width:20,
                    height:20
                },
                
                '&:hover': {
                    color: '#f50057',
                    width:20,
                    height:20
                },
                [theme.breakpoints.down('sm')]: {
                    display: 'none',
                    width:20,
                    height:20
                },
            },
            playIcon: {
                color: '#f50057',
                marginTop:'-5%',
                '&:hover': {
                    color: '#ff4081',
                    marginTop:'-5%',
                    width:20,
                    height:20
                },
                width:20,
                height:20
            },
            replayIcon: {
                color: '#f50057',
                width:20,
                    height:20
            },
            pauseIcon: {
                color: '#f50057',
                marginTop:'-5%',
                width:20,
                height:20
            },
            download:{
                width:20,
                height:20
            },
            downloadsIcon:{
                width:20,
                height:20
            },
//             downloadsItemLink:{
//                 width:20,
//                 height:20
//             },
// downloadsItemText:{  width:20,
//     height:20},
// downloadsContainer:{  width:20,
//     height:20},
            volumeIcon: {
                display: 'none',
                marginTop:'-5%'
            },
            volumeSlider: {
                display: 'none'
            },
            progressTime: {
                color: 'rgba(0, 0, 0, 0.54)',


                fontSize: 15,
                marginTop:'9px',
                fontWeight: 'bold'
            },
            mainSlider: {
                color: '#3f51b5',
                marginTop:'9px',
                '& .MuiSlider-rail': {
                    color: '#7986cb',
                  
                },
                '& .MuiSlider-track': {
                    color: '#3f51b5',
                  
                },
                '& .MuiSlider-thumb': {
                    color: '#303f9f',
                

                },
            },
        };
    });
    // console.log(props, 'prpps');

    const { classes, message } = props;

    const { attachments } = message;

    const [audioPath, setAudioPath] = React.useState('');
    const [filename, setFilename] = React.useState('');
    const [fileType, setFileType] = React.useState('');
    const [audio, setAudio] = React.useState('');
    const muiTheme = {
        height:500,
        width:500
    }
    const [play, setAudioState] = React.useState(false);

    const audioPlayHandler = () => {
        // console.log(audio)
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
            <Card className={classes.root} style={{paddingLeft:'5px',height:'70%',marginLeft:'-12px'}}>
              
                    <AudioPlayer
                        // width="100%"
                        // height
                        muteIcon
                        src={audioPath}
                        useStyles={useStyles}
                        spacing="2"
                        download={true}
                        
                    />
               
            </Card>

        </div>
    )
};

export default VoiceMessageType;    