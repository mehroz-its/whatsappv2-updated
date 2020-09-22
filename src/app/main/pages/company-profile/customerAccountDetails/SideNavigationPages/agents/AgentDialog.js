import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler'
// import { getUserData } from '../../chat/store/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
import { green, purple } from '@material-ui/core/colors';


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
        fontWeight: 'bold',
        paddingRight: '14px',
        paddingTop: '5px',
        paddingBottom: '5px',
        fontSize: '12px',

    },

}));

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const AgentDialog = (props) => {
    const classes = useStyles(props);
    const { isOpen, type, getUpdatedData, data } = props
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [canned_type, setCannedType] = React.useState(data.message_type);
    const [name, setName] = React.useState(data.name);
    const [text, setText] = React.useState(data.message_text);
    const [enabled, setEnabled] = React.useState(data.enabled);
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [uploadedFilePath, setUploadedFilePath] = React.useState(data.attachment_url);
    const [attachment_name, setAttachment_name] = React.useState(data.file_name)
    const [attachment_params, setAttachment_params] = React.useState('')

    const handleDialogClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };
    console.log(data, "DATA RECEIVED FROM AGENT");
    const handleSubmit = () => {
        let fileName
        if (uploadedFilePath != '') {
            fileName = uploadedFilePath.split('https://upload.its.com.pk/')
        } else {
            fileName = ''
        }
        let params = {
            message_name: name,
            message_text: text,
            message_params: attachment_params,
            attachment_url: uploadedFilePath,
            attachment_name: fileName[1],
            message_type: canned_type,
            enabled: enabled
        };
        if (type !== 'Update Canned Message') {
            CoreHttpHandler.request('canned_messages', 'create_message', params, (response) => {
                props.closeDialog('create')
                setopenDialog(false);
            }, (error) => {
                props.closeDialog("error")
                setopenDialog(false);
            });
        } else {
            let update_params = {
                key: 'id',
                value: data.id,
                params: params
            }
            CoreHttpHandler.request('canned_messages', 'update_message', update_params, (response) => {
                props.closeDialog("update")
                setopenDialog(false);
            }, (error) => {
                props.closeDialog("error")
                setopenDialog(false);

            });
        }
    };
    const handleEnable = (event) => {

        setEnabled(event.target.checked);
        console.log(enabled, 'enable')
    };

    const onInputChange = e => {
        switch (e.target.name) {
            case "name":
                setName(e.target.value)
                break;
            case "description":
                setDescription(e.target.value)
                break;
            case "canned_type":
                setCannedType(e.target.value)
                break;
            case "text":
                setText(e.target.value)
                break;
        }
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const onChangeHandler = event => {
        setIsLoading(true);

        if (event.target.files.length > 0) {
            const _data = new FormData();

            let _name = event.target.files[0].name;

            _name = _name.replace(/\s/g, "");

            _data.append(
                "file",
                event.target.files[0],
                `${new Date().getTime()}_${_name}`
            );

            CoreHttpHandler.request(
                "content",
                "upload",
                {
                    params: _data
                },
                response => {
                    setIsLoading(false);
                    setUploadedFilePath(response.data.data.link)
                    // let name = response.data.data.link
                    // setAttachment_name(name.split('/'))
                    // console.log(attachment_name,'name')

                    onInputChange({
                        target: {
                            name: 'msisdnUrl',
                            value: response.data.data.link
                        }
                    })
                },
                error => {
                }
            );
        }
    };

    return (
        <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title" classes={{
            paper: 'm-24'
        }}
            style={{ marginTop: '2%' }}
            fullWidth
            maxWidth="xs">
            <AppBar position="static" elevation={1}>
                <div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
                    style={{ paddingBottom: 20, paddingTop: 20 }}>
                    {props.type}
                </div>
            </AppBar>
            <DialogContent classes={{ root: 'p-24' }}>
                <div className="flex">
                    <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                        <Icon color="action">account_circle</Icon>
                    </div>

                    <TextField
                        className="mb-24"
                        label="User Name"
                        // autoFocus
                        id="name"
                        name="name"
                        value={name}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onInputChange}
                        size="small"
                    />
                </div>

                <div className="flex">
                    <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                        <Icon color="action">account_circle</Icon>
                    </div>

                    <TextField
                        className="mb-24"
                        label="Password"
                        // autoFocus
                        id="name"
                        name="name"
                        value={name}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onInputChange}
                        size="small"
                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                        <Icon color="action">account_circle</Icon>
                    </div>

                    <TextField
                        className="mb-24"
                        label="First Name"
                        // autoFocus
                        id="name"
                        name="name"
                        value={name}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onInputChange}
                        size="small"
                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                        <Icon color="action">account_circle</Icon>
                    </div>

                    <TextField
                        className="mb-24"
                        label="Last Name"
                        // autoFocus
                        id="name"
                        name="name"
                        value={name}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onInputChange}
                        size="small"
                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                        <Icon color="action">account_circle</Icon>
                    </div>

                    <TextField
                        className="mb-24"
                        label="Email"
                        // autoFocus
                        id="name"
                        name="name"
                        value={name}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onInputChange}
                        size="small"
                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                        <Icon color="action">account_circle</Icon>
                    </div>

                    <TextField
                        className="mb-24"
                        label="Mobile"
                        // autoFocus
                        id="name"
                        name="name"
                        value={name}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onInputChange}
                        size="small"
                    />
                </div>





            </DialogContent>
            <DialogActions>
                <div className="px-16 my-10">
                    <Button variant="contained" onClick={handleDialogClose} color="primary" size="small">
                        Cancel
             </Button>
                </div>
                <ThemeProvider theme={theme}>
                    {canned_type === 'text' ?
                        <div className="mx-32 md:mx-24 my-10">
                            <Button className={classes.margin} size="small" variant="contained" onClick={handleSubmit} disabled={!name || !text || !canned_type} color="primary">
                                Done
       				  </Button>
                        </div>
                        :
                        <div className="mx-32 md:mx-24 my-10">
                            <Button className={classes.margin} size="small" variant="contained" onClick={handleSubmit} disabled={!name || !uploadedFilePath || !canned_type} color="primary">
                                Done
					</Button>
                        </div>
                    }
                </ThemeProvider>
            </DialogActions>
        </Dialog>

    )
}

export default AgentDialog