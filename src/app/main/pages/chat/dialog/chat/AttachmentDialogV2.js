import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconResolver from '../../../../../../icons/IconResolver';
import CoreHttpHandler from '../../../../../../http/services/CoreHttpHandler';
import Alert from '@material-ui/lab/Alert';

import AudioAnalyser from "react-audio-analyser"

const AttachmentDialogV2 = function (props) {
    const { onDialogPropsChange, data } = props;
    console.log(props,'AttachmentDialogV2AttachmentDialogV2')

    const { dialogType, attachment } = data;

    const [uploadedFilePath, setUploadedFilePath] = React.useState(attachment.url);
    const [attachmentCaption, setAttachmentCaption] = React.useState(attachment.caption);

    const [disableUpload, setUploadButtonState] = React.useState(false);
    const [urlDisabled, setUrlTextState] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [status, setStatus] = React.useState(null);

    const [audioSrc, setAudioSrc] = React.useState(null);

    const [fileType, setFileType] = React.useState("*");

    const [permissionState, setPermissionState] = React.useState(true);

    const dialogInputHandler = event => {
        let attributes = null;

        if (event.target.name === 'attachment') {
            setLoading(true);

            if (event.target.files.length > 0) {
                setUrlTextState(true);

                const _data = new FormData();

                let _name = event.target.files[0].name;

                const mime_type = event.target.files[0].type;

                _name = _name.replace(/\s/g, '');

                _data.append('file', event.target.files[0], `${new Date().getTime()}_${_name}`);

                CoreHttpHandler.request('content', 'upload', {
                    params: _data
                }, (response) => {

                    setUploadedFilePath(response.data.data.link);

                    setLoading(false);

                    onDialogPropsChange({
                        url: response.data.data.link,
                        attributes: {
                            filename: _name,
                            mime_type,
                        },
                    });

                }, (response) => {

                });
            } else setUrlTextState(false);

            return;
        } else if (event.target.name === 'url') {
            if (event.target.value.length > 0) {
                setUploadButtonState(true);
                setUploadedFilePath(event.target.value);
            } else setUploadButtonState(false)
        } else if (event.target.name === 'caption') {
            setAttachmentCaption(event.target.value);
        }

        const obj = {};

        obj[event.target.name] = event.target.value;

        onDialogPropsChange(obj);
    };

    React.useEffect(() => {
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function (stream) {
                    setPermissionState(true)
                })
                .catch(function (err) {
                    setPermissionState(false)
                });

            if (dialogType === "audio") {
                setFileType("audio/*")
            } else if (dialogType === "video") {
                setFileType("video/*")
            } else if (dialogType === "image") {
                setFileType("image/*")
            } else if (dialogType === "document") {
                setFileType("application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")
            } else {
                setFileType("*")
            }
        } else alert('Unable to load audio plugins!, Please check your connection');
    }, []);

    const controlAudio = (status) => {
        if (status === 'recording') {
            setUploadButtonState(true)
        } else {
            setUploadButtonState(false);
        }

        setStatus(status)
    }

    const audioProps = {
        audioType: "audio/mp3", // Temporarily only supported audio/wav, default audio/webm
        status, // Triggering component updates by changing status
        audioSrc,
        startCallback: (e) => { },
        pauseCallback: (e) => { },
        stopCallback: (e) => {
            setLoading(true);

            setAudioSrc(window.URL.createObjectURL(e));

            const blob = e;

            const audioFile = new File([blob], `Audio_${new Date().getTime()}.${blob.type.split('/')[1]}`, { type: blob.type })

            const _data = new FormData();

            const mime_type = blob.type;

            _data.append('file', audioFile);

            CoreHttpHandler.request('content', 'upload', {
                params: _data
            }, (response) => {

                setUploadedFilePath(response.data.data.link);

                setLoading(false);

                onDialogPropsChange({
                    url: response.data.data.link,
                    attributes: {
                        filename: `${audioFile.name}`,
                        mime_type,
                    },
                });

            }, (response) => {

            });
        }
    }

    return (
        <DialogContent style={{marginTop:'10px'}}>
            {/* <CircularProgress /> */}
            {dialogType === 'location' &&
                <p>Location Dialog</p>
            }
            {dialogType !== 'location' &&
                <Grid container spacing={1}>
                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                        <TextField
                            id="outlined-basic-email"
                            name={'url'}
                            label="Url"
                            variant="outlined"
                            fullWidth
                            onChange={dialogInputHandler}
                            disabled={urlDisabled}
                            value={uploadedFilePath}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            id="contained-button-file"
                            type="file"
                            accept={fileType}
                            style={{ display: 'none' }}
                            name={'attachment'}
                            onChange={dialogInputHandler}
                        />
                        {dialogType === 'audio' && !permissionState &&
                            <Grid container spacing={1} style={{ display: 'flex' }}>
                                <Alert severity="error">Kindly enable microphone permission from settings for recording</Alert>
                            </Grid>
                        }
                        {dialogType === 'audio' && permissionState ?
                            <div>
                                {!loading ?
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <AudioAnalyser {...audioProps}>
                                                {status !== "recording" &&
                                                    <Button onClick={() => controlAudio("recording")} id='content-record-button' variant="contained" color="primary" component="span" style={{width:'99%',marginLeft:'2px'}}>
                                                        {IconResolver.resolve("mic")}
                                                     Record
                                                       </Button>
                                                }
                                                {status === "recording" &&
                                                    <Button onClick={() => controlAudio("paused")} id='content-record-button' variant="contained" color="primary" component="span" style={{width:'99%',marginLeft:'2px'}}>
                                                        {IconResolver.resolve("mic")}
                                            paused
                                         </Button>}
                                            </AudioAnalyser> 
                                             </Grid>
                                        <Grid item xs={4}>
                                        {status === "recording" &&
                                            <Button onClick={() => controlAudio("inactive")} id='content-record-button' variant="contained" color="primary" component="span" style={{width:'99%',marginLeft:'2px'}}>
                                                {IconResolver.resolve("mic")}
                                            Stop
                                    </Button>}
                                        </Grid>
                                        <Grid item xs={4}>
                                            <label htmlFor="contained-button-file">
                                                <Button  disabled={disableUpload} style={{paddingleft:'2px'}} id='content-upload-button' variant="contained"  color="primary" component="span" style={{width:'99%',marginLeft:'2px'}}>
                                                    Upload
                                            </Button>
                                            </label>
                                        </Grid>
                                    </Grid> : <div style={{marginLeft:'42%'}} className="text-align-center"><CircularProgress  style={{marginLeft:'50%'}}/></div>
                                }</div> : null
                        }
                    </Grid>
                    {dialogType !== 'audio' ?
                        <Grid container spacing={1}>
                            {!loading ?
                                <Grid item xs={12}>
                                    <label htmlFor="contained-button-file">

                                        <Button disabled={disableUpload} style={{paddingleft:'2px'}} id='content-upload-button' variant="contained" color="primary" component="span" style={{width:'99%',marginLeft:'2px'}}>
                                            Upload
                                            </Button>
                                    </label>
                                </Grid>
                                : <div className="text-align-center" style={{marginLeft:'42%'}}><CircularProgress style={{marginLeft:'50%'}} /></div>
                            }
                        </Grid>
                        : null}
                          {dialogType !== 'audio' ?
                    <Grid item xs={12} style={{ marginTop: 10 }}>
                        <TextField onChange={dialogInputHandler} value={attachmentCaption} name={'caption'} id="outlined-basic-email" autoFocus label="Caption" variant="outlined" fullWidth autoComplete="off" />
                    </Grid> : null}
                </Grid>
            }
        </DialogContent>
    );
};

export default AttachmentDialogV2;