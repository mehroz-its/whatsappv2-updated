import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
// import CampaignTableHead from './CampaignTableHead';
import TableData from '../agentdata'
import Chat from './chat/ChatApp'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';

function AgentContent(props) {
	const { displayChat, selectedAgent } = props
	console.log(displayChat,selectedAgent, 'props in agentsadasdas');
	const dispatch = useDispatch();
	const products = useSelector(({ eCommerceApp }) => eCommerceApp.products.data);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);

	const [selected, setSelected] = useState([]);
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




	const useStyles = makeStyles(theme => ({
		root: {
			width: '100%',
		},
		paper: {
			width: '100%',
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		visuallyHidden: {
			border: 0,
			clip: 'rect(0 0 0 0)',
			height: 1,
			margin: -1,
			overflow: 'hidden',
			padding: 0,
			position: 'absolute',
			top: 20,
			width: 1,
		},
	}));

	const classes = useStyles();

	useEffect(() => {
		dispatch(Actions.getProducts());
	}, [dispatch]);

	useEffect(() => {
		
		console.log("selectedAgent :", selectedAgent);
		// alert(selectedAgent)
		// getAgents()
		if(selectedAgent ==="All") {
			getAllAgents()
		}

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
	// useEffect(()=>{
	// 	getAllAgents()
	// })
	const getAgents = () => {
		CoreHttpHandler.request('conversations', 'agents_list', {
			columns: "USR.id, USR.username"
		}, (_response) => {
			console.log("_response  ", _response);
			setagents(_response.data.data.agents.data)
		}, (error) => {
		});
	}
	const getAllAgents = () => {
		CoreHttpHandler.request('conversations', 'allAgents', {
			
		}, (_response) => {
			console.log("_response of getall agentsssssss", _response.data.data.list.data);
			const numbers=_response.data.data.list.data
			props.Total(numbers.length)
			setnumbers(numbers)
		}, (error) => {
		});
	}
	// const getAllAgents = () => {
	// 	CoreHttpHandler.request('conversations', 'allAgents', {
			
	// 	}, (_response) => {
	// 		console.log("_response of getall agentsssssss  ", _response);
	
	// 	}, (error) => {
	// 	});
	// }
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

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(n) {
		// props.history.push({pathname:`/apps/groups/group-detail`,id:n.id});
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

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

	return (
		<div className="w-full flex flex-col" style={{ }}>

			{/* {numbers.length > 0 ?
		
				<Chat numberr={numbers} selectedAgent={selectedAgent} reloadNumber={(e) => getAgentsCustomersReload()} />
			: 
			selectedAgent == null ? 
			<Chat numberr={numbers}  /> 
			: 	<Chat numberr={numbers} ok="error" message = "Not Numbers Associated to the Agent " open ={true}/>
			} */}
			<Chat numberr={numbers} selectedAgent={selectedAgent} reloadNumber={(e) => getAgentsCustomersReload()} />		
			
		</div>
	);
}

export default withRouter(AgentContent);

