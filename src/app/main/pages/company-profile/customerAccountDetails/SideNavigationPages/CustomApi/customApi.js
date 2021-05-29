import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import FuseLoading from '../../../../../../../@fuse/core/FuseLoading/FuseLoading';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        padding: '0px'
    },
    content: {
        padding: '0px'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    formControl: {
        // margin: theme.spacing(1), 
        minHeight: 95
    },
    selectEmpty: {
        // marginTop: theme.spacing(2),
    },
}));
function Config(props) {
    const classes = useStyles();
    const [companyDetails, setCompanyDetails] = React.useState(props.data);
    const [snackbaropen, setSnackBarOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [snackbarmessage, setSnackBarMessage] = React.useState('')
    const [path, setPath] = React.useState('')
    const [token, setToken] = React.useState('')
    const [baseUrl, setBaseUrl] = React.useState('')
    const [headerValues, setHeaderValues] = React.useState(JSON.stringify({ key: 'abc', value: "abc" }))
    const [paramValues, setParamValues] = React.useState(JSON.stringify({ key: 'abc' }))
    const [method, setMethod] = React.useState(null)
    const [ok, setOK] = React.useState('')

    const handleChange = (event) => {
        setMethod(event.target.value);
    };


    const submit = async () => {
        // let methodName = method == 1 ? "get" : method == 2 ? "post" : method == 3 ? "put" : null
        try {
            let res = await customApimethod(baseUrl, paramValues, headerValues)
            //     setSnackBarOpen(true)
            //     setOK('success')
            //     setSnackBarMessage('Success')
            //     setTimeout(() => {
            //         setSnackBarOpen(false)
            //     }, 1000);
        } catch (err) {
            console.log(err, 'errr')
        }

    }
    const customApimethod = (apiPAth, params, header) => {
         // Currently empty header for api
        var myHeaders = new Headers();

        let requestParams = JSON.parse(params)
        let requestHeader = JSON.parse(headerValues)

        // appending user input header in new header object
        let headerKeys = Object.keys(requestHeader)
        headerKeys.length > 0 && headerKeys.map(val => myHeaders.append(val, requestHeader[val]))

        if (method == null) {
            setSnackBarOpen(true)
            setOK('error')
            setSnackBarMessage('Please Select Api Method')
            setTimeout(() => {
                setSnackBarOpen(false)
            }, 3000);
        }
        else {
            return new Promise((resolve, reject) => {
                if (method == 1) {
                    axios.get(`${apiPAth}`, requestParams,
                        {
                            headers: myHeaders,
                            mode: 'cors',
                        })
                        .then(response => {
                            resolve(response);
                        }).catch(error => {
                            reject(error);
                        });;
                } else if (method == 2) {
                    axios.post(`${apiPAth}`, requestParams,
                        {
                            headers:
                                myHeaders
                            ,
                        })
                        .then(response => {
                            resolve(response);
                        }).catch(error => {
                            reject(error);
                        });;
                } else if (method == 3) {
                    axios.put(`${apiPAth}`, requestParams,
                        {
                            headers: myHeaders,
                            mode: 'cors',
                        })
                        .then(response => {
                            resolve(response);
                        }).catch(error => {
                            reject(error);
                        });;
                }
            });
        }

    };
    return (
        isLoading ?

            <div className="flex flex-1 items-center justify-center h-full">
                <FuseLoading />
            </div>
            :
            <Card className={classes.root}>
                <CardContent className={classes.content} style={{ width: '100%' }}>
                    <Typography variant='h2' className='companyDetailHeader' style={{ backgroundColor: "#e73859", color: "white" }} >Custom Api</Typography>
                    <Grid container style={{ marginTop: "5px", paddingRight: '15px', paddingLeft: '15px' }} spacing={3}>
                        <Grid item md={6} sm={12} xs={12}  >
                            <label style={{ fontSize: '15px', paddingLeft: '3px' }}>Base Url</label>
                            <TextField required
                                size="small"
                                value={baseUrl}
                                name='setSubjectId'
                                autoFocus
                                placeholder='Base Url'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                onChange={(e) => { setBaseUrl(e.target.value) }} />
                        </Grid>

                        <Grid item md={6} sm={12} xs={12}  >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label" style={{ paddingLeft: '5px', marginTop: '-6px' }}>Method</InputLabel>
                                <Select
                                    size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={method}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    style={{ height: '40px', marginTop: '10px' }}
                                >
                                    <MenuItem value={1}>Get</MenuItem>
                                    <MenuItem value={2}>Post</MenuItem>
                                    <MenuItem value={3}>Put</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item md={6} sm={12} xs={12} style={{ marginTop: '-40px' }}   >
                            <label style={{ fontSize: '15px', paddingLeft: '3px' }}>Header Values</label>
                            <TextField required
                                size="small"
                                value={headerValues}
                                name='setSubjectId'
                                autoFocus
                                placeholder='{key:value}'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                rows={5}
                                multiline={true}
                                onChange={(e) => { setHeaderValues(e.target.value) }} />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} style={{ marginTop: '-40px' }}     >
                            <label style={{ fontSize: '15px', paddingLeft: '3px' }}>Param Values</label>
                            <TextField required
                                size="small"
                                value={paramValues}
                                name='setSubjectId'
                                autoFocus
                                placeholder='{key:value}'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                rows={5}
                                multiline={true}
                                onChange={(e) => { setParamValues(e.target.value) }} />
                        </Grid>

                        <Grid item md={12} sm={12} xs={12}  >
                            <Button
                                variant="contained"
                                color="primary"
                                className=" mx-auto"
                                aria-label="Register"
                                onClick={() => submit()}>
                                Create
								</Button>
                        </Grid>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={snackbaropen}
                        autoHideDuration={1000}
                    >
                        <Alert variant="filled" severity={ok}>
                            {snackbarmessage}
                        </Alert>
                    </Snackbar>
                </CardContent>
            </Card>
    )
}

export default Config
