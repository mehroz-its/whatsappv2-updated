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

const EditTreeNode = props => {
	const classes = useStyles(props);
	const { editTreeNode, closeDialog, submitNode } = props;
	const { node, path } = editTreeNode;
	const { children } = node;

	const [type, setType] = React.useState(node.type ? node.type : "text")
	const [title, setTitle] = React.useState(node.title ? node.title : "")
	const [repeatPreviousMessage, setRepeatPreviousMessage] = React.useState(node.repeatPreviousMessage!=undefined ? node.repeatPreviousMessage : true)
	const [invalidResponse, setInvalidResponse] = React.useState(node.invalidResponse ? node.invalidResponse : "")

	const [next, setNext] = React.useState(node.__next ? node.__next : "")

	const textRef = React.useRef();
	const imageRef = React.useRef();
	const audioRef = React.useRef();
	const videoRef = React.useRef();
	const documentRef = React.useRef();
	const actionRef = React.useRef();
	const iCRef = React.useRef();
	const testApiRef = React.useRef();

	const handleResponseChange = (e) => {
		setRepeatPreviousMessage(e.target.checked)
	}
	const [errors, setError] = React.useState({})
	const handleSubmit = () => {

		let _errors = {}

		let data = {
			type,
			title
		}

		if(children && children.length && type!="action"&& type!="ic"&& type!="testApi"){
			data = {
				...data,
				repeatPreviousMessage
			}
			if(!repeatPreviousMessage&&invalidResponse){
				data = {
					...data,
					invalidResponse
				}
			}else if(!repeatPreviousMessage){
				_errors.invalidResponse = "Response Message is required"
			}
			
			if(next){
				data.__next = next;
			}else{
				data.__next = undefined;
			}
		}else{
			data.__ref = undefined;
			data.__next = undefined
		}

		if (type === "text") {

			const [textErrors, messageData] = textRef.current.getResult();

			if (textErrors) {
				_errors.messages = true
			}

			data = { ...data, ...messageData }
		}else{
			data = { ...data, messages:undefined }
		}
		
		if (type === "image") {

			const [imageErrors, images] = imageRef.current.getResult();

			if (imageErrors) {
				_errors.imageErrors = true
			}

			data = { ...data, ...images }
		}else{
			data = { ...data, images:undefined }
		}

		if (type === "audio") {

			const [audioErrors, audios] = audioRef.current.getResult();

			if (audioErrors) {
				_errors.audioErrors = true
			}

			data = { ...data, ...audios }
		}else{
			data = { ...data, audio:undefined }
		}

		if (type === "video") {

			const [videoErrors, videos] = videoRef.current.getResult();

			if (videoErrors) {
				_errors.videoErrors = true
			}

			data = { ...data, ...videos }
		}else{
			data = { ...data, video:undefined }
		}

		if (type === "document") {

			const [documentErrors, documents] = documentRef.current.getResult();

			if (documentErrors) {
				_errors.documentErrors = true
			}

			data = { ...data, ...documents }
		}else{
			data = { ...data, document:undefined }
		}

		if (type === "action") {

			const [actionErrors, actions] = actionRef.current.getResult();

			if (actionErrors) {
				_errors.actionErrors = true
			}

			data = { ...data, ...actions }
		}else{
			data = { ...data, actionType:undefined,steps:undefined, }
		}

		if (type === "ic") {

			const [icErrors, questions] = iCRef.current.getResult();

			if (icErrors) {
				_errors.icErrors = true
			}

			data = { ...data, ...questions }
		}else{
			data = { 
				...data, 
				questions:undefined,
				storeDataInCache:undefined,
				cacheKeyIsId:undefined,
				oneTimeCollection:undefined,
				onCompleteNext:undefined,
			}
		}

		if (type === "testApi") {

			const [testApiErrors, questions] = testApiRef.current.getResult();

			if (testApiErrors) {
				_errors.testApiErrors = true
			}

			data = { ...data, ...questions }
		}else{
			data = {
				...data,
				response:undefined,
				url:undefined,
			}
			if(type!=="ic"){
				data = {
					...data,
					questions:undefined,
					onCompleteNext:undefined
				}
			}
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
	const onInputChange = e => {
		switch (e.target.name) {
			case "type":
				setType(e.target.value)
				break;
			case "title":
				setTitle(e.target.value)
				break;
			case "invalidResponse":
				setInvalidResponse(e.target.value)
				break;
			case "next":
				setNext(e.target.value)
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
			disableBackdropClick
		>
			<AppBar position="static" elevation={1}>
				<div
					className="flex flex-col items-center justify-center pb-10 text-20 align-items-center "
					style={{ paddingBottom: 20, paddingTop: 20 }}
				>
					Edit Node
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
						fullWidth
						onChange={onInputChange}
						size="small"
						required={true}
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
						<InputLabel id="demo-simple-select-outlined-label_type" >Type</InputLabel>
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
							messages={node.messages}
						/>

						: null
				}
				{
					type === "image" ?

						<DialogueImage
							ref={imageRef}
							images={node.images}
						/>

						: null
				}
				{
					type === "audio" ?

						<DialogueAudio
							ref={audioRef}
							audio={node.audio}
						/>

						: null
				}

				{
					type === "video" ?

						<DialogueVideo
							ref={videoRef}
							video={node.video}
						/>

						: null
				}

				{
					type === "document" ?

						<DialogueDocument
							ref={documentRef}
							document={node.document}
						/>

						: null
				}
				{
					type === "action" ?

						<DialogueAction
							ref={actionRef}
							pathLength={path.length}
							node={node}
						/>

						: null
				}
				{
					type === "ic" ?

						<DialogueIC
							ref={iCRef}
							questions={node.questions}
							
							children={children}
							onCompleteNext={node.onCompleteNext}
						/>

						: null
				}

				{
					type === "testApi" ?

						<DialogueTestAPI
							ref={testApiRef}
							response={node.response}
							questions={node.questions}							
							children={children}
							onCompleteNext={node.onCompleteNext}
						/>

						: null
				}
				{
					children && children.length && type!="action"&& type!="ic"&& type!="testApi"?
						<div style={{ marginTop: "10px" }}>
							<FormControl component="fieldset" className={classes.formControl}>
								<FormLabel component="legend" className="text-14">
									On Invalid Response
						</FormLabel>

								<FormControlLabel
									control={<Switch checked={repeatPreviousMessage} onChange={handleResponseChange} />}
									label={repeatPreviousMessage ? "Repeat Previous Message" : "Custom Message"}
								/>


							</FormControl>
							{!repeatPreviousMessage ?


								<div className="flex">


									<TextField

										multiline
										rowsMax={6}
										className="mb-24"
										label="Invalid Response Message"
										id="invalidResponse"
										name="invalidResponse"
										value={invalidResponse}
										variant="outlined"
										fullWidth
										onChange={onInputChange}
										size="small"
										required={true}
										error={errors.invalidResponse}
										helperText={errors.invalidResponse ? errors.invalidResponse : ""}
									/>
								</div>
								: null}
							<div className="flex mb-20">

								<FormControl
									variant="outlined"
									size="small"
									fullWidth
									style={{ marginTop: '5px' }}
								>
									<InputLabel id="demo-simple-select-outlined-label_next">Invoke Child Immediately after parent </InputLabel>
									<Select
										labelId="demo-simple-select-outlined-label_next"
										id="demo-simple-select-outlined_next"
										label={"Select Child To Invoke after Parent is called"}
										value={next}
										onChange={onInputChange}
										fullWidth
										name={"next"}
									>
										<MenuItem value={""}>

											<em  value={""}>None</em>

										</MenuItem>
										{children.map(el => {
											return (<MenuItem key={"Child_NEXT_" + el.id} value={el.id}>{el.title}</MenuItem>)
										})}
									</Select>
								</FormControl>


							</div>
						</div>



						:
						null
				}




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
							update
							</Button>
					</div>
				</ThemeProvider>
			</DialogActions>
		</Dialog>
	);
};
export default EditTreeNode;
