import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import * as authActions from 'app/auth/store/actions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CoreHttpHandler from '../../../http/services/CoreHttpHandler';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles,ThemeProvider,createMuiTheme,withStyles,MuiThemeProvider } from '@material-ui/core/styles';


const AvatarStyle = createMuiTheme({
	overrides: {
		MuiAvatar: {
		root: {
		fontSize:'18px',
		  height:'30px',
		  width:'30px',
		  padding:'10px',
		//   "&:hover":{
		// 	  background:null,
		// 	  backgroundColor:'white'
		//   }
		//   "&:last-child": {
		// 	paddingRight: 5
		//   }
		}
	  }
	}
  });

const useStyles = makeStyles(theme => ({
	contactListItem: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&.active': {
			backgroundColor: theme.palette.background.paper
		},

	},
	listItemText: {
		fontSize: '13px',//Insert your required size
		marginLeft: '2%',
		// fontWeight:'bold',
		paddingLeft: '10px',
		paddingRight: '10px',
		textTransform: 'capitalize'

	},
	listItemText2: {
		fontSize: '11px',//Insert your required size
		marginLeft: '4%'
	},
	unreadBadge: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText
	}
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const UserMenu = (props) => {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);

	const [userMenu, setUserMenu] = useState(null);
	const [state, setState] = React.useState({
		open: false,
		vertical: 'bottom',
		horizontal: 'right',
	});
	const handleClick = () => {
		setState({
			open: true,
			vertical: 'bottom',
			horizontal: 'right',
		});
	};
	const { vertical, horizontal, open } = state;

	const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({
            open: false, vertical: 'bottom',
            horizontal: 'right',
        });
    };
	let data = null
	data = JSON.parse(localStorage.getItem('user_data'))
	console.log(data)

	let username = ''
	if (data !== null) {
		function titleCase(str) {
			str = str.toLowerCase().split(' ');
			for (var i = 0; i < str.length; i++) {
				str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
			}
			return str.join(' ');
		}
		console.log(data)
		username = titleCase(data.username);

	}
	// console.log(value, 'titleCasetitleCasetitleCase')



	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	const handleLogOut = () => {
		let onlineStatus = JSON.parse(localStorage.getItem('online'));
		onlineStatus = onlineStatus === null ? false : onlineStatus;
		if (onlineStatus === true) {
			console.log("onlineStatus", onlineStatus);
			handleClick()

		} else {
			console.log('i am logout')
			CoreHttpHandler.request(
				'core',
				'userLogout',
				{},
				(response) => {
					window.location.href = '/login';
					localStorage.clear();
				},
				(response) => { }
			);
		}

	}
	const classes = useStyles(props);

	const handleProfile = () => {
		// props.history.push({
		// 	pathname: '/pages/profile',

		// });
		window.location.href = '/apps/profile';


	}
	console.log(props)
	return (
		<>

			<Button className="h-40" style={{ height: '50px',padding: '8px 0 0 10px', margin: '0px',borderRadius:0}} 
			onClick={userMenuClick}>
				{user.data.photoURL ? (
					<MuiThemeProvider theme={AvatarStyle}>
					<Avatar   style={{marginTop:'-8px',marginLeft:'6px'}} alt={username.charAt(0)} src="../../../" />
				</MuiThemeProvider>
				) : (<MuiThemeProvider theme={AvatarStyle}>
						<Avatar style={{marginTop:'-8px',marginLeft:'6px'}} >{user.data.displayName[0]}</Avatar>
					 </MuiThemeProvider>
					 )}

				<div className="hidden md:flex flex-col mx-0 items-start" style={{marginTop:'-9px',marginLeft:'7px'}}>
					<Typography component="span" className="normal-case font-600 flex">
						{username}
					</Typography>
					<Typography className="text-11 capitalize" color="textSecondary">
						{user.role.toString()}
					</Typography>
				</div>
					<div style={{marginTop:'-10px',marginLeft:'2px',marginRight:'20%'}}>
				<Icon className="text-16 hidden sm:flex" variant="action">
					keyboard_arrow_down
				</Icon>
				</div>
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						{/* <MenuItem component={Link} to="pages/profile" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem> */}
						<MenuItem component={Button} onClick={handleProfile} role="button">
							{/* <ListItemIcon>
								<Icon size={12}>person_add</Icon>
							</ListItemIcon> */}
							<ListItemText
								primary="Profile"
								classes={{ primary: classes.listItemText }}
							/>
						</MenuItem>
						<MenuItem component={Button} onClick={handleLogOut} role="button">
							{/* <ListItemIcon>
								<Icon size={12}>lock</Icon>
							</ListItemIcon> */}
							<ListItemText
								primary="Logout"
								classes={{ primary: classes.listItemText }}
							/>
						</MenuItem>

					</>
				) : (
						<>
							<MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
								<ListItemIcon className="min-w-20" style={{ marginLeft: '10px' }}>
									<Icon>account_circle</Icon>
								</ListItemIcon>
								<ListItemText primary="My Profile" classes={{ primary: classes.listItemText }} />
							</MenuItem>
							<MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
								<ListItemIcon className="min-w-20" style={{ marginLeft: '10px' }}>
									<Icon>mail</Icon>
								</ListItemIcon>
								<ListItemText primary="Inbox" classes={{ primary: classes.listItemText }} />
							</MenuItem>
							<MenuItem
								onClick={() => {
									dispatch(authActions.logoutUser());
									userMenuClose();
								}}
							>
								<ListItemIcon className="min-w-40">
									<Icon>exit_to_app</Icon>
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</MenuItem>
						</>
					)}
			</Popover>
			<Snackbar open={open} anchorOrigin={{ vertical, horizontal }}
				autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					Please change status to offline first!
        </Alert>
			</Snackbar>
		</>
	);
}

export default UserMenu;
