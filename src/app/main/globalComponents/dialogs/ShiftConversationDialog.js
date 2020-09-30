import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ShiftConversationDialog = function (props) {

    const { onDialogPropsChange, data } = props;
    return (
        <DialogContent >
            <div style={{ width: '100%' }}>
                <List>
                    {data.map((item, i) => (
                        <ListItem button key={`item-${i}`}>
                            <ListItemText onClick={(e) => onDialogPropsChange(item)} primary={`${item.username} [${item.number}]`} secondary={`${item.email}`} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </div>
        </DialogContent>
    );
};

export default ShiftConversationDialog;