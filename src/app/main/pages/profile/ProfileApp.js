import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Paper from '@material-ui/core/Paper';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import ProfileContent from './ProfileContent'
import Avatar from '@material-ui/core/Avatar';
import picture from './profileImage.png';
import Icon from '@material-ui/core/Icon';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';

// import Widget2 from './widgets/Widget2';
// import WidgetNow from './widgets/WidgetNow';
// import WidgetWeather from './widgets/WidgetWeather';
// import Widget5 from './/widgets/Widget5'
// import BusinessDetails from './forms/BusinessDetails'
// import CreateProfile from './forms/CreateProfile'
// import WhatsAppAcount from './forms/WhatsAppAcount'




// const useStyles = makeStyles({
//     layoutRoot: {},
//     large: {
//         width: theme.spacing(12),
//         height: theme.spacing(12),
//     }
// });

const useStyles = makeStyles((theme) => ({
    layoutRoot: {},
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        
    }
}));



function ProfileApp() {
    const classes = useStyles();
    const pageLayout = useRef(null);
    let [tabValue, setTabValue] = useState(1);
    const [headerData, setHeaderData] = useState('Your Profile');
    const [profileImage, setProfileImage] = React.useState(picture)

    console.log(headerData,'imagesss');


    React.useEffect(() => {
        // rader_chart();
    })
    function handleChangeTab(event, value) {
        setTabValue(tabValue + 1);
    }
    function handleChangeTabBack(event, value) {
        setTabValue(tabValue - 1);
    }
    const updateHeaderData = (data) => {
        console.log("data :" ,  data);
        let nameCapitalized = ''
        let lastname = ''
        if (data.firstName) {
            nameCapitalized = data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1);
        }
        if (data.lastName) {
            lastname = data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1);
        }
        setHeaderData(`${nameCapitalized} ${lastname}`)
        setProfileImage(data.image)
    }
    const updatedProfileImage = (data) => {
        setProfileImage(data)
        console.log('i am called',data)
    }

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
                    // profileData.map((val, id) => {
                    //     if (val.image) {
                    //         val.image = url
                    //         return profileData
                    //     }
                    // })
                    // setProfileData(profileData)
                },
                error => {
                    // console.log("error :  ", error);
                });
        }
    };

    return (
        <FusePageSimple
            classes={{
                root: classes.layoutRoot,
                header: 'min-h-100 h-100',
            }}
            header={
                <div className="flex flex-col justify-between flex-1 px-24 pt-12">
                    {/* <div className="flex justify-between items-start"> */}
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className='image-grid' style={{ marginTop: '10px', marginLeft: '-10px' }}>
                            <Avatar  alt="Remy Sharp"   src={profileImage} className={classes.large} />
                            <span>
                                <input id="contained-button-file" type="file" name="url" style={{   cursor: 'pointer',display: "none" ,marginBottom:'0px'}} onChange={onChangeHandler} accept="image/*" />
                                <label htmlFor="contained-button-file">
                                    <Icon color="action" 
                                    style={{position:'absolute',left:60,top:65}} 
                                    fontSize="small" 
                                    >
                                        linked_camera</Icon>
                                </label>
                            </span>
                        </div>
                        <Typography className="py-20 sm:py-24 ml-6 mt-8 text-16" variant="h6">
                            {headerData}
                        </Typography>
                    </div>
                    {/* </div> */}
                </div>
            }

            content={<ProfileContent onChange={updateHeaderData} updateImage={updatedProfileImage} urlImageHeader={profileImage} />}

        />
    );
}

export default ProfileApp;