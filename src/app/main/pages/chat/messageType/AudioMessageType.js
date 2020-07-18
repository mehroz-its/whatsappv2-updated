import React from 'react';
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import AudioPlayer from 'material-ui-audio-player';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const VoiceMessageType = function (props) {

    const useStyles = makeStyles((theme) => {
        return {
            root: {
                [theme.breakpoints.down('sm')]: {
                    width: '150%',
                },
            },
            loopIcon: {
                color: '#3f51b5',
                '&.selected': {
                    color: '#0921a9',
                },
                '&:hover': {
                    color: '#f50057',
                },
                [theme.breakpoints.down('sm')]: {
                    display: 'none',
                },
            },
            playIcon: {
                color: '#f50057',
                marginTop:'-5%',
                '&:hover': {
                    color: '#ff4081',
                    marginTop:'-5%'
                },
            },
            replayIcon: {
                color: '#f50057',
            },
            pauseIcon: {
                color: '#f50057',
                marginTop:'-5%'
            },
            volumeIcon: {
                display: 'none',
                marginTop:'-5%'
            },
            volumeSlider: {
                display: 'inline'
            },
            progressTime: {
                color: 'rgba(0, 0, 0, 0.54)',


                fontSize: 15,
                fontWeight: 'bold'
            },
            mainSlider: {
                color: '#3f51b5',
                
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
    console.log(props, 'prpps');

    const { classes, message } = props;

    const { attachments } = message;

    const [audioPath, setAudioPath] = React.useState('');
    const [filename, setFilename] = React.useState('');
    const [fileType, setFileType] = React.useState('');
    const [audio, setAudio] = React.useState('');
    const muiTheme = createMuiTheme({});
    const [play, setAudioState] = React.useState(false);

    const audioPlayHandler = () => {
        console.log(audio)
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
            <Card className={classes.root} style={{padding:10}}>
                <ThemeProvider theme={muiTheme}>
                    <AudioPlayer
                        width="150%"
                        src={audioPath}
                        useStyles={useStyles}
                        spacing="2"
                        download
                    />
                </ThemeProvider>
            </Card>

        </div>
    )
};

export default VoiceMessageType;    