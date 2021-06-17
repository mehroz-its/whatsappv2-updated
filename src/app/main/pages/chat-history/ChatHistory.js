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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat';
import ChatsSidebar from '../chat/ChatsSidebar';
import ContactSidebar from '../chat/ContactSidebar';
import StatusIcon from '../chat/StatusIcon';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import UserSidebar from '../chat/UserSidebar';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AttachmentDialogV2 from '../../globalComponents/dialogs/AttachmentDialogV2';
import CannedMessagesDialog from '../../globalComponents/dialogs/CannedMessagesDialog';
import BlockConfirmDialog from '../../globalComponents/dialogs/BlockConfirmDialog';
import CustomerProfileDialog from '../../globalComponents/dialogs/CustomerProfileDialog';
import XGlobalDialogCmp from '../../../../dialogs/XGlobalDialogCmp';
import ShiftConversationDialog from '../../globalComponents/dialogs/ShiftConversationDialog';
import { CSVLink, CSVDownload } from 'react-csv';
import copy from 'copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import WebSocket from '../../../socket/WebSocket';
import DateRangePickerVal from './DatePicker';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';

var Start = '';
var End = '';
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
		avatar: 'assets/images/avatars/alice.jpg',
		id: '5725a680b3249760ea21de52',
		mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
		name: 'Alice Freeman',
		status: 'online',
		unread: '2'
	},
	{
		avatar: 'assets/images/avatars/Arnold.jpg',
		id: '5725a680606588342058356d',
		mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
		name: 'Arnold',
		status: 'do-not-disturb',
		unread: '3'
	},
	{
		avatar: 'assets/images/avatars/Barrera.jpg',
		id: '5725a68009e20d0a9e9acf2a',
		mood: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
		name: 'Arnold',
		status: 'do-not-disturb',
		unread: '3'
	}
];
const user = {
	avatar: 'assets/images/avatars/profile.jpg',
	chatList: [
		{
			chatId: '1725a680b3249760ea21de52',
			contactId: '5725a680b3249760ea21de52',
			lastMessageTime: '2017-06-12T02:10:18.931Z'
		},
		{
			chatId: '2725a680b8d240c011dd2243',
			contactId: '5725a680606588342058356d',
			lastMessageTime: '2017-02-18T10:30:18.931Z'
		}
	],
	id: '5725a6802d10e277a0f35724',
	mood: "it's a status....not your diary...",
	name: 'John Doe',
	status: 'online'
};
const selectedContactId = '5725a680b3249760ea21de52';
const chat = null;
function ChatApp(props) {
	const socket = WebSocket.getSocket();

	const dispatch = useDispatch();
	const mobileChatsSidebarOpen = false;
	const userSidebarOpen = false;
	const contactSidebarOpen = false;
	var abc = [];
	const [chatsLoading, setChatsLoading] = useState(false);
	const [lastMessageTimestamp, setlastMessageTimestamp] = React.useState(null);
	const [latestMessageSender, setlatestMessageSender] = React.useState(null);
	const [numbers, setnumbers] = React.useState([]);
	const [searchedContact, setSearchedContact] = React.useState('');
	const [messages, setmessages] = React.useState([]);
	const [NewMessages, setNewMessages] = React.useState([]);
	const [showLatestMessage, setshowLatestMessage] = React.useState(false);
	const [selectedRecipient, setselectedRecipient] = React.useState(null);
	// const [int_CustomerList, setint_CustomerList] = React.useState(null);
	// const [int_MessageLists, setint_MessageLists] = React.useState(null);
	const [moreMenuEl, setMoreMenuEl] = React.useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [snackbaropen, setSnackBarOpen] = React.useState(false);
	const [snackbarmessage, setSnackBarMessage] = React.useState('');
	const [ok, setOK] = React.useState('');
	const classes = useStyles(props);
	const [conversationDummy, setConversationDummy] = React.useState(null);
	const selectedContact = contacts.find(_contact => _contact.id === selectedContactId);
	const [updateCustomerMessages, setUpdateCustomerMessages] = React.useState(null);
	const [historyOnTop, setHistoryOnTop] = React.useState(null);
	const [listPage, setListPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [totalItemsssssssss, setTotalItemssssssss] = useState(0);
	const [totalItemsNum, setTotalItemsNum] = useState(0);
	const [msgsLoading, setMsgsLoading] = useState(false);

	const selectedRecipientt = e => {
		// clearInterval(int_MessageLists);
		setselectedRecipient(e);
		getConversation(e);
		setOpenSearch(false);
		console.log(e);
		// setint_MessageLists(setInterval(() => {
		// 	getConversation(e);
		// }, 3000));
	};

	const SelectedDates = ({ startDate, endDate }) => {
		if (openSearch) {
			var tzoffset = new Date().getTimezoneOffset() * 60000;
			var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);

			let input = { startDate: null, endDate: null };
			if (startDate) {
				console.log('SelectedDates if startDate', startDate);
				input.startDate = startDate.startOf('day').toDate();
				var tzoffset = input.startDate.getTimezoneOffset() * 60000;
				input.startDate = new Date(input.startDate - tzoffset).toISOString();
			}
			if (endDate) {
				console.log(' SelectedDates if endDate', endDate);
				input.endDate = endDate.endOf('day').toDate();
				var tzoffset = input.endDate.getTimezoneOffset() * 60000;
				input.endDate = new Date(input.endDate - tzoffset).toISOString();
			}
			console.log('SelectedDates input', input);

			getFilterMessages(input);
		}
	};

	const getFilterMessages = ({ startDate, endDate }) => {
		// let params = {
		// 	key: ':number',
		// 	value: selectedRecipient.number,

		// 	key2: ':start_date',
		// 	value2: startDate ? startDate : null,

		// 	key3: ':last_closed',
		// 	value3: endDate ? endDate : null
		// };

		let params = {
			number: selectedRecipient.number,
			start_date: startDate ? startDate : null,
			last_closed: endDate ? endDate : null,
			page: 0,
			limit: 0
		};

		CoreHttpHandler.request('conversations', 'historyConversationsPagination', params, response => {
			setmessages(response.data.data.chat);
			abc = response.data.data.chat;
			setshowLatestMessage(true);
		});
	};

	React.useEffect(() => {
		if (updateCustomerMessages) {
			if (numbers && numbers.length) {
				let _numbers = numbers.map(el => {
					if (el.id == updateCustomerMessages.id) {
						updateCustomerMessages.name = updateCustomerMessages.assign_name;
						if (updateCustomerMessages.assign_name != undefined) delete updateCustomerMessages.assign_name;

						let _selectedRecipient = selectedRecipient;

						Object.keys(updateCustomerMessages).map(key => {
							if (el[key] != updateCustomerMessages[key]) {
								el[key] = updateCustomerMessages[key];
								if (_selectedRecipient) _selectedRecipient[key] = updateCustomerMessages[key];
							}
						});
						if (_selectedRecipient) setselectedRecipient(_selectedRecipient);
					}

					return el;
				});

				setnumbers(_numbers);
			}
		}
	}, [updateCustomerMessages]);
	useEffect(() => {
		if (conversationDummy) {
			let _numbers = [];

			if (numbers && numbers.length) {
				if (selectedRecipient && selectedRecipient.id == conversationDummy.id) {
					selectedRecipientt(conversationDummy);
				}

				_numbers = numbers.filter(el => el && el.id != conversationDummy.id);
				_numbers = _numbers.filter(el => el);
			}
			_numbers = [conversationDummy, ..._numbers];

			setnumbers(_numbers);
		}
	}, [conversationDummy]);
	useEffect(() => {
		if (historyOnTop && historyOnTop.customerId && numbers && numbers.length) {
			let customerId = historyOnTop.customerId;

			let _numbers = [...numbers.filter(el => el.id == customerId), ...numbers.filter(el => el.id != customerId)];

			setnumbers(_numbers);
		}
	}, [historyOnTop]);

	useEffect(() => {
		socket.on('updateHistoryConversation', data => {
			setConversationDummy(data);
		});

		socket.on('updateCustomerMessages', data => {
			setUpdateCustomerMessages(data);
		});

		socket.on('historyOnTop', data => {
			setHistoryOnTop(data);
		});

		getNumbers();

		return () => {
			socket.removeListener('updateHistoryConversation');
			socket.removeListener('updateCustomerMessages');
			socket.removeListener('historyOnTop');

			// if(int_CustomerList){
			// 	clearInterval(int_CustomerList)
			// }

			// if(int_MessageLists){
			// 	clearInterval(int_MessageLists)
			// }
		};
	}, []);
	const getNumbers = () => {
		setChatsLoading(true);
		setListPage(listPage + 1);
		CoreHttpHandler.request(
			'conversations',
			'historyNumbers',
			{
				page: listPage ? listPage : 0,
				limit: 50
			},
			response => {
				const numberrrrrr = response.data.data.customers;
				const lastMessage = response.data.data.lastMessage;
				console.log(response.data.data, 'totiietttttttttttt');
				setTotalItemsNum(response.data.data.customers.totalItems);
				if (lastMessage) {
					const lastMessageDtu = new Date(lastMessage.dtu);
					if (lastMessageTimestamp === null) setlastMessageTimestamp(new Date(lastMessage.dtu));
					if (lastMessageTimestamp < lastMessageDtu) {
						setlastMessageTimestamp(lastMessageDtu);
						setlatestMessageSender(lastMessage.number);
					}
				}
				setChatsLoading(false);
				console.log(numberrrrrr, 'nummmmmmmmmmm');
				// let tempArr = [];
				// let newObj = {
				// 	limit: 10,
				// 	page: listPage ? listPage : 1,
				// 	totalItems: numberrrrrr?.totalItems,
				// 	totalPages: numberrrrrr?.totalPages
				// };
				// let newObj = {
				// 	limit: 10,
				// 	page: listPage ? listPage : 1,
				// 	totalItems: numberrrrrr?.totalItems,
				// 	totalPages: numberrrrrr?.totalPages
				// };
				setnumbers([...numbers, ...numberrrrrr.customers]);
				// numbers['rest'] = newObj;
				// let newObj = {
				// 	customers: numbers.customers ? numbers.customers : [],
				// 	limit: 10,
				// 	page: listPage ? listPage : 1,
				// 	totalItems: numberrrrrr?.totalItems,
				// 	totalPages: numberrrrrr?.totalPages
				// };
				// let tempArr = newObj;
				// console.log(tempArr, 'TEMPPPPPPPPPPPPPPPPPPPp');
				// tempArr.customers.push(numberrrrrr.customers);
				// console.log(tempArr, 'TEMPPPPPPPPPPPPPPPPPPPp_AFTERRRRRRRRRRRRRR');
				// setnumbers([...numbers, ...tempArr.customers	]);

				// tempArr.push({ ...newObj, customers: numberrrrrr?.customers });
				// tempArr.customers.push(numberrrrrr?.customers);
				// console.log(tempArr, 'trempppppppppp');
				// if (numbers.length < 10) {
				// 	setnumbers(numberrrrrr);
				// } else {
				// 	setnumbers(...numberrrrrr, numberrrrrr.customers);
				// }
			},
			response => {}
		);
	};

	const getConversation = (e, msgPage, isLoadMore) => {
		// console.log(msgPage, 'msssssssssssssssssssssssssssssssss');
		setMsgsLoading(true);
		let params = {
			number: e.number,
			start_date: null,
			last_closed: e.last_closed,
			page: msgPage ? msgPage : 0,
			limit: 100
		};
		CoreHttpHandler.request(
			'conversations',
			'historyConversationsPagination',
			params,
			response => {
				let msgsssss = response.data.data.chat;
				setMsgsLoading(false);
				if (response.data.data.chat.length > abc.length) {
					if (isLoadMore) {
						setmessages([...msgsssss, ...messages]);
					} else {
						setmessages([...msgsssss]);
					}
					// setmessages(response.data.data.chat);
					abc = response.data.data.chat;
					setshowLatestMessage(true);
					setMsgsLoading(false);
					setTotalPages(response.data.data.totalPages);
					setChatsLoading(false);
					setTotalItemssssssss(response.data.data.totalItems);
				}
				CoreHttpHandler.request(
					'conversations',
					'reset_message_count',
					{ key: ':number', value: e.number },
					response => {
						setChatsLoading(false);
					},
					response => {}
				);
			},
			response => {}
		);
	};

	const conversationActionsCallback = action => {
		if (action === 'export') conversationExport();
		if (action === 'shift') conversationShift();
	};
	const conversationExport = () => {
		let params = {
			// key: ':number',
			// value: selectedRecipient.number,
			// key2: ':last_closed',
			// value2: selectedRecipient.last_closed
			last_closed: selectedRecipient.last_closed,
			limit: 100,
			number: selectedRecipient.number,
			page: 0,
			start_date: null
		};
		CoreHttpHandler.request(
			'conversations',
			'conversations',
			params,
			response => {
				const messages = response.data.data.chat;
				const csvLink = (
					<CSVLink
						filename={`chat_${selectedRecipient.number}_${new Date().toISOString()}.csv`}
						data={messages}
					>
						<span style={{ color: 'white' }}>Your exported chat is ready for download</span>
					</CSVLink>
				);
				setSnackBarMessage(csvLink);
				setOK('success');
				setSnackBarOpen(true);
				setMoreMenuEl(null);
			},
			response => {}
		);
	};
	const conversationShift = () => {
		CoreHttpHandler.request(
			'conversations',
			'agent_list',
			{ role: 64, columns: 'id, username, email, number' },
			response => {
				const data = response.data.data.agents.data;
				setshiftAgentsList(data);
				setdialogOpenShift(true);
				setMoreMenuEl(null);
			},
			response => {}
		);
	};
	const conversationContextMenuCallback = item => {
		if (item === 'customer_profile') {
			profileDialog();
			setMoreMenuEl(null);
		}
		if (item === 'canned_messages') {
			cannedMessagesDialog();
			setMoreMenuEl(null);
		}
		if (item === 'block') {
			setdialogOpenConfirmBlock(true);
			setMoreMenuEl(null);
		}
		if (item === 'copy') {
			copyContent();
			setMoreMenuEl(null);
		}
	};
	const profileDialog = () => {
		CoreHttpHandler.request(
			'contact_book',
			'fetch',
			{
				key: ':number',
				value: selectedRecipient.number
			},
			response => {
				const customer = response.data.data.customer;
				loadCountries().then(response => {
					const countries = response.data.data.list.data;
					setcustomerProfileData({
						id: customer.id,
						number: selectedRecipient.number,
						attributes: customer.attributes,
						assign_name: selectedRecipient.name == selectedRecipient.number ? '' : selectedRecipient.name,
						countries
					});
					setAnchorEl(false);
					setdialogOpenCmp(true);
				});
			},
			error => {
				setAnchorEl(false);
				setdialogOpenCmp(false);
			}
		);
	};
	const loadCountries = () => {
		return CoreHttpHandler.request(
			'locations',
			'get_countries',
			{
				columns: 'id, name',
				sortby: 'ASC',
				orderby: 'id',
				where: 'enabled = $1',
				values: true,
				page: 0,
				limit: 0
			},
			null,
			null,
			true
		);
	};
	const copyContent = () => {
		copy(selectedRecipient.number);
		setSnackBarMessage('Copied Successfully');
		setOK('success');
		setSnackBarOpen(true);
	};

	const [sendDialogData, setsendDialogData] = React.useState({
		url: '',
		caption: '',
		attributes: null
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
		countries: []
	});
	const [dialogOpenCmp, setdialogOpenCmp] = React.useState(false);

	const [openSearch, setOpenSearch] = React.useState(false);
	const openSearchMenu = e => {
		if (openSearch && selectedRecipient) {
			getConversation(selectedRecipient);
		}

		setOpenSearch(!openSearch);
	};
	const sendDialogActions = [
		{
			handler: (event, index) => {
				setsendActionType(null);
				setsendDialogTitle('');
				setsendDialogOpen(false);
			},
			options: {},
			label: 'Cancel'
		},
		{
			handler: (event, index) => {
				sendDialogActionCb();
			},
			options: {},
			label: 'Send'
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

		CoreHttpHandler.request(
			'conversations',
			'send',
			{ key: ':type', value: sendActionType, params: args[sendActionType] },
			response => {
				setsendActionType(null);
				setsendDialogTitle('');
				setsendDialogOpen(false);
				setsendDialogData({
					url: '',
					caption: '',
					attributes: null
				});
			},
			response => {}
		);
	};
	const dialogOptionsConfirmBlock = {
		onClose: function () {
			setdialogOpenConfirmBlock(false);
		},
		'aria-labelledby': 'form-dialog-title',
		'aria-describedby': 'form-dialog-title'
	};

	// useEffect(() => {
	// 	getNumbers()
	// 	return () => {
	// 		// clearInterval(int_MessageLists);
	// 	}
	// }, [selectedRecipient]);

	// if (int_CustomerList === null) setint_CustomerList(setInterval(() => {
	// 	getNumbers();
	// }, 2000));
	const clearData = () => {
		setselectedRecipient(null);
		setmessages([]);
		clearInterval(this.int_MessageLists);
	};
	function handleMoreMenuClick(event) {
		setMoreMenuEl(event.currentTarget);
	}
	function handleMoreMenuClose(event) {
		setMoreMenuEl(null);
	}
	const cannedMessagesDialog = () => {
		CoreHttpHandler.request(
			'canned_messages',
			'listing',
			{
				columns: '*',
				sortby: 'ASC',
				orderby: 'id',
				where: 'enabled = $1',
				values: true,
				page: 0,
				limit: 0
			},
			response => {
				const data = response.data.data.list.data;
				setcannedMessagesList(data);
				setdialogOpenCanned(true);
				setMoreMenuEl(null);
			},
			error => {}
		);
	};
	const sendDialogInputHandler = e => {
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
		setsendDialogData(data);
	};
	const selectedShiftAgent = agent => {
		CoreHttpHandler.request(
			'conversations',
			'transfer',
			{
				key: ':id',
				value: agent.id,
				params: {
					customer: selectedRecipient.number
				}
			},
			response => {
				setdialogOpenShift(false);
				clearData();
			},
			response => {}
		);
	};
	const dialogOptionsShift = {
		onClose: function () {
			setdialogOpenShift(false);
		},
		'aria-labelledby': 'form-dialog-title',
		'aria-describedby': 'form-dialog-title'
	};
	const dialogActionsShift = [
		{
			handler: (event, index) => {
				XGlobalDialogShiftClose();
			},
			options: {},
			label: 'Cancel'
		}
	];
	const XGlobalDialogShiftClose = () => {
		setdialogOpenShift(false);
	};
	const selectedCannedMessage = props => {
		const { message_text, message_type, attachment_url, attachment_name, attachment_type } = props;
		if (message_type !== 'text') {
			let params = {
				type: message_type
			};
			params[message_type] = {
				to: [selectedRecipient.number],
				message: {
					filname: attachment_name,
					mime_type: attachment_type,
					url: attachment_url,
					caption: message_text
						? message_text
						: `You Shared A ${message_type.charAt(0).toUpperCase()}${message_type.slice(1)}`
				}
			};
			CoreHttpHandler.request(
				'conversations',
				'send',
				{
					key: ':type',
					value: message_type,
					params
				},
				response => {
					setdialogOpenCanned(false);
				},
				error => {}
			);
		} else {
			setdialogOpenCanned(false);
		}
	};
	const dialogOptionsCanned = {
		onClose: function () {
			setdialogOpenCanned(false);
		},
		'aria-labelledby': 'form-dialog-title',
		'aria-describedby': 'form-dialog-title'
	};
	const dialogActionsCanned = [
		{
			handler: (event, index) => {
				XGlobalDialogCannedClose();
			},
			options: {},
			label: 'Cancel'
		}
	];
	const blockCustomerInputHandler = props => {
		const { key, value, event, dataKey } = props;
		setblockReason(value);
	};
	const dialogActionsConfirmBlock = [
		{
			handler: (event, index) => {
				XGlobalDialogConfirmBlock();
			},
			options: {},
			label: 'Cancel'
		},
		{
			handler: (event, index) => {
				blockNumber();
			},
			options: {},
			label: 'Yes'
		}
	];
	const blockNumber = () => {
		CoreHttpHandler.request(
			'conversations',
			'block',
			{
				key: ':number',
				value: selectedRecipient.number,
				params: {
					reason: blockReason
				}
			},
			response => {
				setSnackBarMessage('Blocked Successfully');
				setOK('success');
				setSnackBarOpen(true);

				setdialogOpenConfirmBlock(false);
				setblockReason('');
				setAnchorEl(false);
				clearData();
			},
			error => {
				setAnchorEl(false);
				setdialogOpenConfirmBlock(false);
			}
		);
	};
	const customerProfileInputHandler = props => {
		const { key, value, event, dataKey } = props;
		const data = { ...customerProfileData };
		data[key] = value.attrs;
		data['assign_name'] = value.assigned_name;
		setcustomerProfileData(data);
	};
	const dialogOptionsCmp = {
		onClose: function () {
			setdialogOpenCmp(false);
		},
		'aria-labelledby': 'form-dialog-title',
		'aria-describedby': 'form-dialog-title'
	};
	const XGlobalDialogCannedClose = () => {
		setdialogOpenCanned(false);
	};
	const XGlobalDialogConfirmBlock = () => {
		setdialogOpenConfirmBlock(false);
	};
	const dialogActionsCmp = [
		{
			handler: (event, index) => {
				XGlobalDialogCmpClose();
			},
			options: {},
			label: 'Close'
		},
		{
			handler: (event, index) => {
				profileUpdate();
			},
			options: {},
			label: 'Update'
		}
	];
	const XGlobalDialogCmpClose = () => {
		setdialogOpenCmp(false);
	};
	const profileUpdate = () => {
		const data = { ...customerProfileData };

		data['number'] = selectedRecipient.number;

		CoreHttpHandler.request(
			'contact_book',
			'update',
			{
				key: ':id',
				value: customerProfileData.id,
				params: data
			},
			response => {
				setSnackBarMessage('Updated Successfully');
				setOK('success');
				setSnackBarOpen(true);

				setselectedRecipient({
					...selectedRecipient,
					name: data.assign_name,
					attributes: data.attributes
				});
				setdialogOpenCmp(false);
			},
			error => {
				if (error && error.response && error.response.data) {
					setSnackBarMessage(error.response.data.message);
				} else {
					setSnackBarMessage('Could not save record');
				}
				setOK('error');
				setSnackBarOpen(true);
			}
		);
	};
	const onSearchInput = val => {
		setSearchedContact(val);
	};

	// console.log(numbers, 'NUMBERRRRRRRRRRRRRRRRRRRRRRRRRR');
	// let num = numbers?.customers?.filter(num => console.log(num.number,num.name,searchedContact, 'ASDSADS'));
	const filtered =
		searchedContact.charAt(0) === '9'
			? numbers?.filter(num => num.number.includes(searchedContact))
			: numbers?.filter(num => num.name.toLowerCase().includes(searchedContact.toLowerCase()));
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
								<ChatsSidebar
									numbers={filtered}
									getNumbers={getNumbers}
									totalPages={totalPages}
									sideBarPage={listPage}
									totalItemsNum={totalItemsNum}
									chatsLoading={chatsLoading}
									onContactClick={e => {
										selectedRecipientt(e);
									}}
								/>
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
								<ChatsSidebar
									getNumbers={getNumbers}
									searchedContact={onSearchInput}
									chatsLoading={chatsLoading}
									totalItemsNum={totalItemsNum}
									numbers={filtered}
									onContactClick={e => {
										setmessages([]);
										selectedRecipientt(e);
									}}
								/>
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
										Chat History
									</Typography>
									<Typography
										className="hidden md:flex px-16 pb-24 mt-10 text-center"
										color="textSecondary"
									>
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
									<AppBar
										className="w-full"
										position="static"
										elevation={1}
										style={{ height: '66px' }}
									>
										<Toolbar className="px-16">
											<IconButton
												color="inherit"
												aria-label="Open drawer"
												onClick={() => dispatch(Actions.openMobileChatsSidebar())}
												className="flex md:hidden"
												style={{ marginTop: '-10px' }}
											>
												<Icon>chat</Icon>
											</IconButton>
											<div className="flex items-center cursor-pointer">
												<div className="relative mx-8">
													<div className="absolute right-0 bottom-0 -m-4 z-10">
														<StatusIcon status={selectedRecipient.status} />
													</div>

													<Avatar src={selectedRecipient.avatar} alt={selectedRecipient.name}>
														{!selectedRecipient.avatar || selectedRecipient.avatar === ''
															? selectedRecipient.name[0]
															: ''}
													</Avatar>
												</div>
												<Typography color="inherit" className="text-12 font-600 px-4">
													{selectedRecipient.name}
												</Typography>
											</div>
											<div style={{ position: 'absolute', right: 1 }}>
												{openSearch && selectedRecipient ? (
													<DateRangePickerVal
														SelectedDates={SelectedDates}
														selectedRecipient={selectedRecipient}
													/>
												) : null}

												<Tooltip title={openSearch ? 'Close' : 'Filter'} arrow>
													<IconButton
														aria-owns={'Filter Records'}
														aria-haspopup="true"
														onClick={openSearchMenu}
														style={{ color: 'white' }}
													>
														<Icon>{openSearch ? 'close_sharp' : 'filter_list_sharp'}</Icon>
													</IconButton>
												</Tooltip>

												<IconButton
													aria-owns={moreMenuEl ? 'chats-more-menu' : null}
													aria-haspopup="true"
													onClick={handleMoreMenuClick}
													style={{ color: 'white' }}
												>
													<Icon>more_vert</Icon>
												</IconButton>
												<Menu
													id="chats-more-menu"
													anchorEl={moreMenuEl}
													open={Boolean(moreMenuEl)}
													onClose={handleMoreMenuClose}
												>
													<MenuItem onClick={e => conversationActionsCallback('export')}>
														Export Chat
													</MenuItem>
													<MenuItem onClick={e => conversationContextMenuCallback('block')}>
														Block{' '}
													</MenuItem>
													<MenuItem
														onClick={e =>
															conversationContextMenuCallback('customer_profile')
														}
													>
														Customer Profile{' '}
													</MenuItem>
													<MenuItem onClick={e => conversationContextMenuCallback('copy')}>
														Copy Number{' '}
													</MenuItem>
												</Menu>
											</div>
										</Toolbar>
									</AppBar>
									<div className={classes.content}>
										<Chat
											className="flex flex-1 z-10"
											messages={messages}
											getConversation={getConversation}
											msgsLoading={msgsLoading}
											totalItemsssssssss={totalItemsssssssss}
											totalPages={totalPages}
											selectedRecipient={selectedRecipient}
											clearBlock={clearData}
										/>
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
				<XGlobalDialogCmp
					onDialogPropsChange={sendDialogInputHandler}
					data={{ dialogType: sendActionType, attachment: sendDialogData }}
					dialogTitle={sendDialogTitle}
					options={dialogOptionsConfirmBlock}
					content={AttachmentDialogV2}
					defaultState={sendDialogOpen}
					actions={sendDialogActions}
				/>
				<XGlobalDialogCmp
					onDialogPropsChange={selectedShiftAgent}
					data={shiftAgentsList}
					dialogTitle={`Shift Conversation To Another Agent`}
					options={dialogOptionsShift}
					content={ShiftConversationDialog}
					defaultState={dialogOpenShift}
					actions={dialogActionsShift}
				/>
				<XGlobalDialogCmp
					onDialogPropsChange={selectedCannedMessage}
					data={cannedMessagesList}
					dialogTitle={`Canned Messages`}
					options={dialogOptionsCanned}
					content={CannedMessagesDialog}
					defaultState={dialogOpenCanned}
					actions={dialogActionsCanned}
				/>
				<XGlobalDialogCmp
					onDialogPropsChange={blockCustomerInputHandler}
					data={selectedRecipient}
					dialogTitle={`Confirm Block`}
					options={dialogOptionsConfirmBlock}
					content={BlockConfirmDialog}
					defaultState={dialogOpenConfirmBlock}
					actions={dialogActionsConfirmBlock}
				/>
				<XGlobalDialogCmp
					onDialogPropsChange={customerProfileInputHandler}
					data={customerProfileData}
					dialogTitle={`Customer Profile`}
					options={dialogOptionsCmp}
					content={CustomerProfileDialog}
					defaultState={dialogOpenCmp}
					actions={dialogActionsCmp}
				/>
			</div>
		</>
	);
}

export default withReducer('chatApp', reducer)(ChatApp);
