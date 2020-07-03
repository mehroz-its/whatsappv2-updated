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


const PermissionDialog = (props) => {
    console.log(props.data,'in dialog')
    const {data} = props
    const {isOpen,type} = props
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [method, setMethod] = React.useState(props.data.method);
    const [title, setTitle] = React.useState(data.title);
    const [description, setDescription] = React.useState(data.description);
    const [isToggled, setIsToggled] = React.useState(data.enabled);
   
    const handleClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };
    console.log(method,'mthod valeeasds');
    
    const classes = useStyles(props);
    
	  const handleMethodChange = (event) => {
      setMethod(event.target.value);
      };

      const handleToggleChange = () => {
        setIsToggled(!isToggled)
       };

      const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
      };

      const [state, setState] = React.useState({
        
        checkedApplication: false,
        checkedAudio: false,
        checkedCity: false,
     
      });

      const result=Object.values(state)

      const checkToShow = ()=>{
        if(method==="APP")
        {
            console.log('first');
            
            return (
                <>
              <FormControlLabel
      
      control={<GreenCheckbox checked={state.checkedApplication} onChange={handleChange} name="checkedApplication" />}
      label="Receive Calls"
    />
    </>
            )
        }
        else if(method==="FRONT")
        {
            console.log('second');
            
            return (
              <FormControlLabel
      
              control={<GreenCheckbox checked={state.checkedAudio} onChange={handleChange} name="checkedAudio" />}
              label="Send Audio"
            />
            )
        }
        else if(method==="BACK")
        {
            console.log('third');
            
            return (
              <FormControlLabel
      
              control={<GreenCheckbox checked={state.checkedCity} onChange={handleChange} name="checkedCity" />}
              label="Edit City"
            />
            )
        }
  
    }
    const handleSubmit = () => {
    
        
      // let fileName = uploadedFilePath.split('https://upload.its.com.pk/')
      let params = {
        id: "0",
        description: description,
        title: title,
        rule_set: result,
        enabled: true,
        consumer: 0,
        displayed: true,
      };
      console.log(params,'params')
      if (type !== 'Update') {
        CoreHttpHandler.request('permissions', 'create', params, (response) => {
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
        CoreHttpHandler.request('permissions', 'update', update_params, (response) => {
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
    <Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{
        paper: 'm-24'
    }}

        fullWidth
        maxWidth="sm">
        <DialogTitle id="form-dialog-title">{type} Permissions</DialogTitle>
        <DialogContent classes={{ root: 'p-24' }}>
        <div style={{display:'flex',flexDirection:'row'}}>
        <div>
            <div className="flex">
                <div className="min-w-48 pt-20">
                    <Icon color="action">account_circle</Icon>
                </div>

                <TextField
                    className="mb-24"
                    label="Title"
                    autoFocus
                    id="Title"
                    name="Title"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
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
                    
                    id="Description"
                    name="Description"
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    variant="outlined"
                    required
                    fullWidth
                />
            </div>
         
            <FormControl className={classes.formControl}>
					
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={method}
                      onChange={handleMethodChange}
                    >
                    <MenuItem value={0}>Select Customer</MenuItem>
                      <MenuItem value={"APP"}>Application</MenuItem>
                      <MenuItem value={"FRONT"}>FrontEnd</MenuItem>
                      <MenuItem value={"BACK"}>Backend</MenuItem>
                      <MenuItem value={"Client"}>Client</MenuItem>
                    </Select>
                  </FormControl>
     <div className="flex">
                  <FormControlLabel
        control={<GreenCheckbox checked={isToggled} onChange={handleToggleChange} name="checkedG" />}
        label="Enabled"
      />
      </div>
    </div>
<div style={{flexDirection:'column',flex:1,display:'flex',alignItems:'flex-end',marginLeft:10}}>
		  {
			checkToShow()
		  }

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

export default PermissionDialog