import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconResolver from '../../../layout/icons/IconResolver';
import CoreHttpHandler from '../../../http/services/CoreHttpHandler';
import Alert from '@material-ui/lab/Alert';

import AudioAnalyser from "react-audio-analyser"
import attachments from '../../../http/apis/attachments';

const AttachmentDialog = function (props) {
    const { dialogType } = props;

    const [disableUpload, setUploadButtonState] = React.useState(false);
    const [urlDisabled, setUrlTextState] = React.useState(false);
    const [uploadedFilePath, setUploadedFilePath] = React.useState('');
    const [attachmentCaption, setAttachmentCaption] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState(null);
    const [audioSrc, setAudioSrc] = React.useState(null);
    const [fileType, setFileType] = React.useState("*");
    const [permissionState, setPermissionState] = React.useState(true);

    const dialogInputHandler = e => {
        if (e.target.name === 'attachment') {
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
                    setUploadedFilePath(response.data.data.upload);

                    setLoading(false);

                    props.onchange({
                        url: response.data.data.upload,
                        attrs: {
                            filename: _name,
                            mime_type,
                        },
                    });

                }, (response) => {

                });
            } else setUrlTextState(false);
        } else if (e.target.name === 'url') {
            if (e.target.value.length > 0) {
                setUploadButtonState(true);
                setUploadedFilePath(e.target.value);
            } else setUploadButtonState(false)
        } else if (e.target.name === 'caption') {
            setAttachmentCaption(e.target.value);
        }

        if (e.target.name !== 'attachment') {
            const obj = {};

            obj[e.target.name] = e.target.value;

            props.onchange(obj);
        }
    };

    const getPermission = () => {
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function (stream) {
                    setPermissionState(true)
                    console.log('You let me use your mic!')
                    console.log(permissionState)
                })
                .catch(function (err) {
                    setPermissionState(false)
                    console.log('No mic for you!')
                    console.log(permissionState)

                });
        } else alert('Unable to load audio plugins!, Please check your connection');

    }
    React.useEffect(() => {
        getPermission()
        if (dialogType === "audio") {
            setFileType("audio/*")
        }
        else if (dialogType === "video") {
            setFileType("video/*")
        }
        else if (dialogType === "image") {
            setFileType("image/*")
        }
        else if (dialogType === "document") {
            setFileType("application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        }
        else {
            setFileType("*")
        }
    }, [])

    const controlAudio = (status) => {
        if (status === 'recording') {
            setUploadButtonState(true)
        } else {
            setUploadButtonState(false);
        }

        setStatus(status)
    }

    const changeScheme = (e) => {
        SetAudioType(e.target.value)

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

            const audioFile = new File([blob], `${new Date().getTime()}`, { type: blob.type })

            const _data = new FormData();

            const mime_type = blob.type;

            _data.append('file', audioFile);

            CoreHttpHandler.request('content', 'upload', {
                params: _data
            }, (response) => {
                fileAttributesHandler({
                    filename: `${audioFile.name}.${audioFile.type.split('/')[1]}`,
                    mime_type,
                })

                setUploadedFilePath(response.data.data.upload);

                setLoading(false);

                props.onchange({
                    value: response.data.data.upload,
                    key: 'url',
                });
            }, (response) => {

            });
        }
    }
    // React.useEffect(() => {


    // });
    return (
        <DialogContent>
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
                                                    <Button onClick={() => controlAudio("recording")} id='content-record-button' variant="contained" color="secondary" component="span" fullWidth>
                                                        {IconResolver.resolve("mic")}
                                                     Record
                                                       </Button>
                                                }
                                                {status === "recording" &&
                                                    <Button onClick={() => controlAudio("paused")} id='content-record-button' variant="contained" color="secondary" component="span" fullWidth>
                                                        {IconResolver.resolve("mic")}
                                            paused
                                    </Button>}
                                            </AudioAnalyser>  </Grid>
                                        <Grid item xs={4}>
                                            <Button onClick={() => controlAudio("inactive")} id='content-record-button' variant="contained" color="secondary" component="span" fullWidth>
                                                {IconResolver.resolve("mic")}
                                            Stop
                                    </Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <label htmlFor="contained-button-file">

                                                <Button disabled={disableUpload} id='content-upload-button' variant="contained" color="secondary" component="span" fullWidth>
                                                    Upload
                                            </Button>
                                            </label>
                                        </Grid>
                                    </Grid> : <div className="text-align-center"><CircularProgress /></div>
                                }</div> : null
                        }
                    </Grid>
                    {dialogType !== 'audio' ?
                        <Grid container spacing={1}>
                            {!loading ?
                                <Grid item xs={12}>
                                    <label htmlFor="contained-button-file">

                                        <Button disabled={disableUpload} id='content-upload-button' variant="contained" color="secondary" component="span" fullWidth>
                                            Upload
                                            </Button>
                                    </label>
                                </Grid>
                                : <div className="text-align-center"><CircularProgress /></div>
                            }
                        </Grid>
                        : null}
                    <Grid item xs={12} style={{ marginTop: 10 }}>
                        <TextField onChange={dialogInputHandler} value={attachmentCaption} name={'caption'} id="outlined-basic-email" autoFocus label="Caption" variant="outlined" fullWidth autoComplete="off" />
                    </Grid>
                </Grid>
            }
        </DialogContent>
    );
};

export default AttachmentDialog;