import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
import CoreHttpHandler from '../../../../../http/services/CoreHttpHandler'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
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
	const { isOpen, type, getUpdatedData, data } = props
	const [openDialog, setopenDialog] = React.useState(isOpen);
	const [canned_type, setCannedType] = React.useState(data.type);
	const [name, setName] = React.useState(data.name);
	const [text, setText] = React.useState(data.text);
	const [enabled, setEnabled] = React.useState(data.enable);
	const [open, setOpen] = React.useState(false);
	const [description, setDescription] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [uploadedFilePath, setUploadedFilePath] = React.useState(data.url);
	const [attachment_name, setAttachment_name] = React.useState(data.file_name)
	const [attachment_params, setAttachment_params] = React.useState('')
	const handleDialogClose = () => {
		props.closeDialog()
		setopenDialog(false);
	};
	const handleSubmit = () => {
		let fileName = uploadedFilePath.split('https://upload.its.com.pk/')
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
		<Dialog open={openDialog} aria-labelledby="form-dialog-title" classes={{
			paper: 'm-24'
		}}

			fullWidth
			maxWidth="xs">
			<AppBar position="static" elevation={1}>
				<div className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
					style={{ paddingBottom: 30, paddingTop: 30 }}>
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
					<div className="min-w-48 pt-20" style={{ marginTop: '5px' }}>
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
							<div className="min-w-48 mt-24" style={{ marginTop: '25px' }}>
								<Icon color="action">attach_file</Icon>
							</div>
							{isLoading === true ? <CircularProgress color="secondary" style={{ marginLeft: '40%' }} />
								: <TextField size="small" className="mt-20 mb-20" id="outlined-basic-email" name={"url"} label="Url" variant="outlined" fullWidth disabled={true} onChange={onInputChange} value={uploadedFilePath} />
							}
						</div>
						<div item xs={12} >
							<input accept={canned_type !== 'document' ? `${canned_type}/*` : "application/pdf, application/vnd.ms-excel"} style={{ paddingTop: '10px' }} id="contained-button-file" type="file" name="url" filename={uploadedFilePath} style={{ display: "none" }} onChange={onChangeHandler} />
							<label htmlFor="contained-button-file">
								<Button id="content-upload-button" variant="contained" color="primary" component="span"                            >
									Upload
 							</Button>
							</label>
						</div>
					</div>
				) : null}
				<FormControlLabel
					control={
						<Checkbox
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
				<Button size="small" variant="contained" onClick={handleSubmit} disabled={!name || !text || !canned_type} color="primary">
					Done
         </Button>
			</DialogActions>
		</Dialog>

	)
}
export default CampaignDialog