import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CoreHttpHandler from '../../../../../../../http/services/CoreHttpHandler';
import AppBar from '@material-ui/core/AppBar';
import { green } from '@material-ui/core/colors';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DraftsIcon from '@material-ui/icons/Drafts';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WorkIcon from '@material-ui/icons/Work';
import DialogueText from './DialogueTypes/DialogueText';
import DialogueImage from './DialogueTypes/DialogueImage';
import DialogueAudio from './DialogueTypes/DialogueAudio';
import DialogueVideo from './DialogueTypes/DialogueVideo';
import DialogueDocument from './DialogueTypes/DialogueDocument';
import DialogueAction from './DialogueTypes/DialogueAction';
import DialogueIC from './DialogueTypes/DialogueIC';
import DialogueTestAPI from './DialogueTypes/DialogueTestAPI';

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

const AddTreeNode = props => {
	const classes = useStyles(props);
	const { addTreeNode, closeDialog, submitNode } = props;
	const {node,path} = addTreeNode;

	const [type, setType] = React.useState("text")
	const [title, setTitle] = React.useState("")
	const [attributes, setAttributes] = React.useState([])
	const [errors, setError] = React.useState({})


	//text
	const textRef = React.useRef();
	const imageRef = React.useRef();
	const audioRef = React.useRef();
	const videoRef = React.useRef();
	const documentRef = React.useRef();
	const actionRef = React.useRef();
	const iCRef = React.useRef();
	const testApiRef = React.useRef();

	
	const handleSubmit = () => {


		let data = {
			type,
			title,
			attributes,
			repeatPreviousMessage:true
		}
		let _errors = {}

		if(type==="text"){

			const [textErrors,messageData] = textRef.current.getResult();

			
			if(textErrors){
				_errors.messages=true
			}

			data = {...data,...messageData}
		}
		if (type === "image") {

			const [imageErrors, images] = imageRef.current.getResult();

			if (imageErrors) {
				_errors.imageErrors = true
			}

			data = { ...data, ...images }
		}
		if (type === "audio") {

			const [audioErrors, audios] = audioRef.current.getResult();

			if (audioErrors) {
				_errors.audioErrors = true
			}

			data = { ...data, ...audios }
		}

		if (type === "video") {

			const [videoErrors, videos] = videoRef.current.getResult();

			if (videoErrors) {
				_errors.videoErrors = true
			}

			data = { ...data, ...videos }
		}

		if (type === "document") {

			const [documentErrors, documents] = documentRef.current.getResult();

			if (documentErrors) {
				_errors.documentErrors = true
			}

			data = { ...data, ...documents }
		}

		if (type === "action") {

			const [actionErrors, actions] = actionRef.current.getResult();

			if (actionErrors) {
				_errors.actionErrors = true
			}

			data = { ...data, ...actions }
		}

		if (type === "ic") {

			const [icErrors, questions] = iCRef.current.getResult();

			if (icErrors) {
				_errors.icErrors = true
			}

			data = { ...data, ...questions }
		}

		if (type === "testApi") {

			const [testApiErrors, questions] = testApiRef.current.getResult();

			if (testApiErrors) {
				_errors.testApiErrors = true
			}

			data = { ...data, ...questions }
		}


		
		if (!data.title) {
			_errors.title = "Title is required"
		}


		if (!data.type) {
			_errors.type = "Type is required"
		}

		if (!Object.keys(_errors).length) {
			submitNode(data)
		} else {
			setError(_errors)
		}
	}
	const handleDialogClose = () => {
		closeDialog()
	}
	const onInputChange = (e, i) => {
		switch (e.target.name) {
			case "type":
				setType(e.target.value)
				break;
			case "title":
				setTitle(e.target.value)
				break;
		}
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
					Add Node
				</div>
			</AppBar>
			<DialogContent classes={{ root: 'p-24' }}>


				<div className="flex">


					<TextField
						className="mb-24"
						label="Title"
						id="title"
						name="title"
						value={title}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"

						error={errors.title}
						helperText={errors.title ? errors.title : ""}
					/>
				</div>

				
				<div className="flex mb-20">


					<FormControl
						variant="outlined"
						size="small"
						fullWidth
					>
						<InputLabel id="demo-simple-select-outlined-label_type">Type</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label_type"
							id="demo-simple-select-outlined_type"
							value={type}
							onChange={onInputChange}
							fullWidth
							name={"type"}
						>
							<MenuItem value={"text"}>Text</MenuItem>
							<MenuItem value={"image"}>Image</MenuItem>
							<MenuItem value={"audio"}>Audio</MenuItem>
							<MenuItem value={"video"}>Video</MenuItem>
							<MenuItem value={"document"}>Document</MenuItem>
							<MenuItem value={"action"}>Action</MenuItem>
							<MenuItem value={"ic"}>Information Collection</MenuItem>
							<MenuItem value={"testApi"}>Test Api</MenuItem>

						</Select>
					</FormControl>




				</div>

				{
					type === "text" ?
						<DialogueText
							ref={textRef}
						/>

						: null
				}


				{
					type === "image" ?

						<DialogueImage
							ref={imageRef}
						/>

						: null
				}
				{
					type === "audio" ?

						<DialogueAudio
							ref={audioRef}
						/>

						: null
				}

				{
					type === "video" ?

						<DialogueVideo
							ref={videoRef}
						/>

						: null
				}

				{
					type === "document" ?

						<DialogueDocument
							ref={documentRef}
						/>

						: null
				}


				{
					type === "action" ?

						<DialogueAction
							ref={actionRef}
							pathLength={path.length+1}
							node={node}
						/>

						: null
				}

				{
					type === "ic" ?

						<DialogueIC
							ref={iCRef}
							questions={[]}
							children={[]}
							selectedChild={""}
						/>

						: null
				}
				
				
				{
					type === "testApi" ?

						<DialogueTestAPI
							ref={testApiRef}
							questions={[]}
							response={""}
						/>

						: null
				}


				{/* <div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<VisibilityOffIcon color="action" style={{ color: '#8b8b8b' }} />
					</div>

					<TextField
						className="mb-24"
						label="Password"
						id="name"
						name="password"
						value={password}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
					/>
				</div>

				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<DraftsIcon color="action" style={{ color: '#8b8b8b' }} />
					</div>
					<TextField
						className="mb-24"
						label="Email"
						id="name"
						name="email"
						value={email}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<PhoneAndroidIcon color="action" style={{ color: '#8b8b8b' }} />
					</div>

					<TextField
						className="mb-24"
						label="Mobile"
						id="mobile"
						name="mobile"
						value={mobile}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<WorkIcon color="action" style={{ color: '#8b8b8b' }} />
					</div>

					<TextField
						className="mb-24"
						label="Position"
						id="position"
						name="position"
						value={position}
						variant="outlined"
						required
						fullWidth
						onChange={onInputChange}
						size="small"
					/>
				</div>
				<div className="flex">
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<Icon color="action" style={{ color: '#8b8b8b' }}>
							accessibility
						</Icon>
					</div>
					<Select
						required
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={maxTokenCount}
						onChange={handleTypeChange}
						fullWidth
					>
						<MenuItem value="">
							<em>Select Type</em>
						</MenuItem>
						<MenuItem value={-1}>Admin</MenuItem>
						<MenuItem value={1}>Agent</MenuItem>
					</Select>
				</div>
				<div className="flex" style={{ marginTop: 20 }}>
					<div className="min-w-48 pt-20" style={{ marginTop: '-12px' }}>
						<h3 style={{ color: 'red', fontWeight: 'bold', marginTop: '-8px' }}>Enable</h3>
					</div>
					<FormControlLabel
						style={{ marginLeft: '2px' }}
						control={
							<Switch
								checked={status}
								onChange={toggleChecked}
								name="status"
								color="primary"
								size="small"
							/>
						}
					/>
				</div> */}
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
							create
							</Button>
					</div>
				</ThemeProvider>
			</DialogActions>
		</Dialog>
	);
};
export default AddTreeNode;
