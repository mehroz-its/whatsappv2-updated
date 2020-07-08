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
}))


const PermissionDialog = (props) => {
  console.log(props.data.displayRules, 'in display dialog')
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
  console.log(data.method)


  const handleClose = () => {
    props.closeDialog()
    setopenDialog(false);
  };
  console.log(method, 'mthod valeeasds');

  const classes = useStyles(props);

  const handleMethodChange = (e) => {
    // setMethod(event.target.value);
    setConsumer(e.target.value)
    if (e.target.value !== 0) {
      if (e.target.value === 1) setMethod(rules.app);
      if (e.target.value === 3) setMethod(rules.frontend);
      if (e.target.value === 2) setMethod(rules.backend);
      if (e.target.value === 4) setMethod([]);

      setShowRuleSet(true);
    }


  };
  console.log(rules)
  // if (data.method !== null) {
  //   if (data.method === "APP") setMethod(rules.app);
  //   if (data.method === "FRONT") setMethod(rules.frontend);
  //   if (data.method === "BACK") setMethod(rules.backend);
  //   if (data.method === "CLIENT") setMethod([]);

  //   setShowRuleSet(true);
  // }

  // if (type === "Update") {
  //   if (method.length > 0) {
  //     setShowRuleSet(true);

  //   }
  // }
  console.log(method, 'i am method')
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
      console.log(set)

    });
  }, []);



  const result = Object.values(state)

  // const checkToShow = () => {
  //   if (method === "APP") {
  //     console.log('first');

  //     return (
  //       <>
  //         <FormControlLabel

  //           control={<GreenCheckbox checked={state.checkedApplication} onChange={handleChange} name="checkedApplication" />}
  //           label="Receive Calls"
  //         />
  //       </>
  //     )
  //   }
  //   else if (method === "FRONT") {
  //     console.log('second');

  //     return (
  //       <FormControlLabel

  //         control={<GreenCheckbox checked={state.checkedAudio} onChange={handleChange} name="checkedAudio" />}
  //         label="Send Audio"
  //       />
  //     )
  //   }
  //   else if (method === "BACK") {
  //     console.log('third');

  //     return (
  //       <FormControlLabel

  //         control={<GreenCheckbox checked={state.checkedCity} onChange={handleChange} name="checkedCity" />}
  //         label="Edit City"
  //       />
  //     )
  //   }

  // }
  const handleSubmit = () => {


    // let fileName = uploadedFilePath.split('https://upload.its.com.pk/')
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
        // props.getUpdatedData()
        console.log(response)
        props.closeDialog()
        setopenDialog(false);
      }, (error) => {
        props.closeDialog()
        setopenDialog(false);

      });
    } else {

      console.log(props.data, 'datasss');
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
        key: 'id',
        value: props.data.id,
        params: params
      }
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

      // onDialogPropsChange({
      //     event: 'input',
      //     edit,
      //     value: rules,
      //     key: e.target.name,
      //     dataKey: 'permission',
      // });

    }
  }
  const disabled = type === "Update"?true:false

  return (
    // <div> {isOpen}</div>
    <Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{
      paper: 'm-24'
    }}

      fullWidth
      maxWidth="sm">
      <DialogTitle id="form-dialog-title">{type} Permissions</DialogTitle>
      <DialogContent classes={{ root: 'p-24' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                onChange={e => setTitle(e.target.value)}
                variant="outlined"
                required
                fullWidth
                disabled={type === "Update"?true:false}
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
                onChange={e => setDescription(e.target.value)}
                variant="outlined"
                required
                fullWidth
                disabled={type === "Update"?true:false}

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