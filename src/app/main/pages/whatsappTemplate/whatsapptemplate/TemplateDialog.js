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




const CampaignDialog = (props) => {
    const classes = useStyles(props);

    const {isOpen} = props
    const [openDialog, setopenDialog] = React.useState(isOpen);
    const [age,setAge] = React.useState('');

    const handleClose = () => {
        props.closeDialog()
        setopenDialog(false);
    };

    const handleChange = (event) => {
		setAge(event.target.value);
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
					<div className="flex" style={{ marginBottom: 20 }}>
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
						<FormControl className={classes.formControl}>

							<InputLabel id="demo-simple-select-label" style={{ marginLeft: 10 }}>Type</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={age}
								onChange={handleChange}
							>
								<MenuItem value={10}>Text</MenuItem>
								<MenuItem value={20}>Audio</MenuItem>
								<MenuItem value={30}>Video</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Text"
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
							label="Params"
							autoFocus
							id="name"
							name="name"


							variant="outlined"
							required
							fullWidth
						/>
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

export default CampaignDialog