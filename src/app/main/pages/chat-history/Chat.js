import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MessageStateResolver from '../chat/messageType/MessageStateResolver'
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';
import AudioMessageType from '../chat//messageType/AudioMessageType'
import DocumentMessageType from './messageType/DocumentMessageType'
import ImageMessageType from './messageType/ImageMessageType'
import VideoMessageType from './messageType/VideoMessageType'
import ContactMessageType from './messageType/ContactMessageType'
import LocationMessageType from './messageType/LocationMessageType'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import GetAppIcon from '@material-ui/icons/GetApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MicIcon from '@material-ui/icons/Mic'
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
import XGlobalDialogCmp from '../../../../dialogs/XGlobalDialogCmp';
import XGlobalDialog from '../../../../dialogs/XGlobalDialog';
import { CSVLink, CSVDownload } from 'react-csv';
import AttachmentDialogV2 from './dialog/chat/AttachmentDialogV2';
import CannedMessagesDialog from './dialog/chat/CannedMessagesDialog';
import BlockConfirmDialog from './dialog/chat/BlockConfirmDialog';
import CustomerProfileDialog from './dialog/chat/CustomerProfileDialog';
import ReadMoreReact from 'read-more-react';
import ShiftConversationDialog from './dialog/chat/ShiftConversationDialog';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade'
import copy from 'copy-to-clipboard';

