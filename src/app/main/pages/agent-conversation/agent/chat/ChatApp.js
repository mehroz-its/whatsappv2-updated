import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChatsSidebar from '../../../chat/ChatsSidebar';
import ContactSidebar from '../../../chat/ContactSidebar';
import StatusIcon from './StatusIcon';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import UserSidebar from '../../../chat/UserSidebar';
import CoreHttpHandler from '../../../../../../http/services/CoreHttpHandler';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import XGlobalDialogCmp from '../../../../../../dialogs/XGlobalDialogCmp';
import ShiftConversationDialog from './dialog/chat/ShiftConversationDialog';
import { CSVLink, CSVDownload } from 'react-csv';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import copy from 'copy-to-clipboard';
import { EventEmitter } from '../../../../../../events'

const drawerWidth = 320;
const headerHeight = 200;

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
		// padding: 10,
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
		borderRadius: 8,
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

const selectedContactId = "5725a680b3249760ea21de52";
const chat = null

function ChatApp(props) {
	const dispatch = useDispatch();
	const { numberr, selectedAgent } = props
	// console.log(numberr, 'propssss')

	// const chat = useSelector(({ chatApp }) => chatApp.chat);
	// const contacts = useSelector(({ chatApp }) => chatApp.contacts.entities);
	// const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);
	const mobileChatsSidebarOpen = false;
	const userSidebarOpen = false;
	const contactSidebarOpen = false;
	let NewMessagess = []
	const [lastMessageTimestamp, setlastMessageTimestamp] = React.useState(null);
	const [latestMessageSender, setlatestMessageSender] = React.useState(null);
	const [NewAgent, setNewAgent] = React.useState(selectedAgent);
	const [numbers, setnumbers] = React.useState(numberr);
	const [LoaderValue,setLoaderValue] = React.useState('')
	const [messages, setmessages] = React.useState([]);
	const [NewMessages, setNewMessages] = React.useState([]);
	const [showLatestMessage, setshowLatestMessage] = React.useState(false);
	const [selectedRecipient, setselectedRecipient] = React.useState(null);
	const [int_CustomerList, setint_CustomerList] = React.useState(null);
	const [int_MessageLists, setint_MessageLists] = React.useState(null);
	const [moreMenuEl, setMoreMenuEl] = React.useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	
	// console.log(NewAgent, 'iiiiii')
	useEffect(() => {
		return () => {
			if(int_MessageLists){
				clearInterval(int_MessageLists)
			}
		}
	}, [])

	// const [dialogOpenConfirmBlock, setdialogOpenConfirmBlock] = React.useState(false);

		
	const classes = useStyles(props);
	const selectedContact = contacts.find(_contact => _contact.id === selectedContactId);
	const selectedRecipientt = (e) => {
		// console.log("selectedRecipientt");
		clearInterval(int_MessageLists);
		setselectedRecipient(e)
		getConversation(e);
		// if (selectedRecipient !== null) {
		setint_MessageLists(setInterval(() => {
			getConversation(e);
		}, 3000));
		// }
	}
	// const getNumbers = () => {
	// 	CoreHttpHandler.request('conversations', 'numbers', {}, (response) => {
	// 		const numbers = response.data.data.customers;
	// 		const lastMessage = response.data.data.lastMessage;
	// 		if (lastMessage) {
	// 			const lastMessageDtu = new Date(lastMessage.dtu);
	// 			if (lastMessageTimestamp === null)
	// 				setlastMessageTimestamp(new Date(lastMessage.dtu))
	// 			if (lastMessageTimestamp < lastMessageDtu) {
	// 				// if (lastMessage.name !== null) {
	// 				//     this.setSnackBarMessage(`New Message From [${lastMessage.name}]`, 'success', 'new_message');
	// 				// } else this.setSnackBarMessage(`New Message From [${lastMessage.number}]`, 'success', 'new_message');
	// 				setlastMessageTimestamp(lastMessageDtu);
	// 				setlatestMessageSender(lastMessage.number);
	// 			}
	// 		}
	// 		// setnumbers(numbers)
	// 	}, (response) => {
	// 	});
	// }
	const getConversation = (e) => {
		// console.log("getConversation selectedRecipient :", e);
		let params = {
			key: ':number',
			value: e.number,
			params: {
				agentId: selectedAgent
			}

		};
	
		// console.log("params : ", params);
		CoreHttpHandler.request('conversations', 'agents_customer_conversations', params, (response) => {
			// console.log("response :", response);
			if (response.data.data.conversation.length > NewMessagess.length) {
				//   console.log("response if");
				const messagess = response.data.data.conversation;
				// console.log("messages : ", messages);
				NewMessagess = response.data.data.conversation
				// setNewMessages(response.data.data.conversation)
				setmessages(messagess)
				setshowLatestMessage(true)
				// setselectedRecipient(e)
			}
			else {
				// console.log('response else ');
				const messages = response.data.data.conversation;
				// setmessages(messages)
				// setshowLatestMessage(false)
			}
			// if (int_MessageLists === null) setint_MessageLists(setInterval(() => {
			// 	getConversation(e);
			// }, 6000));

		}, (response) => {

		});
	}

	const conversationActionsCallback = (action) => {
		// setAnchorEl(null);
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
			const csvLink = (<CSVLink filename={`chat_${selectedRecipient.number}_${new Date().toISOString()}.csv`} data={messages}>Your exported chat is ready for download</CSVLink>);
			alert(csvLink)
			setMoreMenuEl(null);
		}, (response) => {

		});
	}
	const conversationShift = () => {
		CoreHttpHandler.request('conversations', 'agent_admin_list', {  columns: 'id, username, email, number' }, (response) => {
			const data = response.data.data.agents.data.filter(el=>el.id!=selectedRecipient.a_id);

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
				// console.log("customer : ", customer);
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
	const { open } = props
	const [opened,setOpened] = React.useState(open)
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
	// const dialogOptionsConfirmBlock = {
	// 	onClose: function () {
	// 		setdialogOpenConfirmBlock(false)

	// 	},
	// 	'aria-labelledby': "form-dialog-title",
	// 	'aria-describedby': "form-dialog-title"
	// };

	const getLoadingVal = (e) =>{

	setLoaderValue(e)

	}

	setTimeout(() => {
		setLoaderValue(false)
	}, 5000);

	useEffect(() => {
		EventEmitter.subscribe('ShowHideLoader', (e) =>	getLoadingVal(e))
		setNewAgent(selectedAgent)
		// console.log("numbers :L ", numbers);
		// console.log("getNumbers use efffact = > ", selectedRecipient);
		if (NewAgent != selectedAgent) {
		
              setselectedRecipient(null)
		}
		return () => {
			clearInterval(int_MessageLists);
		}
	}, [numberr, selectedRecipient]);


	const clearData = () => {
		setselectedRecipient(null)
		setmessages([])
		clearInterval(this.int_MessageLists);
		// clearInterval(this.int_CustomerList);
		// 	getNumbers();
		// setint_CustomerList = setInterval(() => {
		// 	getNumbers();
		// }, 1000);
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
			// this.setSnackBarMessage('Failed to load canned messages, please try again later', 'error');
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
		// console.log("selectedShiftAgent agent ", agent)
		// console.log("selectedShiftAgent selectedRecipient ", selectedRecipient)

		CoreHttpHandler.request('conversations', 'transfer', {
			key: ':id',
			value: agent.id,
			params: {
				customer: selectedRecipient.number
			}
		}, (response) => {
		EventEmitter.dispatch('GetAgentsAgain',true)
			
			// alert("selectedShiftAgent ")
			setdialogOpenShift(false)
			clearData()
			props.reloadNumber()
		}, (response) => {
			setdialogOpenShift(false)
			props.reloadNumber()
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
		// alert("setdialogOpenShift : " )
		// EventEmitter.dispatch('GetAgentsAgain',true)
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
				// setMessageText("")
				setdialogOpenCanned(false)

			}, (error) => {
			});
		} else {
			// setMessageText(message_text)
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
		// console.log('blockNumber');

		CoreHttpHandler.request('conversations', 'block', {
			key: ':number', value: selectedRecipient.number, params: {
				reason: blockReason,
			}
		}, (response) => {
			setdialogOpenConfirmBlock(false)
			setblockReason('')
			setAnchorEl(false)
			clearData()
			// props.agentShift()
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
			// const clearData2 = () => {
			setdialogOpenCmp(false)
			// clearInterval(this.int_MessageLists);
			// clearInterval(this.int_CustomerList);
			// 	getNumbers();
			// setint_CustomerList = setInterval(() => {
			// 	getNumbers();
			// }, 1000);
			// }



		}, (error) => {
			// if (error.hasOwnProperty('response')) {
			//     if (error.response.hasOwnProperty('data')) {
			//         this.setSnackBarMessage(error.response.data.message, 'error');
			//     }
			// } else this.setSnackBarMessage('Failed to update profile, please try again later', 'error');

		});
	}
	// console.log(valueofEvent,'open from state');
	// console.log(props,'allllthepropsssssssss');
	console.log(props.Loading,LoaderValue,'lossssssssssss');
	return (
		<>
		<Snackbar

		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		open={props.open}
		autoHideDuration={3000}

	>
		<Alert variant="filled" severity={props.ok}>
			{props.message}
		</Alert>
	</Snackbar>
		<div className={clsx(classes.root)}>
			<div className={classes.topBg} />
			<div className={clsx(classes.contentCardWrapper, 'container')}>
				<div className={classes.contentCard}>
					<Hidden mdUp>
						<Drawer
							className="h-full absolute z-20"
							variant="temporary"
							anchor="left"
							open={mobileChatsSidebarOpen}
							onClose={() => dispatch(Actions.closeMobileChatsSidebar())}
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
							<ChatsSidebar numbers={numberr} onContactClick={(e) => { selectedRecipientt(e) }} />
						</Drawer>
					</Hidden>
					<Hidden smDown>
						<Drawer
							className="h-full z-20"
							variant="permanent"
							open
							classes={{
								paper: classes.drawerPaper
							}}
						>
					
		{/* {props.Loading === true||LoaderValue === true ?
			<div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
			<CircularProgress color="secondary" />
			</div>
	
		:
			<ChatsSidebar numbers={numberr} onContactClick={(e) => { selectedRecipientt(e) }} Loading={props.Loading} />  

} */}
<ChatsSidebar numbers={numberr} onContactClick={(e) => { selectedRecipientt(e) }} Loading={props.Loading} />  

						
					
						</Drawer>
					</Hidden>
					<Drawer
						className="h-full absolute z-30"
						variant="temporary"
						anchor="left"
						open={userSidebarOpen}
						onClose={() => dispatch(Actions.closeUserSidebar())}
						classes={{
							paper: clsx(classes.drawerPaper, 'absolute left-0')
						}}
						style={{ position: 'absolute' }}
						ModalProps={{
							keepMounted: false,
							disablePortal: true,
							BackdropProps: {
								classes: {
									root: 'absolute'
								}
							}
						}}
					>
						<UserSidebar />
					</Drawer>

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
									onClick={() => dispatch(Actions.openMobileChatsSidebar())}
								>
									Select a contact to start a conversation!..
								</Button>
							</div>
						) : (
								<>
									<AppBar className="w-full" position="static" elevation={1}  >
										<Toolbar className="px-16">
											<IconButton
												color="inherit"
												aria-label="Open drawer"
												onClick={() => dispatch(Actions.openMobileChatsSidebar())}
												className="flex md:hidden"
											>
												<Icon>chat</Icon>
											</IconButton>
											<div
												className="flex items-center cursor-pointer"
										
										
												style={{ marginTop: '-10px' }}
											>
												<div className="relative mx-8 " style={{marginTop:'3px'}}>
													<div className="absolute right-0 bottom-0 -m-4 z-10">
														<StatusIcon status={selectedRecipient.status} />
													</div>

													<Avatar src={selectedRecipient.avatar} alt={selectedRecipient.name}>
														{!selectedRecipient.avatar || selectedRecipient.avatar === ''
															? selectedRecipient.name[0]
															: ''}
													</Avatar>
												</div>
												<div style={{marginTop:'3px'}}>
												<Typography color="inherit" className="text-12 font-600 px-4">
													{selectedRecipient.name}
												</Typography>
												</div>
											</div>
											<div style={{ position: 'absolute', right: 20,top:17 }}>
												<Button
											 onClick= {(e)=>conversationActionsCallback('shift')}
											 fullWidth
											 variant="contained"
											 size="small"
												>
												 Take Over
												</Button>
												<Menu
													id="chats-more-menu"
													anchorEl={moreMenuEl}
													open={Boolean(moreMenuEl)}
													onClose={handleMoreMenuClose}
												>
													<MenuItem onClick={(e) => conversationActionsCallback('shift')}>shift</MenuItem>
												</Menu>
											</div>
										</Toolbar>
									</AppBar>

									<div className={classes.content}>
										<Chat className="flex flex-1 z-10" messages={messages} selectedRecipient={selectedRecipient} clearBlock={clearData} reloadNumber={() => alert("ChatApp")} />
									</div>
								</>
							)}
					</main>

					<Drawer
						className="h-full absolute z-30"
						variant="temporary"
						anchor="right"
						open={contactSidebarOpen}
						onClose={() => dispatch(Actions.closeContactSidebar())}
						classes={{
							paper: clsx(classes.drawerPaper, 'absolute ltr:right-0 rtl:left-0')
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
						<ContactSidebar />
					</Drawer>
				</div>
			</div>
			<XGlobalDialogCmp onDialogPropsChange={selectedShiftAgent} data={shiftAgentsList} dialogTitle={`Shift Conversation To Another Agent`} options={dialogOptionsShift} content={ShiftConversationDialog} defaultState={dialogOpenShift} actions={dialogActionsShift} />

		</div>
		</>
	);
}

export default withReducer('chatApp', reducer)(ChatApp);
