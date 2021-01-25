import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const ShiftConversationDialog = function (props) {
	const { onDialogPropsChange, data } = props;
	return (
		<DialogContent>
			<div style={{ width: '100%' }}>
				<Select
					required
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value={"role"}
					// onChange={handleTypeChange}
					fullWidth
				>
					<MenuItem value="">
						<em>Select Agent</em>
					</MenuItem>
					{data.length > 0
						? data.map(role => {
								return <MenuItem value={role.id}>{role.username}</MenuItem>;
						  })
						: null}
					{/* <MenuItem value={-1}>Admin</MenuItem>
						<MenuItem value={1}>Agent</MenuItem> */}
				</Select>
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
