import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function GroupDetailsHeader(props) {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Members
					</Typography>
				</FuseAnimate>
			</div>
			<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography variant="caption">{`Total Members : 3`}</Typography>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default GroupDetailsHeader;
