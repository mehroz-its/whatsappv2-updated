import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { green } from '@material-ui/core/colors';
import { makeStyles, withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import UserRolesListInDialog from './UserRolesListInDialog'
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import WorkIcon from '@material-ui/icons/Work';

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
        fontWeight: '300',
        paddingRight: '14px',
        paddingTop: '5px',
        paddingBottom: '5px',
        fontSize: '13px',

    },
}))

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const UserDialog = (props) => {
    const classes = useStyles();
    const { data } = props
    const { isOpen, type } = props
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [userName, setUserName] = React.useState(data.username);
    const [position, setPosition] = React.useState(data.position);
    const [email, setEmail] = React.useState(data.email);
    const [number, setNumber] = React.useState(data.number);
    const [password, setPassword] = React.useState('');
    const [roles, setRoles] = React.useState([])
    const [currentRoles, setCurrentRoles] = React.useState(data.roles);
    const [enabled, setEnabled] = React.useState(data.enabled);
    const [isToggled, setIsToggled] = React.useState(data.enabled);
    // const [displayed, setDisplayed] = React.useState(data.displayed);

    const [dataCopy,setCopy] = React.useState({
        // username: data.username,
        email: data.email,
        number: data.number,
        password: "",
        enabled: data.enabled,
        // displayed: data.displayed,
        position: data.position
    })

    const [state, setState] = React.useState({
        checkedAgent: false,
        checkedaSaS: false,
        checkedAdmin2: false,
        checkedFahad: false,
    });
    const handleClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const result = Object.values(state)
    
    const handleEnable = (event) => {
        setEnabled(event.target.checked);
    };
    function filterData(params){
        let updated = {}
        
        if(dataCopy&&Object.keys(dataCopy)&&Object.keys(dataCopy).length){
            Object.keys(dataCopy).forEach(key=>{
                if(dataCopy[key]!=params[key]){
                    updated[key]=params[key]
                }
            })
        }

        return updated
    }
    const handleSubmit = () => {
        if (type !== 'Update') {
            let params = {
                id: 0,
                username: userName,
                email: email,
                number: number,
                password: password,
                enabled: true,
                displayed: true,
                position: position,  
                role: 64,            
                max_token_count: 1,  
                default_receiver: false, 
                // clientId: JSON.parse(localStorage.getItem("user_data")).id
            };
            
            CoreHttpHandler.request('users', 'create_user', params, (response) => {
                props.closeDialog('create')
                setopenDialog(false);
            }, (error) => {
                
                if(error&&error.response&&error.response.data&&error.response.data.message){
                    if(props.snackbar){
                        props.snackbar(error.response.data.message)
                        setTimeout(()=>{
                            if(props.snackbar){
                                props.snackbar("")
                            }
                        },2000)
                    }else{
                        if(props.displayError){
                            props.displayError(error.response.data.message)
                        }else{
                            props.closeDialog(error.response.data.message)
                            setopenDialog(false);
                        }
                    }
                }else{
                    props.closeDialog("Error")
                    setopenDialog(false);
                }
            });
        } else {
            let params = {
                id: data.id,
                // username: userName,
                email: email,
                number: number,
                password: password,
                enabled: enabled,      
                // displayed: true,
                roles: currentRoles,
                position: position,  
                // clientId: JSON.parse(localStorage.getItem("user_data")).id
            };
            let filtered = filterData(params)
            if(filtered&&Object.keys(filtered)&&Object.keys(filtered).length){

                // filtered.rol =  64           
                // filtered.max_token_count = 1 
                // filtered.default_receiver = false

                let update_params = {
                    key: 'id',
                    value: props.data.id,
                    params: filtered
                }
                CoreHttpHandler.request('users', 'update_user', update_params, (response) => {
                    props.closeDialog("update")
                    setopenDialog(false);
                }, (error) => {
                    if(error&&error.response&&error.response.data&&error.response.data.message){
                        if(props.snackbar){
                            props.snackbar(error.response.data.message)
                            setTimeout(()=>{
                                if(props.snackbar){
                                    props.snackbar("")
                                }
                            },2000)
                        }else{
                            if(props.displayError){
                                props.displayError(error.response.data.message)
                            }else{
                                props.closeDialog(error.response.data.message)
                                setopenDialog(false);
                            }
                        }
                    }else{
                        props.closeDialog("Error")
                        setopenDialog(false);
                    }
                });
            }else{
                if(props.displayError){
                    props.displayError("No Changes Made!")
                }
            }
        }
    }
    const handleToggleChange = () => {
        setIsToggled(!isToggled)
    };

    const onInputChange = (e) => {
        if (e.target.name === 'roles') {
            const roleIndex = currentRoles.indexOf(e.target.value);
            if (roleIndex === -1) {
                currentRoles.push(e.target.value);
            } else {
                currentRoles.splice(roleIndex, 1);
            }
            const roles = [...currentRoles];
            setCurrentRoles(roles);
        }
    }


    return (
        <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{
            paper: 'm-24'
        }}

            fullWidth
            maxWidth="sm">
            <AppBar position="static" elevation={1}>
                <div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
                    style={{ paddingBottom: 20, paddingTop: 20 }}>
                    {type} Users
				</div>
            </AppBar>
            <DialogContent classes={{ root: 'p-24' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                <PersonIcon style={{ color: "#8b8b8b" }} />
                            </div>
                            <TextField
                                className="mb-24"
                                label="UserName"
                                autoFocus
                                id="UserName"
                                name="UserName"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                size="small"
                                disabled={type == 'Update'}
                            />
                        </div>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                <WorkIcon style={{ color: "#8b8b8b" }} />
                            </div>
                            <TextField
                                className="mb-24"
                                label="Position"
                                autoFocus
                                id="position"
                                name="position"
                                value={position}
                                onChange={e => setPosition(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                size="small"
                            />
                        </div>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                <EmailIcon style={{ color: "#8b8b8b" }} />
                            </div>
                            <TextField
                                className="mb-24"
                                label="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                id="Email"
                                name="Email"
                                variant="outlined"
                                required
                                fullWidth
                                size="small"
                            />
                        </div>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                <PhoneAndroidIcon style={{ color: "#8b8b8b" }} />
                            </div>
                            <TextField
                                className="mb-24"
                                label="Number"
                                id="Number"
                                name="Number"
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                type="number"
                                size="small"
                            />
                        </div>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                <VisibilityOffIcon style={{ color: "#8b8b8b" }} />
                            </div>
                            <TextField
                                className="mb-24"
                                label="Password"
                                id="name"
                                name="name"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                size="small"
                            />
                        </div>
                        <FormControlLabel
                            control={<Checkbox
                                checked={enabled}
                                onChange={handleEnable}
                            />}
                            label="Enabled"
                        />
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" size="small" variant="contained">
                    Cancel
                </Button>
                <ThemeProvider theme={theme}>
                    <Button size="small" className={classes.margin} variant="contained" onClick={handleSubmit} disabled={!userName || !position || !email || !number || !roles || !currentRoles} color="primary">
                        Done
                </Button>
                </ThemeProvider>
            </DialogActions>
        </Dialog>

    )
}

export default UserDialog