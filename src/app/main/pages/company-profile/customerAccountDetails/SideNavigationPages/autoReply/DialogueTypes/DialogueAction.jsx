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
import FormControl from '@material-ui/core/FormControl';


export default class DialogueAction extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const {node} = this.props;
        if(node.actionType){
            this.setState({actionType:node.actionType})
        }
        if(node.steps){
            this.setState({steps:node.steps})
        }
    }
    state = {
        actionType: "goBack", //drop down select action e.g. goBack
        steps: 1,
        errors:{}
    }

    getResult = () => {
        let { actionType, steps } = this.state;

        if(actionType=="goBack"){
            return [false,{actionType,steps}]
        }
        else if(actionType=="agentAssign"){
            return [false,{actionType}]
        }

        else{
            return [true,{}]
        }
        
    }
    onInputChange = (e) =>{
        switch (e.target.name) {
            case "actionType":
                this.setState({actionType:e.target.value})
                break;
            case "steps":
                this.setState({steps:e.target.value})
                break;
        
            default:
                break;
        }
    }


    render() {

        const {actionType,steps,errors} = this.state;
        const {pathLength} = this.props;


        return (

            <React.Fragment>


                <div className="flex mb-10">


                    <FormControl
                        variant="outlined"
                        size="small"
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-outlined-actionType">Action Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-actionType"
                            id="demo-simple-select-outlined_type"
                            value={actionType}
                            onChange={this.onInputChange}
                            fullWidth
                            name={"actionType"}
                        >
                            <MenuItem value={"goBack"}>Go Back</MenuItem>
                            <MenuItem value={"agentAssign"}>Agent Assign</MenuItem>
                        </Select>
                    </FormControl>




                </div>

                {
                    actionType==="goBack"?
                        <div className={"flex"}>
                            <TextField
                                className="mb-24"
                                label="Go Back Steps"
                                id="goBackSteps"
                                name="steps"
                                value={steps}
                                variant="outlined"
                                required
                                fullWidth
                                onChange={this.onInputChange}
                                size="small"
                                type="number"
                                InputProps={{ inputProps: { min: 1, max: pathLength-1 } }}


                                error={errors.steps}
                                helperText={errors.steps ? errors.steps : ""}
                            />
                        </div>

                    :null
                }


            </React.Fragment>


        )


    }
}
