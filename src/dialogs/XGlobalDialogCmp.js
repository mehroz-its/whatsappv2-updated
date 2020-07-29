import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';

const XGlobalDialog = function XGlobalDialog(props) {

    const { onDialogPropsChange, options, actions, content, defaultState, dialogTitle, data, contentProps } = props;

    const _actions = actions.map((item, i) => {
        return (
            <Button key={`global_dialog_action_${i}`} 
                onClick={(event, index) => item.handler(event, index, defaultState)} 
                { ...item.options }>
                {item.label}
            </Button>
        );
    });

    const _content = (content === null) ? <div></div> : content;

    return (
        <Dialog open={defaultState} {...options} fullWidth={true}>
            {/* <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle> */}
            <AppBar position="static" elevation={1}>
				
				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
        style={{paddingBottom:20,paddingTop:20}}>
	      {dialogTitle}
				</div>
			</AppBar>
            <_content {...contentProps}  onDialogPropsChange={onDialogPropsChange} onChangeToggle={(e)=>{props.onChangeToggle(e)}} data={data} />
            <DialogActions>{_actions}</DialogActions>
        </Dialog>
    );

};

export default XGlobalDialog;