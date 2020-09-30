
import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import TableData from '../agentdata'
import Chat from './chat/ChatApp'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';

function AgentContent(props) {
	const { displayChat, selectedAgent } = props
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
	const [loading, setLoading] = React.useState('');
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
		if (selectedAgent === "All") {
			getAllAgents()
		}
		if (selectedAgent !== null) {
			clearInterval(int_CustomerList)
			getAgentsCustomers()
			setint_CustomerList(setInterval(() => {
				getAgentsCustomers();
			}, 5000))
		}
		return () => {
			clearInterval(int_CustomerList)
		}
	}, [selectedAgent]);
	const getAgents = () => {
		CoreHttpHandler.request('conversations', 'agents_list', {
			columns: "USR.id, USR.username"
		}, (_response) => {
			setagents(_response.data.data.agents.data)
		}, (error) => {
		});
	}
	const getAllAgents = () => {
		setLoading(true)
		CoreHttpHandler.request('conversations', 'allAgents', {

		}, (_response) => {
			const numbers = _response.data.data.list.data
			props.Total(numbers.length)
			setnumbers(numbers)
			setLoading(false)
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
			const numbers = _response.data.data.customers;
			setnumbers(numbers)
		}, (error) => {
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
			const numbers = _response.data.data.customers;
			setnumbers(numbers)
			setViewChat(true)
		}, (error) => {
		});
	}
	return (
		<div className="w-full flex flex-col" style={{}}>
			<Chat numberr={numbers} Loading={loading} selectedAgent={selectedAgent} reloadNumber={(e) => getAgentsCustomersReload()} />
		</div>
	);
}
export default withRouter(AgentContent);

