import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import RolesHeader from './RolesHeader';
import Rolestable from  './RolesTable';

function Roles() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<RolesHeader />}
			content={<Rolestable />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Roles);
