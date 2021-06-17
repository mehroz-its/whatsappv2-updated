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
import React, { useState } from 'react';
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
		fontSize: '100px' //Insert your required size
	},
	text: {
		// color: '#fff !important'
		// '&.MuiListItemText-root .MuiListItmeText-primary': {
		// 	color: '#fff'
		// }
	}
}));

function CustomerReportSidebar(props) {
	const [activeColor, setActiveColor] = useState('all');

	const user = null;
	let data = null;
	data = JSON.parse(localStorage.getItem('user_data'));
	let value = null;
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
	const handleClick = val => {
		props.getData('', val);
		props.setFeedbackValue(val);
	};
	const { cannedtype } = props;
	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<div>
					<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
						<div className="p-24 flex items-center">
							{/* <Avatar alt={value.charAt(0)} src="../../../" className={classes.avatar} /> */}
							<Typography
								className="mx-12"
								style={{ fontSize: '12px', marginTop: '1px', fontWeight: 600 }}
							>
								Customer Feedback Logs
							</Typography>
						</div>
						<Divider />
						<List>
							<ListItem
								exact
								button
								to="/apps/canned-messages"
								activeClassName="active"
								className={classes.listItem + (activeColor === 'all' ? ' active' : '')}
								onClick={e => {
									e.preventDefault();
									handleClick('*');
									setActiveColor('all');
								}}
							>
								<Icon className="list-item-icon text-16" color="action" style={{ fontSize: '25px' }}>
									all_inclusive
								</Icon>
								<ListItemText
									className="truncate"
									primary="All"
									disableTypography
									className={classes.text}
								/>
							</ListItem>
							<ListItem
								exact
								button
								to="/apps/canned-messages"
								activeClassName="active"
								className={classes.listItem + (activeColor === '5' ? ' active' : '')}
								onClick={e => {
									e.preventDefault();
									handleClick('5');
									setActiveColor('5');
								}}
							>
								<Icon className="list-item-icon text-16" color="action" style={{ fontSize: '25px' }}>
									sentiment_very_satisfied
								</Icon>
								<ListItemText
									className="truncate"
									primary="Excellent"
									disableTypography
									className={classes.text}
								/>
							</ListItem>
							<ListItem
								exact
								button
								activeClassName="active"
								className={classes.listItem + (activeColor === '4' ? ' active' : '')}
								onClick={e => {
									e.preventDefault();
									handleClick('4');
									setActiveColor('4');
								}}
							>
								<Icon className="list-item-icon text-16" color="action" style={{ fontSize: '25px' }}>
									tag_faces
								</Icon>
								<ListItemText primary="Very Good" disableTypography className={classes.text} />
							</ListItem>
							<ListItem
								exact
								button
								activeClassName="active"
								className={classes.listItem + (activeColor === '3' ? ' active' : '')}
								onClick={e => {
									e.preventDefault();
									handleClick('3');
									setActiveColor('3');
								}}
							>
								<Icon className="list-item-icon text-16" color="action" style={{ fontSize: '25px' }}>
									sentiment_satisfied
								</Icon>
								<ListItemText primary="Good" disableTypography className={classes.text} />
							</ListItem>
							<ListItem
								exact
								button
								activeClassName="active"
								className={classes.listItem + (activeColor === '2' ? ' active' : '')}
								onClick={e => {
									e.preventDefault();
									handleClick('2');
									setActiveColor('2');
								}}
							>
								<Icon className="list-item-icon text-16" color="action" style={{ fontSize: '25px' }}>
									sentiment_dissatisfied
								</Icon>
								<ListItemText primary="Poor" disableTypography className={classes.text} />
							</ListItem>
							<ListItem
								exact
								button
								activeClassName="active"
								className={classes.listItem + (activeColor === '1' ? ' active' : '')}
								onClick={e => {
									e.preventDefault();
									handleClick('1');
									setActiveColor('1');
								}}
							>
								<Icon className="list-item-icon text-16" color="action" style={{ fontSize: '25px' }}>
									sentiment_very_dissatisfied
								</Icon>
								<ListItemText primary="Very Poor" disableTypography className={classes.text} />
							</ListItem>
							<ListItem
								exact
								button
								activeClassName="active"
								className={classes.listItem + (activeColor === 'other' ? ' active' : '')}
								onClick={e => {
									e.preventDefault();
									handleClick('other');
									setActiveColor('other');
								}}
							>
								<Icon className="list-item-icon text-16" color="action" style={{ fontSize: '25px' }}>
									mood_bad
								</Icon>
								<ListItemText primary="Others" disableTypography className={classes.text} />
							</ListItem>
						</List>
					</Paper>
				</div>
			</FuseAnimate>
		</div>
	);
}
export default CustomerReportSidebar;
