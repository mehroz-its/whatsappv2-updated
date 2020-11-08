import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Chat from './Chat';
import ChatsSidebar from './ChatsSidebar';
import reducer from './store/reducers';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AttachmentDialogV2 from '../../globalComponents/dialogs/AttachmentDialogV2';
import CannedMessagesDialog from '../../globalComponents/dialogs/CannedMessagesDialog';
import BlockConfirmDialog from '../../globalComponents/dialogs/BlockConfirmDialog';
import CustomerProfileDialog from '../../globalComponents/dialogs/CustomerProfileDialog';
import XGlobalDialogCmp from '../../../../dialogs/XGlobalDialogCmp';
import ShiftConversationDialog from '../../globalComponents/dialogs/ShiftConversationDialog';
import { CSVLink } from 'react-csv';
import Fade from '@material-ui/core/Fade'
import Tooltip from '@material-ui/core/Tooltip';
import { EventEmitter } from '../../../../events'
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import copy from 'copy-to-clipboard';
import WebSocket from "../../../socket/WebSocket"

const drawerWidth = 320;
const headerHeight = 100;
const AvatarStyle = createMuiTheme({
	overrides: {
		MuiAvatar: {
			root: {
				fontSize: '15px',
				height: '35px',
				width: '35px',
				paddingBottom: 4,
			}
		}
	}
});
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '100%',
		position: 'relative',
		flex: '1 1 auto',
		height: 'auto',
		backgroundColor: 'theme.palette.background.default'
	},
	avatar: {
		marginTop: '-14px',
		padding: 0
	},

	topBg: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
		backgroundColor: theme.palette.primary.dark,
		backgroundSize: 'cover',
		pointerEvents: 'none'
	},
	contentCardWrapper: {
		position: 'relative',
		maxWidth: '100%',
		display: 'flex',
		flexDirection: 'column',
		flex: '1 0 auto',
		width: '100%',
		minWidth: '0',
		maxHeight: '100%',
		margin: '0 auto',

		[theme.breakpoints.down('sm')]: {
			padding: 16
		},
		[theme.breakpoints.down('xs')]: {
			padding: 12
		}
	},
	contentCard: {
		display: 'flex',
		position: 'relative',
		flex: '1 1 100%',
		flexDirection: 'row',
		backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[1],
		borderRadius: 0,
		minHeight: 0,
		overflow: 'hidden'
	},
	drawerPaper: {
		width: drawerWidth,
		maxWidth: '100%',
		overflow: 'hidden',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 100%',
		zIndex: 10,
		background: `linear-gradient(to bottom, ${fade(theme.palette.background.paper, 0.8)} 0,${fade(
			theme.palette.background.paper,
			0.6
		)} 20%,${fade(theme.palette.background.paper, 0.8)})`
	},
	content: {
		display: 'flex',
		flex: '1 1 100%',
		minHeight: 0
	}
}));
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
const chat = null

