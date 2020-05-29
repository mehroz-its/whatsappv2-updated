import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import AgentHeader from './AgentHeader';
import AgentContent from './AgentContent';

function Campaign() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<AgentHeader />}
			content={<AgentContent />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Campaign);
