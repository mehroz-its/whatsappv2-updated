import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import CountryHeader from './CountryHeader';
import CountryTable from  './CountryTable';

function Campaign() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CountryHeader />}
			content={<CountryTable />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Campaign);
