import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';



const CampaignDialog = (props) => {
    console.log(props,'in dialog')
    const {isOpen} = props
    const [openDialog, setopenDialog] = React.useState(isOpen);

    const handleClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };
    
    return (  
    // <div> {isOpen}</div>
    <Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{
        paper: 'm-24'
    }}

        fullWidth
        maxWidth="xs">
        <DialogTitle id="form-dialog-title">{props.type}</DialogTitle>
        <DialogContent classes={{ root: 'p-24' }}>
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
            <div className="flex">
                <div className="min-w-48 pt-20">
                    <Icon color="action">cake</Icon>
                </div>
                <TextField
                    className="mb-24"
                    id="birthday"
                    label="Begin Date"
                    type="date"

                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="outlined"
                    fullWidth
                />
            </div>
            <Button color="black" style={{ backgroundColor: 'black', color: 'white' }} >Upload </Button>

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

export default CampaignDialog