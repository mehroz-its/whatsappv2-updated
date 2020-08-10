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
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import { getUserData } from '../../chat/store/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
import { green, purple } from '@material-ui/core/colors';

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
		fontWeight: 'bold',
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


const CampaignDialog = (props) => {
	const classes = useStyles(props);
	const { isOpen, type, getUpdatedData, data } = props
	const [openDialog, setopenDialog] = React.useState(isOpen);
	const [canned_type, setCannedType] = React.useState(data.message_type);
	const [name, setName] = React.useState(data.message_name);
	const [text, setText] = React.useState(data.message_text);
	const [enabled, setEnabled] = React.useState(data.enabled);
	const [open, setOpen] = React.useState(false);
	const [description, setDescription] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [uploadedFilePath, setUploadedFilePath] = React.useState(data.attachment_url);
	const [attachment_name, setAttachment_name] = React.useState(data.file_name)
	const [attachment_params, setAttachment_params] = React.useState('')
	const handleDialogClose = () => {
		props.closeDialog()
		setopenDialog(false);
	};
	const handleSubmit = () => {
		let fileName
		if (uploadedFilePath != '') {
			fileName = uploadedFilePath.split('https://upload.its.com.pk/')
		} else {
			fileName = ''
		}
		let params = {
			message_name: name,
			message_text: text,
			message_params: attachment_params,
			attachment_url: uploadedFilePath,
			attachment_name: fileName[1],
			message_type: canned_type,
			enabled: enabled
		};
		if (type !== 'Update Canned Message') {
			CoreHttpHandler.request('canned_messages', 'create_message', params, (response) => {
				props.closeDialog('create')
				setopenDialog(false);
			}, (error) => {
				props.closeDialog("error")
				setopenDialog(false);
			});
		} else {
			let update_params = {
				key: 'id',
				value: data.id,
				params: params
			}
			CoreHttpHandler.request('canned_messages', 'update_message', update_params, (response) => {
				props.closeDialog("update")
				setopenDialog(false);
			}, (error) => {
				props.closeDialog("error")
				setopenDialog(false);
			});
		}
	};
	const handleEnable = (event) => {
		setEnabled(event.target.checked);
		console.log(enabled, 'enable')
	};

	const onInputChange = e => {
		switch (e.target.name) {
			case "name":
				setName(e.target.value)
				break;
			case "description":
				setDescription(e.target.value)
				break;
			case "canned_type":
				setCannedType(e.target.value)
				break;
			case "text":
				setText(e.target.value)
				break;
		}
	}
	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const onChangeHandler = event => {
		setIsLoading(true);
		if (event.target.files.length > 0) {
			const _data = new FormData();
			let _name = event.target.files[0].name;
			_name = _name.replace(/\s/g, "");
			_data.append(
				"file",
				event.target.files[0],
				`${new Date().getTime()}_${_name}`
			);
			CoreHttpHandler.request(
				"content",
				"upload",
				{
					params: _data
				},
				response => {
					setIsLoading(false);
					setUploadedFilePath(response.data.data.link)
					// let name = response.data.data.link
					// setAttachment_name(name.split('/'))
					// console.log(attachment_name,'name')

					onInputChange({
						target: {
							name: 'msisdnUrl',
							value: response.data.data.link
						}
					})
				},
				error => {
				}
			);
		}
	};


	return (
		<Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title" classes={{
			paper: 'm-24'
		}}
			fullWidth
			maxWidth="xs">
			<AppBar position="static" elevation={1}>
				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
					style={{ paddingBottom: 20, paddingTop: 20 }}>
					{props.type}
				</div>
			</AppBar>
			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<Icon color="action">account_circle</Icon>
					</div>
					<TextField
						className="mb-24"
						label="Name"
						autoFocus
						id="name"
						name="name"
						value={name}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
					/>
				</div>
				<div className="flex" style={{ marginBottom: 20 }}>
					<div className="min-w-48 pt-20" >
						<Icon color="action">account_circle</Icon>
					</div>
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label" style={{ marginLeft: 10 }}>Type</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={open}
							onClose={handleClose}
							onOpen={handleOpen}
							value={canned_type}
							onChange={onInputChange}
							name='canned_type'
						>
							<MenuItem value={'audio'}>Audio</MenuItem>
							<MenuItem value={'video'}>Video</MenuItem>
							<MenuItem value={'text'}>Text</MenuItem>
							<MenuItem value={'image'}>Image</MenuItem>
							<MenuItem value={'document'}>Document</MenuItem>
						</Select>
					</FormControl>
				</div>
				{canned_type === 'text' ? (<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<Icon color="action">account_circle</Icon>
					</div>
					<TextField
						className="mb-24"
						label="Text"
						autoFocus
						id="text"
						name="text"
						variant="outlined"
						required
						fullWidth
						value={text}
						onChange={onInputChange}
						size="small"
					/>
				</div>) : canned_type !== 'text' ? (
					<div container >
						<div className="flex" >
							<div className="min-w-48 pt-20" style={{ marginTop: '10px' }}>
								<Icon color="action">attach_file</Icon>
							</div>
							{isLoading === true ? <CircularProgress color="secondary" style={{ marginLeft: '40%' }} />
								: <TextField size="small" className="mt-20 mb-20" id="outlined-basic-email" name={"url"} label="Url" variant="outlined" fullWidth disabled={true} onChange={onInputChange} value={uploadedFilePath} />
							}
						</div>
						<div item xs={12} >
							<input accept={canned_type !== 'document' ? `${canned_type}/*` : "application/pdf, application/vnd.ms-excel"} style={{ paddingTop: '10px' }} id="contained-button-file" type="file" name="url" filename={uploadedFilePath} style={{ display: "none" }} onChange={onChangeHandler} />
							<label htmlFor="contained-button-file">
								<Button size="small" variant="contained" id="content-upload-button" variant="contained" color="primary" component="span"                            >
									Upload
 							</Button>
							</label>
						</div>
					</div>
				) : null}
				<FormControlLabel
					control={<Checkbox

						checked={enabled}
						onChange={handleEnable}
					/>}
					label="Enabled"
				/>

			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleDialogClose} color="primary" size="small">
					Cancel
             </Button>
				<ThemeProvider theme={theme}>
					{canned_type === 'text' ?
						<Button className={classes.margin} size="small" variant="contained" onClick={handleSubmit} disabled={!name || !text || !canned_type} color="primary">
							Done
       				  </Button>
						:
						<Button className={classes.margin} size="small" variant="contained" onClick={handleSubmit} disabled={!name || !uploadedFilePath || !canned_type} color="primary">
							Done
					</Button>
					}
				</ThemeProvider>
			</DialogActions>
		</Dialog>
	)
}

export default CampaignDialog