import * as Actions from './store/actions';
const contacts = [
	{
		avatar: "assets/images/avatars/alice.jpg",
		id: "5725a680b3249760ea21de52",
		mood: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
		name: "Alice Freeman",
		status: "online",
		unread: "2",
	},
	{
		avatar: "assets/images/avatars/Arnold.jpg",
		id: "5725a680606588342058356d",
		mood: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
		name: "Arnold",
		status: "do-not-disturb",
		unread: "3"
	},
	{
		avatar: "assets/images/avatars/Barrera.jpg",
		id: "5725a68009e20d0a9e9acf2a",
		mood: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
		name: "Arnold",
		status: "do-not-disturb",
		unread: "3"
	},


]
const user = {
	avatar: "assets/images/avatars/profile.jpg",
	chatList: [
		{
			chatId: "1725a680b3249760ea21de52",
			contactId: "5725a680b3249760ea21de52",
			lastMessageTime: "2017-06-12T02:10:18.931Z"
		},
		{
			chatId: "2725a680b8d240c011dd2243",
			contactId: "5725a680606588342058356d",
			lastMessageTime: "2017-02-18T10:30:18.931Z"
		},

	],
	id: "5725a6802d10e277a0f35724",
	mood: "it's a status....not your diary...",
	name: "John Doe",
	status: "online"
}
const selectedContactId = "5725a680b3249760ea21de52";
const chat = {
	id: "1725a680b3249760ea21de52",
	dialog: [
		{
			message: "Quickly come to the meeting room 1B, we have a big server issue",
			time: "2017-03-22T08:54:28.299Z",
			who: "5725a680b3249760ea21de52",
		},
		{
			message: "Quickly come to the meeting room 1B, we have a big server issue",
			time: "2017-03-22T08:54:28.299Z",
			who: "5725a680b3249760ea21de52",
		},

		{
			message: "Quickly come to the meeting room 1B, we have a big server issue",
			time: "2017-03-22T08:54:28.299Z",
			who: "5725a680b3249760ea21de52",
		},
		{
			message: "Quickly come to the meeting room 1B, we have a big server issue",
			time: "2017-03-22T08:54:28.299Z",
			who: "5725a680b3249760ea21de52",
		},
		{
			message: "Quickly come to the meeting room 1B, we have a big server issue",
			time: "2017-03-22T08:54:28.299Z",
			who: "5725a680b3249760ea21de52",
		},
		{
			message: "I’m having breakfast right now, can’t you wait for 10 minutes?",
			time: "2017-03-22T08:55:28.299Z",
			who: "5725a6802d10e277a0f35724"
		}, {
			message: "We are losing money! Quick!",
			time: "2017-03-22T09:00:28.299Z",
			who: "5725a680b3249760ea21de52"
		},
		{
			message: "We are losing money! Quick!",
			time: "2017-03-22T09:17:28.299Z",
			who: "5725a680b3249760ea21de52"
		},
		{
			message: "It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.",
			time: "2017-03-22T09:20:28.299Z",
			who: "5725a6802d10e277a0f35724"
		}
	]
}
const useStyles = makeStyles(theme => ({
	// bootstrapFormLabel:{backgroundColor: 'red',},
	messageRow: {
		'&.contact': {
			'& .bubble': {
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.primary.contrastText,
				borderTopLeftRadius: 5,
				borderBottomLeftRadius: 5,
				borderTopRightRadius: 6,
				borderBottomRightRadius: 6,
				width: 'auto',
    			maxWidth: '35vw',
				borderTopRightRadius: 6,
				borderBottomRightRadius: 6,
				marginLeft:8,
				// marginBottom:70,
				'& .time': {
					marginLeft: '0px',
					marginBottom: '-11px',
					marginTop: '5px',
					paddingBottom:8
				}
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopLeftRadius: 6
				}
			},
			'&.last-of-group': {
				'& .bubble': {
					borderBottomLeftRadius: 6
				}
			}
		},
		'&.me': {
			paddingLeft: 40,

			'& .avatar': {
				order: 2,
				margin: '0 0 0 16px'
			},
			'& .bubble': {
				marginLeft: 'auto',
				backgroundColor: 'white',
				color: theme.palette.getContrastText(theme.palette.grey[300]),
				borderTopLeftRadius: 6,
				borderBottomLeftRadius: 6,
				borderTopRightRadius: 5,
				borderBottomRightRadius: 5,
				width: 'auto',
				maxWidth: '35vw',
				marginRight:10,
				'& .time': {
					display:'flex',
					justifyContent: 'flex-end',
					right: 0,
					marginLeft: 2,
					marginBottom: '-11px',
					marginTop: '5px',
					paddingBottom:10,
					opacity:'0.8',
					paddingRight:4,
					paddingBottom:'8px'



				}
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopRightRadius: 6
				}
			},

			'&.last-of-group': {
				'& .bubble': {
					borderBottomRightRadius: 6
				}
			}
		},
		'&.contact + .me, &.me + .contact': {
			paddingTop: 6,
			marginTop: 6,
			paddingBottom: 6,
			// marginLeft:8
		},
		'&.first-of-group': {
			'& .bubble': {
				borderTopLeftRadius: 6,
				paddingTop: 6
			}
		},
		'&.last-of-group': {
			'& .bubble': {
				borderBottomLeftRadius: 6,
				paddingBottom: 6,
				'& .time': {
					display: 'flex'
				}
			}
		}
	},
	messageRowWithOutBorder: {
		'&.contact': {
			'& .bubble': {
				color: theme.palette.primary.contrastText,
				borderTopLeftRadius: 5,
				borderBottomLeftRadius: 5,
				borderTopRightRadius: 6,
				borderBottomRightRadius: 6,
				width: 'auto',
    			maxWidth: '35vw',
				borderTopRightRadius: 6,
				borderBottomRightRadius: 6,
				// marginBottom:70,
				'& .time': {
					marginLeft: '0px',
					marginBottom: '-11px',
					marginTop: '5px',
					paddingBottom:8
					
				}
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopLeftRadius: 6
				}
			},
			'&.last-of-group': {
				'& .bubble': {
					borderBottomLeftRadius: 6
				}
			}
		},
		'&.me': {
			paddingLeft: 40,

			'& .avatar': {
				order: 2,
				margin: '0 0 0 16px'
			},
			'& .bubble': {
				marginLeft: 'auto',
				color: theme.palette.getContrastText(theme.palette.grey[300]),
				borderTopLeftRadius: 6,
				borderBottomLeftRadius: 6,
				borderTopRightRadius: 5,
				borderBottomRightRadius: 5,
				width: 'auto',
    			maxWidth: '35vw',
				'& .time': {
					display:'flex',
					justifyContent: 'flex-end',
					right: 0,
					marginRight: 2,
					marginBottom: '-11px',
					marginTop: '5px',
					paddingBottom:5

				}
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopRightRadius: 6
				}
			},

			'&.last-of-group': {
				'& .bubble': {
					borderBottomRightRadius: 6
				}
			}
		},
		'&.contact + .me, &.me + .contact': {
			paddingTop: 6,
			marginTop: 6,
			paddingBottom: 6
		},
		'&.first-of-group': {
			'& .bubble': {
				borderTopLeftRadius: 6,
				paddingTop: 6
			}
		},
		'&.last-of-group': {
			'& .bubble': {
				borderBottomLeftRadius: 6,
				paddingBottom: 6,
				'& .time': {
					display: 'flex'
				}
			}
		}
	},
	root: {
		display: 'flex',
		width: '250px',
		height: '70px',
		backgroundColor: '#ffffff'
	},
	rootDocu: {
		display: 'flex',
		width: '350px',
		height: '100px',
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',

	},
	contact: {
		display: 'flex',
		width: '40%',
		height: '150px'
	},
	details: {
		flexDirection: 'column',
	},
	content: {
		padding: '10px 10px 0 15px'
	},
	cover: {
		width: 120,
		height: 120,
		float: 'right'
	},
	playIcon: {
		height: 20,
		width: 20,
	},
	playbtn: {
		padding: 5,
		margin: '0 5px'
	},
	HeadIcon: {
		width: '34%',
		height: '62px',
		float: 'right'
	},
	Headbtn: {
		padding: 5,
		margin: '0 5px'
	}
}));


