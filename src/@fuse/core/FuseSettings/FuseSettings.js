// import FuseLayoutConfigs from '@fuse/layouts/FuseLayoutConfigs';
// import _ from '@lodash';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
// import Switch from '@material-ui/core/Switch';
// import Typography from '@material-ui/core/Typography';
// import * as AuthActions from 'app/auth/store/actions';
// import * as Actions from 'app/store/actions';
// import clsx from 'clsx';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const useStyles = makeStyles(theme => ({
// 	root: {},
// 	formControl: {
// 		margin: '6px 0',
// 		width: '100%',
// 		'&:last-child': {
// 			marginBottom: 0
// 		}
// 	},
// 	group: {},
// 	formGroupTitle: {
// 		position: 'absolute',
// 		top: -10,
// 		left: 8,
// 		fontWeight: 600,
// 		padding: '0 4px',
// 		backgroundColor: theme.palette.background.paper
// 	},
// 	formGroup: {
// 		position: 'relative',
// 		border: `1px solid ${theme.palette.divider}`,
// 		borderRadius: 2,
// 		padding: '12px 12px 0 12px',
// 		margin: '24px 0 16px 0',
// 		'&:first-of-type': {
// 			marginTop: 16
// 		}
// 	}
// }));

// function FuseSettings(props) {
// 	const dispatch = useDispatch();
// 	const user = useSelector(({ auth }) => auth.user);
// 	const themes = useSelector(({ fuse }) => fuse.settings.themes);
// 	const settings = useSelector(({ fuse }) => fuse.settings.current);

// 	const classes = useStyles(props);

// 	function handleChange(event) {
// 		const newSettings = _.set(
// 			_.merge({}, settings),
// 			event.target.name,
// 			event.target.type === 'checkbox' ? event.target.checked : event.target.value
// 		);
// 		console.log(JSON.stringify(newSettings), 'newSettingsnewSettings')
// 		localStorage.setItem('newSettings', JSON.stringify(newSettings))

// 		/**
// 		 * If layout style changes,
// 		 * Reset Layout Configuration
// 		 */
// 		if (event.target.name === 'layout.style' && event.target.value !== settings.layout.style) {
// 			newSettings.layout.config = {};
// 		}

// 		if (user.role === 'guest') {
// 			dispatch(Actions.setDefaultSettings(newSettings));
// 		} else {
// 			dispatch(AuthActions.updateUserSettings(newSettings));
// 		}
// 	}
// 	window.onload = function () {
// 		let settings = localStorage.getItem('newSettings')
// 		dispatch(AuthActions.updateUserSettings(JSON.parse(settings)));
// 	};



// 	const ThemeSelect = ({ value, name, handleThemeChange }) => {
// 		return (
// 			<Select className="w-full" value={value} onChange={handleThemeChange} name={name}>
// 				{Object.entries(themes).map(([key, val]) => (
// 					<MenuItem
// 						key={key}
// 						value={key}
// 						className="m-8 mt-0 rounded-lg"
// 						style={{
// 							backgroundColor: val.palette.background.default,
// 							color: val.palette.text.primary,
// 							border: `1px solid ${val.palette.divider}`
// 						}}
// 					>
// 						{_.startCase(key)}
// 						<div
// 							className="flex w-full h-8 block absolute bottom-0 left-0 right-0"
// 							style={{
// 								borderTop: `1px solid ${val.palette.divider}`
// 							}}
// 						>
// 							<div className="w-1/4 h-8" style={{ backgroundColor: val.palette.primary.main }} />
// 							<div className="w-1/4 h-8" style={{ backgroundColor: val.palette.secondary.main }} />
// 							<div className="w-1/4 h-8" style={{ backgroundColor: val.palette.error.main }} />
// 							<div className="w-1/4 h-8" style={{ backgroundColor: val.palette.background.paper }} />
// 						</div>
// 					</MenuItem>
// 				))}
// 			</Select>
// 		);
// 	};

// 	const LayoutSelect = () => (
// 		<FormControl component="fieldset" className={classes.formControl}>
// 			<FormLabel component="legend" className="text-14">
// 				Style
// 			</FormLabel>

// 			<RadioGroup
// 				aria-label="Layout Style"
// 				name="layout.style"
// 				className={classes.group}
// 				value={settings.layout.style}
// 				onChange={handleChange}
// 			>
// 				{Object.entries(FuseLayoutConfigs).map(([key, layout]) => (
// 					<FormControlLabel key={key} value={key} control={<Radio />} label={layout.title} />
// 				))}
// 			</RadioGroup>
// 		</FormControl>
// 	);

// 	const DirectionSelect = () => (
// 		<FormControl component="fieldset" className={classes.formControl}>
// 			<FormLabel component="legend" className="text-14">
// 				Direction
// 			</FormLabel>

