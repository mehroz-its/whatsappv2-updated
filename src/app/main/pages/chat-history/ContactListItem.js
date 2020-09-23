import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import StatusIcon from './StatusIcon';
const useStyles = makeStyles(theme => ({
	contactListItem: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&.active': {
			backgroundColor: theme.palette.background.paper
		}
	},
	listItemText:{
		fontSize:'12px',//Insert your required size
		marginLeft:'4%'
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

function ContactListItem(props) {
	const classes = useStyles(props);
	return (
		<ListItem
			button
			className={clsx(classes.contactListItem, 'px-12 py-12 min-h-36', {
				active: props.selectedContactId === props.contact.id
			})}
			onClick={() => props.onContactClick(props.contact)}
		>
			<div className="relative">
				<div className="absolute right-0 bottom-0 -m-4 z-10">
					<StatusIcon status={props.contact.name} />
				</div>

				<Avatar src={props.contact.avatar} alt={props.contact.name}>
					{!props.contact.avatar || props.contact.avatar === '' ? props.contact.name[0] : ''}
				</Avatar>
			</div>

			<ListItemText
			   classes={{primary:classes.listItemText,secondary:classes.listItemText2}}
				primary={props.contact.name}
				secondary={props.contact.number === props.contact.name ? null : props.contact.number}
			/>

			{props.contact.message_count && (
				<div className="flex flex-col justify-center items-end">
					{props.contact.last_closed && (
						<Typography className="whitespace-no-wrap mb-8" style={{fontSize:'10px'}}>
							{moment(props.contact.last_closed).format('ll')}
						</Typography>
					)}
					{props.contact.message_count > 0 && (
						<div
							className={clsx(
								classes.unreadBadge,
								'flex items-center justify-center min-w-24 h-24 rounded-full text-14 text-center'
							)}
						>
							{props.contact.message_count}
						</div>
					)}
				</div>
			)}
		</ListItem>
	);
}

export default ContactListItem;
