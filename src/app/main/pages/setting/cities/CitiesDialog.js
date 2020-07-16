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



const CitiesDialog = (props) => {
    console.log(props,'in dialog')
    const {isOpen,type,data} = props
   
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const[country,setCountry]=React.useState([])
    const [name,setName]=React.useState(props.data.name)
    const [email,setEmail]=React.useState(props.data.code)
    const [city,setCities]=React.useState(props.data.cities)
    const [enabled, setEnabled] = React.useState(data.enabled);
    const[method,setMethod]=React.useState(data.country)
    const [snackbaropen, setSnackBarOpen] = React.useState(props.snackopen)
    const [snackbarmessage, setSnackBarMessage] = React.useState(props.snackmsg)
    const [ok, setOK] = React.useState(props.snackok)
    
    const handleClose = () => {
        props.closeDialog("cancel")
        setopenDialog(false);
    };
    const classes = useStyles(props);

     const handleMethodChange = (event) => {
      setMethod(event.target.value);
      };

  

    const handleSubmit = () => {
         console.log(city,'city');
         
      let params = {
        id:'',
        code: email,
        name: name,
        enabled: enabled,
        country: method
      };
      console.log(params,'params')
      if (type !== 'Update') {
        CoreHttpHandler.request('locations', 'create_city', params, (response) => {
          console.log('create');
          
          // props.getUpdatedData()
          console.log(response)
        
         props.closeDialog('create')
        //  props.snackbar("create")
          setopenDialog(false)
          
        }, (error) => {
          props.closeDialog('error')
          // props.snackbar("error")
          setopenDialog(false);
            
        });
      } else {
      
        
        let update_params = {
          key: 'id',
          value:props.data.id,
          params:{
            id:data.id,
            name:name,
            code:email,
            enabled:enabled,
            country:method
          }
        }
        // console.log(update_params,'update_params')
        // return
        CoreHttpHandler.request('locations', 'update_city', update_params, (response) => {
          // props.getUpdatedData()
          // console.log(response)
 
         
          // props.snackbar("update")
     
          props.closeDialog("update")
          setopenDialog(false);
         
        }, (error) => {
          props.closeDialog("error")
          setopenDialog(false);
        
  
        });
      }
    }
   
    const [dialogData, setDialogData] = React.useState({
      country: {
          id: '',
          code: '',
          name: '',
          enabled: true,
          cities: []
      },
      cities: [],
     
      type: null
  });

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

const loadCountries = () => {
  return CoreHttpHandler.request('locations', 'get_countries', {
      columns: "id, name",
      sortby: "ASC",
      orderby: "id",
      where: "enabled = $1",
      values: true,
      page: 0,
      limit: 0
  }, null, null, true);
};


const createCountry = ()=>{
  // console.log('creteacalledd');
  
  loadCountries().then(response => {
    const countries = response.data.data.list.data;
    // console.log(countries,'set counte');
    
    setCountry(countries)
  })
}
const createCountryDialog = () => {
  // console.log('createCitiescalledd')
    loadCities().then(response => {
        const cities = response.data.data.list.data;
      // console.log('calledddddd',cities);
      setCities(cities)
    });
    
   
};

const functioncalls = ()=>{
  {createCountryDialog()}
  {createCountry()}
}



const handleEnable = (event) => {

  setEnabled(event.target.checked);
  // console.log(enabled, 'enable')
};


React.useEffect(() => {
  createCountry()
}, []);


// console.log('snacks',snackbarmessage,snackbaropen,ok);

    return (  
  

    <Dialog open={openDialog} 
    onClose={handleClose} 
    aria-labelledby="form-dialog-title" 
    onClick={functioncalls}	
    classes={{
        paper: 'm-24'
    }}

    fullWidth
    maxWidth="sm">
<DialogTitle id="form-dialog-title">{type} City</DialogTitle>
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
                    onClick={createCountry}
                />
            </div>

            <div className="flex">
                <div className="min-w-48 pt-20">
                    <Icon color="action">account_circle</Icon>
                </div>

                <TextField
                    className="mb-24"
                    label="City Code"
                    name="code"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    variant="outlined"
                    required
                    inputProps={{maxLength:4}}
                    fullWidth
                    onClick={createCountry}
                />
            </div>
      <div style={{flexDirection:'column',flex:1,display:'flex',marginLeft:10}}>

        {props.type=='Add' ?
       <FormControl className={classes.formControl}>
					
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={method}
            onChange={handleMethodChange}
            onClick={createCountry}
          >
          <MenuItem value={0}>Select Country</MenuItem>
            {
              country.map(data=>
                <MenuItem value={data.id}>{data.name}</MenuItem>
                )
            }
          </Select>
        </FormControl>
        :null
}
        <FormControlLabel
        control={<Checkbox checked={enabled} onChange={handleEnable} name="checkedA" />}
        label="Enabled"
      />
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

export default CitiesDialog