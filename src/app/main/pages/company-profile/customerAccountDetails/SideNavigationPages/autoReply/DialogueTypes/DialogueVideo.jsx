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


export default class DialogueVideo extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const { video } = this.props;

        if (video && video.length) {
            this.setState({ video })
        }

    }
    state = {
        video: []
    }

    getResult = () => {
        let { video } = this.state;

        if (video && video.length) {
            if (!video[0]) {
                this.setState({
                    videoRequired: true
                })
                return [true, { video: [] }]

            } else {

                return [false, { video }]
            }

        } else {

            this.setState({
                videoRequired: true
            })
            return [true, { video: [] }]
        }



    }
    
	onChangeHandler = event => {
		if (event.target.files.length > 0) {
			const _data = new FormData();

			let _name = event.target.files[0].name;

			_name = _name.replace(/\s/g, '');

			_data.append('file', event.target.files[0], `${new Date().getTime()}_${_name}`);
            this.setState({
                videoRequired:false
            })
			CoreHttpHandler.request(
				'content',
				'upload',
				{ params: _data },
				response => {
                    let video = this.state.video;
                    video.push({
                        URL:response.data.data.link,
                        caption:""
                    })
                    this.setState({video})
                },
				error => {}
			);
		}
    };
    updateCaption = (e,i)=>{
        let {video} = this.state;
        video[i].caption = e.target.value;
        this.setState({video})
    }
    render() {
        const { video, videoRequired } = this.state;

        return (

            <React.Fragment>
                <div className="flex flex-col justify-between flex-1 px-24 pt-12">
                    {/* <div className="flex justify-between items-start"> */}
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="image-grid" style={{ marginTop: '10px', margin:"auto" }}>

                            <span>
                                <input
                                    id="contained-button-file"
                                    type="file"
                                    name="url"
                                    style={{ cursor: 'pointer', display: 'none', marginBottom: '0px' }}
                                    onChange={this.onChangeHandler}
                                    accept="video/*"
                                />
                                <label htmlFor="contained-button-file">
                                    <Icon
                                        color="action"
                                        fontSize="large"

                                    >
                                        video_library
									</Icon>
                                    
                                    
                {
                    videoRequired?

                    <em style={{color:'red',textAlign:"center"}}>{ "Upload At least 1 video file"}</em>

                   :
                   null
                }
                                </label>
                            </span>
                        </div>
                        
                    </div>
                    {/* </div> */}
                </div>



                {video.map((el, i) => {
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
                            <div className="flex">
                                <TextField
                                    label="Caption"
                                    className={"mb-10"}
                                    id={"Caption" + i}
                                    name="Caption"
                                    variant="outlined"
                                    fullWidth

                                    value={el.caption}
                                    onChange={(e)=>{this.updateCaption(e,i)}}
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
