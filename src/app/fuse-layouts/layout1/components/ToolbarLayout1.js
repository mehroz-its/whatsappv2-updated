import FuseSearch from '@fuse/core/FuseSearch';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useSelector } from 'react-redux';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import { EventRegister } from 'react-event-listeners'
import CoreHttpHandler from 'http/services/CoreHttpHandler'
import { EventEmitter } from '../../../../events'

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
	const [online, setOnline] = React.useState(JSON.parse(localStorage.getItem('online')))

	const classes = useStyles(props);


	const setAgentOnline = (e) => {
		console.log(e.target, 'eee')
		const isOnline = e.target.checked;
		console.log(isOnline, 'isss')

		if (isOnline) {
			EventEmitter.dispatch('Online',true)
			localStorage.setItem('online', true)
			setOnline(true)
			CoreHttpHandler.request('core', 'online', {}, (response) => {
				localStorage.setItem('online', true)
			}, (response) => {

			});
			// this.getNumbers();
			// clearInterval(this.int_CustomerList);
			// clearInterval(this.int_MessageLists);


		} else {
			EventEmitter.dispatch('Online',false)
			localStorage.setItem('online', false)
				setOnline(false)
			CoreHttpHandler.request('core', 'offline', {}, (response) => {
				// clearInterval(this.int_CustomerList);
				// clearInterval(this.int_MessageLists);
				// this.setState({ })
				
			}, (response) => {

			});
			// this.setState({ numbers: [], messages: [], selectedRecipient: null, selectedConversation: null })

		}

		// this.setState({ online: isOnline }, () => {
		//     localStorage.setItem('online', this.state.online);
		// });
	};


	return (
		<ThemeProvider theme={toolbarTheme}>
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

						<div className="flex flex-1" style={{marginTop:'-0.4%'}}>
							<Hidden mdDown >
								<FuseShortcuts className="px-16 py-0"  />
							</Hidden>
						</div>

						<div className="flex">
							<div style={{ marginTop: '2.3%' }}>
								<FormControlLabel
									// style={{ color: '#252525' }}
									control={
										<Switch
											checked={online}
											// onChange={(e)=>{
											// setOnline(true)
											// 	// console.log(e.target,'e.target.value')

											// }}
											onChange={setAgentOnline}
											name="online"
											color="primary"
										/>
									}
									label={online ? 'Go Offline' : 'Go Online'}
								/>
							</div>
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
