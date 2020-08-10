import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import { makeStyles } from '@material-ui/core/styles';

import * as Actions from '../store/actions';
const useStyles = makeStyles((theme) => ({
	formControl: {
	  margin: theme.spacing(1),
	  minWidth: 300,
	  borderWidth:'2px',
	  borderColor:'black'
	},
	selectEmpty: {
	  marginTop: theme.spacing(2),
	},
  }));
function AgentHeader(props) {
	const classes = useStyles();

	const dispatch = useDispatch();
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const [agentDropDownOpen, setagentDropDownOpen] = React.useState(false);
	const [viewChat, setViewChat] = useState(null);

	const [dropDownData, setDropdownData] = React.useState(defaultDropdownData);
	const [dialogData, setDialogData] = React.useState(defaultDialogData)
	const [textAreaNumbers, setTextAreaNumbers] = React.useState('');
	const [agents, setagents] = React.useState([]);
	const [selectedAgent, setselectedAgent] = React.useState('Please Select');
	const [numbers, setnumbers] = React.useState([]);
	const [dropdowntitile, setDropDownTitle] = useState('Agents');
	const defaultDialogData = {
		selectedContactGroups: [],
		selectedContacts: [],
		state: false,
		type: null,
	};
	const defaultDropdownData = {
		list: ['agent1', 'agent2'],
		selected: 0,
	};

	const handleCloseAgent = () => {
		setagentDropDownOpen(false)
	};

	const getAgents = () => {
		CoreHttpHandler.request('conversations', 'agents_list', {
			columns: "USR.id, USR.username"
		}, (_response) => {
			console.log("_response  ", _response);
			setagents(_response.data.data.agents.data)
		}, (error) => {
		});
	}



	useEffect(() => {
		getAgents()
		// if (selectedAgent === 'null') setint_CustomerList = setInterval(() => {
		//    getAgentsCustomers();
		// }, 10000);
	}, []);

	const getAgentsCustomers = (event) => {
		let params = {
			agentId: event
		}
		CoreHttpHandler.request('conversations', 'agents_customer_list', {
			params
		}, (_response) => {
			console.log("_response  ", _response);
			const numbers = _response.data.data.customers;
			console.log("numbers : ", numbers);

			setnumbers(numbers)
			setViewChat(true)
		}, (error) => {
			console.log("error  ", error);
		});
	}


	const handleOpenAgent = () => {
		setagentDropDownOpen(true)
	};
	const handleChangeAgent = (event) => {
		console.log('header')
		setselectedAgent(event.target.value)
		props.Agent(event.target.value)

		// getAgentsCustomers(event.target.value)

	};
	console.log(agents,'agentsssssssss')

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-26">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<span style={{ fontSize: '15px' }}>Agent Chat History</span>
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">

				<FuseAnimate animation="transition.slideDownIn" delay={300}>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label" style={{color:'white'}}>Agent</InputLabel>
						<Select
							fullWidth
							label="Agent"
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							open={agentDropDownOpen}
							defaultValue="All"
							onClose={handleCloseAgent}
							onOpen={handleOpenAgent}
							value={selectedAgent}
							onChange={handleChangeAgent}
							inputProps={{
								name: 'Agent',
								id: 'outlined-age-native-simple',
								color:'white'
							}}
						>
							<MenuItem value="">
								<em>All</em>
							</MenuItem>
							{agents.map(data => {
								return (
  
									<MenuItem key={`template_list_item_${data.id}`} value={data.id} style={{display:'flex',flex:1,justifyContent:'space-around',flexDirection:'row'}}>
										<div style={{flexDirection:'row',display:'flex',flex:1}}>
										{ data.active===true ? <Icon 
										
										className="block text-16 mt-4 mr-8 text-green">
												data_usage
									</Icon> : <Icon className="block text-16 text-red mt-4 mr-8">
									data_usage
									</Icon>
									}
										{data.username}
									
										</div>
										<div>
										{data.messages}
									
										</div>
										<div>
								
									
										</div>
										</MenuItem>
								)
							})}

						</Select>
					</FormControl>
					{/* <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
						<Icon color="action" fontSize="small">search</Icon>
						<input
							style={{border:'none'}}
							rows={1}
							placeholder="Search"
							className="flex flex-1 mx-8 "
							disableUnderline
							onChange={e=>{
							
								props.SearchVal(e.target.value)
								
							}}
							
						   
							placeholder="Search"
							/>
						</Paper> */}

				</FuseAnimate>


			</div>

		</div>
	);
}

export default AgentHeader;
