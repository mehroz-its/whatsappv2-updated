import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler';
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DraftsIcon from '@material-ui/icons/Drafts';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles(theme => ({
	addButton: {
		position: 'absolute',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330
	},
	margin: {
		color: 'white',
		paddingLeft: '14px',
		fontWeight: 'bold',
		paddingRight: '14px',
		paddingTop: '5px',
		paddingBottom: '5px',
		fontSize: '12px'
	}
}));
const theme = createMuiTheme({
	palette: {
		primary: green
	}
});

const DeleteTreeNode = props => {
	const classes = useStyles(props);
	const {  deleteTreeNode , closeDialog, submitNode} = props;	
	const {node} = deleteTreeNode;


	const [title, setTitle] = React.useState(node.title?node.title:"")

	const handleDialogClose = ()=>{
		closeDialog()
    }

    
	const handleSubmit = () =>{
        submitNode()
	}
    
	return (
		<Dialog
			open={true}
			onClose={handleDialogClose}
			aria-labelledby="form-dialog-title"
			classes={{
				paper: 'm-24'
			}}
			style={{ marginTop: '2%' }}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<div
					className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
					style={{ paddingBottom: 20, paddingTop: 20 }}
				>
					Delete {title}
				</div>
			</AppBar>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex">
					<h3>{`Are you sure you want to delete '${title}'?`}</h3>
				</div>
			</DialogContent>
			
            <DialogActions>
				<div className="px-16 my-10">
					<Button variant="contained" onClick={handleDialogClose} color="primary" size="small">
						Cancel
					</Button>
				</div>
				<ThemeProvider theme={theme}>
					
						<div className="mx-32 md:mx-24 my-10">
							<Button
								className={classes.margin}
								size="small"
								variant="contained"
								onClick={handleSubmit}
								color="primary"
							>
								delete
							</Button>
						</div>
				</ThemeProvider>
			</DialogActions>
		</Dialog>
	);
};
export default DeleteTreeNode;
