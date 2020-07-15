import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, DialogContent } from '@material-ui/core';

const XGlobalDialog = function (props) {
    const {
        dialogs,
        data,
        onDialogPropsChange,
    } = props;

    const { state, type } = data;

    const _type = dialogs[type];

    const _content = (_type) ? React.memo((props) => <_type.content {...props} />) : <div></div>;
    const _props = (_type && _type.props) ? _type.props : {};

    const _buttons = () => {
        if (_type) {

            const { okButton, cancelButton } = _type;

            const _buttons = [];

            if (cancelButton) {
                _buttons.push(<Button key={`global_dialog_action_cancel`}
                    onClick={(event) => {
                        onDialogPropsChange({ state: false, type, button: 'cancel' });
                    }}
                >
                    {'Cancel'}
                </Button>)
            }

            if (okButton) {
                _buttons.push(<Button key={`global_dialog_action_ok`}
                    onClick={(event) => {
                        onDialogPropsChange({ state: false, type, button: 'ok' });
                    }}
                >
                    {'Ok'}
                </Button>)
            }

            let _others = [];

            if (_type.buttons) {
                _others = _type.buttons.map((button, i) => {
                    _buttons.push(
                        <Button key={`global_dialog_action_${i}`}
                            onClick={(event) => button.handler(event, i, type)}
                            {...button.options}>
                            {button.label}
                        </Button>
                    );
                })
            }

            return _buttons.concat(_others);
        } else return null;
    };

    return (
        <Dialog open={state} aria-labelledby="form-dialog-title" aria-describedby="form-dialog-title" fullWidth={true}>
            {_type && <DialogTitle id="form-dialog-title">{_type.title}</DialogTitle>}
            {_type && <_content {..._props} onDialogPropsChange={onDialogPropsChange} data={data} />}
            <DialogActions>{_buttons()}</DialogActions>
        </Dialog>
    );

};

export default XGlobalDialog;