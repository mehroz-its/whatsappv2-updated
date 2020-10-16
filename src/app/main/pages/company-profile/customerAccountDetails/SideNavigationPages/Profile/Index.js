import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


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
}));
function Profile(props) {
    const classes = useStyles();
    const [companyDetails, setCompanyDetails] = React.useState(props.data);
    const [profileData, setProfileData] = React.useState({});
    const [countriesData, setCountriesData] = React.useState([]);
    const [citiesData, setCitiesData] = React.useState([]);
    const [statesData, setStatesData] = React.useState([]);
    const [step, setStep] = React.useState(1)
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [first_name, setfirst_name] = React.useState('');
    const [last_name, setlast_name] = React.useState('');
    const [number, setnumber] = React.useState('');
    const [phone, setphone] = React.useState('');
    const [email, setemail] = React.useState('');
    const [address, setaddress] = React.useState('');
    const [countryy, setcountryy] = React.useState('');
    const [statee, setstatee] = React.useState('');
    const [cityy, setcityy] = React.useState('');
    const [website, setwebsite] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)
    const [profileImage, setProfileImage] = React.useState('')
    const [snackbaropen, setSnackBarOpen] = React.useState(false)
    const [snackbarmessage, setSnackBarMessage] = React.useState('')
    const [ok, setOK] = React.useState('')

    React.useEffect(() => {
        if (companyDetails) {
            let update_params = {
                key: ':client_id',
                value: companyDetails.id,
                params: {}
            }
            CoreHttpHandler.request('BusinessDetails', 'get', update_params, dataSourceSuccessBusinessDetails, dataSourceFailureBusinessDetails);
        }
        else {
            props.history.push({ pathname: '/apps/company-profile' })
        }
        fetch(`https://glist.its.com.pk/v1/fetch/countries`)
            .then(response => response.json())
            .then(data => setCountriesData(data.data.countries));
    }, [])
    const handleCityChange = (event) => {
        let city = event.target.value
        // let dataProfile = profileData['city'] = city
        setCity(event.target.value);
        setcityy(event.target.value)

    }

    const handleStatesChange = (event) => {
        setStep(event.target.value);
        console.log(event.target.value, 'state')
        setstatee(event.target.value)
        setCitiesData([])
        let state = event.target.value
        // let dataProfile = profileData['state'] = state

        fetch(`https://glist.its.com.pk/v1/fetch/cities/${state}`)
            .then(response => response.json())
            .then(data => setCitiesData(data.data.cities));

    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        console.log(event.target.value, 'country')
        let country = event.target.value;
        setcountryy(event.target.value)
        setStatesData([])
        setCitiesData([])
        // let dataProfile = profileData['country'] = country
        // console.log("dataProfile :", dataProfile);
        fetch(`https://glist.its.com.pk/v1/fetch/states/${country}`)
            .then(response => response.json())
            .then(data => setStatesData(data.data.states));
    };
    const dataSourceSuccessBusinessDetails = (response) => {
        setProfileData(response.data.data.clients[0])
        setfirst_name(response.data.data.clients[0].first_name)
        setlast_name(response.data.data.clients[0].last_name)
        setnumber(response.data.data.clients[0].number)
        setphone(response.data.data.clients[0].phone)
        setemail(response.data.data.clients[0].email)
        setaddress(response.data.data.clients[0].address)
        setcountryy(response.data.data.clients[0].country)
        setstatee(response.data.data.clients[0].state)
        setcityy(response.data.data.clients[0].city)
        setProfileImage(response.data.data.clients[0].logo)
        setwebsite(response.data.data.clients[0].website)
        console.log("response.data.data.clients[0].country :", response.data.data.clients[0]);
        if (response.data.data.clients[0].country !== "" && response.data.data.clients[0].country !== null) {
            fetch(`https://glist.its.com.pk/v1/fetch/states/${response.data.data.clients[0].country}`)
                .then(response => response.json())
                .then(data => {
                    console.log("data : ", data);
                    if (data.data) {
                        setStatesData(data.data.states)
                    }
                });
            if (response.data.data.clients[0].state !== "" && response.data.data.clients[0].state !== null) {
                fetch(`https://glist.its.com.pk/v1/fetch/cities/${response.data.data.clients[0].state}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log("city data", data);
                        if (data.data) {
                            setCitiesData(data.data.cities)
                        }
                    });
            }
        }
    };
    const dataSourceFailureBusinessDetails = (response) => {
    };
    const submit = () => {
        profileData['first_name'] = first_name
        profileData['last_name'] = last_name
        profileData['number'] = number
        profileData['phone'] = phone
        profileData['email'] = email
        profileData['country'] = countryy
        profileData['state'] = statee
        profileData['city'] = cityy
        profileData['logo'] = profileImage
        profileData['state'] = statee
        profileData['address'] = address
        profileData['website'] = website
        let params = profileData
        console.log("updateed", profileData);
        CoreHttpHandler.request('customerOnBoard', 'updateProfile', params, (response) => {
            console.log("response : ", response);
            setSnackBarOpen(true)
            setOK('success')
            setSnackBarMessage('Updated successfully')
            setTimeout(() => {
                setSnackBarOpen(false)
            }, 1000);
        }, (error) => {
            console.log("error : ", error);
            setSnackBarOpen(true)
            setOK('success')
            setSnackBarMessage('Not updated')
            setTimeout(() => {
                setSnackBarOpen(false)
            }, 1000);
        });
    }
    const onChangeHandler = event => {
        setIsLoading(true)
        if (event.target.files.length > 0) {
            const _data = new FormData();

            let _name = event.target.files[0].name;

            _name = _name.replace(/\s/g, "");

            _data.append(
                "file",
                event.target.files[0],
                `${new Date().getTime()}_${_name}`
            );

            CoreHttpHandler.request("content", "upload", { params: _data },
                response => {
                    let url = response.data.data.link
                    setProfileImage(url)
                    setIsLoading(false)
                },
                error => {
                    setIsLoading(false)

                });
        }
    };

    return (
        <>
            <Card className={classes.root}>
                <CardContent className={classes.content} style={{ width: '100%' }}>
                    <Typography variant='h2' className='companyDetailHeader' >Profile</Typography>
                    <div className="flex flex-col items-center justify-center " style={{ marginTop: 23 }}>
                        {isLoading ? <CircularProgress color="secondary" /> :

                            <Avatar alt="Remy Sharp" src={profileImage} className={classes.large} />
                        }
                        <span>
                            <input id="contained-button-file" type="file" name="url" style={{ cursor: 'pointer', display: "none", marginBottom: '0px' }} onChange={onChangeHandler} accept="image/*" />
                            <label htmlFor="contained-button-file">
                                <Icon color="action"
                                    style={{ position: 'absolute', left: '51%', top: '15%' }}
                                    fontSize="small"
                                >
                                    linked_camera</Icon>
                            </label>
                        </span>
                    </div>
                    <Grid container style={{ marginTop: "5px", paddingRight: '15px', paddingLeft: '15px' }} spacing={3}>
                        <Grid item md={6} sm={12} xs={12}  >
                            <TextField required
                                size="small"
                                value={first_name}
                                name='firstName'
                                autoFocus
                                placeholder='First Name'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                onChange={(e) => { setfirst_name(e.target.value) }} />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} >
                            <TextField required
                                size="small"
                                value={last_name}
                                name='lastName'
                                autoFocus
                                placeholder='Last Name'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                onChange={(e) => { setlast_name(e.target.value) }} />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} >
                            <TextField required
                                size="small"
                                value={number}
                                name='number'
                                autoFocus
                                placeholder='Number'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                onChange={(e) => { setnumber(e.target.value) }} />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} >
                            <TextField required
                                size="small"
                                value={phone}
                                name='phone'
                                autoFocus
                                placeholder='Phone'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                onChange={(e) => { setphone(e.target.value) }} />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} >
                            <TextField required
                                size="small"
                                value={email}
                                name='email'
                                autoFocus
                                placeholder='Email'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                onChange={(e) => { setemail(e.target.value) }} />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} >
                            <TextField required
                                size="small"
                                value={address}
                                name='address'
                                autoFocus
                                placeholder='Address'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                onChange={(e) => { setaddress(e.target.value) }} />
                        </Grid>


                        <Grid item md={6} sm={12} xs={12} >
                            <FormControl variant="outlined" size='small' fullWidth style={{ marginTop: '0px' }}>
                                <InputLabel id="outlined-age-native-simple	">Country</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={parseInt(countryy)}
                                    onChange={handleCountryChange}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>Select Country</em>
                                    </MenuItem>
                                    {
                                        countriesData.map(val => {
                                            return (
                                                <MenuItem value={val.id}>{val.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} >
                            <FormControl variant="outlined" size='small' fullWidth style={{ marginTop: '0px' }}>
                                <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={parseInt(statee)}
                                    onChange={handleStatesChange}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>Select State</em>
                                    </MenuItem>
                                    {
                                        statesData.map(val => {
                                            return (
                                                <MenuItem value={val.id}>{val.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} >
                            <FormControl variant="outlined" size='small' fullWidth style={{ marginTop: '0px' }}>
                                <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={parseInt(cityy)}
                                    onChange={handleCityChange}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>Select City</em>
                                    </MenuItem>
                                    {
                                        citiesData.map(val => {
                                            return (
                                                <MenuItem value={val.id}>{val.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item md={6} sm={12} xs={12} >
                            <TextField required
                                size="small"
                                value={website}
                                name='Website'
                                autoFocus
                                label='Website'
                                type='text'
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                onChange={(e) => { setwebsite(e.target.value) }} />
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
            </Card >
            <div style={{width:'100%',height:64,marginTop:24,position:"relative",backgroundColor: 'white',boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',borderRadius:3}}>
                <div style={{width:'9%',position:"absolute",top:'18%',right:'3%'}}>
                <Button style={{alignItems: 'center',alignSelf: 'center',alignContent: 'center',justifyContent:'center'}} variant="contained" color="primary"  aria-label="Register" onClick={() => submit()} >   Update	</Button>
                </div>

            </div>

            {/* <Card className={classes.root} style={{ marginTop: 20 }}>
                <CardContent className={classes.content} >
                   
                            <div style={{flex:1,alignItems: 'center',alignSelf: 'center',alignContent: 'center',backgroundColor: 'green',}} >
                            <Button style={{alignItems: 'center',alignSelf: 'center',alignContent: 'center',justifyContent:'center'}} variant="contained" color="primary"  aria-label="Register" onClick={() => submit()} >   Update	</Button>
                            </div>
                          
                </CardContent>
            </Card> */}
        </>
    )
}

export default Profile
