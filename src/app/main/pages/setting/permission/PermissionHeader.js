import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from './store/actions';
import { makeStyles,ThemeProvider,createMuiTheme,withStyles,MuiThemeProvider } from '@material-ui/core/styles';

const SearchStyle = createMuiTheme({
	overrides: {
		MuiInput: {
		root: {
		  paddingTop: 0,
		  fontSize:'12px',
		  paddingBottom: 0,
		  margin:0,
		  border:0,
		  borderRadius:0,
		  height:'30px'
		}
	  }
	}
  });


function PermissionHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const [search,setSearch]=React.useState('')
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-26">playlist_add_check</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
					<span style={{fontSize:'15px'}}>System Premissions</span>
					</Typography>
				</FuseAnimate>
			</div>
			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-sm px-8 py-4" elevation={1}>
							<Icon color="action">search</Icon>
							<MuiThemeProvider theme={SearchStyle}>
							<Input
							style={{border:'none'}}
							rows={1}
							placeholder="Search"
							className="flex flex-1 mx-8 "
							disableUnderline
							onChange={e=>{
							
								props.SearchVal(e.target.value)
								
							}}
							placeholder="Search"
							/>
							</MuiThemeProvider>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
		
		</div>
	);
}

export default PermissionHeader;
