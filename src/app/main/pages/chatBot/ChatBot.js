import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import ChatBotHeader from './ChatBotHeader';
import ChatBotTable from './ChatBotTable';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import UserDialog from './UserDialog'
import CoreHttpHandler from './../../../../http/services/CoreHttpHandler';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
	addButton: {
		position: 'fixed',
		bottom: 50,
		right: 50,
		zIndex: 99
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 330,

	},
}))

function ChatBot(props) {
	const [open, setOpen] = React.useState(false);
	const [dialogData, setDialogData] = React.useState({
		enabled: true,
		id: '',
		username: '',
		position: '',
		email: '',
		number: '',
		roles: []
	})
	const classes = useStyles(props);
	const [val, setVal] = React.useState('')
	const [data, setData] = React.useState([]);
	const [data2, setData2] = React.useState(data);
	const [snackbaropen, setSnackBarOpen] = React.useState(false)
	const [snackbarmessage, setSnackBarMessage] = React.useState('')
	const [ok, setOK] = React.useState('')

	const [isLoading, setLoading] = React.useState(true)
	React.useEffect(()=>{
		getData()
	},[])

    function showMessage ({msg,success}){

        if (msg) {
            setSnackBarMessage(msg);
            setOK(success ? "success" : "error");
			setSnackBarOpen(true);

			setTimeout(() => {
				setSnackBarMessage('')
				setSnackBarOpen(false)
			}, 3000);
        }
    }
	function showError(mes){
		if(mes)
			snackbar(mes)

	}
	function closeDialog(mes) {
		if(mes)
			snackbar(mes)

		getData()
		setOpen(false);
	}

	const getData = ((loadData) => {
		setLoading(true)
		setData([])
		setData2([])

		loadData = () => {
			return CoreHttpHandler.request(
                'CompanyAgent',
                'get_self_chatbot',
                {},
                null, null, true
            );
		};
		loadData().then((response) => {
			setLoading(false)
			setData(response.data.data.autoreply)
			setData2(response.data.data.autoreply)
		})
			.catch((error) => {
				setLoading(false)

				setTimeout(() => {
					setSnackBarMessage('')
					setSnackBarOpen(false)
				}, 3000);

			})
	})

	const handleClickOpen = () => {
		setOpen(true);
	};

	function search(value) {
		setVal(value)
		setData2(data.filter(n => n.name.toLowerCase().includes(value.toLowerCase())))
	}

	const snackbar = (snackmsg) => {
		if (snackmsg === "create") {
			setSnackBarMessage("Created Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg === "update") {
			setSnackBarMessage("Update Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg === "delete") {
			setSnackBarMessage("Deleted Successfully")
			setOK("success")
			setSnackBarOpen(true)
		}
		else if (snackmsg === "error") {
			setSnackBarMessage("Error! Please Try Again Later")
			setOK("error")
			setSnackBarOpen(true)
		}
		else if (snackmsg !== ("update" || "delete" || "create" || "error")) {
			if(snackmsg){
				setSnackBarMessage(snackmsg)
				setOK("error")
				setSnackBarOpen(true)
			}else{
				setSnackBarMessage("")
				setSnackBarOpen(false)
			}
		}
	}

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={snackbaropen}
				autoHideDuration={1000}
			>
				<Alert variant="filled" severity={ok}>
					{snackbarmessage}
				</Alert>
			</Snackbar>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<ChatBotHeader SearchVal={search} />}
				content={<ChatBotTable  showError={showError} snackbar={snackbar} ValueForSearch={val} dataa={data2} onClose={closeDialog} refreshTable={getData} showMessage={showMessage}/>}
			/>
			
		</>
	);
}

export default ChatBot;