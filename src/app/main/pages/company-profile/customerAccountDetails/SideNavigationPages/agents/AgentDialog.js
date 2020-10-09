import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler'
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
    const { isOpen, type, getUpdatedData, data,clientId } = props
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [canned_type, setCannedType] = React.useState(data.message_type);

    const [username, setUsername] = React.useState(data.username);
    const [password, setPassword] = React.useState(data.password);
    const [firstname, setFirstname] = React.useState(data.firstname);
    const [lastname, setLastname] = React.useState(data.lastname);
    const [email, setEmail] = React.useState(data.email);
    const [mobile, setMobile] = React.useState(data.number);
    const [position, setPosition] = React.useState(data.position);
    const [maxTokenCount, setMaxTokenCount] = React.useState(data.max_token_count);
    const [status, setStatus] = React.useState(data.enabled);

    const [enabled, setEnabled] = React.useState(data.enabled);

    const handleDialogClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };
    // const handleSubmit = () => {
    //     let fileName
    //     if (uploadedFilePath != '') {
    //         fileName = uploadedFilePath.split('https://upload.its.com.pk/')
    //     } else {
    //         fileName = ''
    //     }
    //     let params = {
    //         message_name: name,
    //         message_text: text,
    //         message_params: attachment_params,
    //         attachment_url: uploadedFilePath,
    //         attachment_name: fileName[1],
    //         message_type: canned_type,
    //         enabled: enabled
    //     };
    //     if (type !== 'Update Canned Message') {
    //         CoreHttpHandler.request('canned_messages', 'create_message', params, (response) => {
    //             props.closeDialog('create')
    //             setopenDialog(false);
    //         }, (error) => {
    //             props.closeDialog("error")
    //             setopenDialog(false);
    //         });
    //     } else {
    //         let update_params = {
    //             key: 'id',
    //             value: data.id,
    //             params: params
    //         }
    //         CoreHttpHandler.request('canned_messages', 'update_message', update_params, (response) => {
    //             props.closeDialog("update")
    //             setopenDialog(false);
    //         }, (error) => {
    //             props.closeDialog("error")
    //             setopenDialog(false);

    //         });
    //     }
    // };
    const handleEnable = (event) => {
        setEnabled(event.target.checked);
    };

    const onInputChange = e => {
        switch (e.target.name) {
            case "username":
                setUsername(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            case "firstname":
                setFirstname(e.target.value)
                break;
            case "lastname":
                setLastname(e.target.value)
                break;
            case "email":
                setEmail(e.target.value)
                break;
            case "mobile":
                setMobile(e.target.value)
                break;
            case "position":
                setPosition(e.target.value)
                break;
                
        }
    }
    const handleTypeChange = (event) => {
        console.log("event.target.value : " ,  event.target.value);
        setMaxTokenCount(event.target.value)

    }
    const toggleChecked = (e) => {
        console.log("ToggleChecked e" , e.target.checked);
        setStatus(e.target.checked)

    }
    const handleSubmit = () => {
      
        let params = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email,
            number: mobile,
            enabled: status,
            role: maxTokenCount=== -1? "61":"64",
            position:position,
            max_token_count:maxTokenCount,
            default_receiver:maxTokenCount=== -1? true:false,
            clientId:clientId
        };
        if (type !== 'update') {
          
            CoreHttpHandler.request('CompanyAgent', 'create', params, (response) => {
                console.log("CompanyAgent response : " ,  response);
                props.closeDialog()
            }, (error) => {
            });
        } else {
            let update_params = {
                key: ':id',
                value: data.id,
                params: params
            }
            CoreHttpHandler.request('CompanyAgent', 'update', update_params, (response) => {
                console.log("CompanyAgent response : " ,  response);
                props.closeDialog()
            }, (error) => {
            });
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
                     {type === "update" ? "Update" : "Create"} Agent
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
                        name="username"
                        value={username}
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
                        name="password"
                        value={password}
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
                        name="email"
                        value={email}
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
                        id="mobile"
                        name="mobile"
                        value={mobile}
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
                        label="Position"
                        // autoFocus
                        id="position"
                        name="position"
                        value={position}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={onInputChange}
                        size="small"
                    />
                </div>
                <div className="flex">
                    <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                        <Icon color="action">accessibility</Icon>
                    </div>
                    <Select
                        required
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={maxTokenCount}
                        onChange={handleTypeChange}
                        fullWidth
                    >
                        <MenuItem value="">
                            <em>Select Type</em>
                        </MenuItem>
                        <MenuItem value={-1}>Admin</MenuItem>
                        <MenuItem value={1}>Agent</MenuItem>

                    </Select>
                </div>
                <div className="flex" style={{ marginTop: 20 }}>
                    <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                        <Icon color="action">accessibility</Icon>
                    </div>
                    <FormControlLabel
                        style={{ marginLeft: '2px' }}
                        control={
                            <Switch
                                checked={status}
                                onChange={toggleChecked}
                                name="status"
                                color="primary"
                                size="small" />
                        }
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
                    {type !== 'update' ?
                        <div className="mx-32 md:mx-24 my-10">
                            <Button className={classes.margin} size="small" variant="contained" onClick={handleSubmit} color="primary">
                                create
       				  </Button>
                        </div>
                        :
                        <div className="mx-32 md:mx-24 my-10">
                            <Button className={classes.margin} size="small" variant="contained" onClick={handleSubmit}  color="primary">
                                Update
					</Button>
                        </div>
                    }
                </ThemeProvider>
            </DialogActions>
        </Dialog>
    )
}
export default AgentDialog