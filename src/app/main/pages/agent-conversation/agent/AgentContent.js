
import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import Chat from './chat/ChatApp'
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';

function AgentContent(props) {
	const {  selectedAgent } = props
	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState('');
	const [int_CustomerList, setint_CustomerList] = React.useState();
	const [numbers, setnumbers] = React.useState([]);

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
	return (
		<div className="w-full flex flex-col" style={{}}>
			<Chat numberr={numbers} Loading={loading} selectedAgent={selectedAgent} reloadNumber={(e) => getAgentsCustomersReload()} />
		</div>
	);
}
export default withRouter(AgentContent);

