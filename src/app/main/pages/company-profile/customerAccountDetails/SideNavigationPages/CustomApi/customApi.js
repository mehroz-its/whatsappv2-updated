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
import { v4 as uuidv4 } from 'uuid';



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
        try {
            let res = await customApimethod(baseUrl, paramValues, headerValues);
            console.log('resposne --------------------------------------------------------', res.data.data);
            let chatbot = [{
                id: uuidv4(),
                title: "Engro",
                type: "text",
                messages: ["Welcome to engro pakistan, kindly select your language.\n\n?????? ??????? ??? ??? ????? ? ???? ??? ?????? ??? ???????? ????? ?????\n\n1.English\n\n2.Urdu"],
                children: [],
                expanded: true,
                repeatPreviousMessage: true,
                __ref: []
            }]

            let go_back_message = "";
            let language_change_message = "";
            let main_menu = "";
            if (res && res.data && res.data.data.en && res.data.data.en.length > 0) {
                res.data.data.en.forEach((text) => {
                    go_back_message = '\n\nType 0 to go back to previous menu.';
                    language_change_message = '\n\nType 00 for change the language.';
                    main_menu = '\n\nType # to go back to main menu.'
                    let crops = text.crops;
                    let products = text.products;
                    let problems = text.problems;
                    let provinces = text.provinces;
                    let engId = uuidv4();
                    chatbot[0].__ref.push({ key: "1", id: engId });
                    chatbot[0].children.push({
                        id: engId,
                        title: "Eng",
                        type: "text",
                        messages: ["Welcome to engro pakistan, please select the following options.\n\n1. Crops\n2. Products\n3. Problems\n4. Provinces" + go_back_message],
                        children: [],
                        repeatPreviousMessage: true,
                        __ref: []
                    })

                    if (crops && crops.length > 0) {
                        let cropsId = uuidv4();
                        chatbot[0].children[0].__ref.push({ key: "1", id: cropsId });
                        chatbot[0].children[0].children.push({
                            id: cropsId,
                            title: 'crops',
                            type: "text",
                            messages: ["Please select from the following crops.\n"],
                            children: [],
                            repeatPreviousMessage: true,
                            __ref: []
                        })
                        let id = 1;
                        crops.forEach((crop) => {
                            let croppingId = uuidv4()
                            chatbot[0].children[0].children[0].__ref.push({ key: `${id}`, id: croppingId });
                            chatbot[0].children[0].children[0].children.push({
                                id: croppingId,
                                title: crop.crop.name,
                                type: "text",
                                messages: [crop.crop.whatsapp_detail],
                                children: [],
                                repeatPreviousMessage: true,
                                __ref: []
                            })
                            if (crop.attachment && crop.attachment.length > 0) {
                                let attachments = crop.attachment;
                                attachments.forEach((attachment) => {
                                    let crop_path = chatbot[0].children[0].children[0].children[chatbot[0].children[0].children[0].children.length - 1]
                                    if (attachment.attachment_type === '1') {
                                        crop_path.images = [{ URL: attachment.url, caption: crop_path.messages[0] }];
                                        crop_path.type = "image";
                                        crop_path.title = "img";
                                        delete crop_path.messages
                                    } else if (attachment.attachment_type === '3') {
                                        crop_path.messages = [crop_path.messages[0] + '\nKindly check the video for better understanding.\n\n' + attachment.url]
                                    } else if (attachment.attachment_type === '2') {
                                        let audioAttachemt = uuidv4();
                                        crop_path.__next = audioAttachemt;
                                        crop_path.children.push({
                                            id: audioAttachemt,
                                            title: 'audios',
                                            type: "audio",
                                            audio: [{ URL: attachment.url, caption: "" }],
                                            repeatPreviousMessage: true,
                                            __ref: []
                                        })
                                    }
                                })
                            }
                            chatbot[0].children[0].children[0].children[chatbot[0].children[0].children[0].children.length - 1].messages = [chatbot[0].children[0].children[0].children[chatbot[0].children[0].children[0].children.length - 1].messages[0] + go_back_message + language_change_message + main_menu]
                            let gobackId = uuidv4()
                            chatbot[0].children[0].children[0].children[chatbot[0].children[0].children[0].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[0].children[0].children[chatbot[0].children[0].children[0].children.length - 1].__ref.push({ key: "0", id: gobackId });
                            let gobackId1 = uuidv4()
                            chatbot[0].children[0].children[0].children[chatbot[0].children[0].children[0].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 5
                            })
                            chatbot[0].children[0].children[0].children[chatbot[0].children[0].children[0].children.length - 1].__ref.push({ key: "00", id: gobackId1 });
                            let gobackId2 = uuidv4()
                            chatbot[0].children[0].children[0].children[chatbot[0].children[0].children[0].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId2,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 2
                            })
                            chatbot[0].children[0].children[0].children[chatbot[0].children[0].children[0].children.length - 1].__ref.push({ key: "#", id: gobackId2 });
                            chatbot[0].children[0].children[0].messages = [chatbot[0].children[0].children[0].messages[0] + `\n${id}. ` + crop.crop.name]
                            id = id + 1
                        })
                        if (chatbot[0] && chatbot[0].children[0].children[0]) {
                            let upperKey = uuidv4()
                            chatbot[0].children[0].children[0].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[0].children[0].__ref.push({ key: "0", id: upperKey });
                            chatbot[0].children[0].children[0].messages = [chatbot[0].children[0].children[0].messages[0] + go_back_message]

                            let upperkey1 = uuidv4()
                            chatbot[0].children[0].children[0].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperkey1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 4
                            })
                            chatbot[0].children[0].children[0].__ref.push({ key: "00", id: upperkey1 });
                            chatbot[0].children[0].children[0].messages = [chatbot[0].children[0].children[0].messages[0] + language_change_message]
                        }
                    }
                    if (products && products.length > 0) {
                        let productId = uuidv4();
                        chatbot[0].children[0].__ref.push({ key: "2", id: productId });
                        chatbot[0].children[0].children.push({
                            id: productId,
                            title: 'product',
                            type: "text",
                            messages: ["Please select from the following products.\n"],
                            children: [],
                            repeatPreviousMessage: true,
                            __ref: []
                        })
                        let id = 1
                        products.forEach((product) => {
                            let producstId = uuidv4()
                            chatbot[0].children[0].children[1].__ref.push({ key: `${id}`, id: producstId });
                            chatbot[0].children[0].children[1].children.push({
                                id: producstId,
                                title: product.product_category.name,
                                type: "text",
                                messages: ["Please select option from below:\n"],
                                children: [],
                                repeatPreviousMessage: true,
                                __ref: []
                            })
                            if (product && product.product && product.product.length > 0) {
                                let innerProduct = product.product;
                                let innerinc = 1;
                                innerProduct.forEach((productList) => {
                                    let innerId = uuidv4();
                                    chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].__ref.push({ key: `${innerinc}`, id: innerId });
                                    chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].children.push({
                                        id: innerId,
                                        title: productList.name,
                                        type: "text",
                                        messages: [productList.whatsapp_detail],
                                        children: [],
                                        repeatPreviousMessage: true,
                                        __ref: []
                                    })
                                    let path_of_attachment = chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].children[chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].children.length - 1]
                                    if (productList.attachment && productList.attachment.length > 0) {
                                        let attachments = productList.attachment;
                                        attachments.forEach((attachment) => {
                                            if (attachment.attachment_type === '1') {
                                                path_of_attachment.images = [{ URL: attachment.url, caption: path_of_attachment.messages[0] }];
                                                path_of_attachment.type = "image";
                                                path_of_attachment.title = "img";
                                                delete path_of_attachment.messages
                                            } else if (attachment.attachment_type === '3') {
                                                path_of_attachment.messages = [path_of_attachment.messages[0] + '\nKindly check the video for better understanding.\n\n' + attachment.url]
                                            } else if (attachment.attachment_type === '2') {
                                                let audioAttachemt = uuidv4()
                                                path_of_attachment.__next = audioAttachemt;
                                                path_of_attachment.children.push({
                                                    id: audioAttachemt,
                                                    title: 'audios',
                                                    type: "audio",
                                                    audio: [{ URL: attachment.url, caption: "" }],
                                                    repeatPreviousMessage: true,
                                                    __ref: []
                                                })
                                            }
                                        })
                                    }
                                    if (path_of_attachment && path_of_attachment) {
                                        let upperKey = uuidv4()
                                        path_of_attachment.children.push({
                                            actionType: "goBack",
                                            attributes: [],
                                            id: upperKey,
                                            type: "action",
                                            repeatPreviousMessage: true,
                                            steps: 1
                                        })
                                        let upperKey1 = uuidv4()
                                        path_of_attachment.children.push({
                                            actionType: "goBack",
                                            attributes: [],
                                            id: upperKey1,
                                            type: "action",
                                            repeatPreviousMessage: true,
                                            steps: 6
                                        })

                                        let upperKey2 = uuidv4()
                                        path_of_attachment.children.push({
                                            actionType: "goBack",
                                            attributes: [],
                                            id: upperKey2,
                                            type: "action",
                                            repeatPreviousMessage: true,
                                            steps: 3
                                        })
                                        path_of_attachment.messages = [path_of_attachment.messages[0] + go_back_message + language_change_message + main_menu];
                                        path_of_attachment.__ref.push({ key: "0", id: upperKey });
                                        path_of_attachment.__ref.push({ key: "00", id: upperKey1 });
                                        path_of_attachment.__ref.push({ key: "#", id: upperKey2 });
                                    }
                                    chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].messages = [chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].messages[0] + `\n${innerinc}. ` + productList.name]
                                    innerinc = innerinc + 1;
                                })


                            }
                            chatbot[0].children[0].children[1].messages = [chatbot[0].children[0].children[1].messages[0] + `\n${id}. ` + product.product_category.name]
                            if (chatbot[0] && chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1]) {
                                let upperKey = uuidv4()
                                chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].children.push({
                                    actionType: "goBack",
                                    attributes: [],
                                    id: upperKey,
                                    type: "action",
                                    repeatPreviousMessage: true,
                                    steps: 1
                                })
                                let upperKey1 = uuidv4()
                                chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].children.push({
                                    actionType: "goBack",
                                    attributes: [],
                                    id: upperKey1,
                                    type: "action",
                                    repeatPreviousMessage: true,
                                    steps: 5
                                })
                                let upperKey2 = uuidv4()
                                chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].children.push({
                                    actionType: "goBack",
                                    attributes: [],
                                    id: upperKey2,
                                    type: "action",
                                    repeatPreviousMessage: true,
                                    steps: 2
                                })
                                chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].messages = [chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].messages[0] + go_back_message + language_change_message + main_menu]
                                chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].__ref.push({ key: "0", id: upperKey });
                                chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].__ref.push({ key: "00", id: upperKey1 });
                                chatbot[0].children[0].children[1].children[chatbot[0].children[0].children[1].children.length - 1].__ref.push({ key: "#", id: upperKey2 });
                            }
                            id = id + 1
                        })

                        if (chatbot[0] && chatbot[0].children[0].children[1]) {
                            let upperKey = uuidv4()
                            chatbot[0].children[0].children[1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[0].children[1].__ref.push({ key: "0", id: upperKey });
                            let upperKey1 = uuidv4()
                            chatbot[0].children[0].children[1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 4
                            })
                            chatbot[0].children[0].children[1].__ref.push({ key: "00", id: upperKey1 });
                            chatbot[0].children[0].children[1].messages = [chatbot[0].children[0].children[1].messages[0] + go_back_message + language_change_message]
                        }
                    }
                    if (problems && problems.length > 0) {
                        let problemsId = uuidv4();
                        chatbot[0].children[0].__ref.push({ key: "3", id: problemsId });
                        chatbot[0].children[0].children.push({
                            id: problemsId,
                            title: 'problems',
                            type: "text",
                            messages: ["Please select from the following problems.\n"],
                            children: [],
                            repeatPreviousMessage: true,
                            __ref: []
                        })
                        let id = 1
                        problems.forEach((problem) => {
                            let problemsId = uuidv4();
                            chatbot[0].children[0].children[2].__ref.push({ key: `${id}`, id: problemsId });
                            chatbot[0].children[0].children[2].children.push({
                                id: problemsId,
                                title: problem.problem.name,
                                type: "text",
                                messages: [problem.problem.whatsapp_detail],
                                children: [],
                                repeatPreviousMessage: true,
                                __ref: []
                            })
                            if (problem.attachment && problem.attachment.length > 0) {
                                let attachments = problem.attachment;
                                attachments.forEach((attachment) => {
                                    let crop_path = chatbot[0].children[0].children[2].children[chatbot[0].children[0].children[2].children.length - 1]
                                    if (attachment.attachment_type === '1') {
                                        crop_path.images = [{ URL: attachment.url, caption: crop_path.messages[0] }];
                                        crop_path.type = "image";
                                        crop_path.title = "img";
                                        delete crop_path.messages
                                    } else if (attachment.attachment_type === '3') {
                                        crop_path.messages = [crop_path.messages[0] + '\nKindly check the video for better understanding.\n\n' + attachment.url]
                                    } else if (attachment.attachment_type === '2') {
                                        let audioAttachemt = uuidv4()
                                        crop_path.__next = audioAttachemt;
                                        crop_path.children.push({
                                            id: audioAttachemt,
                                            title: 'audios',
                                            type: "audio",
                                            audio: [{ URL: attachment.url, caption: "" }],
                                            repeatPreviousMessage: true,
                                            __ref: []
                                        })
                                    }
                                })
                            }
                            chatbot[0].children[0].children[2].children[chatbot[0].children[0].children[2].children.length - 1].messages = [chatbot[0].children[0].children[2].children[chatbot[0].children[0].children[2].children.length - 1].messages[0] + go_back_message + language_change_message + main_menu]
                            let gobackId = uuidv4()
                            chatbot[0].children[0].children[2].children[chatbot[0].children[0].children[2].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[0].children[2].children[chatbot[0].children[0].children[2].children.length - 1].__ref.push({ key: "0", id: gobackId });
                            let gobackId1 = uuidv4()
                            chatbot[0].children[0].children[2].children[chatbot[0].children[0].children[2].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 5
                            })
                            chatbot[0].children[0].children[2].children[chatbot[0].children[0].children[2].children.length - 1].__ref.push({ key: "00", id: gobackId1 });
                            let gobackId2 = uuidv4()
                            chatbot[0].children[0].children[2].children[chatbot[0].children[0].children[2].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId2,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 2
                            })
                            chatbot[0].children[0].children[2].children[chatbot[0].children[0].children[2].children.length - 1].__ref.push({ key: "#", id: gobackId2 });
                            chatbot[0].children[0].children[2].messages = [chatbot[0].children[0].children[2].messages[0] + `\n${id}. ` + problem.problem.name]
                            id = id + 1
                        })
                        if (chatbot[0] && chatbot[0].children[0].children[2]) {
                            let upperKey = uuidv4()
                            chatbot[0].children[0].children[2].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[0].children[2].__ref.push({ key: "0", id: upperKey });
                            let upperKey1 = uuidv4()
                            chatbot[0].children[0].children[2].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 4
                            })
                            chatbot[0].children[0].children[2].__ref.push({ key: "00", id: upperKey1 });
                            chatbot[0].children[0].children[2].messages = [chatbot[0].children[0].children[2].messages[0] + go_back_message + language_change_message]
                        }
                    }
                    if (provinces && provinces.length > 0) {
                        let provinceId = uuidv4();
                        chatbot[0].children[0].__ref.push({ key: "4", id: provinceId })
                        chatbot[0].children[0].children.push({
                            id: provinceId,
                            title: 'dealer',
                            type: "text",
                            messages: ["Please select one of the following options.\n"],
                            children: [],
                            repeatPreviousMessage: true,
                            __ref: []
                        })
                        let id = 1
                        provinces.forEach((province) => {
                            let provincesId = uuidv4();
                            chatbot[0].children[0].children[3].__ref.push({ key: `${id}`, id: provincesId });
                            chatbot[0].children[0].children[3].children.push({
                                id: provincesId,
                                title: province.province.name,
                                type: "text",
                                messages: ["Please select from below options.\n"],
                                children: [],
                                repeatPreviousMessage: true,
                                __ref: []
                            })
                            if (province.districts && province.districts.length > 0) {
                                let districts = province.districts;

                                let innerinc = 1;
                                districts.forEach((district) => {
                                    let innerId = uuidv4();
                                    chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].__ref.push({ key: `${innerinc}`, id: innerId });
                                    chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].children.push({
                                        id: innerId,
                                        title: district.name,
                                        type: "text",
                                        messages: ["Please select one of the following options for territories:"],
                                        children: [],
                                        repeatPreviousMessage: true,
                                        __ref: []
                                    })
                                    let district_length = [];
                                    let newterritory = [];
                                    if (district.territories && district.territories.length > 0) {
                                        district_length = chatbot[0].children[0].children[3].children.length;
                                        newterritory = chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].children.length - 1;
                                        let territories = district.territories;
                                        let indisc = 1;

                                        territories.forEach((territorie) => {
                                            let innerterri = uuidv4()
                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].__ref.push({ key: `${indisc}`, id: innerterri });
                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].children.push({
                                                id: innerterri,
                                                title: territorie.name,
                                                type: "text",
                                                messages: ["Please select one of the following options for business category.\n"],
                                                children: [],
                                                repeatPreviousMessage: true,
                                                __ref: []
                                            })

                                            let path = chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].children[chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].children.length - 1];
                                            if (territorie.business_category && territorie.business_category.length > 0) {
                                                let business_categories = territorie.business_category;
                                                let businessInc = 1;

                                                business_categories.forEach((business_category) => {
                                                    let businessId = uuidv4();
                                                    path.__ref.push({ key: `${businessInc}`, id: businessId });
                                                    path.children.push({
                                                        id: businessId,
                                                        title: business_category.name,
                                                        type: "text",
                                                        messages: [`${business_category.whatsapp_detail}\n`],
                                                        children: [],
                                                        repeatPreviousMessage: true,
                                                        __ref: []
                                                    })
                                                    if (business_category && business_category.dealer_list && business_category.dealer_list.length > 0) {
                                                        let dealers_list = business_category.dealer_list;
                                                        let dealer_list_inc = 1;
                                                        path.children[path.children.length - 1].messages = [path.children[path.children.length - 1].messages[0] + "\nPlease select one of the following dealer.\n"]
                                                        dealers_list.forEach((dealer_list) => {
                                                            let dealerId = uuidv4();
                                                            path.children[path.children.length - 1].__ref.push({ key: `${dealer_list_inc}`, id: dealerId });
                                                            path.children[path.children.length - 1].children.push({
                                                                id: dealerId,
                                                                title: dealer_list.name,
                                                                type: "image",
                                                                images: [{ URL: dealer_list.image, caption: `Name: ${dealer_list.name}\nAddress: ${dealer_list.address}\nMobile Number: ${dealer_list.mobile_number}` }],
                                                                children: [],
                                                                repeatPreviousMessage: true,
                                                                __ref: []
                                                            })
                                                            let childrenId = uuidv4();
                                                            let childrenId1 = uuidv4();
                                                            let childrenId2 = uuidv4()
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].images[0].caption = path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].images[0].caption + go_back_message + language_change_message + main_menu
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].children.push({
                                                                actionType: "goBack",
                                                                attributes: [],
                                                                id: childrenId,
                                                                type: "action",
                                                                repeatPreviousMessage: true,
                                                                steps: 1
                                                            })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].__ref.push({ key: "0", id: childrenId })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].children.push({
                                                                actionType: "goBack",
                                                                attributes: [],
                                                                id: childrenId1,
                                                                type: "action",
                                                                repeatPreviousMessage: true,
                                                                steps: 9
                                                            })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].__ref.push({ key: "00", id: childrenId1 })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].children.push({
                                                                actionType: "goBack",
                                                                attributes: [],
                                                                id: childrenId2,
                                                                type: "action",
                                                                repeatPreviousMessage: true,
                                                                steps: 6
                                                            })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].__ref.push({ key: "#", id: childrenId2 })
                                                            path.children[path.children.length - 1].messages = [path.children[path.children.length - 1].messages[0] + `\n${dealer_list_inc}. ` + dealer_list.name]
                                                            dealer_list_inc = dealer_list_inc + 1;
                                                        })
                                                    }

                                                    let business_go_back1 = uuidv4();
                                                    path.children[path.children.length - 1].children.push({
                                                        actionType: "goBack",
                                                        attributes: [],
                                                        id: business_go_back1,
                                                        type: "action",
                                                        repeatPreviousMessage: true,
                                                        steps: 1
                                                    });

                                                    let business_go_back2 = uuidv4();
                                                    path.children[path.children.length - 1].children.push({
                                                        actionType: "goBack",
                                                        attributes: [],
                                                        id: business_go_back2,
                                                        type: "action",
                                                        repeatPreviousMessage: true,
                                                        steps: 8
                                                    });

                                                    let business_go_1 = uuidv4();
                                                    path.children[path.children.length - 1].children.push({
                                                        actionType: "goBack",
                                                        attributes: [],
                                                        id: business_go_1,
                                                        type: "action",
                                                        repeatPreviousMessage: true,
                                                        steps: 5
                                                    });

                                                    path.children[path.children.length - 1].__ref.push({ key: "0", id: business_go_back1 });
                                                    path.children[path.children.length - 1].__ref.push({ key: "00", id: business_go_back2 });
                                                    path.children[path.children.length - 1].__ref.push({ key: "#", id: business_go_1 });
                                                    path.children[path.children.length - 1].messages = [path.children[path.children.length - 1].messages[0] + go_back_message + language_change_message + main_menu];

                                                    path.messages = [path.messages[0] + `\n${businessInc}. ` + business_category.name]
                                                    businessInc = businessInc + 1;
                                                })
                                            }
                                            let business_go_back = uuidv4();
                                            path.children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: business_go_back,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 1
                                            });

                                            let business_go = uuidv4();
                                            path.children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: business_go,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 7
                                            });

                                            let business_main = uuidv4();
                                            path.children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: business_main,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 4
                                            });

                                            path.__ref.push({ key: "0", id: business_go_back });
                                            path.__ref.push({ key: "00", id: business_go });
                                            path.__ref.push({ key: "#", id: business_main });
                                            path.messages = [path.messages[0] + go_back_message + language_change_message + main_menu];

                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].messages = [chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].messages[0] + `\n${indisc}. ` + territorie.name]
                                            indisc = indisc + 1;
                                        })
                                        if (chatbot[0] && chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory]) {
                                            let upperKey = uuidv4()
                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: upperKey,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 1
                                            })
                                            let upperKey1 = uuidv4()
                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: upperKey1,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 6
                                            })

                                            let upperKey2 = uuidv4()
                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: upperKey2,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 3
                                            })
                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].messages = [chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].messages[0] + go_back_message + language_change_message + main_menu]
                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].__ref.push({ key: "0", id: upperKey });
                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].__ref.push({ key: "00", id: upperKey1 });
                                            chatbot[0].children[0].children[3].children[district_length - 1].children[newterritory].__ref.push({ key: "#", id: upperKey2 });
                                        }
                                    }

                                    chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].messages = [chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].messages[0] + `\n${innerinc}. ` + district.name]
                                    innerinc = innerinc + 1;
                                })
                                if (chatbot[0] && chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1]) {
                                    let upperKey = uuidv4()
                                    chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].children.push({
                                        actionType: "goBack",
                                        attributes: [],
                                        id: upperKey,
                                        type: "action",
                                        repeatPreviousMessage: true,
                                        steps: 1
                                    })
                                    chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].__ref.push({ key: "0", id: upperKey });
                                    let upperKey1 = uuidv4()
                                    chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].children.push({
                                        actionType: "goBack",
                                        attributes: [],
                                        id: upperKey1,
                                        type: "action",
                                        repeatPreviousMessage: true,
                                        steps: 5
                                    })
                                    chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].__ref.push({ key: "00", id: upperKey1 });

                                    let upperKey2 = uuidv4()
                                    chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].children.push({
                                        actionType: "goBack",
                                        attributes: [],
                                        id: upperKey2,
                                        type: "action",
                                        repeatPreviousMessage: true,
                                        steps: 2
                                    })
                                    chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].__ref.push({ key: "#", id: upperKey2 });
                                }
                            }
                            chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].messages = [chatbot[0].children[0].children[3].children[chatbot[0].children[0].children[3].children.length - 1].messages[0] + go_back_message + language_change_message + main_menu]
                            chatbot[0].children[0].children[3].messages = [chatbot[0].children[0].children[3].messages[0] + `\n${id}. ` + province.province.name]
                            id = id + 1
                        })

                        if (chatbot[0] && chatbot[0].children[0].children[3]) {
                            let upperKey = uuidv4()
                            chatbot[0].children[0].children[3].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[0].children[3].__ref.push({ key: "0", id: upperKey });
                            let upperKey1 = uuidv4()
                            chatbot[0].children[0].children[3].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 4
                            })
                            chatbot[0].children[0].children[3].__ref.push({ key: "00", id: upperKey });
                            chatbot[0].children[0].children[3].messages = [chatbot[0].children[0].children[3].messages[0] + go_back_message + language_change_message]
                        }
                    }

                    let gobackkeymain = uuidv4()
                    chatbot[0].children[0].children.push({
                        actionType: "goBack",
                        title: "forMenu",
                        attributes: [],
                        id: gobackkeymain,
                        type: "action",
                        repeatPreviousMessage: true,
                        steps: 2
                    });
                    chatbot[0].children[0].__ref.push({ key: "0", id: gobackkeymain });

                })
            }
            if (res && res.data && res.data.data.ur && res.data.data.ur.length > 0) {
                res.data.data.ur.forEach((text) => {
                    go_back_message = '\n\nپچھلے مینو پر واپس جانے کے لئے# جواب دیں'
                    language_change_message = '\n\nزبان تبدیل کرنے کے لئے 00 جواب دیں'
                    main_menu = "\n\nمین مینو پر واپس جانے کے لئے 0 کا جواب دیں"
                    let crops = text.crops;
                    let products = text.products;
                    let problems = text.problems;
                    let provinces = text.provinces;
                    let engId = uuidv4();
                    chatbot[0].__ref.push({ key: "2", id: engId });
                    chatbot[0].children.push({
                        id: engId,
                        title: "Ur",
                        type: "text",
                        messages: ["اینگرو فرٹیلاءز میں خوش آمدید\n\n1. براہ کرم زمرہ منتخب کرنے کے لئے ذیل میں ذکر \n2. کردہ سابقہ کے ساتھ جواب دیں\n3." + go_back_message],
                        children: [],
                        repeatPreviousMessage: true,
                        __ref: []
                    })

                    if (crops && crops.length > 0) {
                        let cropsId = uuidv4();
                        chatbot[0].children[1].__ref.push({ key: "1", id: cropsId });
                        chatbot[0].children[1].children.push({
                            id: cropsId,
                            title: 'crops',
                            type: "text",
                            messages: ["براہ کرم خواہش کی فصل کو منتخب کرنے کے لئے نیچے دیئے گئے ماقبل کے ساتھ جواب دیں\n"],
                            children: [],
                            repeatPreviousMessage: true,
                            __ref: []
                        })
                        let id = 1;
                        crops.forEach((crop) => {
                            let croppingId = uuidv4()
                            chatbot[0].children[1].children[0].__ref.push({ key: `${id}`, id: croppingId });
                            chatbot[0].children[1].children[0].children.push({
                                id: croppingId,
                                title: crop.crop.name,
                                type: "text",
                                messages: [crop.crop.whatsapp_detail],
                                children: [],
                                repeatPreviousMessage: true,
                                __ref: []
                            })
                            if (crop.attachment && crop.attachment.length > 0) {
                                let attachments = crop.attachment;
                                attachments.forEach((attachment) => {
                                    let crop_path = chatbot[0].children[1].children[0].children[chatbot[0].children[1].children[0].children.length - 1]
                                    if (attachment.attachment_type === '1') {
                                        crop_path.images = [{ URL: attachment.url, caption: crop_path.messages[0] }];
                                        crop_path.type = "image";
                                        crop_path.title = "img";
                                        delete crop_path.messages
                                    } else if (attachment.attachment_type === '3') {
                                        crop_path.messages = [crop_path.messages[0] + '\nبراہ کرم بہتر تفہیم کے لئے ویڈیو چیک کریں\n\n' + attachment.url]
                                    } else if (attachment.attachment_type === '2') {
                                        let audioAttachemt = uuidv4();
                                        crop_path.__next = audioAttachemt;
                                        crop_path.children.push({
                                            id: audioAttachemt,
                                            title: 'audios',
                                            type: "audio",
                                            audio: [{ URL: attachment.url, caption: "" }],
                                            repeatPreviousMessage: true,
                                            __ref: []
                                        })
                                    }
                                })
                            }
                            chatbot[0].children[1].children[0].children[chatbot[0].children[1].children[0].children.length - 1].messages = [chatbot[0].children[1].children[0].children[chatbot[0].children[1].children[0].children.length - 1].messages[0] + go_back_message + language_change_message + main_menu]
                            let gobackId = uuidv4()
                            chatbot[0].children[1].children[0].children[chatbot[0].children[1].children[0].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[1].children[0].children[chatbot[0].children[1].children[0].children.length - 1].__ref.push({ key: "0", id: gobackId });

                            let gobackId1 = uuidv4()
                            chatbot[0].children[1].children[0].children[chatbot[0].children[1].children[0].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 5
                            })
                            chatbot[0].children[1].children[0].children[chatbot[0].children[1].children[0].children.length - 1].__ref.push({ key: "00", id: gobackId1 });
                            let gobackId2 = uuidv4()
                            chatbot[0].children[1].children[0].children[chatbot[0].children[1].children[0].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId2,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 2
                            })
                            chatbot[0].children[1].children[0].children[chatbot[0].children[1].children[0].children.length - 1].__ref.push({ key: "#", id: gobackId2 });
                            chatbot[0].children[1].children[0].messages = [chatbot[0].children[1].children[0].messages[0] + `\n${id}. ` + crop.crop.name]
                            id = id + 1
                        })
                        if (chatbot[0] && chatbot[0].children[1].children[0]) {
                            let upperKey = uuidv4()
                            chatbot[0].children[1].children[0].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[1].children[0].__ref.push({ key: "0", id: upperKey });
                            let upperKey1 = uuidv4()
                            chatbot[0].children[1].children[0].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 4
                            })
                            chatbot[0].children[1].children[0].__ref.push({ key: "00", id: upperKey1 });
                            chatbot[0].children[1].children[0].messages = [chatbot[0].children[1].children[0].messages[0] + go_back_message + language_change_message]
                        }
                    }
                    if (products && products.length > 0) {
                        let productId = uuidv4();
                        chatbot[0].children[1].__ref.push({ key: "2", id: productId });
                        chatbot[0].children[1].children.push({
                            id: productId,
                            title: 'product',
                            type: "text",
                            messages: ["براہ کرم خواہش کی مصنوعات کو منتخب کرنے کے لئے نیچے دیئے گئے ماقبل کے ساتھ جواب دیں\n"],
                            children: [],
                            repeatPreviousMessage: true,
                            __ref: []
                        })
                        let id = 1
                        products.forEach((product) => {
                            let producstId = uuidv4()
                            chatbot[0].children[1].children[1].__ref.push({ key: `${id}`, id: producstId });
                            chatbot[0].children[1].children[1].children.push({
                                id: producstId,
                                title: product.product_category.name,
                                type: "text",
                                messages: ["براہ کرم خواہش کی مصنوعات کو منتخب کرنے کے لئے نیچے دیئے گئے ماقبل کے ساتھ جواب دیں\n"],
                                children: [],
                                repeatPreviousMessage: true,
                                __ref: []
                            })
                            if (product && product.product && product.product.length > 0) {
                                let innerProduct = product.product;
                                let innerinc = 1;
                                innerProduct.forEach((productList) => {
                                    let innerId = uuidv4();
                                    chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].__ref.push({ key: `${innerinc}`, id: innerId });
                                    chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].children.push({
                                        id: innerId,
                                        title: productList.name,
                                        type: "text",
                                        messages: [productList.whatsapp_detail],
                                        children: [],
                                        repeatPreviousMessage: true,
                                        __ref: []
                                    })
                                    let path_of_attachment = chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].children[chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].children.length - 1]
                                    if (productList.attachment && productList.attachment.length > 0) {
                                        let attachments = productList.attachment;
                                        attachments.forEach((attachment) => {
                                            if (attachment.attachment_type === '1') {
                                                path_of_attachment.images = [{ URL: attachment.url, caption: path_of_attachment.messages[0] }];
                                                path_of_attachment.type = "image";
                                                path_of_attachment.title = "img";
                                                delete path_of_attachment.messages
                                            } else if (attachment.attachment_type === '3') {
                                                path_of_attachment.messages = [path_of_attachment.messages[0] + '\nبراہ کرم بہتر تفہیم کے لئے ویڈیو چیک کریں\n\n' + attachment.url]
                                            } else if (attachment.attachment_type === '2') {
                                                let audioAttachemt = uuidv4()
                                                path_of_attachment.__next = audioAttachemt;
                                                path_of_attachment.children.push({
                                                    id: audioAttachemt,
                                                    title: 'audios',
                                                    type: "audio",
                                                    audio: [{ URL: attachment.url, caption: "" }],
                                                    repeatPreviousMessage: true,
                                                    __ref: []
                                                })
                                            }
                                        })
                                    }
                                    if (path_of_attachment && path_of_attachment) {
                                        let upperKey = uuidv4()
                                        path_of_attachment.children.push({
                                            actionType: "goBack",
                                            attributes: [],
                                            id: upperKey,
                                            type: "action",
                                            repeatPreviousMessage: true,
                                            steps: 1
                                        })
                                        let upperKey1 = uuidv4()
                                        path_of_attachment.children.push({
                                            actionType: "goBack",
                                            attributes: [],
                                            id: upperKey1,
                                            type: "action",
                                            repeatPreviousMessage: true,
                                            steps: 6
                                        })
                                        let upperKey2 = uuidv4()
                                        path_of_attachment.children.push({
                                            actionType: "goBack",
                                            attributes: [],
                                            id: upperKey2,
                                            type: "action",
                                            repeatPreviousMessage: true,
                                            steps: 3
                                        })
                                        path_of_attachment.messages = [path_of_attachment.messages[0] + go_back_message + language_change_message + main_menu];
                                        path_of_attachment.__ref.push({ key: "0", id: upperKey });
                                        path_of_attachment.__ref.push({ key: "00", id: upperKey1 });
                                        path_of_attachment.__ref.push({ key: "#", id: upperKey2 });
                                    }
                                    chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].messages = [chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].messages[0] + `\n${innerinc}. ` + productList.name]
                                    innerinc = innerinc + 1;
                                })


                            }
                            chatbot[0].children[1].children[1].messages = [chatbot[0].children[1].children[1].messages[0] + `\n${id}. ` + product.product_category.name]
                            if (chatbot[0] && chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1]) {
                                let upperKey = uuidv4()
                                chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].children.push({
                                    actionType: "goBack",
                                    attributes: [],
                                    id: upperKey,
                                    type: "action",
                                    repeatPreviousMessage: true,
                                    steps: 1
                                })
                                let upperKey1 = uuidv4()
                                chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].children.push({
                                    actionType: "goBack",
                                    attributes: [],
                                    id: upperKey1,
                                    type: "action",
                                    repeatPreviousMessage: true,
                                    steps: 5
                                })
                                let upperKey2 = uuidv4()
                                chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].children.push({
                                    actionType: "goBack",
                                    attributes: [],
                                    id: upperKey2,
                                    type: "action",
                                    repeatPreviousMessage: true,
                                    steps: 2
                                })
                                chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].messages = [chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].messages[0] + go_back_message + language_change_message + main_menu]
                                chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].__ref.push({ key: "0", id: upperKey });
                                chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].__ref.push({ key: "00", id: upperKey1 });
                                chatbot[0].children[1].children[1].children[chatbot[0].children[1].children[1].children.length - 1].__ref.push({ key: "#", id: upperKey2 });
                            }
                            id = id + 1
                        })

                        if (chatbot[0] && chatbot[0].children[1].children[1]) {
                            let upperKey = uuidv4()
                            chatbot[0].children[1].children[1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[1].children[1].__ref.push({ key: "0", id: upperKey });
                            let upperKey1 = uuidv4()
                            chatbot[0].children[1].children[1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 4
                            })
                            chatbot[0].children[1].children[1].__ref.push({ key: "00", id: upperKey1 });
                            chatbot[0].children[1].children[1].messages = [chatbot[0].children[1].children[1].messages[0] + go_back_message + language_change_message]
                        }
                    }
                    if (problems && problems.length > 0) {
                        let problemsId = uuidv4();
                        chatbot[0].children[1].__ref.push({ key: "3", id: problemsId });
                        chatbot[0].children[1].children.push({
                            id: problemsId,
                            title: 'problems',
                            type: "text",
                            messages: ["براہ کرم خواہش کے مسئلے کو منتخب کرنے کے لئے نیچے دیئے گئے ماقبل کے ساتھ جواب دیں\n"],
                            children: [],
                            repeatPreviousMessage: true,
                            __ref: []
                        })
                        let id = 1
                        problems.forEach((problem) => {
                            let problemsId = uuidv4();
                            chatbot[0].children[1].children[2].__ref.push({ key: `${id}`, id: problemsId });
                            chatbot[0].children[1].children[2].children.push({
                                id: problemsId,
                                title: problem.problem.name,
                                type: "text",
                                messages: [problem.problem.whatsapp_detail],
                                children: [],
                                repeatPreviousMessage: true,
                                __ref: []
                            })
                            if (problem.attachment && problem.attachment.length > 0) {
                                let attachments = problem.attachment;
                                attachments.forEach((attachment) => {
                                    let crop_path = chatbot[0].children[1].children[2].children[chatbot[0].children[1].children[2].children.length - 1]
                                    if (attachment.attachment_type === '1') {
                                        crop_path.images = [{ URL: attachment.url, caption: crop_path.messages[0] }];
                                        crop_path.type = "image";
                                        crop_path.title = "img";
                                        delete crop_path.messages
                                    } else if (attachment.attachment_type === '3') {
                                        crop_path.messages = [crop_path.messages[0] + '\nبراہ کرم بہتر تفہیم کے لئے ویڈیو چیک کریں\n\n' + attachment.url]
                                    } else if (attachment.attachment_type === '2') {
                                        let audioAttachemt = uuidv4()
                                        crop_path.__next = audioAttachemt;
                                        crop_path.children.push({
                                            id: audioAttachemt,
                                            title: 'audios',
                                            type: "audio",
                                            audio: [{ URL: attachment.url, caption: "" }],
                                            repeatPreviousMessage: true,
                                            __ref: []
                                        })
                                    }
                                })
                            }
                            chatbot[0].children[1].children[2].children[chatbot[0].children[1].children[2].children.length - 1].messages = [chatbot[0].children[1].children[2].children[chatbot[0].children[1].children[2].children.length - 1].messages[0] + go_back_message + language_change_message + main_menu]
                            let gobackId = uuidv4()
                            chatbot[0].children[1].children[2].children[chatbot[0].children[1].children[2].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[1].children[2].children[chatbot[0].children[1].children[2].children.length - 1].__ref.push({ key: "0", id: gobackId });
                            let gobackId1 = uuidv4()
                            chatbot[0].children[1].children[2].children[chatbot[0].children[1].children[2].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 5
                            })
                            chatbot[0].children[1].children[2].children[chatbot[0].children[1].children[2].children.length - 1].__ref.push({ key: "00", id: gobackId1 });
                            let gobackId2 = uuidv4()
                            chatbot[0].children[1].children[2].children[chatbot[0].children[1].children[2].children.length - 1].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: gobackId2,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 2
                            })
                            chatbot[0].children[1].children[2].children[chatbot[0].children[1].children[2].children.length - 1].__ref.push({ key: "#", id: gobackId2 });
                            chatbot[0].children[1].children[2].messages = [chatbot[0].children[1].children[2].messages[0] + `\n${id}. ` + problem.problem.name]
                            id = id + 1
                        })
                        if (chatbot[0] && chatbot[0].children[1].children[2]) {
                            let upperKey = uuidv4()
                            chatbot[0].children[1].children[2].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[1].children[2].__ref.push({ key: "0", id: upperKey });
                            let upperKey1 = uuidv4()
                            chatbot[0].children[1].children[2].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 4
                            })
                            chatbot[0].children[1].children[2].__ref.push({ key: "00", id: upperKey1 });
                            chatbot[0].children[1].children[2].messages = [chatbot[0].children[1].children[2].messages[0] + go_back_message + language_change_message]
                        }
                    }
                    if (provinces && provinces.length > 0) {
                        let provinceId = uuidv4();
                        chatbot[0].children[1].__ref.push({ key: "4", id: provinceId })
                        chatbot[0].children[1].children.push({
                            id: provinceId,
                            title: 'province',
                            type: "text",
                            messages: ["مطلوبہ صوبہ منتخب کرنے کے لئے براہ کرم ذیل میں دیئے گئے ماقبل کے ساتھ جواب دیں\n"],
                            children: [],
                            repeatPreviousMessage: true,
                            __ref: []
                        })
                        let id = 1
                        provinces.forEach((province) => {
                            let provincesId = uuidv4();
                            chatbot[0].children[1].children[3].__ref.push({ key: `${id}`, id: provincesId });
                            chatbot[0].children[1].children[3].children.push({
                                id: provincesId,
                                title: province.province.name,
                                type: "text",
                                messages: ["مطلوبہ ضلع کو منتخب کرنے کے لئے براہ کرم ذیل میں ذکر کردہ سابقے کے ساتھ جواب دیں\n"],
                                children: [],
                                repeatPreviousMessage: true,
                                __ref: []
                            })
                            if (province.districts && province.districts.length > 0) {
                                let districts = province.districts;

                                let innerinc = 1;
                                districts.forEach((district) => {
                                    let innerId = uuidv4();
                                    chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].__ref.push({ key: `${innerinc}`, id: innerId });
                                    chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].children.push({
                                        id: innerId,
                                        title: district.name,
                                        type: "text",
                                        messages: ["مطلوبہ علاقہ منتخب کرنے کے لئے براہ کرم ذیل میں ذکر کردہ سابقے کے ساتھ جواب دیں"],
                                        children: [],
                                        repeatPreviousMessage: true,
                                        __ref: []
                                    })
                                    let district_length = [];
                                    let newterritory = [];
                                    if (district.territories && district.territories.length > 0) {
                                        district_length = chatbot[0].children[1].children[3].children.length;
                                        newterritory = chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].children.length - 1;
                                        let territories = district.territories;
                                        let indisc = 1;

                                        territories.forEach((territorie) => {
                                            let innerterri = uuidv4()
                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].__ref.push({ key: `${indisc}`, id: innerterri });
                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].children.push({
                                                id: innerterri,
                                                title: territorie.name,
                                                type: "text",
                                                messages: ["مطلوبہ ڈیلر کو منتخب کرنے کے لئے براہ کرم ذیل میں ذکر کردہ سابقے کے ساتھ جواب دیں\n"],
                                                children: [],
                                                repeatPreviousMessage: true,
                                                __ref: []
                                            })

                                            let path = chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].children[chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].children.length - 1];
                                            if (territorie.business_category && territorie.business_category.length > 0) {
                                                let business_categories = territorie.business_category;
                                                let businessInc = 1;

                                                business_categories.forEach((business_category) => {
                                                    let businessId = uuidv4();
                                                    path.__ref.push({ key: `${businessInc}`, id: businessId });
                                                    path.children.push({
                                                        id: businessId,
                                                        title: business_category.name,
                                                        type: "text",
                                                        messages: [`${business_category.whatsapp_detail}\n`],
                                                        children: [],
                                                        repeatPreviousMessage: true,
                                                        __ref: []
                                                    })
                                                    if (business_category && business_category.dealer_list && business_category.dealer_list.length > 0) {
                                                        let dealers_list = business_category.dealer_list;
                                                        let dealer_list_inc = 1;
                                                        path.children[path.children.length - 1].messages = [path.children[path.children.length - 1].messages[0] + "\n???? ??? ??? ??? ??? ?? ??? ???? ?? ????? ?????\n"]
                                                        dealers_list.forEach((dealer_list) => {
                                                            let dealerId = uuidv4();
                                                            path.children[path.children.length - 1].__ref.push({ key: `${dealer_list_inc}`, id: dealerId });
                                                            path.children[path.children.length - 1].children.push({
                                                                id: dealerId,
                                                                title: dealer_list.name,
                                                                type: "image",
                                                                images: [{ URL: dealer_list.image, caption: `???: ${dealer_list.name}\n???: ${dealer_list.address}\n?????? ????: ${dealer_list.mobile_number}` }],
                                                                children: [],
                                                                repeatPreviousMessage: true,
                                                                __ref: []
                                                            })
                                                            let childrenId = uuidv4()
                                                            let childrenId1 = uuidv4()
                                                            let childrenId2 = uuidv4()
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].images[0].caption = path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].images[0].caption + go_back_message + language_change_message + main_menu
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].children.push({
                                                                actionType: "goBack",
                                                                attributes: [],
                                                                id: childrenId,
                                                                type: "action",
                                                                repeatPreviousMessage: true,
                                                                steps: 1
                                                            })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].__ref.push({ key: "0", id: childrenId })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].children.push({
                                                                actionType: "goBack",
                                                                attributes: [],
                                                                id: childrenId1,
                                                                type: "action",
                                                                repeatPreviousMessage: true,
                                                                steps: 9
                                                            })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].__ref.push({ key: "00", id: childrenId1 })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].children.push({
                                                                actionType: "goBack",
                                                                attributes: [],
                                                                id: childrenId2,
                                                                type: "action",
                                                                repeatPreviousMessage: true,
                                                                steps: 6
                                                            })
                                                            path.children[path.children.length - 1].children[path.children[path.children.length - 1].children.length - 1].__ref.push({ key: "#", id: childrenId2 })
                                                            path.children[path.children.length - 1].messages = [path.children[path.children.length - 1].messages[0] + `\n${dealer_list_inc}. ` + dealer_list.name]
                                                            dealer_list_inc = dealer_list_inc + 1;
                                                        })
                                                    }

                                                    let business_go_back1 = uuidv4();
                                                    path.children[path.children.length - 1].children.push({
                                                        actionType: "goBack",
                                                        attributes: [],
                                                        id: business_go_back1,
                                                        type: "action",
                                                        repeatPreviousMessage: true,
                                                        steps: 1
                                                    });

                                                    path.children[path.children.length - 1].__ref.push({ key: "0", id: business_go_back1 });
                                                    let business_go_back2 = uuidv4();
                                                    path.children[path.children.length - 1].children.push({
                                                        actionType: "goBack",
                                                        attributes: [],
                                                        id: business_go_back2,
                                                        type: "action",
                                                        repeatPreviousMessage: true,
                                                        steps: 8
                                                    });

                                                    let business_go_back3 = uuidv4();
                                                    path.children[path.children.length - 1].children.push({
                                                        actionType: "goBack",
                                                        attributes: [],
                                                        id: business_go_back3,
                                                        type: "action",
                                                        repeatPreviousMessage: true,
                                                        steps: 5
                                                    });

                                                    path.children[path.children.length - 1].__ref.push({ key: "00", id: business_go_back2 });
                                                    path.children[path.children.length - 1].__ref.push({ key: "#", id: business_go_back3 });
                                                    path.children[path.children.length - 1].messages = [path.children[path.children.length - 1].messages[0] + go_back_message + language_change_message + main_menu];

                                                    path.messages = [path.messages[0] + `\n${businessInc}. ` + business_category.name]
                                                    businessInc = businessInc + 1;
                                                })
                                            }
                                            let business_go_back = uuidv4();
                                            path.children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: business_go_back,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 1
                                            });

                                            path.__ref.push({ key: "0", id: business_go_back });
                                            let business_go_back1 = uuidv4();
                                            path.children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: business_go_back1,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 7
                                            });

                                            let business_go_2 = uuidv4();
                                            path.children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: business_go_2,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 4
                                            });

                                            path.__ref.push({ key: "00", id: business_go_back1 });
                                            path.__ref.push({ key: "#", id: business_go_2 });
                                            path.messages = [path.messages[0] + go_back_message + language_change_message + main_menu];

                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].messages = [chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].messages[0] + `\n${indisc}. ` + territorie.name]
                                            indisc = indisc + 1;
                                        })

                                        if (chatbot[0] && chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory]) {
                                            let upperKey = uuidv4()
                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: upperKey,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 1
                                            })
                                            let upperKey1 = uuidv4()
                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: upperKey1,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 6
                                            })
                                            let upperKey2 = uuidv4()
                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].children.push({
                                                actionType: "goBack",
                                                attributes: [],
                                                id: upperKey2,
                                                type: "action",
                                                repeatPreviousMessage: true,
                                                steps: 3
                                            })
                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].messages = [chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].messages[0] + go_back_message + language_change_message + main_menu]
                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].__ref.push({ key: "0", id: upperKey });
                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].__ref.push({ key: "00", id: upperKey1 });
                                            chatbot[0].children[1].children[3].children[district_length - 1].children[newterritory].__ref.push({ key: "#", id: upperKey2 });
                                        }
                                    }

                                    chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].messages = [chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].messages[0] + `\n${innerinc}. ` + district.name]
                                    innerinc = innerinc + 1;
                                })
                                if (chatbot[0] && chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1]) {
                                    let upperKey = uuidv4()
                                    chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].children.push({
                                        actionType: "goBack",
                                        attributes: [],
                                        id: upperKey,
                                        type: "action",
                                        repeatPreviousMessage: true,
                                        steps: 1
                                    })
                                    chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].__ref.push({ key: "0", id: upperKey });
                                    let upperKey1 = uuidv4()
                                    chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].children.push({
                                        actionType: "goBack",
                                        attributes: [],
                                        id: upperKey1,
                                        type: "action",
                                        repeatPreviousMessage: true,
                                        steps: 5
                                    })
                                    chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].__ref.push({ key: "00", id: upperKey1 });
                                    let upperKey2 = uuidv4()
                                    chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].children.push({
                                        actionType: "goBack",
                                        attributes: [],
                                        id: upperKey2,
                                        type: "action",
                                        repeatPreviousMessage: true,
                                        steps: 2
                                    })
                                    chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].__ref.push({ key: "#", id: upperKey2 });
                                }
                            }
                            chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].messages = [chatbot[0].children[1].children[3].children[chatbot[0].children[1].children[3].children.length - 1].messages[0] + go_back_message + language_change_message + main_menu]
                            chatbot[0].children[1].children[3].messages = [chatbot[0].children[1].children[3].messages[0] + `\n${id}. ` + province.province.name]
                            id = id + 1
                        })

                        if (chatbot[0] && chatbot[0].children[1].children[3]) {
                            let upperKey = uuidv4()
                            chatbot[0].children[1].children[3].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 1
                            })
                            chatbot[0].children[1].children[3].__ref.push({ key: "0", id: upperKey });
                            let upperKey1 = uuidv4()
                            chatbot[0].children[1].children[3].children.push({
                                actionType: "goBack",
                                attributes: [],
                                id: upperKey1,
                                type: "action",
                                repeatPreviousMessage: true,
                                steps: 4
                            })
                            chatbot[0].children[1].children[3].__ref.push({ key: "00", id: upperKey1 });
                            chatbot[0].children[1].children[3].messages = [chatbot[0].children[1].children[3].messages[0] + go_back_message + language_change_message]
                        }
                    }

                    let gobackkeymain = uuidv4()
                    chatbot[0].children[1].children.push({
                        actionType: "goBack",
                        title: "forMenu",
                        attributes: [],
                        id: gobackkeymain,
                        type: "action",
                        repeatPreviousMessage: true,
                        steps: 2
                    });
                    chatbot[0].children[1].__ref.push({ key: "0", id: gobackkeymain });

                })
            }

            let startMessage = "";
            let endMessage = "";
            let surveyMessage = "";
            let _startMessage = startMessage ? { "id": uuidv4(), "title": "Start Conversation Message", "type": "text", "expanded": true, "repeatPreviousMessage": true, "messages": [], "children": [] } : undefined;
            let _endMessage = endMessage ? { "id": uuidv4(), "title": "End Conversation Message", "type": "text", "expanded": true, "repeatPreviousMessage": true, "messages": [], "children": [] } : undefined;
            let _surveyMessage = surveyMessage ? { "id": uuidv4(), "title": "Survey Message", "type": "text", "expanded": true, "repeatPreviousMessage": true, "messages": [], "children": [] } : undefined;

            let final_chatbot = { __default: chatbot[0], __startMessageConversationMessage: _startMessage, __endMessageConversationMessage: _endMessage, __surveyMessage: _surveyMessage }
            let update_params = {
                treeData: chatbot[0],
                clientId: '58',
                name: "Engro",
                startMessage,
                endMessage,
                surveyMessage,
                id: 10
            }
            CoreHttpHandler.request(
                'CompanyAgent',
                'update_chatbot',
                update_params,
                response => {
                    console.log('succeed')
                },
            );
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
                                <InputLabel id="demo-simple-select-label" style={{ paddingLeft: '5px',marginTop:"10px" }}>Method</InputLabel>
                                <Select
                                    size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={method}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    style={{ height: '40px', marginTop: '20px' }}
                                >
                                    <MenuItem value={1}>Get</MenuItem>
                                    <MenuItem value={2}>Post</MenuItem>
                                    <MenuItem value={3}>Put</MenuItem>
                                </Select>
                            </FormControl>
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
