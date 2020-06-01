import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import UserHeader from './UserHeader';
import UserTable from  './UserTable';

function Users() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<UserHeader />}
			content={<UserTable />}
			// innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Users);
