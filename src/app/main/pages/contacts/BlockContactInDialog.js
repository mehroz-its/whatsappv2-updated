import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { green } from '@material-ui/core/colors';
import { makeStyles,ThemeProvider,createMuiTheme,withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
// import { getUserData } from '../../chat/store/actions';




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
}));



const theme = createMuiTheme({
	palette: {
	  primary: green,
	},
	});

const BlockDialog = (props) => {
    const classes = useStyles(props);

    const { isOpen, type, getUpdatedData, data } = props
    console.log(props)
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = React.useState('');








    const handleDialogClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };

    const handleSubmit = () => {
        CoreHttpHandler.request('conversations', 'block', {
            key: ':number', value: data.number, params: {
                reason: description,
            }
        },
            (response) => {
                console.log(response)
                props.closeDialog()


            },
            (error) => {
                console.log(error)
                props.closeDialog()

            }
        );

    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        // <div> {isOpen}</div>
        <Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{
            paper: 'm-24'
        }}

            fullWidth
            maxWidth="xs">
            {/* <DialogTitle id="form-dialog-title">{props.type} </DialogTitle> */}
            <AppBar position="static" elevation={1}>
				
				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
        style={{paddingBottom:20,paddingTop:20}}>
	      {props.type}
				</div>
			</AppBar>
            <DialogContent classes={{ root: 'p-24' }}>
                <div className="flex mt-10" style={{fontSize:'12px'}}>
                    <div className="min-w-48 mb-20">
                        <Icon color="action">block</Icon>
                    </div>
                    {`Are you sure you want to block this number [${data.number}] ?`}
                </div>
                <div className="flex">
                    <div className="min-w-48 mt-20 pt-10">
                        <Icon color="action">description</Icon>
                    </div>
                    <TextField
                        className="mb-24 min-w-48 mt-20"
                        label="Description"
                        autoFocus
                        id="description"
                        name="description"
                        value={description}
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>


            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary" variant="contained" size="small">
                    Cancel
             </Button>
          
          <ThemeProvider theme={theme}>
                <Button  
                size="small" 
                onClick={handleSubmit} 
                color="primary" 
                variant="contained"
                className={classes.margin}
                >
                    Done
         </Button>
         </ThemeProvider>
            </DialogActions>
        </Dialog>

    )
}

export default BlockDialog