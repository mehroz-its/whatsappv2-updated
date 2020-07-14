import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';



const XGlobalDialog = function XGlobalDialog(props) {

    const { options, actions, content, defaultState, dialogTitle, data, permissionListing, contentProps, roles } = props;

    const _actions = actions.map((item, i) => {
        return (
            <Button key={`global_dialog_action_${i}`} 
                disabled={item.display == ''}
                onClick={(event, index) => item.handler(event, index, defaultState)} 
                { ...item.options }>
                {item.label}
            </Button>
        );
    });

    const _content = (content === null) ? <div></div> : content;

    return (
        <Dialog open={defaultState} {...options} fullWidth={true}>
            <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
            <_content {...contentProps} onchange={(e)=>{props.onchange(e)}} onChangeToggle={(e)=>{props.onChangeToggle(e)}} data={data} permissionListing={permissionListing} roles={roles} />
            <DialogActions>{_actions}</DialogActions>
        </Dialog>
    );

};

export default XGlobalDialog;