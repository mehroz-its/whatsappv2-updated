import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import CoreHttpHandler from "../../../../../../http/services/CoreHttpHandler"
import DeleteIcon from '@material-ui/icons/Delete';



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
	const { data } = props
	const [openDialog, setopenDialog] = React.useState(data?true:false);

    const handleDialogClose = () => {
		props.closeDialog("close")
		setopenDialog(false);
	};

	const handleSubmit = () => {

        CoreHttpHandler.request(
			'Business',
			'deleteClient',
            {
                id: data.id
            }, (response) => {
				props.closeDialog("deleted")
			}, (error) => {
                try{
                    props.closeDialog(error.response.data.message)

                }catch(err){
                    console.log(error)
                    props.closeDialog("Could Not Delete Record")

                }
            }
        );
            
	};


	return (
        data?

       ( <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title" classes={{
			paper: 'm-24'
		}}

			fullWidth
			maxWidth="xs">
			<DialogTitle id="form-dialog-title" style={{ backgroundColor: "#fc2254", width: "100%", color: "white", display: "flex", justifyContent: "center" }}>{props.type} </DialogTitle>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex">
					<div className="min-w-48" style={{ marginTop: '-3px' }}>
						{/* <Icon color="action">block</Icon> */}
						<DeleteIcon color="action" style={{ color: "#8b8b8b" }} />
					</div>
					<h3>{`Are you sure you want to delete ${data.comapny}?`}</h3>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} color="primary" variant="contained">
					Cancel
             </Button>
				<Button onClick={handleSubmit} style={{ backgroundColor: "#4caf50", color: "white" }} variant="contained">
					Confirm
         </Button>
			</DialogActions>
		</Dialog>)
        :<div></div>
		

	)
}

export default BlockDialog