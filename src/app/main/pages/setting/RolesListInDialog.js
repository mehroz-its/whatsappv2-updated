import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


const RuleListInDialog = function (props) {
    const { rules, checkedRules, classes, onInputChange } = props;
    console.log(rules, 'rulesrules')
    return (
        <List dense className={classes.root}>
            {rules.map(value => {
                console.log(value)
                const labelId = `checkbox-list-secondary-label-${value}`;
                let lbl = value;

                if (value.indexOf('_') !== -1) lbl = value.split('_').join(' ');

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
            })}
        </List>
    )
};

export default RuleListInDialog;