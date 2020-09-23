import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ContactListItem from '../chat/ContactListItem';
import PropTypes from 'prop-types';

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
const statusArr = [
	{
		title: 'Online',
		value: 'online'
	},
	{
		title: 'Away',
		value: 'away'
	},
	{
		title: 'Do not disturb',
		value: 'do-not-disturb'
	},
	{
		title: 'Offline',
		value: 'offline'
	}
];
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
	const {numbers} = props
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const [selectValue, setselectValue] = React.useState('');
	function handleSearchText(event) {
		setSearchText(event.target.value);
	}
	let filtered = props.numbers
	filtered = searchText.charAt(0) === '9' ? numbers.filter((number => number.number.includes(searchText))) : numbers.filter((number => number.name.toLowerCase().includes(searchText.toLowerCase())))
	return (
		<div className="flex flex-col flex-auto h-full">
			<AppBar position="static" color="default" elevation={1} className="pt-16">

				{useMemo(
					() => (
						<Toolbar className="px-10" style={{marginTop:'-15px'}}>
							<Paper className="flex p-4 items-center w-full px-10 py-6 rounded-0" elevation={0}>
								<Icon color="action" fontSize="small">search</Icon>
								<Input
									placeholder="Search"
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
						return (
							<>
								<FuseAnimateGroup
									enter={{
										animation: 'transition.expandIn'
									}}
									className="flex flex-col flex-shrink-0"
								>
									{props.numbers.length > 0 && (
										<Typography className="font-300 text-20 px-20 py-8" color="secondary">
											History
										</Typography>
									)}
										
									{filtered.map(contactt => (
										<ContactListItem
											Channel={selectValue}
											key={contactt.id}
											contact={contactt}
											onContactClick={(e)=>props.onContactClick(contactt)}
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
