import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { DataGrid } from '@material-ui/data-grid';
const ShiftConversationDialog = function (props) {
	const { onDialogPropsChange, data, chatNumbers } = props;
	// let shiftChatsNumber = []
	// let agentID = null
	const [agentID, setAgentID] = React.useState(null);
	const [shiftChatsNumber, setShiftChatsNumber] = React.useState([]);
    let combineData = {}
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'name', headerName: 'Name', width: 200 },
		{ field: 'number', headerName: 'Number', width: 200 }
	];
useEffect(() => {
    combineData = {
        agentId : agentID,
        chats: shiftChatsNumber
    }
    console.log(" handleTypeChange data" , combineData);
    onDialogPropsChange(combineData)
}, [agentID,shiftChatsNumber])

	const selectedAgent = selectedRow => {
		let numbers = [];
		selectedRow.rowIds.filter(e => {
			data.totalChats.filter(result => {
				if (e === result.id) {
					numbers.push(result.number);
				}
			});
		});
        setShiftChatsNumber(numbers);
       
	};
	const handleTypeChange = selectedAgent => {
        setAgentID(selectedAgent.target.value);
	};
	// const finalData = () => {
	// 	let handleTypeChangedata = {
	// 	    agentId : agentID,
	// 	    chats: shiftChatsNumber
	// 	}
	// 	console.log(" handleTypeChange data" , handleTypeChangedata);
	// };
	return (
		<DialogContent>
			<div style={{ width: '100%' }}>
				<InputLabel id="demo-simple-select-label">Select Agent</InputLabel>
				<Select
					required
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value={agentID}
					onChange={handleTypeChange}
					fullWidth
				>
					<MenuItem value="">
						<em>Select Agent</em>
					</MenuItem>
					{data.agentList.length > 0
						? data.agentList.map(role => {
								return <MenuItem value={role.id}>{role.username}</MenuItem>;
						  })
						: null}
					{/* <MenuItem value={-1}>Admin</MenuItem>
						<MenuItem value={1}>Agent</MenuItem> */}
				</Select>
				<div style={{ height: 350, width: '100%',marginTop:20 }}>
					<DataGrid
						rows={data.totalChats}
						columns={columns}
						checkboxSelection
						onSelectionChange={e => selectedAgent(e)}
					/>
				</div>
				{/* <List>
                    {data.map((item, i) => (
                        <ListItem button key={`item-${i}`}>
                            <ListItemText onClick={(e) => onDialogPropsChange(item)} primary={`${item.username} [${item.number}]`} secondary={`${item.email}`} />
                        </ListItem>
                    ))}
                </List>
                <Divider /> */}
			</div>
		</DialogContent>
	);
};
export default ShiftConversationDialog;