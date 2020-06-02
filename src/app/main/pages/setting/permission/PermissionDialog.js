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
    console.log(props,'in dialog')
    const {isOpen,type} = props
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [age, setAge] = React.useState('0');
    const handleClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };
    const classes = useStyles(props);
    
	  const handleChangeAgain = (event) => {
		setAge(event.target.value);
      };
      const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
      };
      const [state, setState] = React.useState({
		
		checkedG: false,
		checkedA: false,
		checkedB: false,
		checkedF: false,
	  });
      const checkToShow = ()=>{
        if(age===10)
        {
            console.log('first');
            
            return (
                <>
              <FormControlLabel
      
      control={<GreenCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
      label="Receive Calls"
    />
    </>
            )
        }
        else if(age===20)
        {
            console.log('second');
            
            return (
              <FormControlLabel
      
              control={<GreenCheckbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
              label="Send Audio"
            />
            )
        }
        else if(age===30)
        {
            console.log('third');
            
            return (
              <FormControlLabel
      
              control={<GreenCheckbox checked={state.checkedF} onChange={handleChange} name="checkedF" />}
              label="Edit City"
            />
            )
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
                    label="Name"
                    autoFocus
                    id="name"
                    name="name"

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
                    autoFocus
                    id="name"
                    name="name"


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
                      value={age}
                      onChange={handleChangeAgain}
                    >
                    <MenuItem value={0}>Select Customer</MenuItem>
                      <MenuItem value={10}>Application</MenuItem>
                      <MenuItem value={20}>FrontEnd</MenuItem>
                      <MenuItem value={30}>Backend</MenuItem>
                      <MenuItem value={40}>Client</MenuItem>
                    </Select>
                  </FormControl>
     <div className="flex">
                  <FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
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
            <Button onClick={handleClose} color="primary">
                Done
         </Button>
        </DialogActions>
    </Dialog>




       

    )
}

export default PermissionDialog