import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import picture from './profileImage.png';
// import { FaCamera } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
// import Validation from "js-textfield-validation";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';




import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    }
}));

const Profile = function (props) {
    const classes = useStyles();
    const { updateImage } = props

    const [profileUsername, setProfileUsername] = React.useState('Your Profile');
    const [profileId, setProfileId] = React.useState('');
    const [profileData, setProfileData] = React.useState([]);
    const [profileImage, setProfileImage] = React.useState(picture)
    const [dob, setDOB] = React.useState(null);

    const [snackbaropen, setSnackBarOpen] = React.useState(false)
    const [snackbarmessage, setSnackBarMessage] = React.useState('')
    const [ok, setOK] = React.useState('')





    const handleDate = (e) => {
        setDOB(e.target.value)
        let changedDate = dob
        const id = e.target.id.split('-');
        const name = e.target.name;
        console.log(profileData, 'name name')
        const attrs = profileData.map((attr, i) => {
            // console.log(attr,'i am atrr')
            if (attr.dob) {
                console.log(attr, i, 'i nattr aifff')
                attr[name] = e.target.value;
                return attr;

                //   setProfileData(profileData[i].dob===changedDate)
            }
            else return attr;
            // if (attr[id[0]] === id[1]) {
            //     attr[name] = e.target.value;
            //     console.log(attr, 'attrrr')
            //     return attrs;
            // } else return attr;
        });

        setProfileData(attrs);
    }
    const onInputChange = (e) => {
        const id = e.target.id.split('-');

        const name = e.target.name;
        const attrs = profileData.map((attr) => {

            if (attr[id[0]] === id[1]) {
                attr[name] = e.target.value;

                return attr;
            } else return attr;
        });

        let firstname = "";
        let lastname = "";


        attrs.find(function (element) {
            if (element.firstname) {
                if (element.firstname === 'N/A') {
                    firstname = ''

                }
                else {
                    firstname = element.firstname
                }

            }
            if (element.lastname) {
                if (element.lastname === 'N/A') {
                    lastname = ''
                }
                else {
                    lastname = element.lastname
                }
            }

        });
        setProfileData(attrs);

    };

    const _update = () => {
        // profileData[7] = { id: "8", image: props.urlImageHeader }
        console.log(profileData, 'profileDataprofileData')

        let data = {
            key: ':id',
            value: profileId,
            attributes: profileData
        }
        console.log(data,'data')
        setTimeout(() => {
            setSnackBarMessage('')
            setSnackBarOpen(false)
        }, 4000);

        // console.log(profileData, 'dataaaaa')

        // return
        // urlImageHeader
        CoreHttpHandler.request('profile', 'update', data, response => {
            // console.log("response ", response);
            // console.log(response.data.data.user_data, 'responseresponse');
            setSnackBarMessage("Updated Successfully")
            setOK("success")
            setSnackBarOpen(true)

            // setSnackBarMessage("Profile updated successfully", "success");
        },
            error => {
                setSnackBarMessage("Error! Please Try Again Later")
                setOK("error")
                setSnackBarOpen(true)
                // setSnackBarMessage(
                //     "Please try again later, Profile not updated",
                //     "error"
                // );
            });
    }


    const loadProfile = () => {
        return CoreHttpHandler.request('profile', 'get_profile', {}, null, null, true);

    };

    React.useEffect(() => {
        loadProfile().then((response) => {
            console.log('inside hittttttttttt');
            const profileData = response.data.data.attribute;
            const user = JSON.parse(localStorage.getItem('user_data'));
            let nameCapitalized = ''
            let lastname = ''
            if (user.firstName) {
                nameCapitalized = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
            }
            if (user.lastName) {
                lastname = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
            }

            setProfileUsername(`${nameCapitalized}'s Profile`);
            setProfileId(user.id)
            setProfileData(profileData);
            props.onChange(`${nameCapitalized} ${lastname}`)

            let image = null
            profileData.map((val, id) => {
                if (val.image) {
                    return image = val.image
                }
            })
            setProfileImage(image)
            updateImage(image)

        });
    }, []);

    const onChangeHandler = event => {
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
                    profileData.map((val, id) => {
                        if (val.image) {
                            val.image = url
                            return profileData
                        }
                    })
                    setProfileData(profileData)

                },
                error => {
                    // console.log("error :  ", error);
                });
        }
    };

    return (
        <>
            <Snackbar

                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackbaropen}
                autoHideDuration={6000}

            >
                <Alert variant="filled" severity={ok}>
                    {snackbarmessage}
                </Alert>
            </Snackbar>
            <div className={classes.root}>
                <Grid container spacing={2} style={{ marginTop: 10, paddingRight: 30, paddingLeft: 20 }} >
                    {profileData.map((attribute, i) => {
                        console.log(attribute)
                        const _field = (obj, props) => {
                            const [attribute_id, attribute_value] = props;

                            return { id: obj[attribute_id], value: obj[attribute_value], keys: props };
                        };

                        const { id, value, keys } = _field(attribute, Object.keys(attribute));
                        if (value === 'N/A') {
                            console.log(`${keys[1].toUpperCase()}`, 'here i am')
                            return (
                                <Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
                                    <div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }} >
                                        <TextField
                                            type={`${keys[1].toUpperCase()}` === "DOB" ? 'date' : null}
                                            id={`id-${id}`}
                                            name={keys[1]}
                                            value={`${keys[1].toUpperCase()}` === "DOB" ? dob : ''}
                                            key={`user_attribute_data_${i}`}
                                            autoFocus
                                            label={`${keys[1].toUpperCase()}` === 'ADDRESS' ? 'ADDRESS' : `${keys[1].toUpperCase()}` === 'FIRSTNAME' ? 'FIRSTNAME' : `${keys[1].toUpperCase()}` === 'LASTNAME' ? 'LASTNAME' : `${keys[1].toUpperCase()}` === 'AGE' ? 'AGE' : `${keys[1].toUpperCase()}` === 'GENDER' ? 'GENDER' : `${keys[1].toUpperCase()}` === 'CNIC' ? 'CNIC' : `${keys[1].toUpperCase()}` === "DOB" ? null : `${keys[1].toUpperCase()}` === 'COUNTRY' ? 'COUNTRY' : `${keys[1].toUpperCase()}` === "CITY" ? "CITY" : `${keys[1].toUpperCase()}` === "IMAGE" ? "IMAGE" : null}
                                            variant="outlined"
                                            fullWidth
                                            autoComplete="off"
                                            onChange={onInputChange}
                                            size="small"
                                            className="mb-16"
                                        />
                                    </div>
                                </Grid>
                            );
                        } else {
                            console.log(`${keys[1].toUpperCase()}`, 'here i am')

                            if (attribute.image) {
                                console.log(`${keys[1].toUpperCase()}`, 'here i if')

                                return (
                                    <Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
                                        <div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }} >
                                            <TextField disabled size="small"
                                                id={`id-${id}`} key={`user_attribute_data_${i}`} value={value} name={keys[1]} autoFocus label={`${keys[1].toUpperCase()}`}

                                                variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
                                        </div>
                                    </Grid>
                                );
                            } else if (attribute.dob) {
                                return (
                                    <Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
                                        <div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }} >
                                            <TextField id="date" fullWidth value={moment(attribute.dob).format('YYYY-MM-DD')} size="small" name={"dob"} label="D.O.B" type="date" onChange={handleDate} defaultValue={dob} InputLabelProps={{ shrink: true }}
                                            />
                                        </div>
                                    </Grid>

                                )
                            } else if (attribute.cnic) {
                                return (
                                    <Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>

                                        <div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }} >
                                            <TextField required id={`id-${id}`}
                                                key={`user_attribute_data_${i}`}
                                                value={value} name={keys[1]} autoFocus
                                                label={`${keys[1].toUpperCase()}`}
                                                size="small"

                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 13)
                                                }}
                                                type={keys[1] !== 'cnic' ? 'text' : keys[1] === 'cnic' ? 'number' : null}
                                                variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
                                        </div>
                                    </Grid>
                                )
                            }
                            else {
                                console.log(keys[1], 'here i else')

                                return (
                                    <Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
                                        {
                                            (keys[1] !== 'age' && 'dob') ?
                                                (
                                                    <div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }} >
                                                        <TextField required id={`id-${id}`}
                                                            size="small"

                                                            key={`user_attribute_data_${i}`}
                                                            value={value} name={keys[1]} autoFocus
                                                            label={`${keys[1].toUpperCase()}`}
                                                            type={keys[1] !== 'cnic' ? 'text' : keys[1] === 'cnic' ? 'number' : null}
                                                            variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
                                                    </div>
                                                ) :
                                                <div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }} >
                                                    <TextField required id={`id-${id}`}
                                                        key={`user_attribute_data_${i}`}
                                                        size="small"

                                                        value={value} name={keys[1]} autoFocus
                                                        label={`${keys[1].toUpperCase()}`}
                                                        type={'number'}
                                                        onInput={(e) => {
                                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                                                        }}
                                                        variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
                                                </div>

                                        }
                                        {/* <div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }} >
                                        <TextField required id={`id-${id}`}
                                         key={`user_attribute_data_${i}`} 
                                         value={value} name={keys[1]} autoFocus 
                                         label={`${keys[1].toUpperCase()}`} 
                                         type={keys[1] !== 'cnic' ? 'text': keys[1] === 'cnic' ? 'number': null }
                                         variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
                                    </div> */}

                                    </Grid>
                                );
                            }
                        }
                    })}

                    {/* <Grid item md={6} xs={12}>
                    <Button fullWidth variant="contained" color="primary" onClick={_update} style={{ marginTop: 8 }} >
                        Save
                    </Button>
                </Grid> */}
                </Grid>


                <Grid container spacing={2} style={{ marginTop: 10, paddingRight: 15, paddingLeft: 15 }} >
                    <Grid item md={3} xs={12}></Grid>
                    <Grid item md={6} xs={12}>
                        <Button fullWidth variant="contained" color="primary" onClick={_update} style={{ marginTop: 8 }} >
                            Save
                    </Button>
                    </Grid>
                    <Grid item md={3} xs={12}></Grid>
                    <div style={{ height: 500 }}></div>

                </Grid>
            </div>
        </>
    );
};
export default Profile;
