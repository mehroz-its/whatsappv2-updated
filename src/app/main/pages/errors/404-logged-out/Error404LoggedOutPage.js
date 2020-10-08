import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function Error404Page() {
	let [seconds, setSeconds] = useState(5)
	useEffect(() => {
		if(seconds>0){
			const timer = setTimeout(() => {
				if(seconds>=0){
					setSeconds(seconds-1)
				}
			}, 1000);
	
		}else{
			window.location = "/login"
		}
	  });
	return (
		<div className="flex flex-col flex-1 items-center justify-center p-16">
			<div className="max-w-512 text-center">
				{/* <FuseAnimate animation="transition.expandIn" delay={100}>
					<Typography variant="h" color="inherit" className="font-medium mb-16">
					Temporarily Unavialabe
					</Typography>
				</FuseAnimate> */}
				
					<Typography variant="h4" color="textSecondary" className="mb-16">
					Oops.. Page you are looking for does not exist
					</Typography>
					


					<Typography variant="subtitle1" color="textSecondary" className="mb-5">
					Going back in {seconds}
					</Typography>
					

				{/* <Paper className="flex items-center w-full h-56 p-16 mt-48 mb-16" elevation={1}>
					<Icon color="action">search</Icon>
					<Input
						placeholder="Search for anything"
						className="px-16"
						disableUnderline
						fullWidth
						inputProps={{
							'aria-label': 'Search'
						}}
					/>
				</Paper> */}


				<Link className="font-bold" to="/login" id="nav-link-404">
					Go back now
				</Link>
				
			</div>
		</div>
	);
}

export default Error404Page;
