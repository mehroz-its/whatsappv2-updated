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
import FormControl from '@material-ui/core/FormControl';


export default class DialogueTestAPI extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const { questions, children, onCompleteNext, response} = this.props;

        if (questions && questions.length) {

            this.setState({ questions })
        }
        if (response ) {

            this.setState({ response })
        }

        if (children && children.length) {
            this.setState({ children })
        }
        if (onCompleteNext) {
            this.setState({ onCompleteNext })
        }

    }
    state = {
        url:"https://reqres.in/api/users/$1",
        response:"",
        questions: [{}],
        questionRequired: null,
        responseRequired: null,
        children: [],
        onCompleteNext: ""
    }


    getResult = () => {
        let { questions,onCompleteNext,response,url } = this.state;

        if (questions && questions.length) {
            if (!questions[0].question) {
                this.setState({
                    questionRequired: true
                })
                return [true, { questions: [] }]

            } 

            if(!response){
                this.setState({
                    responseRequired: true
                })
                return [true, { questions: [] }]
            }


            
            return [
                false,
                {
                    questions,
                    response,
                    url,
                    onCompleteNext
                }
            ]
            

        } else {

            this.setState({
                questionRequired: true
            })
            return [true, { questions: [] }]
        }



    }


    updateQuestion = (e, i) => {
        let questions = this.state.questions;
        questions[i].question = e.target.value;
        this.setState({ questions })
    }
    updateResponse = (e) => {
        let response = e.target.value;
        this.setState({ response })
    }
    
    addQuestion = () => {
        let questions = this.state.questions;
        questions.push({ question: "" })
        this.setState({ questions })
    }
    removeQuestion = (i) => {

        if (i) {
            let questions = this.state.questions;
            questions.splice(i, 1)
            this.setState({ questions })
        }
    }
    onInputChange = (e) => {
        this.setState({
            onCompleteNext: e.target.value
        })
    }
    render() {
        const { questions, children, onCompleteNext,response } = this.state;

        return (

            <React.Fragment>
            
                {questions.map((el, i) => {
                    return (

                        <div className="flex">
                            <TextField
                                className={"mb-10"}
                                label="Question"
                                autoFocus
                                required={i == 0 ? true : false}

                                id={"question_" + i}
                                name="questions"
                                variant="outlined"
                                fullWidth

                                multiline
                                rowsMax={6}
                                value={el.question}
                                onChange={(e) => { this.updateQuestion(e, i) }}
                                size="small"

                                error={this.state.questionRequired && i == 0}
                                helperText={this.state.questionRequired && i == 0 ? "Question is required" : ""}
                            />
                        </div>
                    )
                })


                }

                <h4>Reading Response</h4>
                <div className="flex">
                            <TextField
                                className={"mb-10"}
                                label="Response"
                                autoFocus
                                required={true}

                                id={"response"}
                                name="questions"
                                variant="outlined"
                                fullWidth

                                value={response}
                                onChange={this.updateResponse}
                                size="small"

                                error={this.state.responseRequired}
                                helperText={this.state.responseRequired  ? "Response is required" : ""}
                            />
                        </div>

                        
                {
                    children && children.length ?
                        (

                            <div className="flex">


                                <FormControl
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                >
                                    <InputLabel id="demo-simple-select-outlined-label_child_to_invoke">Child To Invoke</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label_child_to_invoke"
                                        id="demo-simple-select-outlined_child_to_invoke"
                                        value={onCompleteNext}
                                        onChange={this.onInputChange}
                                        fullWidth
                                    >
                                        <MenuItem value={""}><em>Select Child to Invoke after Questions have been answered</em></MenuItem>
                                        {
                                            children.map(el => {
                                                return (
                                                    <MenuItem value={el.id}>{el.title}</MenuItem>
                                                )
                                            })
                                        }


                                    </Select>
                                </FormControl>

                            </div>

                        )
                        :
                        null
                }
                
            </React.Fragment>


        )


    }
}
