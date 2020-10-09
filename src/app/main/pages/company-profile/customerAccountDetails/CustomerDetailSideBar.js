import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		fontSize: '12px',
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

		padding: 0,
		width: 30,
		height: 30
	},
	listItemText: {
		fontSize: '100px',//Insert your required size

	}
}));
function CustomerDetailSideBar(props) {
	const { onTabChange } = props
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
					<List>
						<ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange('Intelligence') }}
						>
							<Icon className="list-item-icon text-16" color="action">
								rate_review
							</Icon>
							<ListItemText className="truncate" primary="Intelligence" disableTypography />
						</ListItem>
						<ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details/Profile"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange('Profile') }}
						>
							<Icon className="list-item-icon text-16" color="action">
								rate_review
							</Icon>
							<ListItemText className="truncate" primary="Profile" disableTypography />
						</ListItem>
						<ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details/Contact"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange('Contact') }}>
							<Icon className="list-item-icon text-16" color="action">
								textsms
							</Icon>
							<ListItemText
								primary="Contacts" disableTypography />
						</ListItem>
						<ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details/Agents"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange("Agents") }}>
							<Icon className="list-item-icon text-16" color="action">
								audiotrack
							</Icon>
							<ListItemText
								primary="Agents" disableTypography />
						</ListItem>
						<ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details/configration"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange("Configration") }}>
							<Icon className="list-item-icon text-16" color="action">
								image
							</Icon>
							<ListItemText
								primary="Configration" disableTypography />
						</ListItem>
						{/* <ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details/CannedReplies"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange("CannedReplies") }}>
							<Icon className="list-item-icon text-16" color="action">
								switch_video
						</Icon>
							<ListItemText
								primary="Canned Replies" disableTypography />
						</ListItem> */}
					</List>
				</Paper>
			</FuseAnimate>
		</div>
	);
}
export default CustomerDetailSideBar;
