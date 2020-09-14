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
	const {onTabChange} = props
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

	const handleClick = (val) => {
		console.log('i am clicked', val)
		props.cannedType(val)
	}
	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
					<div className="p-24 flex items-center">
						<Avatar alt={value.charAt(0)} src="../../../"
							className={classes.avatar}
						/>
						<Typography className="mx-12" style={{ fontSize: '12px', marginTop: '1px' }}>{value}</Typography>
					</div>
					<Divider />
					<List>
						<ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details"
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
							onClick={() => { onTabChange('Contact') }}

						>
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
							to="/apps/company-details/Notes"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange("Notes") }}

						>
							<Icon className="list-item-icon text-16" color="action">
								audiotrack
							</Icon>
							<ListItemText
								primary="Notes" disableTypography />
						</ListItem>
						<ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details/Statement"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange("Statement") }}

						>
							<Icon className="list-item-icon text-16" color="action">
								image
						</Icon>
							<ListItemText
								primary="Statement" disableTypography />
						</ListItem>
						<ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details/Invoices"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange("Invoices") }}

						>
							<Icon className="list-item-icon text-16" color="action">
								switch_video
						</Icon>
							<ListItemText
								primary="Invoices" disableTypography />
						</ListItem>
						<ListItem
							exact
							button
							component={NavLinkAdapter}
							to="/apps/company-details/Payments"
							activeClassName="active"
							className={classes.listItem}
							onClick={() => { onTabChange("Payments") }}

						>
							<Icon className="list-item-icon text-16" color="action">
								picture_as_pdf
						</Icon>
							<ListItemText
								primary="Payments" disableTypography />
						</ListItem>
					</List>
				</Paper>
			</FuseAnimate>
		</div>
	);
}
export default CustomerDetailSideBar;
