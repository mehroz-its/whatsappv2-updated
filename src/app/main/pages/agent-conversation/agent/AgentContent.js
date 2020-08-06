
import _ from '@lodash';

import ChatSidebar from '../agent/NewUiPages/ChatSidebar'

import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
// import CampaignTableHead from './CampaignTableHead';
import TableData from '../agentdata'
import Chat from './chat/ChatApp'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import Agent from './Agent';

function AgentContent(props) {
	 const { displayChat } = props
	console.log(displayChat, 'props in agentsadasdas');
	const dispatch = useDispatch();
	const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

	// const [selected, setSelectedAgent] = useState([]);
	const [data, setData] = useState(TableData);
	const [dropdowntitile, setDropDownTitle] = useState('Agents');
	const [viewChat, setViewChat] = useState(displayChat);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const defaultDropdownData = {
		list: ['agent1', 'agent2'],
		selected: 0,
	};
	const defaultDialogData = {
		selectedContactGroups: [],
		selectedContacts: [],
		state: false,
		type: null,
	};

	const [dropDownData, setDropdownData] = React.useState(defaultDropdownData);
	const [dialogData, setDialogData] = React.useState(defaultDialogData)
	const [textAreaNumbers, setTextAreaNumbers] = React.useState('');
	const [agents, setagents] = React.useState([]);
	const [int_CustomerList, setint_CustomerList] = React.useState();
	const [numbers, setnumbers] = React.useState([]);
	const [selectedAgent,setSelectedAgent]  = React.useState(null)



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
		},
		root: {
			display: 'flex',
			width: '250px',
			height: '70px',
			backgroundColor: 'white'
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

	const classes = useStyles();

	// useEffect(() => {
	// 	dispatch(Actions.getProducts());
	// }, [dispatch]);

	useEffect(() => {
		
		console.log("selectedAgent :", selectedAgent);
		// alert(selectedAgent)
		 getAgents()
		if (selectedAgent !== null) {
			clearInterval(int_CustomerList)
			getAgentsCustomers()		
			setint_CustomerList(setInterval(() => {
			getAgentsCustomers();
		}, 5000))
	}

		// getAgentsCustomers(props.selectedAgent)
		console.log('i am called')

	}, [selectedAgent]);
	const getAgents = () => {
		CoreHttpHandler.request('conversations', 'agents_list', {
			columns: "USR.id, USR.username"
		}, (_response) => {
			console.log("_response  ", _response);
			setagents(_response.data.data.agents.data)
		}, (error) => {
		});
	}
	const getAgentsCustomers = () => {
		let params = {
			agentId: selectedAgent
		}
		CoreHttpHandler.request('conversations', 'agents_customer_list', {
			params
		}, (_response) => {
			console.log("_response  ", _response);
			const numbers = _response.data.data.customers;
			console.log("numbers : ", numbers);
			setnumbers(numbers)
			// setViewChat(true)
		}, (error) => {
			console.log("error  ", error);
		});
	}
	const getAgentsCustomersReload = () => {
		setViewChat(false)
		let params = {
			agentId: selectedAgent
		}
		CoreHttpHandler.request('conversations', 'agents_customer_list', {
			params
		}, (_response) => {
			// console.log("_response  ", _response);
			const numbers = _response.data.data.customers;
			// console.log("numbers : ", numbers);

			setnumbers(numbers)
			setViewChat(true)
		}, (error) => {
			console.log("error  ", error);
		});
	}


	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	const onTextAreaChange = event => {
		setTextAreaNumbers(event.target.value);
	};

	const openContactBook = e => {
		setDialogData({
			type: 'contacts',
			state: true,
			selectedContacts: dialogData.selectedContacts,
			selectedContactGroups: dialogData.selectedContactGroups,
		})
	};

	const onSelectItemChange = e => {
		const data = { ...dropDownData };

		data.selected = e.target.value;

		setDropdownData(data);
	};

	const openContactGroups = e => {
		setDialogData({
			type: 'groups',
			state: true,
			selectedContacts: dialogData.selectedContacts,
			selectedContactGroups: dialogData.selectedContactGroups,
		})
	};

	// function handleSelectAllClick(event) {
	// 	if (event.target.checked) {
	// 		setSelected(data.map(n => n.id));
	// 		return;
	// 	}
	// 	setSelected([]);
	// }

	function handleClick(n) {
		// props.history.push({pathname:`/apps/groups/group-detail`,id:n.id});
	}

	// function handleCheck(event, id) {
	// 	const selectedIndex = selected.indexOf(id);
	// 	let newSelected = [];

	// 	if (selectedIndex === -1) {
	// 		newSelected = newSelected.concat(selected, id);
	// 	} else if (selectedIndex === 0) {
	// 		newSelected = newSelected.concat(selected.slice(1));
	// 	} else if (selectedIndex === selected.length - 1) {
	// 		newSelected = newSelected.concat(selected.slice(0, -1));
	// 	} else if (selectedIndex > 0) {
	// 		newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
	// 	}

	// 	setSelected(newSelected);
	// }

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}
	function handleDropdownSelect(event) {
		console.log(event.target.value)
		setDropDownTitle(event.target.value)
		if (event.target.value != 'Agents') {
			setViewChat(true)
		} else {
			setViewChat(false)
		}

	}

	const Agent = (value) => {
		setSelectedAgent(value)
		setViewChat(true)
		console.log(viewChat, selectedAgent,value,'i am in main agent content')
	}


console.log('inside agent content');
	return (
		<div className="w-full flex flex-col" style={{ }}>
						{/* <Drawer
							className="h-full z-20"
							variant="permanent"
							open
							classes={{
								paper: classes.drawerPaper
							}}
						>
							<ChatSidebar  />
						</Drawer> */}
			
			
				<Chat agents={agents} Agent={Agent} numberr={numbers} selectedAgent={selectedAgent} reloadNumber={(e) => getAgentsCustomersReload()} />
			
		</div>
	);
}

export default withRouter(AgentContent);