// 			<RadioGroup
// 				aria-label="Layout Style"
// 				name="direction"
// 				className={classes.group}
// 				value={settings.direction}
// 				onChange={handleChange}
// 				row
// 			>
// 				<FormControlLabel key="rtl" value="rtl" control={<Radio />} label="RTL" />
// 				<FormControlLabel key="ltr" value="ltr" control={<Radio />} label="LTR" />
// 			</RadioGroup>
// 		</FormControl>
// 	);

// 	const getForm = (form, prefix) =>
// 		Object.entries(form).map(([key, formControl]) => {
// 			const target = prefix ? `${prefix}.${key}` : key;
// 			switch (formControl.type) {
// 				case 'radio': {
// 					return (
// 						<FormControl key={target} component="fieldset" className={classes.formControl}>
// 							<FormLabel component="legend" className="text-14">
// 								{formControl.title}
// 							</FormLabel>
// 							<RadioGroup
// 								aria-label={formControl.title}
// 								name={`layout.config.${target}`}
// 								className={classes.group}
// 								value={_.get(settings.layout.config, target)}
// 								onChange={handleChange}
// 								row={formControl.options.length < 4}
// 							>
// 								{formControl.options.map(opt => (
// 									<FormControlLabel
// 										key={opt.value}
// 										value={opt.value}
// 										control={<Radio />}
// 										label={opt.name}
// 									/>
// 								))}
// 							</RadioGroup>
// 						</FormControl>
// 					);
// 				}
// 				case 'switch': {
// 					return (
// 						<FormControl key={target} component="fieldset" className={classes.formControl}>
// 							<FormControlLabel
// 								classes={
// 									{
// 										// root: "flex-row-reverse justify-end pl-16"
// 									}
// 								}
// 								control={
// 									<Switch
// 										name={`layout.config.${target}`}
// 										checked={_.get(settings.layout.config, target)}
// 										onChange={handleChange}
// 										aria-label={formControl.title}
// 									/>
// 								}
// 								label={
// 									<FormLabel component="legend" className="text-14">
// 										{formControl.title}
// 									</FormLabel>
// 								}
// 							/>
// 						</FormControl>
// 					);
// 				}
// 				case 'group': {
// 					return (
// 						<div key={target} className={classes.formGroup}>
// 							<Typography className={classes.formGroupTitle} color="textSecondary">
// 								{formControl.title}
// 							</Typography>

// 							{getForm(formControl.children, key)}
// 						</div>
// 					);
// 				}
// 				default: {
// 					return '';
// 				}
// 			}
// 		});

// 	function LayoutConfig() {
// 		const { form } = FuseLayoutConfigs[settings.layout.style];
// 		return getForm(form);
// 	}

// 	return (
// 		<div className={classes.root}>
// 			<div className={classes.formGroup}>
// 				<Typography className={classes.formGroupTitle} color="textSecondary">
// 					Layout
// 				</Typography>

// 				{/* <LayoutSelect /> */}

// 				<LayoutConfig />

// 				<Typography className="my-16 text-12 italic" color="textSecondary">
// 					*Not all option combinations are available
// 				</Typography>
// 			</div>

// 			<div className={clsx(classes.formGroup, 'pb-16')}>
// 				<Typography className={classes.formGroupTitle} color="textSecondary">
// 					Theme
// 				</Typography>

// 				<FormControl component="fieldset" className={classes.formControl}>
// 					<FormLabel component="legend" className="text-14">
// 						Main
// 					</FormLabel>
// 					<ThemeSelect value={settings.theme.main} name="theme.main" handleThemeChange={handleChange} />
// 				</FormControl>
// 				<FormControl component="fieldset" className={classes.formControl}>
// 					<FormLabel component="legend" className="text-14">
// 						Navbar
// 					</FormLabel>
// 					<ThemeSelect value={settings.theme.navbar} name="theme.navbar" handleThemeChange={handleChange} />
// 				</FormControl>
// 				<FormControl component="fieldset" className={classes.formControl}>
// 					<FormLabel component="legend" className="text-14">
// 						Toolbar
// 					</FormLabel>
// 					<ThemeSelect value={settings.theme.toolbar} name="theme.toolbar" handleThemeChange={handleChange} />
// 				</FormControl>
// 				<FormControl component="fieldset" className={classes.formControl}>
// 					<FormLabel component="legend" className="text-14">
// 						Footer
// 					</FormLabel>
// 					<ThemeSelect value={settings.theme.footer} name="theme.footer" handleThemeChange={handleChange} />
// 				</FormControl>
// 			</div>

// 			<FormControl component="fieldset" className={classes.formControl}>
// 				<FormLabel component="legend" className="text-14">
// 					Custom Scrollbars
// 				</FormLabel>
// 				<Switch
// 					checked={settings.customScrollbars}
// 					onChange={handleChange}
// 					aria-label="Custom Scrollbars"
// 					name="customScrollbars"
// 				/>
// 			</FormControl>

