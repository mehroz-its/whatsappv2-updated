import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, ThemeProvider, createMuiTheme, } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';

const ConfirmationDialogue = function (props) {
    const { data, type, handleDialogClose, handleSubmit } = props;
    const [confirmationType, setConfirmationType] = React.useState(null)
    const [value, setValue] = React.useState(null)

    const useStyles = makeStyles((theme) => ({
        addButton: {
            position: 'absolute',
            bottom: 50,
            right: 50,
            zIndex: 99
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 330,
        },
        margin: {
            color: 'white',
            paddingLeft: '14px',
            paddingRight: '14px',
            paddingTop: '5px',
            paddingBottom: '5px',
            fontSize: '1.3rem',
        },
    }));
    const theme = createMuiTheme({
        palette: {
            primary: green,
        },
    });
    const classes = useStyles(props);
    React.useEffect(() => {
        if (data) {
            if (type === "enabled") {
                setValue(!data.enabled)
            } else if (type === "delete") {
                setValue(!data.is_deleted)
            } else if (type === "default") {
                setValue(!data.is_default)
            }
        }
    }, [])

    return (
        type ?



            <Dialog open={true} aria-labelledby="form-dialog-title" classes={{
                paper: 'm-24'
            }}
                onClose={() => { props.handleDialogClose() }}
                fullWidth
                maxWidth="xs">
                <AppBar position="static" elevation={1}>
                    <div
                        className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
                        style={{ paddingBottom: 20, paddingTop: 20 }}
                    >
                        Confirmation
				</div>
                </AppBar>
                <DialogContent >
                    <div style={{ width: '100%', marginBottom: 20, fontSize: '12px' }}>
                        <h3>
                            {
                                'Are you sure you want to ' +
                                (type === 'enabled' ? (data.enabled ? "disable" : "enable") : "") +
                                (type === 'delete' ? (data.is_deleted ? "restore" : "delete") : "") +
                                (type === 'default' ? 'mark as default' : "") +
                                ' this record?'
                            }
                        </h3>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary" size="small" variant="contained" >
                        Cancel
             </Button>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" onClick={e => { handleSubmit(value) }} color="primary" size="small" className={classes.margin}>
                            Yes
         </Button>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>




            : <></>







    );
};

export default ConfirmationDialogue;