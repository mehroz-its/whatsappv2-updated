import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { EventEmitter } from '../../../events'

const useStyles = makeStyles(theme => ({
	root: {
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	avatar: {
		width: 72,
		height: 72,
		position: 'absolute',
		top: 92,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		left: '50%',
		transform: 'translateX(-50%)',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '50%'
		}
	}
}));

function UserNavbarHeader(props) {
	const [firstNameData, setFirstNameData] = React.useState('');
	const [lastNameData, setLastNameData] = React.useState('');
	const [imageData, setImageData] = React.useState('');
	const [emailData, setEmailData] = React.useState('');
	
	const user = useSelector(({ auth }) => auth.user);
	const classes = useStyles();
	
	const checkUpdate = () =>{
		// alert("update")
		let data = null
		data = JSON.parse(localStorage.getItem('user_data'))
		// console.log("user_data user",data)
		let username = null
		let lastname = null
		if (data !== null) {
			function titleCase(str) {
				str = str.toLowerCase().split(' ');
				for (var i = 0; i < str.length; i++) {
					str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
				}
				return str.join(' ');
			}
			// console.log(data, 'from local storage')
			if(data.firstName){
				username = titleCase(data.firstName);
				setFirstNameData(username)
			}
			if(data.lastName){
				lastname = titleCase(data.lastName);
				setLastNameData(lastname)
			}
			setEmailData(data.email)
			setImageData(data.image)
	}
}
useEffect(() => {
	EventEmitter.subscribe('ProfileUpdate', (event) => checkUpdate())
	checkUpdate()
}, []);

	return (
		<AppBar
			position="static"
			color="primary"
			elevation={0}
			classes={{ root: classes.root }}
			className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
		>
			<Typography className="username text-14 whitespace-no-wrap" color="inherit">
				{/* {user.data.displayName} */}
				{`${firstNameData} ${lastNameData}`}

			</Typography>
			<Typography className="email text-11 mt-8  whitespace-no-wrap" color="inherit">
				{emailData}

			</Typography>
			<Avatar
				className={clsx(classes.avatar, 'avatar')}
				alt="user photo"
				// style={{ width: 60, height: 60 }}
				src={
					imageData && imageData !== ''
						? imageData
						: '../../../'
				}
			/>
		</AppBar>
	);
}

export default UserNavbarHeader;
