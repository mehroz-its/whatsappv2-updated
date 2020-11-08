import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
const RuleListInDialog = function (props) {
    const { rules, checkedRules, classes, onInputChange } = props;
    return (
        <List dense className={classes.root}>
        {rules?
        
            rules.map(value => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                let lbl = value;
                lbl = value.replaceAll('_'," ")

                return (
                    <ListItem key={value} button>
                        <ListItemText id={labelId} primary={`${lbl}`} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                name={'rule_set'}
                                value={value}
                                edge="end"
                                onChange={onInputChange}
                                checked={checkedRules.includes(value) && true}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            }):null
        
        }
        </List>
    )
};

export default RuleListInDialog;