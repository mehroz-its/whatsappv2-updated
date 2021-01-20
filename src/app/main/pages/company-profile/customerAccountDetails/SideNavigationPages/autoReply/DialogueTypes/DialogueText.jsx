import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DraftsIcon from '@material-ui/icons/Drafts';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WorkIcon from '@material-ui/icons/Work';
import Grid from '@material-ui/core/Grid';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Picker from 'emoji-picker-react';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';

export default class DialogueText extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const { messages } = this.props;

        if (messages && messages.length) {
            this.setState({ messages })
        } else {
        }
    }
    state = {
        messages: [""],
        messageRequired: null,
        chosenEmoji: {},
        carrPos:0,
    }

    updateMessages = (e, i) => {
        let messages = this.state.messages;
        messages[i] = e.target.value;
        this.setState({ messages })
    }

    addMessage = () => {
        let messages = this.state.messages;
        messages.push("")
        this.setState({ messages })
    }
    removeMessage = (i) => {

        if (i) {
            let messages = this.state.messages;
            messages.splice(i, 1)
            this.setState({ messages })
        }
    }

    getResult = () => {
        let { messages } = this.state;

        if (messages && messages.length) {
            if (!messages[0]) {
                this.setState({
                    messageRequired: true
                })

                return [true, { messages: [] }]

            } else {
                messages = messages.filter(el => el);

                return [false, { messages }]
            }

        } else {

            this.setState({
                messageRequired: true
            })
            return [true, { messages: [] }]
        }



    }
    setChosenEmoji = (data, i) => {
        const { chosenEmoji,carrPos } = this.state;
        let temp_carrPos = carrPos;

        if(data&&data.currentTarget){
            chosenEmoji[i] = data.currentTarget
        }else{
            chosenEmoji[i] = null
            temp_carrPos = 0
        }
        this.setState({ chosenEmoji,carrPos:temp_carrPos })
    }
    
    onEmojiClick = (event, emojiObject, i) => {
        const { messages,carrPos } = this.state;
        let temp_carrPos = carrPos;

        let elem = document.getElementById('messages_'+i);

        if(messages[i]&&elem&&elem.selectionStart>=0){
            let textToInsert = emojiObject.emoji
            let cursorPosition = temp_carrPos?temp_carrPos: elem.selectionStart
            let textBeforeCursorPosition = messages[i].substring(0, cursorPosition)
            let textAfterCursorPosition = messages[i].substring(cursorPosition, messages[i].length)
            messages[i] = textBeforeCursorPosition + textToInsert + textAfterCursorPosition
            temp_carrPos = cursorPosition + textToInsert.length
        }else{
            messages[i] = emojiObject.emoji;
        }
        this.setState({carrPos:temp_carrPos},()=>{
            this.setState({ messages })
        })
        
    };
    render() {
        const { messages, chosenEmoji } = this.state;

        return (

            <React.Fragment>
                {messages.map((el, i) => {
                    return (
                        <React.Fragment>
                            <div className="flex">
                                <TextField
                                    className={"mb-10"}
                                    label="Message"
                                    autoFocus
                                    required={i == 0 ? true : false}

                                    id={"messages_" + i}
                                    name="messages"
                                    variant="outlined"
                                    fullWidth

                                    multiline
                                    rowsMax={6}
                                    value={el}
                                    onChange={(e) => { this.updateMessages(e, i) }}
                                    size="small"

                                    error={this.state.messageRequired && i == 0}
                                    helperText={this.state.messageRequired && i == 0 ? "Message is required" : ""}
                                />



                                
                            </div>

                            <div className={"flex dialogueTextIcons mb-10"}>

                                {
                                    i===this.state.messages.length - 1 && this.state.messages[this.state.messages.length - 1] ?
                                        <IconButton style={{ cursor: "pointer" }} onClick={this.addMessage}>add</IconButton>

                                        :
                                        <IconButton style={{color:"white"}}>ignore_Icon</IconButton>
                                        
                                }
                                {
                                    i ?
                                        <IconButton style={{ cursor: "pointer" }} onClick={() => { this.removeMessage(i) }}>delete</IconButton>                                        
                                        :
                                        <IconButton style={{color:"white"}}>ignore_Icon</IconButton>
                                }
                                {chosenEmoji[i] ? (
                                    
                                    
                                        <Popover
                                        id={"emoji-pop-up"}
                                        open={true}
                                        anchorEl={chosenEmoji[i]}
                                        onClose={(e) => { this.setChosenEmoji(null, i) }}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                        }}
                                        className={"onHoverPointer"}
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                        }}
                                    >
                                            <Picker style={{"with":"100%"}} onEmojiClick={(e, obj) => { this.onEmojiClick(e, obj, i) }} />
                                    </Popover>

                                ) : null}
                                <IconButton style={{ cursor: "pointer" }} onClick={(e) => this.setChosenEmoji(e, i)}>mood</IconButton>

                            </div>
                        </React.Fragment>


                    )
                })


                }


            </React.Fragment>


        )


    }
}
