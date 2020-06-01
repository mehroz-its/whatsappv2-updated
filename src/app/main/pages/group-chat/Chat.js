import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';

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
				borderTopRightRadius: 20,
				borderBottomRightRadius: 20,
				'& .time': {
					marginLeft: 12
				}
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopLeftRadius: 20
				}
			},
			'&.last-of-group': {
				'& .bubble': {
					borderBottomLeftRadius: 20
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
				backgroundColor: theme.palette.grey[300],
				color: theme.palette.getContrastText(theme.palette.grey[300]),
				borderTopLeftRadius: 20,
				borderBottomLeftRadius: 20,
				borderTopRightRadius: 5,
				borderBottomRightRadius: 5,
				'& .time': {
					justifyContent: 'flex-end',
					right: 0,
					marginRight: 12
				}
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopRightRadius: 20
				}
			},

			'&.last-of-group': {
				'& .bubble': {
					borderBottomRightRadius: 20
				}
			}
		},
		'&.contact + .me, &.me + .contact': {
			paddingTop: 20,
			marginTop: 20
		},
		'&.first-of-group': {
			'& .bubble': {
				borderTopLeftRadius: 20,
				paddingTop: 13
			}
		},
		'&.last-of-group': {
			'& .bubble': {
				borderBottomLeftRadius: 20,
				paddingBottom: 13,
				'& .time': {
					display: 'flex'
				}
			}
		}
	}
}));

function Chat(props) {
	const dispatch = useDispatch();
	// const contacts = useSelector(({ chatApp }) => chatApp.contacts.entities);
	// const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);
	// const chat = useSelector(({ chatApp }) => chatApp.chat);
	// const user = useSelector(({ chatApp }) => chatApp.user);

	const classes = useStyles(props);
	const chatRef = useRef(null);
	const [messageText, setMessageText] = useState('');

	useEffect(() => {
		if (chat) {
			scrollToBottom();
		}
	}, [chat]);

	function scrollToBottom() {
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
	}

	function shouldShowContactAvatar(item, i) {
		return (
			item.who === selectedContactId &&
			((chat.dialog[i + 1] && chat.dialog[i + 1].who !== selectedContactId) || !chat.dialog[i + 1])
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

	return (
		<div className={clsx('flex flex-col relative', props.className)}>
			<FuseScrollbars ref={chatRef} className="flex flex-1 flex-col overflow-y-auto">
				{chat && chat.dialog.length > 0 ? (
					<div className="flex flex-col pt-16 px-16 ltr:pl-56 rtl:pr-56 pb-40">
						{chat.dialog.map((item, i) => {
							const contact =
								item.who === user.id ? user : contacts.find(_contact => _contact.id === item.who);
							return (
								<div
									key={item.time}
									className={clsx(
										classes.messageRow,
										'flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative px-16 pb-4',
										{ me: item.who === user.id },
										{ contact: item.who !== user.id },
										{ 'first-of-group': isFirstMessageOfGroup(item, i) },
										{ 'last-of-group': isLastMessageOfGroup(item, i) },
										i + 1 === chat.dialog.length && 'pb-96'
									)}
								>
									{shouldShowContactAvatar(item, i) && (
										<Avatar
											className="avatar absolute ltr:left-0 rtl:right-0 m-0 -mx-32"
											src={contact.avatar}
										/>
									)}
									<div className="bubble flex relative items-center justify-center p-12 max-w-full">
										<div className="leading-tight whitespace-pre-wrap">{item.message}</div>
										<Typography
											className="time absolute hidden w-full text-11 mt-8 -mb-24 ltr:left-0 rtl:right-0 bottom-0 whitespace-no-wrap"
											color="textSecondary"
										>
											{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}
										</Typography>
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
			{chat && (
				<form onSubmit={onMessageSubmit} className="absolute bottom-0 right-0 left-0">
					<Paper className="flex items-center relative " elevation={1}>
						<TextField
							multiline={true}
							rows="2"
							style={{ height: 170, padding: 0, margin: 0, marginTop: -32,}}
							autoFocus={false}
							id="message-input"
							className="flex-1"
							InputProps={{
								disableUnderline: true,
								classes: {
									root: 'flex flex-grow flex-shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8',
								},
								placeholder: 'Type your message'
							}}
							InputLabelProps={{
								shrink: false,
								className: classes.bootstrapFormLabel
							}}
							onChange={onInputChange}
							value={messageText}
						/>
						<IconButton style={{ position: 'absolute', left: 120, bottom: 3 }} type="submit">
						<AttachFileIcon />
						</IconButton>
						<Button variant="contained" style={{ position: 'absolute', left: 15, bottom: 13 ,fontSize:12,paddingTop: 7,paddingBottom: 7,paddingLeft: 30,paddingRight: 30,}}>Canned</Button>
						<Button variant="contained" style={{ position: 'absolute', right: 15, bottom: 13 ,fontSize:12,paddingTop: 7,paddingBottom: 7,paddingLeft: 30,paddingRight: 30,backgroundColor: '#424141',color:'white'}}>Send</Button>

					</Paper>
				</form>
			)}
		</div>
	);
}

export default Chat;
