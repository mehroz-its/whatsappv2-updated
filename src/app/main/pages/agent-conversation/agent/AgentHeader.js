import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState, useEffect } from 'react';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler';
import { makeStyles } from '@material-ui/core/styles';
import { EventEmitter } from '../../../../../events'
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 300,
		borderWidth: '2px',
		borderColor: 'black',
		display: 'flex',

	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	menu: {
		flexDirection: 'row',
		display: 'flex',
	}
}));
function AgentHeader(props) {
	const classes = useStyles();
	const { total } = props
	const [agentDropDownOpen, setagentDropDownOpen] = React.useState(false);

	const [agents, setagents] = React.useState([]);
	const [int_CustomerList, setint_CustomerList] = React.useState(null);
	const [selectedAgent, setselectedAgent] = React.useState('All');

	const defaultDialogData = {
		selectedContactGroups: [],
		selectedContacts: [],
		state: false,
		type: null,
	};
	const handleCloseAgent = () => {
		setagentDropDownOpen(false)
	};

	const getAgents = () => {
		CoreHttpHandler.request('conversations', 'agents_list', {
			columns: "USR.id, USR.username"
		}, (_response) => {
			setagents(_response.data.data.agents.data)
		}, (error) => {
		});
	}
	if (int_CustomerList === null) {
		setint_CustomerList(setInterval(() => {
			getAgents();
		}, 3000));
	}
	useEffect(() => {
		getAgents()
		EventEmitter.subscribe('GetAgentsAgain', (event) => getAgents())
		return () => {
			clearInterval(int_CustomerList);
		}
	}, []);
	const handleOpenAgent = () => {
		setagentDropDownOpen(true)
	};
	const handleChangeAgent = (event) => {
		EventEmitter.dispatch('ShowHideLoader', true)
		setselectedAgent(event.target.value)
		props.Agent(event.target.value)
	};
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-26">comment</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<span style={{ fontSize: '15px' }}>Ongoing Chats</span>
					</Typography>
				</FuseAnimate>
			</div>
			<div className="flex flex-1 items-center justify-center px-12 ">
				<FuseAnimate animation="transition.slideDownIn" delay={300}>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label" style={{ color: 'white', display: 'flex', paddingBottom: '5px' }}>Agent</InputLabel>
						<Select
							fullWidth
							style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', border: '0.2px  white' }}
							label="Agent"
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							open={agentDropDownOpen}
							onClose={handleCloseAgent}
							onOpen={handleOpenAgent}
							value={selectedAgent}
							onChange={handleChangeAgent}
							inputProps={{
								name: 'Agent',
								id: 'outlined-age-native-simple',
								color: 'white'
							}}
						>
							<MenuItem key={`template_list_item_${123}`} value={"All"} style={{ display: 'flex', flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
								<div style={{
									flexDirection: 'row',
									display: 'flex', flex: 1,
									justifyContent: 'space-between',
									marginLeft: '23px'
								}}>
									<div>All</div>
									<span>{total ? total : ''

									}</span>
								</div>
							</MenuItem>
							{agents.map(data => {
								return (
									<MenuItem key={`template_list_item_${data.id}`} value={data.id} style={{ display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
										<div style={{
											flexDirection: 'row',
											display: 'flex', flex: 1
										}}>
											{data.active === true ? <Icon

												className="block text-16 mt-2 mr-8 text-green">
												data_usage
									</Icon> : <Icon className="block text-16 text-red mt-2 mr-8">
													data_usage
									</Icon>
											}
											{data.username}
											<span style={{ justifyContent: 'flex-end', flex: 1, display: 'flex' }}>{data.messages}
											</span>

										</div>
										<div>
										</div>
									</MenuItem>
								)
							})}
						</Select>
					</FormControl>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default AgentHeader;
