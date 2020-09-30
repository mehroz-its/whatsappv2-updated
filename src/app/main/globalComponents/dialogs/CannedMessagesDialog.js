import React, { useState } from 'react';

import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';




import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { color } from '@amcharts/amcharts4/core';

const bodyStyle = createMuiTheme({
    overrides: {
        MuiListItemText: {
            primary: {
                fontSize: 12,
                fontWeight: 100,
                color: '#6f6f6f'
            },
            secondary: {
                fontSize: 10,
                fontWeight: 100,
                color: '#6f6f6f'
            }
        }
    }
})
const CannedMessagesDialog = function (props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: '100%',
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {

            // marginTop: 10,
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        ContinerExpand: {
            backgroundColor: '#F9F9F9', alignSelf: 'center', padding: '0px 20px', alignItems: 'center', border: '1px solid #F1F1F1'
        },
        listInner: {
            p: {
                fontSize: '10px',
                color: 'red'
            },
            span: {
                fontSize: 15,
            }
        },
    }));
    const audioHandleExpandClick = () => {
        setAudio(!audio);
    };
    const videoHandleExpandClick = () => {
        setVideo(!video);
    };
    const imageHandleExpandClick = () => {
        setImage(!image);
    };
    const textHandleExpandClick = () => {
        setText(!text);
    };
    const documentHandleExpandClick = () => {
        setDocument(!document);
    };
    const { onDialogPropsChange, data } = props;

    const classes = useStyles();
    const [audio, setAudio] = React.useState(false);
    const [video, setVideo] = React.useState(false);
    const [text, setText] = React.useState(false);
    const [image, setImage] = React.useState(false);
    const [document, setDocument] = React.useState(false);
    return (
        <DialogContent >
            <Grid container className={classes.ContinerExpand}>
                <Grid item xs={10} onClick={audioHandleExpandClick} >
                    <h4 style={{ fontWeight: 500, fontSize: 16, color: '#6F6F6F' }}>Audio</h4>
                </Grid>
                <Grid item xs={1} style={{ background: '#fc2254', alignContent: "center", alignItems: 'center', alignSelf: "center" }}><h5 style={{ fontSize: 11, textAlign: 'center', padding: '3px 0', color: 'white', }}>{data.length > 0 && data[1].list.length}</h5></Grid>
                <Grid item xs={1}>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: audio,
                        })}
                        onClick={audioHandleExpandClick}
                        aria-expanded={audio}
                        aria-label="show more" >
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Grid container style={{ margin: '0 0 20px 0', }}>
                <Grid item xs={12}>
                    <Collapse in={audio} timeout="auto" unmountOnExit>
                        <div style={{ width: '100%', border: 0, }}>
                            <List>
                                <MuiThemeProvider theme={bodyStyle}>
                                    {data.length > 0 && data[1].list.map((item, i) => (
                                        item.message_type === "audio" ?

                                            <ListItem className={classes.listInner} onClick={(e) => onDialogPropsChange(item)} button key={`item-${i}`}>
                                                <ListItemText primary={`${item.message_name}`} secondary={`${item.message_text}`} />
                                            </ListItem>
                                            : null
                                    ))}
                                </MuiThemeProvider>
                            </List>
                            <Divider />
                        </div>
                    </Collapse>
                </Grid>
            </Grid>

            <Grid container className={classes.ContinerExpand}>
                <Grid item xs={10} onClick={videoHandleExpandClick}>
                    <h4 style={{ fontWeight: 500, fontSize: 16, color: '#6F6F6F' }}>Video</h4>
                </Grid>
                <Grid item xs={1} style={{ background: '#fc2254', alignContent: "center", alignItems: 'center', alignSelf: "center" }}><h5 style={{ fontSize: 11, textAlign: 'center', padding: '3px 0', color: 'white', }}>{data.length > 0 && data[2].list.length}</h5></Grid>

                <Grid item xs={1} >
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: video,
                        })}
                        onClick={videoHandleExpandClick}
                        aria-expanded={video}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Grid container style={{ margin: '0 0 20px 0', }}>
                <Grid item xs={12}>
                    <Collapse in={video} timeout="auto" unmountOnExit>
                        <div style={{ width: '100%' }}>
                            <List>
                            <MuiThemeProvider theme={bodyStyle}>

                                {data.length > 0 && data[2].list.map((item, i) => (
                                    item.message_type === "video" ?

                                        <ListItem onClick={(e) => onDialogPropsChange(item)} button key={`item-${i}`}>
                                            <ListItemText primary={`${item.message_name}`} secondary={`${item.message_text}`} />
                                        </ListItem> : null
                                ))}
                                </MuiThemeProvider>
                            </List>
                            <Divider />
                        </div>
                    </Collapse>
                </Grid>
            </Grid>

            <Grid container className={classes.ContinerExpand}>
                <Grid item xs={10} onClick={textHandleExpandClick}>
                    <h4 style={{ fontWeight: 500, fontSize: 16, color: '#6F6F6F' }}>Text</h4>
                </Grid>
                <Grid item xs={1} style={{ background: '#fc2254', alignContent: "center", alignItems: 'center', alignSelf: "center" }}><h5 style={{ fontSize: 11, textAlign: 'center', padding: '3px 0', color: 'white', }}>{data.length > 0 && data[3].list.length}</h5></Grid>

                <Grid item xs={1}>  <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: text,
                    })}
                    onClick={textHandleExpandClick}
                    aria-expanded={text}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
                </Grid>
            </Grid>

            <Grid container style={{ margin: '0 0 20px 0', }}>

                <Grid item xs={12}>
                    <Collapse in={text} timeout="auto" unmountOnExit>
                        <div style={{ width: '100%' }}>
                            <List>
                            <MuiThemeProvider theme={bodyStyle}>

                                {data.length > 0 && data[3].list.map((item, i) => (
                                    item.message_type === "text" ?

                                        <ListItem onClick={(e) => onDialogPropsChange(item)} button key={`item-${i}`}>
                                            <ListItemText primary={`${item.message_name}`} secondary={`${item.message_text}`} />
                                        </ListItem> : null
                                ))}
                                </MuiThemeProvider>
                            </List>
                            <Divider />
                        </div>
                    </Collapse>
                </Grid>
            </Grid>

            <Grid container className={classes.ContinerExpand}>
                <Grid item xs={10} onClick={imageHandleExpandClick}>
                    <h4 style={{ fontWeight: 500, fontSize: 16, color: '#6F6F6F' }}>Image</h4>
                </Grid>
                <Grid item xs={1} style={{ background: '#fc2254', alignContent: "center", alignItems: 'center', alignSelf: "center" }}><h5 style={{ fontSize: 11, textAlign: 'center', padding: '3px 0', color: 'white', }}>{data.length > 0 && data[4].list.length}</h5></Grid>

                <Grid item xs={1}>  <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: image,
                    })}
                    onClick={imageHandleExpandClick}
                    aria-expanded={image}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
                </Grid>
            </Grid>

            <Grid container style={{ margin: '0 0 20px 0', }}>
                <Grid item xs={12}>
                    <Collapse in={image} timeout="auto" unmountOnExit>
                        <div style={{ width: '100%' }}>
                            <List>
                            <MuiThemeProvider theme={bodyStyle}>

                                {data.length > 0 && data[4].list.map((item, i) => (
                                    item.message_type === "image" ?

                                        <ListItem onClick={(e) => onDialogPropsChange(item)} button key={`item-${i}`}>
                                            <img
                                                src={item.attachment_url}
                                                alt="new" style={{ width: '20%', marginRight: 10 }}
                                            />
                                            <ListItemText primary={`${item.message_name}`} secondary={`${item.message_text}`} />

                                        </ListItem> : null
                                ))}
                                </MuiThemeProvider>
                            </List>
                            <Divider />
                        </div>
                    </Collapse>
                </Grid>
            </Grid>

            <Grid container className={classes.ContinerExpand}>
                <Grid item xs={10} onClick={documentHandleExpandClick}>
                    <h4 style={{ fontWeight: 500, fontSize: 16, color: '#6F6F6F' }}>Document  </h4>
                </Grid>
                <Grid item xs={1} style={{ background: '#fc2254', alignContent: "center", alignItems: 'center', alignSelf: "center" }}><h5 style={{ fontSize: 11, textAlign: 'center', padding: '3px 0', color: 'white', }}>{data.length > 0 && data[0].list.length}</h5></Grid>

                <Grid item xs={1}>  <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: document,
                    })}
                    onClick={documentHandleExpandClick}
                    aria-expanded={document}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
                </Grid>
            </Grid>

            <Grid container style={{ margin: '0 0 20px 0', }}>
                <Grid item xs={12}>
                    <Collapse in={document} timeout="auto" unmountOnExit>
                        <div style={{ width: '100%' }}>
                            <List>
                            <MuiThemeProvider theme={bodyStyle}>

                                {data.length > 0 && data[0].list.map((item, i) => (
                                    item.message_type === "document" ?

                                        <ListItem onClick={(e) => onDialogPropsChange(item)} button key={`item-${i}`}>
                                            <ListItemText primary={`${item.message_name}`} secondary={`${item.message_text}`} />
                                        </ListItem> : null
                                ))}
                                </MuiThemeProvider>
                            </List>
                            <Divider />
                        </div>
                    </Collapse>
                </Grid>

            </Grid>
        </DialogContent >
    );
};

export default CannedMessagesDialog;