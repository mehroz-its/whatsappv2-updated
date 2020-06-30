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
    import { makeStyles,withStyles } from '@material-ui/core/styles';
    import Checkbox from '@material-ui/core/Checkbox';
    import FormControlLabel from '@material-ui/core/FormControlLabel';
    import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'

    const GreenCheckbox = withStyles({
        root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);

    const useStyles = makeStyles((theme)=>({
        addButton: {
            position: 'absolute',
            bottom:50,
            right:50,
            zIndex: 99
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 330,
        
        },
    }))


    const RolesDialog = (props) => {
        console.log(props,'in dialog')
        const {isOpen,type,data} = props
        const [openDialog, setopenDialog] = React.useState(isOpen);
        const [name, setName] = React.useState(data.name);
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
        
            
       
       
        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        };
        const [state, setState] = React.useState({
            
            Agentback: false,
            Agentfront: false,
            AgentApplication: false,
            
        });
        const result=Object.values(state)

        const handleSubmit = () => {
    
        
            // let fileName = uploadedFilePath.split('https://upload.its.com.pk/')
            let params = {
                id: 0,
                name: name,
                description: description,
                permissions: [7,9],
                enabled: isToggled,
                displayed: true,
            };
            console.log(params,'params')
            if (type !== 'Update') {
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
       return;
              console.log(props.data,'datasss');
              
              
              let update_params = {
                key: 'id',
                value:props.data.id,
                params:props.data
              }
              console.log(update_params,'update_params')
              // return
              CoreHttpHandler.request('users', 'update_user', update_params, (response) => {
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
        return (  
        // <div> {isOpen}</div>
        <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" 	classes={{
            paper: 'm-24'
        }}

        fullWidth
        maxWidth="sm">
    <DialogTitle id="form-dialog-title">{type} Roles</DialogTitle>
    <DialogContent classes={{ root: 'p-24' }}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{flex:1}}>
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
                        onChange={e=>setName(e.target.value)}
                        variant="outlined"
                        required
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
                        onChange={e=>setDescription(e.target.value)}
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                    />
                </div>
    <FormControlLabel
    control={<GreenCheckbox checked={isToggled} onChange={handleToggleChange} name="isToggled" />}
    label="Enabled"
    />
    </div>
    <div style={{flexDirection:'column',flex:1,display:'flex',marginLeft:10}}>
    <FormControlLabel

    control={<GreenCheckbox checked={state.Agentback} onChange={handleChange} name="Agentback" />}
    label="Agent Backend Access"
    />
    <FormControlLabel
    control={<GreenCheckbox checked={state.Agentfront} onChange={handleChange} name="Agentfront" />}
    label="Agent FrontEnd Access"
    />
    <FormControlLabel
    control={<GreenCheckbox checked={state.AgentApplication} onChange={handleChange} name="AgentApplication" />}
    label="Agent Application Access"
    />
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