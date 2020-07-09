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

    const [profileUsername, setProfileUsername] = React.useState('Your Profile');
    const [profileId, setProfileId] = React.useState('');
    const [profileData, setProfileData] = React.useState([]);
    const [profileImage, setProfileImage] = React.useState(picture)
    const [dob, setDOB] = React.useState(null);



    const { setSnackBarMessage } = props;


    const handleDate = (e) => {
        setDOB(e.target.value)
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
        profileData[7] = { id: "8", image: props.urlImageHeader }

        let data = {
            key: 'id',
            value: profileId,
            attributes: profileData
        }

        console.log(profileData)
        // return
        // urlImageHeader
        CoreHttpHandler.request('profile', 'update', data, response => {
            // setSnackBarMessage("Profile updated successfully", "success");
        },
            error => {
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
            const profileData = response.data.data.attribute;
            const user = JSON.parse(localStorage.getItem('user_data'));

            const nameCapitalized = user.username.charAt(0).toUpperCase() + user.username.slice(1);

            setProfileUsername(`${nameCapitalized}'s Profile`);
            setProfileId(user.id)
            setProfileData(profileData);
            props.onChange(`${nameCapitalized}'s Profile`)

            let image = null
            profileData.map((val, id) => {
                if (val.image) {
                    return image = val.image
                }
            })
            setProfileImage(image)
            props.updateImage(image)

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
                                    <TextField id={`id-${id}`} key={`user_attribute_data_${i}`} value={''} name={keys[1]} autoFocus label={`${keys[1].toUpperCase()}` === 'ADDESS' ? 'ADDRESS' : 'Uzair'} variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
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
                                        <TextField disabled id={`id-${id}`} key={`user_attribute_data_${i}`} value={value} name={keys[1]} autoFocus label={`${keys[1].toUpperCase()}`}

                                            variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
                                    </div>
                                </Grid>
                            );
                        } else if (attribute.dob) {
                            return (
                                <Grid key={`user_attribute_grid_holder_${i}`} item md={6} xs={12}>
                                    <div key={`user_attribute_data_holder_${i}`} style={{ marginBottom: 20 }} >
                                        <TextField id="date" fullWidth
                                            name={"dob"} label="D.O.B" type="date" onChange={handleDate} defaultValue={dob} InputLabelProps={{ shrink: true }}
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

            </Grid>
        </div>
    );
};
export default Profile;