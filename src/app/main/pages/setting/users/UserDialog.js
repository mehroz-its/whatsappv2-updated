import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { green } from '@material-ui/core/colors';
import { makeStyles, withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import UserRolesListInDialog from './UserRolesListInDialog'
import Grid from '@material-ui/core/Grid';

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

const UserDialog = (props) => {
    const classes = useStyles();
    const { data } = props
    const { isOpen, type } = props
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [userName, setUserName] = React.useState(data.username);
    const [email, setEmail] = React.useState(data.email);
    const [number, setNumber] = React.useState(data.number);
    const [password, setPassword] = React.useState('');
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [selectedState, setSelectedState] = React.useState('');
    const [age, setAge] = React.useState('');
    const [countriesData, setCountriesData] = React.useState([]);
    const [citiesData, setCitiesData] = React.useState([]);
    const [statesData, setStatesData] = React.useState([]);
    const [roles, setRoles] = React.useState([])
    const [currentRoles, setCurrentRoles] = React.useState(data.roles);
    const [enabled, setEnabled] = React.useState(data.enabled);
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
    const result = Object.values(state)
    const loadRoles = () => {
        return CoreHttpHandler.request('roles', 'listing', {
            columns: "id, name",
            sortby: "ASC",
            orderby: "id",
            where: "displayed = $1",
            values: true,
            page: 0,
            limit: 0
        }, null, null, true);
    };
    const handleEnable = (event) => {
        setEnabled(event.target.checked);
    };
    React.useEffect(() => {
        fetch(`https://glist.its.com.pk/v1/fetch/countries`)
            .then(response => response.json())
            .then(data => setCountriesData(data.data.countries));

        loadRoles().then(response => {
            const roles = response.data.data.list.data;
            setRoles(roles)
        });
    }, [])
    const handleSubmit = () => {
        if (type !== 'Update') {
            let params = {
                id: 0,
                username: userName,
                email: email,
                number: number,
                password: password,
                enabled: enabled,
                displayed: true,
                roles: currentRoles
            };
            CoreHttpHandler.request('users', 'create_user', params, (response) => {
                props.closeDialog('create')
                setopenDialog(false);
            }, (error) => {
                props.closeDialog("error")
                setopenDialog(false);
            });
        } else {
            let params = {
                id: data.id,
                username: userName,
                email: email,
                number: number,
                password: password,
                enabled: enabled,
                displayed: true,
                roles: currentRoles
            };
            let update_params = {
                key: 'id',
                value: props.data.id,
                params: params
            }
            CoreHttpHandler.request('users', 'update_user', update_params, (response) => {
                props.closeDialog("update")
                setopenDialog(false);
            }, (error) => {
                props.closeDialog("error")
                setopenDialog(false);
            });
        }
    }
    const handleToggleChange = () => {
        setIsToggled(!isToggled)
    };

    const onInputChange = (e) => {
        if (e.target.name === 'roles') {
            const roleIndex = currentRoles.indexOf(e.target.value);
            if (roleIndex === -1) {
                currentRoles.push(e.target.value);
            } else {
                currentRoles.splice(roleIndex, 1);
            }
            const roles = [...currentRoles];
            setCurrentRoles(roles);
        }
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleStatesChange = (event) => {
        setSelectedState(event.target.value);
        console.log(event.target.value, 'country')
        let state = event.target.value
        fetch(`https://glist.its.com.pk/v1/fetch/cities/${state.id}`)
            .then(response => response.json())
            .then(data => setCitiesData(data.data.cities));

    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        console.log(event.target.value, 'country')
        let country = event.target.value

        fetch(`https://glist.its.com.pk/v1/fetch/states/${country.id}`)
            .then(response => response.json())
            .then(data => setStatesData(data.data.states));

    };


    return (
        <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{
            paper: 'm-24'
        }}

            fullWidth
            maxWidth="sm">
            <AppBar position="static" elevation={1}>
                <div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
                    style={{ paddingBottom: 20, paddingTop: 20 }}>
                    {type} Users
				</div>
            </AppBar>
            <DialogContent classes={{ root: 'p-24' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                <Icon color="action">account_circle</Icon>
                            </div>
                            <TextField
                                className="mb-24"
                                label="UserName"
                                autoFocus
                                id="UserName"
                                name="UserName"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                size="small"
                            />
                        </div>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                <Icon color="action">account_circle</Icon>
                            </div>
                            <TextField
                                className="mb-24"
                                label="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                id="Email"
                                name="Email"
                                variant="outlined"
                                required
                                fullWidth
                                size="small"
                            />
                        </div>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                <Icon color="action">account_circle</Icon>
                            </div>
                            <TextField
                                className="mb-24"
                                label="Number"
                                id="Number"
                                name="Number"
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                type="number"
                                size="small"
                            />
                        </div>
                        <div className="flex">
                            <div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
                                <Icon color="action">account_circle</Icon>
                            </div>
                            <TextField
                                className="mb-24"
                                label="Password"
                                id="name"
                                name="name"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                size="small"
                            />
                        </div>
                        <Grid item md={10} sm={12} xs={12} >
                            <FormControl variant="filled" size='small' fullWidth style={{ marginTop: '0px' }}>
                                <InputLabel id="outlined-age-native-simple	">Country</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={country}
                                    onChange={handleCountryChange}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>Select Country</em>
                                    </MenuItem>
                                    {
                                        countriesData.map(val => {
                                            return (
                                                <MenuItem value={val}>{val.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={10} sm={12} xs={12} >
                            <FormControl variant="filled" fullWidth style={{ marginTop: '0px' }}>
                                <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={selectedState}
                                    onChange={handleStatesChange}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>Select State</em>
                                    </MenuItem>
                                    {
                                        statesData.map(val => {
                                            return (
                                                <MenuItem value={val}>{val.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={10} sm={12} xs={12} >
                            <FormControl variant="filled" size='small' fullWidth style={{ marginTop: '0px' }}>
                                <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={city}
                                    onChange={handleCityChange}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>Select City</em>
                                    </MenuItem>
                                    {
                                        citiesData.map(val => {
                                            return (
                                                <MenuItem value={val}>{val.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox
                                checked={enabled}
                                onChange={handleEnable}
                            />}
                            label="Enabled"
                        />
                    </div>
                    <div style={{ marginLeft: 10, flexDirection: 'column', flex: 1, display: 'flex' }}>
                        <UserRolesListInDialog edit roles={roles} onInputChange={onInputChange} checkedRoles={currentRoles} classes={classes} />
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" size="small" variant="contained">
                    Cancel
                </Button>
                <ThemeProvider theme={theme}>
                    <Button size="small" className={classes.margin} variant="contained" onClick={handleSubmit} disabled={!userName || !email || !number || !roles || !currentRoles} color="primary">
                        Done
                </Button>
                </ThemeProvider>
            </DialogActions>
        </Dialog>






    )
}

export default UserDialog