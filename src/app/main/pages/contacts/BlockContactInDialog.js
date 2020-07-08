import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
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
}));




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
        console.log(data,'i am in dialog')
        CoreHttpHandler.request('conversations', 'block', {
            key: ':number', value: data.id, params: {
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
            <DialogTitle id="form-dialog-title">{props.type} </DialogTitle>
            <DialogContent classes={{ root: 'p-24' }}>
                <div className="flex mt-10">
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
                <Button onClick={handleDialogClose} color="primary">
                    Cancel
             </Button>
                <Button onClick={handleSubmit} color="primary">
                    Done
         </Button>
            </DialogActions>
        </Dialog>

    )
}

export default BlockDialog