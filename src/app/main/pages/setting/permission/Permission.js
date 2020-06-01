import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import PermissionHeader from './PermissionHeader';
import PermissionTable from  './PermissionTable';

function Permissions() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<PermissionHeader />}
			content={<PermissionTable />}
			// innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Permissions);