function ChatApp(props) {
	const dispatch = useDispatch();
	const userSidebarOpen = false;
	const contactSidebarOpen = false;
	var abc = []
	let numberDummy = []
	const [mobileChatsSidebarOpen, setmobileChatsSidebarOpen] = React.useState(false);
	const [lastMessageTimestamp, setlastMessageTimestamp] = React.useState(null);
	const [latestMessageSender, setlatestMessageSender] = React.useState(null);
	const [numbers, setnumbers] = React.useState([]);
	const [dummy, setDummy] = React.useState(null);
	const [firstLoad, setFirstLoad] = React.useState(true);
	const [numbersLength, setNumbersLength] = React.useState(0);
	const [numbersdum, setnumbersdum] = React.useState([]);
	const [lastmessage, setlastmessage] = React.useState([]);
	const [messages, setmessages] = React.useState([]);
	const [message, setmessage] = React.useState(null);
	const [NewMessages, setNewMessages] = React.useState([]);
	const [showLatestMessage, setshowLatestMessage] = React.useState(false);
	const [userDrawer, setuserDrawer] = React.useState(false);
	const [selectedRecipient, setselectedRecipient] = React.useState(null);

	const [moreMenuEl, setMoreMenuEl] = React.useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles(props);
	const selectedContact = contacts.find(_contact => _contact.id === selectedContactId);
	const selectedRecipientt = (e) => {

		let _numbers = numbers.map(el=>{
			if(el.id==e.id){
				el.message_count = 0
			}
			return el
		})
		setnumbers(_numbers)


		setselectedRecipient(e)
		readMessage()
		setmobileChatsSidebarOpen(false)
		getConversation(e);
	}

	

	const getNumbers = () => {
		CoreHttpHandler.request('conversations', 'numbers', {}, (response) => {
			const newData = response.data.data.customers;

			setnumbers(newData)

		}, (response) => {
		});
	}

	
	const socket = WebSocket.getSocket()

	const getConversation = (e) => {
		let params = {
			key: ':number',
			value: e.number,
			key2: ':last_closed',
			value2: e.last_closed

		};
		CoreHttpHandler.request('conversations', 'conversations', params, (response) => {
			if (response.data.data.chat.length > abc.length) {
				setmessages(response.data.data.chat)
				abc = response.data.data.chat
				setshowLatestMessage(true)
			}
			
		}, (response) => {
		});
	}

	const conversationActionsCallback = (action) => {
		if (action === 'export') conversationExport();
		if (action === 'shift') conversationShift();
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
			const csvLink = (<CSVLink filename={`chat_${selectedRecipient.number}_${new Date().toISOString()}.csv`} data={messages}><span style={{ color: 'white' }}>Your exported chat is ready for download</span></CSVLink>);
			setSnackBarMessage(csvLink)
			setOK("success")
			setSnackBarOpen(true)
			setMoreMenuEl(null);
		}, (response) => {

		});
	}
	const conversationShift = () => {
		CoreHttpHandler.request('conversations', 'agent_list', { role: 64, columns: 'id, username, email, number' }, (response) => {
			const data = response.data.data.agents.data;
			setshiftAgentsList(data)
			setdialogOpenShift(true)
			setMoreMenuEl(null);
		}, (response) => {
		});
	}
	const conversationContextMenuCallback = (item) => {
		if (item === 'customer_profile') {
			profileDialog();
			setMoreMenuEl(null);
		}
		if (item === 'canned_messages') {
			cannedMessagesDialog()
			setMoreMenuEl(null);
		}
		if (item === 'block') {
			setdialogOpenConfirmBlock(true)
			setMoreMenuEl(null);
		}
		if (item === 'copy') {
			copyContent();
			setMoreMenuEl(null);
		}
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
	const conversationUpdate = (text) =>{
		if(selectedRecipient){
			let _numbers = [...numbers.filter(el=>selectedRecipient.id==el.id),...numbers.filter(el=>selectedRecipient.id!=el.id)];
			setnumbers(_numbers)
		}

	}
	const copyContent = () => {
		copy(selectedRecipient.number);
		setSnackBarMessage("Copied Successfully")
		setOK("success")
		setSnackBarOpen(true)
	}
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
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [messageStatus, setMessageStatus] = React.useState(null)

	const [ok, setOK] = React.useState('')
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
	useEffect(() => {
		EventEmitter.subscribe('Online', (event) => checkOnline(event))
		// getNumbers()
		return () => {

		}
	}, [selectedRecipient]);
	
	useEffect(() => {

		getNumbers();

		socket.on("newConversation",(data)=>{	
			setDummy(data)
		})
		socket.on("newConversationMessage",data=>{
			setmessage(data)
		})
		socket.on("updateMessageStatus",data=>{
			setMessageStatus(data)
		})
		
		return () => {
			socket.removeListener("newConversation")
			socket.removeListener("newConversationMessage")
			socket.removeListener("updateMessageStatus")
		}
	}, [])

	
	React.useEffect(()=>{

		if(messageStatus&&messageStatus.messageId&&messageStatus.stateId){

			let _message = messages.map(message=>{
				if(message.outbound_id==messageStatus.messageId){
					message.status=messageStatus.stateId
				}

				return message
			})

			setmessages(_message)
		}

	},[messageStatus])
	React.useEffect(()=>{

		if(dummy){

			let _numbers =[dummy,...numbers.filter(el=>el.id!=dummy.id)];
			if(selectedRecipient){
				_numbers = _numbers.map(number=>{
					if(selectedRecipient.id==number.id){
						number.message_count = 0
					}
					return number
				})
			}

			setnumbers(_numbers)
		}

	},[dummy])
	
	React.useEffect(()=>{
		if(message&&message.length&&selectedRecipient&&selectedRecipient.id){
			const _message = message[0];
			if(selectedRecipient.id==_message.receiver_id){
				let _messages =[...messages,...message];
				setmessages(_messages)
				if(_message.type=="inbound"){
					readMessage()
				}
			}
		}
	},[message])
	const readMessage = () =>{
		if(selectedRecipient){

			CoreHttpHandler.request('conversations', 'reset_message_count', { key: ':number', value: selectedRecipient.number }, (response) => {
			}, (response) => {
				
			})
		}
	}
	const checkOnline = (online) => {
		if (online === false) {
			setselectedRecipient(null)
			setmessages([])
		}
		else {
			readMessage()
		}
	}
	const clearData = () => {
		setselectedRecipient(null)
		setmessages([])
	}
	function handleMoreMenuClick(event) {
		setMoreMenuEl(event.currentTarget);
	}
	function handleMoreMenuClose(event) {
		setMoreMenuEl(null);
	}
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
			setMoreMenuEl(null);
		}, (error) => {
		});
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
	const selectedShiftAgent = (agent) => {
		CoreHttpHandler.request('conversations', 'transfer', {
			key: ':id',
			value: agent.id,
			params: {
				customer: selectedRecipient.number
			}
		}, (response) => {
			setdialogOpenShift(false)
			clearData()
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
				XGlobalDialogShiftClose()
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
				setdialogOpenCanned(false)
			}, (error) => {
			});
		} else {
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
	const dialogActionsCanned = [
		{
			handler: (event, index) => {
				XGlobalDialogCannedClose()
			},
			options: {},
			label: "Cancel",
		}
	];
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
	const blockNumber = () => {
		CoreHttpHandler.request('conversations', 'block', {
			key: ':number', value: selectedRecipient.number, params: {
				reason: blockReason,
			}
		}, (response) => {
			setdialogOpenConfirmBlock(false)
			setblockReason('')
			setAnchorEl(false)
			clearData()
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
	const XGlobalDialogCannedClose = () => {
		setdialogOpenCanned(false)
	}
	const XGlobalDialogConfirmBlock = () => {
		setdialogOpenConfirmBlock(false)
	}
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
	const XGlobalDialogCmpClose = () => {
		setdialogOpenCmp(false)
	}
	const profileUpdate = () => {
		const data = { ...customerProfileData };
		data['number'] = selectedRecipient.number;
		CoreHttpHandler.request('contact_book', 'update', {
			key: ':id',
			value: customerProfileData.id,
			params: data
		}, (response) => {
			setselectedRecipient(selectedRecipient)
			setdialogOpenCmp(false)
		}, (error) => {
		});
	}
	const endConversation = () => {

		// 


		CoreHttpHandler.request('conversations', 'end', { key: ':number', value: selectedRecipient.number }, (response) => {


			let _numbers =numbers.filter(el=>el.id!=selectedRecipient.id);

			setnumbers(_numbers)
			setselectedRecipient(null)
			setmessages([])
		}, (error) => {
		});
	}
	
		
	let userOnline = JSON.parse(localStorage.getItem('online'))
	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbaropen}
				autoHideDuration={4000}
				onClose={() => setSnackBarOpen(false)}
			>
				<Alert variant="filled" severity={ok}>
					{snackbarmessage}
				</Alert>
			</Snackbar>
			<div className={clsx(classes.root)}>
				<div className={classes.topBg} />
				<div className={clsx(classes.contentCardWrapper, 'container')}>
					<div className={classes.contentCard}>
						{
							userOnline ?
								<Hidden smDown>
									<Drawer
										className="h-full z-15"
										variant="permanent"
										open
										classes={{
											paper: classes.drawerPaper
										}}
									>
										<ChatsSidebar lastMessage={lastmessage} numbers={numbers} onContactClick={(e) => { selectedRecipientt(e) }} selectedRecipient={selectedRecipient} />
									</Drawer>
								</Hidden> : null
						}
						{
							userOnline ? <Hidden mdUp>
								<Drawer
									className="h-full absolute z-20"
									variant="temporary"
									anchor="left"
									open={mobileChatsSidebarOpen}
									onClose={() => setmobileChatsSidebarOpen(false)}
									classes={{
										paper: clsx(classes.drawerPaper, 'absolute ltr:left-0 rtl:right-0')
									}}
									style={{ position: 'absolute' }}
									ModalProps={{
										keepMounted: true,
										disablePortal: true,
										BackdropProps: {
											classes: {
												root: 'absolute'
											}
										}
									}}
								>
									<ChatsSidebar   selectedRecipient={selectedRecipient} lastMessage={lastmessage} numbers={numbers} onContactClick={(e) => { selectedRecipientt(e) }} />
								</Drawer>
							</Hidden> : null
						}
						{userOnline ?
							<main className={clsx(classes.contentWrapper, 'z-10')}>
								{!selectedRecipient ? (
									<div className="flex flex-col flex-1 items-center justify-center p-24">
										<Paper className="rounded-full p-48">
											<Icon className="block text-64" color="secondary">
												chat
									</Icon>
										</Paper>
										<Typography variant="h6" style={{ fontSize: '18px', paddingTop: '14px' }}>
											Chat App
								</Typography>
										<Typography
											className="hidden md:flex px-16 pb-24 mt-10 text-center"
											color="textSecondary">
											Select a contact to start a conversation!
								</Typography>
										<Button
											variant="outlined"
											color="primary"
											className="flex md:hidden normal-case"
											onClick={() => setmobileChatsSidebarOpen(true)}
										>
											Select a contact to start a conversation!
								</Button>
									</div>
								) : (
										<>
											<AppBar className="w-full" position="static" elevation={1} style={{ height: '66px' }}>
												<Toolbar className="px-16">
													<IconButton
														color="inherit"
														aria-label="Open drawer"
														onClick={() => setmobileChatsSidebarOpen(true)}
														className="flex md:hidden"

													>
														<Icon>chat</Icon>
													</IconButton>
													<div
														className="flex items-center cursor-pointer"
													>
														<div className="relative mx-6 w-32 h-32" style={{ marginTop: '30px', marginLeft: '10px' }}>
															<MuiThemeProvider theme={AvatarStyle}>
																<Avatar
																	src={selectedRecipient.avatar} alt={selectedRecipient.name} className={classes.avatar}>
																	{!selectedRecipient.avatar || selectedRecipient.avatar === ''
																		? selectedRecipient.name[0]
																		: ''}
																</Avatar>
															</MuiThemeProvider>
														</div>
														<Typography color="inherit" className="text-14 font-600 px-4" style={{ marginTop: '5px' }}>
															{selectedRecipient.name}
														</Typography>
													</div>
													<div style={{ position: 'absolute', right: 1, top: 11 }} >
														<IconButton
															aria-owns={moreMenuEl ? 'chats-more-menu' : null}
															aria-haspopup="true"
															onClick={handleMoreMenuClick}
															style={{ color: 'white' }}
														>
															<Icon fontSize="small" >more_vert</Icon>
														</IconButton>
														<Menu
															id="chats-more-menu"
															anchorEl={moreMenuEl}
															open={Boolean(moreMenuEl)}
															onClose={handleMoreMenuClose}
														>
															<MenuItem onClick={(e) => conversationActionsCallback('export')}>Export Chat</MenuItem>
															<MenuItem onClick={(e) => conversationActionsCallback('shift')}>Shift</MenuItem>
															<MenuItem onClick={(e) => conversationContextMenuCallback('block')}>Block </MenuItem>
															<MenuItem onClick={(e) => conversationContextMenuCallback('customer_profile')}>Customer Profile </MenuItem>
															<MenuItem onClick={(e) => conversationContextMenuCallback('copy')}>Copy Number </MenuItem>
														</Menu>
													</div>
													<div style={{ position: 'absolute', right: 40, top: 11 }}>
														<Tooltip title="End Conversation">
															<IconButton
																aria-haspopup="true"
																onClick={endConversation}
																style={{ color: 'white' }}
															>
																<Icon fontSize="small" >settings_power</Icon>
															</IconButton>
														</Tooltip>

													</div>
												</Toolbar>
											</AppBar>
											<div className={classes.content}>
												<Chat conversationUpdate={conversationUpdate} className="flex flex-1 z-10" messages={messages} selectedRecipient={selectedRecipient} clearBlock={clearData} endConversation={endConversation} />
											</div>
										</>
									)}
							</main> : null}
					</div>
				</div>
				<XGlobalDialogCmp onDialogPropsChange={sendDialogInputHandler} data={{ dialogType: sendActionType, attachment: sendDialogData }} dialogTitle={sendDialogTitle} options={dialogOptionsConfirmBlock} content={AttachmentDialogV2} defaultState={sendDialogOpen} actions={sendDialogActions} />
				<XGlobalDialogCmp onDialogPropsChange={selectedShiftAgent} data={shiftAgentsList} dialogTitle={`Shift Conversation To Another Agent`} options={dialogOptionsShift} content={ShiftConversationDialog} defaultState={dialogOpenShift} actions={dialogActionsShift} />
				<XGlobalDialogCmp onDialogPropsChange={selectedCannedMessage} data={cannedMessagesList} dialogTitle={`Canned Replies`} options={dialogOptionsCanned} content={CannedMessagesDialog} defaultState={dialogOpenCanned} actions={dialogActionsCanned} />
				<XGlobalDialogCmp onDialogPropsChange={blockCustomerInputHandler} data={selectedRecipient} dialogTitle={`Confirm Block`} options={dialogOptionsConfirmBlock} content={BlockConfirmDialog} defaultState={dialogOpenConfirmBlock} actions={dialogActionsConfirmBlock} />
				<XGlobalDialogCmp onDialogPropsChange={customerProfileInputHandler} data={customerProfileData} dialogTitle={`Customer Profile`} options={dialogOptionsCmp} content={CustomerProfileDialog} defaultState={dialogOpenCmp} actions={dialogActionsCmp} />
			</div>
		</>
	);
}

export default withReducer('chatApp', reducer)(ChatApp);
