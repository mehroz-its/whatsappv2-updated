import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import BlockHeader from './BlockListHeader'
import BlockTable from './BlockListTable'
function BlockList(props) {
	return (
		<>
			<FusePageCarded
				classes={{
					content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<BlockHeader />}
				content={<BlockTable />}
			/>
		</>
	);
}
export default withReducer('eCommerceApp', reducer)(BlockList);