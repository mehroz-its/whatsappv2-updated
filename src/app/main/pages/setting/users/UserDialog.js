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




const UserDialog = (props) => {
    
    console.log(props,'in dialogasdasdasd')
    const {data} = props
    const {isOpen,type} = props
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [userName, setUserName] = React.useState(data.username);
    const [email, setEmail] = React.useState(data.email);
    const [number, setNumber] = React.useState(data.number);
    const [password, setPassword] = React.useState('');
    const [isToggled, setIsToggled] = React.useState(data.enabled);
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

      const result=Object.values(state)

      
      const handleSubmit = () => {
    
        
     // let fileName = uploadedFilePath.split('https://upload.its.com.pk/')
     let params = {
        id: 0,
                    username: userName,
                    email: email,
                    number: number,
                    password: password,
                    enabled: false,
                    displayed: true,
                    roles: result
     };
     console.log(params,'params')
     if (type !== 'Update') {
       CoreHttpHandler.request('users', 'create_user', params, (response) => {
         // props.getUpdatedData()
         console.log(response)
         props.closeDialog()
         setopenDialog(false);
       }, (error) => {
         props.closeDialog()
         setopenDialog(false);
 
       });
     } else {

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
   const handleToggleChange = () => {
    setIsToggled(!isToggled)
   };

        
    return (  
    // <div> {isOpen}</div>
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" 	classes={{
        paper: 'm-24'
    }}

    fullWidth
    maxWidth="sm">
<DialogTitle id="form-dialog-title">{type} Users</DialogTitle>
<DialogContent classes={{ root: 'p-24' }}>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{flex:1}}>
            <div className="flex">
                <div className="min-w-48 pt-20">
                    <Icon color="action">account_circle</Icon>
                </div>

                <TextField
                    className="mb-24"
                    label="UserName"
                    autoFocus
                    id="UserName"
                    name="UserName"
                    value={userName}
                    onChange={e=>setUserName(e.target.value)}
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
                    label="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    id="Email"
                    name="Email"
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
                    label="Number"
                    id="Number"
                    name="Number"
                    value={number}
                    onChange={e=>setNumber(e.target.value)}
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
                    label="Password"
                    id="name"
                    name="name"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
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
<div style={{marginLeft:10,flexDirection:'column',flex:1,display:'flex'}}>
<FormControlLabel
control={<GreenCheckbox checked={state.checkedAgent} onChange={handleChange} name="checkedAgent" />}
label="Agent "
/>
<FormControlLabel
control={<GreenCheckbox checked={state.checkedaSaS} onChange={handleChange} name="checkedaSaS" />}
label="aSas "
/>
<FormControlLabel
control={<GreenCheckbox checked={state.checkedAdmin2} onChange={handleChange} name="checkedAdmin2" />}
label="Admin2 "
/>
<FormControlLabel
control={<GreenCheckbox checked={state.checkedFahad} onChange={handleChange} name="checkedFahad" />}
label="Fahad"
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

export default UserDialog