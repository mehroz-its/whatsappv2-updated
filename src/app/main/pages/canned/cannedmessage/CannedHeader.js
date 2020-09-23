import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
function CanneddHeader(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-26">rate_review</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12 text-20" variant="h6">
						<span style={{ fontSize: '15px' }}>Canned Messages</span>
					</Typography>
				</FuseAnimate>
			</div>
			<div className="flex flex-1 items-center justify-center px-8">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-4 py-4 rounded-8" elevation={1}>
							<Icon color="action" fontSize="small">search</Icon>
							<input
								style={{ border: 'none' }}
								rows={1}
								placeholder="Search"
								className="flex flex-1 mx-8 "
								disableUnderline
								onChange={e => {
									props.SearchVal(e.target.value)
								}}
								placeholder="Search"
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
		</div>
	);
}
export default CanneddHeader;
