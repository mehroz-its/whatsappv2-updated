import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import { makeStyles,ThemeProvider,createMuiTheme,withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import RuleListInDialog from '../RolesListInDialog'

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
	  
		color:'white',
		paddingLeft:'14px',
		fontWeight:'300',
		paddingRight:'14px',
		paddingTop:'5px',
		paddingBottom:'5px',
		fontSize:'13px',
	   
	  },
}))

const theme = createMuiTheme({
	palette: {
	  primary: green,
	},
	});

  const PermissionDialog = (props) => {
  const { data } = props
  const { isOpen, type } = props
  const [openDialog, setopenDialog] = React.useState(isOpen);
  const [method, setMethod] = React.useState(data.displayRules);
  const [title, setTitle] = React.useState(data.title);
  const [description, setDescription] = React.useState(data.description);
  const [isToggled, setIsToggled] = React.useState(data.enabled);
  const [rules, setRules] = React.useState([])
  const [showRuleSet, setShowRuleSet] = React.useState(false);
  const [currentRules, setCurrenconsumertRules] = React.useState(data.rule_set);
  const [enabled, setEnabled] = React.useState(data.enabled);
  const [consumer, setConsumer] = React.useState(data.consumer);
  const handleClose = () => {
    props.closeDialog()
    setopenDialog(false);
  };
  const classes = useStyles(props);
  const handleMethodChange = (e) => {
    setConsumer(e.target.value)
    if (e.target.value !== 0) {
      if (e.target.value === 1) setMethod(rules.app);
      if (e.target.value === 3) setMethod(rules.frontend);
      if (e.target.value === 2) setMethod(rules.backend);
      if (e.target.value === 4) setMethod([]);

      setShowRuleSet(true);
    }


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

  const loadRuleSets = () => {
    return CoreHttpHandler.request('permissions', 'rule_set', {
    }, null, null, true);
  };

  React.useEffect(() => {
    loadRuleSets().then(response => {
      const set = response.data.data.rule_set;
      setRules(set)
    });
  }, []);
  const result = Object.values(state)
  const handleSubmit = () => {
    let params = {
      id: "0",
      description: description,
      title: title,
      rule_set: currentRules,
      enabled: enabled,
      consumer: consumer,
      displayed: true,
    };
    console.log(params, 'params')
    if (type !== 'Update') {
      CoreHttpHandler.request('permissions', 'create', params, (response) => {
        console.log(response)
        props.closeDialog('create')
        setopenDialog(false);
      }, (error) => {
        props.closeDialog("error")
        setopenDialog(false);

      });
    } else {

      
      let params = {
        id: data.id,
        method: data.method,
        description: description,
        title: title,
        rule_set: currentRules,
        enabled: enabled,
        consumer: consumer,
        displayed: true,
        dt: data.dt,
        dtu: data.dtu
      };

      let update_params = {
        key: ':id',
        value: props.data.id,
        params: params
      }
      CoreHttpHandler.request('permissions', 'update', update_params, (response) => {
        props.closeDialog("update")
        setopenDialog(false);
      }, (error) => {
        props.closeDialog("error")
        setopenDialog(false);

      });
    }
  }

  const handleEnable = (event) => {
    setEnabled(event.target.checked);
    console.log(enabled, 'enable')
  };

  const onInputChange = (e) => {
    console.log(e.target.name)
    if (e.target.name === 'rule_set') {
      const ruleIndex = currentRules.indexOf(e.target.value);
      if (ruleIndex === -1) {
        currentRules.push(e.target.value);
        console.log('in if')
        console.log(e.target.value)
      } else {
        currentRules.splice(ruleIndex, 1);
      }
      let rules = [...currentRules];
      setCurrenconsumertRules(rules);
    }
  }
  const disabled = type === "Update"?true:false

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{
      paper: 'm-24'
    }}

      fullWidth
      maxWidth="sm">
        <AppBar position="static" elevation={1}>
				
				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
        style={{paddingBottom:20,paddingTop:20}}>
	      {type} Permissions
				</div>
			</AppBar>
      {/* <DialogTitle id="form-dialog-title">{type} Permissions</DialogTitle> */}
      <DialogContent classes={{ root: 'p-24' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <div className="flex">
              <div className="min-w-48 pt-20" style={{marginTop:'-12px'}}>
                <Icon color="action">account_circle</Icon>
              </div>

              <TextField
                className="mb-24"
                label="Title"
                autoFocus
                id="Title"
                name="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                variant="outlined"
                required
                fullWidth
                disabled={type === "Update"?true:false}
                size="small" 
              />
            </div>

            <div className="flex">
              <div className="min-w-48 pt-20" style={{marginTop:'-12px'}}>
                <Icon color="action">account_circle</Icon>
              </div>

              <TextField
                className="mb-24"
                label="Description"

                id="Description"
                name="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                variant="outlined"
                required
                fullWidth
                disabled={type === "Update"?true:false}
                size="small" 

              />
            </div>
            {type !== 'Update' ?
              <FormControl className={classes.formControl}>

                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue='Select Consumer'
                  onChange={handleMethodChange}
                >
                  <MenuItem value={0}>Select Customer</MenuItem>
                  <MenuItem value={1}>Application</MenuItem>
                  <MenuItem value={3}>FrontEnd</MenuItem>
                  <MenuItem value={2}>Backend</MenuItem>
                  <MenuItem value={4}>Client</MenuItem>
                </Select>
              </FormControl> : null}
            <div className="flex">
              <FormControlLabel
                control={<Checkbox
                  checked={enabled}
                  onChange={handleEnable}
                />}
                label="Enabled"
              />
            </div>
          </div>
          {/* <div style={{ flexDirection: 'column', flex: 1, display: 'flex', alignItems: 'flex-end', marginLeft: 10 }}>
            {
              checkToShow()
            }

          </div> */}
          <div style={{ flexDirection: 'column', flex: 1, display: 'flex', marginLeft: 10 }}>

            {showRuleSet &&

              <RuleListInDialog edit rules={method} onInputChange={onInputChange} checkedRules={currentRules} classes={classes} />

            }
            {type === 'Update' &&

              <RuleListInDialog edit rules={method} onInputChange={onInputChange} checkedRules={currentRules} classes={classes} />

            }
          </div>
        </div>
        {/* <div style={{ flexDirection: 'column', flex: 1, display: 'flex', marginLeft: 10 }}>

        {showRuleSet &&
                    
                        <RuleListInDialog edit roles={method} onInputChange={onInputChange} checkedRoles={currentRules} classes={classes} />
                   
                }
                </div> */}
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="contained" onClick={handleClose}  color="primary">
          Cancel
             </Button>
             <ThemeProvider theme={theme}>
        <Button size="small" className={classes.margin} variant="contained" onClick={handleSubmit} disabled={!title||!description||!consumer} color="primary">
          Done
         </Button>
         </ThemeProvider>
      </DialogActions>
    </Dialog>






  )
}

export default PermissionDialog