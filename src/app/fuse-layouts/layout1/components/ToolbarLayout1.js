import FuseSearch from '@fuse/core/FuseSearch';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import React, { useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useSelector } from 'react-redux';
import CoreHttpHandler from 'http/services/CoreHttpHandler';
import { EventEmitter } from '../../../../events';
import PermissionResolver from '../../../common/PermissionResolver';
import WebSocket from "./../../../socket/WebSocket";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
	separator: {
		width: 1,
		height: 64,
		backgroundColor: theme.palette.divider
	}
}));

function ToolbarLayout1(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);
	const [online, setOnline] = React.useState(false);
	const [enableRingtone, setEnableRingtone] = React.useState(false);
	const [toggleShow, setToggleShow] = React.useState(false);
	const [message, setMessage] = React.useState(false);
	const classes = useStyles(props);

	const [snackbaropen, setSnackBarOpen] = React.useState(false)

	const socket = WebSocket.getSocket()

	const updateAgentStatus = isOnline => {
		if (isOnline) {
			EventEmitter.dispatch('Online', true);
			localStorage.setItem('online', true);
			setOnline(true);
		} else {
			EventEmitter.dispatch('Online', false);
			localStorage.setItem('online', false);
			setOnline(false);
		}
	}

	const handleRingtone = () => {
		if (enableRingtone) {
			setEnableRingtone(false)
			localStorage.setItem('EnableNotificationTone', true);
			EventEmitter.dispatch('EnableNotificationTone', false);
		} else {
			setEnableRingtone(true)
			EventEmitter.dispatch('EnableNotificationTone', true);
			localStorage.setItem('EnableNotificationTone', true);
		}
	}
	const setAgentOnline = e => {
		const isOnline = e.target.checked;
		if (isOnline) {
			EventEmitter.dispatch('Online', true);
			localStorage.setItem('online', true);
			setOnline(true);
			CoreHttpHandler.request(
				'core',
				'online',
				{},
				response => {
					localStorage.setItem('online', true);
				},
				response => { }
			);
		} else {
			EventEmitter.dispatch('Online', false);
			localStorage.setItem('online', false);
			setOnline(false);
			CoreHttpHandler.request(
				'core',
				'offline',
				{},
				response => { },
				response => { }
			);
		}
	};
	useEffect(() => {
		setToggleShow(PermissionResolver.hasPermission('app', 'toggle'));
		// console.log('toggleShow : ', toggleShow);
		const _online = (localStorage.getItem('online') == true || localStorage.getItem('online') == "true");

		console.log("====== THIS =========")
		console.log(localStorage.getItem('online'))
		console.log(localStorage.getItem('online') == true)
		setOnline(_online)

		socket.on("newMessage", (data) => {
			// alert('caleed 1')

			if (data && data.newMessage) {
				setSnackBarOpen(true)
				setMessage("You have a new conversation")
			}
		})
		socket.on("newMessageNotification", (data) => {
			// alert('caleed')
			if (data && data.newMessage) {
				if (window && window.location && window.location.href) {
					if (!String(window.location.href || " ").includes("/apps/chat")) {
						setSnackBarOpen(true)
						setMessage("You have a new message")
					}
				}
			}
		})
		socket.on("iAmOnline", (data) => {
			if (data) {
				updateAgentStatus(data.isOnline)
			}
		})





		if (_online) {
			CoreHttpHandler.request(
				'core',
				'online',
				{},
				response => {
					localStorage.setItem('online', true);
				},
				response => { }
			);
		}



		return () => {
			socket.removeListener("newMessage")
			socket.removeListener("newMessageNotification")
			socket.removeListener("iAmOnline")
		}

	}, []);
	return (
		<ThemeProvider theme={toolbarTheme}>

			{
				message ?

					<Snackbar onClose={() => { setSnackBarOpen(false) }} open={snackbaropen} autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} key={'bottom' + 'right'}
					>
						<Alert severity="success">
							{message}
						</Alert>
					</Snackbar>
					: null
			}
			<Snackbar onClose={() => { setSnackBarOpen(false) }} open={snackbaropen} autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} key={'bottom' + 'right'}
			>
				<Alert severity="success">
					{message}
				</Alert>
			</Snackbar>
			<AppBar
				id="fuse-toolbar"
				className="flex relative z-10"
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.default }}
			>
				<div style={{ height: 50 }}>
					<Toolbar className="p-0">
						{config.navbar.display && config.navbar.position === 'left' && (
							<Hidden lgUp>
								<NavbarMobileToggleButton className="w-64 h-0 p-10" />
								<div className={classes.separator} />
							</Hidden>
						)}

						<div className="flex flex-1" style={{ marginTop: '-0.4%' }}>
							<Hidden mdDown>
								<FuseShortcuts className="px-16 py-0" />
							</Hidden>
						</div>

						<div className="flex">
							{toggleShow === true ? (
								<div style={{ marginTop: '2.3%' }}>
									<FormControlLabel
										control={
											<Switch
												checked={online}
												onChange={setAgentOnline}
												name="online"
												color="primary"
											/>
										}
										label={online ? 'Go Offline' : 'Go Online'}
									/>
								</div>
							) : null}
							{toggleShow === true ? (
								<div style={{ marginTop: '2.3%' }}>
									<FormControlLabel
										control={
											<Switch
												checked={enableRingtone}
												onChange={handleRingtone}
												name="online"
												color="primary"
											/>
										}
										label={'Notification Sound'}
									/>
								</div>
							) : null}

							<UserMenu />

							<div className={classes.separator} />

							{/* <FuseSearch /> */}

							<div className={classes.separator} />

							{/* <LanguageSwitcher /> */}

							<div className={classes.separator} />

							{/* <QuickPanelToggleButton /> */}
						</div>

						{config.navbar.display && config.navbar.position === 'right' && (
							<Hidden lgUp>
								<NavbarMobileToggleButton />
							</Hidden>
						)}
					</Toolbar>
				</div>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout1);
