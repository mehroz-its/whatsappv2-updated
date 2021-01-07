import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
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
import CoreHttpHandler from "../../../../../../../../http/services/CoreHttpHandler"
import Avatar from '@material-ui/core/Avatar';
import DotLoader from "react-spinners/DotLoader";

export default class DialogueAudio extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const { audio } = this.props;

        if (audio && audio.length) {
            this.setState({ audio })
        }

    }
    state = {
        audio: [],
        isLoading:false
    }

    getResult = () => {
        let { audio } = this.state;

        if (audio && audio.length) {
            if (!audio[0]) {
                this.setState({
                    audioRequired: true
                })
                return [true, { audio: [] }]

            } else {

                return [false, { audio }]
            }

        } else {

            this.setState({
                audioRequired: true
            })
            return [true, { audio: [] }]
        }



    }

    onChangeHandler = event => {
        if (event.target.files.length > 0) {
            const _data = new FormData();

            let _name = event.target.files[0].name;

            _name = _name.replace(/\s/g, '');

            _data.append('file', event.target.files[0], `${new Date().getTime()}_${_name}`);
            this.setState({
                audioRequired: false,
                isLoading:true
            })
            CoreHttpHandler.request(
                'content',
                'upload',
                { params: _data },
                response => {
                    let audio = this.state.audio;
                    audio.push({
                        URL: response.data.data.link,
                        caption: ""
                    })
                    this.setState({ audio,isLoading:false })
                },
                error => {
                    this.setState({isLoading:false})

                 }
            );
        }
    };
    updateCaption = (e, i) => {
        let { audio } = this.state;
        audio[i].caption = e.target.value;
        this.setState({ audio })
    }
    render() {
        const { audio, audioRequired } = this.state;

        return (

            <React.Fragment>
                <div className="flex flex-col justify-between flex-1 px-24 pt-12">
                    {/* <div className="flex justify-between items-start"> */}
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="image-grid" style={{ marginTop: '10px', margin: "auto" }}>
                            {
                                this.state.isLoading ?
                                    <div className="sweet-loading">
                                        <DotLoader
                                            color={"#E84855"}
                                            size={50}
                                            loading={this.state.isLoading}
                                        />
                                    </div>

                                    :

                                    <span>
                                        <input
                                            id="contained-button-file"
                                            type="file"
                                            name="url"
                                            style={{ cursor: 'pointer', display: 'none', marginBottom: '0px' }}
                                            onChange={this.onChangeHandler}
                                            accept="audio/*"
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Icon
                                                color="action"
                                                fontSize="large"
                                                className={"onHoverPointer"}
                                            >
                                                graphic_eq
									        </Icon>


                                            {
                                                audioRequired ?

                                                    <em style={{ color: 'red', textAlign: "center" }}>{"Upload At least 1 audio file"}</em>

                                                    :
                                                    null
                                            }
                                        </label>
                                    </span>


                            }
                        </div>

                    </div>
                    {/* </div> */}
                </div>



                {audio.map((el, i) => {
                    return (
                        <React.Fragment>

                            <div className="flex">
                                <TextField
                                    label="URL"
                                    className={"mb-5"}

                                    id={"URL" + i}
                                    name="URL"
                                    variant="outlined"
                                    fullWidth

                                    value={el.URL}

                                    size="small"
                                />

                            </div>
                        </React.Fragment>

                    )
                })


                }



            </React.Fragment>


        )


    }
}
