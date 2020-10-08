import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

function Navigation(props) {
	const navigation = useSelector(({ fuse }) => fuse.navigation);

	let userAcl = localStorage.getItem('user_acl');

	if(userAcl){
		return (
			<FuseNavigation
				className={clsx('navigation', props.className)}
				navigation={navigation}
				layout={props.layout}
				dense={props.dense}
				active={props.active}
			/>
		);
	}else{
		return null
	}
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
