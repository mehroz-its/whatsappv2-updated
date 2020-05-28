import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store/reducers';
import CitiesHeader from './CitiesHeader';
import CitiesTable from  './CitiesTable';

function Cities() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CitiesHeader />}
			content={<CitiesTable />}
			innerScrollss
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Cities);
