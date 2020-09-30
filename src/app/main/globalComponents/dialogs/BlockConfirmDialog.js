import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

const BlockConfirmDialog = function (props) {
    const { data, onDialogPropsChange } = props;

    const [blockReason, setBlockReason] = React.useState('');

    const onInputChange = e => {
        setBlockReason(e.target.value);

        onDialogPropsChange({
            event: 'input',
            value: e.target.value,
            key: 'block_reason',
        });
    };

    return (
        <DialogContent >
            <div style={{ width: '100%', marginBottom: 20,fontSize:'12px' }}>
                {data ? `Are you sure you want to block this number [${data.number}] ?` : `Are you sure you want to block this number ?`}
            </div>
            <div style={{ marginBottom: 20 }}>
                <TextField value={blockReason} name={'block_reason'} label="Reason" variant="outlined" fullWidth autoComplete="off" onChange={onInputChange} />
            </div>
        </DialogContent>
    );
};

export default BlockConfirmDialog;