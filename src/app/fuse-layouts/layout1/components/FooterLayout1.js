import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import Icon from '@material-ui/core/Icon';


function FooterLayout1(props) {
	const footerTheme = useSelector(({ fuse }) => fuse.settings.footerTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar id="fuse-footer" className="relative z-10" color="default">
				<Toolbar className="px-16 py-0 flex items-center">
					<div style={{display:'flex',flexDirection:'row'}}>
					<Icon color="action" className="text-16" style={{ marginRight: '5px',marginTop:'2px' }}>copyright</Icon>
						<Typography>Intellexal Solutions (Pvt.) Ltd.  All Rights Reserved</Typography>
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout1);
