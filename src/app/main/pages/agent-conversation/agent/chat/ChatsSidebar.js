import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ContactListItem from './ContactListItem';
import PropTypes from 'prop-types';

import StatusIcon from './StatusIcon';
import * as Actions from './store/actions';


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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
function ChatsSidebar(props) {
	const { numbers } = props
	const dispatch = useDispatch();
	// const contacts = useSelector(({ chatApp }) => chatApp.contacts.entities);
	// console.log("contacts : " , props.numbers);

	// const user = useSelector(({ chatApp }) => chatApp.user);


	const [searchText, setSearchText] = useState('');
	const [statusMenuEl, setStatusMenuEl] = useState(null);
	const [moreMenuEl, setMoreMenuEl] = useState(null);
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	function handleMoreMenuClick(event) {
		setMoreMenuEl(event.currentTarget);
	}

	function handleMoreMenuClose(event) {
		setMoreMenuEl(null);
	}

	function handleStatusMenuClick(event) {
		event.preventDefault();
		event.stopPropagation();
		setStatusMenuEl(event.currentTarget);
	}

	function handleStatusSelect(event, status) {
		event.preventDefault();
		event.stopPropagation();
		dispatch(
			Actions.updateUserData({
				...user,
				status
			})
		);
		setStatusMenuEl(null);
	}

	function handleStatusClose(event) {
		event.preventDefault();
		event.stopPropagation();
		setStatusMenuEl(null);
	}

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}
	let filtered = props.numbers
	filtered = searchText.charAt(0) === '9' ? numbers.filter((number => number.number.includes(searchText))) : numbers.filter((number => number.name.toLowerCase().includes(searchText.toLowerCase())))
			console.log('insideeeeeeeeee chatsideeeeeeeeeeeeee');
	return (
		<div className="flex flex-col flex-auto h-full">
			<AppBar position="static" color="default" elevation={1} className="">
				<Toolbar className="flex justify-between items-center px-4">
					{user && (
						<div

						>
							<Avatar src={user.avatar} alt={user.name} className="w-40 h-40">
								{!user.avatar || user.avatar === '' ? user.name[0] : ''}
							</Avatar>
							<div
								className="absolute right-0 bottom-0 -m-4 z-10 cursor-pointer"
								aria-owns={statusMenuEl ? 'switch-menu' : null}
								aria-haspopup="true"
								onClick={handleStatusMenuClick}
								onKeyDown={handleStatusMenuClick}
								role="button"
								tabIndex={0}
							>

							</div>

						</div>
					)}
					<div>
						{/* <IconButton
							aria-owns={moreMenuEl ? 'chats-more-menu' : null}
							aria-haspopup="true"
							onClick={handleMoreMenuClick}
						>
						
						</IconButton> */}
						{/* <Menu
							id="chats-more-menu"
							anchorEl={moreMenuEl}
							open={Boolean(moreMenuEl)}
							onClose={handleMoreMenuClose}
						>
							<MenuItem onClick={handleMoreMenuClose}>Profile</MenuItem>
							<MenuItem onClick={handleMoreMenuClose}>Logout</MenuItem>
						</Menu> */}
					</div>
				</Toolbar>
				{useMemo(
					() => (
						<Toolbar className="px-16">
							<Paper className="flex p-4 items-center w-full px-8 py-4 rounded-8" elevation={1}>
								<Icon color="action">search</Icon>

								<Input
									placeholder="Search or start new chat"
									className="flex flex-1 px-8"
									disableUnderline
									fullWidth
									value={searchText}
									inputProps={{
										'aria-label': 'Search'
									}}
									onChange={handleSearchText}
								/>
							</Paper>
						</Toolbar>
					),
					[searchText]
				)}
			</AppBar>
			<FuseScrollbars className="overflow-y-auto flex-1">
				<List className="w-full">
					{
						useMemo(() => {
							// function getFilteredArray(arr, _searchText) {
							// 	if (_searchText.length === 0) {
							// 		return arr;
							// 	}
							// 	return FuseUtils.filterArrayByString(arr, _searchText);
							// }
							// const chatListContacts =
							// 	contacts.length > 0 && user && user.chatList
							// 		? user.chatList.map(_chat => ({
							// 			..._chat,
							// 			...contacts.find(_contact => _contact.id === _chat.contactId)
							// 		}))
							// 		: [];
							// const contactsArr = getFilteredArray([...contacts], searchText);
							// const chatListArr = getFilteredArray([...chatListContacts], searchText);
							return (
								<>
									<FuseAnimateGroup
										enter={{
											animation: 'transition.expandIn'
										}}
										className="flex flex-col flex-shrink-0"
									>
										{props.numbers.length > 0 && (
											<Typography className="font-300 text-20 px-8 py-8" color="secondary">
												Chats
											</Typography>
										)}
										{filtered.map(contactt => (
											<ContactListItem
												key={contactt.id}
												contact={contactt}
												onContactClick={(e) => props.onContactClick(contactt)}
											// onContactClick={contactId => dispatch(Actions.getChat(contactId))}
											// onContactClick={contactId => dispatch(Actions.getChat(contactId))}
											/>
										))}
									</FuseAnimateGroup>
									
								</>
							);
						}, [props.numbers,filtered])
					}
				</List>

			</FuseScrollbars>


		</div>
	);
}

export default ChatsSidebar;
