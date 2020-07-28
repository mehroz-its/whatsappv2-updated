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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	contactListItem: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&.active': {
			backgroundColor: theme.palette.background.paper
		},
		
	},
	listItemText:{
		fontSize:'13px',//Insert your required size
		marginLeft:'2%',
		// fontWeight:'bold',
		paddingLeft:'10px', 
		paddingRight:'10px',
		textTransform:'capitalize'

	  },
	  listItemText2:{
		fontSize:'11px',//Insert your required size
		marginLeft:'4%'
	  },
	unreadBadge: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText
	}
}));


const UserMenu =(props) => {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);

	const [userMenu, setUserMenu] = useState(null);

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
	const classes = useStyles(props);

	const handleProfile = () =>{
		// props.history.push({
		// 	pathname: '/pages/profile',

		// });
		window.location.href = '/apps/profile';


	}
	console.log(props)
	return (
		<>
		
			<Button className="h-40" style={{marginTop:'4%'}} onClick={userMenuClick}>
				{user.data.photoURL ? (
					<Avatar className=""  style={{width:'30px', height:'30px'}} alt={username.charAt(0)} src="../../../" />
				) : (
						<Avatar className="" style={{width:'35px', height:'35px'}}>{user.data.displayName[0]}</Avatar>
					)}

				<div className="hidden md:flex flex-col mx-12 items-start">
					<Typography component="span" className="normal-case font-600 flex">
						{username}
					</Typography>
					<Typography className="text-11 capitalize" color="textSecondary">
						{user.role.toString()}
					</Typography>
				</div>

				<Icon className="text-16 hidden sm:flex" variant="action">
					keyboard_arrow_down
				</Icon>
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
							classes={{primary:classes.listItemText}}
							/>
						</MenuItem>
						<MenuItem component={Button} onClick={handleLogOut} role="button">
							{/* <ListItemIcon>
								<Icon size={12}>lock</Icon>
							</ListItemIcon> */}
							<ListItemText 
							primary="Logout" 
							classes={{primary:classes.listItemText}}
							/>
						</MenuItem>
					
					</>
				) : (
						<>
							<MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
								<ListItemIcon className="min-w-20" style={{marginLeft:'10px'}}>
									<Icon>account_circle</Icon>
								</ListItemIcon>
								<ListItemText primary="My Profile" 	classes={{primary:classes.listItemText}}/>
							</MenuItem>
							<MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
								<ListItemIcon className="min-w-20" style={{marginLeft:'10px'}}>
									<Icon>mail</Icon>
								</ListItemIcon>
								<ListItemText primary="Inbox" 	classes={{primary:classes.listItemText}}/>
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
		</>
	);
}

export default UserMenu;
