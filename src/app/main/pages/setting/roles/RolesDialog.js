import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { green } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import PermissionsListInDialog from '../PermissionsListInDialog'

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
}))


const RolesDialog = (props) => {
    // const {
    //     permissions,
    //     role,
    // } = props.data;
    // // console.log(object)
    console.log(props.data.permission, ' props.data in dialog')
    const { isOpen, type, data } = props
    const [currentPermissions, setCurrentPermissions] = React.useState(type === 'Update' ? data.permission : []);
    const [selected, setSelected] = React.useState([])
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [name, setName] = React.useState(data.name);
    const [permissions, setPermissions] = React.useState([]);

    const [description, setDescription] = React.useState(data.description);
    const [isToggled, setIsToggled] = React.useState(data.enabled);
    console.log(isToggled, 'asdasd');
    const handleClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };
    const classes = useStyles(props);


    const handleToggleChange = () => {
        setIsToggled(!isToggled)
    };


    const getRoles = ((loadPermissions) => {
        console.log('called get data')
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
            console.log(tableData, 'in ')
            setPermissions(tableData)
            // setData(tableData)
            // setData2(tableData)

        });
    })



    React.useEffect(() => {
        getRoles()
    }, []);

    const handleChange = (event) => {
        console.log(event.target.name, event.target.checked, 'event', event);

        setState({ ...state, [event.target.name]: event.target.checked });

    };
    const [state, setState] = React.useState({

        Agentback: false,
        Agentfront: false,
        AgentApplication: false,

    });
    const result = Object.values(state)

    const handleSubmit = () => {
        //         console.log(currentPermissions,'selected permissions here')
        // return;

        // let fileName = uploadedFilePath.split('https://upload.its.com.pk/')
 
        // return;
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
                // props.getUpdatedData()
                console.log(response)
                props.closeDialog()
                setopenDialog(false);
            }, (error) => {
                props.closeDialog()
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

            console.log(params, 'datasss');

            let update_params = {
                key: 'id',
                value:data.id,
                params: params
            }
            console.log(update_params, 'update_params')
            // return
            CoreHttpHandler.request('roles', 'update_role', update_params, (response) => {
                // props.getUpdatedData()
                console.log(response)
                props.closeDialog()
                setopenDialog(false);
            }, (error) => {
                props.closeDialog()
                setopenDialog(false);

            });
        }
    }

    const onInputChange = (e) => {
        console.log(e.target.name, e.target.value)
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

            // _func(value);
        }
    }
    return (
        // <div> {isOpen}</div>
        <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{
            paper: 'm-24'
        }}

            fullWidth
            maxWidth="sm">
            <DialogTitle id="form-dialog-title">{type} Roles</DialogTitle>
            <DialogContent classes={{ root: 'p-24' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                        <div className="flex">
                            <div className="min-w-48 pt-20">
                                <Icon color="action">account_circle</Icon>
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
                                disabled
                                fullWidth
                            />
                        </div>

                        <div className="flex">
                            <div className="min-w-48 pt-20">
                                <Icon color="action">account_circle</Icon>
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
                            />
                        </div>
                        <FormControlLabel
                            control={<Checkbox checked={isToggled} onChange={handleToggleChange} name="checkedA" />}
                            label="Enabled"
                        />
                    </div>
                    <div style={{ flexDirection: 'column', flex: 1, display: 'flex', marginLeft: 10 }}>

                        {/* <FormControlLabel

    control={<GreenCheckbox checked={state.Agentback} onChange={handleChange} name="Agentback"  value={0} />}
    label="Agent Backend Access"
    />
    <FormControlLabel
    control={<GreenCheckbox checked={state.Agentfront} onChange={handleChange} name="Agentfront"  />}
    label="Agent FrontEnd Access"
    />
    <FormControlLabel
    control={<GreenCheckbox checked={state.AgentApplication} onChange={handleChange} name="AgentApplication" />}
    label="Agent Application Access"
    /> */}

                        <PermissionsListInDialog edit permissions={permissions} onInputChange={onInputChange} checkedPermissions={currentPermissions} classes={classes} />
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
    </Button>
                <Button onClick={handleSubmit} color="primary">
                    Done
    </Button>
            </DialogActions>
        </Dialog>






    )
}

export default RolesDialog