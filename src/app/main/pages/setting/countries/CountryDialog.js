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


const CountryDialog = (props) => {
 
    const {isOpen,type,data} = props
    console.log(data,'dataaaaaa in cuntydialog');
    
   
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [enabled, setEnabled] = React.useState(data.enabled);
    const [name,setName]=React.useState(props.data.name)
   const [email,setEmail]=React.useState(props.data.code)
    const [city,setCities]=React.useState(props.data.cities)

    const handleClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };

 const handleSubmit = () => {
         console.log(city,'city');
         
  
      let params = {
        id:'',
        code: email,
        name: name,
        enabled: enabled,
        cities: city
      };
      console.log(params,'params')
      if (type !== 'Update') {
        CoreHttpHandler.request('locations', 'create_country', params, (response) => {
          // props.getUpdatedData()
          console.log(response)
          props.closeDialog()
          setopenDialog(false);
        }, (error) => {
          props.closeDialog()
          setopenDialog(false);
  
        });
      } else {
        console.log('here');
        
        let update_params = {
          key: 'id',
          value:props.data.id,
          params:{
            id:data.id,
            name:name,
            code:email,
            enabled:enabled,
            cities:undefined
          }
        }
        console.log(update_params,'update_params')
        //  return ;
        CoreHttpHandler.request('locations', 'update_country', update_params, (response) => {
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
   


  const loadCities = () => {
    return CoreHttpHandler.request('locations', 'get_cities', {
        columns: "id, name",
        sortby: "ASC",
        orderby: "id",
        where: "enabled = $1",
        values: true,
        page: 0,
        limit: 0
    }, null, null, true);
};

const createCountryDialog = () => {
    loadCities().then(response => {
        const cities = response.data.data.list.data;
      console.log('calledddddd',cities);
      setCities(cities)
    });
};

const handleEnable = (event) => {

  setEnabled(event.target.checked);
  console.log(enabled, 'enable')
};









    return (  
    // <div> {isOpen}</div>

    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" onClick={createCountryDialog}	classes={{
        paper: 'm-24'
    }}

    fullWidth
    maxWidth="sm">
<DialogTitle id="form-dialog-title">{type} Country</DialogTitle>
<DialogContent classes={{ root: 'p-24' }}>
            <div className="flex">
                <div className="min-w-48 pt-20">
                    <Icon color="action">account_circle</Icon>
                </div>

                <TextField
                    className="mb-24"
                    label="Name"
                    autoFocus
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
                    label="Country Code"
                 
                   
                    name="code"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    variant="outlined"
                    required
                    fullWidth
                />
            </div>
            <FormControlLabel
        control={<Checkbox checked={enabled} onChange={handleEnable} name="checkedA" />}
        label="Enabled"
      />


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

export default CountryDialog