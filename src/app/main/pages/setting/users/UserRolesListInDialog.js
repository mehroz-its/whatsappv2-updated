import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


const UserRolesListInDialog = function (props) {
    const { roles, checkedRoles, classes, onInputChange } = props;
    return (
        <List dense className={classes.root}>
            {roles.map(value => {
                const labelId = `checkbox-list-secondary-label-${value.id}`;
                return (
                    <ListItem key={value.id} button>
                        <ListItemText id={labelId} primary={`${value.name}`} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                name={'roles'}
                                value={value.id}
                                edge="end"
                                onChange={onInputChange}
                                checked={checkedRoles.includes(value.id) && true}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    )
};

export default UserRolesListInDialog;