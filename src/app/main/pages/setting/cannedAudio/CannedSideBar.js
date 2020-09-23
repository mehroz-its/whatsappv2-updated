import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		fontSize:'12px',
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	},
	avatar: {
	
		padding:0,
		width:30,
		height:30
	  },
	  listItemText:{
		fontSize:'100px',//Insert your required size
	
	  }
}));

function CannedSideBar(props) {
	const user = null;
	let data = null
	data = JSON.parse(localStorage.getItem('user_data'))
	let value = null
	if (data !== null) {
		function titleCase(str) {
			str = str.toLowerCase().split(' ');
			for (var i = 0; i < str.length; i++) {
				str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
			}
			return str.join(' ');
		}
		 value = titleCase(data.username);
	}
	const classes = useStyles(props);
	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
					<div className="p-24 flex items-center">
						<Avatar alt={value.charAt(0)} src="../../../"  
						className={classes.avatar}
						/>
						<Typography className="mx-12" style={{fontSize:'12px',marginTop:'1px'}}>{value}</Typography>
					</div>
					<Divider />
					<List>
						<ListItem
							button
							component={NavLinkAdapter}
							to="/apps/canned-messages"
							activeClassName="active"
							className={classes.listItem}
						>
							<Icon className="list-item-icon text-16" color="action">
							rate_review
							</Icon>
							<ListItemText className="truncate" primary="All Messages" disableTypography />
						</ListItem>
						<ListItem
						
							 
							button
							component={NavLinkAdapter}
							to="/apps/canned-text"
							activeClassName="active"
							className={classes.listItem}
						>
							<Icon className="list-item-icon text-16" color="action">
							textsms
							</Icon>
							<ListItemText 
						
							primary="Text" disableTypography />
						</ListItem>
						<ListItem
						
							 
							button
							component={NavLinkAdapter}
							to="/apps/canned-audio"
							activeClassName="active"
							className={classes.listItem}
						>
							<Icon className="list-item-icon text-16" color="action">
							audiotrack
							</Icon>
							<ListItemText 
						
							primary="Audio" disableTypography />
						</ListItem>
						<ListItem
						
							 
						button
						component={NavLinkAdapter}
						to="/apps/canned-images"
						activeClassName="active"
						className={classes.listItem}
					>
						<Icon className="list-item-icon text-16" color="action">
						image
						</Icon>
						<ListItemText 
					
						primary="Image" disableTypography />
					</ListItem>
					<ListItem
						
							 
						button
						component={NavLinkAdapter}
						to="/apps/canned-videos"
						activeClassName="active"
						className={classes.listItem}
					>
						<Icon className="list-item-icon text-16" color="action">
						switch_video
						</Icon>
						<ListItemText 
					
						primary="Video" disableTypography />
					</ListItem>
					<ListItem
						
							 
						button
						component={NavLinkAdapter}
						to="/apps/canned-docs"
						activeClassName="active"
						className={classes.listItem}
					>
						<Icon className="list-item-icon text-16" color="action">
						picture_as_pdf
						</Icon>
						<ListItemText 
					
						primary="Document" disableTypography />
					</ListItem>
					
					</List>
				</Paper>
			</FuseAnimate>
		</div>
	);
}

export default CannedSideBar;
