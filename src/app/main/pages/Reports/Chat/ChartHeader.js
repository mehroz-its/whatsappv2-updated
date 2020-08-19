import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
		//   "&:last-child": {
		// 	paddingRight: 5
		//   }
		}
	  }
	}
  });

function ChartHeader(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);


	return (
		<div className="flex flex-1 items-center justify-between p-8 sm:p-24">
			<div className="flex flex-shrink items-center sm:w-224">
			

				<div className="flex items-center">
					
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-26">bar_chart</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography variant="h6" className="mx-12 hidden sm:flex">
						<span style={{fontSize:'15px'}}>Chart Report</span>
						</Typography>
					</FuseAnimate>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center px-8 sm:px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Paper className="flex  items-center w-full max-w-sm  px-8 py-4" elevation={1}>
						<Icon color="action" fontSize="small">search</Icon>
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

export default ChartHeader;
