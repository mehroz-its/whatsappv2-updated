import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CoreHttpHandler from '../../../../http/services/CoreHttpHandler'
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import { makeStyles, ThemeProvider, createMuiTheme, } from '@material-ui/core/styles';
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
		paddingRight: '14px',
		paddingTop: '5px',
		paddingBottom: '5px',
		fontSize: '12px',
	},
}));
const theme = createMuiTheme({
	palette: {
		primary: green,
	},
});
const BlockDialog = (props) => {
	const classes = useStyles(props);
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
			clientId:props.data.client_id
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
			onClose={() => { props.closeDialog() }}
			fullWidth
			maxWidth="xs">
			<AppBar position="static" elevation={1}>
				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
					style={{ paddingBottom: 20, paddingTop: 20 }}>
					{props.type}
				</div>
			</AppBar>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex" style={{fontSize:"11px"}}>
					<div className="min-w-48 pt-10" style={{marginTop:"-13px"}}>
						<Icon color="action">block</Icon>
					</div>
					<h6 style={{fontSize:"11px"}}>{`Are you sure you want to unblock this number [${data.number}] ?`}</h6>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} color="primary" size="small" variant="contained" >
					Cancel
             </Button>
				<ThemeProvider theme={theme}>
					<Button variant="contained" onClick={handleSubmit} color="primary" size="small" className={classes.margin}>
						Done
         </Button>
				</ThemeProvider>
			</DialogActions>
		</Dialog>
	)
}
export default BlockDialog