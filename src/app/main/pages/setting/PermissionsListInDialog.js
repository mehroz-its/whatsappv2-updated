import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const PermissionsListInDialog = function (props) {
    const { permissions, checkedPermissions, classes, onInputChange } = props;

    if (permissions != undefined) {
        return (
            <List dense className={classes.root}>
                {permissions.map(value => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <div key={`item_div_${Math.random()}`}>
                            <ListItem key={`item_${Math.random()}`} button>
                                <ListItemText key={`item_text_${Math.random()}`} id={labelId} primary={`${value.title}`} />
                                <ListItemSecondaryAction key={`item_sa_${Math.random()}`} >
                                    <Checkbox
                                        key={`item_checkbox_${Math.random()}`}
                                        name={'permissions'}
                                        value={value.id}
                                        edge="end"
                                        onChange={onInputChange}
                                        checked={checkedPermissions.includes(value.id) && true}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </div>
                    );
                })}
            </List>
        )
    }
    else {
        return (
            <div>No Permissions</div>
        );
    }
};

export default PermissionsListInDialog;