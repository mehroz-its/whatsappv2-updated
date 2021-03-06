import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { green } from '@material-ui/core/colors';
import { makeStyles, ThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import PermissionsListInDialog from '../PermissionsListInDialog'
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';

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



const RolesDialog = (props) => {
    const { isOpen, type, data } = props
    const [currentPermissions, setCurrentPermissions] = React.useState(type === 'Update' ? data.permission : []);
    const [selected, setSelected] = React.useState([])
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [name, setName] = React.useState(data.name);
    const [permissions, setPermissions] = React.useState([]);
    const [description, setDescription] = React.useState(data.description);
    const [isToggled, setIsToggled] = React.useState(data.enabled);
    const handleClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };
    const classes = useStyles(props);
    const handleToggleChange = () => {
        setIsToggled(!isToggled)
    };
    const getRoles = ((loadPermissions) => {
        loadPermissions = () => {
            return CoreHttpHandler.request('permissions', 'listing', {
                columns: "id, title",
                sortby: "ASC",
                orderby: "id",
                where: "displayed = $1",
                values: true,
                page: 0,
                limit: 0
            }, null, null, true);
        };
        loadPermissions().then((response) => {
            const tableData = response.data.data.list.data
            setPermissions(tableData)
        });
    })

    React.useEffect(() => {
        getRoles()
    }, []);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const [state, setState] = React.useState({
        Agentback: false,
        Agentfront: false,
        AgentApplication: false,
    });
    const result = Object.values(state)
    const handleSubmit = () => {
        if (type !== 'Update') {
            let params = {
                id: 0,
                name: name,
                description: description,
                permissions: currentPermissions,
                enabled: isToggled,
                displayed: true,
            };
            CoreHttpHandler.request('roles', 'create_role', params, (response) => {
                props.closeDialog("create")
                setopenDialog(false);
            }, (error) => {
                props.closeDialog("error")
                setopenDialog(false);

            });
        } else {
            let params = {
                id: data.id,
                name: name,
                description: description,
                permissions: currentPermissions,
                enabled: isToggled,
                displayed: true,
            };
            let update_params = {
                key: 'id',
                value: data.id,
                params: params
            }
            CoreHttpHandler.request('roles', 'update_role', update_params, (response) => {
                props.closeDialog("update")
                setopenDialog(false);
            }, (error) => {
                props.closeDialog("error")
                setopenDialog(false);

            });
        }
    }

    const onInputChange = (e) => {
        let value = null;
        if (e.target.name === 'permissions') {
            const roleIndex = currentPermissions.indexOf(e.target.value);
            if (roleIndex === -1) {
                currentPermissions.push(e.target.value);
            } else {
                currentPermissions.splice(roleIndex, 1);
            }
            value = [...currentPermissions];
            setCurrentPermissions(value);
        } else {
            if (e.target.name === 'enabled') {
                value = e.target.checked;
            } else value = e.target.value;
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
                    {type} Roles
				</div>
            </AppBar>
            <DialogContent classes={{ root: 'p-24' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                {/* <Icon color="action">account_circle</Icon> */}
                                <PersonIcon style={{ color: "#8b8b8b" }} />
                            </div>
                            <TextField
                                className="mb-24"
                                label="Name"
                                autoFocus
                                id="name"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                variant="outlined"
                                required
                                disabled={props.type !== 'Update' ? false : true}
                                fullWidth
                                size="small"
                            />
                        </div>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                {/* <Icon color="action">account_circle</Icon> */}
                                <DescriptionIcon style={{ color: "#8b8b8b" }} />
                            </div>
                            <TextField
                                className="mb-24"
                                label="Description"

                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                size="small"
                            />
                        </div>
                        <FormControlLabel
                            control={<Checkbox checked={isToggled} onChange={handleToggleChange} name="checkedA" />}
                            label="Enabled"
                        />
                    </div>
                    <div style={{ flexDirection: 'column', flex: 1, display: 'flex', marginLeft: 10 }}>
                        <PermissionsListInDialog edit permissions={permissions} onInputChange={onInputChange} checkedPermissions={currentPermissions} classes={classes} />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained" size="small">
                    Cancel
                 </Button>
                <ThemeProvider theme={theme}>
                    <Button size="small" className={classes.margin} variant="contained" onClick={handleSubmit} disabled={!name || !description || !permissions} color="primary">
                        Done
                  </Button>
                </ThemeProvider>
            </DialogActions>
        </Dialog>
    )
}

export default RolesDialog