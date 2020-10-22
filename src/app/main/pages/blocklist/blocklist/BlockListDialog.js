import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DialogTitle from '@material-ui/core/DialogTitle';

import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
const BlockDialog = (props) => {
	const { isOpen, data } = props
	const [openDialog, setopenDialog] = React.useState(isOpen);
	const handleDialogClose = () => {
		props.closeDialog()
		setopenDialog(false);
	};
	const handleSubmit = () => {
		CoreHttpHandler.request('conversations', 'unblock', {
			key: ':number',
			value: data.number,
		}, (response) => {
			props.closeDialog()
			setopenDialog(false);
		}, (error) => {
			props.closeDialog()
			setopenDialog(false);
		});
	};
	return (
		<Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{
			paper: 'm-24'
		}}
			fullWidth
			maxWidth="xs">
			<DialogTitle id="form-dialog-title">{props.type} </DialogTitle>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex">
					<div className="min-w-48 pt-10" style={{marginTop:"-13px"}}>
						<Icon color="action">block</Icon>
					</div>
					<h6 style={{fontSize:"11px"}}>{`Are you sure you want to unblock this number [${data.number}] ?`}</h6>
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