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

export default class DialogueImages extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const { images } = this.props;

        if (images && images.length) {
            console.log("images", images)
            this.setState({ images })
        }

    }
    state = {
        images: [],
        isLoading:false
    }

    getResult = () => {
        let { images } = this.state;

        if (images && images.length) {
            if (!images[0]) {
                this.setState({
                    imagesRequired: true
                })
                return [true, { images: [] }]

            } else {

                return [false, { images }]
            }

        } else {

            this.setState({
                imagesRequired: true
            })
            return [true, { images: [] }]
        }



    }
    removeQuestion = (i) => {
        // alert(i)

        // if (i) {
            let images = this.state.images;
            images.splice(i, 1)
            this.setState({ images })
        // }
    }
	onChangeHandler = event => {
		if (event.target.files.length > 0) {
			const _data = new FormData();

			let _name = event.target.files[0].name;

			_name = _name.replace(/\s/g, '');

			_data.append('file', event.target.files[0], `${new Date().getTime()}_${_name}`);
            this.setState({
                imagesRequired:false,
                isLoading:true
            })
            
			CoreHttpHandler.request(
				'content',
				'upload',
				{ params: _data },
				response => {
                    let images = this.state.images;
                    images.push({
                        URL:response.data.data.link,
                        caption:""
                    })
                    this.setState({images,isLoading:false})
                },
				error => {
                    this.setState({isLoading:false})

                }
			);
		}
    };
    updateCaption = (e,i)=>{
        let {images} = this.state;
        images[i].caption = e.target.value;
        this.setState({images})
    }
    render() {
        const { images, imagesRequired } = this.state;

        return (

            <React.Fragment>
                <div className="flex flex-col justify-between flex-1 px-24 pt-12">
                    {/* <div className="flex justify-between items-start"> */}
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="image-grid" style={{ marginTop: '10px', margin:"auto" }}>
                            {
                                this.state.isLoading?
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
                                    accept="image/*"
                                />
                                <label htmlFor="contained-button-file">
                                    <Icon
                                        color="action"
                                        fontSize="large"
                                        className={"onHoverPointer"}
                                    >
                                        linked_camera
									</Icon>
                                    
                                    {
                                        imagesRequired?

                                        <em style={{color:'red',textAlign:"center"}}>{ "Upload At least 1 image"}</em>

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



                {images.map((el, i) => {
                    return (
                        <React.Fragment>
                        
                        <div className="flex"  style={{marginTop:15}}>
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
                            <div className="flex" style={{marginTop:15}}>   
                                <TextField
                                    label="Caption"
                                    className={"mb-10"}
                                    id={"Caption" + i}
                                    name="Caption"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rowsMax={6}
                                    value={el.caption}
                                    onChange={(e)=>{this.updateCaption(e,i)}}
                                    size="small"
                                />

                            </div>
                            {
                                // i ?
                                    <div className={"flex justify-center items-center"}>
                                        <Icon style={{ cursor: "pointer" }} onClick={() => { this.removeQuestion(i) }}>delete</Icon>

                                    </div>
                                    // : null
                            }
                        </React.Fragment>
                        
                    )
                })


                }



            </React.Fragment>


        )


    }
}