// 			<FormControl component="fieldset" className={classes.formControl}>
// 				<FormLabel component="legend" className="text-14">
// 					Animations
// 				</FormLabel>
// 				<Switch
// 					checked={settings.animations}
// 					onChange={handleChange}
// 					aria-label="Animations"
// 					name="animations"
// 				/>
// 			</FormControl>

// 			<DirectionSelect />
// 		</div>
// 	);
// }

// export default React.memo(FuseSettings);

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseSettings from '@fuse/core/FuseSettings';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { forwardRef, memo, useState } from 'react';
import FuseThemeSchemes from '@fuse/core/FuseThemeSchemes';
import { useSwipeable } from 'react-swipeable';
import React, { useEffect } from 'react';


const Transition = forwardRef(function Transition(props, ref) {
	const theme = useTheme();
	return <Slide direction={theme.direction === 'ltr' ? 'left' : 'right'} ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	buttonWrapper: {
		position: 'absolute',
		height: 80,
		right: 0,
		top: 160,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		opacity: 0.9,
		padding: 0,
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 0,
		borderTopRightRadius: 0,
		zIndex: 999,
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		'&:hover': {
			backgroundColor: red[500],
			opacity: 1
		}
	},
	button: {
		minWidth: 40,
		width: 40,
		height: 40,
		margin: 0
	},
	settingsButton: {
		'& $buttonIcon': {
			animation: '$rotating 3s linear infinite'
		}
	},
	schemesButton: {},
	'@keyframes rotating': {
		from: {
			transform: 'rotate(0deg)'
		},
		to: {
			transform: 'rotate(360deg)'
		}
	},
	buttonIcon: {
		fontSize: 20
	},
	dialogPaper: {
		position: 'fixed',
		width: 380,
		maxWidth: '90vw',
		backgroundColor: theme.palette.background.paper,
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0
	}
}));

function SettingsPanel() {
	const classes = useStyles();
	const theme = useTheme();

	const [open, setOpen] = useState(false);
	const handlerOptions = {
		onSwipedLeft: () => {
			return open && theme.direction === 'rtl' && handleClose();
		},
		onSwipedRight: () => {
			return open && theme.direction === 'ltr' && handleClose();
		}
	};

	const settingsHandlers = useSwipeable(handlerOptions);
	const shemesHandlers = useSwipeable(handlerOptions);

	const handleOpen = panelId => {
		setOpen(panelId);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className={classes.buttonWrapper} id="fuse-settings-schemes">
				<Button
					className={clsx(classes.button, classes.settingsButton)}
					onClick={() => handleOpen('settings')}
					variant="text"
					color="inherit"
				>
					<Icon className={classes.buttonIcon}>settings</Icon>
				</Button>

				{/* <Button
					className={clsx(classes.button, classes.schemesButton)}
					onClick={() => handleOpen('schemes')}
					variant="text"
					color="inherit"
				>
					<Icon className={classes.buttonIcon}>palette</Icon>
				</Button> */}
			</div>

			<Dialog
				TransitionComponent={Transition}
				aria-labelledby="settings-panel"
				aria-describedby="settings"
				open={open === 'settings'}
				keepMounted
				onClose={handleClose}
				BackdropProps={{ invisible: true }}
				classes={{
					paper: clsx(classes.dialogPaper, 'shadow-lg')
				}}
				{...settingsHandlers}
			>
				<FuseScrollbars className="p-16 sm:p-32">
					<IconButton className="fixed top-0 ltr:right-0 rtl:left-0 z-10" onClick={handleClose}>
						<Icon>close</Icon>
					</IconButton>

					<Typography className="mb-32 font-semibold" variant="h6">
						Theme Settings
					</Typography>

					<FuseSettings />
				</FuseScrollbars>
			</Dialog>

			<Dialog
				TransitionComponent={Transition}
				aria-labelledby="schemes-panel"
				aria-describedby="schemes"
				open={open === 'schemes'}
				keepMounted
				onClose={handleClose}
				BackdropProps={{ invisible: true }}
				classes={{
					paper: clsx(classes.dialogPaper, 'shadow-lg')
				}}
				{...shemesHandlers}
			>
				<FuseScrollbars className="p-16 sm:p-32">
					<IconButton className="fixed top-0 ltr:right-0 rtl:left-0 z-10" onClick={handleClose}>
						<Icon>close</Icon>
					</IconButton>

					<Typography className="mb-32" variant="h6">
						Theme Color Schemes
					</Typography>

					<Typography className="mb-24 text-12 italic text-justify" color="textSecondary">
						* Selected color scheme will be applied to all theme layout elements (navbar, toolbar, etc.).
						You can also select a different color scheme for each layout element at theme settings.
					</Typography>

					<FuseThemeSchemes />
				</FuseScrollbars>
			</Dialog>
		</>
	);
}

export default memo(SettingsPanel);
