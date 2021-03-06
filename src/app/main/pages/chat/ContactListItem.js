import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import StatusIcon from './StatusIcon';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { EventEmitter } from '../../../../events';

const useStyles = makeStyles(theme => ({
	contactListItem: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&.active': {
			backgroundColor: theme.palette.background.paper
		}
	},
	listItemText: {
		fontSize: '12px', //Insert your required size
		marginLeft: '4%'
	},
	listItemText2: {
		fontSize: '11px', //Insert your required size

		marginLeft: '4%'
		// marginLeft: '4%'
	},
	unreadBadge: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText
	}
}));

function ContactListItem(props) {
	const classes = useStyles(props);
	// let bage = Number(props.contact.message_count)
	// console.log("bage",bage);
	// if (bage > 0) {
	// 	EventEmitter.dispatch('Message', true)
	// }
	const showAvatar = () => {
		if (props.Channel === '') {
			return <Avatar src={props.contact.avatar} alt={props.contact.name}></Avatar>;
		} else if (props.Channel == 0) {
			return <Avatar src={require('./images/download.png')} alt={props.contact.name}></Avatar>;
		} else if (props.Channel == 1) {
			return <Avatar src={require('./images/messanger.png')} alt={props.contact.name}></Avatar>;
		} else if (props.Channel == 2) {
			return <Avatar src={require('./images/instagram.jpeg')} alt={props.contact.name}></Avatar>;
		}
	};
	// let val = 1
	// if(props.contact.message_count && val === 1){
	// 	if(props.contact.message_count > 0){
	// 		alert('new message')
	// 		return val = 4
	// 	}

	// }
	const { selectedRecipient, contact } = props;
	const showCount = selectedRecipient && selectedRecipient.id == contact.id ? false : true;
	return (
		<>
			<ListItem
				button
				className={clsx(classes.contactListItem, 'px-18 py-12 min-h-36', {
					active: props.selectedContactId === props.contact.id
				})}
				onClick={() => props.onContactClick(props.contact)}
			>
				<div className="relative">
					<div className="absolute right-0 bottom-0 -m-2 z-6">
						<StatusIcon status={props.contact.name} />
					</div>
					{showAvatar()}
				</div>
				<FuseAnimate animation="transition.slideDownIn" delay={300}>
					<React.Fragment>
						<ListItemText
							classes={{ primary: classes.listItemText, secondary: classes.listItemText2 }}
							primary={props.contact.name}
							secondary={props.contact.number !== props.contact.name ? props.contact.number : null}
						/>
					</React.Fragment>
				</FuseAnimate>
				<div className="flex flex-col justify-center items-end">
					{props.contact.message_count > 0 && (
						<div
							className={clsx(
								classes.unreadBadge,
								'flex items-center justify-center min-w-20 h-20 rounded-full text-10 text-center'
							)}
						>
							{props.contact.message_count}
						</div>
					)}
					{props.contact.agent_name}
					{props.contact.dtu && (
						<Typography className="whitespace-no-wrap mb-1" style={{ fontSize: '10px' }}>
							{moment(props.contact.dtu).format('ll')}
						</Typography>
					)}
				</div>
			</ListItem>
		</>
	);
}
export default ContactListItem;
