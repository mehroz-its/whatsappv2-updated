import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import Chat from './chat/ChatApp';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import WebSocket from '../../../../socket/WebSocket';

function AgentContent(props) {
	const { selectedAgent } = props;
	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState('');
	const [agentCustomerInterval, setAgentCustomerInterval] = React.useState(0);
	const [numbers, setnumbers] = React.useState([]);
	const [ongoingNewConversation, setOngoingNewConversation] = React.useState(null);
	const [updateOnGoingConversation, setUpdateOnGoingConversation] = React.useState(null);
	const [newMessageForOngoing, setNewMessageForOngoing] = React.useState(null);
	const [listPage, setListPage] = useState(0);
	const [totalItemsNum, setTotalItemsNum] = useState(0);
	const socket = WebSocket.getSocket();

	// let intervalAgent = ""

	// useEffect(() => {
	// 	dispatch(Actions.getProducts());
	// }, [dispatch]);

	useEffect(() => {
		if (updateOnGoingConversation && numbers && numbers.length) {
			let _numbers = numbers.map(el => {
				if (el.number == updateOnGoingConversation.number) {
					el = { ...el, ...updateOnGoingConversation };
				}

				return el;
			});

			setnumbers(_numbers);
		}
	}, [updateOnGoingConversation]);
	useEffect(() => {
		if (newMessageForOngoing && numbers && numbers.length) {
			if (selectedAgent != 'All' && selectedAgent != newMessageForOngoing.a_id) {
				return;
			}
			let _temp = numbers.filter(el => el.id == newMessageForOngoing.customerId);
			if (_temp && _temp.length) {
				let _numbers = [..._temp, ...numbers.filter(el => el.id != newMessageForOngoing.customerId)];
				setnumbers(_numbers);
			}
		}
	}, [newMessageForOngoing]);

	useEffect(() => {
		if (ongoingNewConversation && numbers) {
			if (selectedAgent != 'All' && selectedAgent != ongoingNewConversation.a_id) {
				return;
			}

			if (ongoingNewConversation.addOrRemove) {
				delete ongoingNewConversation.addOrRemove;
				let _numbers = [
					ongoingNewConversation,
					...numbers.filter(el => el.number != ongoingNewConversation.number)
				];

				// _numbers = _numbers.sort((a,b)=>a.id-b.id)
				setnumbers(_numbers);
			} else {
				let _numbers = numbers.filter(el => el.number != ongoingNewConversation.number);
				setnumbers(_numbers);
			}
		}
	}, [ongoingNewConversation]);

	useEffect(() => {
		socket.on('onGoingConversation', setOngoingNewConversation);
		socket.on('updateOnGoingConversation', setUpdateOnGoingConversation);
		socket.on('newMessageForOngoing', setNewMessageForOngoing);

		return () => {
			socket.removeListener('onGoingConversation');
			socket.removeListener('updateOnGoingConversation');
			socket.removeListener('newMessageForOngoing');
		};
	}, []);

	useEffect(() => {
		setnumbers([]);
		// if(intervalAgent){
		// 	clearInterval(intervalAgent)
		// }

		if (selectedAgent === 'All') {
			getAllAgents();

			// intervalAgent = setInterval(() => {
			// 	getAllAgents()
			// }, 2000)
		} else {
			getAgentsCustomers();

			// intervalAgent = setInterval(() => {
			// 	getAgentsCustomers();
			// }, 2000)
		}

		return () => {
			// if(intervalAgent){
			// 	clearInterval(intervalAgent)
			// }
		};
		// return () => {
		// 	console.log("CLEARING IT",agentCustomerInterval)
		// 	clearInterval(agentCustomerInterval)
		// }
	}, [selectedAgent]);

	const getAllAgents = () => {
		setLoading(true);
		setListPage(listPage + 1);
		CoreHttpHandler.request(
			'conversations',
			'allAgents',
			{
				limit: 10,
				page: listPage ? listPage : 0
			},
			_response => {
				console.log(_response, 'alllagetnsssss');
				const numberrrrrr = _response.data.data.list.data;
				setTotalItemsNum(_response.data.data.list.totalItems);
				props.Total(numbers.length);
				// setnumbers(numbers);
				setLoading(false);
				
				console.log(numberrrrrr, 'nummmmmmmmmmm');
				// let tempArr = [];
				// let newObj = {
					// 	limit: 10,
					// 	page: listPage ? listPage : 1,
					// 	totalItems: numberrrrrr?.totalItems,
					// 	totalPages: numberrrrrr?.totalPages
					// };
					let newObj = {
					limit: 10,
					page: listPage ? listPage : 1,
					totalItems: numberrrrrr?.totalItems,
					totalPages: numberrrrrr?.totalPages
				};
				setnumbers([...numbers, ...numberrrrrr]);
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
					error => {}
					);
				};
				
				const getAgentsCustomers = () => {
					if (selectedAgent && selectedAgent != 'All') {
						let params = {
							agentId: selectedAgent
						};
						CoreHttpHandler.request(
							'conversations',
							'agents_customer_list',
							{
								params
							},
							_response => {
								console.log(_response, 'numberssssssssssss');
								const numbers = _response.data.data.customers;
								setnumbers(numbers);
							},
							error => {
								// clearInterval(agentCustomerInterval)
								console.log('================ERROR================');
								console.log(error);
							}
							);
						}
					};
					const getAgentsCustomersReload = () => {
						let params = {
							agentId: selectedAgent
						};
						CoreHttpHandler.request(
							'conversations',
							'agents_customer_list',
							{
								params
							},
							_response => {
								const numbers = _response.data.data.customers;
								setnumbers(numbers);
							},
							error => {}
							);
						};
						return (
							<div className="w-full flex flex-col" style={{}}>
			<Chat
				updateOnGoingConversation={updateOnGoingConversation}
				ongoingNewConversation={ongoingNewConversation}
				numberr={numbers}
				Loading={loading}
				chatsLoading={loading}
				getNumbers={getAllAgents}
				totalItemsNum={totalItemsNum}
				selectedAgent={selectedAgent}
				reloadNumber={e => getAllAgents()}
				/>
		</div>
	);
}
export default withRouter(AgentContent);
