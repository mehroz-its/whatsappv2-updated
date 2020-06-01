import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import GroupHeader from './GroupHeader';
import GroupTable from './GroupTable';

function Groups() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<GroupHeader />}
			content={<GroupTable />}
			// innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Groups);