function Chat(props) {
	const dispatch = useDispatch();
	const { messages, selectedRecipient } = props;

	// const contacts = useSelector(({ chatApp }) => chatApp.contacts.entities);
	// const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);
	// const chat = useSelector(({ chatApp }) => chatApp.chat);
	// const user = useSelector(({ chatApp }) => chatApp.user);

	const classes = useStyles(props);
	const chatRef = useRef(null);
	const [messageText, setMessageText] = useState('');
	const [anchorEl, setAnchorEl] = React.useState(null);

	const [sendDialogData, setsendDialogData] = React.useState({
		url: '',
		caption: '',
		attributes: null,
	});
	const [dialogOpen, setdialogOpen] = React.useState(false);
	const [shiftAgentsList, setshiftAgentsList] = React.useState([]);
	const [dialogOpenShift, setdialogOpenShift] = React.useState(false);
	const [sendActionType, setsendActionType] = React.useState(null);
	const [sendDialogOpen, setsendDialogOpen] = React.useState(false);
	const [sendDialogTitle, setsendDialogTitle] = React.useState(false);
	const [dialogOpenConfirmBlock, setdialogOpenConfirmBlock] = React.useState(false);
	const [dialogOpenCanned, setdialogOpenCanned] = React.useState(false);
	const [cannedMessagesList, setcannedMessagesList] = React.useState([]);
	const [blockReason, setblockReason] = React.useState('');
	const [customerProfileData, setcustomerProfileData] = React.useState({
		id: 0,
		number: null,
		assign_name: '',
		attributes: [],
		countries: [],
	});
	const [dialogOpenCmp, setdialogOpenCmp] = React.useState(false);

	const sendDialogActions = [
		{
			handler: (event, index) => {
				setsendActionType(null)
				setsendDialogTitle('')
				setsendDialogOpen(false)
			},
			options: {},
			label: "Cancel",
		},
		{
			handler: (event, index) => {
				sendDialogActionCb();
			},
			options: {},
			label: "Send",
		}
	];
	const sendDialogActionCb = () => {
		const args = {};

		args[sendActionType] = {};

		args[sendActionType]['type'] = sendActionType;

		args[sendActionType][sendActionType] = {};

		args[sendActionType][sendActionType]['message'] = sendDialogData;

		args[sendActionType][sendActionType]['to'] = [selectedRecipient.number];

		if (sendDialogData.attributes) {
			Object.keys(sendDialogData.attributes).forEach(attr => {
				args[sendActionType][sendActionType].message[attr] = sendDialogData.attributes[attr];
			});
		}

		delete args[sendActionType][sendActionType].message.attributes;

		CoreHttpHandler.request('conversations', 'send', { key: ':type', value: sendActionType, params: args[sendActionType] }, (response) => {
			setsendActionType(null)
			setsendDialogTitle('')
			setsendDialogOpen(false)
			setsendDialogData({
				url: '',
				caption: '',
				attributes: null,
			})

		}, (response) => {
		})
	};
	const dialogOptionsConfirmBlock = {
		onClose: function () {
			setdialogOpenConfirmBlock(false)

		},
		'aria-labelledby': "form-dialog-title",
		'aria-describedby': "form-dialog-title"
	};
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	useEffect(() => {
		if (messages) {
			scrollToBottom();
		}
	}, [messages,]);

	function scrollToBottom() {
		chatRef.current.scrollTop = chatRef.current.scrollHeight - 200;
	}

	function shouldShowContactAvatar(item, i) {
		return (
			item.type === "inbound" &&
			((messages[i + 1] && messages[i + 1].type !== props.selectedRecipient.id) || !messages[i + 1])
		);
	}

	function isFirstMessageOfGroup(item, i) {
		return i === 0 || (chat.dialog[i - 1] && chat.dialog[i - 1].who !== item.who);
	}

	function isLastMessageOfGroup(item, i) {
		return i === chat.dialog.length - 1 || (chat.dialog[i + 1] && chat.dialog[i + 1].who !== item.who);
	}

	function onInputChange(ev) {
		setMessageText(ev.target.value);
	}

	function onMessageSubmit(ev) {
		ev.preventDefault();
		if (messageText === '') {
			return;
		}

		dispatch(Actions.sendMessage(messageText, chat.id, user.id)).then(() => {
			setMessageText('');
		});
	}
	const sendMessage = () => {
		let params = {
			type: "text",
			text: {
				to: [props.selectedRecipient.number],
				message: {
					text: messageText
				}
			}
		};
		CoreHttpHandler.request('conversations', 'send_text', params, (response) => {
			setMessageText('')
		}, (error) => {
		});
	}
	// send message
	const sendMessageHandler = (event) => {
		sendMessage();
	}
	const sendDialogInputHandler = (e) => {
		const data = { ...sendDialogData };

		if (e.caption) {
			data['caption'] = e.caption;
		}

		if (e.url) {
			data['url'] = e.url;
		}

		if (e.attributes) {
			data['attributes'] = e.attributes;
		}
		setsendDialogData(data)
	};
	const conversationActionsCallback = (action) => {
		setAnchorEl(null);
		if (action === 'export') conversationExport();
		if (action === 'shift') conversationShift();

		if (action === 'audio') {
			setsendActionType('audio')
			setsendDialogTitle('Send An Audio File')
			setsendDialogOpen(true)
		}

		if (action === 'video') {
			setsendActionType('video')
			setsendDialogTitle('Send A Video File')
			setsendDialogOpen(true)
		}
		if (action === 'document') {
			setsendActionType('document')
			setsendDialogTitle('Send A Document')
			setsendDialogOpen(true)
		}
		if (action === 'location') {
			setsendActionType('location')
			setsendDialogTitle('Send Location Data')
			setsendDialogOpen(true)
		}
		if (action === 'image') {
			setsendActionType('image')
			setsendDialogTitle('Send An Image')
			setsendDialogOpen(true)
		}
	}
	const conversationEmail = () => {
		setdialogOpen(true)
	}

	const conversationExport = () => {
		let params = {
			key: ':number',
			value: selectedRecipient.number,
			key2: ':last_closed',
			value2: selectedRecipient.last_closed

		};
		CoreHttpHandler.request('conversations', 'conversations', params, (response) => {
			const messages = response.data.data.chat;
			const csvLink = (<CSVLink filename={`chat_${selectedRecipient.number}_${new Date().toISOString()}.csv`} data={messages}>Your exported chat is ready for download</CSVLink>);
			alert(csvLink)
		}, (response) => {

		});
	}

	const conversationShift = () => {
		CoreHttpHandler.request('conversations', 'agent_list', { role: 64, columns: 'id, username, email, number' }, (response) => {
			const data = response.data.data.agents.data;
			setshiftAgentsList(data)
			setdialogOpenShift(true)
		}, (response) => {

		});
	}
	const selectedShiftAgent = (agent) => {
		console.log("selectedShiftAgent agent ", agent)
		console.log("selectedShiftAgent selectedRecipient ", selectedRecipient)

		CoreHttpHandler.request('conversations', 'transfer', {
			key: ':id',
			value: agent.id,
			params: {
				customer: selectedRecipient.number
			}
		}, (response) => {
			setdialogOpenShift(false)
			props.agentShift()
		}, (response) => {

		});
	}
	const dialogOptionsShift = {
		onClose: function () {
			setdialogOpenShift(false)
		},
		'aria-labelledby': "form-dialog-title",
		'aria-describedby': "form-dialog-title"
	}
	const dialogActionsShift = [
		{
			handler: (event, index) => {
				this.XGlobalDialogShiftClose()
			},
			options: {},
			label: "Cancel",
		},

	];
	const XGlobalDialogShiftClose = () => {
		setdialogOpenShift(false)
	}
	const selectedCannedMessage = (props) => {
		const { message_text, message_type, attachment_url, attachment_name, attachment_type } = props;

		if (message_type !== 'text') {
			let params = {
				type: message_type,
			};

			params[message_type] = {
				to: [selectedRecipient.number],
				message: {
					filname: attachment_name,
					mime_type: attachment_type,
					url: attachment_url,
					caption: (message_text) ? message_text : `You Shared A ${message_type.charAt(0).toUpperCase()}${message_type.slice(1)}`,
				}
			}

			CoreHttpHandler.request('conversations', 'send', {
				key: ':type',
				value: message_type,
				params,
			}, (response) => {
				setMessageText("")
				setdialogOpenCanned(false)

			}, (error) => {
			});
		} else {
			setMessageText(message_text)
			setdialogOpenCanned(false)
		}
	}
	const dialogOptionsCanned = {
		onClose: function () {
			setdialogOpenCanned(false)
		},
		'aria-labelledby': "form-dialog-title",
		'aria-describedby': "form-dialog-title"
	};
	const cannedMessagesDialog = () => {
		CoreHttpHandler.request('canned_messages', 'listing', {
			columns: "*",
			sortby: "ASC",
			orderby: "id",
			where: "enabled = $1",
			values: true,
			page: 0,
			limit: 0,
		}, (response) => {
			const data = response.data.data.list.data;
			setcannedMessagesList(data)
			setdialogOpenCanned(true)

		}, (error) => {
			// this.setSnackBarMessage('Failed to load canned messages, please try again later', 'error');
		});
	}
	const dialogActionsCanned = [
		{
			handler: (event, index) => {
				XGlobalDialogCannedClose()
			},
			options: {},
			label: "Cancel",
		}
	];
	const XGlobalDialogCannedClose = () => {
		setdialogOpenCanned(false)
	}
	const conversationContextMenuCallback = (item) => {
		if (item === 'customer_profile') {
			profileDialog();

		}

		if (item === 'canned_messages') {

			cannedMessagesDialog()
		}

		if (item === 'block') {
			setdialogOpenConfirmBlock(true)

		}
		if (item === 'copy') {
			copyContent();
		}
	}
	const blockCustomerInputHandler = (props) => {
		const {
			key,
			value,
			event,
			dataKey,
		} = props;
		setblockReason(value)
	}

	const dialogActionsConfirmBlock = [
		{
			handler: (event, index) => {
				XGlobalDialogConfirmBlock()
			},
			options: {},
			label: "Cancel",
		},
		{
			handler: (event, index) => {
				blockNumber()
			},
			options: {},
			label: "Yes",
		}
	];
	const XGlobalDialogConfirmBlock = () => {
		setdialogOpenConfirmBlock(false)
	}
	const blockNumber = () => {
		console.log('blockNumber');

		CoreHttpHandler.request('conversations', 'block', {
			key: ':number', value: selectedRecipient.number, params: {
				reason: blockReason,
			}
		}, (response) => {
			setdialogOpenConfirmBlock(false)
			setblockReason('')
			setAnchorEl(false)
			props.agentShift()
			// setselectedRecipient(null)
			// setmessages([])
			// clearInterval(this.int_MessageLists);
		}, (error) => {
			setAnchorEl(false)

			setdialogOpenConfirmBlock(false)
		});
	}
	const customerProfileInputHandler = (props) => {
		const {
			key,
			value,
			event,
			dataKey,
		} = props;

		const data = { ...customerProfileData };

		data[key] = value.attrs;
		data['assign_name'] = value.assigned_name;
		setcustomerProfileData(data)

	}

	const dialogOptionsCmp = {
		onClose: function () {
			setdialogOpenCmp(false)

		},
		'aria-labelledby': "form-dialog-title",
		'aria-describedby': "form-dialog-title"
	};
	const dialogActionsCmp = [
		{
			handler: (event, index) => {
				XGlobalDialogCmpClose()
			},
			options: {},
			label: "Close",
		},
		{
			handler: (event, index) => {
				profileUpdate();
			},
			options: {},
			label: "Update",
		},
	];
	const profileUpdate = () => {
		const data = { ...customerProfileData };

		data['number'] = selectedRecipient.number;

		CoreHttpHandler.request('contact_book', 'update', {
			key: ':id',
			value: customerProfileData.id,
			params: data
		}, (response) => {
			setdialogOpenCmp(false)


		}, (error) => {
			// if (error.hasOwnProperty('response')) {
			//     if (error.response.hasOwnProperty('data')) {
			//         this.setSnackBarMessage(error.response.data.message, 'error');
			//     }
			// } else this.setSnackBarMessage('Failed to update profile, please try again later', 'error');

		});
	}
	const XGlobalDialogCmpClose = () => {
		setdialogOpenCmp(false)
	}
	const profileDialog = () => {
		CoreHttpHandler.request('contact_book', 'fetch', {
			key: ':number',
			value: selectedRecipient.number
		}, (response) => {
			const customer = response.data.data.customer;

			loadCountries().then((response) => {
				const countries = response.data.data.list.data;

				setcustomerProfileData({
					id: customer.id,
					number: selectedRecipient.number,
					attributes: customer.attributes,
					assign_name: '',
					countries,
				})
				console.log("customer : ", customer);
				setAnchorEl(false)
				setdialogOpenCmp(true)

			})

		}, (error) => {
			setAnchorEl(false)
			setdialogOpenCmp(false)
			// this.setSnackBarMessage('Failed to customer profile, please try again later', 'error');
		});
	}
	const loadCountries = () => {
		return CoreHttpHandler.request('locations', 'get_countries', {
			columns: "id, name",
			sortby: "ASC",
			orderby: "id",
			where: "enabled = $1",
			values: true,
			page: 0,
			limit: 0
		}, null, null, true);
	};
	const copyContent = () => {

		copy(selectedRecipient.number);
		alert("copy")
		// this.setSnackBarMessage('Copied', 'success', null);

		// This is just personal preference.
		// I prefer to not show the the whole text area selected.

	}
	return (
		<div className={clsx('flex flex-col relative', props.className)}>
			<FuseScrollbars ref={chatRef} className="flex flex-1 flex-col overflow-y-auto">
				{messages && messages.length > 0 ? (
					<div className="flex flex-col ">
						{messages.map((item, index) => {
							const contact = null;
							console.log(item, 'item in message')
							// 	item.type === "inbound" ? user : contacts.find(_contact => _contact.id === item.who);
							return (
								<div
									key={item.time}
									className={
										item.message_type === "text" ?
											clsx(
												classes.messageRow,
												'text-message-w-control',
												'flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative px-16 pb-4',
												{ me: item.type === "outbound" },
												{ contact: item.type === "inbound" },
												{ 'first-of-group': isFirstMessageOfGroup(item, index) },
												{ 'last-of-group': isLastMessageOfGroup(item, index) },
												index + 1 === messages.length && 'pb-96'
											) : clsx(
												classes.messageRowWithOutBorder	,											'text-message-w-control',
												'flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative px-16 pb-4',
												{ me: item.type === "outbound" },
												{ contact: item.type === "inbound" },
												{ 'first-of-group': isFirstMessageOfGroup(item, index) },
												{ 'last-of-group': isLastMessageOfGroup(item, index) },
												index + 1 === messages.length && 'pb-96'
											)
									}
								>
									{/* {shouldShowContactAvatar(item, index) && (
										<Avatar
											className="avatar absolute ltr:left-0 rtl:right-0 m-0 -mx-32"
											src={props.selectedRecipient.avatar}
										/>
									)} */}

									<div className="bubble flex relative items-center justify-center p-12 max-w-full">
										{item.message_type === "text" ?
											item.message_body.length > '400' ?
											<div className="leading-tight whitespace-pre-wrap" >
												<ReadMoreReact text={item.message_body}
													min={200}
													ideal={400}
													max={1000}
													readMoreText="Click Here to Read More" />
												<Typography className="time w-full text-10" >{moment(item.dt).format('MMM Do YY, h:mm A')} {item.type === "outbound" ? MessageStateResolver.resolve(item.status) : null}</Typography>
											</div>
											:
											<div className="leading-tight whitespace-pre-wrap" style={{ fontSize: '12px', textAlign: 'justify', wordBreak: 'break-all' }}>
												{item.message_body}
												<Typography className="time w-full text-10" >{moment(item.dt).format('MMM Do YY, h:mm A')} {item.type === "outbound" ? MessageStateResolver.resolve(item.status) : null}</Typography>
											</div>
											: null}
										{item.message_type === "audio" || item.message_type === "voice" ? <AudioMessageType index={index} classes={classes} message={item} /> : null}
										{item.message_type === "image" ? <ImageMessageType index={index} classes={classes} message={item} /> : null}
										{item.message_type === "video" ? <VideoMessageType index={index} classes={classes} message={item} /> : null}
										{item.message_type === "document" ? <DocumentMessageType index={index} classes={classes} message={item} /> : null}
										{item.message_type === "contacts" ? <ContactMessageType index={index} classes={classes} message={item} /> : null}
										{item.message_type === "location" ? <LocationMessageType index={index} classes={classes} message={item} /> : null}
										{/* <Typography
											className="time absolute hidden w-full text-11 mt-8 -mb-24 ltr:left-0 rtl:right-0 bottom-0 whitespace-no-wrap"
											color="textSecondary"
										>
											{moment(item.dt).format('MMMM Do YYYY, h:mm:ss a')}
										</Typography> */}
									</div>
								</div>
							);
						})}
					</div>
				) : (
						<div className="flex flex-col flex-1">
							<div className="flex flex-col flex-1 items-center justify-center">
								<Icon className="text-128" color="disabled">
									chat
							</Icon>
							</div>
							<Typography className="px-16 pb-24 text-center" color="textSecondary">
								Start a conversation by typing your message below.
						</Typography>
						</div>
					)}
			</FuseScrollbars>

			<XGlobalDialogCmp onDialogPropsChange={sendDialogInputHandler} data={{ dialogType: sendActionType, attachment: sendDialogData }} dialogTitle={sendDialogTitle} options={dialogOptionsConfirmBlock} content={AttachmentDialogV2} defaultState={sendDialogOpen} actions={sendDialogActions} />
			<XGlobalDialogCmp onDialogPropsChange={selectedShiftAgent} data={shiftAgentsList} dialogTitle={`Shift Conversation To Another Agent`} options={dialogOptionsShift} content={ShiftConversationDialog} defaultState={dialogOpenShift} actions={dialogActionsShift} />
			<XGlobalDialogCmp onDialogPropsChange={selectedCannedMessage} data={cannedMessagesList} dialogTitle={`Canned Messages`} options={dialogOptionsCanned} content={CannedMessagesDialog} defaultState={dialogOpenCanned} actions={dialogActionsCanned} />
			<XGlobalDialogCmp onDialogPropsChange={blockCustomerInputHandler} data={selectedRecipient} dialogTitle={`Confirm Block`} options={dialogOptionsConfirmBlock} content={BlockConfirmDialog} defaultState={dialogOpenConfirmBlock} actions={dialogActionsConfirmBlock} />
			<XGlobalDialogCmp onDialogPropsChange={customerProfileInputHandler} data={customerProfileData} dialogTitle={`Customer Profile`} options={dialogOptionsCmp} content={CustomerProfileDialog} defaultState={dialogOpenCmp} actions={dialogActionsCmp} />

			{/* <XGlobalDialog onchange={(e) => {
                    this.onchange(e);
                }} dialogTitle={`Email [${this.state.selectedRecipient}]'s Conversation`} options={this.dialogOptions} content={ConversationsEmailDialog} defaultState={this.state.dialogOpen} actions={this.dialogActions} /> */}
		</div>
	);
}

export default Chat;
